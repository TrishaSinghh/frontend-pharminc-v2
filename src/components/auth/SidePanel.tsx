import { motion } from "framer-motion";
import { Stethoscope, HeartPulse } from "lucide-react";

export function SidePanel() {
  return (
    <div className="hidden lg:flex flex-1 bg-[#3B82F6]/5 justify-center items-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.1">
            <path
              d="M400 200C400 310.457 310.457 400 200 400C89.5431 400 0 310.457 0 200C0 89.5431 89.5431 0 200 0C310.457 0 400 89.5431 400 200Z"
              fill="#3B82F6"
            />
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-md">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-[#3B82F6]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Connect with Peers</h3>
                <p className="text-gray-600 text-sm">
                  Build your professional network
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              Join a growing community of medical professionals sharing
              knowledge and expertise.
            </p>
          </div>
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <HeartPulse className="h-6 w-6 text-[#3B82F6]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Stay Updated</h3>
                <p className="text-gray-600 text-sm">
                  Latest research and case studies
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              Access cutting-edge research and participate in case discussions
              with specialists worldwide.
            </p>
          </motion.div>
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Members</span>
              <span className="text-sm font-medium">25,000+</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-[#3B82F6] h-1.5 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>

            <div className="flex justify-between mt-4 mb-2">
              <span className="text-sm text-gray-500">Specialties</span>
              <span className="text-sm font-medium">50+</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-[#3B82F6] h-1.5 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>

            <div className="flex justify-between mt-4 mb-2">
              <span className="text-sm text-gray-500">Countries</span>
              <span className="text-sm font-medium">120+</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-[#3B82F6] h-1.5 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </motion.div>
        </motion.div>
        <div className="text-center">
          <p className="text-gray-600 mb-2">
            Trusted by leading medical institutions
          </p>
          <div className="flex justify-center space-x-6 opacity-70">
            <span className="font-serif font-bold text-gray-400">
              Mayo Clinic
            </span>
            <span className="font-serif font-bold text-gray-400">
              Johns Hopkins
            </span>
            <span className="font-serif font-bold text-gray-400">
              Cleveland Clinic
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
