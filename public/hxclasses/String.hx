extern class String {
	var length(default,null) : Int;
	function new(string : String) : Void;
	function charAt(index : Int) : String;
	function charCodeAt(index : Int) : Null<Int>;
	function indexOf(str : String, ?startIndex : Int) : Int;
	function lastIndexOf(str : String, ?startIndex : Int) : Int;
	function split(delimiter : String) : Array<String>;
	function substr(pos : Int, ?len : Int) : String;
	function toLowerCase() : String;
	function toString() : String;
	function toUpperCase() : String;
	static function fromCharCode(code : Int) : String;
}
