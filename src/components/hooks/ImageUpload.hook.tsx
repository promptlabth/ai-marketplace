import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { useGlobal } from '@/context/context';

const useImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('ยังไม่ได้เลือกรูปโปรไฟล์');
  const [imageData, setImageData] = useState<any>(null)
  const { setAgentImage } = useGlobal();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const newFile = fileList[0];
      setFile(newFile);
      setFileName(newFile.name);
      setImagePreviewUrl(URL.createObjectURL(newFile));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    e.preventDefault();
    setImageData(formData)
    setAgentImage(formData)
  };

  // useEffect(() => {
  //   if (file) handleSubmit();
  // }, [file]);


  return {
    uploadImage: {
      imagePreviewUrl,
      fileName,
      handleFileChange,
      handleSubmit
    }
  };
};

export default useImageUpload;
