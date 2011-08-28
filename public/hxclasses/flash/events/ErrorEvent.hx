package flash.events;

extern class ErrorEvent extends TextEvent {
	@:require(flash10_1) var errorID(require flash10_1,require flash10_1) : Int;
	function new(type : String, ?bubbles : Bool, ?cancelable : Bool, ?text : String, ?id : Int) : Void;
	static var ERROR : String;
}
