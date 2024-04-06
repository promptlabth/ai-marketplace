import React from "react";
import Head from 'next/head';
import CreatorLayout from "../CreatorLayout";
import data_profile from "@/domain/creator/create_agent/__mock__/profile.json"
import Link from "next/link";

const Profile = () => {
  return (
    <CreatorLayout>
      <div className="flex justify-center bg-[#212529] p-6 sm:min-h-screen min-h-screen relative">
        <Head>
          <title>Profile Creator</title>
          <meta name="description" content="" />
        </Head>
        <div className="flex flex-col w-full sm:w-[650px] min-h-screen rounded-xl py-4 px-4 gap-4">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col justify-center items-center w-full">
              <div className="w-32 h-32 border flex justify-center items-center rounded-full mt-6 bg-orange-500">{data_profile.profile_url}</div>
              <p className="flex w-full justify-center text-white font-bold text-[30px] mt-4">{data_profile.creator_name}</p>
              <p className="flex w-full justify-center text-white font-bold text-[15px]">{data_profile.email}</p>
            </div>
          </div>
          <div className="w-full h-full rounded-xl bg-[#33393F] p-6">
            <p className="text-white text-xl">จำนวน AI ที่สร้าง</p>
            <div className="flex justify-between w-full">
              <p className="text-white">{data_profile.count_ai} ตัว</p>
              <Link href="/creator/list_agent" className="underline text-white hover:text-gray-600 focus:text-gray-600">ประวิติการสร้าง</Link>
            </div>
            <p className="mt-8 text-white text-xl">ประเภทของ AI ทั้งหมด</p>
            <p className="text-white">{data_profile.type_ai}</p>
          </div>
        </div>
      </div >
    </CreatorLayout>
  );
}
export default Profile;
