import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react"
import { MarketplaceButton } from "@/components/ui/marketplace-button"

export default function Contacts() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would send the data to your backend
      console.log("Contact form data:", formData)
      
      // Show success message
      alert("Message sent successfully! We'll get back to you soon.")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Error sending message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "support@holytraff.com",
      link: "mailto:support@holytraff.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Address",
      value: "123 Marketplace St, Digital City, DC 12345",
      link: null
    }
  ]

  const socialLinks = [
    { name: "Telegram", url: "https://t.me/PR_HOLY", icon: "📱" },
    { name: "Instagram", url: "https://instagram.com/holytraff", icon: "📸" },
    { name: "YouTube", url: "https://youtube.com/holytraff", icon: "🎥" },
    { name: "TikTok", url: "https://tiktok.com/@holytraff", icon: "🎵" }
  ]

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="marketplace-container max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/"
            className="inline-flex items-center text-brand-green hover:text-brand-green/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('pages.backToHome')}
          </Link>
          
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-brand-green" />
            <h1 className="text-3xl font-bold">{t('pages.contacts')}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject *
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <MarketplaceButton
                type="submit"
                className="w-full"
                variant="green"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </MarketplaceButton>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-card rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Get in touch</h2>
              
              <div className="space-y-6">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-brand-green" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{contact.title}</h3>
                        {contact.link ? (
                          <a 
                            href={contact.link}
                            className="text-brand-green hover:text-brand-green/80 transition-colors"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{contact.value}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Follow us</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand-green transition-colors group"
                  >
                    <span className="text-2xl">{social.icon}</span>
                    <div>
                      <h4 className="font-medium group-hover:text-brand-green transition-colors">
                        {social.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">Follow us</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-card rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Business Hours</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-brand-green/10 rounded-lg">
                <p className="text-sm text-center">
                  <strong>24/7 Support:</strong> For urgent matters, our support team is available around the clock via email and chat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
