// app-render.js
// Handles the dynamic rendering of portfolio content from the data store.

const db = (typeof firebase !== 'undefined') ? firebase.firestore() : null;

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
                data.projects = projectsSnap.docs.map(doc => doc.data());
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
        } catch (err) {
            console.warn("Firebase fetch failed, using local fallback.", err);
        }
    }

    if (!data) return;

    const { profile, projects, skills } = data;

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
            <div
                class="group flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-light/40 transition-all duration-500 fade-up-element h-full"
                style="transition-delay: ${index * 100}ms;">
                <div class="h-48 overflow-hidden relative">
                    <img src="${project.image}" alt="${project.title}"
                        class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700">
                    <div class="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors"></div>
                </div>

                <div class="p-6 flex flex-col flex-1">
                    <div class="flex gap-2 mb-4">
                        ${project.tags.map(tag => `
                            <span class="text-[10px] font-bold px-2 py-0.5 bg-brand-light/10 text-brand-light rounded-full uppercase tracking-tighter border border-brand-light/20">${tag}</span>
                        `).join('')}
                    </div>
                    <h4 class="text-xl font-bold text-white mb-2 group-hover:text-brand-light transition-colors">${project.title}</h4>
                    <p class="text-xs text-slate-400 mb-6 line-clamp-3 leading-relaxed flex-1">
                        ${project.description}
                    </p>
                    <div class="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                        ${project.liveUrl ? `
                            <a href="${project.liveUrl}" target="_blank"
                                class="text-[11px] font-bold text-white hover:text-brand-light flex items-center gap-1.5 transition-colors">
                                LIVE <i class="ph ph-rocket-launch"></i>
                            </a>
                        ` : ''}
                        <a href="${project.githubUrl}" target="_blank"
                            class="text-[11px] font-bold text-slate-500 hover:text-white flex items-center gap-1.5 transition-colors">
                            CODE <i class="ph ph-github-logo"></i>
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

    // Apply specific "Fresher" or manual value overrides from data if necessary
    // (This ensures values like "Fresher" aren't overwritten by stale logic)
    const expText = document.querySelector('h4[class*="tracking-tighter"]');
    if (expText && profile.yearsExp) expText.textContent = profile.yearsExp;

    // Notify that rendering is complete so GSAP can start
    document.dispatchEvent(new CustomEvent('portfolioRendered'));
};

// Start rendering
document.addEventListener('DOMContentLoaded', renderPortfolio);
