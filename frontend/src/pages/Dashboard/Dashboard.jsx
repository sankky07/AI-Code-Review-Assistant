import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import RepositoryCard from "../../components/RepositoryCard/RepositoryCard";
import { getRepositories } from "../../services/repositoryService";
import toast from "react-hot-toast";
function Dashboard() {

    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        loadRepositories();
    }, []);

    async function loadRepositories() {

        try {

            const data = await getRepositories();

            setRepositories(Array.isArray(data) ? data : []);

        } catch (err) {

            console.error(err);

            toast.error("Unable to load repositories.");

            setError("Unable to load repositories.");

        } finally {

            setLoading(false);

        }

    }

    const filteredRepositories = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <MainLayout>

            <div className="max-w-7xl mx-auto p-10">

                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">

                    <div>

                        <h1 className="text-4xl font-bold tracking-tight text-white">

                            Repositories

                        </h1>

                        <p className="mt-2 text-slate-400 text-base">

                            Browse your GitHub repositories and generate AI-powered code reviews.

                        </p>

                    </div>

                    <input
                        type="text"
                        placeholder="Search repositories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-96 rounded-xl border border-slate-700 bg-[#0F172A] px-5 py-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-blue-500"
                    />
                </div>

                {/* Statistics */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

                    <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6">

                        <p className="text-slate-500 text-sm">

                            Total Repositories

                        </p>

                        <h2 className="mt-3 text-3xl font-bold">

                            {repositories.length}

                        </h2>

                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6">

                        <p className="text-slate-500 text-sm">

                            Showing

                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-blue-400">

                            {filteredRepositories.length}

                        </h2>

                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6">

                        <p className="text-slate-500 text-sm">

                            AI Model

                        </p>

                        <h2 className="mt-3 text-xl font-semibold text-green-400">

                            Groq · Llama 3.3

                        </h2>

                    </div>

                </div>

                {/* Loading */}

                {loading && (

                    <div className="rounded-3xl border border-slate-800 bg-[#0F172A] p-16 text-center">

                        <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500"/>

                        <h2 className="text-2xl font-semibold">

                            Fetching repositories...

                        </h2>

                    </div>

                )}

                {/* Error */}

                {!loading && error && (

                    <div className="text-center text-red-500 text-xl">

                        {error}

                    </div>

                )}

                {/* Empty State */}

                {!loading &&
                    !error &&
                    filteredRepositories.length === 0 && (

                        <div className="rounded-3xl border border-slate-800 bg-[#0F172A] p-20 text-center">

                            <h2 className="text-2xl font-semibold">

                                No repositories found

                            </h2>

                            <p className="mt-3 text-slate-400">

                                Try another repository name.

                            </p>

                        </div>

                    )}

                {/* Repository Cards */}

                {!loading &&
                    !error &&
                    filteredRepositories.length > 0 && (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {filteredRepositories.map((repo) => (

                                <RepositoryCard
                                    key={repo.id}
                                    name={repo.name}
                                    language={repo.language}
                                    description={repo.description}
                                    htmlUrl={repo.htmlUrl}
                                    branch={repo.defaultBranch}
                                    isPrivate={repo.private}
                                    onReview={() =>
                                        navigate(`/repository/${repo.id}`)
                                    }
                                />

                            ))}

                        </div>

                    )}

            </div>

        </MainLayout>

    );

}

export default Dashboard;