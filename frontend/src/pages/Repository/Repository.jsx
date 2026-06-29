import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    ExternalLink,
    Sparkles,
    Shield,
    GitBranch,
    Globe,
    Lock
} from "lucide-react";

import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import ReviewCard from "../../components/ReviewCard/ReviewCard";

import { runReview } from "../../services/reviewService";
import { getRepository } from "../../services/repositoryService";

function Repository() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [repository, setRepository] = useState(null);

    const [reviews, setReviews] = useState([]);

    const [loadingRepository, setLoadingRepository] = useState(true);

    const [loadingReview, setLoadingReview] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        loadRepository();

    }, [id]);

    async function loadRepository() {

        try {

            const data = await getRepository(id);

            setRepository(data);

        }

        catch (e) {

            console.error(e);

            toast.error("Unable to load repository.");

            setError("Unable to load repository.");

        }

        finally {

            setLoadingRepository(false);

        }

    }

    async function handleReview() {

        try {

            setLoadingReview(true);

            setError("");

            const data = await runReview(id);

            console.log("AI Response:", data);

            setReviews(data);

            toast.success("Repository reviewed successfully.");

        }

        catch (e) {

            console.error(e);

            toast.error("AI Review failed.");

            setError("Unable to generate review.");

        }

        finally {

            setLoadingReview(false);

        }

    }

    let score = "--";

    if (reviews.length > 0) {

        const text = reviews[0];

        let match = text.match(/score of\s*(\d+(\.\d+)?)\s*out of\s*10/i);

        if (!match) {

            match = text.match(/(\d+(\.\d+)?)\s*out of\s*10/i);

        }

        if (!match) {

            match = text.match(/(\d+(\.\d+)?)\s*\/\s*10/i);

        }

        if (match) {

            score = match[1];

        }

    }

    const scoreLabel =

        score === "--"
            ? "Not Reviewed"
            : Number(score) >= 9
                ? "Excellent"
                : Number(score) >= 8
                    ? "Very Good"
                    : Number(score) >= 7
                        ? "Good"
                        : Number(score) >= 5
                            ? "Average"
                            : "Needs Improvement";

    const criticalCount = reviews.filter(r =>
        r.toLowerCase().includes("critical")
    ).length;

    const suggestionCount = reviews.reduce((count, review) => {

        const matches = review.match(
            /suggest|recommend|improve/gi
        );

        return count + (matches ? matches.length : 0);

    }, 0);

    return (

        <MainLayout>

            <div className="max-w-7xl mx-auto px-10 py-8">

                {/* Header */}

                <div className="flex items-center justify-between mb-10">

                    <div>

                        <p className="text-blue-400 uppercase tracking-[0.2em] text-xs font-semibold">

                            Repository

                        </p>

                        <h1 className="text-5xl font-bold tracking-tight mt-2">

                            {repository?.name || "Loading..."}

                        </h1>

                        <p className="text-slate-400 mt-3">

                            AI-powered repository quality analysis

                        </p>

                    </div>

                    <button

                        onClick={() => navigate("/history")}

                        className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 hover:bg-slate-800 transition"

                    >

                        View History

                    </button>

                </div>
                {/* Loading */}

                {loadingRepository && (

                    <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-16 text-center">

                        <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500"/>

                        <h2 className="text-2xl font-semibold">

                            Loading Repository...

                        </h2>

                        <p className="mt-3 text-slate-400">

                            Fetching repository details.

                        </p>

                    </div>

                )}

                {/* Error */}

                {error && (

                    <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-400">

                        {error}

                    </div>

                )}

                {/* Repository */}

                {!loadingRepository && repository && (

                    <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-8 mb-10">

                        <div className="flex flex-col lg:flex-row justify-between gap-8">

                            <div className="flex-1">

                                <h2 className="text-3xl font-bold">

                                    {repository.name}

                                </h2>

                                <p className="mt-4 text-slate-400 leading-7">

                                    {repository.description ||

                                        "No description provided for this repository."}

                                </p>

                                <div className="flex flex-wrap gap-3 mt-8">

                                    <span className="flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm">

                                        <Globe size={15}/>

                                        {repository.language || "Unknown"}

                                    </span>

                                    <span className="flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm">

                                        <GitBranch size={15}/>

                                        {repository.defaultBranch}

                                    </span>

                                    <span className="flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm">

                                        {

                                            repository.private ?

                                                <Lock size={15}/>

                                                :

                                                <Globe size={15}/>

                                        }

                                        {

                                            repository.private ?

                                                "Private"

                                                :

                                                "Public"

                                        }

                                    </span>

                                </div>

                            </div>

                            <div className="flex flex-col gap-4">

                                <a

                                    href={repository.htmlUrl}

                                    target="_blank"

                                    rel="noreferrer"

                                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3 hover:bg-slate-800 transition"

                                >

                                    <ExternalLink size={18}/>

                                    Open Repository

                                </a>

                                <button

                                    onClick={handleReview}

                                    disabled={loadingReview}

                                    className="rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 transition disabled:bg-slate-700"

                                >

                                    {

                                        loadingReview ?

                                            "Analyzing..."

                                            :

                                            "Run AI Review"

                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                )}
                {/* AI Loader */}

                {loadingReview && (

                    <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-12 mb-10">

                        <div className="flex items-center gap-4 mb-8">

                            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">

                                <Sparkles size={22} />

                            </div>

                            <div>

                                <h2 className="text-2xl font-semibold">

                                    AI is analyzing your repository

                                </h2>

                                <p className="text-slate-400 mt-1">

                                    Reading source files and generating recommendations...

                                </p>

                            </div>

                        </div>

                        <div className="space-y-4">

                            <div>

                                <div className="flex justify-between text-sm text-slate-400 mb-2">

                                    <span>Reading repository</span>

                                    <span>Completed</span>

                                </div>

                                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

                                    <div className="h-full w-full bg-green-500"/>

                                </div>

                            </div>

                            <div>

                                <div className="flex justify-between text-sm text-slate-400 mb-2">

                                    <span>Analyzing code quality</span>

                                    <span>In Progress</span>

                                </div>

                                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

                                    <div className="h-full w-2/3 bg-blue-500 animate-pulse"/>

                                </div>

                            </div>

                            <div>

                                <div className="flex justify-between text-sm text-slate-400 mb-2">

                                    <span>Generating AI report</span>

                                    <span>Pending</span>

                                </div>

                                <div className="h-2 rounded-full bg-slate-800"/>

                            </div>

                        </div>

                    </div>

                )}

                {/* Overall Score */}

                {reviews.length > 0 && (

                    <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-8 mb-10">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-blue-400 uppercase tracking-widest text-xs font-semibold">

                                    Repository Quality

                                </p>

                                <h2 className="text-3xl font-bold mt-2">

                                    Overall Score

                                </h2>

                                <p className="text-slate-400 mt-2">

                                    AI generated repository quality report

                                </p>

                            </div>

                            <div className="text-right">

                                <h1 className="text-7xl font-black text-green-400">

                                    {score}

                                </h1>

                                <p className="text-slate-400 mt-2">

                                    {scoreLabel}

                                </p>

                            </div>

                        </div>

                        <div className="mt-8 h-3 rounded-full bg-slate-800 overflow-hidden">

                            <div

                                className="h-full bg-blue-500 transition-all duration-700"

                                style={{

                                    width: score === "--"

                                        ? "0%"

                                        : `${Number(score) * 10}%`

                                }}

                            />

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

                            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

                                <p className="text-sm text-slate-500">

                                    Files Reviewed

                                </p>

                                <h2 className="mt-3 text-4xl font-bold">

                                    {reviews.length}

                                </h2>

                            </div>

                            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

                                <p className="text-sm text-slate-500">

                                    Critical Issues

                                </p>

                                <h2 className="mt-3 text-4xl font-bold text-red-400">

                                    {criticalCount}

                                </h2>

                            </div>

                            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

                                <p className="text-sm text-slate-500">

                                    Suggestions

                                </p>

                                <h2 className="mt-3 text-4xl font-bold text-yellow-400">

                                    {suggestionCount}

                                </h2>

                            </div>

                        </div>

                    </div>

                )}

                {/* Empty State */}

                {

                    !loadingRepository &&
                    !loadingReview &&
                    reviews.length === 0 && (

                        <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-20 text-center mb-10">

                            <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">

                                <Sparkles size={28} />

                            </div>

                            <h2 className="text-3xl font-bold">

                                Ready for AI Review

                            </h2>

                            <p className="text-slate-400 mt-4 max-w-2xl mx-auto leading-7">

                                Click <strong>Run AI Review</strong> to analyze
                                this repository. The AI will inspect your
                                project, detect potential issues, evaluate code
                                quality, and provide actionable improvement
                                suggestions.

                            </p>

                            <button

                                onClick={handleReview}

                                className="mt-8 rounded-xl bg-blue-600 hover:bg-blue-500 transition px-8 py-4 font-semibold"

                            >

                                Run AI Review

                            </button>

                        </div>

                    )

                }

                {/* Review Report */}

                {

                    reviews.length > 0 && (

                        <div className="space-y-8">

                            {

                                reviews.map((review, index) => (

                                    <ReviewCard

                                        key={index}

                                        review={review}

                                    />

                                ))

                            }

                        </div>

                    )

                }
                {/* Footer */}

                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4">

                    <button

                        onClick={() => navigate("/dashboard")}

                        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 hover:bg-slate-800 transition"

                    >

                        <ArrowLeft size={18} />

                        Back to Dashboard

                    </button>

                    {

                        reviews.length > 0 && (

                            <button

                                onClick={() => navigate("/history")}

                                className="rounded-xl bg-green-600 hover:bg-green-500 transition px-6 py-3 font-medium"

                            >

                                View Review History

                            </button>

                        )

                    }

                </div>

            </div>

        </MainLayout>
    )}

export default Repository;