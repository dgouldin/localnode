
$("#signup-form").validationEngine();
var $body = $('body');
$(window).resize(function(){
    if ($body.width() > 1200) {
        $body.css({'background-width':'100%'});
    } else {
        $body.css({'background-width':''});
    }
});
    
