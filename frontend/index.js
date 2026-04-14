// Wake up the Render backend as soon as the page loads
fetch(CONFIG.pingEndpoint, { method: 'GET' }).catch(() => {});

// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
	'.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
	if (smallMenu.classList.contains('header__sm-menu--active')) {
		smallMenu.classList.remove('header__sm-menu--active')
	} else {
		smallMenu.classList.add('header__sm-menu--active')
	}
	if (headerHamMenuBtn.classList.contains('d-none')) {
		headerHamMenuBtn.classList.remove('d-none')
		headerHamMenuCloseBtn.classList.add('d-none')
	} else {
		headerHamMenuBtn.classList.add('d-none')
		headerHamMenuCloseBtn.classList.remove('d-none')
	}
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
	headerSmallMenuLinks[i].addEventListener('click', () => {
		smallMenu.classList.remove('header__sm-menu--active')
		headerHamMenuBtn.classList.remove('d-none')
		headerHamMenuCloseBtn.classList.add('d-none')
	})
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
	location.href = 'index.html'
})

// ----------------------------------------------------------------------
// Journey injection script
// ----------------------------------------------------------------------

const JOURNEY_JSON_PATH = CONFIG.journeyJsonPath;
const FALLBACK_CARDS = [
	{
		id: "proj-launch",
		title: "Project Launch — June 2024",
		excerpt: "Launched a small game prototype exploring physics-based puzzles. Built with Phaser and React — learned about optimization and art pipelines.",
		date: "2024-06-12",
		meta: "Los Angeles · Prototype",
		image: "./assets/jpeg/project-mockup-example.jpeg",
		imageAlt: "Screenshot of project launch",
		url: "https://example.com/article-1"
	},
	{
		id: "graduation",
		title: "Graduation Ceremony",
		excerpt: "Graduated with a degree in Computer Science. Highlights included my capstone on web accessibility and a summer internship.",
		date: "2023-05-15",
		meta: null,
		image: "./assets/jpeg/graduation-photo.jpeg",
		imageAlt: "Graduation photo",
		url: "./journey/graduation.html"
	},
	{
		id: "volunteer",
		title: "Volunteer Work — Food Bank",
		excerpt: "Volunteered weekly — learned logistics, teamwork, and community outreach.",
		date: "2022-11",
		meta: null,
		image: null,
		imageAlt: null,
		url: null
	}
];

// format date to human-readable e.g. "Jun 12, 2024"
function formatDate(iso) {
	if (!iso) return "";
	try {
		const dt = new Date(iso);
		if (isNaN(dt)) return iso; // fallback if partial like "2022-11"
		return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
	} catch (e) {
		return iso;
	}
}

function createCardNode(card) {
	// choose tag: anchor if clickable, article if not
	const wrapper = card.url
		? document.createElement("a")
		: document.createElement("article");

	// common classes and attributes
	wrapper.className = "journey__card" + (card.url ? " journey__card--link" : "");
	if (card.url) {
		wrapper.setAttribute("href", card.url);
		wrapper.setAttribute("rel", "noopener noreferrer");
		wrapper.setAttribute("target", "_blank");
		wrapper.setAttribute("aria-label", card.title);
	} else {
		// for articles give an accessible name by id
		if (card.id) wrapper.setAttribute("aria-labelledby", `${card.id}-title`);
	}

	// body
	const body = document.createElement("div");
	body.className = "journey__card-body";

	const title = document.createElement("h3");
	title.className = "journey__card-title";
	title.id = card.id ? `${card.id}-title` : undefined;
	title.textContent = card.title || "Untitled";

	const excerpt = document.createElement("p");
	excerpt.className = "journey__card-excerpt";
	excerpt.textContent = card.excerpt || "";

	const meta = document.createElement("p");
	meta.className = "journey__card-meta";
	const dateText = formatDate(card.date);
	meta.innerHTML = [
		card.meta ? `${card.meta}` : "",
		dateText ? `<time datetime="${card.date}">${dateText}</time>` : ""
	].filter(Boolean).join(" · ");

	body.appendChild(title);
	body.appendChild(excerpt);
	body.appendChild(meta);

	// optional action button for non-clickable cards
	if (!card.url) {
		const actions = document.createElement("div");
		actions.className = "journey__card-actions";
		// only show Read button if local url exists (you could extend data with 'readUrl')
		if (card.readUrl) {
			const btn = document.createElement("a");
			btn.className = "btn btn--sm";
			btn.setAttribute("href", card.readUrl);
			btn.setAttribute("target", "_blank");
			btn.setAttribute("rel", "noopener noreferrer");
			btn.textContent = "Read";
			actions.appendChild(btn);
		}
		if (actions.children.length) body.appendChild(actions);
	}

	wrapper.appendChild(body);

	// optional media
	if (card.image) {
		const media = document.createElement("div");
		media.className = "journey__card-media";
		const img = document.createElement("img");
		img.setAttribute("src", card.image);
		img.setAttribute("alt", card.imageAlt || "");
		img.setAttribute("loading", "lazy");
		// optional: set width/height attributes if you have them to help layout shift
		media.appendChild(img);
		wrapper.appendChild(media);
	}

	return wrapper;
}

