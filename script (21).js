// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Animate skill bars on scroll
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
}

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillFills = entry.target.querySelectorAll(".skill-fill")
      skillFills.forEach((fill) => {
        const width = fill.getAttribute("data-width")
        fill.style.width = width + "%"
      })
      skillObserver.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe skills section
const skillsSection = document.querySelector(".skills-section")
if (skillsSection) {
  skillObserver.observe(skillsSection)
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offset = 80
      const targetPosition = target.offsetTop - offset
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show")
      }
    }
  })
})

// Contact form handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Create success message
    const successMessage = document.createElement("div")
    successMessage.className = "alert alert-success mt-3"
    successMessage.style.background = "rgba(0, 212, 255, 0.1)"
    successMessage.style.border = "1px solid rgba(0, 212, 255, 0.3)"
    successMessage.style.color = "var(--primary)"
    successMessage.style.borderRadius = "10px"
    successMessage.style.padding = "1rem"
    successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i> 
            Thank you, ${name}! Your message has been received. I'll get back to you soon.
        `

    // Show success message
    contactForm.appendChild(successMessage)

    // Reset form
    contactForm.reset()

    // Remove message after 5 seconds
    setTimeout(() => {
      successMessage.remove()
    }, 5000)
  })
}

// Add animation to elements on scroll
const fadeElements = document.querySelectorAll(".hobby-card, .skill-category-card, .about-card")
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0"
        entry.target.style.transform = "translateY(20px)"

        setTimeout(() => {
          entry.target.style.transition = "all 0.6s ease"
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, 100)

        fadeObserver.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.1,
  },
)

fadeElements.forEach((element) => {
  fadeObserver.observe(element)
})

// Active navigation link on scroll
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})
