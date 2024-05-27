import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import CreatorLayout from "../CreatorLayout";
import data_profile from "@/domain/creator/create_agent/__mock__/profile.json";
import data_list from "@/domain/creator/create_agent/__mock__/list_agent.json"
import Link from "next/link";

interface Agent {
  name_agent: string;
  image_url: string;
  agent_detial: string;
  time_used: string;
  count_use: number;
  new: boolean;
}

interface ProfileData {
  profile_url: string;
  creator_name: string;
  email: string;
  count_ai: number;
  type_ai: string;
}

const Profile = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const profileData: ProfileData = data_profile;

  useEffect(() => {
    try {
      const sortedAgents = data_list.sort((a: Agent, b: Agent) => b.count_use - a.count_use);
      setAgents(sortedAgents.slice(0, 3));
    } catch (error) {
      console.error('Error sorting agents:', error);
    }
  }, []);

  const getBackgroundColor = (index: number) => {
    switch (index) {
      case 1: return 'bg-amber-100';   // Gold for 1st place
      case 2: return 'bg-slate-100'; // Silver for 2nd place
      case 3: return 'bg-red-100'; // Bronze for 3rd place
      default: return 'bg-gray-400'; // Default background color
    }
  }
  const getBackgrounMaindColor = (index: number) => {
    switch (index) {
      case 1: return 'bg-amber-400/90';   // Gold for 1st place
      case 2: return 'bg-slate-500'; // Silver for 2nd place
      case 3: return 'bg-red-800'; // Bronze for 3rd place
      default: return 'bg-gray-400'; // Default background color
    }
  }

  return (
    <CreatorLayout>
      <div className="flex justify-center bg-[#212529] p-6 sm:min-h-screen min-h-screen relative">
        <Head>
          <title>Profile Creator</title>
          <meta name="description" content="Creator profile page." />
        </Head>
        <div className="flex flex-col w-full sm:w-[650px] min-h-screen rounded-xl py-4 px-4 gap-4">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="w-32 h-32 border flex justify-center items-center rounded-full mt-6 bg-orange-500 text-white">
              <img src={profileData.profile_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <p className="text-white font-bold text-[30px] mt-4">{profileData.creator_name}</p>
            <p className="text-white font-bold text-[15px]">{profileData.email}</p>
          </div>
          <div className="w-full h-full rounded-xl bg-[#33393F] p-6 pb-24">
            <p className="text-white text-xl">จำนวน AI ที่สร้าง</p>
            <div className="flex justify-between w-full">
              <p className="text-white">{profileData.count_ai} ตัว</p>
              <Link href="/creator/list_agent" className="underline text-white hover:text-gray-600 focus:text-gray-600">
                ประวิติการสร้าง
              </Link>
            </div>
            <p className="mt-8 text-white text-xl">ประเภทของ AI ทั้งหมด</p>
            <p className="text-white">{profileData.type_ai}</p>
            <h1 className="text-white mt-8 text-xl">AI ที่ถูกใช้งานมากที่สุด</h1>
            <div className='flex gap-4 flex-col'>
              {agents.map((agent, index) => (
                <div key={index} className={`flex ${getBackgrounMaindColor(index + 1)} p-2 rounded-lg w-full gap-2 justify-between items-center`}>
                  <div className='flex gap-2'>
                    <div className='flex items-center justify-center h-[50px] w-[50px] bg-blue-500 rounded-full'>
                      <p className='text-[10px] text-center '>{agent.image_url}</p>
                    </div>
                    <div className='flex w-full items-center'>
                      <h2 className='text-[12px] text-white text-lg font-bold'>{agent.name_agent}</h2>
                    </div>
                  </div>
                  <div className={`w-[20px] h-[20px]`}>
                    <p className={`flex items-center justify-center h-full w-full text-white font-bold text-sm`}>{agent.count_use}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div >
    </CreatorLayout>
  );
};

export default Profile;
