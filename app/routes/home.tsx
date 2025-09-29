import { useEffect } from "react";
import { useNavigate } from "react-router";

import type { Route } from "./+types/home";
import  {resumes} from "../../constants"
import { usePuterStore } from "~/lib/puter";

import ResumeCard from "~/components/ResumeCard";
import NavBar from "~/components/NavBar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumiQ" },
    { name: "description", content: "AI-powered insights for job-winning resumes." },
  ];
}

export default function Home() {

  const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <NavBar />

      <section className="main-section">
        <div className="page-heading">
          <h1>Track your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>
      </section>

      {resumes.length > 0 && (
      <div className="resumes-section">
        {resumes.map((resume:Resume) => (
          < ResumeCard key={resume.id} resume={resume} />
        ))} 
      </div>
    )}  
    
    </main>)
}
