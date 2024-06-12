import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ButtonChangeLanguage() {
    const router = useRouter();
    const { locale } = router;


    const handleChangeLanguage = (event: any) => {
        const selectedLocale = event.target.value;
        router.push(router.pathname, router.asPath, { locale: selectedLocale });
    };

    useEffect

    return (
        <select value={locale || "th"} onChange={handleChangeLanguage} className="absolute top-4 right-6 p-2 rounded bg-gray-700 text-white">
            <option value="th">ภาษาไทย</option>
            <option value="en">English</option>
        </select>
    );
}
