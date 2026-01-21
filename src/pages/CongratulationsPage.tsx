import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Award, 
  Download, 
  Share2, 
  Home, 
  ChevronRight,
  FileText,
  Receipt,
  User,
  School,
  Clock,
  GraduationCap,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApplication } from "../context/ApplicationContext";

const CongratulationsPage = () => {
    const navigate = useNavigate();
    const { applicationData, clearApplication } = useApplication();
    // const receiptRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Prevent direct access - only accessible after submission
        const hasSubmitted = localStorage.getItem('scholarship_submitted');
        if (!hasSubmitted) {
            navigate('/');
        }
        window.scrollTo(0, 0);
    }, [navigate]);

    // Generate application reference number
    const applicationRef = `ALERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const submissionDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const submissionTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Format date of birth
    const formatDateOfBirth = (dateString: string) => {
        if (!dateString) return "Not provided";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format academic level
    const formatAcademicLevel = (level: string) => {
        const levels: Record<string, string> = {
            '100 Level': '100 Level (First Year)',
            '200 Level': '200 Level (Second Year)',
            '300 Level': '300 Level (Third Year)',
            '400 Level': '400 Level (Fourth Year)',
            '500 Level': '500 Level (Fifth Year)',
            'Postgraduate': 'Postgraduate'
        };
        return levels[level] || level;
    };

    // Calculate age from date of birth
    const calculateAge = (dateString: string) => {
        if (!dateString) return null;
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // Format income bracket
    const formatIncomeBracket = (bracket: string) => {
        if (!bracket) return "Not specified";
        return bracket;
    };

    // Get document count
    const getDocumentCount = () => {
        if (!applicationData?.documents) return 0;
        const docs = Object.values(applicationData.documents);
        return docs.filter(doc => doc !== null).length;
    };

    const handleDownloadReceipt = () => {
        // Create receipt content as HTML with real data
        const receiptHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>AlertGroup Scholarship Receipt - ${applicationData?.personalInfo?.fullName || 'Applicant'}</title>
                <style>
                    body { 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                        margin: 40px; 
                        color: #333;
                        line-height: 1.6;
                    }
                    .receipt-container {
                        max-width: 700px;
                        margin: 0 auto;
                        border: 2px solid #B8860B;
                        border-radius: 12px;
                        padding: 40px;
                        background: white;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        border-bottom: 2px solid #B8860B;
                        padding-bottom: 25px;
                        margin-bottom: 30px;
                    }
                    .logo {
                        font-size: 28px;
                        font-weight: bold;
                        color: #B8860B;
                        margin-bottom: 10px;
                    }
                    .title {
                        font-size: 24px;
                        font-weight: bold;
                        margin: 15px 0;
                        color: #1f2937;
                    }
                    .reference {
                        background: linear-gradient(135deg, #FDF6E3 0%, #F5E6C8 100%);
                        padding: 20px;
                        border-radius: 10px;
                        margin: 25px 0;
                        border-left: 5px solid #B8860B;
                    }
                    .info-section {
                        margin: 25px 0;
                        padding: 20px;
                        background: #f9fafb;
                        border-radius: 10px;
                        border: 1px solid #e5e7eb;
                    }
                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 10px 0;
                        border-bottom: 1px solid #e5e7eb;
                    }
                    .info-row:last-child {
                        border-bottom: none;
                    }
                    .status-badge {
                        background: linear-gradient(135deg, #FDF6E3 0%, #F5E6C8 100%);
                        color: #B8860B;
                        padding: 8px 16px;
                        border-radius: 25px;
                        font-size: 14px;
                        font-weight: bold;
                        display: inline-block;
                    }
                    .section-title {
                        font-size: 18px;
                        font-weight: bold;
                        color: #374151;
                        margin-bottom: 15px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    .footer {
                        margin-top: 40px;
                        padding-top: 25px;
                        border-top: 2px solid #e5e7eb;
                        text-align: center;
                        font-size: 13px;
                        color: #6b7280;
                    }
                    .highlight {
                        color: #B8860B;
                        font-weight: bold;
                    }
                    .note {
                        background: #FDF6E3;
                        padding: 15px;
                        border-radius: 8px;
                        margin: 20px 0;
                        border-left: 4px solid #B8860B;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="receipt-container">
                    <div class="header">
                        <div class="logo">🎓 AlertGroup Scholarship Program</div>
                        <div class="title">APPLICATION CONFIRMATION RECEIPT</div>
                        <div style="color: #6b7280; margin-top: 5px;">Official Confirmation of Submission</div>
                    </div>
                    
                    <div class="reference">
                        <div style="font-size: 20px; font-weight: bold; color: #B8860B; margin-bottom: 5px;">
                            Reference Number: ${applicationRef}
                        </div>
                        <div style="font-size: 14px; color: #4b5563;">
                            Submitted on: <span class="highlight">${submissionDate}</span> at <span class="highlight">${submissionTime}</span>
                        </div>
                    </div>
                    
                    <!-- Applicant Information -->
                    <div class="info-section">
                        <div class="section-title">👤 Applicant Information</div>
                        ${applicationData?.personalInfo ? `
                            <div class="info-row">
                                <span>Full Name:</span>
                                <span><strong class="highlight">${applicationData.personalInfo.fullName}</strong></span>
                            </div>
                            <div class="info-row">
                                <span>Date of Birth:</span>
                                <span>${formatDateOfBirth(applicationData.personalInfo.dob)} (Age: ${calculateAge(applicationData.personalInfo.dob) || 'N/A'})</span>
                            </div>
                            <div class="info-row">
                                <span>Gender:</span>
                                <span>${applicationData.personalInfo.gender}</span>
                            </div>
                            <div class="info-row">
                                <span>Email:</span>
                                <span>${applicationData.personalInfo.email}</span>
                            </div>
                            <div class="info-row">
                                <span>Phone:</span>
                                <span>${applicationData.personalInfo.phone}</span>
                            </div>
                            <div class="info-row">
                                <span>Address:</span>
                                <span>${applicationData.personalInfo.address || 'Not provided'}</span>
                            </div>
                            <div class="info-row">
                                <span>State/LGA:</span>
                                <span>${applicationData.personalInfo.state || 'N/A'} / ${applicationData.personalInfo.lga || 'N/A'}</span>
                            </div>
                        ` : '<p>No personal information available</p>'}
                    </div>
                    
                    <!-- Educational Information -->
                    <div class="info-section">
                        <div class="section-title">🎓 Educational Information</div>
                        ${applicationData?.educationalInfo ? `
                            <div class="info-row">
                                <span>Institution Type:</span>
                                <span>${applicationData.educationalInfo.institutionType}</span>
                            </div>
                            <div class="info-row">
                                <span>Institution Name:</span>
                                <span><strong>${applicationData.educationalInfo.institutionName}</strong></span>
                            </div>
                            <div class="info-row">
                                <span>Course/Program:</span>
                                <span>${applicationData.educationalInfo.course}</span>
                            </div>
                            <div class="info-row">
                                <span>Matriculation No:</span>
                                <span>${applicationData.educationalInfo.matricNo || 'Not provided'}</span>
                            </div>
                            <div class="info-row">
                                <span>Current Level:</span>
                                <span>${formatAcademicLevel(applicationData.educationalInfo.currentLevel)}</span>
                            </div>
                            <div class="info-row">
                                <span>Admission Year:</span>
                                <span>${applicationData.educationalInfo.admissionYear}</span>
                            </div>
                            <div class="info-row">
                                <span>Current CGPA:</span>
                                <span><strong>${applicationData.educationalInfo.cgpa}</strong></span>
                            </div>
                        ` : '<p>No educational information available</p>'}
                    </div>
                    
                    <!-- Parent/Guardian Information -->
                    <div class="info-section">
                        <div class="section-title">👨‍👩‍👧‍👦 Parent/Guardian Information</div>
                        ${applicationData?.parentInfo ? `
                            <div class="info-row">
                                <span>Relationship:</span>
                                <span>${applicationData.parentInfo.relationship}</span>
                            </div>
                            <div class="info-row">
                                <span>Guardian Name:</span>
                                <span><strong>${applicationData.parentInfo.guardianName}</strong></span>
                            </div>
                            <div class="info-row">
                                <span>Guardian Phone:</span>
                                <span>${applicationData.parentInfo.guardianPhone}</span>
                            </div>
                            <div class="info-row">
                                <span>Income Bracket:</span>
                                <span>${formatIncomeBracket(applicationData.parentInfo.incomeBracket)}</span>
                            </div>
                            <div class="info-row">
                                <span>Father's Occupation:</span>
                                <span>${applicationData.parentInfo.fatherOccupation || 'Not provided'}</span>
                            </div>
                            <div class="info-row">
                                <span>Mother's Occupation:</span>
                                <span>${applicationData.parentInfo.motherOccupation || 'Not provided'}</span>
                            </div>
                        ` : '<p>No parent/guardian information available</p>'}
                    </div>
                    
                    <!-- Application Status -->
                    <div class="info-section">
                        <div class="section-title">📋 Application Status</div>
                        <div class="info-row">
                            <span>Current Status:</span>
                            <span class="status-badge">Submitted for Review</span>
                        </div>
                        <div class="info-row">
                            <span>Estimated Review Time:</span>
                            <span>4-6 weeks</span>
                        </div>
                        <div class="info-row">
                            <span>Documents Submitted:</span>
                            <span><strong>${getDocumentCount()} files</strong></span>
                        </div>
                        <div class="info-row">
                            <span>Application Type:</span>
                            <span>Merit-Based Scholarship</span>
                        </div>
                    </div>
                    
                    <div class="note">
                        <strong>Important Note:</strong> Your application is now in the review process. You will be contacted via email for any updates or additional information required.
                    </div>
                    
                    <div class="footer">
                        <p>This is an official receipt for your scholarship application submission.</p>
                        <p>Please keep this receipt for your records and future reference.</p>
                        <p>For inquiries or additional information, please contact: <strong>scholarship@alertgroup.com</strong></p>
                        <p style="margin-top: 15px; font-size: 11px; color: #9ca3af;">
                            Receipt Generated: ${new Date().toLocaleString()} | System ID: ALERT-${Date.now().toString(36).toUpperCase()}
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Create blob and download
        const blob = new Blob([receiptHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `AlertScholarship-Receipt-${applicationRef}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        alert("Receipt downloaded successfully!");
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'AlertMFB Scholarship Application',
                    text: `I just submitted my scholarship application to AlertMFB! Reference: ${applicationRef}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(`I just submitted my scholarship application to AlertMFB! Reference: ${applicationRef}`);
            alert('Link copied to clipboard!');
        }
    };

    const handleReturnHome = () => {
        clearApplication();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-[#FDF6E3] via-white to-[#F5E6C8] font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Confetti Animation */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-linear-to-r from-[#B8860B] to-[#D4A017] rounded-full"
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
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-linear-to-r from-[#B8860B] to-[#D4A017] shadow-2xl shadow-[#B8860B]/30"
                    >
                        <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                        Congratulations<span className="text-[#B8860B]">!</span>
                    </h1>

                    <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
                        Your scholarship application has been successfully submitted
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-[#B8860B]/20"
                    >
                        <Award className="w-5 h-5 text-[#B8860B]" />
                        <span className="font-mono font-bold text-[#B8860B]">
                            Reference: {applicationRef}
                        </span>
                    </motion.div>
                </motion.div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8 mb-16">
                    {/* Left Content - Application Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="lg:w-2/3 relative z-10"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl shadow-[#B8860B]/10 border border-[#B8860B]/20 overflow-hidden">
                            {/* Card Header */}
                            <div className="p-8 border-b border-[#B8860B]/20 bg-linear-to-r from-[#FDF6E3] to-[#F5E6C8]">
                                <div className="flex items-center gap-3">
                                    <Receipt className="w-8 h-8 text-[#B8860B]" />
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                                        <p className="text-[#B8860B]">Complete summary of your submission</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                    <div className="bg-[#FDF6E3] p-4 rounded-xl border border-[#F5E6C8]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <User className="w-4 h-4 text-[#B8860B]" />
                                            <span className="text-sm text-[#B8860B]">Applicant</span>
                                        </div>
                                        <p className="font-bold text-gray-900 truncate">
                                            {applicationData?.personalInfo?.fullName || 'Not provided'}
                                        </p>
                                    </div>
                                    <div className="bg-[#FDF6E3] p-4 rounded-xl border border-[#F5E6C8]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <School className="w-4 h-4 text-[#B8860B]" />
                                            <span className="text-sm text-[#B8860B]">Institution</span>
                                        </div>
                                        <p className="font-bold text-gray-900 truncate">
                                            {applicationData?.educationalInfo?.institutionName || 'Not provided'}
                                        </p>
                                    </div>
                                    <div className="bg-[#FDF6E3] p-4 rounded-xl border border-[#F5E6C8]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <GraduationCap className="w-4 h-4 text-[#B8860B]" />
                                            <span className="text-sm text-[#B8860B]">Course</span>
                                        </div>
                                        <p className="font-bold text-gray-900 truncate">
                                            {applicationData?.educationalInfo?.course || 'Not provided'}
                                        </p>
                                    </div>
                                    <div className="bg-[#FDF6E3] p-4 rounded-xl border border-[#F5E6C8]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="w-4 h-4 text-[#B8860B]" />
                                            <span className="text-sm text-[#B8860B]">Level</span>
                                        </div>
                                        <p className="font-bold text-gray-900">
                                            {applicationData?.educationalInfo?.currentLevel || 'Not provided'}
                                        </p>
                                    </div>
                                </div>

                                {/* Detailed Information */}
                                <div className="space-y-8">
                                    {/* Personal Information */}
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                        <div className="flex items-center gap-3 mb-4">
                                            <User className="w-5 h-5 text-[#B8860B]" />
                                            <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                                        </div>
                                        {applicationData?.personalInfo ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">Full Name</p>
                                                    <p className="font-bold text-gray-900">{applicationData.personalInfo.fullName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Date of Birth</p>
                                                    <p className="font-medium text-gray-900">
                                                        {formatDateOfBirth(applicationData.personalInfo.dob)}
                                                        {calculateAge(applicationData.personalInfo.dob) && (
                                                            <span className="text-sm text-gray-500 ml-2">
                                                                (Age: {calculateAge(applicationData.personalInfo.dob)})
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Gender</p>
                                                    <p className="font-medium text-gray-900">{applicationData.personalInfo.gender}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Email</p>
                                                    <p className="font-medium text-gray-900">{applicationData.personalInfo.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Phone</p>
                                                    <p className="font-medium text-gray-900">{applicationData.personalInfo.phone}</p>
                                                </div>
                                                {applicationData.personalInfo.address && (
                                                    <div>
                                                        <p className="text-sm text-gray-500">Address</p>
                                                        <p className="font-medium text-gray-900">{applicationData.personalInfo.address}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">No personal information available</p>
                                        )}
                                    </div>

                                    {/* Educational Information */}
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                        <div className="flex items-center gap-3 mb-4">
                                            <School className="w-5 h-5 text-[#B8860B]" />
                                            <h3 className="text-lg font-bold text-gray-900">Educational Information</h3>
                                        </div>
                                        {applicationData?.educationalInfo ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">Institution Type</p>
                                                    <p className="font-medium text-gray-900">{applicationData.educationalInfo.institutionType}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Institution Name</p>
                                                    <p className="font-bold text-gray-900">{applicationData.educationalInfo.institutionName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Course/Program</p>
                                                    <p className="font-bold text-gray-900">{applicationData.educationalInfo.course}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Current CGPA</p>
                                                    <p className="font-bold text-[#B8860B] text-lg">{applicationData.educationalInfo.cgpa}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Academic Level</p>
                                                    <p className="font-medium text-gray-900">
                                                        {formatAcademicLevel(applicationData.educationalInfo.currentLevel)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Admission Year</p>
                                                    <p className="font-medium text-gray-900">{applicationData.educationalInfo.admissionYear}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">No educational information available</p>
                                        )}
                                    </div>

                                    {/* Parent/Guardian Information */}
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Users className="w-5 h-5 text-[#B8860B]" />
                                            <h3 className="text-lg font-bold text-gray-900">Parent/Guardian Information</h3>
                                        </div>
                                        {applicationData?.parentInfo ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">Relationship</p>
                                                    <p className="font-medium text-gray-900">{applicationData.parentInfo.relationship}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Guardian Name</p>
                                                    <p className="font-bold text-gray-900">{applicationData.parentInfo.guardianName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Guardian Phone</p>
                                                    <p className="font-medium text-gray-900">{applicationData.parentInfo.guardianPhone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Income Bracket</p>
                                                    <p className="font-medium text-gray-900">
                                                        {formatIncomeBracket(applicationData.parentInfo.incomeBracket)}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">No parent/guardian information available</p>
                                        )}
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
                        <div className="bg-linear-to-br from-[#B8860B] to-[#D4A017] rounded-3xl p-8 text-white shadow-2xl shadow-[#B8860B]/30">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <Download className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Download Receipt</h3>
                                    <p className="text-[#FDF6E3]">Save your official application receipt</p>
                                </div>
                            </div>
                            <button
                                onClick={handleDownloadReceipt}
                                className="w-full px-4 py-3 bg-white text-[#B8860B] font-bold rounded-xl hover:bg-[#FDF6E3] transition-colors flex items-center justify-center gap-2 group"
                            >
                                <Download className="w-5 h-5 group-hover:animate-bounce" />
                                Download Receipt
                            </button>
                            <p className="text-sm text-[#FDF6E3] mt-3 text-center">
                                Includes all application details and reference number
                            </p>
                        </div>

                        {/* Application Summary */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="w-5 h-5 text-[#B8860B]" />
                                <h4 className="font-bold text-gray-900">Application Summary</h4>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Reference Number</span>
                                    <span className="font-mono font-bold text-[#B8860B]">{applicationRef}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Submission Date</span>
                                    <span className="font-medium">{submissionDate}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Submission Time</span>
                                    <span className="font-medium">{submissionTime}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Documents Submitted</span>
                                    <span className="font-bold text-[#B8860B]">{getDocumentCount()} files</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Application Status</span>
                                    <span className="px-3 py-1 bg-[#FDF6E3] text-[#B8860B] rounded-full text-sm">
                                        Submitted for Review
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Share Card */}
                        <div className="bg-linear-to-r from-[#B8860B] to-[#D4A017] rounded-3xl p-6 text-white">
                            <div className="flex items-center gap-2 mb-4">
                                <Share2 className="w-5 h-5" />
                                <h4 className="font-bold">Share Your Achievement</h4>
                            </div>
                            <p className="text-[#FDF6E3] mb-4 text-sm">
                                Let your network know about your scholarship application
                            </p>
                            <button
                                onClick={handleShare}
                                className="w-full px-4 py-2 bg-white text-[#B8860B] text-sm font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                                <Share2 className="w-4 h-4" />
                                Share Application
                            </button>
                        </div>

                        {/* Next Steps Card */}
                        <div className="bg-linear-to-r from-[#FDF6E3] to-[#F5E6C8] rounded-3xl p-6 border border-[#B8860B]/20">
                            <h4 className="font-bold text-gray-900 mb-2">Important Next Steps</h4>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-[#B8860B] rounded-full mt-2"></div>
                                    <span className="text-sm text-gray-600">Save your receipt for future reference</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-[#B8860B] rounded-full mt-2"></div>
                                    <span className="text-sm text-gray-600">Check email regularly for updates</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-[#B8860B] rounded-full mt-2"></div>
                                    <span className="text-sm text-gray-600">Prepare for potential interviews</span>
                                </li>
                            </ul>
                            <div className="text-xs text-gray-500">
                                Questions? Email scholarship@alertgroup.com
                            </div>
                        </div>

                        {/* Return Home Button */}
                        <button
                            onClick={handleReturnHome}
                            className="block group w-full cursor-pointer text-left"
                        >
                            <div className="bg-linear-to-r from-gray-50 to-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#F5E6C8] rounded-lg">
                                            <Home className="w-5 h-5 text-[#B8860B]" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Return to Home</h4>
                                            <p className="text-sm text-gray-600">Start new application or explore</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 transition-transform group-hover:translate-x-2" />
                                </div>
                            </div>
                        </button>
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
                        Thank you for applying to the AlertGroup Scholarship Program
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <p className="text-sm text-gray-400">
                            Your application has been saved and submitted successfully
                        </p>
                        <button
                            onClick={handleReturnHome}
                            className="px-4 py-2 bg-linear-to-r from-[#B8860B] to-[#D4A017] text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
                        >
                            Start New Application
                        </button>
                    </div>
                </motion.div>

                {/* Floating Celebration Elements */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className="fixed bottom-8 right-8 z-20"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#B8860B] rounded-full animate-ping opacity-20"></div>
                        <div className="relative w-16 h-16 bg-linear-to-r from-[#B8860B] to-[#D4A017] rounded-full flex items-center justify-center shadow-2xl">
                            <Award className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CongratulationsPage;