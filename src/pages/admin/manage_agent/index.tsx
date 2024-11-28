import React from 'react';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function Index() {
  return (
    <div>
      <h1>Index Page</h1>
      <Link href="/admin/panel">
        <button className="bg-[#02ffac] text-black px-4 py-2 rounded-lg hover:bg-[#02e69c] transition-all duration-200">
          Go to Admin Panel
        </button>
      </Link>
    </div>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Index;