
$("#signup-form").validationEngine();
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

$("input, textarea").placeholder();

$("#example-config").fancybox();
$("#test-config").fancybox({
				'width'				: '75%',
				'height'			: '75%',
				'autoScale'			: false
			});
$("#proxy-start").fancybox();
$("#howitworks-id").fancybox();

