import { motion } from 'framer-motion';

const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: 360 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#5c8d63' }} />
          <stop offset="100%" style={{ stopColor: '#4a7150' }} />
        </linearGradient>
      </defs>
      <motion.circle
        cx="100"
        cy="100"
        r="90"
        stroke="url(#logoGradient)"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <path
          d="M60 80 L100 110 L140 80 L140 140 L60 140 Z"
          fill="url(#logoGradient)"
        />
        <path
          d="M95 105 L105 105 L100 110 Z"
          fill="#2d2d2d"
        />
      </motion.g>
    </motion.svg>
  );
};

export default Logo; 