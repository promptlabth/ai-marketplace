import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MdOutlineArrowDropDown } from "react-icons/md";

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
                    className="inline-flex justify-center items-center w-full rounded-md shadow-sm px-2 py-1 text-white text-sm font-medium hover:bg-gray-600"
                >
                    {selectedLocale === 'th' ? (
                        <>
                            <p>ภาษาไทย</p>
                            <Image src="/png/thailand.png" alt="Thailand flag" width={20} height={20} className="ml-2" />
                        </>
                    ) : (
                        <>
                            <p>English</p>
                            <Image src="/png/united-states-of-america.png" alt="Thailand flag" width={20} height={20} className="ml-2" />
                        </>
                    )}
                    <MdOutlineArrowDropDown />
                </button>
            </div>

            {isOpen && (
                <div className="rounded-md shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <ul className="space-y ">
                        <li
                            onClick={() => handleChangeLanguage('th')}
                            className="cursor-pointer flex items-center p-1 text-sm text-gray-700 hover:bg-gray-300 hover:rounded-md"
                        >
                            ภาษาไทย
                            <Image src="/png/thailand.png" alt="Thailand flag" width={20} height={20} className="ml-2" />
                        </li>
                        <li
                            onClick={() => handleChangeLanguage('en')}
                            className="cursor-pointer flex items-center p-1 text-sm text-gray-700 hover:bg-gray-300 hover:rounded-md"
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
