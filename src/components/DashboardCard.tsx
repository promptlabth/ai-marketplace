import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import options from './hooks/DashboardCard.hook';
import data from "@/domain/creator/create_agent/__mock__/user.json"


const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const DashboardCard: React.FC = () => {

    return (
        <div className="w-full rounded-lg shadow bg-[#212529] p-4 md:p-6">
            <div className="flex justify-between">
                <div>
                    <p className="text-base font-normal text-gray-500">Users this week</p>
                </div>
            </div>
            <div>
                <ReactApexChart
                    options={options}
                    series={options.series}
                    type="area"
                    height="250"
                />
            </div>
            <div className="flex items-center border-gray-200 border-t justify-between pt-5">
                <button
                    className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                    type="button">
                    Last 7 days
                    <Image src='/png/arrow_down_white.png' alt='' height={15} width={20} className='ml-2'/>
                </button>
                <p className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-gray-500 py-2">
                    Users Report
                </p>
            </div>
        </div>
    );
};

export default DashboardCard;



