import React, { useState } from "react";
import Head from 'next/head';
import Image from "next/image";
import data from "@/domain/customer/history_agent/__mock__/history_agent.json";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const AgentHistory = () => {
  const [openStates, setOpenStates] = useState(
    data.interactions.map(() => false)
  );

  const toggleDropdown = (index: any) => {
    const updatedOpenStates = [...openStates];
    updatedOpenStates[index] = !updatedOpenStates[index];
    setOpenStates(updatedOpenStates);
  };

  return (
    <div className="bg-[#212529] p-6 min-h-screen flex justify-center">
      <Head>
        <title>View Agent</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex flex-col justify-between sm:w-[600px] w-full min-h-screen bg-[#33393F] rounded-xl py-4 px-4 gap-4 mb-10">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <Image src="/judment.svg" alt="" width={100} height={100} />
            <p className="flex w-full justify-center text-white font-bold text-[30px]">{data.name_ai}</p>
          </div>
          <div className="flex flex-col">
            {data.interactions.map((interaction, index) => (
              <div key={index} className="w-full border-b border-gray-400 p-2">
                <p className="text-[10px] text-white">{interaction.date}</p>
                <div className="flex justify-between items-start">
                  <article className="flex-1 shrink min-w-0">
                    <p className="text-white text-sm break-words">คำถาม: {interaction.question}</p>
                    {openStates[index] && (
                      <p className="text-gray-400 text-sm break-words">คำตอบ: {interaction.answer}</p>
                    )}
                  </article>
                  <div className="ml-2 flex-shrink-0">
                    <button onClick={() => toggleDropdown(index)} className="hover:scale-110 focus:scale-110">
                      {!openStates[index] ? (
                        <IoIosArrowDown color="white" />
                      ) : (
                        <IoIosArrowUp color="white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}

export default AgentHistory;
