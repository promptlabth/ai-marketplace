import ImageUploadHook from "@/components/hooks/ImageUpload.hook"

export default function ImageUpload() {
    const { fileInputRef, imageSrc, handlers } = ImageUploadHook();

    return (
        <div
            className="border-2 border-dashed h-[300px] flex justify-center items-center hover:opacity-50 focus:opacity:50 rounded-lg cursor-pointer"
            onClick={handlers.handleClick}
            onDragOver={handlers.handleDragOver}
            onDrop={handlers.handleDrop}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handlers.handleFileChange}
                accept="image/*"
            />
            <p className="text-white font-bold ">อัพโหลดรูปภาพสำหรับ AI ของคุณ</p>
        </div>
    );
};


