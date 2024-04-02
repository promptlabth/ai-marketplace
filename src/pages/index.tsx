import CarouselTransition from "@/components/Corousel";
import CarouselMarketplace from "@/components/Corousel_marketplace";
import TextLandingpage from "@/components/TextLandingpage"

export default function Home() {
  return (
    <div className="flex items-center flex-col bg-[#212529] min-h-screen p-6">
      <div className="flex flex-col items-center justify-center pt-12">
        <h1 className="font-extrabold font-bold text-[40px] bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-lime-500">AI Marketplace</h1>
        <p className="text-white text-center">สร้างสรรค์ AI ในหลากหลายรูปแบบ ด้วยตัวของคุณเอง</p>
      </div>
      <div className="flex flex-col items-start mt-12 sm:w-[600px] gap-8">
        <div>
          <p className="text-white text-sm">{TextLandingpage.Firsttext}</p>
        </div>
        <div className="mt-8">
          <p className=" text-white font-bold">สร้าง AI ได้ เพียงไม่กี่ขั้นตอน!</p>
          <div className="w-full h-[300px] rounded-xl flex justify-center ">
            <CarouselTransition />
          </div>
          <div className="mt-4">
            <p className="text-white text-sm">{TextLandingpage.Thridtext}</p>
          </div>
        </div>
        <div className="mt-8">
          <p className=" text-white font-bold">มี AI หลากหลายประเภทให้คุณได้ลอง</p>
          <div className="w-full h-[300px] rounded-xl flex justify-center ">
            <CarouselMarketplace />
          </div>
          <div className="mt-4">
            <p className="text-white text-sm">{TextLandingpage.Secondtext}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
