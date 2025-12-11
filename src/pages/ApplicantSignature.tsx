import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FileCheck, 
    FileSignature, 
    User, 
    Calendar, 
    ChevronRight, 
    Sparkles, 
    AlertCircle, 
    Shield, 
    Target, 
    CheckCircle,
    X
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertLogo from "../assets/images/AlertLogo.png";
import { useApplication } from "../context/ApplicationContext";

interface FormData {
    fullName: string;
    digitalSignature: File | null;
    date: string;
}

interface Step {
    number: number;
    label: string;
    status: "completed" | "current" | "upcoming";
}

const ApplicantSignature = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { applicationData, updateSignature, submitApplication, getApplicationSummary } = useApplication();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Initialize from global state
    const [formData, setFormData] = useState<FormData>(applicationData.signature);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFinalWarning, setShowFinalWarning] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear validation error for this field
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            
            // Validate file type
            const validTypes = ['.png', '.jpg', '.jpeg', '.pdf'];
            const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
            if (!validTypes.includes(fileExtension)) {
                setValidationErrors(prev => ({
                    ...prev,
                    digitalSignature: "Please upload a PNG, JPG, JPEG, or PDF file"
                }));
                return;
            }

            // Validate file size (2MB max for signature)
            if (file.size > 2 * 1024 * 1024) {
                setValidationErrors(prev => ({
                    ...prev,
                    digitalSignature: "File size must be less than 2MB"
                }));
                return;
            }

            setFormData(prev => ({ ...prev, digitalSignature: file }));
            
            // Clear any file validation errors
            if (validationErrors.digitalSignature) {
                setValidationErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.digitalSignature;
                    return newErrors;
                });
            }
        }
    };

    const handleRemoveFile = () => {
        setFormData(prev => ({ ...prev, digitalSignature: null }));
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};
        
        if (!formData.fullName.trim()) {
            errors.fullName = "Full name is required";
        }
        
        if (!formData.digitalSignature) {
            errors.digitalSignature = "Digital signature is required";
        }
        
        if (!formData.date) {
            errors.date = "Date is required";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setShowFinalWarning(false);

        if (!validateForm()) {
            setIsSubmitting(false);
            setShowFinalWarning(true);
            return;
        }

        // Save signature to global state
        updateSignature(formData);

        try {
            // Get final application summary
            const summary = getApplicationSummary();
            console.log("Final Application Summary:", summary);

            // Submit entire application
            const result = await submitApplication();
            
            if (result.success) {
                setShowSuccess(true);
                // Navigate to congratulations page after a brief delay
                setTimeout(() => {
                    navigate('/congratulation');
                }, 2000);
            } else {
                alert(`Submission failed: ${result.message}`);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit application. Please try again.');
            setIsSubmitting(false);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' bytes';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };

    // Consistent steps array
    const steps: Step[] = [
        { number: 1, label: "Personal Info", status: "completed" },
        { number: 2, label: "Parent Info", status: "completed" },
        { number: 3, label: "Educational", status: "completed" },
        { number: 4, label: "Assessment", status: "completed" },
        { number: 5, label: "Documents Upload", status: "completed" },
        { number: 6, label: "Referee Contact", status: "completed" },
        { number: 7, label: "Institutional Verification", status: "completed" },
        { number: 8, label: "Eligibility Checks", status: "completed" },
        { number: 9, label: "Consent Declaration", status: "completed" },
        { number: 10, label: "Applicant Signature", status: "current" },
    ];

    const today = new Date().toISOString().split('T')[0];

    const getCompletionStatus = () => {
        const totalFields = 3; // fullName, digitalSignature, date
        const filledFields = [
            formData.fullName.trim(),
            formData.digitalSignature,
            formData.date
        ].filter(Boolean).length;
        
        return {
            percentage: Math.round((filledFields / totalFields) * 100),
            filled: filledFields,
            total: totalFields
        };
    };

    const completion = getCompletionStatus();

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
                                <div className="font-bold">Application Submitted!</div>
                                <div className="text-sm opacity-90">Your scholarship application has been submitted successfully.</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Warning Toast */}
            <AnimatePresence>
                {showFinalWarning && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-6 right-6 z-50"
                        onAnimationComplete={() => setTimeout(() => setShowFinalWarning(false), 5000)}
                    >
                        <div className="bg-linear-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-xl shadow-2xl shadow-amber-200 flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-bold">Incomplete Signature Section</div>
                                <div className="text-sm opacity-90">Please fill in all fields before submitting.</div>
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
                            Final Step
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Applicant <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Signature</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Provide your final signature to complete and submit your scholarship application.
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
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                                            step.status === "current"
                                                ? "bg-linear-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-200" // Fixed typo here
                                                : "bg-linear-to-r from-emerald-500 to-green-400 text-white shadow-lg shadow-emerald-200"
                                        }`}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
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
                                        <FileSignature className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Final Signature & Submission</h2>
                                        <p className="text-gray-600">Step 10 of 10 - Sign and submit your application</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="p-8">
                                {/* Progress Overview */}
                                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                        <div className="text-sm text-blue-600 font-medium">Completion</div>
                                        <div className="text-2xl font-bold text-gray-900">{completion.percentage}%</div>
                                    </div>
                                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                                        <div className="text-sm text-amber-600 font-medium">Required Fields</div>
                                        <div className="text-2xl font-bold text-gray-900">{completion.total}</div>
                                    </div>
                                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                        <div className="text-sm text-emerald-600 font-medium">Filled Fields</div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            {completion.filled} of {completion.total}
                                        </div>
                                    </div>
                                </div>

                                {/* Final Warning */}
                                <div className="mb-8 bg-linear-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                                    <div className="flex items-start gap-4">
                                        <AlertCircle className="w-6 h-6 text-purple-600 shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Final Submission Notice</h3>
                                            <p className="text-sm text-gray-600">
                                                By signing and submitting this application, you certify that all information provided is true and accurate. 
                                                This signature constitutes your final approval and consent to all previous declarations.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Validation Errors */}
                                {Object.keys(validationErrors).length > 0 && (
                                    <div className="mb-6 bg-linear-to-r from-red-50 to-pink-50 rounded-2xl p-4 border border-red-200">
                                        <div className="flex items-center gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-600" />
                                            <div>
                                                <h3 className="font-bold text-gray-900">Validation Required</h3>
                                                {Object.entries(validationErrors).map(([field, error]) => (
                                                    <p key={field} className="text-sm text-gray-600">{error}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Form Fields Grid */}
                                <div className="space-y-8">
                                    {/* Full Name */}
                                    <div className="bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <User className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <label className="block text-lg font-bold text-gray-900 mb-1">
                                                    Applicant's Full Name
                                                </label>
                                                <p className="text-sm text-gray-500">Your name as it appears on official documents</p>
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter your full legal name"
                                            className={`w-full px-4 py-3 bg-gray-50 border ${validationErrors.fullName ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                            required
                                        />
                                        {validationErrors.fullName && (
                                            <p className="text-red-500 text-sm mt-2">{validationErrors.fullName}</p>
                                        )}
                                    </div>

                                    {/* Digital Signature Upload */}
                                    <div className="bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <FileSignature className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <label className="block text-lg font-bold text-gray-900 mb-1">
                                                    Digital Signature Upload
                                                </label>
                                                <p className="text-sm text-gray-500">Upload your signature as a PNG, JPG, JPEG, or PDF file (max 2MB)</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-4">
                                            {!formData.digitalSignature ? (
                                                <label className="flex-1 w-full cursor-pointer">
                                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 transition-colors text-center">
                                                        <input
                                                            type="file"
                                                            name="digitalSignature"
                                                            accept=".png,.jpg,.jpeg,.pdf"
                                                            onChange={handleFileChange}
                                                            className="hidden"
                                                            required
                                                        />
                                                        <div className="flex flex-col items-center gap-3">
                                                            <FileSignature className="w-10 h-10 text-gray-400" />
                                                            <div>
                                                                <p className="text-gray-700 font-medium">Click to upload signature</p>
                                                                <p className="text-sm text-gray-500">PNG, JPG, JPEG, or PDF (max 2MB)</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>
                                            ) : (
                                                <div className="w-full">
                                                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                                                        <div className="flex items-center gap-3">
                                                            <FileSignature className="w-5 h-5 text-emerald-600" />
                                                            <div>
                                                                <p className="font-medium text-gray-900 truncate max-w-[200px]">
                                                                    {formData.digitalSignature.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {formatFileSize(formData.digitalSignature.size)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={handleRemoveFile}
                                                            className="p-1 hover:bg-emerald-100 rounded-full transition-colors"
                                                        >
                                                            <X className="w-4 h-4 text-emerald-600" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {validationErrors.digitalSignature && (
                                                <p className="text-red-500 text-sm w-full">{validationErrors.digitalSignature}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <Calendar className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <label className="block text-lg font-bold text-gray-900 mb-1">
                                                    Date of Signature
                                                </label>
                                                <p className="text-sm text-gray-500">Today's date or date of signature</p>
                                            </div>
                                        </div>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            max={today}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 bg-gray-50 border ${validationErrors.date ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                            required
                                        />
                                        {validationErrors.date && (
                                            <p className="text-red-500 text-sm mt-2">{validationErrors.date}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-8">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            Form Completion: {completion.percentage}%
                                        </span>
                                        <span className="text-sm font-medium text-gray-700">
                                            {completion.filled} of {completion.total} fields
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-linear-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${completion.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Final Declaration */}
                                <div className="mt-8 bg-linear-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <h3 className="font-bold text-gray-900">Final Declaration</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        I, <span className="font-bold text-gray-900">{formData.fullName || "[Your Name]"}</span>, 
                                        hereby declare that all information provided in this scholarship application is true, complete, 
                                        and accurate to the best of my knowledge. I understand that any false information may result 
                                        in disqualification and legal consequences.
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || completion.percentage < 100}
                                    className={`group w-full cursor-pointer mt-12 flex items-center justify-center gap-3 px-8 py-4 font-bold rounded-xl shadow-lg transition-all duration-300 ${
                                        isSubmitting || completion.percentage < 100
                                            ? 'opacity-70 cursor-not-allowed'
                                            : ''
                                    } ${isSubmitting
                                        ? 'bg-gray-400 text-gray-300'
                                        : 'bg-linear-to-r from-emerald-500 to-green-500 text-white shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Submitting Application...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Submit Scholarship Application</span>
                                            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                        </>
                                    )}
                                </motion.button>

                                {/* Form Navigation */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        to="/consent-declaration"
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                                    >
                                        ← Back to Consent Declaration
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                        Step 10 of 10 • {completion.percentage}% Complete
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
                            <div className="bg-linear-to-br from-emerald-600 to-green-500 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <img
                                        src={AlertLogo}
                                        alt="AlertMFB Logo"
                                        className="w-16 h-16 rounded-xl bg-white/20 p-2"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-bold">Final Step Complete!</h3>
                                        <p className="text-emerald-100">You're almost there</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Application Complete</div>
                                            <div className="text-sm text-emerald-100">All 10 steps successfully completed</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Legal Signature</div>
                                            <div className="text-sm text-emerald-100">Your signature makes this legally binding</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <FileCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Next Steps</div>
                                            <div className="text-sm text-emerald-100">Review process begins after submission</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-amber-500" />
                                    <h4 className="font-bold text-gray-900">Signature Guidelines</h4>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Use your legal signature as on official documents</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Ensure signature is clear and legible</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Date should match the day you sign</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Help Card */}
                            <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-3xl p-6 border border-blue-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-5 h-5 text-blue-600" />
                                    <h4 className="font-bold text-gray-900">Need Assistance?</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    If you have questions about the submission process or need technical support, contact us.
                                </p>
                                <button 
                                    type="button"
                                    className="w-full px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors"
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

export default ApplicantSignature;