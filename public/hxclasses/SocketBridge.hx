extern class SocketBridge {
	static var sockets : Hash<flash.net.Socket>;
	static function CAN_I_HAS_SOCKET() : Bool;
	static function close(instance_id : String) : Void;
	static function connect(instance_id : String, host : String, port : Int) : Void;
	static function handle_close(id : String, event : Unknown) : Void;
	static function handle_connect(id : String, event : Unknown) : Void;
	static function handle_data(id : String, event : Unknown) : Void;
	static function handle_io_error(id : String, event : {text : Unknown}) : Void;
	static function handle_security_error(id : String, event : {text : Unknown}) : Void;
	static function loadPolicyFile(path : String) : Void;
	static function main() : Void;
	static function write(instance_id : String, msg : String) : Void;
}
