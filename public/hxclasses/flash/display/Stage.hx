package flash.display;

extern class Stage extends DisplayObjectContainer {
	var align : StageAlign;
	@:require(flash11) var allowsFullScreen(require flash11,require flash11) : Bool;
	@:require(flash10_2) var color(require flash10_2,require flash10_2) : UInt;
	@:require(flash10) var colorCorrection : ColorCorrection;
	@:require(flash10) var colorCorrectionSupport(default,null) : ColorCorrectionSupport;
	@:require(flash11) var displayContextInfo(require flash11,require flash11) : String;
	var displayState : StageDisplayState;
	var focus : InteractiveObject;
	var frameRate : Float;
	var fullScreenHeight(default,null) : UInt;
	var fullScreenSourceRect : flash.geom.Rectangle;
	var fullScreenWidth(default,null) : UInt;
	var quality : StageQuality;
	var scaleMode : StageScaleMode;
	var showDefaultContextMenu : Bool;
	@:require(flash11) var softKeyboardRect(require flash11,require flash11) : flash.geom.Rectangle;
	@:require(flash11) var stage3Ds(require flash11,require flash11) : flash.Vector<Stage3D>;
	var stageFocusRect : Bool;
	var stageHeight : Int;
	@:require(flash10_2) var stageVideos(require flash10_2,require flash10_2) : flash.Vector<flash.media.StageVideo>;
	var stageWidth : Int;
	@:require(flash10_1) var wmodeGPU(require flash10_1,require flash10_1) : Bool;
	function invalidate() : Void;
	function isFocusInaccessible() : Bool;
}
