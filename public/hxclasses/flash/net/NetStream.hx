package flash.net;

extern class NetStream extends flash.events.EventDispatcher {
	@:require(flash10_1) var appendBytes(require flash10_1,require flash10_1) : flash.utils.ByteArray -> Void;
	@:require(flash10_1) var appendBytesAction(require flash10_1,require flash10_1) : String -> Void;
	@:require(flash10_1) var attach(require flash10_1,require flash10_1) : NetConnection -> Void;
	var audioCodec(default,null) : UInt;
	@:require(flash10_1) var audioReliable(require flash10_1,require flash10_1) : Bool;
	@:require(flash10_1) var audioSampleAccess(require flash10_1,require flash10_1) : Bool;
	@:require(flash10_1) var backBufferLength(require flash10_1,require flash10_1) : Float;
	@:require(flash10_1) var backBufferTime(require flash10_1,require flash10_1) : Float;
	var bufferLength(default,null) : Float;
	var bufferTime : Float;
	@:require(flash10_1) var bufferTimeMax(require flash10_1,require flash10_1) : Float;
	var bytesLoaded(default,null) : UInt;
	var bytesTotal(default,null) : UInt;
	var checkPolicyFile : Bool;
	var client : Dynamic;
	var currentFPS(default,null) : Float;
	@:require(flash10_1) var dataReliable(require flash10_1,require flash10_1) : Bool;
	var decodedFrames(default,null) : UInt;
	@:require(flash10) var farID(default,null) : String;
	@:require(flash10) var farNonce(default,null) : String;
	@:require(flash10_1) var inBufferSeek(require flash10_1,require flash10_1) : Bool;
	@:require(flash10) var info(default,null) : NetStreamInfo;
	var liveDelay(default,null) : Float;
	@:require(flash10) var maxPauseBufferTime : Float;
	@:require(flash10_1) var multicastAvailabilitySendToAll(require flash10_1,require flash10_1) : Bool;
	@:require(flash10_1) var multicastAvailabilityUpdatePeriod(require flash10_1,require flash10_1) : Float;
	@:require(flash10_1) var multicastFetchPeriod(require flash10_1,require flash10_1) : Float;
	@:require(flash10_1) var multicastInfo(require flash10_1,require flash10_1) : NetStreamMulticastInfo;
	@:require(flash10_1) var multicastPushNeighborLimit(require flash10_1,require flash10_1) : Float;
	@:require(flash10_1) var multicastRelayMarginDuration(require flash10_1,require flash10_1) : Float;
	@:require(flash10_1) var multicastWindowDuration(require flash10_1,require flash10_1) : Float;
	@:require(flash10) var nearNonce(default,null) : String;
	var objectEncoding(default,null) : UInt;
	@:require(flash10) var peerStreams(default,null) : Array<Dynamic>;
	var soundTransform : flash.media.SoundTransform;
	@:require(flash10_1) var step(require flash10_1,require flash10_1) : Int -> Void;
	var time(default,null) : Float;
	@:require(flash11) var useHardwareDecoder(require flash11,require flash11) : Bool;
	var videoCodec(default,null) : UInt;
	@:require(flash10_1) var videoReliable(require flash10_1,require flash10_1) : Bool;
	@:require(flash10_1) var videoSampleAccess(require flash10_1,require flash10_1) : Bool;
	@:require(flash11) var videoStreamSettings(require flash11,require flash11) : flash.media.VideoStreamSettings;
	function new(connection : NetConnection, ?peerID : String) : Void;
	function attachAudio(microphone : flash.media.Microphone) : Void;
	function attachCamera(theCamera : flash.media.Camera, ?snapshotMilliseconds : Int) : Void;
	function close() : Void;
	@:require(flash10) function onPeerConnect(subscriber : NetStream) : Bool;
	function pause() : Void;
	function play(?p1 : Dynamic, ?p2 : Dynamic, ?p3 : Dynamic, ?p4 : Dynamic, ?p5 : Dynamic) : Void;
	@:require(flash10) function play2(param : NetStreamPlayOptions) : Void;
	function publish(?name : String, ?type : String) : Void;
	function receiveAudio(flag : Bool) : Void;
	function receiveVideo(flag : Bool) : Void;
	function receiveVideoFPS(FPS : Float) : Void;
	function resume() : Void;
	function seek(offset : Float) : Void;
	function send(handlerName : String, ?p1 : Dynamic, ?p2 : Dynamic, ?p3 : Dynamic, ?p4 : Dynamic, ?p5 : Dynamic) : Void;
	function togglePause() : Void;
	@:require(flash10) static var CONNECT_TO_FMS : String;
	@:require(flash10) static var DIRECT_CONNECTIONS : String;
}
