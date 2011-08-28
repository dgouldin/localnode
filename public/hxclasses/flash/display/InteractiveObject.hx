package flash.display;

extern class InteractiveObject extends DisplayObject {
	var accessibilityImplementation : flash.accessibility.AccessibilityImplementation;
	var contextMenu : flash.ui.ContextMenu;
	var doubleClickEnabled : Bool;
	var focusRect : Dynamic;
	var mouseEnabled : Bool;
	@:require(flash11) var needsSoftKeyboard(require flash11,require flash11) : Bool;
	@:require(flash11) var requestSoftKeyboard(require flash11,require flash11) : Void -> Bool;
	@:require(flash11) var softKeyboardInputAreaOfInterest(require flash11,require flash11) : flash.geom.Rectangle;
	var tabEnabled : Bool;
	var tabIndex : Int;
	function new() : Void;
}
