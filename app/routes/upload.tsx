import { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import NavBar from "~/components/NavBar"

const upload = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       const form = e.currentTarget.closest("form");
        if(!form) return;
        const formData = new FormData(form);
        
        const companyName = formData.get("company-name")?.toString().trim();
        const jobTitle = formData.get("job-title")?.toString().trim();
        const jobDescription = formData.get("job-description")?.toString().trim();

        console.log({
            companyName, jobTitle, jobDescription, file
        });
    }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <NavBar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Smart Feedback for your dream job</h1>
          {isProcessing ? (
            <>
                <h2>{statusText}</h2>
                <img src="/images/resume-scan.gif" className="w-full"/>
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips</h2>
          )}
          {
            !isProcessing && (
                <form id="upload-form" onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4" >                    
                    <div className="form-div">
                        <label htmlFor="company-name">Company Name</label>
                        <input type="text" id="company-name" placeholder="Company Name" name="company-name" />
                    </div>
                    <div className="form-div">
                        <label htmlFor="job-title">Job Title</label>
                        <input type="text" id="job-title" placeholder="Job Title" name="job-title" />
                    </div>
                     <div className="form-div">
                        <label htmlFor="job-description">Job Description</label>
                        <textarea id="job-description" placeholder="Job Description" name="job-description" rows={5} />
                    </div>
                     <div className="form-div">
                        <label htmlFor="uploader">Upload Resume</label>
                        <FileUploader onFileSelect={handleFileSelect}/>
                    </div>
                    <button type="submit" className="primary-button">Analyze Resume</button>                                      
                </form>
            )
          }
        </div>
      </section>
    </main>
  )
}

export default upload
