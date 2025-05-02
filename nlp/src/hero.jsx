import { motion } from "framer-motion"

const Hero = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="relative min-h-screen bg-[#fdfbf6] overflow-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold flex items-center">
          <span className="text-[#2d2d2d]">Veritas</span>
        </a>
        <div className="flex gap-8 items-center">
          <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="/products" className="text-gray-600 hover:text-gray-900">Products</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          <a href="/faq" className="bg-[#5c8d63] text-white px-4 py-2 rounded-md hover:bg-[#4a7150] transition-colors">
            FAQ
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 pt-20 pb-32 relative">
        {/* Decorative Leaves */}
        <motion.div 
          className="absolute left-0 top-0 w-72 h-72"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full fill-[#5c8d63] opacity-90">
            <path d="M 100 0 C 130 20 160 50 180 90 C 200 130 200 170 180 190 C 160 210 130 200 100 180 C 70 160 50 130 40 90 C 30 50 40 20 60 10 C 80 0 90 0 100 0 Z" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute right-0 top-20 w-72 h-72"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full fill-[#5c8d63] opacity-90 rotate-180">
            <path d="M 100 0 C 130 20 160 50 180 90 C 200 130 200 170 180 190 C 160 210 130 200 100 180 C 70 160 50 130 40 90 C 30 50 40 20 60 10 C 80 0 90 0 100 0 Z" />
          </svg>
        </motion.div>

        {/* Floating Circles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${i % 2 === 0 ? 'bg-[#5c8d63]' : 'bg-white'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={floatingAnimation}
            animate="animate"
          />
        ))}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-8 text-[#2d2d2d]"
            {...fadeIn}
          >
            UNLOCK THE POWER OF<br />FRAUD-FREE EMAIL
          </motion.h1>

          <motion.div 
            className="max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-2xl p-6">
              <div className="w-full h-[300px] bg-[#5c8d63] bg-opacity-10 rounded-lg flex items-center justify-center">
                <div className="w-3/4 space-y-4">
                  <div className="h-8 bg-[#5c8d63] bg-opacity-20 rounded-md"></div>
                  <div className="h-8 bg-[#5c8d63] bg-opacity-20 rounded-md"></div>
                  <div className="h-8 bg-[#5c8d63] w-1/2 mx-auto bg-opacity-20 rounded-md"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* New Central Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href="/app" 
              className="bg-[#5c8d63] text-white px-8 py-4 rounded-md text-xl font-bold hover:bg-[#4a7150] transition-colors inline-block"
            >
              Try Our App
            </a>
          </motion.div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 relative z-10 mt-16">
            {[
              {
                title: "Secure Your Inbox",
                description: "Protect Yourself from Deceptive Emails With Our Advanced Security",
                icon: "🔒"
              },
              {
                title: "Safeguard Your Digital",
                description: "Cutting-Edge Email Fraud Prevention: Empowered",
                icon: "🛡️"
              },
              {
                title: "UNVEILING THE FUTURE",
                description: "Revolutionize Your Email Experience with Our Innovation",
                icon: "🚀"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#2d2d2d] rounded-lg p-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave Shape */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg 
          viewBox="0 0 1440 320" 
          className="w-full"
          preserveAspectRatio="none"
        >
          <path 
            fill="#2d2d2d" 
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default Hero
