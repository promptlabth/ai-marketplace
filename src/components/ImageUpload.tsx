import React, { useRef, useState } from 'react';

export default function ImageUpload() {
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

    return (
        <div
            className="border-2 border-dashed h-[300px] flex justify-center items-center hover:opacity-50 focus:opacity:50 rounded-lg cursor-pointer"
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                // className="flex-auto"
                onChange={handleFileChange} 
                accept="image/*"
            />
            <p className="text-white font-bold ">อัพโหลดรูปภาพสำหรับ AI ของคุณ</p>
        </div>
    );
};


