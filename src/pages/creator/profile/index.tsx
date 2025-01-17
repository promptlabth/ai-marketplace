import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from "next/link";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Navbar from "@/components/Navbar";

interface Agent {
  ID: number;
  Name: string;
  Description: string;
  ImageURL: string;
  TotalUsed: number;
}

interface UserData {
  id: number;
  firebase_id: string;
  name: string;
  email: string | null;
  accessToken: string;
  balanceMessage: number;
  platform: string;
  profile_pic: string;
  stripeId: string | null;
  count_ai: number | null;
  type_ai: string | null; 
  role: string;
}

const Profile = () => {
  const [userPic, setUserPic] = useState<string | null>(null);
  const [userFirebaseID, setUserFirebaseID] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { t } = useTranslation('common');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authorization");
      if (!token) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data: UserData = await response.json();
        setUserPic(data.profile_pic);
        setUserFirebaseID(data.firebase_id);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchAgents = async () => {
      if (!userFirebaseID) return;
  
      try {
        const token = localStorage.getItem("authorization");
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/agent/user_id`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const sortedAgents = data.agents.sort((a: Agent, b: Agent) => b.TotalUsed - a.TotalUsed);
        setAgents(sortedAgents.slice(0, 3));
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };
  
    fetchAgents();
  }, [userFirebaseID]);

  const getBackgrounMaindColor = (index: number) => {
    switch (index) {
      case 1: return 'bg-amber-400/90';   // Gold for 1st place
      case 2: return 'bg-slate-500'; // Silver for 2nd place
      case 3: return 'bg-red-800'; // Bronze for 3rd place
      default: return 'bg-gray-400'; // Default background color
    }
  };

  return (
    <div className="flex justify-center bg-[#212529] p-6 sm:min-h-screen min-h-screen relative">
      <Head>
        <title>Profile Creator</title>
        <meta name="description" content="Creator profile page." />
      </Head>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <Navbar />
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-[650px] min-h-screen rounded-xl py-4 px-4 gap-4">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="w-32 h-32 border flex justify-center items-center rounded-full mt-6 bg-orange-500 text-white">
            <img src={userPic || ''} alt="Profile" className="rounded-full w-full h-full object-cover" />
          </div>
          <p className="text-white font-bold text-[30px] mt-4">{userData?.name}</p>
          <p className="text-white font-bold text-[15px]">{userData?.email}</p>
        </div>
        <div className="w-full h-full rounded-xl bg-[#33393F] p-6 pb-24">
          <p className="text-white text-xl">{t('creator.profile.ai_created')}</p>
          <div className=''>
            <p className="text-white">{agents.length}</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="text-white">{userData?.count_ai} {t('creator.profile.count_ai')}</p>
            <Link href="/creator/agent_dashboard" className="underline text-white hover:text-gray-600 focus:text-gray-600">
              {t('creator.profile.link')}
            </Link>
            <Link href="/creator/agent_usage" className="underline text-white hover:text-gray-600 focus:text-gray-600">
              {t('creator.profile.link2')}
            </Link>
          </div>
          <p className="mt-8 text-white text-xl"> {t('creator.profile.ai_type')}</p>
          <p className="text-white">{userData?.type_ai}</p>
          <h1 className="text-white mt-8 text-xl">{t('creator.profile.my_ai')}</h1>
          <div className='flex gap-4 flex-col'>
            {agents.map((agent, index) => (
              <Link key={index} href={`/customer/${agent.ID}`} legacyBehavior>
                <a className={`flex ${getBackgrounMaindColor(index + 1)} p-2 rounded-lg w-full gap-2 justify-between items-center cursor-pointer`}>
                  <div className='flex gap-2'>
                    <div className='flex items-center justify-center h-[50px] w-[50px] bg-blue-500 rounded-full'>
                      <img src={agent.ImageURL} alt={agent.Name} className='h-full w-full object-cover rounded-full' />
                    </div>
                    <div className='flex w-full items-center'>
                      <h2 className='text-[12px] text-white text-lg font-bold'>{agent.Name}</h2>
                    </div>
                  </div>
                  <div className={`w-[20px] h-[20px]`}>
                    <p className={`flex items-center justify-center h-full w-full text-white font-bold text-sm`}>{agent.TotalUsed}</p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Profile;