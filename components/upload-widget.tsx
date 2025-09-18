"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadWidgetProps {
  onFileUpload: (file: File) => void
  isProcessing: boolean
  processingStep: string
  processingProgress: number
}

export function UploadWidget({ onFileUpload, isProcessing, processingStep, processingProgress }: UploadWidgetProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        setUploadedFile(file)
        onFileUpload(file)
      }
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
  })

  const removeFile = () => {
    setUploadedFile(null)
  }

  if (isProcessing) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Processing Document</h3>
              <p className="text-muted-foreground">{processingStep}</p>
            </div>
            <div className="w-full max-w-md mx-auto">
              <Progress value={processingProgress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">{processingProgress}% complete</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-8">
        {!uploadedFile ? (
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
            )}
          >
            <input {...getInputProps()} />
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isDragActive ? "Drop your document here" : "Upload Legal Document"}
            </h3>
            <p className="text-muted-foreground mb-4">Drag & drop your PDF or DOCX file here, or click to browse</p>
            <Button>Choose File</Button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium text-foreground">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={removeFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
