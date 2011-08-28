package flash.geom;

@:require(flash10) extern class Vector3D {
	@:require(flash11) var copyFrom(require flash11,require flash11) : Vector3D -> Void;
	var length(default,null) : Float;
	var lengthSquared(default,null) : Float;
	@:require(flash11) var setTo(require flash11,require flash11) : Float -> Float -> Float -> Void;
	var w : Float;
	var x : Float;
	var y : Float;
	var z : Float;
	function new(?x : Float, ?y : Float, ?z : Float, ?w : Float) : Void;
	function add(a : Vector3D) : Vector3D;
	function clone() : Vector3D;
	function crossProduct(a : Vector3D) : Vector3D;
	function decrementBy(a : Vector3D) : Void;
	function dotProduct(a : Vector3D) : Float;
	function equals(toCompare : Vector3D, ?allFour : Bool) : Bool;
	function incrementBy(a : Vector3D) : Void;
	function nearEquals(toCompare : Vector3D, tolerance : Float, ?allFour : Bool) : Bool;
	function negate() : Void;
	function normalize() : Float;
	function project() : Void;
	function scaleBy(s : Float) : Void;
	function subtract(a : Vector3D) : Vector3D;
	function toString() : String;
	static var X_AXIS : Vector3D;
	static var Y_AXIS : Vector3D;
	static var Z_AXIS : Vector3D;
	static function angleBetween(a : Vector3D, b : Vector3D) : Float;
	static function distance(pt1 : Vector3D, pt2 : Vector3D) : Float;
}
