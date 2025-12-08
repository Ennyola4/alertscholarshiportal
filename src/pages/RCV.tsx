import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, Phone, Mail, Briefcase, Users, ChevronRight, Sparkles, AlertCircle, Shield, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AlertLogo from "../assets/images/AlertLogo.jpg";

const RCV = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const [formData, setFormData] = useState({
        referee1Name: "",
        referee1Phone: "",
        referee1Email: "",
        referee1Title: "",
        referee1Relationship: "",
        referee2Name: "",
        referee2Phone: "",
        referee2Email: "",
        referee2Title: "",
        referee2Relationship: "",
    });

    
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       

        // Validate required fields
        const requiredFields = [
            'referee1Name', 'referee1Phone', 'referee1Email', 'referee1Title', 'referee1Relationship',
            'referee2Name', 'referee2Phone', 'referee2Email', 'referee2Title', 'referee2Relationship'
        ];
        
        const allFieldsFilled = requiredFields.every(field => 
            formData[field as keyof typeof formData].trim() !== ''
        );
        
        if (!allFieldsFilled) {
            alert("Please fill in all referee information before continuing.");
            
            return;
        }

        // Simulate API call
        setTimeout(() => {
            console.log("Referee data submitted:", formData);
           
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
        { number: 6, label: "Referee Contact", status: "current" },
        { number: 7, label: "Institutional Verification", status: "upcoming" },
        { number: 8, label: "Eligibility Checks", status: "upcoming" },
        { number: 9, label: "Consent Declaration", status: "upcoming" },
        { number: 10, label: "Applicant Signature", status: "upcoming" },
    ];

    const relationships = [
        "Academic Supervisor",
        "Lecturer",
        "Department Head",
        "Employer",
        "Community Leader",
        "Religious Leader",
        "Family Friend",
        "Mentor",
        "Former Teacher",
        "Other"
    ];

    const positions = [
        "Professor",
        "Associate Professor",
        "Senior Lecturer",
        "Lecturer I",
        "Lecturer II",
        "Assistant Lecturer",
        "Head of Department",
        "Dean of Faculty",
        "Principal",
        "Director",
        "Manager",
        "Supervisor",
        "Pastor/Imam",
        "Community Leader",
        "Other"
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
                                <div className="font-bold">Referee Information Saved!</div>
                                <div className="text-sm opacity-90">Your referee details have been saved successfully.</div>
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
                        <UserCheck className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                            Referee Contact Verification
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Referee <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Contact Details</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Provide contact information for two referees who can verify your academic performance and character.
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
                                                : step.number < 6
                                                ? "bg-linear-to-r from-emerald-500 to-green-400 text-white shadow-lg shadow-emerald-200"
                                                : "bg-gray-100 text-gray-400"
                                        }`}>
                                            {step.number < 6 ? (
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
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Referee Information</h2>
                                        <p className="text-gray-600">Step 6 of 10 - Provide contact details for two referees</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="p-8">
                                {/* Important Note */}
                                <div className="mb-8 bg-linear-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-200">
                                    <div className="flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 text-purple-600" />
                                        <div>
                                            <h3 className="font-bold text-gray-900">Important Notice</h3>
                                            <p className="text-sm text-gray-600">
                                                Referees will be contacted for verification. Please inform them in advance and ensure all contact details are accurate.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Referee 1 Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-10"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-linear-to-r from-blue-500 to-cyan-400 rounded-lg">
                                            <UserCheck className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Referee 1</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-gray-700 font-medium">
                                                <UserCheck className="w-4 h-4" />
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="referee1Name"
                                                value={formData.referee1Name}
                                                onChange={handleChange}
                                                placeholder="Enter referee's full name"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-gray-700 font-medium">
                                                <Phone className="w-4 h-4" />
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="referee1Phone"
                                                value={formData.referee1Phone}
                                                onChange={handleChange}
                                                placeholder="+234 801 234 5678"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-gray-700 font-medium">
                                                <Mail className="w-4 h-4" />
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="referee1Email"
                                                value={formData.referee1Email}
                                                onChange={handleChange}
                                                placeholder="referee@example.com"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-gray-700 font-medium">
                                                <Briefcase className="w-4 h-4" />
                                                Position/Title
                                            </label>
                                            <select
                                                name="referee1Title"
                                                value={formData.referee1Title}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            >
                                                <option value="">Select Position</option>
                                                {positions.map(position => (
                                                    <option key={position} value={position}>{position}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <label className="flex items-center gap-2 text-gray-700 font-medium">
                                                <Users className="w-4 h-4" />
                                                Relationship to Applicant
                                            </label>
                                            <select
                                                name="referee1Relationship"
                                                value={formData.referee1Relationship}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            >
                                                <option value="">Select Relationship</option>
                                                {relationships.map(relationship => (
                                                    <option key={relationship} value={relationship}>{relationship}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Referee 2 Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mb-8"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-linear-to-r from-blue-500 to-cyan-400 rounded-lg">
                                            <UserCheck className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Referee 2</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-gray-700 font-medium">
                                                <UserCheck className="w-4 h-4" />
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="referee2Name"
                                                value={formData.referee2Name}
                                                onChange={handleChange}
                                                placeholder="Enter referee's full name"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-gray-700 font-medium">
                                                <Phone className="w-4 h-4" />
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="referee2Phone"
                                                value={formData.referee2Phone}
                                                onChange={handleChange}
                                                placeholder="+234 801 234 5678"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-gray-700 font-medium">
                                                <Mail className="w-4 h-4" />
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="referee2Email"
                                                value={formData.referee2Email}
                                                onChange={handleChange}
                                                placeholder="referee@example.com"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-gray-700 font-medium">
                                                <Briefcase className="w-4 h-4" />
                                                Position/Title
                                            </label>
                                            <select
                                                name="referee2Title"
                                                value={formData.referee2Title}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            >
                                                <option value="">Select Position</option>
                                                {positions.map(position => (
                                                    <option key={position} value={position}>{position}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <label className="flex items-center gap-2 text-gray-700 font-medium">
                                                <Users className="w-4 h-4" />
                                                Relationship to Applicant
                                            </label>
                                            <select
                                                name="referee2Relationship"
                                                value={formData.referee2Relationship}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            >
                                                <option value="">Select Relationship</option>
                                                {relationships.map(relationship => (
                                                    <option key={relationship} value={relationship}>{relationship}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Continue Button */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="mt-12"
                                >
                                    <Link
                                        to="/institutional-verification"
                                        className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300"
                                    >
                                        <span>Continue to Institutional Verification</span>
                                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                    </Link>
                                </motion.div>

                                {/* Form Navigation */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        to="/documents-upload"
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                                    >
                                        ← Back to Documents Upload
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                        Step 6 of 10 • Referee Contact Verification
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
                                        <h3 className="text-2xl font-bold">Referee Guidelines</h3>
                                        <p className="text-blue-100">Selecting appropriate referees</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <UserCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Professional Referees</div>
                                            <div className="text-sm text-blue-100">Academic supervisors or employers preferred</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Informed Consent</div>
                                            <div className="text-sm text-blue-100">Inform referees they will be contacted</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Accurate Information</div>
                                            <div className="text-sm text-blue-100">Ensure all contact details are correct</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-amber-500" />
                                    <h4 className="font-bold text-gray-900">Referee Selection Tips</h4>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Choose referees who know you well academically/professionally</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Avoid family members or close relatives</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Referees should have known you for at least 1 year</span>
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
                                    If you have questions about selecting referees or providing their information, contact our support team.
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

export default RCV;