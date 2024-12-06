import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage";
import Loading from "@/components/Loading";

interface Agent {
  ID: number;
  Name: string;
  Description: string;
  ImageURL: string;
  Prompt: Record<string, string>;
  FirebaseID: string;
  FrameworkID: number;
  RoleFrameID: number;
  TotalUsed: number;
  Status: string;
}

const ApprovePage = () => {
  const router = useRouter();
  const { agent_id } = router.query;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (agent_id) {
      const fetchAgent = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/agent/${agent_id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setAgent(data.agent);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError(String(error));
          }
        } finally {
          setLoading(false);
        }
      };

      fetchAgent();
    }
  }, [agent_id]);

  const handleUseAI = () => {
    if (agent) {
      router.push(`/customer/${agent.ID}`);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-[#212529] p-6 min-h-screen flex justify-center">
      <Head>
        <title>Agent Details</title>
        <meta name="description" content="Agent details" />
      </Head>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <ButtonChangeLanguage />
        </div>
      </div>
      <div className="flex flex-col justify-between sm:w-[600px] h-full bg-[#33393F] overflow-hidden rounded-xl py-4 px-4 gap-4 mb-10">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-white font-bold text-[30px]">Agent Details</h1>
            {agent ? (
              <div className={`bg-[#444B52] p-4 rounded-lg w-full mt-4 ${agent.Status === 'approve' ? 'border-green-400 border-2' : ''}`}>
                <div className="flex items-center justify-center rounded-full h-[150px] w-[150px] bg-[#02ffac] mb-4">
                  <img src={agent.ImageURL} alt={agent.Name} className="h-full w-full object-cover rounded-full" />
                </div>
                <p className="text-[#03FCA9] font-bold">Name:</p>
                <p className="text-white mb-2">{agent.Name}</p>
                <p className="text-[#03FCA9] font-bold">Description:</p>
                <p className="text-white mb-2">{agent.Description}</p>
                {Object.entries(agent.Prompt).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-[#03FCA9] font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}:</p>
                    <p className="text-white mb-2">{value}</p>
                  </div>
                ))}
                <p className="text-[#03FCA9] font-bold">Total Used:</p>
                <p className="text-white mb-2">{agent.TotalUsed}</p>
                <p className="text-[#03FCA9] font-bold">Status:</p>
                <p className={`text-white mb-2 ${agent.Status === 'approve' ? 'text-green-400' : ''}`}>{agent.Status}</p>
                <button
                  onClick={handleUseAI}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
                >
                  Use AI
                </button>
              </div>
            ) : (
              <p className="text-white">No agent found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default ApprovePage;