package flash.geom;

extern class Rectangle {
	var bottom : Float;
	var bottomRight : Point;
	@:require(flash11) var copyFrom(require flash11,require flash11) : Rectangle -> Void;
	var height : Float;
	var left : Float;
	var right : Float;
	@:require(flash11) var setTo(require flash11,require flash11) : Float -> Float -> Float -> Float -> Void;
	var size : Point;
	var top : Float;
	var topLeft : Point;
	var width : Float;
	var x : Float;
	var y : Float;
	function new(?x : Float, ?y : Float, ?width : Float, ?height : Float) : Void;
	function clone() : Rectangle;
	function contains(x : Float, y : Float) : Bool;
	function containsPoint(point : Point) : Bool;
	function containsRect(rect : Rectangle) : Bool;
	function equals(toCompare : Rectangle) : Bool;
	function inflate(dx : Float, dy : Float) : Void;
	function inflatePoint(point : Point) : Void;
	function intersection(toIntersect : Rectangle) : Rectangle;
	function intersects(toIntersect : Rectangle) : Bool;
	function isEmpty() : Bool;
	function offset(dx : Float, dy : Float) : Void;
	function offsetPoint(point : Point) : Void;
	function setEmpty() : Void;
	function toString() : String;
	function union(toUnion : Rectangle) : Rectangle;
}
