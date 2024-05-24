import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobal } from '@/context/context';

const useImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('ยังไม่ได้เลือกรูปโปรไฟล์');
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

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file_input', file); // Ensure the field name matches the server-side handler
    console.log("fileimage", formData);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("File uploaded successfully", response.data);
      setAgentImage(response.data.url); // Assuming response.data contains the necessary image data
    } catch (error) {
      console.error("Error uploading file:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
      }
    }
  };

  useEffect(() => {
    if (file) handleSubmit();
  }, [file]);

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