'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  Scale,
  MessageSquare,
  Settings,
  Menu,
  X,
  ChevronLeft,
  Plus,
  LogOut,
  UserCircle,
} from 'lucide-react';

const navItems = [
  { label: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard },
  { label: 'المقالات', href: '/admin/articles', icon: FileText, action: { label: 'مقال جديد', href: '/admin/articles/new' } },
  { label: 'الشركات المحذر منها', href: '/admin/companies', icon: AlertTriangle },
  { label: 'مكاتب المحاماة', href: '/admin/law-offices', icon: Scale },
  { label: 'التعليقات', href: '/admin/comments', icon: MessageSquare },
  { label: 'رسائل التواصل', href: '/admin/contacts', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex" dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} bg-gray-900 text-white flex-shrink-0 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
          {sidebarOpen && (
            <Link href="/admin" className="flex items-center gap-2">
              <Image src="/image-removebg-preview.png" alt="المرشد المالي" width={32} height={32} className="object-contain" />
              <span className="text-sm font-bold text-white">المرشد المالي</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <div key={item.href} className="px-2 mb-1">
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                    isActive ? 'bg-primary-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
                {sidebarOpen && isActive && item.action && (
                  <Link
                    href={item.action.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors mr-6 mt-0.5"
                  >
                    <Plus size={13} />
                    {item.action.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Back to site */}
        <div className="border-t border-gray-700 p-3">
          <div className="mb-2 flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800/80 text-white">
            <div className="w-8 h-8 rounded-full bg-gold-500 text-gray-950 flex items-center justify-center text-sm font-bold flex-shrink-0">
              م
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <div className="text-xs font-bold truncate">مرشد الغانم</div>
                <div className="text-[11px] text-gray-400 truncate">الأدمن متصل الآن</div>
              </div>
            )}
          </div>
          <a
            href="/api/admin/logout"
            className="mb-1 flex items-center gap-2 px-3 py-2 rounded-md text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <LogOut size={14} />
            {sidebarOpen && <span>تسجيل الخروج</span>}
          </a>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <Settings size={14} />
            {sidebarOpen && <span>العودة للموقع</span>}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-gray-800">لوحة تحكم المرشد المالي</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 border border-gray-200 rounded-md px-3 py-1.5 bg-gray-50">
              <UserCircle size={20} className="text-primary-800" />
              <div className="leading-tight">
                <div className="text-sm font-bold text-gray-900">مرشد الغانم</div>
                <div className="text-[11px] text-emerald-600">داخل كأدمن</div>
              </div>
            </div>
            <Link href="/admin/articles/new" className="flex items-center gap-2 px-4 py-2 rounded text-sm font-bold text-white hover:opacity-90 transition-opacity" style={{ background: '#1B2A4A' }}>
              <Plus size={15} />
              مقال جديد
            </Link>
            <a
              href="/api/admin/logout"
              className="flex items-center gap-2 px-3 py-2 rounded border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <LogOut size={15} />
              خروج
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
