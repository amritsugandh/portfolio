// portfolio-data.js
// This file acts as a local data store and a migration template for Firebase.

const portfolioData = {
    profile: {
        name: "Amrit Sugandh",
        tagline: "I build interactive web experiences with a focus on motion, aesthetics, and usability.",
        aboutHeadline: "Design meets engineering.",
        aboutBio1: "With a passion for minimalist aesthetics and clean code, I bridge the gap between design and development. I believe that the best digital products are not only visually striking but also incredibly intuitive and performant.",
        aboutBio2: "My core stack is built around modern web standards: HTML5, JavaScript (ES6+), and React, ensuring lightweight and blazing-fast applications.",
        yearsExp: "Fresher",
        projectsDone: "5+"
    },
    projects: [
        {
            id: "p1",
            title: "AI Concierge",
            category: "AI / Gemini",
            tags: ["AI", "Gemini"],
            description: "A production-grade AI platform for personalized event planning, featuring multi-session chat and persistent itineraries.",
            image: "./p1.png",
            liveUrl: "https://personal-event-ai-concierge.vercel.app",
            githubUrl: "https://github.com/amritsugandh/Personal-Event-AI-Concierge"
        },
        {
            id: "p2",
            title: "Bus Booking",
            category: "Full-Stack",
            tags: ["Full-Stack", "SQL"],
            description: "A comprehensive booking system with a modern glassmorphism admin dashboard and secure user authentication.",
            image: "./p2.png",
            githubUrl: "https://github.com/amritsugandh/booking-bus-ticket"
        },
        {
            id: "p3",
            title: "Edu Platform",
            category: "Frontend",
            tags: ["Frontend", "Scalable"],
            description: "A professional educational platform featuring user authentication and a streamlined course management interface.",
            image: "educational_mockup.png",
            liveUrl: "https://amritsugandh.github.io/educational-website/",
            githubUrl: "https://github.com/amritsugandh/educational-website"
        }
    ],
    skills: [
        { name: "Python (Django)", level: "Intermediate", category: "Backend" },
        { name: "C/C++", level: "Intermediate", category: "Core" },
        { name: "Java", level: "Basic", category: "Core" },
        { name: "HTML5 & CSS3", level: "Intermediate", category: "Frontend" },
        { name: "React.js", level: "Framework", category: "Frontend" },
        { name: "Machine Learning", level: "Deep Learning", category: "AI" },
        { name: "SQL / MySQL", level: "Databases", category: "Core" },
        { name: "OpenCV", level: "Computer Vision", category: "AI" },
        { name: "MS Office 365 & Outlook", level: "Professional Tools", category: "Productivity" }
    ],
    blogs: [
        {
            title: "Integrating Gemini AI for Event Personalization",
            date: "April 20, 2026",
            category: "AI & ML",
            excerpt: "Exploring how large language models can transform static event planning into dynamic, interactive concierge experiences."
        },
        {
            title: "The Rise of Glassmorphism in Modern Dashboards",
            date: "April 15, 2026",
            category: "Design",
            excerpt: "Why translucent interfaces are more than just a trend and how they improve hierarchy in complex data environments."
        }
    ]
};

if (typeof module !== 'undefined') {
    module.exports = portfolioData;
}
