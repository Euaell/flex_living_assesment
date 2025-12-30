"use client"

import { useReviewsStore } from "@/store/reviews";
import { LoginForm } from "@/components/admin/LoginForm";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { LayoutDashboard, ExternalLink, LogOut } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, logout } = useReviewsStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (!isAuthenticated) {
        return <LoginForm />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-xl font-bold text-gray-900">Flex Living Admin</span>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href="/admin"
                                    className="border-black text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    <LayoutDashboard size={16} className="mr-2" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/properties/1"
                                    target="_blank"
                                    className="border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    <ExternalLink size={16} className="mr-2" />
                                    View Public Page
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Button variant="ghost" onClick={logout} className="text-gray-500">
                                <LogOut size={16} className="mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
