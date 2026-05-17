/* =========================================================
   Jason Ding personal site
   Shared site behavior: nav, theme, typed text, footer
   ========================================================= */

(function () {
	'use strict';

	const NAV_LINKS = [
		{ href: '/index.html',       label: 'Home',        match: ['/', '/index', '/index.html'] },
		{ href: '/experiences.html', label: 'Experiences', match: ['/experiences', '/experiences.html'] },
		{ href: '/projects.html',    label: 'Projects',    match: ['/projects', '/projects.html'] },
		{ href: '/courses.html',     label: 'Courses',     match: ['/courses', '/courses.html'] },
		{ href: '/awards.html',      label: 'Awards',      match: ['/awards', '/awards.html'] },
		{ href: '/other.html',       label: 'Hobbies',     match: ['/other', '/other.html'] },
		{ href: '/contact.html',     label: 'Contact',     match: ['/contact', '/contact.html'] }
	];

	const LOGO_SRC = 'https://i.ibb.co/3RCzP0V/pixil-frame-0.png';

	function pathMatches(href) {
		const path = window.location.pathname.replace(/\/+$/, '') || '/';
		return href.match.some(m => m === path || m.replace(/\.html$/, '') === path);
	}

	function buildNav() {
		const mount = document.getElementById('site-nav');
		if (!mount) return;

		const links = NAV_LINKS.map(link => {
			const active = pathMatches(link) ? 'is-active' : '';
			return `<li><a href="${link.href}" class="${active}">${link.label}</a></li>`;
		}).join('');

		mount.className = 'site-nav';
		mount.setAttribute('role', 'navigation');
		mount.innerHTML = `
			<div class="site-nav__inner">
				<a href="/index.html" class="site-nav__brand">
					<img src="${LOGO_SRC}" alt="Jason Ding logo" />
					<span>Jason Ding</span>
				</a>
				<ul class="site-nav__links">${links}</ul>
				<div class="site-nav__actions">
					<button type="button" class="icon-btn theme-toggle" aria-label="Toggle theme" title="Toggle theme">
						<i class="fas fa-sun sun" aria-hidden="true"></i>
						<i class="fas fa-moon moon" aria-hidden="true"></i>
					</button>
					<button type="button" class="icon-btn nav-toggle" aria-label="Open menu" aria-expanded="false">
						<i class="fas fa-bars" aria-hidden="true"></i>
					</button>
				</div>
			</div>
		`;

		const navEl = mount;
		const toggleBtn = navEl.querySelector('.nav-toggle');
		toggleBtn.addEventListener('click', () => {
			const open = navEl.classList.toggle('is-open');
			toggleBtn.setAttribute('aria-expanded', String(open));
			toggleBtn.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
		});

		navEl.querySelectorAll('.site-nav__links a').forEach(a => {
			a.addEventListener('click', () => {
				navEl.classList.remove('is-open');
				toggleBtn.setAttribute('aria-expanded', 'false');
				toggleBtn.querySelector('i').className = 'fas fa-bars';
			});
		});

		const themeBtn = navEl.querySelector('.theme-toggle');
		themeBtn.addEventListener('click', toggleTheme);
	}

	function buildFooter() {
		const mount = document.getElementById('site-footer');
		if (!mount) return;
		mount.className = 'site-footer';
		mount.innerHTML = `
			<div class="container site-footer__inner">
				<div>&copy; ${new Date().getFullYear()} Jason Ding. Built with care.</div>
				<div>
					<a href="https://github.com/JasonDing9" aria-label="GitHub"><i class="fab fa-github"></i></a>
					&nbsp;
					<a href="https://www.linkedin.com/in/jasonding9/" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
					&nbsp;
					<a href="mailto:jasonding@berkeley.edu" aria-label="Email"><i class="fas fa-envelope"></i></a>
				</div>
			</div>
		`;
	}

	function applyTheme(theme) {
		document.documentElement.setAttribute('data-theme', theme);
		try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
	}

	function getInitialTheme() {
		try {
			const stored = localStorage.getItem('theme');
			if (stored === 'light' || stored === 'dark') return stored;
		} catch (e) { /* ignore */ }
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark' : 'light';
	}

	function toggleTheme() {
		const current = document.documentElement.getAttribute('data-theme') || 'light';
		applyTheme(current === 'dark' ? 'light' : 'dark');
	}

	function initReveal() {
		const items = document.querySelectorAll('.reveal');
		if (!items.length) return;

		if (!('IntersectionObserver' in window)) {
			items.forEach(el => el.classList.add('is-visible'));
			return;
		}

		const io = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					obs.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

		items.forEach(el => io.observe(el));
	}

	function init() {
		applyTheme(getInitialTheme());
		buildNav();
		buildFooter();
		initReveal();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
