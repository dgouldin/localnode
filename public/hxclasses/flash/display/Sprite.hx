package flash.display;

extern class Sprite extends DisplayObjectContainer {
	var buttonMode : Bool;
	var dropTarget(default,null) : DisplayObject;
	var graphics(default,null) : Graphics;
	var hitArea : Sprite;
	var soundTransform : flash.media.SoundTransform;
	@:require(flash10_1) var startTouchDrag(require flash10_1,require flash10_1) : Int -> Bool -> flash.geom.Rectangle -> Void;
	@:require(flash10_1) var stopTouchDrag(require flash10_1,require flash10_1) : Int -> Void;
	var useHandCursor : Bool;
	function new() : Void;
	function startDrag(?lockCenter : Bool, ?bounds : flash.geom.Rectangle) : Void;
	function stopDrag() : Void;
}
