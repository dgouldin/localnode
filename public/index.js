$(function() {
  var proxyframe = $('#proxyframe'),
      host;
  
  //See https://github.com/posabsolute/jQuery-Validation-Engine (for validation)
  var ajaxSubdomain = {
      "url": "ajaxValidateSubdomain",
      "extraDataDynamic": ['#subdomain-input'],
      "alertText": "* This Subdomain is already taken",
      "alertTextOk": "All good!",
      "alertTextLoad": "* Validating, please wait"
  };
  
  $("#signup-form, #subdomain-form").validationEngine();
  var $body = $('body');
  
  //Make the background stay nice ;-) 
  function AdjustBG(){
      if ($body.width() > 1600) {
          $body.css('background-size','100%');
      } else {
          $body.css('background-size','');
      }
  }
  AdjustBG();
  $(window).resize(AdjustBG);
  
  //$("input, textarea").placeholder();
  
  $("#server-address").text($("#localhost-input").val());
  setProxyURL();
  
  $("#localhost-input").keyup(function(e){
     $("#server-address").text($(this).val());
     setProxyURL();
  });
  
  function setProxyURL() {
     var d = "http://proxy.localno.de/"+$("#subdomain-input").val()+ ($("#localhost-input").val() == "http://127.0.0.1" ? '' : "?url="+encodeURIComponent($("#localhost-input").val()));
     $("#proxy-address").text(d); 
     $("#proxy-start").attr("href",d);
  }
  
  $("#subdomain-input").keyup(function(e){
     setProxyURL();
  });
  
  
  $("#test-config").click(function(e){
      $.fancybox.showActivity();
      $.ajax({
        url: ($("#localhost-input").val()+"/localnode.html"),
        cache: false,
        timeout: 5000,
        success: function(html){
          //$.fancybox.hideActivity();
          $.fancybox({content:"<div style='padding: 20px; background-color:green; color: white;'>Dude, It works!</div>"});
        },
        error: function(jqXHR, textStatus, errorThrown){
           //$.fancybox.hideActivity();
           $.fancybox({content:"<div style='padding: 20px; background-color:red; color: white;'>Something is not quite right :-/</div>"});
        }
      });
      return false;
  });
  		
  $("#howitworks-id").fancybox();

  var int, keyupHandle;
  
  int = setInterval(function() {
    console.log($('#host-input').val());
    proxyframe.attr('src', 'http://'+$('#host-input').val()+'/localnode.html');
  }, 1000);
  
  function onIframeLoad() {
    var hostVal = $('#host-input').val(),
        hostValSlash = hostVal.indexOf('/');
    if (hostValSlash == -1) {
      hostValSlash = undefined;
    }
    host = 'http://' + hostVal.substr(0, hostValSlash);

    $('#step-1').addClass('complete');
    $('#step-2').fadeIn();
    console.log('SUCCESS!');
    clearInterval(int);

    function checkSubdomain() {
      console.log('checking subdomain');
      socket.emit('available', {
        subdomain: $('#subdomain-input').val()
      }, function(isAvailable) {
        if (isAvailable) {
          $('#step-2').addClass('complete');
          $('#subdomain-status').removeClass('unavailable').addClass('available');
          $('#subdomain-submit').removeAttr('disabled');
        } else {
          $('#step-2').removeClass('complete');
          $('#subdomain-status').removeClass('available').addClass('unavailable');
          $('#subdomain-submit').attr('disabled', 'disabled');
        }
      });
    }
    $('#subdomain-input').bind('keyup', function() {
      clearTimeout(keyupHandle);
      keyupHandle = setTimeout(checkSubdomain, 200);
    });

    $('#subdomain-submit').click(function() {
      socket.emit('setup', {
        subdomain: $('#subdomain-input').val()
      }, function(success) {
        console.log('setup success', success);
        if (success) {
          alert("You're all set");
        }
      });
    });
  }
  
  var subdomain,
    socket = io.connect('http://localno.de'),
    pendingRequests = {}; //TODO: send chunks via postMessage as we receive them

  socket.on('headers', function(data) {
    console.log('headers message received');
    pendingRequests[data.token] = {
      token: data.token,
      request: {
        url: data.url,
        method: data.method,
        headers: data.headers,
        body: ''
      }
    };
  });

  socket.on('data', function(data) {
    console.log('data message received');
    if (pendingRequests[data.token]) {
      pendingRequests[data.token].request.body += data.chunk;
    }
  });
  socket.on('end', function (data) {
    console.log('end message received');
    if (pendingRequests[data.token]) {
      proxyframe.get(0).contentWindow.postMessage(
          JSON.stringify(pendingRequests[data.token]), host);
    }
  });

  socket.on('disconnect', function(data) {
    console.log('Disconnected');
  });

  window.addEventListener("message", function firstMessage() {
    onIframeLoad();
    window.removeEventListener('message', firstMessage);
    window.addEventListener("message", onProxyMessage);
  });
  
  function onProxyMessage(e) {
    console.log('proxy message received', e);
    
    if (e.origin !== host) {
      return; // unauthorized
    }

    var data = JSON.parse(e.data),
        response = data.response;
    response.token = data.token;
    socket.emit('response', response);

  }

  console.log("You're all set!");
  return false;
});
