import { GitBranch, Sparkles, ShieldCheck, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
function Login() {

    const login = () => {
        toast("Redirecting to GitHub...");
        window.location.href =
            "http://localhost:8080/oauth2/authorization/github";
    };

    return (

        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">

            {/* Background */}

            <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600 blur-[160px] opacity-20"></div>

            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500 blur-[180px] opacity-10"></div>

            {/* Card */}

            <motion.div

                initial={{ opacity:0,y:30 }}

                animate={{ opacity:1,y:0 }}

                transition={{ duration:.6 }}

                className="relative w-[550px] rounded-3xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl shadow-2xl p-10"

            >

                <div className="flex justify-center">

                    <div className="bg-blue-600 p-5 rounded-3xl">

                        <BrainCircuit size={42}/>

                    </div>

                </div>

                <h1 className="text-center text-5xl font-black mt-8">

                    AI Code Review

                </h1>

                <p className="text-center text-slate-400 mt-5 leading-7">

                    Analyze your GitHub repositories using AI-powered
                    code review, suggestions, and quality analysis.

                </p>

                <button

                    onClick={login}

                    className="mt-10 w-full bg-blue-600 hover:bg-blue-500 transition rounded-2xl py-4 flex justify-center items-center gap-4 text-lg font-semibold"

                >

                    <GitBranch size={24}/>

                    Continue with GitHub

                </button>

                {/* Features */}

                <div className="grid grid-cols-2 gap-4 mt-10">

                    <div className="rounded-2xl bg-slate-800 p-4">

                        <Sparkles className="text-yellow-400"/>

                        <h3 className="font-semibold mt-3">

                            AI Powered

                        </h3>

                        <p className="text-sm text-slate-400 mt-2">

                            Gemini based intelligent code review.

                        </p>

                    </div>

                    <div className="rounded-2xl bg-slate-800 p-4">

                        <ShieldCheck className="text-green-400"/>

                        <h3 className="font-semibold mt-3">

                            Secure Login

                        </h3>

                        <p className="text-sm text-slate-400 mt-2">

                            GitHub OAuth authentication.

                        </p>

                    </div>

                </div>

                <div className="border-t border-slate-700 mt-10 pt-6">

                    <div className="flex justify-center gap-3 flex-wrap">

                        <span className="bg-slate-800 px-4 py-2 rounded-full">

                            Spring Boot

                        </span>

                        <span className="bg-slate-800 px-4 py-2 rounded-full">

                            React

                        </span>

                        <span className="bg-slate-800 px-4 py-2 rounded-full">

                            Gemini

                        </span>

                        <span className="bg-slate-800 px-4 py-2 rounded-full">

                            PostgreSQL

                        </span>

                    </div>

                </div>

            </motion.div>

        </div>

    );

}

export default Login;