import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    UserCheck,
    Mail,
    Phone,
    ChevronRight,
    Sparkles,
    AlertCircle,
    Shield,
    FileText,
    GraduationCap
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertLogo from "../assets/images/AlertLogo.png";
import { useApplication } from "../context/ApplicationContext";

interface FormData {
    institutionOfficer: string;
    institutionEmail: string;
    institutionPhone: string;
}

interface Step {
    number: number;
    label: string;
    status: "completed" | "current" | "upcoming";
}

interface FieldInfo {
    label: string;
    name: keyof FormData;
    icon: React.ReactNode;
    type: 'text' | 'email' | 'tel';
    placeholder: string;
    description: string;
}

const IVC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { applicationData, updateInstitutionalVerification } = useApplication();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const [formData, setFormData] = useState<FormData>(applicationData.institutionalVerification);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        // Validate all fields are filled
        if (!formData.institutionOfficer.trim()) errors.institutionOfficer = "Officer name is required";
        if (!formData.institutionEmail.trim()) errors.institutionEmail = "Email address is required";
        if (!formData.institutionPhone.trim()) errors.institutionPhone = "Phone number is required";

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.institutionEmail && !emailRegex.test(formData.institutionEmail)) {
            errors.institutionEmail = "Invalid email format. Use format: officer@university.edu.ng";
        }

        // Validate institutional email domain
        const institutionalDomains = ['.edu.ng', '.edu.gh', '.edu', 'ac.uk', '.edu.au'];
        if (formData.institutionEmail && !institutionalDomains.some(domain => formData.institutionEmail.toLowerCase().includes(domain))) {
            errors.institutionEmail = "Please use an official institutional email address";
        }

        // Phone validation (basic Nigerian format)
        const phoneRegex = /^\+?234[789]\d{9}$|^0[789]\d{9}$/;
        if (formData.institutionPhone && !phoneRegex.test(formData.institutionPhone.replace(/\s/g, ''))) {
            errors.institutionPhone = "Invalid phone number format. Use format: +2348012345678 or 08012345678";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            alert("Please fix the validation errors before continuing.");
            return;
        }

        // Update context
        updateInstitutionalVerification(formData);

        // Simulate API call
        setTimeout(() => {
            console.log("Institutional verification data submitted:", formData);
            setIsSubmitting(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);

            // Navigate to next page
            navigate('/eligibility-verification');
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
        { number: 7, label: "Institutional Verification", status: "current" },
        { number: 8, label: "Eligibility Checks", status: "upcoming" },
        { number: 9, label: "Consent Declaration", status: "upcoming" },
        { number: 10, label: "Applicant Signature", status: "upcoming" },
    ];

    const fields: FieldInfo[] = [
        {
            label: "Name of Department Officer / Course Adviser",
            name: "institutionOfficer",
            icon: <UserCheck className="w-4 h-4" />,
            type: 'text',
            placeholder: "Enter full name of institutional contact",
            description: "e.g., Dr. John Doe - Head of Department, Computer Science"
        },
        {
            label: "Institutional Email Address",
            name: "institutionEmail",
            icon: <Mail className="w-4 h-4" />,
            type: 'email',
            placeholder: "officer@university.edu.ng",
            description: "Must be an official institutional email address"
        },
        {
            label: "Phone Number",
            name: "institutionPhone",
            icon: <Phone className="w-4 h-4" />,
            type: 'tel',
            placeholder: "+234 801 234 5678",
            description: "Official department or office phone number"
        }
    ];

    const getCompletionPercentage = () => {
        const totalFields = Object.keys(formData).length;
        const filledFields = Object.values(formData).filter(value => value.trim() !== '').length;
        return Math.round((filledFields / totalFields) * 100);
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
                                <div className="font-bold">Verification Information Saved!</div>
                                <div className="text-sm opacity-90">Your institutional verification details have been saved.</div>
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
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                            Institutional Verification
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Institutional <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Verification</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Provide contact information for institutional verification of your academic records and enrollment status.
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
                                                : step.number < 7
                                                    ? "bg-linear-to-r from-emerald-500 to-green-400 text-white shadow-lg shadow-emerald-200"
                                                    : "bg-gray-100 text-gray-400"
                                            }`}>
                                            {step.number < 7 ? (
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
                                        <Building2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Institutional Verification Contact</h2>
                                        <p className="text-gray-600">Step 7 of 10 - Provide institutional contact for verification</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="p-8">
                                {/* Progress Overview */}
                                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                        <div className="text-sm text-blue-600 font-medium">Form Completion</div>
                                        <div className="text-2xl font-bold text-gray-900">{getCompletionPercentage()}%</div>
                                    </div>
                                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                                        <div className="text-sm text-amber-600 font-medium">Required Fields</div>
                                        <div className="text-2xl font-bold text-gray-900">3</div>
                                    </div>
                                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                        <div className="text-sm text-emerald-600 font-medium">Filled Fields</div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            {Object.values(formData).filter(value => value.trim() !== '').length} of 3
                                        </div>
                                    </div>
                                </div>

                                {/* Important Note */}
                                <div className="mb-8 bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
                                    <div className="flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <h3 className="font-bold text-gray-900">Important Notice</h3>
                                            <p className="text-sm text-gray-600">
                                                This information will be used to verify your academic records and enrollment status.
                                                Please provide official institutional contacts only.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {fields.map((field, index) => (
                                        <div key={field.name} className={index === 0 ? 'md:col-span-2' : ''}>
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-gray-700 font-medium">
                                                    {field.icon}
                                                    {field.label}
                                                </label>
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    placeholder={field.placeholder}
                                                    className={`w-full px-4 py-3 bg-gray-50 border ${validationErrors[field.name] ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                                    required
                                                />
                                                {validationErrors[field.name] && (
                                                    <p className="text-red-500 text-sm mt-1">{validationErrors[field.name]}</p>
                                                )}
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {field.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Additional Information */}
                                <div className="mt-8 bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <GraduationCap className="w-5 h-5 text-blue-600" />
                                        <h3 className="font-bold text-gray-900">Verification Process</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <span className="text-sm text-gray-600">Our team will contact the provided institutional officer to verify your academic records</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <span className="text-sm text-gray-600">Verification includes confirmation of enrollment, CGPA, and academic standing</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <span className="text-sm text-gray-600">All communication is conducted professionally and confidentially</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-8">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            Form Completion: {getCompletionPercentage()}%
                                        </span>
                                        <span className="text-sm font-medium text-gray-700">
                                            {Object.values(formData).filter(value => value.trim() !== '').length} of 3 fields
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-linear-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${getCompletionPercentage()}%` }}
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
                                        disabled={isSubmitting || getCompletionPercentage() < 100}
                                        onClick={handleSaveAndContinue}
                                        className="group w-full cursor-pointer flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Save & Continue to Eligibility Verification</span>
                                                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                            </>
                                        )}
                                    </button>
                                </motion.div>

                                {/* Form Navigation */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        to="/referee-contact"
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                                    >
                                        ← Back to Referee Contact Verification
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                        Step 7 of 10 • {getCompletionPercentage()}% Complete
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
                                        <h3 className="text-2xl font-bold">Verification Guidelines</h3>
                                        <p className="text-blue-100">Ensuring accurate institutional verification</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Official Contacts</div>
                                            <div className="text-sm text-blue-100">Provide only official institutional contacts</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Confidential Process</div>
                                            <div className="text-sm text-blue-100">All verification is conducted confidentially</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Academic Verification</div>
                                            <div className="text-sm text-blue-100">We verify enrollment and academic performance</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-amber-500" />
                                    <h4 className="font-bold text-gray-900">Recommended Contacts</h4>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Head of Department or Course Adviser</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Academic Affairs Officer or Registrar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Departmental Examination Officer</span>
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
                                    If you're unsure about whom to list as your institutional contact, our support team can guide you.
                                </p>
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
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

export default IVC;