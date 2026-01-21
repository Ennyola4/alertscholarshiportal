import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FileSignature, 
    CheckCircle, 
    AlertCircle, 
    ChevronRight, 
    Sparkles, 
    Shield, 
    FileText, 
    Target  
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertLogo from "../assets/images/AlertLogo.png";
import { useApplication } from "../context/ApplicationContext";

interface FormData {
    consentDataProcessing: boolean;
    consentDataAggregated: boolean;
    dataRetention: boolean;
    publicityRights: boolean;
    verifyInformation: boolean;
    understandFalsification: boolean;
    infoTruthful: boolean;
    infoFalsePenalty: boolean;
    maintainCGPA: boolean;
    tuitionOnly: boolean;
    workCommitment: boolean;
    refundIfNoCommitment: boolean;
}

interface Step {
    number: number;
    label: string;
    status: "completed" | "current" | "upcoming";
}

interface ConsentSection {
    id: string;
    title: string;
    consents: {
        id: keyof FormData;
        label: string;
        required: boolean;
    }[];
}

const CDA = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { applicationData, updateConsentDeclaration } = useApplication();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const [formData, setFormData] = useState<FormData>(applicationData.consentDeclaration);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
        
        // Clear validation errors when user checks a box
        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }
        setShowWarning(false);
    };

    const validateForm = (): boolean => {
        const errors: string[] = [];
        
        // Check if all consents are accepted
        const allAccepted = Object.values(formData).every(Boolean);
        if (!allAccepted) {
            errors.push("You must agree to all declarations and consents to continue.");
        }

        setValidationErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            setShowWarning(true);
            return;
        }

        // Update context
        updateConsentDeclaration(formData);

        // Simulate API call
        setTimeout(() => {
            console.log("Consents submitted:", formData);
            setIsSubmitting(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);

            // Navigate to next page
            navigate('/applicant-signature');
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
        { number: 5, label: "Documents Upload", status: "completed" },
        { number: 6, label: "Referee Contact", status: "completed" },
        { number: 7, label: "Institutional Verification", status: "completed" },
        { number: 8, label: "Eligibility Checks", status: "completed" },
        { number: 9, label: "Consent Declaration", status: "current" },
        { number: 10, label: "Applicant Signature", status: "upcoming" },
    ];

    const consentSections: ConsentSection[] = [
        {
            id: "A",
            title: "Data Protection & Consent",
            consents: [
                {
                    id: "consentDataProcessing",
                    label: "I consent to the collection, processing, and storage of my personal data for administering the Alert Group Scholarship Programme.",
                    required: true
                },
                {
                    id: "consentDataAggregated",
                    label: "I understand that my data may be used in aggregated, non-identifiable form for CSR reporting.",
                    required: true
                }
            ]
        },
        {
            id: "B",
            title: "Data Retention Clause",
            consents: [
                {
                    id: "dataRetention",
                    label: "I understand that my data will be retained for five (5) years for audit, verification, and CSR reporting purposes.",
                    required: true
                }
            ]
        },
        {
            id: "C",
            title: "Publicity Rights",
            consents: [
                {
                    id: "publicityRights",
                    label: "If selected, I grant Alert Group the right to use my name, image, academic info, and biography for CSR publicity.",
                    required: true
                }
            ]
        },
        {
            id: "D",
            title: "Verification Consent",
            consents: [
                {
                    id: "verifyInformation",
                    label: "I authorize Alert Group to verify all information provided.",
                    required: true
                },
                {
                    id: "understandFalsification",
                    label: "I understand that falsified information will lead to disqualification.",
                    required: true
                }
            ]
        },
        {
            id: "E",
            title: "Accuracy of Information",
            consents: [
                {
                    id: "infoTruthful",
                    label: "I certify that all information provided is accurate.",
                    required: true
                },
                {
                    id: "infoFalsePenalty",
                    label: "I understand that false information will lead to disqualification.",
                    required: true
                }
            ]
        },
        {
            id: "F",
            title: "Scholarship Conditions",
            consents: [
                {
                    id: "maintainCGPA",
                    label: "I understand that I must maintain a CGPA of at least 4.0.",
                    required: true
                },
                {
                    id: "tuitionOnly",
                    label: "The scholarship covers tuition fees only.",
                    required: true
                }
            ]
        },
        {
            id: "G",
            title: "Post-Graduation Commitment",
            consents: [
                {
                    id: "workCommitment",
                    label: "I agree to the one-year post-graduation work commitment if a role is available.",
                    required: true
                },
                {
                    id: "refundIfNoCommitment",
                    label: "Failure to complete this commitment will require refunding scholarship funds.",
                    required: true
                }
            ]
        }
    ];

    const getAcceptedCount = () => {
        return Object.values(formData).filter(value => value).length;
    };

    const getTotalCount = () => {
        return Object.keys(formData).length;
    };

    const getCompletionPercentage = () => {
        return Math.round((getAcceptedCount() / getTotalCount()) * 100);
    };

    const isAllAccepted = () => {
        return getAcceptedCount() === getTotalCount();
    };

    return (
        <div className="min-h-screen  font-sans">
            {/* Success Toast */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-6 right-6 z-50"
                    >
                        <div className="bg-linear-to-r from-[#B8860B] to-[#D4A017] text-white px-6 py-4 rounded-xl shadow-2xl shadow-[#B8860B]/30 flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold">Consent Submitted!</div>
                                <div className="text-sm opacity-90">Your declarations have been accepted successfully.</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Warning Toast */}
            <AnimatePresence>
                {showWarning && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-6 right-6 z-50"
                        onAnimationComplete={() => setTimeout(() => setShowWarning(false), 5000)}
                    >
                        <div className="bg-linear-to-r from-[#B8860B] to-[#D4A017] text-white px-6 py-4 rounded-xl shadow-2xl shadow-[#B8860B]/30 flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-bold">Incomplete Declarations</div>
                                <div className="text-sm opacity-90">You must agree to all declarations to continue.</div>
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
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-linear-to-r from-[#F5E6C8] to-[#FDF6E3] rounded-full border border-[#B8860B]/30">
                        <FileSignature className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-semibold text-[#B8860B] uppercase tracking-wider">
                            Consent & Declaration
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Consent, Declaration <span className="bg-linear-to-r from-[#B8860B] to-[#D4A017] bg-clip-text text-transparent">& Attestation</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Review and accept all declarations and consents required for your scholarship application. All items must be accepted to proceed.
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
                                                ? "bg-linear-to-r from-[#B8860B] to-[#D4A017] text-white shadow-lg shadow-[#B8860B]/30"
                                                : step.number < 9
                                                ? "bg-linear-to-r from-[#B8860B] to-[#D4A017] text-white shadow-lg shadow-[#B8860B]/30"
                                                : "bg-gray-100 text-gray-400"
                                        }`}>
                                            {step.number < 9 ? (
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
                            <div className="p-8 border-b border-gray-100 bg-linear-to-r from-[#FDF6E3] to-[#F5E6C8]">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-linear-to-r from-[#B8860B] to-[#D4A017] rounded-xl">
                                        <FileSignature className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Legal Declarations & Consents</h2>
                                        <p className="text-gray-600">Step 9 of 10 - Review and accept all declarations</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="p-8">
                                {/* Progress Overview */}
                                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-[#FDF6E3] rounded-xl p-4 border border-[#F5E6C8]">
                                        <div className="text-sm text-[#B8860B] font-medium">Completion</div>
                                        <div className="text-2xl font-bold text-gray-900">{getCompletionPercentage()}%</div>
                                    </div>
                                    <div className="bg-[#FDF6E3] rounded-xl p-4 border border-[#F5E6C8]">
                                        <div className="text-sm text-[#B8860B] font-medium">Total Declarations</div>
                                        <div className="text-2xl font-bold text-gray-900">{getTotalCount()}</div>
                                    </div>
                                    <div className="bg-[#FDF6E3] rounded-xl p-4 border border-[#F5E6C8]">
                                        <div className="text-sm text-[#B8860B] font-medium">Accepted</div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            {getAcceptedCount()} of {getTotalCount()}
                                        </div>
                                    </div>
                                </div>

                                {/* Important Legal Notice */}
                                <div className="mb-8 bg-linear-to-r from-[#FDF6E3] to-[#F5E6C8] rounded-2xl p-6 border border-[#B8860B]/30">
                                    <div className="flex items-start gap-4">
                                        <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Important Legal Notice</h3>
                                            <p className="text-sm text-gray-600 mb-3">
                                                These declarations constitute a legally binding agreement between you and AlertMFB. 
                                                By checking these boxes, you are acknowledging and agreeing to all terms and conditions.
                                            </p>
                                            <div className="flex items-center gap-2 text-sm text-[#B8860B]">
                                                <AlertCircle className="w-4 h-4 text-red-500" />
                                                <span>All declarations must be accepted to proceed with your application.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Validation Errors */}
                                {validationErrors.length > 0 && (
                                    <div className="mb-6 bg-linear-to-r from-[#FDF6E3] to-[#F5E6C8] rounded-2xl p-4 border border-[#B8860B]/30">
                                        <div className="flex items-center gap-3">
                                            <AlertCircle className="w-5 h-5 text-[#B8860B]" />
                                            <div>
                                                <h3 className="font-bold text-gray-900">Action Required</h3>
                                                {validationErrors.map((error, index) => (
                                                    <p key={index} className="text-sm text-gray-600">{error}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Progress Indicator */}
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            Declaration Progress: {getCompletionPercentage()}%
                                        </span>
                                        <span className="text-sm font-medium text-gray-700">
                                            {getAcceptedCount()} of {getTotalCount()} declarations
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <motion.div
                                            className="bg-linear-to-r from-[#B8860B] to-[#D4A017] h-2 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${getCompletionPercentage()}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                </div>

                                {/* Consent Sections */}
                                <div className="space-y-8">
                                    {consentSections.map((section, sectionIndex) => (
                                        <motion.div
                                            key={section.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: sectionIndex * 0.1 }}
                                            className={`bg-linear-to-r ${section.consents.every(consent => formData[consent.id]) 
                                                ? 'from-[#FDF6E3] to-[#F5E6C8] border-[#B8860B]/30' 
                                                : 'from-gray-50 to-white border-gray-200'
                                            } rounded-2xl p-6 border hover:border-[#B8860B]/30 transition-all duration-300`}
                                        >
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className={`w-8 h-8 ${section.consents.every(consent => formData[consent.id]) 
                                                    ? 'bg-linear-to-r from-[#B8860B] to-[#D4A017]' 
                                                    : 'bg-linear-to-r from-[#B8860B] to-[#D4A017]'
                                                } rounded-lg flex items-center justify-center`}>
                                                    <span className="text-white font-bold">{section.id}</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                                            </div>

                                            <div className="space-y-4">
                                                {section.consents.map((consent, consentIndex) => (
                                                    <motion.div
                                                        key={consent.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: (sectionIndex * 0.1) + (consentIndex * 0.05) }}
                                                        className={`flex items-start gap-4 p-4 ${formData[consent.id] 
                                                            ? 'bg-[#FDF6E3] border-[#B8860B]/30' 
                                                            : 'bg-white border-gray-100'
                                                        } rounded-xl border hover:border-[#B8860B]/30 transition-all`}
                                                    >
                                                        <div className="mt-1">
                                                            <input
                                                                type="checkbox"
                                                                id={consent.id}
                                                                name={consent.id}
                                                                checked={formData[consent.id]}
                                                                onChange={handleConsentChange}
                                                                className="w-5 h-5 text-[#B8860B] bg-gray-100 border-gray-300 rounded focus:ring-[#B8860B] focus:ring-2"
                                                                required={consent.required}
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between">
                                                                <label
                                                                    htmlFor={consent.id}
                                                                    className="text-gray-800 cursor-pointer flex-1"
                                                                >
                                                                    {consent.label}
                                                                </label>
                                                                {formData[consent.id] && (
                                                                    <div className="p-1 bg-[#FDF6E3] rounded-full ml-2">
                                                                        <CheckCircle className="w-5 h-5 text-[#B8860B]" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* All Accepted Indicator */}
                                {isAllAccepted() && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-8 bg-linear-to-r from-[#FDF6E3] to-[#F5E6C8] rounded-2xl p-6 border border-[#B8860B]/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#F5E6C8] rounded-lg">
                                                <CheckCircle className="w-6 h-6 text-red-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">All Declarations Accepted</h3>
                                                <p className="text-sm text-gray-600">
                                                    You have successfully accepted all required declarations and consents. You may now proceed to the final step.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Continue Button */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="mt-12"
                                >
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !isAllAccepted()}
                                        onClick={handleSaveAndContinue}
                                        className="group w-full cursor-pointer flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-[#B8860B] to-[#D4A017] text-white font-bold rounded-xl shadow-lg shadow-[#B8860B]/30 hover:shadow-xl hover:shadow-[#B8860B]/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Saving Declarations...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Save & Continue to Applicant Signature</span>
                                                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                            </>
                                        )}
                                    </button>
                                </motion.div>

                                {/* Form Navigation */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        to="/eligibility-verification"
                                        className="text-red-500 hover:text-[#D4A017] font-medium text-sm flex items-center gap-1"
                                    >
                                        ← Back to Eligibility Verification
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                        Step 9 of 10 • {getAcceptedCount()} of {getTotalCount()} declarations accepted
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
                            <div className="bg-linear-to-br from-[#B8860B] to-[#D4A017] rounded-3xl p-8 text-white shadow-2xl shadow-[#B8860B]/30">
                                <div className="flex items-center gap-3 mb-6">
                                    <img
                                        src={AlertLogo}
                                        alt="AlertMFB Logo"
                                        className="w-20 h-20 rounded-xl bg-white/20 p-2"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-bold">Legal Declarations</h3>
                                        <p className="text-[#FDF6E3]">Understanding your commitments</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Data Protection</div>
                                            <div className="text-sm text-[#FDF6E3]">Your data is protected and used responsibly</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Verification Rights</div>
                                            <div className="text-sm text-[#FDF6E3]">We verify all application information</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Post-Graduation</div>
                                            <div className="text-sm text-[#FDF6E3]">One-year work commitment opportunity</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-red-500" />
                                    <h4 className="font-bold text-gray-900">Important to Note</h4>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">These declarations are legally binding</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Data is retained for 5 years as per policy</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">All declarations must be accepted to proceed</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Help Card */}
                            <div className="bg-linear-to-r from-[#FDF6E3] to-[#F5E6C8] rounded-3xl p-6 border border-[#B8860B]/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <h4 className="font-bold text-gray-900">Need Clarification?</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    If you have questions about any declarations or need legal clarification, please contact our support team.
                                </p>
                                <button 
                                    type="button"
                                    className="w-full px-4 py-2 bg-[#B8860B] text-white text-sm font-semibold rounded-lg hover:bg-[#D4A017] transition-colors"
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

export default CDA;