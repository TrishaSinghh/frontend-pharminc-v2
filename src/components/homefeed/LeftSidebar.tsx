import Link from "next/link";
import {
  Home,
  Search,
  MessageCircle,
  FileText,
  Bell,
  Network,
} from "lucide-react";
import { BiLogOut } from "react-icons/bi";
import { User } from "./types";

interface LeftSidebarProps {
  user: User;
  handleLogout: () => void;
}

export default function LeftSidebar({ user, handleLogout }: LeftSidebarProps) {
  return (
    <aside className="fixed top-6.5 left-[20rem] h-[40rem] rounded-xl shadow-xl bg-white border-r border-gray-200 flex flex-col p-4 z-40 overflow-y-auto">
      {/* Logo */}
      <div className="w-56 h-16 bg-white border-b border-r border-gray-200 flex items-center justify-center z-50">
        <img src="/logo.png" alt="Logo" className="h-10" />
      </div>

      {/* Profile Card */}
      <Link href="/profile">
        <div className="relative w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-visible mb-6">
          <div className="w-full h-20 bg-gray-200 rounded-t-xl overflow-hidden">
            <img
              src="/banner.png"
              alt="Profile Banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[90px] z-10">
            <img
              src={user?.profilePicture || "/pp.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
          <div className="pt-14 pb-4 flex flex-col items-center px-4">
            <div className="flex items-center gap-1">
              <h2 className="text-lg font-bold text-gray-900">{user?.name}</h2>
              <span className="text-xs text-gray-500">• Online</span>
            </div>
            <div className="text-blue-700 text-sm font-medium mt-1">
              {user?.speciality || "Doctor"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {user?.location || "Delhi, India"}
            </div>

            {/* User roles/tags */}
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {user?.roles?.map((role, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-700"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4 w-full">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5 px-4 rounded-full">
                Connect
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm py-1.5 px-4 rounded-full">
                Message
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="mt-2 space-y-0">
        {[
          { name: "Home", icon: <Home className="h-4 w-4" />, path: "/" },
          {
            name: "Explore",
            icon: <Search className="h-4 w-4" />,
            path: "/profile",
          },
          {
            name: "Messages",
            icon: <MessageCircle className="h-4 w-4" />,
            path: "/messages",
          },
          {
            name: "Jobs",
            icon: <FileText className="h-4 w-4" />,
            path: "/jobs",
          },
          {
            name: "Notifications",
            icon: <Bell className="h-4 w-4" />,
            path: "/notifications",
          },
          {
            name: "Societies",
            icon: <Network className="h-4 w-4" />,
            path: "/societies",
          },
        ].map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-blue-50 text-sm text-gray-700"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-red-50 text-sm text-red-600 w-full"
        >
          <BiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
