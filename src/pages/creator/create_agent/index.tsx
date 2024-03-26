import ButtonNext from "@/components/ButtonNext"
import ButtonCancle from "@/components/ButtonCancle"
import InputNameAgent from "@/components/InputNameAgent";
import ImageUpload from "@/components/ImageUpload";
import InputDetial from "@/components/InputDetial"
import Head from 'next/head';

const createAgent = () => {
  return (
    <main className="bg-[#212529] p-6">
      <Head>
        <title>Prompt Marketplace</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex flex-col w-full h-lvh bg-[#33393F] rounded-xl py-4 gap-4">
        <div className="flex flex-col gap-4 h-[80%] px-6 pt-6">
          <InputNameAgent name_label="ตั้งชื่อ AI ของคุณ"/>
          <ImageUpload />
          <InputDetial detail="อธิบายเกี่ยวกับ AI ของคุณ"/>
        </div>
        <div className="flex justify-around items-center w-full h-[20%] gap-4 px-6">
          <ButtonNext name_button="ถัดไป" route_page="/creator/edit_agent"/>
          <ButtonCancle name_button="ย้อนกลับ" />
        </div>
      </div>
    </main>
  );
}

export default createAgent;