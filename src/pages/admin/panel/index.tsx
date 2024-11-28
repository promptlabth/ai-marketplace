import React from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Index() {
  const { t } = useTranslation("common");
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
