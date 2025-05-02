import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Footer from "./components/Footer"

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative bg-[#fdfbf6] overflow-hidden">
        <div className="container mx-auto px-6 py-12 relative">
          <div className="relative min-h-screen bg-[#fdfbf6] overflow-hidden">
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
                  <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-2xl p-8">
                    <p className="text-lg text-gray-600 mb-6">
                      MailSentinel is your advanced email security companion, leveraging cutting-edge AI to detect and prevent email fraud. Our platform analyzes email content in real-time, protecting you from phishing attempts, scams, and malicious communications.
                    </p>
                    <p className="text-md text-gray-500">
                      Simply paste your suspicious email content or upload files, and let our intelligent system assess the risk. With {">"}95% accuracy, we help you make informed decisions about your email communications.
                    </p>
                  </div>
                </motion.div>

                {/* Central Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Link 
                    to="/chatbot" 
                    className="bg-[#5c8d63] text-white px-8 py-4 rounded-md text-xl font-bold hover:bg-[#4a7150] transition-colors inline-block"
                  >
                    Try Our App
                  </Link>
                </motion.div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-8 relative z-10 mt-16">
                  {[
                    {
                      title: "Real-Time Analysis",
                      description: "Get instant feedback on email authenticity with our advanced AI model",
                      icon: (
                        <motion.div className="text-4xl mb-4">
                          <span role="img" aria-label="lock" className="text-[#5c8d63] text-5xl">🔒</span>
                        </motion.div>
                      )
                    },
                    {
                      title: "Multi-Format Support",
                      description: "Upload emails as text, images, PDFs, or Word documents",
                      icon: (
                        <motion.div className="text-4xl mb-4">
                          <span role="img" aria-label="shield" className="text-[#5c8d63] text-5xl">🛡️</span>
                        </motion.div>
                      )
                    },
                    {
                      title: "High Accuracy",
                      description: "Benefit from our highly accurate machine learning model",
                      icon: (
                        <motion.div className="text-4xl mb-4">
                          <span role="img" aria-label="rocket" className="text-[#5c8d63] text-5xl">🚀</span>
                        </motion.div>
                      )
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-[#2d2d2d]/80 backdrop-blur-md rounded-lg p-8 hover:bg-[#2d2d2d]/90 transition-all duration-300 border border-gray-700/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                      }}
                    >
                      {feature.icon}
                      <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
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
          <Footer />
        </div>
      </div>
    </motion.div>
  )
}

export default Hero
