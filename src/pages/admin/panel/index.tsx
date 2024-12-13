import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

export default function AdminPanel() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [user, setUser] = useState(null);

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

    fetchUserData();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#212529] p-6 min-h-screen flex justify-center">
      <Head>
        <title>panel admin</title>
        <meta name="description" content="" />
      </Head>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <Navbar />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Link href="/admin/manage_agent" passHref>
          <button className="bg-[#02ffac] text-black px-4 py-2 rounded-lg hover:bg-[#02e69c] transition-all duration-200">
            {t("admin.manage_agent_button")}
          </button>
        </Link>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
