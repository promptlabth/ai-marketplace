import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ButtonChangeLanguage() {
    const router = useRouter();
    const { locale } = router;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLocale, setSelectedLocale] = useState(locale || 'th');

    const handleChangeLanguage = (newLocale: string) => {
        setSelectedLocale(newLocale);
        router.push(router.pathname, router.asPath, { locale: newLocale });
        setIsOpen(false);
    };

    useEffect(() => {
        if (!locale) {
            router.push(router.pathname, router.asPath, { locale: 'th' });
        }
    }, [locale, router]);

    return (
        <div className="flex flex-col animate-fade-down">
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-white text-sm font-medium hover:bg-gray-600 focus:outline-none"
                >
                    {selectedLocale === 'th' ? (
                        <>
                            ภาษาไทย
                            <Image src="/png/thailand.png" alt="Thailand flag" width={20} height={20} className="ml-2" />
                        </>
                    ) : (
                        <>
                            English
                            <Image src="/png/united-states-of-america.png" alt="Thailand flag" width={20} height={20} className="ml-2" />
                        </>
                    )}
                </button>
            </div>

            {isOpen && (
                <div className="rounded-md shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <ul className="py-1">
                        <li
                            onClick={() => handleChangeLanguage('th')}
                            className="cursor-pointer flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            ภาษาไทย
                            <Image src="/png/thailand.png" alt="Thailand flag" width={20} height={20} className="ml-2" />
                        </li>
                        <li
                            onClick={() => handleChangeLanguage('en')}
                            className="cursor-pointer flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            English
                            <Image src="/png/united-states-of-america.png" alt="Thailand flag" width={20} height={20} className="ml-2" />
                        </li>
                    </ul>
                </div>
            )}

            
        </div>
    );
}
