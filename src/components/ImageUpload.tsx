
import React from 'react';
import useImageUpload from './hooks/ImageUpload.hook';

const ImageUpload: React.FC = () => {
    const {uploadImage} = useImageUpload()

    return (
        <div className="flex flex-col items-center justify-center p-2 sm:items-start">
            <form onSubmit={uploadImage.handleSubmit} className="flex flex-col gap-4 justify-center items-center sm:hidden">
                <label htmlFor="file-upload" className="cursor-pointer h-32 w-32 border-2 border-gray-200 border-solid rounded-full flex items-center justify-center overflow-hidden drop-shadow-lg">
                    {uploadImage.imagePreviewUrl ? (
                        <img src={uploadImage.imagePreviewUrl} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                        <div className="text-white font-bold">เลือกโปรไฟล์</div>
                    )}
                </label>
                <input id="file-upload" type="file" onChange={uploadImage.handleFileChange} accept="image/png" className="hidden" />
                <p className="text-white text-[10px] text-center">{uploadImage.fileName}</p>
            </form>

            <form onSubmit={uploadImage.handleSubmit} className="hidden sm:flex gap-4 justify-center items-center">
                <label htmlFor="file-upload" className="cursor-pointer h-32 w-32 border-2 border-gray-200 border-solid rounded-full flex items-center justify-center overflow-hidden drop-shadow-lg">
                    {uploadImage.imagePreviewUrl ? (
                        <img src={uploadImage.imagePreviewUrl} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                        <div className="text-white font-bold">เลือกโปรไฟล์</div>
                    )}
                </label>
                <input id="file-upload" type="file" onChange={uploadImage.handleFileChange} accept="image/png" className="hidden" />
                <p className="text-white text-[10px] text-center p-4 rounded-md ">{uploadImage.fileName}</p>
            </form>

        </div>
    );
};

export default ImageUpload;

