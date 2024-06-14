import ButtonCancle from "@/components/ButtonCancle";
import Framework from "@/components/Framework";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import useEditAgents from "@/components/hooks/EditAgent.hook";

const EditAgent = () => {
  const { EditAgentItems } = useEditAgents();

  const { t } = useTranslation("common");
  return (
    <div className="bg-[#212529] p-4 min-h-screen flex justify-center items-center">
      <Head>
        <title>{t("editAagent.title")}</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex flex-col w-full min-h-screen sm:w-[650px] bg-[#33393F] rounded-xl gap-2 mb-12">
        <div className="gap-2 p-2">
          <Framework translations={t} />
          <div className="flex justify-around items-center w-full gap-2 pt-2">
            <button
              onClick={EditAgentItems.handleCreateAgent}
              className="flex-auto hover:bg-[#03FFAB] hover:text-white focus:bg-[#03FFAB] sm:text-[17px] sm:font-bold focus:text-black h-[40px] w-full ring-2 ring-[#03FFAB] ring-inset rounded-full text-[12px] text-[#03FFAB]"
            >
              {t("button.create")}
            </button>
            <ButtonCancle name_button={t("button.back")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAgent;
export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