async function loadAndRenderCards() {
	const container = document.getElementById("journeyCards");
	if (!container) return console.warn("Journey container not found");

	// Try to fetch journey.json (fallback to inline array if fetch fails)
	let cards = null;
	try {
		const resp = await fetch(JOURNEY_JSON_PATH, { cache: "no-cache" });
		if (resp.ok) {
			cards = await resp.json();
		} else {
			cards = FALLBACK_CARDS;
		}
	} catch (e) {
		// network error or file not present — use fallback
		cards = FALLBACK_CARDS;
	}

	// clear container
	container.innerHTML = "";

	// create nodes and append
	for (const card of cards) {
		const node = createCardNode(card);
		container.appendChild(node);
	}
}

// run on DOM ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", loadAndRenderCards);
} else {
	loadAndRenderCards();
}

// ----------------------------------------------------------------------
// Publications injection script
// ----------------------------------------------------------------------

async function loadAndRenderPublications() {
	const container = document.getElementById("publicationsList");
	if (!container) return;

	let pubs = [];
	try {
		const resp = await fetch(CONFIG.publicationsJsonPath, { cache: "no-cache" });
		if (resp.ok) pubs = await resp.json();
	} catch (e) {
		return;
	}

	container.innerHTML = "";

	for (let i = 0; i < pubs.length; i++) {
		const pub = pubs[i];
		const li = document.createElement("li");
		li.className = "publications-list__item";

		// Bold "Foo, R. H." in the authors string
		const authorsHtml = pub.authors
			? pub.authors.replace(/Foo, R\. H\./g, "<strong>Foo, R. H.</strong>")
			: "";

		// hanging indent works: first line flush, wrapped lines indented
		let citation = `\u00a0${authorsHtml} (${pub.year}). ${pub.title}. <em>${pub.venue}</em>`;
		if (pub.pages) citation += `, ${pub.pages}.`;

		const text = document.createElement("p");
		text.className = "publications-list__citation";
		text.innerHTML = citation;
		li.appendChild(text);

		if (pub.doi) {
			const link = document.createElement("a");
			link.href = pub.doi;
			link.target = "_blank";
			link.rel = "noopener noreferrer";
			link.className = "publications-list__doi";
			link.textContent = pub.doi;
			li.appendChild(link);
		}

		container.appendChild(li);
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", loadAndRenderPublications);
} else {
	loadAndRenderPublications();
}

// ----------------------------------------------------------------------
// Email obfuscation — keep address out of static HTML
// ----------------------------------------------------------------------
;(function () {
	const el = document.getElementById('email-link')
	if (el) el.href = 'mailto:' + CONFIG.emailUser + '@' + CONFIG.emailDomain
})()

// ----------------------------------------------------------------------
// Contact form
// ----------------------------------------------------------------------
const CONTACT_ENDPOINT = CONFIG.contactEndpoint

const contactForm = document.querySelector('.contact__form')
if (contactForm) {
	let lastSubmit = 0

	contactForm.addEventListener('submit', async (e) => {
		e.preventDefault()

		// Client-side guard mirrors the server-side rate limit
		if (Date.now() - lastSubmit < 10000) {
			showFormMsg('Please wait 10 seconds before submitting again.', false)
			return
		}

		const btn = contactForm.querySelector('button[type="submit"]')
		btn.disabled = true
		btn.textContent = 'Sending\u2026'

		try {
			const resp = await fetch(CONTACT_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name:    contactForm.querySelector('#name').value,
					email:   contactForm.querySelector('#email').value,
					message: contactForm.querySelector('#message').value,
					website: contactForm.querySelector('[name="website"]').value,
				}),
			})
			const data = await resp.json()
			if (resp.ok) {
				lastSubmit = Date.now()
				contactForm.reset()
			}
			showFormMsg(resp.ok ? data.message : data.error, resp.ok)
		} catch {
			showFormMsg('Network error. Please try again.', false)
		} finally {
			btn.disabled = false
			btn.textContent = 'Submit'
		}
	})
}

function showFormMsg(msg, ok) {
	let el = document.getElementById('contact-form-msg')
	if (!el) {
		el = document.createElement('p')
		el.id = 'contact-form-msg'
		el.style.cssText = 'margin-top:1.5rem;font-size:1.6rem;font-weight:600;text-align:right;'
		document.querySelector('.contact__form-container').appendChild(el)
	}
	el.textContent = msg
	el.style.color = ok ? '#2ecc71' : '#e74c3c'
}