
import CarouselTransition from "@/components/Corousel";
import CarouselMarketplace from "@/components/Corousel_marketplace";
import TextLandingpage from "@/components/TextLandingpage"
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex items-center flex-col bg-[#212529] min-h-screen p-6">
      <div className="flex items-center flex-col bg-[#212529] h-full mb-16">
        <div className="flex flex-col items-center justify-center pt-12">
          <h1 className="font-extrabold  text-[30px] bg-clip-text text-transparent bg-gradient-to-r from-[#02F6A9] to-[#0DC19A]">Prompt Lab</h1>
          <h1 className="font-extrabold  text-[40px] bg-clip-text text-transparent bg-gradient-to-r from-[#02F6A9] to-[#0DC19A]">AI Marketplace</h1>
          <p className="text-white text-center">สร้างสรรค์ AI ในหลากหลายรูปแบบ ด้วยตัวของคุณเอง</p>
        </div>
        <div className="flex flex-col items-start mt-12 sm:w-[600px] gap-8">
          {/* เก็บเอาไว้ก่อนเผื่อได้รูปมาใส่ */}
          {/* <div className="mt-8">
            <p className=" text-white font-bold">สร้าง AI ได้ เพียงไม่กี่ขั้นตอน!</p>
            <div className="w-full h-[300px] rounded-xl flex justify-center ">
              <CarouselTransition />
            </div>
            <div className="mt-4 border">
              <p className="text-white text-sm">{TextLandingpage.Thridtext}</p>
              <p className="text-white text-sm">Some content</p>
            </div>
          </div> */}
          <div className="mt-8">
            <p className=" text-white font-bold">มี AI หลากหลายประเภทให้คุณได้ลอง</p>
            <div className="w-full h-[300px] rounded-xl flex justify-center ">
              <CarouselMarketplace />
            </div>
            <div className="py-4">
              <h1 className="text-white font-bold text-lg">เริ่มต้นการใช้งาน AI ตามขั้นตอนด้านล่างนี้</h1>
              <div className="text-white">
                <p>1. คลิกที่ Tab ที่มีชื่อว่า <strong>ร้านค้าAI</strong></p>
                <p>2. เลือกAI ที่ต้องการใช้งาน</p>
                <p>3. คลิกที่ <strong>Use Ai</strong> เพื่อเริ่มใช้งาน</p>
                <p>4. ใส่คำถาม พร้อมทั้ง สไตล์ข้อความ แล้วคลิกที่ <strong>Generate</strong></p>
                <p>5. รอสักครู่ก็จะได้คำตอบจาก AIแล้ว 
                  <Link href='/customer/marketplace' className="underline">
                    <strong > เลือกใช้งานAI</strong>
                  </Link>
                </p>
              </div>
            </div>
            {/* เก็บไว้ใส่เนื้อหา */}
            {/* <div className="mt-4 border">
              <p className="text-white text-sm">Some content</p>
            </div> */}
            <div className="py-8">
              <h1 className="text-white font-bold text-lg">เริ่มต้นสร้าง AI เป็นของตัวเองได้เลย ตามขั้นตอนด้านล่างนี้</h1>
              <div className="text-white">
                <p>1. คลิกที่ Tab ที่มีชื่อว่า <strong>สร้างAI</strong></p>
                <p>2. ตั้งชื่อAI</p>
                <p>3. เลือกโปรไฟล์สำหรับ AI</p>
                <p>4. ใส่คำอธิบายเกี่ยวกับ AI</p>
                <p>5. กดถัดไป หลังจากนั้นให้เลือก Framwork ที่เหมาะกับ AI ของคุณ
                  <Link href='/creator/create_agent' className="underline">
                    <strong > เริ่มสร้างAI</strong>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
