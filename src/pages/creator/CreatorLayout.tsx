import StudioMenu from "@/components/Studioi_menu";

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