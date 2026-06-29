import { motion } from "framer-motion";
import {
    ArrowRight,
    Lock,
    Globe,
    GitBranch,
    ExternalLink,
    Circle
} from "lucide-react";

function RepositoryCard({
                            name,
                            language,
                            description,
                            htmlUrl,
                            branch,
                            isPrivate,
                            onReview
                        }) {

    const languageColor = {

        Java: "text-orange-400",
        JavaScript: "text-yellow-400",
        TypeScript: "text-blue-400",
        Python: "text-green-400",
        HTML: "text-red-400",
        CSS: "text-cyan-400",
        React: "text-sky-400",
        C: "text-indigo-400",
        "C++": "text-purple-400",
        Kotlin: "text-pink-400",
        Go: "text-teal-400",
        Rust: "text-amber-400"

    };

    return (

        <motion.div

            whileHover={{
                y: -4
            }}

            transition={{
                duration: 0.2
            }}

            className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#0F172A] p-6 transition-all hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10"

        >

            {/* Header */}

            <div>

                <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                        <h2 className="truncate text-xl font-semibold text-white">

                            {name}

                        </h2>

                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">

                            {description || "No description provided."}

                        </p>

                    </div>

                    <a

                        href={htmlUrl}

                        target="_blank"

                        rel="noreferrer"

                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"

                        title="Open on GitHub"

                    >

                        <ExternalLink size={18} />

                    </a>

                </div>

                {/* Repository Meta */}

                <div className="mt-6 flex flex-wrap gap-2">

                    <span className="flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-300">

                        {isPrivate ?

                            <Lock size={13} />

                            :

                            <Globe size={13} />

                        }

                        {isPrivate ? "Private" : "Public"}

                    </span>

                    <span className="flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-300">

                        <GitBranch size={13} />

                        {branch}

                    </span>

                    <span className={`flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1.5 text-xs ${languageColor[language] || "text-slate-300"}`}>

                        <Circle size={8} fill="currentColor" />

                        {language || "Unknown"}

                    </span>

                </div>

            </div>

            {/* Footer */}

            <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-5">

                <p className="text-xs text-slate-500">

                    Ready for AI review

                </p>

                <button

                    onClick={onReview}

                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium transition hover:bg-blue-500"

                >

                    Review

                    <ArrowRight size={16} />

                </button>

            </div>

        </motion.div>

    );

}

export default RepositoryCard;