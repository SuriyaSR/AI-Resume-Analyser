import { prepareInstructions } from "../../constants";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import NavBar from "~/components/NavBar"
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

const upload = () => {

    const {auth, fs, isLoading, ai, kv} = usePuterStore();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleAnalyze = async ({companyName, jobTitle, jobDescription, file}: {companyName: string, jobTitle: string, jobDescription: string, file: File}) => {
        setIsProcessing(true);
        setStatusText("Uploading and analyzing your resume...");

        const uploadedFile = await fs.upload([file]);

        if(!uploadedFile) {
            return setStatusText("Failed to upload the file. Please try again.");
        }
        setStatusText("Converting to image...");
        const imageFile = await convertPdfToImage(file);

        if(!imageFile.file) {
            return setStatusText("Failed to convert PDF to image. Please try again.");
        }

        setStatusText("Uploading the image...");
        const uploadedImage = await fs.upload([imageFile.file]);
        
        if(!uploadedImage) {
            return setStatusText("Failed to upload the image. Please try again.");
        }
        setStatusText("Preparing Data...");

        const uuid = generateUUID();

        const data = {
          id: uuid,
          resumePath: uploadedFile.path,
          imagePath: uploadedImage.path,
          companyName, jobTitle, jobDescription,
          feedback: ""
        }

        await kv.set(`resume-${uuid}`, JSON.stringify(data));
        setStatusText("Getting AI Analysis...");

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({jobTitle, jobDescription})
        );
        if(!feedback) {
            return setStatusText("Failed to get AI feedback. Please try again.");
        }

        const feedbackText = typeof feedback.message.content === "string" ? feedback.message.content : feedback.message.content[0].text;
        
        data.feedback = JSON.parse(feedbackText);
        
        await kv.set(`resume-${uuid}`, JSON.stringify(data));
        setStatusText("Analysis complete! Redirecting...");

        console.log(data);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       const form = e.currentTarget.closest("form");
        if(!form) return;
        const formData = new FormData(form);
        
        const companyName = formData.get("company-name")?.toString().trim() as string;
        const jobTitle = formData.get("job-title")?.toString().trim() as string;
        const jobDescription = formData.get("job-description")?.toString().trim() as string;

        if(!file) return;

        handleAnalyze({companyName, jobTitle, jobDescription, file});
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
