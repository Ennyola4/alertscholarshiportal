import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, ChevronRight, Sparkles, Shield, FileText, Target, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AlertLogo from "../assets/images/AlertLogo.jpg";

const EligibilityVerification = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const [eligibilityChecks, setEligibilityChecks] = useState({
        academicStanding: false,
        financialNeed: false,
        goodConduct: false,
        ageRequirement: false,
        enrollmentStatus: false,
        citizenshipStatus: false,
        noOtherScholarship: false,
        agreeToTerms: false,
    });

    
    const [showSuccess, setShowSuccess] = useState(false);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setEligibilityChecks(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       

        // Validate all checkboxes are checked
        const allChecked = Object.values(eligibilityChecks).every(check => check);

        if (!allChecked) {
            alert("You must agree to all eligibility criteria to continue.");
             
            return;
        }

        // Simulate API call
        setTimeout(() => {
            console.log("Eligibility checks submitted:", eligibilityChecks);
            
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
        { number: 8, label: "Eligibility Checks", status: "current" },
        { number: 9, label: "Consent Declaration", status: "upcoming" },
        { number: 10, label: "Applicant Signature", status: "upcoming" },
    ];

    const eligibilityCriteria = [
        {
            id: "academicStanding",
            label: "I confirm that I maintain a minimum CGPA of 3.0/5.0 (or equivalent) and am in good academic standing.",
            description: "Academic performance requirement"
        },
        {
            id: "financialNeed",
            label: "I confirm that I have a genuine financial need and require scholarship support to continue my education.",
            description: "Financial need verification"
        },
        {
            id: "goodConduct",
            label: "I confirm that I have no record of academic misconduct, disciplinary action, or criminal conviction.",
            description: "Good conduct declaration"
        },
        {
            id: "ageRequirement",
            label: "I confirm that I am between 18 and 35 years of age at the time of application.",
            description: "Age eligibility"
        },
        {
            id: "enrollmentStatus",
            label: "I confirm that I am currently enrolled as a full-time student in an accredited tertiary institution in Nigeria.",
            description: "Enrollment status"
        },
        {
            id: "citizenshipStatus",
            label: "I confirm that I am a Nigerian citizen with valid proof of citizenship.",
            description: "Citizenship verification"
        },
        {
            id: "noOtherScholarship",
            label: "I confirm that I am not currently receiving any other full scholarship or bursary that covers my full tuition and living expenses.",
            description: "No concurrent scholarship"
        },
        {
            id: "agreeToTerms",
            label: "I agree to all terms and conditions of the AlertMFB Scholarship Program and understand that false declarations may lead to disqualification.",
            description: "Terms acceptance"
        }
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
                                <div className="font-bold">Eligibility Verified!</div>
                                <div className="text-sm opacity-90">Your eligibility checks have been submitted successfully.</div>
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
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                            Eligibility Verification
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Eligibility <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Verification</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Confirm your eligibility for the AlertMFB Scholarship by reviewing and agreeing to all requirements below.
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
                                                : step.number < 8
                                                    ? "bg-linear-to-r from-emerald-500 to-green-400 text-white shadow-lg shadow-emerald-200"
                                                    : "bg-gray-100 text-gray-400"
                                            }`}>
                                            {step.number < 8 ? (
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
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Eligibility Criteria Confirmation</h2>
                                        <p className="text-gray-600">Step 8 of 10 - Verify and confirm all eligibility requirements</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="p-8">
                                {/* Important Warning */}
                                <div className="mb-8 bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                                    <div className="flex items-start gap-4">
                                        <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Important Legal Notice</h3>
                                            <p className="text-sm text-gray-600 mb-3">
                                                By checking the boxes below, you are making legal declarations about your eligibility.
                                                False declarations may result in:
                                            </p>
                                            <ul className="space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                                                    <span className="text-sm text-gray-600">Immediate disqualification from the scholarship program</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                                                    <span className="text-sm text-gray-600">Recovery of any funds already disbursed</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                                                    <span className="text-sm text-gray-600">Legal action for fraudulent misrepresentation</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Eligibility Criteria List */}
                                <div className="space-y-6">
                                    {eligibilityCriteria.map((criterion, index) => (
                                        <motion.div
                                            key={criterion.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-300"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="mt-1">
                                                    <input
                                                        type="checkbox"
                                                        id={criterion.id}
                                                        name={criterion.id}
                                                        checked={eligibilityChecks[criterion.id as keyof typeof eligibilityChecks]}
                                                        onChange={handleCheckboxChange}
                                                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <label
                                                            htmlFor={criterion.id}
                                                            className="text-lg font-bold text-gray-900 cursor-pointer flex-1"
                                                        >
                                                            {criterion.label}
                                                        </label>
                                                        {eligibilityChecks[criterion.id as keyof typeof eligibilityChecks] && (
                                                            <div className="p-1 bg-emerald-50 rounded-full ml-2">
                                                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 mb-3">
                                                        {criterion.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Declaration Summary */}
                                <div className="mt-8 bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                        <h3 className="font-bold text-gray-900">Declaration Summary</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        By submitting this form, you certify that all information provided in this application is true,
                                        complete, and accurate to the best of your knowledge. You understand that AlertMFB reserves
                                        the right to verify all information and disqualify any application found to contain false
                                        or misleading information.
                                    </p>
                                </div>

                                {/* Continue Button */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="mt-12"
                                >
                                    <Link
                                        to="/cda"
                                        className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300"
                                    >
                                        <span>Continue to Consent Declaration</span>
                                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                    </Link>
                                </motion.div>

                                {/* Form Navigation */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        to="/institutional-verification"
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                                    >
                                        ← Back to Institutional Verification
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                        Step 8 of 10 • Eligibility Verification
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
                                        <h3 className="text-2xl font-bold">Eligibility Requirements</h3>
                                        <p className="text-blue-100">Key criteria for AlertMFB Scholarship</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Academic Excellence</div>
                                            <div className="text-sm text-blue-100">Minimum CGPA of 3.0/5.0 required</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Financial Need</div>
                                            <div className="text-sm text-blue-100">Demonstrated financial need required</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Good Conduct</div>
                                            <div className="text-sm text-blue-100">No disciplinary records allowed</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-amber-500" />
                                    <h4 className="font-bold text-gray-900">Verification Process</h4>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">All declarations will be verified through official channels</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Academic records verified with your institution</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Financial need assessed through documentation</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Help Card */}
                            <div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-5 h-5 text-emerald-600" />
                                    <h4 className="font-bold text-gray-900">Unsure About Eligibility?</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    If you have questions about any eligibility criteria or need clarification, please contact our support team before proceeding.
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

export default EligibilityVerification;