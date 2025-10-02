import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({onFileSelect} : FileUploaderProps) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
 
  const onDrop = useCallback((acceptedFiles : File[]) => {
    const file = acceptedFiles[0] || null;
    setSelectedFile(file);
    onFileSelect?.(file);
  }, [onFileSelect])

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple: false,
    accept: {
        'application/pdf': ['.pdf'],
    },
    maxSize: maxFileSize, // 10MB
  })

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering file picker
    setSelectedFile(null);
    onFileSelect?.(null);
  }
  
  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="cursor-pointer">            
            {selectedFile ? (
               <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                    <img src="/images/pdf.png" alt="pdf" className="size-10"/>
                    <div className="flex items-center space-x-3">
                        <div>
                            <p className="text-sm text-gray-700 max-w-xs font-medium truncate">
                                <span className="font-semibold">
                                    {selectedFile.name}
                                </span>
                            </p>
                            <p className="text-sm text-gray-500">
                                {formatSize(selectedFile.size)}
                            </p>
                        </div>
                    </div>
                    <button className="p-2 cursor-pointer" onClick={clearFile}>
                        <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
                    </button>
               </div>     
            ) : (
                <div>
                    <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                        <img src="/icons/info.svg" alt="upload" className="size-20" />
                    </div>
                    <p className="text-lg text-gray-500">
                        <span className="font-semibold">
                            Click to upload 
                        </span> or drag and drop
                    </p>
                    <p className="text-lg text-gray-500">
                        PDF (max {formatSize(maxFileSize)})
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default FileUploader
