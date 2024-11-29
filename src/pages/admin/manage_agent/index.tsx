import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

interface Agent {
  ID: number;
  Name: string;
  Description: string;
  ImageURL: string;
  TotalUsed: number;
  Prompt: object;
  Status: string;
}

const Modal: React.FC<{ prompt: object; onClose: () => void }> = ({ prompt, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-[#212529] border-2 border-[#d0d4db] rounded-lg shadow-xl w-full max-w-md p-6">
      <h2 className="text-xl font-semibold text-center text-white mb-4">Prompt JSON</h2>
      <pre className="text-white bg-gray-800 p-4 rounded overflow-auto">{JSON.stringify(prompt, null, 2)}</pre>
      <button
        onClick={onClose}
        className="mt-4 bg-[#02ffac] text-black px-4 py-2 rounded-lg hover:bg-[#02e69c] transition-all duration-200 shadow-md"
      >
        Close
      </button>
    </div>
  </div>
);

export default function ManageAgent() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<object | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const firebaseId = localStorage.getItem("firebase_id");
        if (!firebaseId) {
          console.error("No firebase_id found in local storage");
          router.push("/");
          return;
        }

        console.log("Fetching user data...");
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${firebaseId}`);
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("User data:", data);
        setUser(data);

        if (data.role !== "admin") {
          console.log("User is not admin, redirecting...");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/");
      }
    };

    const fetchAgents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/agents`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Agents data:", data);
        setAgents(data.agents);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchUserData();
    fetchAgents();
  }, [router]);

  const filteredAgents = agents.filter(agent => {
    return (
      agent.Name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === "" || agent.Status === statusFilter)
    );
  });

  const handleStatusChange = async (agentId: number, status: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/${agentId}/${status}`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedAgents = agents.map(agent => 
        agent.ID === agentId ? { ...agent, Status: status === 1 ? "approve" : status === 2 ? "pending" : "reject" } : agent
      );
      setAgents(updatedAgents);
    } catch (error) {
      console.error("Error updating agent status:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#212529] p-6 min-h-screen flex flex-col justify-center items-center m-5">
      <Head>
        <title>Manage Agents</title>
        <meta name="description" content="Admin panel for managing agents" />
      </Head>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <Navbar />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-white text-2xl mb-4">Admin Agent Management</h1>
        <div className="w-full max-w-4xl mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded-lg ${statusFilter === "" ? "bg-blue-500 text-white" : "bg-gray-500 text-white"} hover:bg-blue-700 transition-all duration-200`}
              onClick={() => setStatusFilter("")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${statusFilter === "approve" ? "bg-blue-500 text-white" : "bg-gray-500 text-white"} hover:bg-blue-700 transition-all duration-200`}
              onClick={() => setStatusFilter("approve")}
            >
              Approve
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${statusFilter === "pending" ? "bg-blue-500 text-white" : "bg-gray-500 text-white"} hover:bg-blue-700 transition-all duration-200`}
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${statusFilter === "reject" ? "bg-blue-500 text-white" : "bg-gray-500 text-white"} hover:bg-blue-700 transition-all duration-200`}
              onClick={() => setStatusFilter("reject")}
            >
              Reject
            </button>
          </div>
        </div>
        <div className="w-full max-w-4xl">
          <table className="min-w-full bg-[#33393F] text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-600">ID</th>
                <th className="py-2 px-4 border-b border-gray-600">Image</th>
                <th className="py-2 px-4 border-b border-gray-600">Name</th>
                <th className="py-2 px-4 border-b border-gray-600">Description</th>
                <th className="py-2 px-4 border-b border-gray-600">Total Used</th>
                <th className="py-2 px-4 border-b border-gray-600">Status</th>
                <th className="py-2 px-4 border-b border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.map((agent) => (
                <tr key={agent.ID} className="group relative">
                  <td className="py-2 px-4 border-b border-gray-600">{agent.ID}</td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    {agent.ImageURL ? (
                      <img src={agent.ImageURL} alt={agent.Name} className="h-16 w-16 object-cover rounded-full" />
                    ) : (
                      <div className="h-16 w-16 bg-gray-500 rounded-full flex items-center justify-center">
                        <span className="text-white">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600">{agent.Name}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{agent.Description}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{agent.TotalUsed}</td>
                  <td className={`py-2 px-4 border-b border-gray-600 ${agent.Status === "approve" ? "text-green-500" : agent.Status === "pending" ? "text-yellow-500" : agent.Status === "reject" ? "text-red-500" : ""}`}>
                    {agent.Status}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md ml-2">
                      Delete
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md ml-2"
                      onClick={() => setSelectedPrompt(agent.Prompt)}
                    >
                      View Prompt
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md ml-2"
                      onClick={() => handleStatusChange(agent.ID, 1)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-200 shadow-md ml-2"
                      onClick={() => handleStatusChange(agent.ID, 2)}
                    >
                      Pending
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md ml-2"
                      onClick={() => handleStatusChange(agent.ID, 3)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedPrompt && <Modal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />}
    </div>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
