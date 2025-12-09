import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FileText, 
    Target, 
    BookOpen, 
    Award, 
    ChevronRight, 
    Sparkles, 
    Upload, 
    AlertCircle, 
    CheckCircle,
    X
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertLogo from "../assets/images/AlertLogo.png";
import { useApplication } from "../context/ApplicationContext";

interface FormData {
    personalStatement: File | null;
    educationalGoals: File | null;
    challenges: File | null;
    financialNeed: File | null;
}

interface EssayRequirement {
    name: keyof FormData;
    title: string;
    description: string;
    words: string;
    format: string;
}

interface Step {
    number: number;
    label: string;
    status: "completed" | "current" | "upcoming";
}

const Assessment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { applicationData, updateAssessment } = useApplication();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const [formData, setFormData] = useState<FormData>(applicationData.assessment);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<Record<keyof FormData, boolean>>({
        personalStatement: !!applicationData.assessment.personalStatement,
        educationalGoals: !!applicationData.assessment.educationalGoals,
        challenges: !!applicationData.assessment.challenges,
        financialNeed: !!applicationData.assessment.financialNeed,
    });

    useEffect(() => {
        // Update upload status when formData changes
        setUploadStatus({
            personalStatement: !!formData.personalStatement,
            educationalGoals: !!formData.educationalGoals,
            challenges: !!formData.challenges,
            financialNeed: !!formData.financialNeed,
        });
    }, [formData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            
            // Validate file type
            const validTypes = ['.pdf', '.doc', '.docx'];
            const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
            if (!validTypes.includes(fileExtension)) {
                alert(`Please upload a valid file type: PDF or Word document`);
                return;
            }

            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert(`File size must be less than 5MB`);
                return;
            }

            const updatedFormData = { ...formData, [name]: file };
            setFormData(updatedFormData);
            
            // Update context
            updateAssessment({ [name]: file });
        }
    };

    const handleRemoveFile = (name: keyof FormData) => {
        const updatedFormData = { ...formData, [name]: null };
        setFormData(updatedFormData);
        
        // Update context
        updateAssessment({ [name]: null });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate that all files are uploaded
        const allUploaded = Object.values(formData).every(file => file !== null);
        if (!allUploaded) {
            alert("Please upload all required assessment essays before continuing.");
            setIsSubmitting(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            console.log("Assessment essays submitted:", formData);
            setIsSubmitting(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);

            // Navigate to next page
            navigate('/documents-upload');
        }, 1500);
    };

    const handleSaveAndContinue = (e: React.FormEvent) => {
        handleSubmit(e);
    };

    const steps: Step[] = [
        { number: 1, label: "Personal Info", status: "completed" },
        { number: 2, label: "Parent Info", status: "completed" },
        { number: 3, label: "Educational", status: "completed" },
        { number: 4, label: "Assessment", status: "current" },
        { number: 5, label: "Documents Upload", status: "upcoming" },
        { number: 6, label: "Referee Contact", status: "upcoming" },
        { number: 7, label: "Institutional Verification", status: "upcoming" },
        { number: 8, label: "Eligibility Checks", status: "upcoming" },
        { number: 9, label: "Consent Declaration", status: "upcoming" },
        { number: 10, label: "Applicant Signature", status: "upcoming" },
    ];

    const essayRequirements: EssayRequirement[] = [
        {
            name: "personalStatement",
            title: "Personal Statement",
            description: "Introduce yourself, your field of study, achievements, background, and why you are a strong candidate.",
            words: "Max 500 words",
            format: "PDF or Word document"
        },
        {
            name: "educationalGoals",
            title: "Educational Goals & Scholarship Impact",
            description: "Explain your career goals and how this scholarship will support your journey.",
            words: "Max 500 words",
            format: "PDF or Word document"
        },
        {
            name: "challenges",
            title: "Overcoming Challenges & Lessons Learnt",
            description: "Describe a major challenge you overcame and the lessons you learned.",
            words: "Max 500 words",
            format: "PDF or Word document"
        },
        {
            name: "financialNeed",
            title: "Financial Need & Educational Necessity",
            description: "Explain your financial situation and why this scholarship is necessary for your education.",
            words: "Max 500 words",
            format: "PDF or Word document"
        }
    ];

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' bytes';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 font-sans">
            {/* Success Toast */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-6 right-6 z-50"
                    >
                        <div className="bg-linear-to-r from-emerald-500 to-green-500 text-white px-6 py-4 rounded-xl shadow-2xl shadow-emerald-200 flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold">Documents Uploaded!</div>
                                <div className="text-sm opacity-90">Your assessment essays have been uploaded successfully.</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-linear-to-r from-blue-100 to-cyan-100 rounded-full border border-blue-200">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                            Assessment Essays
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Assessment <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Essays</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Upload your assessment essays. These documents help us understand your journey, goals, and suitability for the scholarship.
                    </p>
                </motion.div>

                {/* Progress Steps - Horizontal Scroll for Mobile */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="overflow-x-auto pb-4">
                        <div className="flex items-center justify-between min-w-[800px]">
                            {steps.map((step, index) => (
                                <div key={step.number} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step.status === "current"
                                                ? "bg-linear-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-200"
                                                : step.number < 4
                                                    ? "bg-linear-to-r from-emerald-500 to-green-400 text-white shadow-lg shadow-emerald-200"
                                                    : "bg-gray-100 text-gray-400"
                                            }`}>
                                            {step.number < 4 ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                step.number
                                            )}
                                        </div>
                                        <div className="mt-2 text-center max-w-[100px]">
                                            <div className="text-xs text-gray-500">Step {step.number}</div>
                                            <div className="text-xs font-semibold text-gray-900 leading-tight mt-1">{step.label}</div>
                                        </div>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="w-16 h-1 bg-gray-200 mx-2" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Side - Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-2/3"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                            {/* Form Header */}
                            <div className="p-8 border-b border-gray-100 bg-linear-to-r from-blue-50 to-cyan-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-linear-to-r from-blue-500 to-cyan-400 rounded-xl">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Upload Assessment Essays</h2>
                                        <p className="text-gray-600">Step 4 of 10 - Upload your required assessment documents</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="p-8">
                                <div className="space-y-8">
                                    {essayRequirements.map((essay, index) => (
                                        <motion.div
                                            key={essay.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-300"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="p-2 bg-blue-100 rounded-lg">
                                                            <FileText className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <h3 className="text-lg font-bold text-gray-900">{essay.title}</h3>
                                                    </div>
                                                    <p className="text-gray-600 mb-2">{essay.description}</p>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <FileText className="w-3 h-3" />
                                                            {essay.format}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <BookOpen className="w-3 h-3" />
                                                            {essay.words}
                                                        </span>
                                                    </div>
                                                </div>
                                                {uploadStatus[essay.name] && (
                                                    <div className="p-2 bg-emerald-50 rounded-full">
                                                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-4">
                                                <label className="block text-gray-700 font-medium mb-2">
                                                    Upload {essay.title}:
                                                </label>
                                                <div className="flex flex-col items-center gap-4">
                                                    {!formData[essay.name] ? (
                                                        <label className="flex-1 w-full cursor-pointer">
                                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 transition-colors text-center">
                                                                <input
                                                                    type="file"
                                                                    name={essay.name}
                                                                    accept=".pdf,.doc,.docx"
                                                                    onChange={handleFileChange}
                                                                    className="hidden"
                                                                    required
                                                                />
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <Upload className="w-8 h-8 text-gray-400" />
                                                                    <div>
                                                                        <p className="text-gray-700 font-medium">Click to upload</p>
                                                                        <p className="text-sm text-gray-500">{essay.format} (Max 5MB)</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    ) : (
                                                        <div className="w-full">
                                                            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                                                                <div className="flex items-center gap-3">
                                                                    <FileText className="w-5 h-5 text-emerald-600" />
                                                                    <div>
                                                                        <p className="font-medium text-gray-900 truncate max-w-[200px]">
                                                                            {formData[essay.name]?.name}
                                                                        </p>
                                                                        <p className="text-sm text-gray-500">
                                                                            {formatFileSize(formData[essay.name]!.size)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveFile(essay.name)}
                                                                    className="p-1 hover:bg-emerald-100 rounded-full transition-colors"
                                                                >
                                                                    <X className="w-4 h-4 text-emerald-600" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Progress Indicator */}
                                <div className="mt-8">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            Upload Progress: {Object.values(uploadStatus).filter(status => status).length} of 4
                                        </span>
                                        <span className="text-sm font-medium text-gray-700">
                                            {Math.round((Object.values(uploadStatus).filter(status => status).length / 4) * 100)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-linear-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                                            style={{ 
                                                width: `${(Object.values(uploadStatus).filter(status => status).length / 4) * 100}%` 
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Continue Button */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="mt-12"
                                >
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || Object.values(uploadStatus).filter(status => status).length < 4}
                                        onClick={handleSaveAndContinue}
                                        className="group w-full cursor-pointer flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Uploading...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Save & Continue to Documents Upload</span>
                                                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                            </>
                                        )}
                                    </button>
                                </motion.div>

                                {/* Form Navigation */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        to="/educational-info"
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                                    >
                                        ← Back to Educational Information
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                        Step 4 of 10 • {Object.values(uploadStatus).filter(status => status).length} of 4 essays uploaded
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.form>

                    {/* Right Side - Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:w-1/3"
                    >
                        <div className="sticky top-8 space-y-6">
                            {/* Scholarship Info Card */}
                            <div className="bg-linear-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-2xl shadow-blue-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <img
                                        src={AlertLogo}
                                        alt="AlertMFB Logo"
                                        className="w-20 h-20 rounded-xl bg-white/20 p-2"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-bold">Assessment Guidelines</h3>
                                        <p className="text-blue-100">Tips for effective essays</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Be Specific</div>
                                            <div className="text-sm text-blue-100">Use concrete examples and achievements</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Stay Concise</div>
                                            <div className="text-sm text-blue-100">Adhere to word limits and be direct</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Award className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Show Impact</div>
                                            <div className="text-sm text-blue-100">Demonstrate how scholarship will make a difference</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-amber-500" />
                                    <h4 className="font-bold text-gray-900">File Requirements</h4>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Files must be PDF or Word format</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Maximum file size: 5MB each</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Name files clearly (e.g., Personal_Statement_John_Doe.pdf)</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Help Card */}
                            <div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-5 h-5 text-emerald-600" />
                                    <h4 className="font-bold text-gray-900">Need Help Writing?</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    Access our essay writing guide and sample essays for reference.
                                </p>
                                <button 
                                    type="button"
                                    className="w-full px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
                                >
                                    View Writing Guide
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Assessment;