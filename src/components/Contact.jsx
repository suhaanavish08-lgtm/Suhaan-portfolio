import { useState } from 'react'
import {
  Phone, Mail, ExternalLink,
  Send, Copy, Check, AlertCircle
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { personalInfo } from '../data/portfolioData'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import './Contact.css'

const initialForm = { name: '', email: '', message: '' }
const initialErrors = { name: '', email: '', message: '' }

function validateField(name, value) {
  if (!value.trim()) {
    return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
  }
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Please enter a valid email address'
  }
  if (name === 'message' && value.trim().length < 10) {
    return 'Message should be at least 10 characters'
  }
  return ''
}

export default function Contact() {
  const ref = useRevealOnScroll()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      message: validateField('message', form.message),
    }
    setErrors(newErrors)

    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      setSubmitted(true)
      // Form data is available in `form` for future backend integration
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* fallback: do nothing */
    }
  }

  const contactCards = [
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      copyable: true,
    },
    {
      icon: GithubIcon,
      label: 'GitHub',
      value: 'suhaanavish08-lgtm',
      href: personalInfo.github,
      external: true,
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'Suhaan Avish',
      href: personalInfo.linkedin,
      external: true,
    },
  ]

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Reach Out</span>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-subtitle">
            Have a project, opportunity, or just want to connect? Feel free to reach out.
          </p>
        </div>

        <div className="contact__grid reveal revealed">
          {/* Contact info cards */}
          <div className="contact__info">
            {contactCards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
                className="contact__card"
              >
                <div className="contact__card-icon">
                  <card.icon size={18} />
                </div>
                <div className="contact__card-content">
                  <span className="contact__card-label">{card.label}</span>
                  <span className="contact__card-value">{card.value}</span>
                </div>
                {card.copyable ? (
                  <button
                    className="contact__copy-btn"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      copyEmail()
                    }}
                    aria-label="Copy email address"
                    title="Copy email"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                ) : card.external ? (
                  <ExternalLink size={14} className="contact__card-arrow" />
                ) : null}
              </a>
            ))}
          </div>

          {/* Contact form */}
          <div className="contact__form-wrapper">
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-icon">
                  <Check size={24} />
                </div>
                <h3>Form Ready</h3>
                <p>
                  The form is structured and ready for a backend service. Connect an email
                  API or form service to start receiving messages.
                </p>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSubmitted(false)
                    setForm(initialForm)
                  }}
                >
                  Reset Form
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className={`contact__field${errors.name ? ' contact__field--error' : ''}`}>
                  <label htmlFor="contact-name" className="contact__label">Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your name"
                    className="contact__input"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <span className="contact__error">
                      <AlertCircle size={12} /> {errors.name}
                    </span>
                  )}
                </div>

                <div className={`contact__field${errors.email ? ' contact__field--error' : ''}`}>
                  <label htmlFor="contact-email" className="contact__label">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="your@email.com"
                    className="contact__input"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="contact__error">
                      <AlertCircle size={12} /> {errors.email}
                    </span>
                  )}
                </div>

                <div className={`contact__field${errors.message ? ' contact__field--error' : ''}`}>
                  <label htmlFor="contact-message" className="contact__label">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell me about your project or opportunity..."
                    className="contact__input contact__textarea"
                    rows="5"
                  />
                  {errors.message && (
                    <span className="contact__error">
                      <AlertCircle size={12} /> {errors.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="btn btn-primary contact__submit">
                  <Send size={15} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
