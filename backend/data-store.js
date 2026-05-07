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
            id: "p3",
            title: "EduFlow Platform",
            category: "Frontend UI/UX",
            tags: ["Vite", "GSAP", "Micro-Interactions"],
            description: "A sophisticated educational portal prioritizing user engagement through motion design. By integrating GSAP for scroll-triggered animations and micro-interactions, the platform provides a buttery-smooth learning experience. The scalable frontend architecture supports dynamic course rendering and progress tracking, all while maintaining a strict mobile-first performance profile.",
            image: "src/assets/educational_mockup.png",
            liveUrl: "https://amritsugandh.github.io/educational-website/",
            githubUrl: "https://github.com/amritsugandh/educational-website"
        },
        {
            id: "p4",
            title: "VoteSmart India",
            category: "E-Governance",
            tags: ["React", "FastAPI", "Multilingual"],
            description: "A mission-critical digital voting portal engineered for maximum security and accessibility. Supporting 10+ Indian languages, it bridges the digital divide in governance. The backend features a robust FastAPI layer with PostgreSQL for audit-grade data persistence, while the frontend provides real-time voter turnout visualization and secure, identity-verified voting flows.",
            image: "src/assets/p4.png",
            liveUrl: "https://votesmart-c922a.web.app/",
            githubUrl: "https://github.com/amritsugandh/VoteSmart"
        },
        {
            id: "p2",
            title: "Bus Booking Portal",
            category: "Full-Stack Dev",
            tags: ["React", "Firebase", "Live Tracking"],
            description: "A comprehensive transportation ecosystem designed for scale. This platform features a high-fidelity seat selection UI, secure multi-provider authentication, and a real-time admin control panel. Leveraging Firebase's real-time capabilities, it ensures zero-latency booking updates and secure transaction handling, optimized for high-traffic environments.",
            image: "src/assets/p2.png",
            githubUrl: "https://github.com/amritsugandh/booking-bus-ticket"
        },
        {
            id: "p1",
            title: "AI Event Concierge",
            category: "Artificial Intelligence",
            tags: ["Gemini Pro", "Node.js", "Context-Aware"],
            description: "A next-generation AI assistant that redefines event planning. Built on Google's Gemini Pro, it maintains deep conversational context across multiple sessions, generating personalized itineraries and logistical solutions. The architecture handles complex natural language queries, turning vague ideas into actionable event plans with real-time suggestions and persistence.",
            image: "src/assets/p1.png",
            liveUrl: "https://personal-event-ai-concierge.vercel.app",
            githubUrl: "https://github.com/amritsugandh/Personal-Event-AI-Concierge"
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
            excerpt: "Exploring how large language models can transform static event planning into dynamic, interactive concierge experiences.",
            link: "https://en.wikipedia.org/wiki/Gemini_(chatbot)",
            content: `
                <p>Large Language Models (LLMs) like Google's Gemini are revolutionizing how we interact with digital services. In the context of event planning, these AI systems can move beyond simple search results to provide truly personalized, context-aware recommendations.</p>
                <h4 class="text-white font-bold text-lg mt-4 mb-2">Key Integration Strategies:</h4>
                <ul class="list-disc pl-5 space-y-2">
                    <li><strong>Contextual Understanding:</strong> Using RAG (Retrieval-Augmented Generation) to feed specific event data into the model.</li>
                    <li><strong>Real-time Itinerary Generation:</strong> Dynamically adjusting plans based on user feedback during the conversation.</li>
                    <li><strong>Sentiment Analysis:</strong> Gauging user excitement or hesitation to refine suggestions.</li>
                </ul>
                <p class="mt-4">The challenge lies in maintaining a persistent state across multiple sessions, which is where technologies like Firebase and robust session management come into play.</p>
            `
        },
        {
            title: "The Rise of Glassmorphism in Modern Dashboards",
            date: "April 15, 2026",
            category: "Design",
            excerpt: "Why translucent interfaces are more than just a trend and how they improve hierarchy in complex data environments.",
            link: "https://en.wikipedia.org/wiki/Glassmorphism",
            content: `
                <p>Glassmorphism has emerged as one of the most significant design trends of the mid-2020s. Characterized by background blur, translucent layers, and subtle borders, it creates a sense of depth and hierarchy without the heavy shadows of traditional skeuomorphism.</p>
                <h4 class="text-white font-bold text-lg mt-4 mb-2">Why It Works:</h4>
                <ul class="list-disc pl-5 space-y-2">
                    <li><strong>Visual Hierarchy:</strong> The varying levels of blur naturally draw the eye to the most important "surface".</li>
                    <li><strong>Aesthetic Appeal:</strong> It feels modern, clean, and premium, especially when paired with vibrant background colors.</li>
                    <li><strong>Context Preservation:</strong> Users can still see a hint of the underlying content, maintaining their orientation within the app.</li>
                </ul>
                <p class="mt-4">When implementing glassmorphism, it's crucial to ensure accessibility by maintaining high contrast ratios for text and interactive elements.</p>
            `
        },
        {
            title: "Scaling Bus Ticket Platforms with Firebase",
            date: "April 10, 2026",
            category: "DevOps",
            excerpt: "Lessons learned from implementing real-time seat booking and session synchronization in a production environment.",
            link: "https://firebase.google.com/docs/firestore",
            content: `
                <p>Building a real-time booking system requires low-latency data synchronization and robust concurrency handling. Firebase Firestore provides an excellent foundation for these requirements through its real-time listeners and atomic transactions.</p>
                <h4 class="text-white font-bold text-lg mt-4 mb-2">Technical Challenges Overcome:</h4>
                <ul class="list-disc pl-5 space-y-2">
                    <li><strong>Race Conditions:</strong> Using Firestore transactions to ensure two users can't book the same seat simultaneously.</li>
                    <li><strong>State Management:</strong> Synchronizing local UI state with the cloud database to provide instant feedback.</li>
                    <li><strong>Offline Persistence:</strong> Leveraging Firebase's built-in offline capabilities to handle spotty mobile connections.</li>
                </ul>
                <p class="mt-4">This project demonstrated that serverless architectures can handle complex, transactional workloads when designed with the right data patterns.</p>
            `
        },
        {
            title: "The Future of Web Performance: Core Web Vitals",
            date: "April 05, 2026",
            category: "Performance",
            excerpt: "Understanding how Google's new performance metrics are reshaping the way we build and optimize websites for users.",
            link: "https://web.dev/vitals/",
            content: `
                <p>Core Web Vitals have become the gold standard for measuring user experience on the web. As developers, we must prioritize metrics like LCP, FID, and CLS to ensure our sites are not only fast but also stable and responsive.</p>
                <p>Optimizing for these vitals often involves advanced techniques like image lazy-loading, critical CSS extraction, and minimizing main-thread blocking JavaScript.</p>
            `
        },
        {
            title: "Building Scalable APIs with Django Rest Framework",
            date: "March 28, 2026",
            category: "Backend",
            excerpt: "A deep dive into creating robust, maintainable, and secure APIs for modern frontend applications.",
            link: "https://www.django-rest-framework.org/",
            content: `
                <p>Django Rest Framework (DRF) is a powerful and flexible toolkit for building Web APIs. It provides out-of-the-box support for serialization, authentication, and viewsets, allowing developers to focus on business logic rather than boilerplate code.</p>
                <p>In this article, we explore how to leverage DRF's built-in features to create APIs that can scale to millions of requests while maintaining security and performance.</p>
            `
        },
        {
            title: "Mastering GSAP for Web Animations",
            date: "March 20, 2026",
            category: "Animation",
            excerpt: "How to create smooth, high-performance animations that wow users without sacrificing performance.",
            link: "https://gsap.com/docs/v3/",
            content: `
                <p>GreenSock Animation Platform (GSAP) is the industry standard for high-performance web animations. Whether you're creating simple hover effects or complex scroll-triggered sequences, GSAP provides the tools you need to bring your interfaces to life.</p>
                <p>We'll look at techniques for staggering animations, creating timelines, and optimizing for smooth 60fps performance across all devices.</p>
            `
        }
    ]
};

if (typeof module !== 'undefined') {
    module.exports = portfolioData;
}
