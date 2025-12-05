// Smooth scroll spy for navigation
const observerOptions = {
  threshold: 0.3,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id")
      updateActiveNavLink(id)
    }
  })
}, observerOptions)

// Observe all sections
document.querySelectorAll("section[id]").forEach((section) => {
  observer.observe(section)
})

function updateActiveNavLink(activeId) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${activeId}`) {
      link.classList.add("active")
    }
  })
}

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle")
const navMenu = document.getElementById("navMenu")

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close menu when a link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Modal functionality
function openModal(serviceId) {
  const modalId = `modal${serviceId.charAt(0).toUpperCase() + serviceId.slice(1)}`
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeModal(serviceId) {
  const modalId = `modal${serviceId.charAt(0).toUpperCase() + serviceId.slice(1)}`
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }
}

// Close modal when clicking outside
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
      document.body.style.overflow = ""
    }
  })
})

// Portfolio filter
const filterBtns = document.querySelectorAll(".filter-btn")
const portfolioItems = document.querySelectorAll(".portfolio-item")

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    const filter = btn.getAttribute("data-filter")
    portfolioItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block"
        setTimeout(() => {
          item.style.opacity = "1"
        }, 10)
      } else {
        item.style.opacity = "0"
        setTimeout(() => {
          item.style.display = "none"
        }, 300)
      }
    })
  })
})

// Contact form
const contactForm = document.getElementById("contactForm")
const formToast = document.getElementById("formToast")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Show success message
  formToast.textContent = "✓ Message envoyé avec succès! Nous vous répondrons rapidement."
  formToast.classList.add("show")

  // Reset form
  contactForm.reset()

  // Hide toast after 4 seconds
  setTimeout(() => {
    formToast.classList.remove("show")
  }, 4000)
})

// Lightbox functionality
let currentImageIndex = 0
const lightbox = document.getElementById("lightbox")
const lightboxImage = document.getElementById("lightboxImage")
const portfolioImages = []

// Populate portfolio images
document.querySelectorAll(".portfolio-item img").forEach((img, index) => {
  portfolioImages.push(img.src)
})

document.querySelectorAll(".portfolio-item").forEach((item, index) => {
  item.addEventListener("click", () => {
    currentImageIndex = index
    openLightbox()
  })
})

function openLightbox() {
  lightbox.classList.add("active")
  lightboxImage.src = portfolioImages[currentImageIndex]
  document.body.style.overflow = "hidden"
}

function closeLightbox() {
  lightbox.classList.remove("active")
  document.body.style.overflow = ""
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % portfolioImages.length
  lightboxImage.src = portfolioImages[currentImageIndex]
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length
  lightboxImage.src = portfolioImages[currentImageIndex]
}

// Keyboard navigation for lightbox
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("active")) {
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
    if (e.key === "Escape") closeLightbox()
  }
})

// Fade in animations on scroll
const fadeElements = document.querySelectorAll("section")
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.animation = "fadeIn 0.8s ease"
      }
    })
  },
  { threshold: 0.1 },
)

fadeElements.forEach((el) => {
  fadeObserver.observe(el)
})
// Chatbot Logic
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');

// Ouvrir/Fermer le chatbot
chatbotToggle.addEventListener('click', () => {
  chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
  chatbotInput.focus();
});

function closeChatbot() {
  chatbotWindow.style.display = 'none';
}

// Envoyer un message
function sendMessage() {
  const message = chatbotInput.value.trim();
  if (!message) return;

  addMessage('user', message);
  chatbotInput.value = '';

  // Simuler une réponse du bot (à remplacer par une vraie logique plus tard)
  setTimeout(() => {
    const response = getBotResponse(message);
    addMessage('bot', response);
  }, 500);
}

// Ajouter un message à la conversation
function addMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = text;
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Répondre en fonction du contenu du site
function getBotResponse(question) {
  const lowerQuestion = question.toLowerCase();

  // Réponses basées sur les services
  if (lowerQuestion.includes('design') || lowerQuestion.includes('graphique')) {
    return "Nous proposons des créations visuelles uniques : logos, flyers, brochures, cartes de visite et bannières web. Besoin d'un devis ou d'un exemple ? 😊";
  } else if (lowerQuestion.includes('web') || lowerQuestion.includes('site')) {
    return "Nous créons des sites responsifs, rapides et optimisés SEO avec les dernières technologies. Vous voulez un site vitrine, e-commerce ou sur mesure ?";
  } else if (lowerQuestion.includes('branding') || lowerQuestion.includes('identité')) {
    return "Notre service de branding inclut la création de logos, chartes graphiques, guidelines et identités visuelles cohérentes. Parlons de votre projet !";
  } else if (lowerQuestion.includes('marketing') || lowerQuestion.includes('digital')) {
    return "Nous gérons vos stratégies digitales : réseaux sociaux, SEO, email marketing et content marketing. Boostez votre présence en ligne avec nous !";
  } else if (lowerQuestion.includes('photo') || lowerQuestion.includes('photographie')) {
    return "Nous réalisons des photos professionnelles : produits, événements, portraits. Qualité studio avec retouche incluse. Besoin d'un shooting ?";
  } else if (lowerQuestion.includes('vidéo') || lowerQuestion.includes('vidéographie')) {
    return "Nous produisons des vidéos haut de gamme : présentations d'entreprise, tutoriels, testimonials. Montage et post-production inclus !";
  } else if (lowerQuestion.includes('contact') || lowerQuestion.includes('whatsapp') || lowerQuestion.includes('email')) {
    return "Vous pouvez nous contacter par :\n- WhatsApp : +212 694598838 / +222 34605589\n- Email : dkdesign331@gmail.com ou Kasongodefi@gmail.com\n- Ou via le formulaire de contact sur le site !";
  } else if (lowerQuestion.includes('prix') || lowerQuestion.includes('devis') || lowerQuestion.includes('tarif')) {
    return "Nos tarifs varient selon la complexité du projet. Utilisez le bouton 'Demander un devis' sur la page d'accueil ou contactez-nous pour une estimation personnalisée !";
  } else if (lowerQuestion.includes('portfolio') || lowerQuestion.includes('réalisation')) {
    return "Découvrez nos réalisations dans la section Portfolio ! Nous avons travaillé sur des projets de branding, web, photo et vidéo. 😍";
  } else if (lowerQuestion.includes('bonjour') || lowerQuestion.includes('salut') || lowerQuestion.includes('hello')) {
    return "Bonjour ! 👋 Je suis l'assistant de Dksign. Comment puis-je vous aider aujourd'hui ?";
  } else if (lowerQuestion.includes('merci') || lowerQuestion.includes('thanks')) {
    return "Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions.";
  } else {
    return "Désolé, je n'ai pas compris votre question. Voici ce que je peux faire :\n- Vous parler de nos services (design, web, branding, etc.)\n- Vous donner nos coordonnées\n- Vous aider à demander un devis\n- Vous montrer notre portfolio";
  }
}

// Envoyer le message avec Entrée
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
