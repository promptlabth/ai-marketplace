import { useRef, useState, RefObject } from 'react';

interface UseImageUploadReturn {
  fileInputRef: RefObject<HTMLInputElement>;
  imageSrc: string;
  handlers: {
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    handleClick: () => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

const useImageUpload = (): UseImageUploadReturn => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>('/png/plus.png');

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setImageSrc(e.target?.result as string || '');
    };
    reader.readAsDataURL(file);
  };

  return {
    fileInputRef,
    imageSrc,
    handlers: {
      handleDragOver,
      handleDrop,
      handleClick,
      handleFileChange,
    },
  };
};

export default useImageUpload;
