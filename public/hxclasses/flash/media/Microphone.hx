package flash.media;

@:final extern class Microphone extends flash.events.EventDispatcher {
	var activityLevel(default,null) : Float;
	@:require(flash10) var codec : SoundCodec;
	@:require(flash10_1) var enableVAD(require flash10_1,require flash10_1) : Bool;
	@:require(flash10) var encodeQuality : Int;
	@:require(flash10_2) var enhancedOptions(require flash10_2,require flash10_2) : MicrophoneEnhancedOptions;
	@:require(flash10) var framesPerPacket : Int;
	var gain : Float;
	var index(default,null) : Int;
	var muted(default,null) : Bool;
	var name(default,null) : String;
	@:require(flash10_1) var noiseSuppressionLevel(require flash10_1,require flash10_1) : Int;
	var rate : Int;
	var silenceLevel(default,null) : Float;
	var silenceTimeout(default,null) : Int;
	var soundTransform : SoundTransform;
	var useEchoSuppression(default,null) : Bool;
	function new() : Void;
	function setLoopBack(?state : Bool) : Void;
	function setSilenceLevel(silenceLevel : Float, ?timeout : Int) : Void;
	function setUseEchoSuppression(useEchoSuppression : Bool) : Void;
	@:require(flash10_2) static var getEnhancedMicrophone(require flash10_2,require flash10_2) : Int -> Microphone;
	@:require(flash10_1) static var isSupported(require flash10_1,require flash10_1) : Bool;
	static var names(default,null) : Array<Dynamic>;
	static function getMicrophone(?index : Int) : Microphone;
}
