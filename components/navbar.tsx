"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Sun, Moon, Menu, X, Globe, User, LogOut, Settings } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import Image from "next/image"
import { DemoBanner } from "@/components/demo-banner"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("navbar")
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const switchLocale = (newLocale: string) => {
    if (!pathname) return
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  const getLocalizedPath = (path: string) => {
    return `/${locale}${path}`
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      const homePath = getLocalizedPath("/")
      router.push(`${homePath}#${sectionId}`)
    }
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <>
      <DemoBanner />

      <nav className="fixed top-0 z-50 w-full border-b border-primary/30 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🍌</span>
                <span className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
                  nanobanana
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium text-sm uppercase tracking-wider hover:shadow-glow"
              >
                核心功能
              </button>
              <button
                onClick={() => scrollToSection("playground")}
                className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium text-sm uppercase tracking-wider hover:shadow-glow"
              >
                核心玩法
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium text-sm uppercase tracking-wider hover:shadow-glow"
              >
                价格方案
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium text-sm uppercase tracking-wider hover:shadow-glow"
              >
                常见问题
              </button>
            </div>

            {/* Right side controls */}
            <div className="hidden md:flex items-center space-x-4">

              {/* Auth Section */}
              {status === "loading" ? (
                <div className="w-8 h-8 animate-pulse bg-primary/20 rounded-full" />
              ) : session ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    进入控制台
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-300 hover:text-primary hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/30">
                        <User className="h-4 w-4 text-primary" />
                        <span className="hidden lg:inline">{session.user?.name || session.user?.email}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-black/90 border-primary/30 text-gray-200">
                      <DropdownMenuItem asChild className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary cursor-pointer">
                        <Link href={getLocalizedPath("/profile")}>
                          <User className="mr-2 h-4 w-4 text-primary" />
                          {t("profile")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-primary/20" />
                      <DropdownMenuItem onClick={handleSignOut} className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4 text-primary" />
                        {t("signOut")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-primary hover:bg-primary/10 transition-all duration-300">
                    <Link href={getLocalizedPath("/auth/signin")}>{t("signIn")}</Link>
                  </Button>
                  <Button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 font-bold rounded-full px-6" asChild>
                    <Link href={getLocalizedPath("/auth/signup")}>免费体验</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary hover:bg-primary/10">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur border-b border-primary/30 absolute left-0 right-0 top-16 transition-all duration-300">
              <div className="px-4 pt-2 pb-6 space-y-2">
                <button
                  onClick={() => {
                    scrollToSection("features")
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-gray-300 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
                >
                  核心功能
                </button>
                <button
                  onClick={() => {
                    scrollToSection("playground")
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-gray-300 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
                >
                  核心玩法
                </button>
                <button
                  onClick={() => {
                    scrollToSection("pricing")
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-gray-300 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
                >
                  价格方案
                </button>

                <div className="border-t border-primary/30 pt-4 space-y-3">
                  {/* Auth Section Mobile */}
                  {session ? (
                    <div className="space-y-3">
                      <div className="px-3 py-2 text-sm text-primary font-bold">
                        欢迎, {session.user?.name || session.user?.email}
                      </div>
                      <Button className="w-full bg-primary text-black hover:bg-primary/90 font-bold" asChild>
                        <Link href="/dashboard">进入控制台</Link>
                      </Button>
                      <Button variant="outline" className="w-full border-primary/50 text-gray-300 hover:text-primary hover:border-primary hover:bg-primary/10" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        {t("signOut")}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3 pt-2">
                      <Button variant="ghost" className="w-full text-gray-300 hover:text-primary hover:bg-primary/10" asChild>
                        <Link href={getLocalizedPath("/auth/signin")}>{t("signIn")}</Link>
                      </Button>
                      <Button className="w-full bg-linear-gradient-primary text-black font-bold" style={{ background: 'linear-gradient(45deg, var(--primary), var(--secondary))' }} asChild>
                        <Link href={getLocalizedPath("/auth/signup")}>免费体验</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
