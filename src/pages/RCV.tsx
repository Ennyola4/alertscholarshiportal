import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    UserCheck,
    Phone,
    Mail,
    Briefcase,
    Users,
    ChevronRight,
    Sparkles,
    AlertCircle,
    Shield,
    FileText
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertLogo from "../assets/images/AlertLogo.png";
import { useApplication } from "../context/ApplicationContext";

interface FormData {
    referee1Name: string;
    referee1Phone: string;
    referee1Email: string;
    referee1Title: string;
    referee1Relationship: string;
    referee2Name: string;
    referee2Phone: string;
    referee2Email: string;
    referee2Title: string;
    referee2Relationship: string;
}

interface Step {
    number: number;
    label: string;
    status: "completed" | "current" | "upcoming";
}

interface RefereeInfo {
    label: string;
    name: keyof FormData;
    icon: React.ReactNode;
    type?: 'text' | 'email' | 'tel' | 'select';
    options?: string[];
}

const RCV = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { applicationData, updateRefereeContact } = useApplication();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const [formData, setFormData] = useState<FormData>(applicationData.refereeContact);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

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

        if (!formData.referee1Name.trim()) errors.referee1Name = "Referee name is required";
        if (!formData.referee1Phone.trim()) errors.referee1Phone = "Phone number is required";
        if (!formData.referee1Email.trim()) errors.referee1Email = "Email address is required";
        if (!formData.referee1Title.trim()) errors.referee1Title = "Position/title is required";
        if (!formData.referee1Relationship.trim()) errors.referee1Relationship = "Relationship is required";

        if (!formData.referee2Name.trim()) errors.referee2Name = "Referee name is required";
        if (!formData.referee2Phone.trim()) errors.referee2Phone = "Phone number is required";
        if (!formData.referee2Email.trim()) errors.referee2Email = "Email address is required";
        if (!formData.referee2Title.trim()) errors.referee2Title = "Position/title is required";
        if (!formData.referee2Relationship.trim()) errors.referee2Relationship = "Relationship is required";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.referee1Email && !emailRegex.test(formData.referee1Email)) {
            errors.referee1Email = "Invalid email format";
        }
        if (formData.referee2Email && !emailRegex.test(formData.referee2Email)) {
            errors.referee2Email = "Invalid email format";
        }

        const phoneRegex = /^\+?234[789]\d{9}$|^0[789]\d{9}$/;
        if (formData.referee1Phone && !phoneRegex.test(formData.referee1Phone.replace(/\s/g, ''))) {
            errors.referee1Phone = "Invalid phone number format. Use format: +2348012345678 or 08012345678";
        }
        if (formData.referee2Phone && !phoneRegex.test(formData.referee2Phone.replace(/\s/g, ''))) {
            errors.referee2Phone = "Invalid phone number format. Use format: +2348012345678 or 08012345678";
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

        updateRefereeContact(formData);

        setTimeout(() => {
            console.log("Referee data submitted:", formData);
            setIsSubmitting(false);
            setShowSuccess(true);

            setTimeout(() => setShowSuccess(false), 3000);

            navigate('/institutional-verification');
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

    const refereeFields: RefereeInfo[] = [
        {
            label: "Full Name",
            name: "referee1Name",
            icon: <UserCheck className="w-4 h-4 text-red-500" />,
            type: 'text'
        },
        {
            label: "Phone Number",
            name: "referee1Phone",
            icon: <Phone className="w-4 h-4 text-red-500" />,
            type: 'tel'
        },
        {
            label: "Email Address",
            name: "referee1Email",
            icon: <Mail className="w-4 h-4 text-red-500" />,
            type: 'email'
        },
        {
            label: "Position/Title",
            name: "referee1Title",
            icon: <Briefcase className="w-4 h-4 text-red-500" />,
            type: 'select',
            options: positions
        },
        {
            label: "Relationship to Applicant",
            name: "referee1Relationship",
            icon: <Users className="w-4 h-4 text-red-500" />,
            type: 'select',
            options: relationships
        },
    ];

    const getCompletionPercentage = () => {
        const totalFields = Object.keys(formData).length;
        const filledFields = Object.values(formData).filter(value => value.trim() !== '').length;
        return Math.round((filledFields / totalFields) * 100);
    };

    const renderField = (field: RefereeInfo, isReferee2: boolean = false) => {
        const fieldName = isReferee2 ? field.name.replace('1', '2') : field.name;
        const value = formData[fieldName as keyof FormData];
        const error = validationErrors[fieldName];

        return (
            <div className="space-y-2" key={fieldName}>
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                    {field.icon}
                    {field.label}
                </label>
                {field.type === 'select' ? (
                    <>
                        <select
                            name={fieldName}
                            value={value}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-50 border ${error ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent`}
                            required
                        >
                            <option value="">Select {field.label}</option>
                            {field.options?.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </>
                ) : (
                    <>
                        <input
                            type={field.type || 'text'}
                            name={fieldName}
                            value={value}
                            onChange={handleChange}
                            placeholder={
                                field.type === 'email' ? "referee@example.com" :
                                    field.type === 'tel' ? "+2348012345678 or 08012345678" :
                                        `Enter ${field.label.toLowerCase()}`
                            }
                            className={`w-full px-4 py-3 bg-gray-50 border ${error ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent transition-all`}
                            required
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </>
                )}
            </div>
        );
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
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-linear-to-r from-[#B8860B]/10 to-[#B8860B]/5 rounded-full border border-[#B8860B]/20">
                        <UserCheck className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-semibold text-[#B8860B] uppercase tracking-wider">
                            Referee Contact Verification
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Referee <span className="bg-linear-to-r from-[#B8860B] to-[#B8860B]/70 bg-clip-text text-transparent">Contact Details</span>
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
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step.status === "current"
                                                ? "bg-linear-to-r from-[#B8860B] to-[#B8860B]/80 text-white shadow-lg shadow-[#B8860B]/20"
                                                : step.number < 6
                                                    ? "bg-linear-to-r from-[#B8860B] to-[#B8860B]/80 text-white shadow-lg shadow-[#B8860B]/20"
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
                            <div className="p-8 border-b border-gray-100 bg-linear-to-r from-[#B8860B]/5 to-[#B8860B]/10">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-linear-to-r from-[#B8860B] to-[#B8860B]/80 rounded-xl">
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
                                {/* Progress Overview */}
                                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-[#B8860B]/10 rounded-xl p-4 border border-[#B8860B]/20">
                                        <div className="text-sm text-[#B8860B] font-medium">Form Completion</div>
                                        <div className="text-2xl font-bold text-gray-900">{getCompletionPercentage()}%</div>
                                    </div>
                                    <div className="bg-[#B8860B]/10 rounded-xl p-4 border border-[#B8860B]/20">
                                        <div className="text-sm text-[#B8860B] font-medium">Required Fields</div>
                                        <div className="text-2xl font-bold text-gray-900">10</div>
                                    </div>
                                    <div className="bg-[#B8860B]/10 rounded-xl p-4 border border-[#B8860B]/20">
                                        <div className="text-sm text-[#B8860B] font-medium">Filled Fields</div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            {Object.values(formData).filter(value => value.trim() !== '').length} of 10
                                        </div>
                                    </div>
                                </div>

                                {/* Important Note */}
                                <div className="mb-8 bg-linear-to-r from-[#B8860B]/10 to-[#B8860B]/5 rounded-2xl p-4 border border-[#B8860B]/20">
                                    <div className="flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 text-[#B8860B]" />
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
                                        <div className="p-2 bg-linear-to-r from-[#B8860B] to-[#B8860B]/80 rounded-lg">
                                            <UserCheck className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Referee 1</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {refereeFields.map((field, index) => (
                                            <div key={field.name} className={index >= 3 ? 'md:col-span-2' : ''}>
                                                {renderField(field)}
                                            </div>
                                        ))}
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
                                        <div className="p-2 bg-linear-to-r from-[#B8860B] to-[#B8860B]/80 rounded-lg">
                                            <UserCheck className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Referee 2</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {refereeFields.map((field, index) => (
                                            <div key={`${field.name}-2`} className={index >= 3 ? 'md:col-span-2' : ''}>
                                                {renderField(field, true)}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Progress Bar */}
                                <div className="mt-8">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            Form Completion: {getCompletionPercentage()}%
                                        </span>
                                        <span className="text-sm font-medium text-gray-700">
                                            {Object.values(formData).filter(value => value.trim() !== '').length} of 10 fields
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-linear-to-r from-[#B8860B] to-[#B8860B]/80 h-2 rounded-full transition-all duration-500"
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
                                        className="group w-full cursor-pointer flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-[#B8860B] to-[#B8860B]/80 text-white font-bold rounded-xl shadow-lg shadow-[#B8860B]/20 hover:shadow-xl hover:shadow-[#B8860B]/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
                                                <span>Save & Continue to Institutional Verification</span>
                                                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                            </>
                                        )}
                                    </button>
                                </motion.div>

                                {/* Form Navigation */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                    <Link
                                        to="/documents-upload"
                                        className="text-red-500 hover:text-[#B8860B]/80 font-medium text-sm flex items-center gap-1"
                                    >
                                        ← Back to Documents Upload
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                        Step 6 of 10 • {getCompletionPercentage()}% Complete
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
                                        className="w-16 h-16 rounded-xl bg-white/20 p-2"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-bold">Referee Guidelines</h3>
                                        <p className="text-white">Selecting appropriate referees</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <UserCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Professional Referees</div>
                                            <div className="text-sm text-white">Academic supervisors or employers preferred</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Informed Consent</div>
                                            <div className="text-sm text-white">Inform referees they will be contacted</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Accurate Information</div>
                                            <div className="text-sm text-white">Ensure all contact details are correct</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-red-500" />
                                    <h4 className="font-bold text-gray-900">Referee Selection Tips</h4>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Choose referees who know you well academically/professionally</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Avoid family members or close relatives</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                        <span className="text-sm text-gray-600">Referees should have known you for at least 1 year</span>
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
                                    If you have questions about selecting referees or providing their information, contact our support team.
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

export default RCV;