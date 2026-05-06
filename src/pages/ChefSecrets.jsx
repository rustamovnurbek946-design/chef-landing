import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Typography,
    Button,
    Card,
    CardHeader,
    CardBody,
    Chip,
    Avatar,
    IconButton,
    Input,
    Spinner,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import {
    MagnifyingGlassIcon,
    LightBulbIcon,
    FireIcon,
    BeakerIcon,
    ClockIcon,
    ShareIcon,
    BookmarkIcon,
    ArrowRightIcon,
    SparklesIcon,
    HeartIcon,
    ChatBubbleLeftEllipsisIcon,
    EyeIcon,
    CalendarIcon,
    UserGroupIcon,
    XMarkIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
    HeartIcon as HeartSolidIcon,
    BookmarkIcon as BookmarkSolidIcon,
} from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

const ChefSecrets = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(t("categories.all"));
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savedPosts, setSavedPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [email, setEmail] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState("");
    const [readingHistory, setReadingHistory] = useState([]);
    const [showStats, setShowStats] = useState(false);

    // Blog ma'lumotlari
    const BLOG_POSTS = [
        {
            id: 1,
            category: t("categories.technique"),
            title: t("posts.knifeSharpening"),
            description: t("posts.knifeDesc"),
            content: "Pichoqni o'tkirlashda burchak (angle) eng muhim rol o'ynaydi. Odatda 15-20 daraja burchak ostida toshda charxlanadi. Professional oshpazlar har foydalanishdan oldin pichoqni musatda 3-4 marta tekislashni tavsiya qiladi. Pichoqni saqlashda magnit panel yoki yog'och stenddan foydalaning. Pichoqni idish yuvish mashinasida yuvmang - bu pichoqning o'tkirligini tez yo'qotadi.",
            author: "Chef Sanjar",
            authorAvatar: "https://ui-avatars.com/api/?name=Chef+Sanjar&background=FF4545&color=fff",
            date: "2026-04-15",
            image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=1000",
            readTime: "5 min",
            views: 12450,
            comments: 342,
            icon: <SparklesIcon className="w-5 h-5 text-yellow-700" />,
            color: "bg-gradient-to-br from-yellow-50 to-yellow-100",
            tags: [t("tags.knife"), t("tags.technique"), t("tags.masterclass")],
            featured: true,
        },
        {
            id: 2,
            category: t("categories.meat"),
            title: t("posts.meatSoftening"),
            description: t("posts.meatDesc"),
            content: "Go'shtni yumshatishning eng yaxshi usuli bu fermentatsiya yoki tabiiy kislotalar (kivi, ananas suvi) bilan marinadlashdir. 1-usul: Kivi pyuresi - 30 daqiqa yetarli. 2-usul: Sut yoki qatiq - 2-4 soat. 3-usul: Low&Slow usuli - past haroratda uzoq vaqt pishirish. Muhim: Go'shtni xona haroratiga kelguncha 30 daqiqa kutib oling, keyin pishirishni boshlang.",
            author: "Chef Malika",
            authorAvatar: "https://ui-avatars.com/api/?name=Chef+Malika&background=FF4545&color=fff",
            date: "2026-04-12",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000",
            readTime: "8 min",
            views: 8920,
            comments: 187,
            icon: <FireIcon className="w-5 h-5 text-red-700" />,
            color: "bg-gradient-to-br from-red-50 to-red-100",
            tags: [t("tags.meat"), t("tags.secrets"), t("tags.marinade")],
            featured: false,
        },
        {
            id: 3,
            category: t("categories.spices"),
            title: t("posts.spicesChemistry"),
            description: t("posts.spicesDesc"),
            content: "Yalpiz va rayhon kabi yangi ko'katlar pishirishning oxirida solinadi, murch va zira esa boshida qovuriladi. Quritilgan ziravorlar (oregano, timyan) pishirishning o'rtasida solinadi. Butun ziravorlar (darchin tayog'i, chinnigul) boshidan qo'shiladi. Ziravorlarni saqlashda qorong'i, salqin joyda havo o'tmaydigan idishda saqlang - 6 oydan keyin ular o'z kuchini yo'qotadi.",
            author: "Chef Abror",
            authorAvatar: "https://ui-avatars.com/api/?name=Chef+Abror&background=FF4545&color=fff",
            date: "2026-04-10",
            image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=1000",
            readTime: "6 min",
            views: 6720,
            comments: 234,
            icon: <BeakerIcon className="w-5 h-5 text-green-700" />,
            color: "bg-gradient-to-br from-green-50 to-green-100",
            tags: [t("tags.spices"), t("tags.taste"), t("tags.knowledge")],
            featured: false,
        },
        {
            id: 4,
            category: t("categories.vegetables"),
            title: t("posts.vegetableVitamins"),
            description: t("posts.vegetableDesc"),
            content: "Sabzavotlardagi vitaminlarni saqlashning eng yaxshi usuli - bug'da pishirish (5-7 daqiqa). Mikroto'lqinli pech ham yaxshi usul - tez va suv kam ishlatiladi. Qaynatish eng ko'p vitaminlarni yo'qotadi (50% gacha). Sabzavotlarni to'g'ralgandan keyin emas, pishirishdan oldin to'g'rang. Sabzavotlarni uzoq vaqt suvda saqlamang - vitaminlar suvga o'tadi.",
            author: "Chef Nilufar",
            authorAvatar: "https://ui-avatars.com/api/?name=Chef+Nilufar&background=FF4545&color=fff",
            date: "2026-04-08",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000",
            readTime: "4 min",
            views: 5430,
            comments: 98,
            icon: <LightBulbIcon className="w-5 h-5 text-blue-700" />,
            color: "bg-gradient-to-br from-blue-50 to-blue-100",
            tags: [t("tags.health"), t("tags.veggie"), t("tags.technique")],
            featured: false,
        },
        {
            id: 5,
            category: t("categories.technique"),
            title: t("posts.sauceTechnique"),
            description: t("posts.sauceDesc"),
            content: "Sousni qalinlashtirish uchun: 1) Roux - un va sariyog'ni teng qismda qovurib oling. 2) Cornstarch slurry - kraxmalni sovuq suvda eritib qo'shing. 3) Emulsiya - sariyog'ni asta-sekin qo'shib, doim aralashtiring. Sous tayyor bo'lganda, uni elakdan o'tkazing - bu professional usul. Sousni saqlash uchun yuziga sariyog' qatlami yoyib qo'ying - qotib qolmaydi.",
            author: "Chef Rustam",
            authorAvatar: "https://ui-avatars.com/api/?name=Chef+Rustam&background=FF4545&color=fff",
            date: "2026-04-05",
            image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?q=80&w=1000",
            readTime: "7 min",
            views: 3210,
            comments: 76,
            icon: <SparklesIcon className="w-5 h-5 text-yellow-700" />,
            color: "bg-gradient-to-br from-yellow-50 to-yellow-100",
            tags: [t("tags.sauce"), t("tags.technique"), t("tags.professional")],
            featured: false,
        },
        {
            id: 6,
            category: t("categories.meat"),
            title: t("posts.bbqMarinade"),
            description: t("posts.bbqDesc"),
            content: "Asosiy marinad formulasi: 3 qism kislota (limon, sirka) + 2 qism yog' + 1 qism ziravorlar. Vaqt: Quritilgan go'sht - 2-4 soat, yumshoq go'sht - 30 daqiqa - 2 soat. Maxsus maslahat: Go'shtni marinadda muzlatib qo'ying - eriganida marinad go'shtga chuqurroq kiradi. Barbekyu qilishdan oldin go'shtni xona haroratiga keltiring.",
            author: "Chef Jamshid",
            authorAvatar: "https://ui-avatars.com/api/?name=Chef+Jamshid&background=FF4545&color=fff",
            date: "2026-04-03",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000",
            readTime: "6 min",
            views: 9870,
            comments: 456,
            icon: <FireIcon className="w-5 h-5 text-red-700" />,
            color: "bg-gradient-to-br from-red-50 to-red-100",
            tags: [t("tags.barbecue"), t("tags.marinade"), t("tags.meat")],
            featured: true,
        },
        {
            id: 7,
            category: t("categories.technique"),
            title: t("posts.breadSecrets"),
            description: t("posts.breadDesc"),
            content: "Nonning qobig'i qarsillab, ichi yumshoq bo'lishi uchun: 1) Kuzatib qo'yish - nonni pishirishdan oldin 30 daqiqa davomida bug' bilan pishiring. 2) Temir qozon (Dutch oven) ichida pishiring - bu bug'ni ushlab turadi. 3) Xamirga bir oz kartoshka pyuresi qo'shing - non uzoq vaqt qotmaydi. 4) Qobig'ini yumshoq qilish uchun pishgan nonni sochiq bilan o'rab qo'ying.",
            author: "Chef Dilnoza",
            authorAvatar: "https://ui-avatars.com/api/?name=Chef+Dilnoza&background=FF4545&color=fff",
            date: "2026-04-18",
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000",
            readTime: "9 min",
            views: 3450,
            comments: 123,
            icon: <SparklesIcon className="w-5 h-5 text-yellow-700" />,
            color: "bg-gradient-to-br from-yellow-50 to-yellow-100",
            tags: [t("tags.bread"), t("tags.dough"), t("tags.professional")],
            featured: true,
        }
    ];

    // Til o'zgarganda kategoriyani yangilash
    useEffect(() => {
        setSelectedCategory(t("categories.all"));
    }, [t]);

    useEffect(() => {
        const loadSavedData = () => {
            const saved = localStorage.getItem('chefSecrets_saved');
            const liked = localStorage.getItem('chefSecrets_liked');
            const history = localStorage.getItem('chefSecrets_history');
            const commentsData = localStorage.getItem('chefSecrets_comments');
            
            if (saved) setSavedPosts(JSON.parse(saved));
            if (liked) setLikedPosts(JSON.parse(liked));
            if (history) setReadingHistory(JSON.parse(history));
            if (commentsData) setComments(JSON.parse(commentsData));
        };
        
        loadSavedData();
        
        setTimeout(() => {
            setFilteredPosts(BLOG_POSTS);
            setLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        localStorage.setItem('chefSecrets_saved', JSON.stringify(savedPosts));
    }, [savedPosts]);

    useEffect(() => {
        localStorage.setItem('chefSecrets_liked', JSON.stringify(likedPosts));
    }, [likedPosts]);

    useEffect(() => {
        localStorage.setItem('chefSecrets_history', JSON.stringify(readingHistory));
    }, [readingHistory]);

    useEffect(() => {
        localStorage.setItem('chefSecrets_comments', JSON.stringify(comments));
    }, [comments]);

    useEffect(() => {
        const results = BLOG_POSTS.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                post.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === t("categories.all") || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        setFilteredPosts(results);
    }, [searchTerm, selectedCategory, t]);

    const categories = [t("categories.all"), t("categories.technique"), t("categories.meat"), t("categories.spices"), t("categories.vegetables")];

    const handleSavePost = (postId) => {
        if (savedPosts.includes(postId)) {
            setSavedPosts(savedPosts.filter(id => id !== postId));
            showToastMessage(t("savedRemoved"), "info");
        } else {
            setSavedPosts([...savedPosts, postId]);
            showToastMessage(t("savedAdded"), "success");
        }
    };

    const handleLikePost = (postId) => {
        if (likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter(id => id !== postId));
            showToastMessage(t("likeRemoved"), "info");
        } else {
            setLikedPosts([...likedPosts, postId]);
            showToastMessage(t("likeAdded"), "success");
        }
    };

    const handleSubscribe = async () => {
        if (!email) {
            showToastMessage(t("enterEmail"), "error");
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            showToastMessage(t("validEmail"), "error");
            return;
        }

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToastMessage(t("subscribedSuccess"), "success");
            setEmail("");
        } catch (error) {
            showToastMessage(t("errorOccurred"), "error");
        } finally {
            setLoading(false);
        }
    };

    const handleReadPost = (post) => {
        setSelectedPost(post);
        setShowModal(true);
        
        if (!readingHistory.includes(post.id)) {
            setReadingHistory([...readingHistory, post.id]);
            post.views += 1;
        }
    };

    const handleAddComment = () => {
        if (!newComment.trim()) {
            showToastMessage(t("writeCommentFirst"), "error");
            return;
        }

        const comment = {
            id: Date.now(),
            text: newComment,
            author: t("you"),
            date: new Date().toISOString(),
            avatar: "https://ui-avatars.com/api/?name=Siz&background=FF4545&color=fff"
        };

        setComments(prev => ({
            ...prev,
            [selectedPost.id]: [...(prev[selectedPost.id] || []), comment]
        }));
        
        selectedPost.comments += 1;
        setNewComment("");
        showToastMessage(t("commentAdded"), "success");
    };

    const handleSharePost = (post) => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.description,
                url: window.location.href,
            }).catch(() => {
                copyToClipboard(post);
            });
        } else {
            copyToClipboard(post);
        }
    };

    const copyToClipboard = (post) => {
        navigator.clipboard.writeText(`${post.title}\n${post.description}\n\nChefBook orqali ulashing!`);
        showToastMessage(t("linkCopied"), "success");
    };

    const showToastMessage = (message, type = "success") => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return t("today");
        if (diffDays === 1) return t("yesterday");
        if (diffDays < 7) return `${diffDays} ${t("daysAgo")}`;
        return date.toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric' });
    };

    const getStats = () => {
        const totalLikes = likedPosts.length;
        const totalSaved = savedPosts.length;
        const totalRead = readingHistory.length;
        const totalComments = Object.values(comments).reduce((sum, arr) => sum + arr.length, 0);
        
        return { totalLikes, totalSaved, totalRead, totalComments };
    };

    const RecipeCard = ({ post, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group"
        >
            <Card className="h-full bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden">
                <CardHeader floated={false} className="m-0 h-72 rounded-none overflow-hidden relative cursor-pointer" onClick={() => handleReadPost(post)}>
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-md bg-white/95 shadow-lg border border-white/20">
                            {post.icon}
                            <span className="text-xs font-black uppercase tracking-widest text-gray-900">{post.category}</span>
                        </div>
                    </div>

                    {post.featured && (
                        <div className="absolute top-4 right-4">
                            <Chip
                                value={t("featured")}
                                className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white font-bold text-xs px-3 py-1 shadow-lg animate-pulse"
                            />
                        </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Button
                            size="sm"
                            className="bg-white/95 text-gray-900 rounded-full flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleReadPost(post);
                            }}
                        >
                            <EyeIcon className="h-4 w-4" />
                            {t("readMore")}
                        </Button>
                        <Button
                            size="sm"
                            variant="text"
                            className="bg-white/95 text-gray-900 rounded-full hover:bg-red-500 hover:text-white transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSharePost(post);
                            }}
                        >
                            <ShareIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>

                <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {formatDate(post.date)}
                        </span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3" />
                            {post.readTime}
                        </span>
                    </div>

                    <Typography 
                        variant="h5" 
                        className="text-gray-900 font-bold mb-3 leading-tight group-hover:text-red-500 transition-colors line-clamp-2 cursor-pointer"
                        onClick={() => handleReadPost(post)}
                    >
                        {post.title}
                    </Typography>

                    <Typography className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.description}
                    </Typography>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag, idx) => (
                            <span 
                                key={idx} 
                                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full cursor-pointer hover:bg-red-100 hover:text-red-600 transition-colors"
                                onClick={() => setSearchTerm(tag)}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <Avatar
                                size="sm"
                                src={post.authorAvatar}
                                className="border-2 border-white shadow-md"
                            />
                            <div>
                                <span className="text-sm font-bold text-gray-800 block">{post.author}</span>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <EyeIcon className="h-3 w-3" /> {formatNumber(post.views)}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <ChatBubbleLeftEllipsisIcon className="h-3 w-3" /> {post.comments + (comments[post.id]?.length || 0)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-1">
                            <IconButton
                                variant="text"
                                size="sm"
                                className="rounded-full hover:bg-red-50 group"
                                onClick={() => handleLikePost(post.id)}
                            >
                                {likedPosts.includes(post.id) ? (
                                    <HeartSolidIcon className="h-5 w-5 text-red-500" />
                                ) : (
                                    <HeartIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                                )}
                            </IconButton>
                            <IconButton
                                variant="text"
                                size="sm"
                                className="rounded-full hover:bg-blue-50 group"
                                onClick={() => handleSavePost(post.id)}
                            >
                                {savedPosts.includes(post.id) ? (
                                    <BookmarkSolidIcon className="h-5 w-5 text-blue-500" />
                                ) : (
                                    <BookmarkIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                )}
                            </IconButton>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </motion.div>
    );

    if (loading && filteredPosts.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <Spinner className="h-12 w-12 text-red-500 mb-4" />
                    <Typography className="text-gray-600">{t("loading")}</Typography>
                </div>
            </div>
        );
    }

    const stats = getStats();

    return (
        <div className="min-h-screen ">
            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
                    >
                        <div className={`${toastType === 'success' ? 'bg-green-500' : toastType === 'error' ? 'bg-red-500' : 'bg-gray-900'} text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2`}>
                            {toastType === 'success' && <CheckCircleIcon className="h-5 w-5" />}
                            <span className="font-medium">{toastMessage}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000"
                        className="w-full h-full object-cover"
                        alt={t("hero.subtitle")}
                        loading="eager"
                    />
                </motion.div>

                <div className="relative z-20 container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Chip
                            value="✨ CHEF MASTERCLASS ✨"
                            className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full mb-6 inline-block tracking-wider px-6 py-2 shadow-xl"
                        />
                        <Typography variant="h1" className="text-white text-6xl md:text-8xl font-black tracking-tighter mb-6">
                            {t("hero.title")} <br />
                            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                {t("hero.subtitle")}
                            </span>
                        </Typography>
                        <Typography className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                            {t("hero.description")}
                        </Typography>

                        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                            <div className="flex items-center gap-2 text-white">
                                <UserGroupIcon className="h-5 w-5" />
                                <span className="font-bold">50K+</span>
                                <span className="text-sm">{t("hero.readers")}</span>
                            </div>
                            <div className="w-1 h-1 bg-white/50 rounded-full" />
                            <div className="flex items-center gap-2 text-white">
                                <SparklesIcon className="h-5 w-5" />
                                <span className="font-bold">{BLOG_POSTS.length}+</span>
                                <span className="text-sm">{t("hero.articles")}</span>
                            </div>
                            <div className="w-1 h-1 bg-white/50 rounded-full" />
                            <div className="flex items-center gap-2 text-white">
                                <FireIcon className="h-5 w-5" />
                                <span className="font-bold">15+</span>
                                <span className="text-sm">{t("hero.experts")}</span>
                            </div>
                            <Button 
                                variant="text" 
                                className="text-white border-white/30 border hover:bg-white/20"
                                onClick={() => setShowStats(true)}
                            >
                                {t("stats")}
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent" />
            </section>

            {/* Stats Modal */}
            <Dialog open={showStats} handler={setShowStats} size="sm">
                <DialogHeader className="flex justify-between items-center">
                    <Typography variant="h5" className="font-bold">{t("myActivity")}</Typography>
                    <IconButton variant="text" onClick={() => setShowStats(false)}>
                        <XMarkIcon className="h-5 w-5" />
                    </IconButton>
                </DialogHeader>
                <DialogBody divider>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-red-50 rounded-2xl">
                            <HeartSolidIcon className="h-8 w-8 text-red-500 mx-auto mb-2" />
                            <Typography className="text-2xl font-bold text-red-600">{stats.totalLikes}</Typography>
                            <Typography className="text-sm text-gray-600">{t("likes")}</Typography>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-2xl">
                            <BookmarkSolidIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                            <Typography className="text-2xl font-bold text-blue-600">{stats.totalSaved}</Typography>
                            <Typography className="text-sm text-gray-600">{t("savedItems")}</Typography>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-2xl">
                            <EyeIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
                            <Typography className="text-2xl font-bold text-green-600">{stats.totalRead}</Typography>
                            <Typography className="text-sm text-gray-600">{t("readItems")}</Typography>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-2xl">
                            <ChatBubbleLeftEllipsisIcon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                            <Typography className="text-2xl font-bold text-purple-600">{stats.totalComments}</Typography>
                            <Typography className="text-sm text-gray-600">{t("comments")}</Typography>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="gradient" color="red" onClick={() => setShowStats(false)}>
                        {t("close")}
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Article Modal */}
            <Dialog open={showModal} handler={setShowModal} size="xl" className="overflow-y-auto max-h-[90vh]">
                {selectedPost && (
                    <>
                        <DialogHeader className="flex justify-between items-center sticky top-0 bg-white z-10">
                            <div className="flex items-center gap-2">
                                {selectedPost.icon}
                                <Chip value={selectedPost.category} className="bg-red-100 text-red-700" />
                            </div>
                            <IconButton variant="text" onClick={() => setShowModal(false)}>
                                <XMarkIcon className="h-5 w-5" />
                            </IconButton>
                        </DialogHeader>
                        <DialogBody divider className="overflow-y-auto">
                            <img 
                                src={selectedPost.image} 
                                alt={selectedPost.title}
                                className="w-full h-96 object-cover rounded-2xl mb-6"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800";
                                }}
                            />
                            <Typography variant="h3" className="font-bold mb-4">{selectedPost.title}</Typography>
                            
                            <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Avatar size="sm" src={selectedPost.authorAvatar} />
                                    <span className="font-medium">{selectedPost.author}</span>
                                </div>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <CalendarIcon className="h-4 w-4" />
                                    {formatDate(selectedPost.date)}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <ClockIcon className="h-4 w-4" />
                                    {selectedPost.readTime} {t("read")}
                                </span>
                            </div>
                            
                            <Typography className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                                {selectedPost.content}
                            </Typography>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {selectedPost.tags.map((tag, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Comments Section */}
                            <div className="border-t pt-6">
                                <Typography variant="h6" className="font-bold mb-4">
                                    {t("comments")} ({selectedPost.comments + (comments[selectedPost.id]?.length || 0)})
                                </Typography>
                                
                                <div className="flex gap-3 mb-6">
                                    <Avatar src="https://ui-avatars.com/api/?name=Siz&background=FF4545&color=fff" size="sm" />
                                    <div className="flex-1">
                                        <Input
                                            type="text"
                                            placeholder={t("writeComment")}
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                                            crossOrigin={undefined}
                                            className="mb-2"
                                        />
                                        <Button size="sm" color="red" onClick={handleAddComment}>
                                            {t("send")}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {comments[selectedPost.id]?.map((comment) => (
                                        <div key={comment.id} className="flex gap-3">
                                            <Avatar src={comment.avatar} size="sm" />
                                            <div className="flex-1">
                                                <div className="bg-gray-50 rounded-2xl p-3">
                                                    <Typography className="font-bold text-sm mb-1">{comment.author}</Typography>
                                                    <Typography className="text-sm text-gray-700">{comment.text}</Typography>
                                                </div>
                                                <Typography className="text-xs text-gray-400 mt-1">
                                                    {formatDate(comment.date)}
                                                </Typography>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {(!comments[selectedPost.id] || comments[selectedPost.id].length === 0) && (
                                        <Typography className="text-gray-500 text-center py-8">
                                            {t("beFirst")}
                                        </Typography>
                                    )}
                                </div>
                            </div>
                        </DialogBody>
                        <DialogFooter className="gap-2">
                            <Button 
                                variant="text" 
                                color="red" 
                                onClick={() => handleLikePost(selectedPost.id)}
                                className="flex items-center gap-2"
                            >
                                {likedPosts.includes(selectedPost.id) ? <HeartSolidIcon className="h-5 w-5" /> : <HeartIcon className="h-5 w-5" />}
                                {likedPosts.includes(selectedPost.id) ? t("unlike") : t("like")}
                            </Button>
                            <Button 
                                variant="text" 
                                color="blue" 
                                onClick={() => handleSavePost(selectedPost.id)}
                                className="flex items-center gap-2"
                            >
                                {savedPosts.includes(selectedPost.id) ? <BookmarkSolidIcon className="h-5 w-5" /> : <BookmarkIcon className="h-5 w-5" />}
                                {savedPosts.includes(selectedPost.id) ? t("saved") : t("save")}
                            </Button>
                            <Button 
                                variant="gradient" 
                                color="red" 
                                onClick={() => handleSharePost(selectedPost)}
                                className="flex items-center gap-2"
                            >
                                <ShareIcon className="h-5 w-5" />
                                {t("share")}
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </Dialog>

            {/* Search & Filters */}
            <div className="container mx-auto px-4 -mt-16 relative z-30">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-6 border border-gray-100"
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                                            ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg transform scale-105"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full lg:w-96">
                            <Input
                                type="text"
                                placeholder={t("search")}
                                className="!border-gray-200 focus:!border-red-500 !rounded-full pl-12 bg-gray-50"
                                labelProps={{ className: "before:content-none after:content-none" }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                crossOrigin={undefined}
                            />
                            <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-2.5 text-gray-400" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Blog Grid */}
            <section className="container mx-auto px-4 mt-20">
                <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
                    <div>
                        <Typography variant="h2" className="text-3xl md:text-4xl font-black text-gray-900">
                            {selectedCategory === t("categories.all") ? t("allArticles") : selectedCategory}
                        </Typography>
                        <Typography className="text-gray-500 mt-2">
                            {filteredPosts.length} {t("found")}
                        </Typography>
                    </div>
                    <div className="flex gap-3">
                        {savedPosts.length > 0 && (
                            <Button 
                                variant="outlined" 
                                className="border-blue-500 text-blue-500 font-bold"
                                onClick={() => setFilteredPosts(BLOG_POSTS.filter(p => savedPosts.includes(p.id)))}
                            >
                                {t("savedOnly")} ({savedPosts.length})
                            </Button>
                        )}
                        <Button 
                            variant="text" 
                            className="text-red-500 font-bold hidden md:flex items-center gap-2"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            {t("backToTop")} <ArrowRightIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post, index) => (
                            <RecipeCard key={post.id} post={post} index={index} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-40"
                    >
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <Typography variant="h4" className="text-gray-900 font-bold mb-2">{t("noResults")}</Typography>
                        <Typography className="text-gray-500 mb-6">{t("tryDifferent")}</Typography>
                        <Button
                            variant="gradient"
                            className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full px-8"
                            onClick={() => { setSearchTerm(""); setSelectedCategory(t("categories.all")); }}
                        >
                            {t("clearFilters")}
                        </Button>
                    </motion.div>
                )}
            </section>

            {/* Newsletter Section */}
            <section className="container mx-auto px-4 mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative rounded-[3rem] bg-gradient-to-br from-gray-900 to-gray-800 p-10 md:p-20 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <path fill="#FF4545" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.8,-0.7C84.5,14.2,78.6,28.4,69.8,40.4C61,52.4,49.4,62.2,36.2,69.5C23,76.8,8.2,81.5,-6.6,80.3C-21.4,79.1,-36.2,71.9,-48.8,62.2C-61.4,52.5,-71.8,40.3,-78.3,26.3C-84.8,12.3,-87.4,-3.5,-84.6,-18.2C-81.8,-32.9,-73.6,-46.5,-62,-54.6C-50.4,-62.7,-35.4,-65.4,-21.8,-72.4C-8.2,-79.4,3.9,-90.7,18.4,-90.3C32.9,-89.9,47.8,-77.8,44.7,-76.4Z" transform="translate(100 100)" />
                        </svg>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Typography variant="h2" className="text-white text-4xl md:text-5xl font-black mb-6 leading-tight">
                                {t("newsletter.title")} <br />
                                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                    {t("newsletter.subtitle")}
                                </span>
                            </Typography>
                            <Typography className="text-gray-300 text-lg mb-10 max-w-md">
                                {t("newsletter.description")}
                            </Typography>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder={t("emailPlaceholder")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 flex-1 backdrop-blur-md"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                                />
                                <Button
                                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-xl rounded-2xl px-10 py-4 font-black tracking-widest transition-all"
                                    onClick={handleSubscribe}
                                >
                                    {t("newsletter.button")}
                                </Button>
                            </div>

                            <Typography className="text-gray-400 text-xs mt-4 flex items-center gap-2">
                                <CheckCircleIcon className="h-3 w-3" />
                                {t("newsletter.benefit")}
                            </Typography>
                        </div>

                        <div className="hidden lg:block">
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=1000"
                                    className="w-full h-full object-cover"
                                    alt={t("hero.subtitle")}
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                            <SparklesIcon className="h-6 w-6 text-white" />
                                        </div>
                                        <Typography className="text-white font-bold italic text-lg">
                                            {t("inspire")}
                                        </Typography>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <Footer />

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default ChefSecrets;