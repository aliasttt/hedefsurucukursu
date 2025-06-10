// CMS Data Loader
class CMSDataLoader {
    constructor() {
        this.data = {};
        this.loaded = false;
    }

    async loadAll() {
        try {
            // Load site settings
            this.data.settings = await this.fetchJSON('/data/settings.json');
            this.data.contact = await this.fetchJSON('/data/contact.json');
            this.data.social = await this.fetchJSON('/data/social.json');
            
            // Load page specific data based on current page
            const currentPage = this.getCurrentPage();
            if (currentPage) {
                this.data.page = await this.fetchJSON(`/data/${currentPage}.json`);
            }

            this.loaded = true;
            this.updatePage();
        } catch (error) {
            console.error('Error loading CMS data:', error);
        }
    }

    async fetchJSON(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${path}:`, error);
            return null;
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') return 'home';
        if (path === '/hakkimizda/') return 'about';
        if (path === '/kursumuz/') return 'courses';
        if (path === '/duyurular/') return 'announcements';
        if (path === '/sikca-sorulan-sorular/') return 'faq';
        if (path === '/ekibimiz/') return 'team';
        return null;
    }

    updatePage() {
        if (!this.loaded) return;

        // Update meta tags
        if (this.data.settings) {
            document.title = this.data.settings.site_title || 'Hedef Sürücü Kursu';
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.content = this.data.settings.meta_description;
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) metaKeywords.content = this.data.settings.meta_keywords;
        }

        // Update contact info in footer
        if (this.data.contact) {
            const footerAddress = document.querySelector('.footer-address');
            if (footerAddress) footerAddress.textContent = this.data.contact.address;

            const footerPhone = document.querySelector('.footer-phone');
            if (footerPhone) {
                footerPhone.textContent = this.data.contact.phone;
                footerPhone.href = `tel:${this.data.contact.phone}`;
            }

            const footerEmail = document.querySelector('.footer-email');
            if (footerEmail) {
                footerEmail.textContent = this.data.contact.email;
                footerEmail.href = `mailto:${this.data.contact.email}`;
            }

            const footerWhatsapp = document.querySelector('.footer-whatsapp');
            if (footerWhatsapp) {
                footerWhatsapp.href = this.data.contact.whatsapp;
            }
        }

        // Update social media links
        if (this.data.social) {
            const socialLinks = document.querySelectorAll('.social-link');
            socialLinks.forEach(link => {
                const type = link.dataset.type;
                if (this.data.social[type]) {
                    link.href = this.data.social[type];
                }
            });
        }

        // Update page specific content
        if (this.data.page) {
            this.updatePageContent();
        }
    }

    updatePageContent() {
        const page = this.data.page;
        if (!page) return;

        // Update page title
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle && page.title) {
            pageTitle.textContent = page.title;
        }

        // Update page description
        const pageDesc = document.querySelector('.page-description');
        if (pageDesc && page.description) {
            pageDesc.textContent = page.description;
        }

        // Update page specific content based on page type
        switch (this.getCurrentPage()) {
            case 'home':
                this.updateHomePage();
                break;
            case 'about':
                this.updateAboutPage();
                break;
            case 'courses':
                this.updateCoursesPage();
                break;
            case 'announcements':
                this.updateAnnouncementsPage();
                break;
            case 'faq':
                this.updateFAQPage();
                break;
            case 'team':
                this.updateTeamPage();
                break;
        }
    }

    updateHomePage() {
        const page = this.data.page;
        if (!page) return;

        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.textContent = page.hero_title;

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = page.hero_subtitle;

        const heroImage = document.querySelector('.hero-image');
        if (heroImage && page.hero_image) {
            heroImage.src = page.hero_image;
            heroImage.alt = page.hero_title;
        }

        // Update about summary
        const aboutSummary = document.querySelector('.about-summary');
        if (aboutSummary) aboutSummary.textContent = page.about_summary;

        // Update featured courses
        if (page.featured_courses) {
            const coursesContainer = document.querySelector('.featured-courses');
            if (coursesContainer) {
                coursesContainer.innerHTML = page.featured_courses.map(course => `
                    <div class="course-card">
                        <img src="${course.image}" alt="${course.title}" class="course-image">
                        <h3 class="course-title">${course.title}</h3>
                        <p class="course-description">${course.description}</p>
                        <a href="${course.link}" class="course-link">Detaylı Bilgi</a>
                    </div>
                `).join('');
            }
        }
    }

    updateAboutPage() {
        const page = this.data.page;
        if (!page) return;

        // Update main content
        const mainContent = document.querySelector('.about-content');
        if (mainContent && page.content) {
            mainContent.innerHTML = page.content;
        }

        // Update features
        if (page.features) {
            const featuresContainer = document.querySelector('.about-features');
            if (featuresContainer) {
                featuresContainer.innerHTML = page.features.map(feature => `
                    <div class="feature-item">
                        <i class="${feature.icon}"></i>
                        <h3>${feature.title}</h3>
                        <p>${feature.description}</p>
                    </div>
                `).join('');
            }
        }
    }

    updateCoursesPage() {
        const page = this.data.page;
        if (!page) return;

        // Update course list
        if (page.course_list) {
            const coursesContainer = document.querySelector('.courses-list');
            if (coursesContainer) {
                coursesContainer.innerHTML = page.course_list.map(course => `
                    <div class="course-card">
                        <img src="${course.image}" alt="${course.title}" class="course-image">
                        <div class="course-content">
                            <h3 class="course-title">${course.title}</h3>
                            <p class="course-description">${course.description}</p>
                            <div class="course-details">
                                <span class="course-price">${course.price}</span>
                                <span class="course-duration">${course.duration}</span>
                            </div>
                            <div class="course-features">
                                ${course.features.map(feature => `
                                    <span class="feature">${feature}</span>
                                `).join('')}
                            </div>
                            <a href="/kursumuz/${course.slug}/" class="course-link">Detaylı Bilgi</a>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    updateAnnouncementsPage() {
        const page = this.data.page;
        if (!page) return;

        // Update announcements list
        if (page.announcement_list) {
            const announcementsContainer = document.querySelector('.announcements-list');
            if (announcementsContainer) {
                announcementsContainer.innerHTML = page.announcement_list.map(announcement => `
                    <div class="announcement-card">
                        <img src="${announcement.image}" alt="${announcement.title}" class="announcement-image">
                        <div class="announcement-content">
                            <h3 class="announcement-title">${announcement.title}</h3>
                            <p class="announcement-date">${new Date(announcement.date).toLocaleDateString('tr-TR')}</p>
                            <div class="announcement-text">${announcement.content}</div>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    updateFAQPage() {
        const page = this.data.page;
        if (!page) return;

        // Update FAQ list
        if (page.faq_list) {
            const faqContainer = document.querySelector('.faq-list');
            if (faqContainer) {
                faqContainer.innerHTML = page.faq_list.map(faq => `
                    <div class="faq-item">
                        <h3 class="faq-question">${faq.question}</h3>
                        <div class="faq-answer">${faq.answer}</div>
                    </div>
                `).join('');
            }
        }
    }

    updateTeamPage() {
        const page = this.data.page;
        if (!page) return;

        // Update team members
        if (page.team_members) {
            const teamContainer = document.querySelector('.team-members');
            if (teamContainer) {
                teamContainer.innerHTML = page.team_members.map(member => `
                    <div class="team-member">
                        <img src="${member.photo}" alt="${member.name}" class="member-photo">
                        <h3 class="member-name">${member.name}</h3>
                        <p class="member-position">${member.position}</p>
                        <p class="member-description">${member.description}</p>
                        <div class="member-social">
                            ${member.social_media.instagram ? `
                                <a href="${member.social_media.instagram}" class="social-link" target="_blank">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            ` : ''}
                            ${member.social_media.facebook ? `
                                <a href="${member.social_media.facebook}" class="social-link" target="_blank">
                                    <i class="fab fa-facebook"></i>
                                </a>
                            ` : ''}
                            ${member.social_media.linkedin ? `
                                <a href="${member.social_media.linkedin}" class="social-link" target="_blank">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                `).join('');
            }
        }
    }
}

// Initialize and load data
const cmsLoader = new CMSDataLoader();
document.addEventListener('DOMContentLoaded', () => {
    cmsLoader.loadAll();
}); 