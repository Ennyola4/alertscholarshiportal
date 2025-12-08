import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSignature, CheckCircle, AlertCircle, ChevronRight, Sparkles, Shield, FileText, Target  } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AlertLogo from "../assets/images/AlertLogo.jpg";

const CDA = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const [consents, setConsents] = useState({
        consentDataProcessing: false,
        consentDataAggregated: false,
        dataRetention: false,
        publicityRights: false,
        verifyInformation: false,
        understandFalsification: false,
        infoTruthful: false,
        infoFalsePenalty: false,
        maintainCGPA: false,
        tuitionOnly: false,
        workCommitment: false,
        refundIfNoCommitment: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setConsents(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Check if all declarations are accepted
        const allAccepted = Object.values(consents).every(Boolean);

        if (!allAccepted) {
            setShowWarning(true);
            setIsSubmitting(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            console.log("Consents submitted:", consents);
            setIsSubmitting(false);
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
        { number: 5, label: "Documents Upload", status: "completed" },
        { number: 6, label: "Referee Contact", status: "completed" },
        { number: 7, label: "Institutional Verification", status: "completed" },
        { number: 8, label: "Eligibility Checks", status: "completed" },
        { number: 9, label: "Consent Declaration", status: "current" },
        { number: 10, label: "Applicant Signature", status: "upcoming" },
    ];

    const consentSections = [
        {
            id: "A",
            title: "Data Protection & Consent",
            consents: [
                {
                    id: "consentDataProcessing",
                    label: "I consent to the collection, processing, and storage of my personal data for administering the Alert Group Scholarship Programme."
                },
                {
                    id: "consentDataAggregated",
                    label: "I understand that my data may be used in aggregated, non-identifiable form for CSR reporting."
                }
            ]
        },
        {
            id: "B",
            title: "Data Retention Clause",
            consents: [
                {
                    id: "dataRetention",
                    label: "I understand that my data will be retained for five (5) years for audit, verification, and CSR reporting purposes."
                }
            ]
        },
        {
            id: "C",
            title: "Publicity Rights",
            consents: [
                {
                    id: "publicityRights",
                    label: "If selected, I grant Alert Group the right to use my name, image, academic info, and biography for CSR publicity."
                }
            ]
        },
        {
            id: "D",
            title: "Verification Consent",
            consents: [
                {
                    id: "verifyInformation",
                    label: "I authorize Alert Group to verify all information provided."
                },
                {
                    id: "understandFalsification",
                    label: "I understand that falsified information will lead to disqualification."
                }
            ]
        },
        {
            id: "E",
            title: "Accuracy of Information",
            consents: [
                {
                    id: "infoTruthful",
                    label: "I certify that all information provided is accurate."
                },
                {
                    id: "infoFalsePenalty",
                    label: "I understand that false information will lead to disqualification."
                }
            ]
        },
        {
            id: "F",
            title: "Scholarship Conditions",
            consents: [
                {
                    id: "maintainCGPA",
                    label: "I understand that I must maintain a CGPA of at least 4.0."
                },
                {
                    id: "tuitionOnly",
                    label: "The scholarship covers tuition fees only."
                }
            ]
        },
        {
            id: "G",
            title: "Post-Graduation Commitment",
            consents: [
                {
                    id: "workCommitment",
                    label: "I agree to the one-year post-graduation work commitment if a role is available."
                },
                {
                    id: "refundIfNoCommitment",
                    label: "Failure to complete this commitment will require refunding scholarship funds."
                }
            ]
        }
    ];

    const allConsentsAccepted = Object.values(consents).every(Boolean);

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
                        <div className="bg-linear-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-xl shadow-2xl shadow-amber-200 flex items-center gap-3">
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
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-linear-to-r from-blue-100 to-cyan-100 rounded-full border border-blue-200">
                        <FileSignature className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                            Consent & Declaration
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Consent, Declaration <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">& Attestation</span>
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
                                                ? "bg-linear-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-200"
                                                : step.number < 9
                                                ? "bg-linear-to-r from-emerald-500 to-green-400 text-white shadow-lg shadow-emerald-200"
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
                            <div className="p-8 border-b border-gray-100 bg-linear-to-r from-blue-50 to-cyan-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-linear-to-r from-blue-500 to-cyan-400 rounded-xl">
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
                                {/* Important Legal Notice */}
                                <div className="mb-8 bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                                    <div className="flex items-start gap-4">
                                        <AlertCircle className="w-6 h-6 text-amber-600 hrink-0" />
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Important Legal Notice</h3>
                                            <p className="text-sm text-gray-600 mb-3">
                                                These declarations constitute a legally binding agreement between you and AlertMFB. 
                                                By checking these boxes, you are acknowledging and agreeing to all terms and conditions.
                                            </p>
                                            <div className="flex items-center gap-2 text-sm text-amber-700">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>All declarations must be accepted to proceed with your application.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Indicator */}
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            Declaration Progress
                                        </span>
                                        <span className="text-sm font-bold text-blue-600">
                                            {Object.values(consents).filter(Boolean).length} of {Object.keys(consents).length} accepted
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <motion.div
                                            className="bg-linear-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(Object.values(consents).filter(Boolean).length / Object.keys(consents).length) * 100}%` }}
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
                                            className="bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
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
                                                        className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-100 transition-all"
                                                    >
                                                        <div className="mt-1">
                                                            <input
                                                                type="checkbox"
                                                                id={consent.id}
                                                                name={consent.id}
                                                                checked={consents[consent.id as keyof typeof consents]}
                                                                onChange={handleConsentChange}
                                                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
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
                                                                {consents[consent.id as keyof typeof consents] && (
                                                                    <div className="p-1 bg-emerald-50 rounded-full ml-2">
                                                                        <CheckCircle className="w-5 h-5 text-emerald-500" />
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
                                {allConsentsAccepted && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-8 bg-linear-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-emerald-100 rounded-lg">
                                                <CheckCircle className="w-6 h-6 text-emerald-600" />
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
                                    <Link
                                        to="/applicant-signature"
                                        className={`group w-full flex items-center justify-center gap-3 px-8 py-4 font-bold rounded-xl shadow-lg transition-all duration-300 ${
                                            allConsentsAccepted
                                                ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-blue-200 hover:shadow-xl hover:shadow-blue-300"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                        onClick={(e) => {
                                            if (!allConsentsAccepted) {
                                                e.preventDefault();
                                                setShowWarning(true);
                                            }
                                        }}
                                    >
                                        <span>{allConsentsAccepted ? "Continue to Applicant Signature" : "Accept All Declarations to Continue"}</span>
                                        {allConsentsAccepted && (
                                            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                        )}
                                    </Link>
                                </motion.div>

                                {/* Form Navigation */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        to="/eligibility-verification"
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                                    >
                                        ← Back to Eligibility Verification
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                        Step 9 of 10 • Consent & Declaration
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
                                        className="w-16 h-16 rounded-xl bg-white/20 p-2"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-bold">Legal Declarations</h3>
                                        <p className="text-blue-100">Understanding your commitments</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Data Protection</div>
                                            <div className="text-sm text-blue-100">Your data is protected and used responsibly</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Verification Rights</div>
                                            <div className="text-sm text-blue-100">We verify all application information</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Post-Graduation</div>
                                            <div className="text-sm text-blue-100">One-year work commitment opportunity</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-amber-500" />
                                    <h4 className="font-bold text-gray-900">Important to Note</h4>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">These declarations are legally binding</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Data is retained for 5 years as per policy</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">All declarations must be accepted to proceed</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Help Card */}
                            <div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-5 h-5 text-emerald-600" />
                                    <h4 className="font-bold text-gray-900">Need Clarification?</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    If you have questions about any declarations or need legal clarification, please contact our support team.
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

export default CDA