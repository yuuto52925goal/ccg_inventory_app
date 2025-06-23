import Menu from "./Menu";

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <Menu />
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}