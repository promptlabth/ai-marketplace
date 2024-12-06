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

const EditAgentPage = () => {
  const router = useRouter();
  const { agent_id } = router.query;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPic, setUserPic] = useState<string | null>(null);
  const [userFirebaseID, setUserFirebaseID] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserPic(userData.user?.profile_pic);
      setUserFirebaseID(userData.user?.firebase_id);
      setUserData(userData.user);
    }
  }, []);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAgent(prevAgent => prevAgent ? { ...prevAgent, [name]: value } : null);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAgent(prevAgent => prevAgent ? { ...prevAgent, Prompt: { ...prevAgent.Prompt, [name]: value } } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (agent) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/update_agent/${agent.ID}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(agent),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAgent(data.agent);
        alert('Agent updated successfully');
        router.push('/creator/agent_dashboard');
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      }
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
        <title>Edit Agent</title>
        <meta name="description" content="Edit agent details" />
      </Head>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <ButtonChangeLanguage />
        </div>
      </div>
      <div className="flex flex-col justify-between sm:w-[600px] h-full bg-[#33393F] overflow-hidden rounded-xl py-4 px-4 gap-4 mb-10">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-white font-bold text-[30px]">Edit Agent</h1>
            {agent ? (
              <form onSubmit={handleSubmit} className="bg-[#444B52] p-4 rounded-lg w-full mt-4">
                <div className="flex items-center justify-center rounded-full h-[150px] w-[150px] bg-[#02ffac] mb-4">
                  <img src={agent.ImageURL} alt={agent.Name} className="h-full w-full object-cover rounded-full" />
                </div>
                <label className="text-[#03FCA9] font-bold">Name:</label>
                <input
                  type="text"
                  name="Name"
                  value={agent.Name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02ffac]"
                />
                <label className="text-[#03FCA9] font-bold">Description:</label>
                <textarea
                  name="Description"
                  value={agent.Description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02ffac]"
                />
                {Object.entries(agent.Prompt).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-[#03FCA9] font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handlePromptChange}
                      className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02ffac]"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
                >
                  Save Changes
                </button>
              </form>
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

export default EditAgentPage;