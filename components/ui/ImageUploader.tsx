
'use client';

import { useState, useCallback, useRef, DragEvent } from 'react';
import { UploadCloud, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  initialImage?: string;
}

export function ImageUploader({ onUploadSuccess, initialImage }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(initialImage || null);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (file: File) => {
    if (!file) return;

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/upload-image', true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setUploadedUrl(response.imageUrl);
          onUploadSuccess(response.imageUrl);
        } else {
          const response = JSON.parse(xhr.responseText);
          setError(response.message || 'Upload failed');
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        setError('An error occurred during the upload.');
      };

      xhr.send(formData);

    } catch (err: any) {
      setUploading(false);
      setError(err.message || 'Upload failed');
    }
  }, [onUploadSuccess]);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  }

  return (
    <div className="space-y-4">
        <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
            className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/50 hover:border-primary'}`}>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
            <div className="flex flex-col items-center justify-center space-y-2">
                <UploadCloud className="w-12 h-12 text-muted-foreground" />
                {isDragActive ? (
                    <p className="text-primary">Drop the image here...</p>
                ) : (
                    <p className="text-muted-foreground">Drag & drop an image here, or click to select one</p>
                )}
            </div>
        </div>

        {uploading && (
            <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Uploading...</p>
                <Progress value={uploadProgress} />
            </div>
        )}

        {error && (
            <div className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <p>{error}</p>
            </div>
        )}

        {uploadedUrl && !uploading && !error && (
            <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <p>Image uploaded successfully!</p>
            </div>
        )}

        {uploadedUrl && (
            <div className="mt-4">
                <p className="font-medium mb-2">Image Preview:</p>
                <img src={uploadedUrl} alt="Uploaded preview" className="w-32 h-32 rounded-lg object-cover" />
            </div>
        )}
    </div>
  );
}
