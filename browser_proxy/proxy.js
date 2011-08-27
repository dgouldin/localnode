$(document).ready(function() {
  window.addEventListener("message", function(e) {
    console.log('proxy message received', e);
    if (e.origin !== TARGET_ORIGIN) {
      return; // unauthorized
    }

    var data = JSON.parse(e.data),
        response = data.response;

    console.log(response);
  });
});
