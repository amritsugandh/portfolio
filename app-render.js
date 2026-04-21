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
                data.skills = Object.values(skillsDoc.data());
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
        skillsContainer.innerHTML = skills.map((skill, index) => `
            <div
                class="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-light/30 transition-all group fade-up-element"
                style="transition-delay: ${index * 50}ms;">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-brand-light/10 flex items-center justify-center text-brand-light text-xl group-hover:scale-110 transition-transform">
                        <i class="ph ph-code"></i>
                    </div>
                    <div>
                        <h4 class="text-white font-bold group-hover:text-brand-light transition-colors">${skill.name}</h4>
                        <p class="text-[10px] text-brand-light uppercase tracking-widest font-bold">${skill.category}</p>
                    </div>
                </div>
                <div class="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-gradient-to-r from-brand-light to-brand-dark h-full rounded-full w-[85%] group-hover:w-full transition-all duration-1000"></div>
                </div>
            </div>
        `).join('');
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
