import Head from "next/head";
import Image from "next/image";
import ButtonNext from "@/components/ButtonNext";
import GetAgent from "@/services/api/GetAgentID";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import RoleCategory from "@/components/RoleCategory";
import FrameworkDetail from "@/components/FrameworkDetail";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useGlobal } from "@/context/context";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import Navbar from "@/components/Navbar";

const AgentView = () => {
  const router = useRouter();
  const { view_agentID } = router.query;
  const { data, isLoading, error } = GetAgent(Number(view_agentID));
  const { agent, setAgent } = useGlobal();
  const { t } = useTranslation("common");
  const { i18n } = useTranslation();

  useEffect(() => {
    console.log(data?.agent);
    setAgent(data?.agent);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Fetch Data error</div>;
  }

  return (
    <div className="bg-[#212529] p-6 min-h-screen flex justify-center">
      <Head>
        <title>{t("customer.marketplace.viewAgent")}</title>
        <meta name="description" content="" />
      </Head>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <Navbar />
        </div>
      </div>
      <div className="relative my-5 flex flex-col justify-between sm:w-[600px] h-full bg-[#33393F] overflow-hidden rounded-xl py-4 px-4 gap-4 mb-10">
        {data?.agent?.Language && (
          <div className="absolute top-0 right-0 bg-white text-black p-1 flex items-center">
            {data.agent.Language === "th" && (
              <>
                <Image
                  src="/png/thailand.png"
                  alt="Thai flag"
                  width={20}
                  height={20}
                />
                <span className="ml-1">Thailand</span>
              </>
            )}
            {data.agent.Language === "en" && (
              <>
                <Image
                  src="/png/united-states-of-america.png"
                  alt="English flag"
                  width={20}
                  height={20}
                />
                <span className="ml-1">English</span>
              </>
            )}
          </div>
        )}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col overflow-hidden rounded-full relative w-20 h-20 justify-center items-center">
                {data?.agent?.ImageURL ? (
                  <Image
                    src={data.agent.ImageURL}
                    alt="Agent image"
                    layout="fill"
                    className="object-cover"
                  />
                ) : (
                  <p>{t("customer.marketplace.viewAgent.ImageStatusnt")}</p>
                )}
              </div>
            </div>
            <p className="flex w-full justify-center text-white font-bold text-[30px]">
              {data?.agent?.Name}
            </p>
          </div>
          <div className="flex flex-col">
            <RoleCategory
              roleFrameID={data?.agent?.RoleFrameID || 0}
              translations={t}
            />
            <FrameworkDetail
              FrameworkID={data?.agent?.FrameworkID || 0}
              translations={t}
            />
            <div className="flex flex-col text-[#03FCA9] mt-8">
              {t("customer.marketplace.viewAgent.AIDescription")}:
              <p className="text-white text-wrap break-words">
                {data?.agent?.Description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-around items-end w-full gap-4">
          <ButtonNext name_button="Use AI" route_page="/customer/use_agent" />
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

export default AgentView;
