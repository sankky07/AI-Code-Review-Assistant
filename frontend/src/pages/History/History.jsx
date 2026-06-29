import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import {
    getAllHistory,
    deleteAllHistory
} from "../../services/historyService";
import toast from "react-hot-toast";

function History() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadHistory();

    }, []);

    async function loadHistory() {

        try {

            setLoading(true);

            const data = await getAllHistory();

            setHistory(data);

        } catch (e) {

            console.error(e);

            toast.error("Unable to load history.");

        } finally {

            setLoading(false);

        }

    }

    async function handleDeleteAll() {

        if (!window.confirm("Delete all review history?")) return;

        try {

            await deleteAllHistory();

            toast.success("History cleared successfully.");

            loadHistory();

        } catch (e) {

            console.error(e);

            toast.error("Unable to clear history.");

        }

    }

    return (

        <MainLayout>

            <div className="max-w-7xl mx-auto p-8">

                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">

                    <div>

                        <h1 className="text-4xl font-bold">

                            AI Review History

                        </h1>

                        <p className="text-slate-400 mt-2">

                            View all previous AI code reviews.

                        </p>

                    </div>

                    <div className="flex items-center gap-4">

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4">

                            <p className="text-slate-400">

                                Total Reviews

                            </p>

                            <h2 className="text-3xl font-bold mt-2">

                                {history.length}

                            </h2>

                        </div>

                        {history.length > 0 && (

                            <button

                                onClick={handleDeleteAll}

                                className="bg-red-600 hover:bg-red-500 transition rounded-xl px-5 py-4"

                            >

                                Clear All

                            </button>

                        )}

                    </div>

                </div>

                {/* Loading */}

                {loading && (

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">

                        <h2 className="text-2xl font-bold animate-pulse">

                            Loading review history...

                        </h2>

                    </div>

                )}

                {/* Empty State */}

                {!loading && history.length === 0 && (

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">

                        <h2 className="text-3xl font-bold">

                            No Reviews Yet 🚀

                        </h2>

                        <p className="text-slate-400 mt-3">

                            Run an AI review from the Dashboard to see your review history here.

                        </p>

                    </div>

                )}

                {/* History Cards */}

                {!loading && history.length > 0 && (

                    <div className="space-y-6">

                        {history.map((review) => (

                            <HistoryCard

                                key={review.id}

                                review={review}

                                onDelete={loadHistory}

                            />

                        ))}

                    </div>

                )}

            </div>

        </MainLayout>

    );

}

export default History;