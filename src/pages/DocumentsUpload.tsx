import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck, FileText, Upload, ChevronRight, Sparkles, AlertCircle, CheckCircle, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AlertLogo from "../assets/images/AlertLogo.png";

const DocumentsUpload = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const [formData, setFormData] = useState({
        birthCertificate: null as File | null,
        nationalId: null as File | null,
        studentId: null as File | null,
        passportPhoto: null as File | null,
        admissionLetter: null as File | null,
        transcript: null as File | null,
        incomeDeclaration: null as File | null,
        recommendationFaculty: null as File | null,
        recommendationCommunity: null as File | null,
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<Record<string, boolean>>({});

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
            setUploadStatus(prev => ({ ...prev, [name]: true }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        

        // Validate that all required files are uploaded
        const requiredFiles = [
            'birthCertificate', 'nationalId', 'studentId', 'passportPhoto',
            'admissionLetter', 'transcript', 'incomeDeclaration'
        ];
        const allRequiredUploaded = requiredFiles.every(fileName =>
            formData[fileName as keyof typeof formData] !== null
        );

        if (!allRequiredUploaded) {
            alert("Please upload all required documents before continuing.");
            
            return;
        }

        // Simulate API call
        setTimeout(() => {
            console.log("Documents submitted:", formData);
           
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    // Consistent steps array
    const steps = [
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

    const documentRequirements = [
        {
            name: "birthCertificate",
            title: "Birth Certificate or Affidavit",
            description: "Official birth certificate or sworn affidavit of age declaration",
            format: "PDF, JPG, or PNG",
            required: true
        },
        {
            name: "nationalId",
            title: "Valid National ID",
            description: "NIN Slip, Voter Card, International Passport, or Driver's License",
            format: "PDF, JPG, or PNG",
            required: true
        },
        {
            name: "studentId",
            title: "Student ID Card",
            description: "Current academic session student identification card",
            format: "PDF, JPG, or PNG",
            required: true
        },
        {
            name: "passportPhoto",
            title: "Passport Photograph",
            description: "Recent passport photograph on white background",
            format: "JPG or PNG",
            required: true
        },
        {
            name: "admissionLetter",
            title: "Official Admission Letter",
            description: "Letter of admission from your institution",
            format: "PDF, JPG, or PNG",
            required: true
        },
        {
            name: "transcript",
            title: "Most Recent Academic Transcript",
            description: "Official transcript showing CGPA and academic performance",
            format: "PDF, JPG, or PNG",
            required: true
        },
        {
            name: "incomeDeclaration",
            title: "Parent/Guardian Income Declaration",
            description: "Proof of income or affidavit of financial status",
            format: "PDF, JPG, or PNG",
            required: true
        },
        {
            name: "recommendationFaculty",
            title: "Recommendation Letter – Faculty Member",
            description: "Letter from a lecturer or academic advisor",
            format: "PDF, JPG, or PNG",
            required: false
        },
        {
            name: "recommendationCommunity",
            title: "Recommendation Letter – Community Leader/Mentor",
            description: "Letter from community leader, religious leader, or mentor",
            format: "PDF, JPG, or PNG",
            required: false
        },
    ];

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
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-linear-to-r from-blue-100 to-cyan-100 rounded-full border border-blue-200">
                        <FileCheck className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                            Document Uploads
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Required <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Documents</span>
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
                                                ? "bg-linear-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-200"
                                                : step.number < 5
                                                    ? "bg-linear-to-r from-emerald-500 to-green-400 text-white shadow-lg shadow-emerald-200"
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
                            <div className="p-8 border-b border-gray-100 bg-linear-to-r from-blue-50 to-cyan-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-linear-to-r from-blue-500 to-cyan-400 rounded-xl">
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
                                <div className="mb-6 bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200">
                                    <div className="flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 text-amber-600" />
                                        <div>
                                            <h3 className="font-bold text-gray-900">Important Notes</h3>
                                            <p className="text-sm text-gray-600">
                                                All documents must be clear, legible, and in the specified formats.
                                                Files should not exceed 5MB each. Asterisk (*) indicates required documents.
                                            </p>
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
                                            className="bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-300"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="text-lg font-bold text-gray-900">
                                                            {doc.title}
                                                            {doc.required && <span className="text-red-500 ml-1">*</span>}
                                                        </h3>
                                                        {uploadStatus[doc.name] && (
                                                            <div className="p-1 bg-emerald-50 rounded-full">
                                                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-600 mb-2">{doc.description}</p>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <FileText className="w-3 h-3" />
                                                            {doc.format}
                                                        </span>
                                                        {doc.required && (
                                                            <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                                                                <Shield className="w-3 h-3" />
                                                                Required
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <label className="block text-gray-700 font-medium mb-2">
                                                    Upload Document:
                                                </label>
                                                <div className="flex items-center gap-4">
                                                    <label className="flex-1 cursor-pointer">
                                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors text-center">
                                                            <input
                                                                type="file"
                                                                name={doc.name}
                                                                accept={doc.name === "passportPhoto" ? ".jpg,.jpeg,.png" : ".pdf,.jpg,.jpeg,.png"}
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
                                                    {formData[doc.name as keyof typeof formData] && (
                                                        <div className="text-sm text-gray-600">
                                                            <p className="font-medium">Selected:</p>
                                                            <p className="truncate max-w-[200px]">
                                                                {(formData[doc.name as keyof typeof formData] as File)?.name}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Continue Button */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="mt-12"
                                >
                                    <Link
                                        to="/referre-contact-verification"
                                        className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300"
                                    >
                                        <span>Continue to Referee Contact Verification</span>
                                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                    </Link>
                                </motion.div>

                                {/* Form Navigation */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        to="/assessment"
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                                    >
                                        ← Back to Assessment
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                        Step 5 of 10 • Documents Upload
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
                                        <h3 className="text-2xl font-bold">Document Guidelines</h3>
                                        <p className="text-blue-100">Ensuring successful verification</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <FileCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Clear & Legible</div>
                                            <div className="text-sm text-blue-100">Ensure all text and details are readable</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Valid Documents</div>
                                            <div className="text-sm text-blue-100">All documents must be current and valid</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Proper Format</div>
                                            <div className="text-sm text-blue-100">Upload in specified formats only</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-amber-500" />
                                    <h4 className="font-bold text-gray-900">Tips for Success</h4>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Scan documents in high resolution</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Ensure all edges are visible in photos</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Name files clearly for easy identification</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Help Card */}
                            <div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-5 h-5 text-emerald-600" />
                                    <h4 className="font-bold text-gray-900">Need Assistance?</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    If you're having trouble with document uploads or need clarification, contact our support team.
                                </p>
                                <button className="w-full px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors">
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