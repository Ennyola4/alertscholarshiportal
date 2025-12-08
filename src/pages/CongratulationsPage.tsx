import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Award, Mail, Calendar, Download, Share2, Home, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AlertLogo from "../assets/images/AlertLogo.jpg";

const CongratulationsPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);


    useEffect(() => {
        // Prevent direct access - only accessible after submission
        const hasSubmitted = localStorage.getItem('scholarship_submitted');
        if (!hasSubmitted) {
            navigate('/');
        }

        // Mark as visited to prevent back button issues
        localStorage.setItem('scholarship_submitted', 'true');

        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, [navigate]);

    // Generate a fake application reference number
    const applicationRef = `ALERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const submissionDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handleDownloadReceipt = () => {
        // In a real app, this would generate/trigger a PDF download
        alert("Application receipt downloaded!");
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'AlertMFB Scholarship Application',
                    text: 'I just submitted my scholarship application to AlertMFB!',
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText('I just submitted my scholarship application to AlertMFB!');
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-cyan-50 font-sans">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Confetti Animation Container */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-linear-to-r from-emerald-400 to-cyan-400 rounded-full"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: -50,
                                rotate: 0,
                            }}
                            animate={{
                                y: window.innerHeight,
                                rotate: 360,
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 relative z-10"
                >
                    {/* Success Badge */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-linear-to-r from-emerald-500 to-green-500 shadow-2xl shadow-emerald-200"
                    >
                        <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                        Congratulations<span className="text-emerald-500">!</span>
                    </h1>

                    <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
                        Your scholarship application has been successfully submitted
                    </p>

                    {/* Application Reference */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-emerald-100"
                    >
                        <Award className="w-5 h-5 text-emerald-600" />
                        <span className="font-mono font-bold text-emerald-700">
                            Application Reference: {applicationRef}
                        </span>
                    </motion.div>
                </motion.div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8 mb-16">
                    {/* Left Content - Success Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="lg:w-2/3 relative z-10"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-100/50 border border-emerald-100 overflow-hidden">
                            {/* Card Header */}
                            <div className="p-8 border-b border-emerald-100 bg-linear-to-r from-emerald-50 to-green-50">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={AlertLogo}
                                        alt="AlertMFB Logo"
                                        className="w-16 h-16 rounded-xl bg-white/50 p-2 border border-emerald-200"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Application Submitted Successfully</h2>
                                        <p className="text-emerald-600">Thank you for choosing AlertMFB Scholarship</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-8">
                                {/* Timeline */}
                                <div className="space-y-8 mb-10">
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirmation Email Sent</h3>
                                            <p className="text-gray-600">
                                                We've sent a confirmation email with your application details and reference number.
                                                Please check your inbox (and spam folder).
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Calendar className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">Review Timeline</h3>
                                            <p className="text-gray-600 mb-3">
                                                Your application will now go through our review process. Here's what to expect:
                                            </p>
                                            <ul className="space-y-2">
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                    <span className="text-sm text-gray-600">Initial screening: 1-2 weeks</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                    <span className="text-sm text-gray-600">Document verification: 2-3 weeks</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                    <span className="text-sm text-gray-600">Final decision: 4-6 weeks from submission</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                            <Award className="w-6 h-6 text-amber-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">Next Steps</h3>
                                            <p className="text-gray-600">
                                                Shortlisted candidates will be contacted for further verification and interviews.
                                                Keep an eye on your email for updates.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submission Details */}
                                <div className="bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Submission Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Application Reference</p>
                                            <p className="font-bold text-gray-900">{applicationRef}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Submission Date</p>
                                            <p className="font-bold text-gray-900">{submissionDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                                                <CheckCircle className="w-3 h-3" />
                                                Submitted for Review
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Estimated Response</p>
                                            <p className="font-bold text-gray-900">4-6 weeks</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Sidebar - Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="lg:w-1/3 space-y-6 relative z-10"
                    >
                        {/* Download Receipt Card */}
                        <div className="bg-linear-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-2xl shadow-blue-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <Download className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Download Receipt</h3>
                                    <p className="text-blue-100">Save your application confirmation</p>
                                </div>
                            </div>
                            <button
                                onClick={handleDownloadReceipt}
                                className="w-full px-4 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                Download PDF Receipt
                            </button>
                        </div>

                        {/* Share Card */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <Share2 className="w-5 h-5 text-purple-600" />
                                <h4 className="font-bold text-gray-900">Share Your Achievement</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                Share that you've applied for the AlertMFB Scholarship with your network.
                            </p>
                            <button
                                onClick={handleShare}
                                className="w-full px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
                            >
                                Share Application
                            </button>
                        </div>

                        {/* Next Steps Card */}
                        <div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100">
                            <h4 className="font-bold text-gray-900 mb-2">What's Next?</h4>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                                    <span className="text-sm text-gray-600">Check your email regularly for updates</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                                    <span className="text-sm text-gray-600">Prepare your documents for verification</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                                    <span className="text-sm text-gray-600">Be ready for potential interviews</span>
                                </li>
                            </ul>
                            <div className="text-xs text-gray-500">
                                Need help? Contact scholarship@alertmfb.com
                            </div>
                        </div>

                        {/* Return Home Button */}
                        <Link
                            to="/"
                            className="block group"
                        >
                            <div className="bg-linear-to-r from-gray-50 to-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Home className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Return to Home</h4>
                                            <p className="text-sm text-gray-600">Go back to main page</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 transition-transform group-hover:translate-x-2" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center relative z-10"
                >
                    <p className="text-gray-500 mb-2">
                        Thank you for applying to the AlertMFB Scholarship Program
                    </p>
                    <p className="text-sm text-gray-400">
                        We wish you the best in your academic journey! 🎓
                    </p>
                </motion.div>

                {/* Floating Celebration Elements */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className="fixed bottom-8 right-8 z-20"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
                        <div className="relative w-16 h-16 bg-linear-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
                            <Award className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CongratulationsPage;