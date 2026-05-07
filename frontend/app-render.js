// app-render.js
// Handles the dynamic rendering of portfolio content from the data store.

const db = (typeof firebase !== 'undefined') ? firebase.firestore() : null;

// Helper to fix image paths coming from old database entries or local root
const fixImagePath = (path) => {
    if (!path || path.startsWith('http') || path.includes('src/assets/')) return path;
    const cleanPath = path.startsWith('./') ? path.substring(2) : path;
    return `src/assets/${cleanPath}`;
};

const renderPortfolio = async () => {
    let data = (typeof portfolioData !== 'undefined') ? portfolioData : null;

    // Try fetching from Firebase if available
    if (db) {
        try {
            const profileDoc = await db.collection('profile').doc('info').get();
            if (profileDoc.exists) {
                data.profile = profileDoc.data();
            }

            const projectsSnap = await db.collection('projects').get();
            if (!projectsSnap.empty) {
                const dbProjects = projectsSnap.docs.map(doc => doc.data());
                const localProjects = data.projects || [];
                const mergedProjects = [...localProjects];
                
                dbProjects.forEach(dbProject => {
                    if (!mergedProjects.some(p => p.id === dbProject.id)) {
                        mergedProjects.push(dbProject);
                    } else {
                        // Update local project with DB data if it matches ID
                        const idx = mergedProjects.findIndex(p => p.id === dbProject.id);
                        mergedProjects[idx] = dbProject;
                    }
                });
                data.projects = mergedProjects;
            }

            const skillsDoc = await db.collection('skills').doc('list').get();
            if (skillsDoc.exists) {
                // Merge database skills with local skills, keeping both
                const dbSkills = Object.values(skillsDoc.data());
                const localSkills = data.skills || [];
                const mergedSkills = [...localSkills];
                
                dbSkills.forEach(dbSkill => {
                    if (!mergedSkills.some(s => s.name === dbSkill.name)) {
                        mergedSkills.push(dbSkill);
                    }
                });
                data.skills = mergedSkills;
            }

            const blogsSnap = await db.collection('blogs').get();
            if (!blogsSnap.empty) {
                data.blogs = blogsSnap.docs.map(doc => doc.data());
            }
        } catch (err) {
            console.warn("Firebase fetch failed, using local fallback.", err);
        }
    }

    if (!data) return;

    const { profile, projects, skills, blogs } = data;

    // 1. Render Profile (Hero & About)
    const heroTagline = document.getElementById('hero-tagline');
    if (heroTagline) heroTagline.textContent = profile.tagline;

    const aboutHeadline = document.getElementById('about-headline');
    if (aboutHeadline) aboutHeadline.textContent = profile.aboutHeadline;

    const aboutBioContainer = document.getElementById('about-bio');
    if (aboutBioContainer) {
        aboutBioContainer.innerHTML = `
            <p class="text-slate-400 mb-6 leading-relaxed">${profile.aboutBio1}</p>
            <p class="text-slate-400 mb-8 leading-relaxed">${profile.aboutBio2}</p>
        `;
    }

    // Dynamic Resume Link
    const resumeBtn = document.getElementById('resume-link');
    if (resumeBtn && profile.resumeUrl) {
        resumeBtn.href = profile.resumeUrl;
        // If it's an external link (Drive/Dropbox), remove 'download' attribute for better UX
        if (profile.resumeUrl.startsWith('http')) {
            resumeBtn.removeAttribute('download');
            resumeBtn.target = "_blank";
        }
    }

    // Dynamic Project Counter
    const projectCounter = document.getElementById('project-counter');
    if (projectCounter && profile.projectCount) {
        projectCounter.textContent = profile.projectCount;
    }

    // 2. Render Projects
    const projectGallery = document.getElementById('project-gallery');
    if (projectGallery) {
        projectGallery.innerHTML = projects.map((project, index) => `
            <div class="minimal-card fade-up-element w-full md:w-[480px]" style="transition-delay: ${index * 100}ms;">
                <div class="minimal-card-image">
                    <img src="${fixImagePath(project.image)}" alt="${project.title}">
                </div>
                <div class="minimal-card-body">
                    <h4 class="minimal-card-title">${project.title}</h4>
                    <p class="minimal-card-description">
                        ${project.description.split('. ')[0]}.
                    </p>
                    <div class="minimal-card-footer">
                        ${project.liveUrl ? `
                        <a href="${project.liveUrl}" target="_blank" class="minimal-link">
                            <i class="ph ph-rocket-launch"></i> Live Demo
                        </a>` : ''}
                        <a href="${project.githubUrl}" target="_blank" class="minimal-link">
                            <i class="ph ph-github-logo"></i> Source Code
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 3. Render Skills
    const skillsContainer = document.getElementById('skills-grid-container');
    if (skillsContainer) {
        const getIcon = (name) => {
            const n = name.toLowerCase();
            if (n.includes('python')) return 'ph-file-py';
            if (n.includes('c/c++')) return 'ph-terminal-window';
            if (n.includes('java')) return 'ph-coffee';
            if (n.includes('html')) return 'ph-globe';
            if (n.includes('react')) return 'ph-atom';
            if (n.includes('machine learning')) return 'ph-brain';
            if (n.includes('sql')) return 'ph-database';
            if (n.includes('opencv')) return 'ph-camera';
            if (n.includes('office')) return 'ph-envelope-simple';
            return 'ph-code';
        };

        skillsContainer.innerHTML = skills.map((skill, index) => {
            const isOffice = skill.name.toLowerCase().includes('office');
            const n = skill.name.toLowerCase();
            let colorType = 'brand';
            if (n.includes('python')) colorType = 'emerald';
            if (n.includes('c/')) colorType = 'blue';
            if (n.includes('java')) colorType = 'orange';
            if (n.includes('html')) colorType = 'sky';
            if (n.includes('react')) colorType = 'blue';
            if (n.includes('machine learning')) colorType = 'fuchsia';
            if (n.includes('sql')) colorType = 'slate';
            if (n.includes('opencv')) colorType = 'teal';
            if (n.includes('office')) colorType = 'rose';

            return `
                <div
                    class="skill-tile flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300 group ${isOffice ? 'sm:col-span-2' : ''}"
                    data-color="${colorType}"
                    style="transition-delay: ${index * 50}ms;">
                    <div class="skill-icon-box w-10 h-10 shrink-0 flex items-center justify-center rounded-xl border text-xl group-hover:scale-110 transition-transform">
                        <i class="ph ${getIcon(skill.name)}"></i>
                    </div>
                    <div class="flex-1">
                        <h4 class="skill-title text-xs font-bold transition-colors leading-tight">${skill.name}</h4>
                        <p class="skill-level text-[10px] font-medium mt-0.5">${skill.level}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 4. Render Dynamic Randomized Blogs
    const blogGrid = document.querySelector('#blog .grid');
    if (blogGrid && blogs && blogs.length > 0) {
        // Shuffle and pick 3
        const shuffledBlogs = [...blogs].sort(() => 0.5 - Math.random());
        const selectedBlogs = shuffledBlogs.slice(0, 3);
        window.currentSelectedBlogs = selectedBlogs;

        blogGrid.innerHTML = selectedBlogs.map((blog, index) => {
            let colorClass = "brand-light";
            let iconClass = "ph-brain";
            let borderHover = "hover:border-brand-light/30";
            
            const cat = blog.category.toLowerCase();
            if (cat.includes('design')) {
                colorClass = "fuchsia-400";
                iconClass = "ph-palette";
                borderHover = "hover:border-fuchsia-500/30";
            } else if (cat.includes('devops') || cat.includes('backend')) {
                colorClass = "emerald-400";
                iconClass = "ph-stack";
                borderHover = "hover:border-emerald-400/30";
            } else if (cat.includes('performance')) {
                colorClass = "sky-400";
                iconClass = "ph-gauge";
                borderHover = "hover:border-sky-400/30";
            }

            return `
                <article
                    class="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden ${borderHover} transition-all duration-500 fade-up-element"
                    style="transition-delay: ${index * 100}ms;">
                    <div class="aspect-video relative overflow-hidden">
                        <div class="absolute inset-0 bg-white/5 blur-2xl group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-30"></div>
                        <div class="absolute inset-0 flex items-center justify-center bg-darker/60 group-hover:bg-darker/40 transition-colors">
                            <i class="ph ${iconClass} text-5xl text-${colorClass} group-hover:scale-110 transition-transform"></i>
                        </div>
                    </div>
                    <div class="p-8">
                        <div class="flex items-center gap-3 mb-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">
                            <span>${blog.date}</span>
                            <span class="w-1 h-1 rounded-full bg-slate-700"></span>
                            <span>${blog.category}</span>
                        </div>
                        <h4 class="text-xl font-bold text-white mb-4 group-hover:text-brand-light transition-colors">
                            ${blog.title}
                        </h4>
                        <p class="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                            ${blog.excerpt}
                        </p>
                        <button onclick="openBlogModal(${index})" class="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all">
                            Read More <i class="ph ph-arrow-up-right"></i>
                        </button>
                    </div>
                </article>
            `;
        }).join('');
    }

    // Apply specific "Fresher" or manual value overrides from data if necessary
    // (This ensures values like "Fresher" aren't overwritten by stale logic)
    const expText = document.querySelector('h4[class*="tracking-tighter"]');
    if (expText && profile.yearsExp) expText.textContent = profile.yearsExp;

    // Notify that rendering is complete so GSAP can start
    document.dispatchEvent(new CustomEvent('portfolioRendered'));
};

// Start rendering
document.addEventListener('DOMContentLoaded', renderPortfolio);
