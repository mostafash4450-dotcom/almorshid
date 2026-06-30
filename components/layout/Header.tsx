'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  Menu,
  X,
  Mail,
  AlertTriangle,
  Scale,
  BookOpen,
  TrendingUp,
  BarChart2,
  Shield,
  Search,
} from 'lucide-react';

const navItems = [
  {
    label: 'تحذيرات الفوركس',
    href: '/category/forex-warnings',
    icon: AlertTriangle,
    children: [
      { label: 'شركات محذر منها', href: '/category/forex-warnings' },
      { label: 'كيف تكشف النصابين', href: '/category/forex-warnings' },
      { label: 'قائمة الشركات المشبوهة', href: '/companies' },
    ],
  },
  {
    label: 'التداول الصحيح',
    href: '/category/trading-guide',
    icon: TrendingUp,
    children: [
      { label: 'مقالات للمبتدئين', href: '/category/trading-guide' },
      { label: 'استراتيجيات التداول', href: '/category/trading-guide' },
      { label: 'اختيار الوسيط الموثوق', href: '/category/trading-guide' },
    ],
  },
  {
    label: 'مكاتب المحاماة',
    href: '/law-offices',
    icon: Scale,
    children: [
      { label: 'جميع المكاتب الموصى بها', href: '/law-offices' },
      { label: 'Trust Law', href: '/law-offices/trust-law' },
      { label: 'D D LAW', href: '/law-offices/dd-law' },
    ],
  },
  {
    label: 'استرداد الأموال',
    href: '/category/fund-recovery',
    icon: Shield,
    children: [
      { label: 'دليل الاسترداد الشامل', href: '/category/fund-recovery' },
      { label: 'الخطوات القانونية', href: '/category/fund-recovery' },
      { label: 'قصص نجاح', href: '/category/fund-recovery' },
    ],
  },
  {
    label: 'المؤشرات',
    href: '/category/indicators',
    icon: BarChart2,
  },
  {
    label: 'المدونة',
    href: '/blog',
    icon: BookOpen,
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-primary-900 text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="mailto:info@almorshid-almali.com" className="flex items-center gap-1.5 hover:text-gold-300 transition-colors hidden sm:flex">
              <Mail size={12} />
              <span>info@almorshid-almali.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-gold-300 font-medium">
            <span className="hidden sm:block">مرجعك الموثوق في عالم المال والتداول</span>
            <Link href="/contact" className="bg-gold-500 text-primary-900 px-3 py-0.5 rounded text-xs font-bold hover:bg-gold-400 transition-colors">
              تعرضت للاحتيال؟
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-gray-200" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <Image
                src="/image-removebg-preview.png"
                alt="المرشد المالي"
                width={48}
                height={48}
                className="object-contain"
              />
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-primary-900" style={{ fontFamily: 'Cairo, sans-serif', lineHeight: 1.1 }}>
                  المرشد المالي
                </div>
                <div className="text-xs text-gold-600 tracking-widest font-medium" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  THE FINANCIAL GUIDE
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-primary-800 rounded-md hover:bg-gray-50 transition-all duration-150"
                    style={{ fontFamily: 'Cairo, sans-serif' }}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Link>
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg border border-gray-100 py-1 z-50"
                      style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }}>
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary-800 hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Tajawal, sans-serif' }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-1.5 text-gray-500 hover:text-primary-800 transition-colors p-2">
                <Search size={18} />
              </button>
              <Link
                href="/contact"
                className="hidden sm:flex btn-primary text-sm py-2 px-4"
              >
                استشارة مجانية
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-primary-800 transition-colors"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary nav bar */}
      <div className="bg-primary-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-0">
            {[
              { label: 'الرئيسية', href: '/' },
              { label: 'أحدث التحذيرات', href: '/category/forex-warnings' },
              { label: 'الشركات المشبوهة', href: '/companies' },
              { label: 'مكاتب المحاماة', href: '/law-offices' },
              { label: 'استرداد الأموال', href: '/category/fund-recovery' },
              { label: 'كيفية التداول', href: '/category/trading-guide' },
              { label: 'المؤشرات', href: '/category/indicators' },
              { label: 'من نحن', href: '/about' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap px-3 py-2 text-xs font-medium text-blue-100 hover:text-white hover:bg-primary-900/40 transition-colors"
                style={{ fontFamily: 'Cairo, sans-serif' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-primary-800 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileOpen(false)}
                  style={{ fontFamily: 'Cairo, sans-serif' }}
                >
                  <item.icon size={16} className="text-gold-500" />
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mr-8 space-y-1 mb-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-gray-500 hover:text-primary-700 hover:bg-gray-50 rounded-md"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <Link
                href="/contact"
                className="w-full btn-primary justify-center text-sm py-2.5"
                onClick={() => setMobileOpen(false)}
              >
                استشارة مجانية
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
