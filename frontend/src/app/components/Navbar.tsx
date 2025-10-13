"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // biểu tượng menu

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg backdrop-blur-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight hover:text-blue-400 transition-colors">
          MyNext<span className="text-blue-400">App</span>
        </Link>

        {/* Menu chính (ẩn trên mobile) */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-2 py-1 text-sm font-medium transition-colors
                ${pathname === item.href ? "text-blue-400" : "text-gray-300 hover:text-white"}
              `}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-400 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Nút menu di động */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu dropdown cho mobile */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-gray-900 border-t border-gray-800 py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`px-6 py-2 text-sm font-medium transition-colors
                ${pathname === item.href ? "text-blue-400" : "text-gray-300 hover:text-white"}
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
