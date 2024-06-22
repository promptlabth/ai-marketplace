import React from "react";
import Head from 'next/head';
import data from "@/domain/creator/create_agent/__mock__/payments.json"
import Link from "next/link";
import StudioMenu from "@/components/StudioiMenu";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";


const Payment = () => {
  const { t } = useTranslation("common");
  return (
    <div className="flex justify-center bg-[#212529] p-6 sm:min-h-screen min-h-screen relative">
      <Head>
        <title>{t("payments.creator.title")}</title>
        <meta name="description" content="" />
      </Head>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <ButtonChangeLanguage />
          {/* <StudioMenu /> */}
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-[650px] min-h-screen rounded-xl py-4 px-4 gap-4">
        <h1 className="text-center font-bold text-white mt-8 text-[20px]">
          {t("payments.creator.paymentslist")}
        </h1>
        <div className="w-full bg-[#33393F] h-full p-4 rounded-lg overflow-auto">
          <table className="rounded-lg w-full hidden sm:table">
            <thead className="border-b">
              <tr>
                <th scope="col" className="font-bold text-white">
                  {t("payments.creator.table.nameColumn.order")}
                </th>
                <th scope="col" className="font-bold text-white">
                  {t("payments.creator.table.nameColumn.date")}
                </th>
                <th scope="col" className="font-bold text-white">
                  {t("payments.creator.table.nameColumn.nameAI")}
                </th>
                <th scope="col" className="font-bold text-[#03FFAB]">
                  {t("payments.creator.table.nameColumn.income")}
                </th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data.map((data_payment, index) => (
                <tr key={index}>
                  <th scope="row" className="text-white">
                    {index + 1}
                  </th>
                  <td className="text-center text-white">
                    {data_payment.date}
                  </td>
                  <td className="text-center text-white underline hover:text-gray-600">
                    <Link href={"/creator/list_agent"}>
                      {data_payment.name_ai}
                    </Link>
                  </td>
                  <td className="text-center text-green-400">
                    ฿{data_payment.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sm:hidden">
            {data.map((data_payment, index) => (
              <div key={index} className="text-white py-2 border-b">
                <div>
                  <strong>วันที่:</strong> {data_payment.date}
                </div>
                <div>
                  <strong>AI ที่ซื้อ:</strong>
                  <Link
                    href={"/creator/list_agent"}
                    className="underline hover:text-gray-600"
                  >
                    {data_payment.name_ai}
                  </Link>
                </div>
                <div>
                  <strong>รายได้:</strong> ฿{data_payment.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});