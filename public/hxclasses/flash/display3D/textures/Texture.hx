package flash.display3D.textures;

@:final extern class Texture extends TextureBase {
	function uploadCompressedTextureFromByteArray(data : flash.utils.ByteArray, byteArrayOffset : UInt) : Void;
	function uploadFromBitmapData(source : flash.display.BitmapData, ?miplevel : UInt) : Void;
	function uploadFromByteArray(data : flash.utils.ByteArray, byteArrayOffset : UInt, ?miplevel : UInt) : Void;
}
