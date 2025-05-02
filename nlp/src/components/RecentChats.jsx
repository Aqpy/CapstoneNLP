import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RecentChats = () => {
  const recentChats = [
    {
      id: 1,
      text: "Suspicious email from bank...",
      result: "Fraudulent",
      timestamp: "2 mins ago",
      status: "fraud"
    },
    {
      id: 2,
      text: "Meeting confirmation from...",
      result: "Legitimate",
      timestamp: "5 mins ago",
      status: "safe"
    },
    {
      id: 3,
      text: "Account verification required...",
      result: "Fraudulent",
      timestamp: "10 mins ago",
      status: "fraud"
    }
  ];

  return (
    <motion.div
      initial={{ x: 250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed right-0 top-0 h-screen w-64 bg-[#2d2d2d] text-white py-8 px-4 overflow-y-auto"
    >
      <div className="mb-8">
        <h2 className="text-lg font-bold text-[#5c8d63] px-2">Recent Analyses</h2>
      </div>

      <div className="space-y-4">
        {recentChats.map((chat) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="text-sm truncate text-gray-300">{chat.text}</div>
            <div className="flex justify-between items-center mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                chat.status === 'fraud' 
                  ? 'bg-red-500/20 text-red-300' 
                  : 'bg-green-500/20 text-green-300'
              }`}>
                {chat.result}
              </span>
              <span className="text-xs text-gray-400">{chat.timestamp}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 px-2"
      >
        <Link
          to="/chatbot"
          className="block text-center text-sm text-[#5c8d63] hover:text-[#4a7150] transition-colors"
        >
          View All Analyses →
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default RecentChats; 