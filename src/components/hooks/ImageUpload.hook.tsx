import { useRef, useState } from 'react';

const useImageUpload = () => {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('/png/plus.png');

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
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
