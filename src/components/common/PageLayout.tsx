import Menu from "./Menu";

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Menu />
            {children}
        </div>
    )
}