"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
                    ? "bg-flex-green text-white border-flex-green shadow-md py-4"
                    : "bg-transparent text-flex-green border-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="text-2xl font-serif tracking-tight lowercase flex items-end leading-none">
                        <span className="text-3xl mr-1 italic">f</span> the flex.
                    </div>
                </div>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
                    <a href="#" className={`flex items-center gap-2 transition-colors ${isScrolled ? "hover:text-gray-200" : "hover:text-gray-600"}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-90"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-8h8v8" /></svg>
                        Landlords <span className="text-[10px] ml-0.5">▼</span>
                    </a>
                    <a href="#" className={`flex items-center gap-2 transition-colors ${isScrolled ? "hover:text-gray-200" : "hover:text-gray-600"}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-90"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                        About Us
                    </a>
                    <a href="#" className={`flex items-center gap-2 transition-colors ${isScrolled ? "hover:text-gray-200" : "hover:text-gray-600"}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-90"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                        Careers
                    </a>
                    <a href="#" className={`flex items-center gap-2 transition-colors ${isScrolled ? "hover:text-gray-200" : "hover:text-gray-600"}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-90"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                        Contact
                    </a>
                </div>

                {/* Right Utils */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium opacity-90">
                    <div className={`flex items-center gap-2 cursor-pointer ${isScrolled ? "hover:text-white" : "hover:text-black"}`}>
                        <span className={`text-xs font-bold px-1 rounded ${isScrolled ? "bg-white/20" : "bg-black/10"}`}>GB</span> English
                    </div>
                    <div className={`flex items-center gap-1 cursor-pointer ${isScrolled ? "hover:text-white" : "hover:text-black"}`}>
                        € EUR
                    </div>
                </div>
            </div>
        </nav>
    );
}
