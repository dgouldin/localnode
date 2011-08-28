package flash.events;

extern class ProgressEvent extends Event {
	var bytesLoaded : Float;
	var bytesTotal : Float;
	function new(type : String, ?bubbles : Bool, ?cancelable : Bool, ?bytesLoaded : Float, ?bytesTotal : Float) : Void;
	static var PROGRESS : String;
	static var SOCKET_DATA : String;
}
