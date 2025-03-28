import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { FaQuestion } from "react-icons/fa";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const Error404Page = () => {
    const router = useRouter();
    const { t } = useTranslation("common");
    
    return (
        <>
        <Head>
            <title>404 - Page Not Found</title>
        </Head>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <FaQuestion className="text-9xl text-gray-300" />
            <h3 className="mt-4 mb-4 text-2xl font-bold text-gray-300">{t("error.title")}</h3>
            <div className="w-full mt-4 mb-4 flex flex-col items-center justify-center">
                <button
                        className="w-1/4 mt-4 border border-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-700"
                        onClick={() => router.push("/")}
                    >
                    <span>
                        {t("error.close")}
                    </span>
                </button>
            </div>
        </div>
        </>
    );
}

export const getStaticProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
});

export default Error404Page;