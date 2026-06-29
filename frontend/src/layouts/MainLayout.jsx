import Sidebar from "../components/Sidebar/Sidebar";

function MainLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-950">

            <Sidebar />

            <main className="flex-1 overflow-auto">
                {children}
            </main>

        </div>
    );
}

export default MainLayout;