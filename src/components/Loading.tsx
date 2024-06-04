import Image from "next/image"


export default function Loading() {

    return (
        <main className="h-screen flex items-center justify-center">
            <Image src="/png/prompt-lab-loading.png" alt="Loading..." width={110} height={110} className="inset-0 animate-ping"/>
        </main>
    )
}
