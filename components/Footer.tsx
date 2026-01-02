import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1E3A8A] text-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-white/5 opacity-20" />
      </div>

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pt-12 md:pt-16 pb-8 md:pb-12">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-lg flex-shrink-0">
                <span className="font-display text-lg sm:text-xl font-bold text-white">CC</span>
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">Course Centre</h3>
                <p className="font-body text-xs text-white/80">Education Consultant</p>
              </div>
            </div>
            <p className="font-body text-xs sm:text-sm text-white/90 leading-relaxed">
              Leading education and student recruitment consultant in United Kingdom, providing dedicated support throughout your educational journey.
            </p>
            <div className="flex items-center gap-3 pt-3">
              <a
                href="#"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 min-h-[44px] min-w-[44px]"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 min-h-[44px] min-w-[44px]"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 min-h-[44px] min-w-[44px]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 min-h-[44px] min-w-[44px]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-display text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/courses", label: "Courses" },
                { href: "/services", label: "Services" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/90 hover:text-white inline-flex items-center gap-2 group min-h-[44px] py-2"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-white"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-display text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Our Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "Free Consultation",
                "University Selection",
                "Course Selection",
                "Document Preparation",
                "Application Support",
                "Visa Assistance",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="font-body text-sm text-white/90 hover:text-white inline-flex items-center gap-2 group min-h-[44px] py-2"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-white"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-display text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Get In Touch</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white/80 mt-0.5 flex-shrink-0" />
                <p className="font-body text-xs sm:text-sm text-white/80 leading-relaxed">
                  UNIT 28 BEAUFORT COURT, ADMIRALS WAY, LONDON, E14 9XL
                </p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-white/80 mt-0.5 flex-shrink-0" />
                <p className="font-body text-xs sm:text-sm text-white/80 break-words">
                  +44(0)2070 524 680 | +44(0)7427 603 733
                </p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white/80 mt-0.5 flex-shrink-0" />
                <p className="font-body text-xs sm:text-sm text-white/80 break-all">
                  info@coursecentre.co.uk
                </p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white/80 mt-0.5 flex-shrink-0" />
                <p className="font-body text-xs sm:text-sm text-white/80">
                  Mon-Fri: 9:00 AM - 7:00 PM
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-3 sm:pt-4">
              <h5 className="font-display text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3">Subscribe to Newsletter</h5>
              <form className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 h-10 sm:h-11 min-h-[44px] text-sm sm:text-base"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="icon"
                  className="h-10 w-full sm:w-11 sm:h-11 flex-shrink-0 min-h-[44px] sm:min-w-[44px]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-4 sm:py-5 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="font-body text-xs sm:text-sm text-white/80 text-center md:text-left">
              © {new Date().getFullYear()} Course Centre. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <Link href="/privacy" className="font-body text-xs sm:text-sm text-white/80 hover:text-white transition-colors min-h-[44px] flex items-center">
                Privacy Policy
              </Link>
              <Link href="/terms" className="font-body text-xs sm:text-sm text-white/80 hover:text-white transition-colors min-h-[44px] flex items-center">
                Terms of Service
              </Link>
              <Link href="/cookies" className="font-body text-xs sm:text-sm text-white/80 hover:text-white transition-colors min-h-[44px] flex items-center">
                Cookie Preferences
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
