import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { footerLinks } from "../../data/footerLinks";
import { siteConfig } from "../../data/siteConfig";

const socialIcons = [
  { icon: FaFacebookF, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: FaInstagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: FaYoutube, href: siteConfig.social.youtube, label: "YouTube" },
  { icon: FaWhatsapp, href: siteConfig.social.whatsapp, label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="bg-teal-950 text-parchment-100">
      <div className="pulse-rule" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <span className="font-display text-2xl font-semibold text-parchment-50">
              Qazi<span className="text-amber-400">Pedia</span>
            </span>
            <p className="mt-3 text-sm text-parchment-200/80 leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex items-center gap-2 max-w-xs"
            >
              <label htmlFor="footer-newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter"
                type="email"
                required
                placeholder="Your email"
                className="w-full rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm text-parchment-50 placeholder:text-parchment-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-amber-500 text-teal-950 px-4 py-2 text-sm font-semibold hover:bg-amber-400 transition-colors"
              >
                Qazi
              </button>
            </form>

            <div className="flex gap-3 mt-5">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-teal-950 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
                {group.heading}
              </p>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-parchment-200/80 hover:text-parchment-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-parchment-200/70">
          <p>© {new Date().getFullYear()} QaziPedia. All rights reserved.</p>
          <p><a
  href="https://www.linkedin.com/in/hidayat-khan-1399792a5"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:underline"
  
>
  Hidayat Khan — Software Engineer
</a>  </p>
        </div>
      </div>
    </footer>
  );
}
