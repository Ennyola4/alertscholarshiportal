import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FileCheck, 
    FileText, 
    Upload, 
    ChevronRight, 
    Sparkles, 
    AlertCircle, 
    CheckCircle, 
    Shield,
    X
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertLogo from "../assets/images/AlertLogo.png";
import { useApplication } from "../context/ApplicationContext";

interface FormData {
    birthCertificate: File | null;
    nationalId: File | null;
    studentId: File | null;
    passportPhoto: File | null;
    admissionLetter: File | null;
    transcript: File | null;
    incomeDeclaration: File | null;
    recommendationFaculty: File | null;
    recommendationCommunity: File | null;
}

interface DocumentRequirement {
    name: keyof FormData;
    title: string;
    description: string;
    format: string;
    required: boolean;
    accept: string;
}

interface Step {
    number: number;
    label: string;
    status: "completed" | "current" | "upcoming";
}

const DocumentsUpload = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { applicationData, updateDocuments } = useApplication();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const [formData, setFormData] = useState<FormData>(applicationData.documents);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<Record<keyof FormData, boolean>>({
        birthCertificate: !!applicationData.documents.birthCertificate,
        nationalId: !!applicationData.documents.nationalId,
        studentId: !!applicationData.documents.studentId,
        passportPhoto: !!applicationData.documents.passportPhoto,
        admissionLetter: !!applicationData.documents.admissionLetter,
        transcript: !!applicationData.documents.transcript,
        incomeDeclaration: !!applicationData.documents.incomeDeclaration,
        recommendationFaculty: !!applicationData.documents.recommendationFaculty,
        recommendationCommunity: !!applicationData.documents.recommendationCommunity,
    });

    useEffect(() => {
        setUploadStatus({
            birthCertificate: !!formData.birthCertificate,
            nationalId: !!formData.nationalId,
            studentId: !!formData.studentId,
            passportPhoto: !!formData.passportPhoto,
            admissionLetter: !!formData.admissionLetter,
            transcript: !!formData.transcript,
            incomeDeclaration: !!formData.incomeDeclaration,
            recommendationFaculty: !!formData.recommendationFaculty,
            recommendationCommunity: !!formData.recommendationCommunity,
        });
    }, [formData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            
            if (file.size > 5 * 1024 * 1024) {
                alert(`File size must be less than 5MB for ${documentRequirements.find(doc => doc.name === name)?.title}`);
                return;
            }

            const updatedFormData = { ...formData, [name]: file };
            setFormData(updatedFormData);
            
            updateDocuments({ [name]: file });
        }
    };

    const handleRemoveFile = (name: keyof FormData) => {
        const updatedFormData = { ...formData, [name]: null };
        setFormData(updatedFormData);
        
        updateDocuments({ [name]: null });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const requiredFiles = documentRequirements
            .filter(doc => doc.required)
            .map(doc => doc.name);
        
        const allRequiredUploaded = requiredFiles.every(fileName =>
            formData[fileName as keyof FormData] !== null
        );

        if (!allRequiredUploaded) {
            alert("Please upload all required documents before continuing.");
            setIsSubmitting(false);
            return;
        }

        setTimeout(() => {
            console.log("Documents submitted:", formData);
            setIsSubmitting(false);
            setShowSuccess(true);

            setTimeout(() => setShowSuccess(false), 3000);

            navigate('/referre-contact-verification');
        }, 1500);
    };

    const handleSaveAndContinue = (e: React.FormEvent) => {
        handleSubmit(e);
    };

    const steps: Step[] = [
        { number: 1, label: "Personal Info", status: "completed" },
        { number: 2, label: "Parent Info", status: "completed" },
        { number: 3, label: "Educational", status: "completed" },
        { number: 4, label: "Assessment", status: "completed" },
        { number: 5, label: "Documents Upload", status: "current" },
        { number: 6, label: "Referee Contact", status: "upcoming" },
        { number: 7, label: "Institutional Verification", status: "upcoming" },
        { number: 8, label: "Eligibility Checks", status: "upcoming" },
        { number: 9, label: "Consent Declaration", status: "upcoming" },
        { number: 10, label: "Applicant Signature", status: "upcoming" },
    ];

    const documentRequirements: DocumentRequirement[] = [
        {
            name: "birthCertificate",
            title: "Birth Certificate or Affidavit",
            description: "Official birth certificate or sworn affidavit of age declaration",
            format: "PDF, JPG, or PNG",
            required: true,
            accept: ".pdf,.jpg,.jpeg,.png"
        },
        {
            name: "nationalId",
            title: "Valid National ID",
            description: "NIN Slip, Voter Card, International Passport, or Driver's License",
            format: "PDF, JPG, or PNG",
            required: true,
            accept: ".pdf,.jpg,.jpeg,.png"
        },
        {
            name: "studentId",
            title: "Student ID Card",
            description: "Current academic session student identification card",
            format: "PDF, JPG, or PNG",
            required: true,
            accept: ".pdf,.jpg,.jpeg,.png"
        },
        {
            name: "passportPhoto",
            title: "Passport Photograph",
            description: "Recent passport photograph on white background",
            format: "JPG or PNG",
            required: true,
            accept: ".jpg,.jpeg,.png"
        },
        {
            name: "admissionLetter",
            title: "Official Admission Letter",
            description: "Letter of admission from your institution",
            format: "PDF, JPG, or PNG",
            required: true,
            accept: ".pdf,.jpg,.jpeg,.png"
        },
        {
            name: "transcript",
            title: "Most Recent Academic Transcript",
            description: "Official transcript showing CGPA and academic performance",
            format: "PDF, JPG, or PNG",
            required: true,
            accept: ".pdf,.jpg,.jpeg,.png"
        },
        {
            name: "incomeDeclaration",
            title: "Parent/Guardian Income Declaration",
            description: "Proof of income or affidavit of financial status",
            format: "PDF, JPG, or PNG",
            required: true,
            accept: ".pdf,.jpg,.jpeg,.png"
        },
        {
            name: "recommendationFaculty",
            title: "Recommendation Letter – Faculty Member",
            description: "Letter from a lecturer or academic advisor",
            format: "PDF, JPG, or PNG",
            required: false,
            accept: ".pdf,.jpg,.jpeg,.png"
        },
        {
            name: "recommendationCommunity",
            title: "Recommendation Letter – Community Leader/Mentor",
            description: "Letter from community leader, religious leader, or mentor",
            format: "PDF, JPG, or PNG",
            required: false,
            accept: ".pdf,.jpg,.jpeg,.png"
        },
    ];

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' bytes';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };

    const getRequiredCount = () => {
        return documentRequirements.filter(doc => doc.required).length;
    };

    const getRequiredUploadedCount = () => {
        const requiredDocs = documentRequirements.filter(doc => doc.required).map(doc => doc.name);
        return requiredDocs.filter(docName => uploadStatus[docName as keyof typeof uploadStatus]).length;
    };

    const isAllRequiredUploaded = () => {
        return getRequiredUploadedCount() === getRequiredCount();
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 font-sans">
            {/* Success Toast */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-6 right-6 z-50"
                    >
                        <div className="bg-linear-to-r from-[#B8860B] to-[#B8860B]/80 text-white px-6 py-4 rounded-xl shadow-2xl shadow-[#B8860B]/20 flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold">Documents Uploaded!</div>
                                <div className="text-sm opacity-90">All required documents have been uploaded successfully.</div>
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
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-linear-to-r from-[#B8860B]/10 to-[#B8860B]/5 rounded-full border border-[#B8860B]/20">
                        <FileCheck className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-semibold text-[#B8860B] uppercase tracking-wider">
                            Document Uploads
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Required <span className="bg-linear-to-r from-[#B8860B] to-[#B8860B]/70 bg-clip-text text-transparent">Documents</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Upload all mandatory documents for verification. Ensure all files are clear and legible.
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
                                                ? "bg-linear-to-r from-[#B8860B] to-[#B8860B]/80 text-white shadow-lg shadow-[#B8860B]/20"
                                                : step.number < 5
                                                    ? "bg-linear-to-r from-[#B8860B] to-[#B8860B]/80 text-white shadow-lg shadow-[#B8860B]/20"
                                                    : "bg-gray-100 text-gray-400"
                                            }`}>
                                            {step.number < 5 ? (
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
                            <div className="p-8 border-b border-gray-100 bg-linear-to-r from-[#B8860B]/5 to-[#B8860B]/10">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-linear-to-r from-[#B8860B] to-[#B8860B]/80 rounded-xl">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Upload Required Documents</h2>
                                        <p className="text-gray-600">Step 5 of 10 - Upload all mandatory verification documents</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="p-8">
                                <div className="mb-6 bg-linear-to-r from-[#B8860B]/10 to-[#B8860B]/5 rounded-2xl p-4 border border-[#B8860B]/20">
                                    <div className="flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 text-[#B8860B]" />
                                        <div>
                                            <h3 className="font-bold text-gray-900">Important Notes</h3>
                                            <p className="text-sm text-gray-600">
                                                All documents must be clear, legible, and in the specified formats.
                                                Files should not exceed 5MB each. Asterisk (*) indicates required documents.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Overview */}
                                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-[#B8860B]/10 rounded-xl p-4 border border-[#B8860B]/20">
                                        <div className="text-sm text-[#B8860B] font-medium">Total Documents</div>
                                        <div className="text-2xl font-bold text-gray-900">{documentRequirements.length}</div>
                                    </div>
                                    <div className="bg-[#B8860B]/10 rounded-xl p-4 border border-[#B8860B]/20">
                                        <div className="text-sm text-[#B8860B] font-medium">Required Documents</div>
                                        <div className="text-2xl font-bold text-gray-900">{getRequiredCount()}</div>
                                    </div>
                                    <div className="bg-[#B8860B]/10 rounded-xl p-4 border border-[#B8860B]/20">
                                        <div className="text-sm text-[#B8860B] font-medium">Uploaded Required</div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            {getRequiredUploadedCount()} of {getRequiredCount()}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {documentRequirements.map((doc, index) => (
                                        <motion.div
                                            key={doc.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-[#B8860B]/20 transition-all duration-300"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center gap-2 mb-2">
                                                        <h3 className="text-lg font-bold text-gray-900">
                                                            {doc.title}
                                                            {doc.required && <span className="text-red-500 ml-1">*</span>}
                                                        </h3>
                                                        {uploadStatus[doc.name] && (
                                                            <div className="p-1 bg-[#B8860B]/10 rounded-full">
                                                                <CheckCircle className="w-4 h-4 text-[#B8860B]" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-600 mb-2">{doc.description}</p>
                                                    <div className="flex flex-wrap items-center gap-4 text-sm">
                                                        <span className="flex items-center gap-1 text-gray-500">
                                                            <FileText className="w-3 h-3" />
                                                            {doc.format}
                                                        </span>
                                                        {doc.required ? (
                                                            <span className="flex items-center gap-1 bg-[#B8860B]/10 text-[#B8860B] px-2 py-1 rounded-full">
                                                                <Shield className="w-3 h-3" />
                                                                Required
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                                Optional
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <label className="block text-gray-700 font-medium mb-2">
                                                    Upload Document:
                                                </label>
                                                <div className="flex flex-col items-center gap-4">
                                                    {!formData[doc.name] ? (
                                                        <label className="flex-1 w-full cursor-pointer">
                                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-[#B8860B] transition-colors text-center">
                                                                <input
                                                                    type="file"
                                                                    name={doc.name}
                                                                    accept={doc.accept}
                                                                    onChange={handleFileChange}
                                                                    className="hidden"
                                                                    required={doc.required}
                                                                />
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <Upload className="w-8 h-8 text-gray-400" />
                                                                    <div>
                                                                        <p className="text-gray-700 font-medium">Click to upload</p>
                                                                        <p className="text-sm text-gray-500">Max 5MB • {doc.format}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    ) : (
                                                        <div className="w-full">
                                                            <div className="flex items-center justify-between bg-[#B8860B]/10 border border-[#B8860B]/20 rounded-xl p-4">
                                                                <div className="flex items-center gap-3">
                                                                    <FileText className="w-5 h-5 text-[#B8860B]" />
                                                                    <div>
                                                                        <p className="font-medium text-gray-900 truncate max-w-[200px]">
                                                                            {formData[doc.name]?.name}
                                                                        </p>
                                                                        <p className="text-sm text-gray-500">
                                                                            {formatFileSize(formData[doc.name]!.size)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveFile(doc.name)}
                                                                    className="p-1 hover:bg-[#B8860B]/20 rounded-full transition-colors"
                                                                >
                                                                    <X className="w-4 h-4 text-[#B8860B]" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-8">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            Required Documents: {getRequiredUploadedCount()} of {getRequiredCount()}
                                        </span>
                                        <span className="text-sm font-medium text-gray-700">
                                            {getRequiredCount() > 0 ? 
                                                Math.round((getRequiredUploadedCount() / getRequiredCount()) * 100) : 0
                                            }%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-linear-to-r from-[#B8860B] to-[#B8860B]/80 h-2 rounded-full transition-all duration-500"
                                            style={{ 
                                                width: getRequiredCount() > 0 ? 
                                                    `${(getRequiredUploadedCount() / getRequiredCount()) * 100}%` : '0%'
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
                                        disabled={isSubmitting || !isAllRequiredUploaded()}
                                        onClick={handleSaveAndContinue}
                                        className="group w-full cursor-pointer flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-[#B8860B] to-[#B8860B]/80 text-white font-bold rounded-xl shadow-lg shadow-[#B8860B]/20 hover:shadow-xl hover:shadow-[#B8860B]/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
                                                <span>Save & Continue to Referee Contact</span>
                                                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                            </>
                                        )}
                                    </button>
                                </motion.div>

                                {/* Form Navigation */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        to="/assessment"
                                        className="text-red-500 hover:text-[#B8860B]/80 font-medium text-sm flex items-center gap-1"
                                    >
                                        ← Back to Assessment
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                        Step 5 of 10 • {getRequiredUploadedCount()} of {getRequiredCount()} required documents uploaded
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
                            <div className="bg-linear-to-br from-[#B8860B] to-[#B8860B]/80 rounded-3xl p-8 text-white shadow-2xl shadow-[#B8860B]/20">
                                <div className="flex items-center gap-3 mb-6">
                                    <img
                                        src={AlertLogo}
                                        alt="AlertMFB Logo"
                                        className="w-20 h-20 rounded-xl bg-white/20 p-2"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-bold">Document Guidelines</h3>
                                        <p className="text-white">Ensuring successful verification</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <FileCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Clear & Legible</div>
                                            <div className="text-sm text-white">Ensure all text and details are readable</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Valid Documents</div>
                                            <div className="text-sm text-[#B8860B]/90">All documents must be current and valid</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Proper Format</div>
                                            <div className="text-sm text-[#B8860B]/90">Upload in specified formats only</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-red-500" />
                                    <h4 className="font-bold text-gray-900">Tips for Success</h4>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Scan documents in high resolution</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Ensure all edges are visible in photos</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Name files clearly for easy identification</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Help Card */}
                            <div className="bg-linear-to-r from-[#B8860B]/10 to-[#B8860B]/5 rounded-3xl p-6 border border-[#B8860B]/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-5 h-5 text-[#B8860B]" />
                                    <h4 className="font-bold text-gray-900">Need Assistance?</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    If you're having trouble with document uploads or need clarification, contact our support team.
                                </p>
                                <button 
                                    type="button"
                                    className="w-full px-4 py-2 bg-[#B8860B] text-white text-sm font-semibold rounded-lg hover:bg-[#B8860B]/80 transition-colors"
                                >
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DocumentsUpload;