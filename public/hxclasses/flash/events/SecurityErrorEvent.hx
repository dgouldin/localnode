package flash.events;

extern class SecurityErrorEvent extends ErrorEvent {
	function new(type : String, ?bubbles : Bool, ?cancelable : Bool, ?text : String, ?id : Int) : Void;
	static var SECURITY_ERROR : String;
}
