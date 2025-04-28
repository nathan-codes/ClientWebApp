"use client"

import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    })
    // In a real app, this would handle actual logout logic
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-primary text-white w-[300px] sm:max-w-sm p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center h-16 px-6 border-b border-primary-foreground/20">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <span className="text-sm font-bold">A</span>
                </div>
                <span className="font-semibold text-lg">AcuteMeter</span>
              </div>
            </div>

            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              <div className="space-y-1">
                <MobileNavItem href="/" label="Map View" active={isActive("/")} onClick={() => setOpen(false)} />
                <MobileNavItem
                  href="/list-view"
                  label="List View"
                  active={isActive("/list-view")}
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/analytics"
                  label="Analytics"
                  active={isActive("/analytics")}
                  onClick={() => setOpen(false)}
                />
                <MobileNavItem
                  href="/alerts"
                  label="Alerts"
                  active={isActive("/alerts")}
                  onClick={() => setOpen(false)}
                  badge="12"
                />
              </div>

              <div className="pt-6 mt-6 border-t border-primary-foreground/20">
                <h3 className="px-3 text-xs font-medium text-primary-foreground/70 uppercase tracking-wider mb-2">
                  Zones
                </h3>
                <div className="space-y-1">
                  <MobileNavItem
                    href="/zones/all"
                    label="All Zones"
                    active={isActive("/zones/all")}
                    onClick={() => setOpen(false)}
                  />
                  <MobileNavItem
                    href="/zone-details/adenta"
                    label="Adenta"
                    active={isActive("/zone-details/adenta")}
                    onClick={() => setOpen(false)}
                  />
                  <MobileNavItem
                    href="/zone-details/east-legon"
                    label="East Legon"
                    active={isActive("/zone-details/east-legon")}
                    onClick={() => setOpen(false)}
                  />
                  <MobileNavItem
                    href="/zone-details/osu"
                    label="Osu"
                    active={isActive("/zone-details/osu")}
                    onClick={() => setOpen(false)}
                  />
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-primary-foreground/20">
                <h3 className="px-3 text-xs font-medium text-primary-foreground/70 uppercase tracking-wider mb-2">
                  Settings
                </h3>
                <div className="space-y-1">
                  <MobileNavItem
                    href="/profile"
                    label="Profile"
                    active={isActive("/profile")}
                    onClick={() => setOpen(false)}
                  />
                  <MobileNavItem
                    href="/preferences"
                    label="Preferences"
                    active={isActive("/preferences")}
                    onClick={() => setOpen(false)}
                  />
                  <MobileNavItem href="/help" label="Help" active={isActive("/help")} onClick={() => setOpen(false)} />
                </div>
              </div>
            </nav>

            <div className="p-4 border-t border-primary-foreground/20 flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary-foreground/20">
                <AvatarImage src="/placeholder-user.jpg" alt="Kofi Mensah" />
                <AvatarFallback className="bg-primary-foreground/20 text-white">KM</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Kofi Mensah</p>
                <p className="text-xs text-primary-foreground/70 truncate">Xpress Gas Admin</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-white hover:bg-primary-foreground/10"
              >
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
          <span className="text-sm font-bold">A</span>
        </div>
        <span className="font-semibold text-lg">AcuteMeter</span>
      </div>

      <div className="flex-1 flex items-center justify-end gap-4">
        <div className="relative w-full max-w-[200px]">
          <Input placeholder="Search..." className="pl-3 pr-8 h-9 rounded-xl" />
        </div>

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Kofi Mensah" />
                <AvatarFallback>KM</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/preferences">Preferences</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

interface MobileNavItemProps {
  href: string
  label: string
  active: boolean
  onClick: () => void
  badge?: string
}

const MobileNavItem = ({ href, label, active, onClick, badge }: MobileNavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-colors",
        active
          ? "bg-primary-foreground/20 text-white"
          : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-white",
      )}
      onClick={onClick}
    >
      <span className="flex-1">{label}</span>
      {badge && <span className="ml-auto bg-secondary text-white text-xs px-2 py-0.5 rounded-full">{badge}</span>}
    </Link>
  )
}
