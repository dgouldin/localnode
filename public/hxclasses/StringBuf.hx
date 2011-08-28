extern class StringBuf {
	function new() : Void;
	function add(?x : Dynamic) : Void;
	function addChar(c : Int) : Void;
	function addSub(s : String, pos : Int, ?len : Int) : Void;
	function toString() : String;
}
