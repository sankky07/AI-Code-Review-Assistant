import {
    FileCode2,
    Calendar,
    Sparkles,
    Trash2
} from "lucide-react";

import toast from "react-hot-toast";

import { deleteHistory } from "../../services/historyService";

function HistoryCard({ review, onDelete }) {

    async function handleDelete() {

        if (!window.confirm("Delete this review?")) return;

        try {

            await deleteHistory(review.id);

            toast.success("Review deleted.");

            onDelete();

        }

        catch {

            toast.error("Unable to delete review.");

        }

    }

    const formattedDate = new Date(review.reviewedAt).toLocaleString(
        "en-IN",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );

    const score =
        review.score && review.score > 0
            ? review.score
            : "N/A";

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500 transition-all">

            {/* Header */}

            <div className="flex justify-between items-start gap-6">

                <div className="flex gap-4">

                    <div className="bg-blue-600/20 p-3 rounded-2xl">

                        <FileCode2
                            size={24}
                            className="text-blue-400"
                        />

                    </div>

                    <div>

                        <h2 className="font-semibold text-lg">

                            {review.repositoryName || review.fileName}

                        </h2>

                        <p className="text-blue-400 text-sm mt-1">

                            {review.language}

                        </p>

                        <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">

                            <Calendar size={15} />

                            {formattedDate}

                        </div>

                    </div>

                </div>

                <div className="flex gap-3">

                    <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl">

                        Score : {score}

                    </div>

                    <button

                        onClick={handleDelete}

                        className="bg-red-500/20 hover:bg-red-500 px-3 rounded-xl transition"

                    >

                        <Trash2 size={18}/>

                    </button>

                </div>

            </div>

            {/* Divider */}

            <div className="border-t border-slate-800 my-6"></div>

            {/* AI Review */}

            <div>

                <div className="flex items-center gap-2 mb-4">

                    <Sparkles
                        size={18}
                        className="text-yellow-400"
                    />

                    <h3 className="font-semibold">

                        AI Review

                    </h3>

                </div>

                <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 max-h-80 overflow-y-auto">

                    <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-300 font-sans">

                        {review.review}

                    </pre>

                </div>

            </div>

        </div>

    );

}

export default HistoryCard;