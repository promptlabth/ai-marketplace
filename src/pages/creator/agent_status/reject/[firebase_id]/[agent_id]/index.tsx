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

interface Review {
  ID: number;
  AdminID: string;
  UserID: string;
  AgentID: number;
  Reason: string;
  DateTime: string;
}

const RejectPage = () => {
  const router = useRouter();
  const { agent_id } = router.query;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userFirebaseID, setUserFirebaseID] = useState<string | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserFirebaseID(userData.user?.firebase_id);
    }
  }, []);

  useEffect(() => {
    if (agent_id) {
      const fetchAgentAndReview = async () => {
        try {
          const agentResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/agent/${agent_id}`);
          if (!agentResponse.ok) {
            throw new Error(`HTTP error! status: ${agentResponse.status}`);
          }
          const agentData = await agentResponse.json();
          setAgent(agentData.agent);

          const reviewResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review/latest/${agent_id}`);
          if (!reviewResponse.ok) {
            throw new Error(`HTTP error! status: ${reviewResponse.status}`);
          }
          const reviewData = await reviewResponse.json();
          setReview(reviewData);
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

      fetchAgentAndReview();
    }
  }, [agent_id]);

  const handleEdit = () => {
    if (userFirebaseID && agent) {
      router.push(`/creator/agent_status/edit/${userFirebaseID}/${agent.ID}`);
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
              <div className={`bg-[#444B52] p-4 rounded-lg w-full mt-4 ${agent.Status === 'reject' ? 'border-red-400 border-2' : ''}`}>
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
                <p className={`text-white mb-2 ${agent.Status === 'reject' ? 'text-red-400' : ''}`}>{agent.Status}</p>
                <button
                  onClick={handleEdit}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                >
                  Edit
                </button>
              </div>
            ) : (
              <p className="text-white">No agent found.</p>
            )}
            {review && (
              <div className="bg-[#444B52] p-4 rounded-lg w-full mt-4">
                <p className="text-red-500 font-bold">Reason for Rejection:</p>
                <p className="text-white mb-2">{review.Reason}</p>
                <p className="text-[#03FCA9] font-bold">Reviewed by Admin:</p>
                <p className="text-white mb-2">{review.AdminID}</p>
                <p className="text-[#03FCA9] font-bold">Review Date:</p>
                <p className="text-white">{new Date(review.DateTime).toLocaleString()}</p>
              </div>
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

export default RejectPage;