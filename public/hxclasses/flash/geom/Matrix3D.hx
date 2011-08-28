package flash.geom;

@:require(flash10) extern class Matrix3D {
	@:require(flash11) var copyColumnFrom(require flash11,require flash11) : UInt -> Vector3D -> Void;
	@:require(flash11) var copyColumnTo(require flash11,require flash11) : UInt -> Vector3D -> Void;
	@:require(flash11) var copyFrom(require flash11,require flash11) : Matrix3D -> Void;
	@:require(flash11) var copyRawDataFrom(require flash11,require flash11) : flash.Vector<Float> -> UInt -> Bool -> Void;
	@:require(flash11) var copyRawDataTo(require flash11,require flash11) : flash.Vector<Float> -> UInt -> Bool -> Void;
	@:require(flash11) var copyRowFrom(require flash11,require flash11) : UInt -> Vector3D -> Void;
	@:require(flash11) var copyRowTo(require flash11,require flash11) : UInt -> Vector3D -> Void;
	@:require(flash11) var copyToMatrix3D(require flash11,require flash11) : Matrix3D -> Void;
	var determinant(default,null) : Float;
	var position : Vector3D;
	var rawData : flash.Vector<Float>;
	function new(?v : flash.Vector<Float>) : Void;
	function append(lhs : Matrix3D) : Void;
	function appendRotation(degrees : Float, axis : Vector3D, ?pivotPoint : Vector3D) : Void;
	function appendScale(xScale : Float, yScale : Float, zScale : Float) : Void;
	function appendTranslation(x : Float, y : Float, z : Float) : Void;
	function clone() : Matrix3D;
	function decompose(?orientationStyle : Orientation3D) : flash.Vector<Vector3D>;
	function deltaTransformVector(v : Vector3D) : Vector3D;
	function identity() : Void;
	function interpolateTo(toMat : Matrix3D, percent : Float) : Void;
	function invert() : Bool;
	function pointAt(pos : Vector3D, ?at : Vector3D, ?up : Vector3D) : Void;
	function prepend(rhs : Matrix3D) : Void;
	function prependRotation(degrees : Float, axis : Vector3D, ?pivotPoint : Vector3D) : Void;
	function prependScale(xScale : Float, yScale : Float, zScale : Float) : Void;
	function prependTranslation(x : Float, y : Float, z : Float) : Void;
	function recompose(components : flash.Vector<Vector3D>, ?orientationStyle : Orientation3D) : Bool;
	function transformVector(v : Vector3D) : Vector3D;
	function transformVectors(vin : flash.Vector<Float>, vout : flash.Vector<Float>) : Void;
	function transpose() : Void;
	static function interpolate(thisMat : Matrix3D, toMat : Matrix3D, percent : Float) : Matrix3D;
}
