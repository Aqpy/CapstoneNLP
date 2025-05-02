import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/chatbot', label: 'Chatbot', icon: '🤖' },
    { 
      title: 'Contact Us',
      items: [
        { path: '/contact', label: 'Office', icon: '🏢' },
        { path: '/support', label: 'Support', icon: '💬' },
        { path: 'mailto:contact@mailsentinel.com', label: 'Email', icon: '📧' }
      ]
    },
    {
      title: 'Help',
      items: [
        { path: '/docs', label: 'Documentation', icon: '📚' },
        { path: '/faq', label: 'FAQ', icon: '❓' },
        { path: '/privacy', label: 'Privacy Policy', icon: '🔒' }
      ]
    },
    {
      title: 'Social',
      items: [
        { path: 'https://twitter.com/mailsentinel', label: 'Twitter', icon: '🐦' },
        { path: 'https://linkedin.com/company/mailsentinel', label: 'LinkedIn', icon: '💼' },
        { path: 'https://github.com/mailsentinel', label: 'GitHub', icon: '💻' }
      ]
    }
  ];

  return (
    <motion.nav
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-64 bg-[#2d2d2d] text-white py-8 px-4 overflow-y-auto"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-12 px-4"
      >
        <Link to="/" className="flex items-center space-x-3">
          <Logo className="w-8 h-8" />
          <span className="text-lg font-bold text-[#5c8d63]">MailSentinel</span>
        </Link>
      </motion.div>

      <div className="space-y-6">
        {navItems.map((item, index) => (
          <div key={item.title || item.path} className="space-y-2">
            {item.title ? (
              <>
                <h3 className="text-sm font-semibold text-[#5c8d63] px-4">{item.title}</h3>
                <div className="space-y-1">
                  {item.items.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      item={subItem}
                      isActive={location.pathname === subItem.path}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </>
            ) : (
              <NavLink
                item={item}
                isActive={location.pathname === item.path}
                delay={index * 0.1}
              />
            )}
          </div>
        ))}
      </div>
    </motion.nav>
  );
};

const NavLink = ({ item, isActive, delay }) => {
  const isExternal = item.path.startsWith('http') || item.path.startsWith('mailto');
  const LinkComponent = isExternal ? 'a' : Link;
  const linkProps = isExternal ? {
    href: item.path,
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {
    to: item.path
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <LinkComponent
        {...linkProps}
        className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-lg transition-colors ${
          isActive
            ? 'bg-[#5c8d63] text-white'
            : 'text-gray-300 hover:bg-[#5c8d63]/20 hover:text-white'
        }`}
      >
        <span>{item.icon}</span>
        <span>{item.label}</span>
      </LinkComponent>
    </motion.div>
  );
};

export default Navigation; 