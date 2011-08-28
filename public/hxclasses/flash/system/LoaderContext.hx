package flash.system;

extern class LoaderContext {
	@:require(flash10_1) var allowCodeImport(require flash10_1,require flash10_1) : Bool;
	@:require(flash10_1) var allowLoadBytesCodeExecution(require flash10_1,require flash10_1) : Bool;
	var applicationDomain : ApplicationDomain;
	var checkPolicyFile : Bool;
	@:require(flash11) var imageDecodingPolicy(require flash11,require flash11) : ImageDecodingPolicy;
	@:require(flash11) var parameters(require flash11,require flash11) : Dynamic;
	@:require(flash11) var requestedContentParent(require flash11,require flash11) : flash.display.DisplayObjectContainer;
	var securityDomain : SecurityDomain;
	function new(?checkPolicyFile : Bool, ?applicationDomain : ApplicationDomain, ?securityDomain : SecurityDomain) : Void;
}
