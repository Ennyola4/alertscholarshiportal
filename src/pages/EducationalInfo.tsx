import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, School, Calendar, Award, ChevronRight, Sparkles, Target, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AlertLogo from "../assets/images/AlertLogo.jpg";

const EducationalInfo = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const [formData, setFormData] = useState({
        institutionType: "",
        institutionName: "",
        course: "",
        admissionYear: "",
        currentLevel: "",
        matricNo: "",
        cgpa: "",
    });

    
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       

        // Simulate API call
        setTimeout(() => {
            console.log("Form submitted:", formData);
            
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    // Consistent steps array
    const steps = [
        { number: 1, label: "Personal Info", status: "completed" },
        { number: 2, label: "Parent Info", status: "completed" },
        { number: 3, label: "Educational", status: "current" },
        { number: 4, label: "Assessment", status: "upcoming" },
        { number: 5, label: "Documents Upload", status: "upcoming" },
        { number: 6, label: "Referee Contact", status: "upcoming" },
        { number: 7, label: "Institutional Verification", status: "upcoming" },
        { number: 8, label: "Eligibility Checks", status: "upcoming" },
        { number: 9, label: "Consent Declaration", status: "upcoming" },
        { number: 10, label: "Applicant Signature", status: "upcoming" },
    ];

    const institutionTypes = [
        { value: "Federal University", label: "Federal University" },
        { value: "State University", label: "State University" },
        { value: "Polytechnic", label: "Polytechnic" },
        { value: "College of Education", label: "College of Education" },
        { value: "Federal Polytechnic", label: "Federal Polytechnic" },
        { value: "State Polytechnic", label: "State Polytechnic" },
        { value: "Monotechnic", label: "Monotechnic" },
        { value: "Other", label: "Other Tertiary Institution" },
    ];

    const currentLevels = [
        { value: "100 Level", label: "100 Level" },
        { value: "200 Level", label: "200 Level" },
        { value: "300 Level", label: "300 Level" },
        { value: "400 Level", label: "400 Level" },
        { value: "500 Level", label: "500 Level" },
        { value: "600 Level", label: "600 Level" },
        { value: "ND I", label: "ND I" },
        { value: "ND II", label: "ND II" },
        { value: "HND I", label: "HND I" },
        { value: "HND II", label: "HND II" },
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
                                <div className="text-sm opacity-90">Your educational information has been saved successfully.</div>
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
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                            Educational Details
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Educational <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Information</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Tell us about your academic journey. This information helps us assess your eligibility and academic standing.
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
                                                : step.number < 3
                                                    ? "bg-linear-to-r from-emerald-500 to-green-400 text-white shadow-lg shadow-emerald-200"
                                                    : "bg-gray-100 text-gray-400"
                                            }`}>
                                            {step.number < 3 ? (
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
                                        <BookOpen className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Academic Details</h2>
                                        <p className="text-gray-600">Step 3 of 10 - Provide your current educational information</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Institution Type */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                                            <School className="w-4 h-4" />
                                            Institution Type
                                        </label>
                                        <select
                                            name="institutionType"
                                            value={formData.institutionType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select Institution Type</option>
                                            {institutionTypes.map(type => (
                                                <option key={type.value} value={type.value}>{type.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Institution Name */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                                            <School className="w-4 h-4" />
                                            Institution Name
                                        </label>
                                        <input
                                            type="text"
                                            name="institutionName"
                                            value={formData.institutionName}
                                            onChange={handleChange}
                                            placeholder="Enter institution name"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Course of Study */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                                            <BookOpen className="w-4 h-4" />
                                            Course of Study
                                        </label>
                                        <input
                                            type="text"
                                            name="course"
                                            value={formData.course}
                                            onChange={handleChange}
                                            placeholder="Enter course of study"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Admission Year */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                                            <Calendar className="w-4 h-4" />
                                            Admission Year
                                        </label>
                                        <input
                                            type="number"
                                            name="admissionYear"
                                            value={formData.admissionYear}
                                            onChange={handleChange}
                                            placeholder="e.g. 2021"
                                            min="1990"
                                            max={new Date().getFullYear()}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Current Level */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                                            <Award className="w-4 h-4" />
                                            Current Level
                                        </label>
                                        <select
                                            name="currentLevel"
                                            value={formData.currentLevel}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select Level</option>
                                            {currentLevels.map(level => (
                                                <option key={level.value} value={level.value}>{level.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Matric Number */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                                            <GraduationCap className="w-4 h-4" />
                                            Matriculation Number
                                        </label>
                                        <input
                                            type="text"
                                            name="matricNo"
                                            value={formData.matricNo}
                                            onChange={handleChange}
                                            placeholder="Enter matriculation number"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    {/* CGPA */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                                            <Award className="w-4 h-4" />
                                            CGPA (as at last academic session)
                                        </label>
                                        <input
                                            type="number"
                                            name="cgpa"
                                            value={formData.cgpa}
                                            onChange={handleChange}
                                            placeholder="e.g. 3.45"
                                            step="0.01"
                                            min="0"
                                            max="5"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Enter your Cumulative Grade Point Average on a 5.0 scale
                                        </p>
                                    </div>
                                </div>

                                {/* Continue Button */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="mt-12"
                                >
                                    <Link
                                        to="/assessment"
                                        className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300"
                                    >
                                        <span>Continue to Assessment</span>
                                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                    </Link>
                                </motion.div>

                                {/* Form Navigation */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        to="/parent-info"
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                                    >
                                        ← Back to Parent Information
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                        Step 3 of 10 • Educational Information
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
                                        <h3 className="text-2xl font-bold">Academic Excellence</h3>
                                        <p className="text-blue-100">We value your academic journey</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Academic Criteria</div>
                                            <div className="text-sm text-blue-100">Minimum CGPA of 3.0 required</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Course Relevance</div>
                                            <div className="text-sm text-blue-100">All accredited courses considered</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Verification</div>
                                            <div className="text-sm text-blue-100">Information will be verified with institution</div>
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
                                        <span className="text-sm text-gray-600">Ensure matric number matches institutional records</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">CGPA must be verifiable from last academic session</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Provide full official name of institution</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Help Card */}
                            <div className="bg-linear from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100">
                                <h4 className="font-bold text-gray-900 mb-2">Need Assistance?</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Having trouble with your academic information? Our support team is here to help.
                                </p>
                                <button className="w-full px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors">
                                    Get Help Now
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default EducationalInfo;