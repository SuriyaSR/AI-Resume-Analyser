import NavBar from "~/components/NavBar";
import type { Route } from "./+types/home";
import  {resumes} from "../../constants"
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumiQ" },
    { name: "description", content: "AI-powered insights for job-winning resumes." },
  ];
}

export default function Home() {
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
