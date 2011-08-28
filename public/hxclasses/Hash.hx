extern class Hash<T> {
	function new() : Void;
	function exists(key : String) : Bool;
	function get(key : String) : Null<T>;
	function iterator() : Iterator<T>;
	function keys() : Iterator<String>;
	function remove(key : String) : Bool;
	function set(key : String, value : T) : Void;
	function toString() : String;
}
