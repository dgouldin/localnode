package flash.system;

extern class Security {
	@:require(flash10_1) static var APPLICATION(require flash10_1,require flash10_1) : String;
	static var LOCAL_TRUSTED : String;
	static var LOCAL_WITH_FILE : String;
	static var LOCAL_WITH_NETWORK : String;
	static var REMOTE : String;
	static var disableAVM1Loading : Bool;
	@:require(flash10_1) static var duplicateSandboxBridgeInputArguments(require flash10_1,require flash10_1) : Dynamic -> Array<Dynamic> -> Array<Dynamic>;
	@:require(flash10_1) static var duplicateSandboxBridgeOutputArgument(require flash10_1,require flash10_1) : Dynamic -> Dynamic -> Dynamic;
	static var exactSettings : Bool;
	@:require(flash11) static var pageDomain(require flash11,require flash11) : String;
	static var sandboxType(default,null) : String;
	static function allowDomain(?p1 : Dynamic, ?p2 : Dynamic, ?p3 : Dynamic, ?p4 : Dynamic, ?p5 : Dynamic) : Void;
	static function allowInsecureDomain(?p1 : Dynamic, ?p2 : Dynamic, ?p3 : Dynamic, ?p4 : Dynamic, ?p5 : Dynamic) : Void;
	static function loadPolicyFile(url : String) : Void;
	static function showSettings(?panel : SecurityPanel) : Void;
}
