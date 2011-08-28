package flash;

@:require(flash10) extern class Vector<T> {
	var fixed : Bool;
	var length : UInt;
	function new(?length : UInt, ?fixed : Bool) : Void;
	function concat(?a : Vector<T>) : Vector<T>;
	function indexOf(x : T, ?from : Int) : Int;
	function join(sep : String) : String;
	function lastIndexOf(x : T, ?from : Int) : Int;
	function pop() : Null<T>;
	function push(x : T) : Int;
	function reverse() : Void;
	function shift() : Null<T>;
	function slice(pos : Int, ?end : Int) : Vector<T>;
	function sort(f : T -> T -> Int) : Void;
	function splice(pos : Int, len : Int) : Vector<T>;
	function toString() : String;
	function unshift(x : T) : Void;
	static function convert<T,U>(v : Vector<T>) : Vector<U>;
	static function ofArray<T>(v : Array<T>) : Vector<T>;
}
