import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Briefcase, Phone, DollarSign, ChevronRight, Shield, UserCheck, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AlertLogo from "../assets/images/AlertLogo.jpg";

const ParentInfo = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const [formData, setFormData] = useState({
        relationship: "",
        fatherOccupation: "",
        motherOccupation: "",
        guardianName: "",
        guardianPhone: "",
        incomeBracket: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log("Form submitted:", formData);
            setIsSubmitting(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    // Corrected steps array (consistent with PersonalInfo)
    const steps = [
        { number: 1, label: "Personal Info", status: "completed" },
        { number: 2, label: "Parent Info", status: "current" },
        { number: 3, label: "Educational", status: "upcoming" },
        { number: 4, label: "Assessment", status: "upcoming" },
        { number: 5, label: "Documents Upload", status: "upcoming" },
        { number: 6, label: "Referee Contact", status: "upcoming" },
        { number: 7, label: "Institutional Verification", status: "upcoming" },
        { number: 8, label: "Eligibility Checks", status: "upcoming" },
        { number: 9, label: "Consent Declaration", status: "upcoming" },
        { number: 10, label: "Applicant Signature", status: "upcoming" },
    ];

    const incomeBrackets = [
        { value: "Below ₦200,000", label: "Below ₦200,000" },
        { value: "₦200,000 - ₦500,000", label: "₦200,000 - ₦500,000" },
        { value: "₦500,000 - ₦1,000,000", label: "₦500,000 - ₦1,000,000" },
        { value: "₦1,000,000 - ₦3,000,000", label: "₦1,000,000 - ₦3,000,000" },
        { value: "Above ₦3,000,000", label: "Above ₦3,000,000" },
    ];

    const relationships = [
        { value: "Father", label: "Father" },
        { value: "Mother", label: "Mother" },
        { value: "Guardian", label: "Legal Guardian" },
        { value: "Sibling", label: "Sibling" },
        { value: "Other", label: "Other" },
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
                                <div className="font-bold">Information Saved!</div>
                                <div className="text-sm opacity-90">Your parent information has been saved successfully.</div>
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
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                            Parent & Guardian Details
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Parent & <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Guardian</span> Information
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Help us understand your family background to better assess your scholarship eligibility.
                        All information is kept confidential.
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
                                                : step.number < 2
                                                    ? "bg-linear-to-r from-emerald-500 to-green-400 text-white shadow-lg shadow-emerald-200"
                                                    : "bg-gray-100 text-gray-400"
                                            }`}>
                                            {step.number < 2 ? (
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
                                        <h2 className="text-2xl font-bold text-gray-900">Family Background</h2>
                                        <p className="text-gray-600">Step 2 of 10 - Tell us about your parents or legal guardians</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Guardian Name */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                                            <UserCheck className="w-4 h-4" />
                                            Parent/Guardian Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="guardianName"
                                            value={formData.guardianName}
                                            onChange={handleChange}
                                            placeholder="Enter full name as it appears on official documents"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Relationship */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                                            <Users className="w-4 h-4" />
                                            Relationship to Applicant
                                        </label>
                                        <select
                                            name="relationship"
                                            value={formData.relationship}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select Relationship</option>
                                            {relationships.map(rel => (
                                                <option key={rel.value} value={rel.value}>{rel.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Guardian Phone */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                                            <Phone className="w-4 h-4" />
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="guardianPhone"
                                            value={formData.guardianPhone}
                                            onChange={handleChange}
                                            placeholder="+234 801 234 5678"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Father's Occupation */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                                            <Briefcase className="w-4 h-4" />
                                            Father's/Guardian's Occupation
                                        </label>
                                        <input
                                            type="text"
                                            name="fatherOccupation"
                                            value={formData.fatherOccupation}
                                            onChange={handleChange}
                                            placeholder="Enter occupation or profession"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    {/* Mother's Occupation */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                                            <Briefcase className="w-4 h-4" />
                                            Mother's/Guardian's Occupation
                                        </label>
                                        <input
                                            type="text"
                                            name="motherOccupation"
                                            value={formData.motherOccupation}
                                            onChange={handleChange}
                                            placeholder="Enter occupation or profession"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    {/* Income Bracket */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                                            <DollarSign className="w-4 h-4" />
                                            Household Annual Income Bracket
                                        </label>
                                        <select
                                            name="incomeBracket"
                                            value={formData.incomeBracket}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select Annual Income Range</option>
                                            {incomeBrackets.map(income => (
                                                <option key={income.value} value={income.value}>{income.label}</option>
                                            ))}
                                        </select>
                                        <p className="text-sm text-gray-500 mt-2">
                                            This information helps us assess financial need and is kept strictly confidential.
                                        </p>
                                    </div>
                                </div>

                                {/* Continue Button */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="mt-12"
                                >
                                    <Link
                                        to="/educational-info"
                                        className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300"
                                    >
                                        <span>Continue to Educational Information</span>
                                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                    </Link>
                                </motion.div>

                                {/* Form Navigation */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        to="/personal-info"
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                                    >
                                        ← Back to Personal Info
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                        Step 2 of 10 • Parent Information
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
                                        <h3 className="text-2xl font-bold">Why We Need This</h3>
                                        <p className="text-blue-100">Understanding your family background</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Fair Assessment</div>
                                            <div className="text-sm text-blue-100">Helps evaluate financial need fairly</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Confidential</div>
                                            <div className="text-sm text-blue-100">All information is encrypted and secure</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Family Support</div>
                                            <div className="text-sm text-blue-100">Understanding your support system</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-amber-500" />
                                    <h4 className="font-bold text-gray-900">Important Notes</h4>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Provide accurate contact information for verification</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Income information is for need assessment only</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Guardian information is required if parents are unavailable</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Help Card */}
                            <div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100">
                                <h4 className="font-bold text-gray-900 mb-2">Need Clarification?</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    If you have questions about what information to provide, contact our support team.
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

export default ParentInfo;