package flash.net;

extern class NetStreamPlayOptions extends flash.events.EventDispatcher, implements Dynamic {
	var len : Float;
	@:require(flash10_1) var offset(require flash10_1,require flash10_1) : Float;
	var oldStreamName : String;
	var start : Float;
	var streamName : String;
	var transition : String;
	function new() : Void;
}
