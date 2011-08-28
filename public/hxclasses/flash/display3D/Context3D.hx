package flash.display3D;

@:final extern class Context3D extends flash.events.EventDispatcher {
	var driverInfo(default,null) : String;
	var enableErrorChecking : Bool;
	function clear(?red : Float, ?green : Float, ?blue : Float, ?alpha : Float, ?depth : Float, ?stencil : UInt, ?mask : UInt) : Void;
	function configureBackBuffer(width : Int, height : Int, antiAlias : Int, ?enableDepthAndStencil : Bool) : Void;
	function createCubeTexture(size : Int, format : Context3DTextureFormat, optimizeForRenderToTexture : Bool) : flash.display3D.textures.CubeTexture;
	function createIndexBuffer(numIndices : Int) : IndexBuffer3D;
	function createProgram() : Program3D;
	function createTexture(width : Int, height : Int, format : Context3DTextureFormat, optimizeForRenderToTexture : Bool) : flash.display3D.textures.Texture;
	function createVertexBuffer(numVertices : Int, data32PerVertex : Int) : VertexBuffer3D;
	function dispose() : Void;
	function drawToBitmapData(destination : flash.display.BitmapData) : Void;
	function drawTriangles(indexBuffer : IndexBuffer3D, ?firstIndex : Int, ?numTriangles : Int) : Void;
	function present() : Void;
	function setBlendFactors(sourceFactor : Context3DBlendFactor, destinationFactor : Context3DBlendFactor) : Void;
	function setColorMask(red : Bool, green : Bool, blue : Bool, alpha : Bool) : Void;
	function setCulling(triangleFaceToCull : Context3DTriangleFace) : Void;
	function setDepthTest(depthMask : Bool, passCompareMode : Context3DCompareMode) : Void;
	function setProgram(program : Program3D) : Void;
	function setProgramConstantsFromMatrix(programType : Context3DProgramType, firstRegister : Int, matrix : flash.geom.Matrix3D, ?transposedMatrix : Bool) : Void;
	function setProgramConstantsFromVector(programType : Context3DProgramType, firstRegister : Int, data : flash.Vector<Float>, ?numRegisters : Int) : Void;
	function setRenderToBackBuffer() : Void;
	function setRenderToTexture(texture : flash.display3D.textures.TextureBase, ?enableDepthAndStencil : Bool, ?antiAlias : Int, ?surfaceSelector : Int) : Void;
	function setScissorRectangle(rectangle : flash.geom.Rectangle) : Void;
	function setStencilActions(?triangleFace : Context3DTriangleFace, ?compareMode : Context3DCompareMode, ?actionOnBothPass : Context3DStencilAction, ?actionOnDepthFail : Context3DStencilAction, ?actionOnDepthPassStencilFail : Context3DStencilAction) : Void;
	function setStencilReferenceValue(referenceValue : UInt, ?readMask : UInt, ?writeMask : UInt) : Void;
	function setTextureAt(sampler : Int, texture : flash.display3D.textures.TextureBase) : Void;
	function setVertexBufferAt(index : Int, buffer : VertexBuffer3D, ?bufferOffset : Int, ?format : Context3DVertexBufferFormat) : Void;
}
