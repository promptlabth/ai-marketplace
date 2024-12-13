import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Pagination from "@/components/Pagination";

interface Agent {
  ID: number;
  Name: string;
  Description: string;
  ImageURL: string;
  TotalUsed: number;
  Prompt: object;
  Status: string;
  FirebaseID: string;
  User: User;
}

interface User {
  firebase_id: string;
  role: string;
  name: string;
}

const Modal: React.FC<{ prompt: object; onClose: () => void; onAction: (status: string, reason?: string) => void }> = ({ prompt, onClose, onAction }) => {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleRejectSubmit = () => {
    if (rejectReason.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }
    onAction('reject', rejectReason);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#212529] border-2 border-[#d0d4db] rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-center text-white mb-4">Prompt JSON</h2>
        <pre className="text-white bg-gray-800 p-4 rounded overflow-auto">{JSON.stringify(prompt, null, 2)}</pre>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => onAction('approve')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
          >
            Approve
          </button>
          <button
            onClick={() => onAction('pending')}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200"
          >
            Pending
          </button>
          <button
            onClick={() => setShowRejectForm(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            Reject
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-[#02ffac] text-black px-4 py-2 rounded-lg hover:bg-[#02e69c] transition-all duration-200 shadow-md"
        >
          Close
        </button>
        {showRejectForm && (
          <div className="mt-4">
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02ffac]"
              placeholder="Enter reason for rejection"
            />
            <button
              onClick={handleRejectSubmit}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ManageAgent() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<object | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authorization");
        if (!token) {
          console.error("Authorization token not found");
          router.push("/");
          return;
        }

        console.log("Fetching user data...");
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
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
        const token = localStorage.getItem("authorization");
        if (!token) {
          console.error("Authorization token not found");
          router.push("/");
          return;
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/agents`,{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Agents data:", data);
    
        const agentsWithUsers = await Promise.all(
          data.agents.map(async (agent: Agent) => {
            try {
              const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${agent.FirebaseID}`);
              if (!userResponse.ok) {
                throw new Error(`Failed to fetch user for agent ${agent.ID}`);
              }
              const userData = await userResponse.json();
              return { ...agent, User: userData }; // Merge user data into the agent
            } catch (error) {
              console.error(`Error fetching user for agent ${agent.ID}:`, error);
              return { ...agent, User: null }; // Handle missing user data gracefully
            }
          })
        );
        console.log("agentsWithUsers data:", agentsWithUsers);
        setAgents(agentsWithUsers); // Update state with enriched agents
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

  const handleAction = async (status: string, reason?: string) => {
    if (!selectedAgent) return;

    const statusCode = status === 'approve' ? 1 : status === 'pending' ? 2 : 3;

    if (statusCode === 3 && !reason) {
      alert('Please provide a reason for rejection.');
      return;
    }

    if (statusCode === 3) {
      try {
        const token = localStorage.getItem("authorization");
        if (!token) {
          console.error("Authorization token not found");
          router.push("/");
          return;
        }
        const reviewResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            admin_id: user?.firebase_id,
            agent_id: selectedAgent.ID,
            reason,
          }),
        });
        if (!reviewResponse.ok) {
          throw new Error(`HTTP error! status: ${reviewResponse.status}`);
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        return;
      }
    }

    try {
      const adminResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/${selectedAgent.ID}/${statusCode}`, {
        method: 'POST',
      });
      if (!adminResponse.ok) {
        throw new Error(`HTTP error! status: ${adminResponse.status}`);
      }
      alert(`Agent ${status} successfully`);

      // Update the agent status in the state
      setAgents(prevAgents =>
        prevAgents.map(agent =>
          agent.ID === selectedAgent.ID ? { ...agent, Status: status } : agent
        )
      );
    } catch (error) {
      console.error("Error updating agent status:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
    console.log(`Current page: ${page}`);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAgents = filteredAgents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);

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
                <th className="py-2 px-4 border-b border-gray-600">Created By</th>
                <th className="py-2 px-4 border-b border-gray-600">Description</th>
                <th className="py-2 px-4 border-b border-gray-600">Total Used</th>
                <th className="py-2 px-4 border-b border-gray-600">Status</th>
                <th className="py-2 px-4 border-b border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAgents.map((agent) => (
                <tr key={agent.ID} className="group relative">
                  <td className="py-2 px-4 border-b border-gray-600">{agent.ID}</td>
                  <td className="py-2 px-4 border-b border-gray-600">
                    {agent.ImageURL ? (
                      <img src={agent.ImageURL} alt={agent.Name} className="h-10 w-10 object-cover rounded-full" />
                    ) : (
                      <div className="h-10 w-10 bg-gray-500 rounded-full flex items-center justify-center">
                        <span className="text-white"></span>
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600">{agent.Name}</td>
                  <td className="py-2 px-4 border-b border-gray-600">{agent?.User?.name ?? ""}</td>
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
                      onClick={() => {
                        setSelectedPrompt(agent.Prompt);
                        setSelectedAgent(agent);
                      }}
                    >
                      View Prompt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedPrompt && (
        <Modal
          prompt={selectedPrompt}
          onClose={() => {
            setSelectedPrompt(null);
            setSelectedAgent(null);
          }}
          onAction={handleAction}
        />
      )}
    </div>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
