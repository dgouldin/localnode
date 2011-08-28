package flash.geom;

extern class Point {
	@:require(flash11) var copyFrom(require flash11,require flash11) : Point -> Void;
	var length(default,null) : Float;
	@:require(flash11) var setTo(require flash11,require flash11) : Float -> Float -> Void;
	var x : Float;
	var y : Float;
	function new(?x : Float, ?y : Float) : Void;
	function add(v : Point) : Point;
	function clone() : Point;
	function equals(toCompare : Point) : Bool;
	function normalize(thickness : Float) : Void;
	function offset(dx : Float, dy : Float) : Void;
	function subtract(v : Point) : Point;
	function toString() : String;
	static function distance(pt1 : Point, pt2 : Point) : Float;
	static function interpolate(pt1 : Point, pt2 : Point, f : Float) : Point;
	static function polar(len : Float, angle : Float) : Point;
}
