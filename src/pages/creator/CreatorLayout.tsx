import StudioMenu from "@/components/StudioiMenu";

export default function CreatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <StudioMenu />
        </>
    )
}