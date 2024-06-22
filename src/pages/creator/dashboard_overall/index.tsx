import React from "react";
import Head from 'next/head';
import data_dashboard from "@/domain/creator/create_agent/__mock__/dashboard_overall_agent.json";
import DashboardCard from "@/components/DashboardCard";
import Link from "next/link";
import options from "@/components/hooks/DashboardAgent.hook";
import options_revenue from "@/components/hooks/DashboardRevenueAgent.hook";
import StudioMenu from "@/components/StudioiMenu";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";

const AgentDashboardOverall = () => {
    const { t } = useTranslation("common");

    return (
        <div className="flex justify-center bg-[#212529] p-6 sm:min-h-screen min-h-screen relative">
            <Head>
                <title>{t("dashboard_overall.viewAgent")}</title>
                <meta name="description" content="" />
            </Head>
            <div className="absolute top-4 right-4">
                <div className="flex gap-2">
                    <ButtonChangeLanguage />
                    {/* <StudioMenu /> */}
                </div>
            </div>
            <div className="flex flex-col w-full sm:w-[650px] min-h-screen bg-[#212529] rounded-xl gap-4 pb-8 pt-12">
                <div className="flex h-fit w-full gap-4">
                    <div className="flex flex-col w-full rounded-lg bg-[#03FFAB] p-2">
                        <p className="text-sm">{t("dashboard_overall.title.totalUsers")}</p>
                        <p className="text-center font-bold text-[30px]">{data_dashboard.total_week}</p>
                    </div>
                    <div className="flex h-fit flex-col w-full rounded-lg bg-[#03FFAB] p-2">
                        <p className="text-sm">{t("dashboard_overall.title.totalToday")}</p>
                        <p className="text-center font-bold text-[30px]">{data_dashboard.total_today}</p>
                    </div>
                    <div className="flex w-full justify-center items-center px-2.5 py-0.5 text-[30px] font-semibold text-[#03FFAB] text-center">
                        {data_dashboard.total_week_percent}
                        <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 10 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                        </svg>
                    </div>
                </div>
                <DashboardCard options={options} series={options.series} name={t("dashboard_overall.graph_title.usersThisWeek")} bottom_name={t("dashboard_overall.click_able.usersReport")} />
                <div className="flex flex-col justify-center items-center w-full">
                    <Link href="/creator/payments" className="bg-yellow-400 w-full text-black font-bold p-1 rounded-md flex justify-between">
                        {t("dashboard_overall.title.totalRevenue")}
                        <p>฿{data_dashboard.revenue}</p>
                    </Link>
                </div>
                <DashboardCard options={options_revenue} series={options_revenue.series} name={t("dashboard_overall.title.revenueThisWeek")} bottom_name={t("dashboard_overall.click_able.revenueReport")} />
            </div>
        </div>
    );
}

export default AgentDashboardOverall;

export const getServerSideProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});
