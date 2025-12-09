import { useState, useEffect } from "react";
import { Clock2, Notebook, Search, Award, GraduationCap, Users, Target, ChevronRight, Sparkles, Star, CheckCircle, ArrowRight, BookOpen } from "lucide-react";
import AlertLogo from "../assets/images/AlertLogo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const scholarships = [
    {
        title: "Undergraduate Scholarship",
        provider: "National Education Fund",
        deadline: "Feb 28, 2026",
        textColor: "text-red-400",
        category: "Education",
        description: "Full tuition coverage for undergraduate students",
        slots: "50 available",
        icon: GraduationCap
    },
    {
        title: "Tech Innovation Grant",
        provider: "Tech Foundation",
        deadline: "Coming Soon",
        textColor: "text-gray-400",
        category: "Technology",
        description: "Support for tech-focused projects and research",
        slots: "25 available",
        icon: Award
    },
    {
        title: "Leadership Excellence Award",
        provider: "Global Scholars",
        deadline: "Coming Soon",
        textColor: "text-gray-400",
        category: "Leadership",
        description: "Recognition and funding for young leaders",
        slots: "15 available",
        icon: Target
    },
];

const carouselImages = [
    "https://teentrust.ng/wp-content/uploads/2025/02/25-Scholarships-for-Nigerian-Students-to-Study-Abroad.jpg",
    "https://africanarguments.org/wp-content/uploads/2023/06/nigeria-university-north-education-climate-change-e1686315345307.jpg",
    "https://edutimesafrica.com/wp-content/uploads/2024/10/istockphoto-1474378386-2048x2048-1.jpg",
    "https://alertgroup.com.ng/wp-content/uploads/2024/08/alertxmansard-1024x684.jpg",
    "https://cdn.guardian.ng/wp-content/uploads/2020/09/University-Students-1062x598.jpg",
    "https://dailytrust.com/wp-content/uploads/2025/06/zonahub-%E2%80%93-a-free-marketplace-for-nigerian-students.jpg",
];

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentImage, setCurrentImage] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const filteredScholarships = scholarships.filter((scholarship) =>
        scholarship.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
      useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);


    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % carouselImages.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Parallax scroll
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-cyan-50">
            {/* Hero Section */}
            <div className="relative h-screen min-h-[800px] text-white overflow-hidden">
                {/* Logo in Top-Left */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-6 left-6 z-40"
                >
                    <img
                        src={AlertLogo}
                        className="h-30 w-auto drop-shadow-2xl"
                    />
                </motion.div>

                {/* Carousel Images */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${carouselImages[currentImage]})`,
                            transform: `translateY(${scrollY * 0.15}px) scale(1.1)`,
                        }}
                    />
                </AnimatePresence>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/70 to-transparent z-20" />
                <div className="absolute inset-0 bg-linear-to-r from-black-900/40 via-transparent to-black/40 z-20" />

                {/* Floating Elements */}
                <div className="absolute top-20 left-20 w-64 h-64 bg-linear-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl z-10" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-linear-to-l from-teal-500/10 to-blue-500/10 rounded-full blur-3xl z-10" />

                {/* Content */}
                <div className="relative py-20 px-4 mt-20 md:px-0 text-center justify-center z-30">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 mt-10 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                    >
                        <Award className="w-4 h-4 text-blue-300" />
                        <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
                            Empowering Futures
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl sm:text-4xl lg:text-5xl font-bold mb-6"
                    >
                        Welcome to <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">AlertGroup Scholarship</span> Portal
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                    >
                        Your gateway to life-changing scholarship opportunities. Discover, apply, and unlock your academic potential.
                    </motion.p>

                    {/* Search Input */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="mt-12 flex justify-center"
                    >
                        <div className={`relative w-full max-w-2xl transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search scholarships by title, category, or provider..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    className="w-full px-6 py-4 pl-14 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-sm border border-white/30"
                                />
                                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-600 w-6 h-6" />
                            </div>

                            {/* Search Tips */}
                            <AnimatePresence>
                                {searchTerm && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 p-4 z-40"
                                    >
                                        <div className="text-sm text-gray-600 mb-2">
                                            Found {filteredScholarships.length} scholarships
                                        </div>
                                        {filteredScholarships.map((scholarship, index) => (
                                            <div key={index} className="p-3 hover:bg-blue-50 rounded-lg cursor-pointer">
                                                <div className="font-medium text-gray-900">{scholarship.title}</div>
                                                <div className="text-sm text-gray-500">{scholarship.provider}</div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="mt-12"
                    >
                        <div className="inline-flex items-center gap-6 text-blue-100">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                <span>500+ Scholarships Awarded</span>
                            </div>
                            <div className="w-1 h-1 bg-blue-300 rounded-full" />
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5" />
                                <span>98% Success Rate</span>
                            </div>
                            <div className="w-1 h-1 bg-blue-300 rounded-full" />
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scholarships List */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Featured <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Scholarships</span>
                        </h2>
                        <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                            Discover opportunities that match your academic goals and career aspirations
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredScholarships.map((scholarship, index) => {
                            const Icon = scholarship.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    whileHover={{ y: -8 }}
                                    className="group"
                                >
                                    <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100">
                                       

                                        <div className="p-6">
                                            {/* Icon & Title */}
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="p-3 bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl">
                                                    <Icon className="w-8 h-8 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                        {scholarship.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        {scholarship.provider}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                                {scholarship.description}
                                            </p>

                                            {/* Details */}
                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div className="text-center p-3 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl">
                                                    <Clock2 className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                                                    <div className="text-sm text-gray-500">Deadline</div>
                                                    <div className={`font-bold ${scholarship.textColor}`}>
                                                        {scholarship.deadline}
                                                    </div>
                                                </div>
                                                <div className="text-center p-3 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl">
                                                    <Users className="w-5 h-5 text-cyan-500 mx-auto mb-2" />
                                                    <div className="text-sm text-gray-500">Available Slots</div>
                                                    <div className="font-bold text-gray-900">
                                                        {scholarship.slots}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CTA Button */}
                                            {scholarship.title === "Undergraduate Scholarship" ? (
                                                <Link
                                                    to="/personal-info"
                                                    className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300"
                                                >
                                                    <span>Apply Now</span>
                                                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </Link>
                                            ) : (
                                                <button
                                                    className="w-full px-6 py-3 bg-gray-100 text-gray-400 font-semibold rounded-full cursor-not-allowed"
                                                    disabled
                                                >
                                                    Coming Soon
                                                </button>
                                            )}
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="relative py-20 bg-linear-to-b from-white to-blue-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-linear-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-100">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                                Why Choose Us
                            </span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            The <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">AlertGroup</span> Advantage
                        </h2>
                        <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                            Our scholarship program is designed to provide comprehensive support and create lasting impact
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: BookOpen,
                                title: "Fully Funded Support",
                                description: "Complete coverage of tuition, learning materials, and academic expenses for selected candidates.",
                                color: "from-blue-500 to-cyan-400"
                            },
                            {
                                icon: Users,
                                title: "Mentorship Programs",
                                description: "Access to industry experts who provide guidance for educational and career development.",
                                color: "from-cyan-500 to-teal-400"
                            },
                            {
                                icon: Target,
                                title: "Inclusive Eligibility",
                                description: "Open to students from all regions and backgrounds who demonstrate exceptional potential.",
                                color: "from-teal-500 to-emerald-400"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <div className="relative h-full p-8 bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50">
                                    <div className="mb-6">
                                        <div className={`inline-flex p-4 bg-linear-to-r ${feature.color} rounded-2xl mb-4`}>
                                            <feature.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full group-hover:w-4/5 transition-all duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="relative py-20 bg-linear-to-br from-blue-900 via-blue-800 to-cyan-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Voices of <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Success</span>
                        </h2>
                        <p className="text-blue-100 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                            Hear from scholars whose lives have been transformed through our program
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "The AlertMFB scholarship was life-changing! It allowed me to focus entirely on my studies without financial worries.",
                                author: "Aisha Ibrahim",
                                role: "2023 Scholar • Computer Science",
                                avatar: "👩‍🎓"
                            },
                            {
                                quote: "Beyond the financial support, the mentorship I received shaped my career path and opened doors I never imagined.",
                                author: "David Chukwu",
                                role: "2022 Scholar • Engineering",
                                avatar: "👨‍💼"
                            },
                            {
                                quote: "This scholarship program truly understands students' needs. The support system is exceptional from start to finish.",
                                author: "Sarah Adebayo",
                                role: "2021 Scholar • Medicine",
                                avatar: "👩‍⚕️"
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="h-full p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                                    <div className="text-4xl mb-4">{testimonial.avatar}</div>
                                    <p className="text-white/90 italic text-lg leading-relaxed mb-6">
                                        "{testimonial.quote}"
                                    </p>
                                    <div>
                                        <div className="font-semibold text-white">{testimonial.author}</div>
                                        <div className="text-blue-200 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-cyan-800" />
                <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-white to-transparent" />

                {/* Floating Elements */}
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-linear-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-linear-to-l from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <Award className="w-4 h-4 text-white" />
                            <span className="text-sm font-semibold text-white uppercase tracking-wider">
                                Begin Your Journey
                            </span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                            Ready to Transform Your Future?
                        </h2>

                        <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                            Take the first step towards achieving your academic dreams. Apply now and join our community of scholars.
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="pt-8"
                        >
                            <Link
                                to="/personal-info"
                                className="group inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-cyan-400 to-blue-300 text-blue-900 font-bold text-lg rounded-full shadow-2xl shadow-cyan-500/25 hover:shadow-3xl hover:shadow-cyan-500/40 transition-all duration-300"
                            >
                                <Notebook className="w-6 h-6" />
                                <span>Start Application Now</span>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </motion.div>

                        <div className="text-blue-200 text-sm">
                            ⚡ Average application time: 15 minutes
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-linear-to-b from-gray-50 to-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <img
                                src={AlertLogo}
                                alt="AlertMFB Logo"
                                className="h-30 w-auto"
                            />
                            <div>
                                <h4 className="text-lg font-bold text-gray-900">AlertMFB Scholarship Program</h4>
                                <p className="text-sm text-gray-600">Empowering futures through education</p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="text-center md:text-right">
                            <p className="text-sm text-gray-600">
                                © {new Date().getFullYear()} Alert Microfinance Bank. All rights reserved.
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Building a brighter future, one scholar at a time.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;