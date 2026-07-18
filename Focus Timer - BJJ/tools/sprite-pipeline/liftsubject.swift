import Vision
import CoreImage
import Foundation

// Usage: swift liftsubject.swift <input.png> <output.png>
let args = CommandLine.arguments
guard args.count == 3 else {
    FileHandle.standardError.write("usage: liftsubject <in> <out>\n".data(using: .utf8)!)
    exit(1)
}
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])

let handler = VNImageRequestHandler(url: inURL)
let request = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([request])

guard let result = request.results?.first else {
    FileHandle.standardError.write("no foreground subject found\n".data(using: .utf8)!)
    exit(2)
}

let buffer = try result.generateMaskedImage(
    ofInstances: result.allInstances,
    from: handler,
    croppedToInstancesExtent: false
)

let ci = CIImage(cvPixelBuffer: buffer)
let ctx = CIContext()
guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB),
      let png = ctx.pngRepresentation(of: ci, format: .RGBA8, colorSpace: colorSpace) else {
    FileHandle.standardError.write("failed to encode png\n".data(using: .utf8)!)
    exit(3)
}
try png.write(to: outURL)
print("wrote \(outURL.path)")
