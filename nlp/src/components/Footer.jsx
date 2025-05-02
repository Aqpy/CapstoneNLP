import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: "Contact Us",
      links: [
        { name: "Email", href: "mailto:contact@mailsentinel.com" },
        { name: "Support", href: "/support" },
        { name: "Office", href: "/contact" }
      ]
    },
    {
      title: "Help",
      links: [
        { name: "FAQ", href: "/faq" },
        { name: "Documentation", href: "/docs" },
        { name: "Privacy Policy", href: "/privacy" }
      ]
    },
    {
      title: "Social",
      links: [
        { name: "Twitter", href: "https://twitter.com/mailsentinel" },
        { name: "LinkedIn", href: "https://linkedin.com/company/mailsentinel" },
        { name: "GitHub", href: "https://github.com/mailsentinel" }
      ]
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#2d2d2d] text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-[#5c8d63]">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400"
        >
          <p>© {new Date().getFullYear()} MailSentinel. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer; 