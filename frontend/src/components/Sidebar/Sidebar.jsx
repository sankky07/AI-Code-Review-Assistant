import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    History,
    LogOut,
    GitBranch
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { getCurrentUser } from "../../services/userService";

function Sidebar() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {

        try {

            const data = await getCurrentUser();

            setUser(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    const menuClass = ({ isActive }) =>

        `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`;

    return (

        <aside className="w-72 bg-[#0B1120] border-r border-slate-800 flex flex-col">

            {/* Logo */}

            <div className="px-8 py-8 border-b border-slate-800">

                <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">

                        <GitBranch size={22} />

                    </div>

                    <div>

                        <h1 className="text-lg font-bold tracking-tight">

                            AI Review

                        </h1>

                        <p className="text-sm text-slate-500">

                            Code Assistant

                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <nav className="flex-1 px-5 py-8 space-y-2">

                <NavLink

                    to="/dashboard"

                    className={menuClass}

                >

                    <LayoutDashboard size={18} />

                    Dashboard

                </NavLink>

                <NavLink

                    to="/history"

                    className={menuClass}

                >

                    <History size={18} />

                    Review History

                </NavLink>

            </nav>

            {/* User */}

            <div className="border-t border-slate-800 p-5">

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">

                    <div className="flex items-center gap-3">

                        <img

                            src={
                                user?.avatarUrl ||
                                "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                            }

                            alt="avatar"

                            className="w-12 h-12 rounded-full"

                        />

                        <div className="min-w-0">

                            <h3 className="font-semibold truncate">

                                {user?.name || user?.login || "GitHub User"}

                            </h3>

                            <p className="text-sm text-slate-500 truncate">

                                @{user?.login}

                            </p>

                        </div>

                    </div>

                </div>

                <button

                    onClick={() => {

                        window.location.href =
                            "http://localhost:8080/logout";

                    }}

                    className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"

                >

                    <LogOut size={17} />

                    Logout

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;