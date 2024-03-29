import React from "react";
import Head from 'next/head';
import Image from "next/image";
import data from "@/domain/customer/marketplace/__mock__/view_agent.json";
import data_dashboard from "@/domain/creator/create_agent/__mock__/user.json"
import Reverse_button from "@/components/Reverse_button"
import DashboardCard from "@/components/DashboardCard";


const AgentDashborard = () => {
  return (
    <div className="bg-[#212529] p-6 min-h-screen relative">
      <Head>
        <title>View Agent</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex flex-col w-full min-h-screen bg-[#33393F] rounded-xl py-4 px-4 gap-4">
        <Reverse_button route_path="/" />
        <div className="flex flex-col gap-12">
          <div className="flex flex-col justify-center items-center w-full">
            <Image src="/judment.svg" alt="" width={100} height={100} />
            <p className="flex w-full justify-center text-white font-bold text-[30px]">{data.name_ai}</p>
          </div>
        </div>
        <div className="flex h-full w-full gap-4">
          <div className="flex flex-col w-full rounded-lg bg-[#03FFAB] p-2">
            <p className="text-sm">Total</p>
            <p className="text-center font-bold text-[30px]">{data_dashboard.total_week}</p>
          </div>
          <div className="flex flex-col w-full rounded-lg bg-[#03FFAB] p-2">
            <p className="text-sm">Today</p>
            <p className="text-center font-bold text-[30px]">{data_dashboard.total_today}</p>
          </div>
          <div className="flex w-full justify-center items-center px-2.5 py-0.5 text-[30px] font-semibold text-[#03FFAB] text-center">
            {data_dashboard.total_week_percent}
            <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
            </svg>
          </div>
        </div>
        <div>
          <DashboardCard />
        </div>
      </div>
    </div >
  );
}

export default AgentDashborard;
