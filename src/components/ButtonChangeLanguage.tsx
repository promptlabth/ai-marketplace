import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ButtonChangeLanguage() {
    const router = useRouter();
    const { locale } = router;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLocale, setSelectedLocale] = useState(locale || 'th');

    {/* -------------------delete this when up to production 😈------------------- */ }
    const [prank, setPrank] = useState(false)
    const [en, setEn] = useState(false)
    const [sn, setSn] = useState(false)
    {/* -------------------delete this when up to production 😈------------------- */ }

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
                        <li
                            onClick={() => setPrank(prev => !prev)}
                            className="cursor-pointer flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Spanish
                            <Image src="/png/spanish.png" alt="Thailand flag" width={20} height={20} className="ml-2" />
                        </li>
                    </ul>
                </div>
            )}

            {/* -------------------delete this when up to production 55555------------------- */}
            {prank && (
                <div className="fixed inset-0 flex border justify-center items-center">
                    <div className="flex p-4 items-center justify-center rounded-md gap-2 bg-white drop-shadow-lg ">
                        <button onClick={() => { setPrank(false) }} className="hover:scale-105 hover:text-red-500">Close</button>
                        <div className="flex border gap-2 rounded-md shadow-lg p-1 hover:scale-105">
                            <button onClick={() => { setEn(true) }}>English</button>
                            <Image src="/png/united-states-of-america.png" alt="Thailand flag" width={24} height={20} />
                        </div>
                        <strong>or</strong>
                        <div className="flex border gap-2 rounded-md shadow-lg p-1 hover:scale-105">
                            <button onClick={() => { setSn(true) }}>Spanish</button>
                            <Image src="/png/spanish.png" alt="Thailand flag" width={24} height={20} />
                        </div>
                    </div>
                </div>
            )}

            {en && (
                <div className="fixed inset-0 flex border justify-center items-center">
                    <div className="flex p-8 items-center justify-center rounded-md gap-2 bg-white drop-shadow-lg ">
                        <button onClick={() => { setEn(false), setPrank(false) }} className="hover:scale-105 hover:text-red-500">Close</button>
                        <h1 className="font-bold">Who ever move first is gay.</h1>
                    </div>
                </div>
            )}
            {sn && (
                <div className="fixed inset-0 flex border justify-center items-center">
                    <div className="flex p-8 items-center justify-center rounded-md gap-2 bg-white drop-shadow-lg ">
                        <button onClick={() => { setSn(false), setPrank(false) }} className="hover:scale-105 hover:text-red-500">Close</button>
                        <h1 className="font-bold">Quien se mueve primero es gay.</h1>
                    </div>
                </div>
            )}
            {/* -------------------delete this when up to production 55555------------------- */}
        </div>
    );
}
