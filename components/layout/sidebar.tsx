"use client";

import type React from "react";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Layers,
  List,
  LogOut,
  Map,
  Settings,
  User,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Sidebar = ({ open, onOpenChange }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    // In a real app, this would handle actual logout logic
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className={cn(
          "hidden lg:flex lg:flex-col fixed inset-y-0 z-50 transition-all duration-300",
          open ? "w-64" : "w-20"
        )}
      >
        <div className="flex flex-col flex-grow bg-gradient-to-b from-teal-50 to-teal-100 text-teal-900 shadow-lg overflow-y-auto border-r border-teal-200">
          <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 border-b border-teal-200">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-sm">
                <Flame size={16} />
              </div>
              <span
                className={cn(
                  "font-semibold text-lg transition-opacity text-teal-900",
                  open ? "opacity-100" : "opacity-0"
                )}
              >
                AcuteMeter
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(!open)}
              className="text-teal-700 hover:bg-teal-200/50 rounded-full"
            >
              {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </Button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            <TooltipProvider delayDuration={0}>
              <div className="space-y-1">
                <NavItem
                  href="/"
                  icon={<Map size={20} />}
                  label="Map View"
                  active={isActive("/")}
                  open={open}
                />
                <NavItem
                  href="/list-view"
                  icon={<List size={20} />}
                  label="List View"
                  active={isActive("/list-view")}
                  open={open}
                />
                <NavItem
                  href="/analytics"
                  icon={<BarChart3 size={20} />}
                  label="Analytics"
                  active={isActive("/analytics")}
                  open={open}
                />
                <NavItem
                  href="/alerts"
                  icon={<Bell size={20} />}
                  label="Alerts"
                  active={isActive("/alerts")}
                  open={open}
                  badge="12"
                />
              </div>

              <div className="pt-6 mt-6 border-t border-teal-200">
                <h3
                  className={cn(
                    "px-3 text-xs font-medium text-teal-700 uppercase tracking-wider mb-2",
                    !open && "sr-only"
                  )}
                >
                  Zones
                </h3>
                <div className="space-y-1">
                  <NavItem
                    href="/zones/all"
                    icon={<Layers size={20} />}
                    label="All Zones"
                    active={isActive("/zones/all")}
                    open={open}
                  />
                  <ZoneNavItem
                    href="/zone-details/adenta"
                    label="Adenta"
                    letter="A"
                    active={isActive("/zone-details/adenta")}
                    open={open}
                  />
                  <ZoneNavItem
                    href="/zone-details/east-legon"
                    label="East Legon"
                    letter="E"
                    active={isActive("/zone-details/east-legon")}
                    open={open}
                  />
                  <ZoneNavItem
                    href="/zone-details/osu"
                    label="Osu"
                    letter="O"
                    active={isActive("/zone-details/osu")}
                    open={open}
                  />
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-teal-200">
                <h3
                  className={cn(
                    "px-3 text-xs font-medium text-teal-700 uppercase tracking-wider mb-2",
                    !open && "sr-only"
                  )}
                >
                  Settings
                </h3>
                <div className="space-y-1">
                  <NavItem
                    href="/profile"
                    icon={<User size={20} />}
                    label="Profile"
                    active={isActive("/profile")}
                    open={open}
                  />
                  <NavItem
                    href="/preferences"
                    icon={<Settings size={20} />}
                    label="Preferences"
                    active={isActive("/preferences")}
                    open={open}
                  />
                  <NavItem
                    href="/help"
                    icon={<HelpCircle size={20} />}
                    label="Help"
                    active={isActive("/help")}
                    open={open}
                  />
                </div>
              </div>
            </TooltipProvider>
          </nav>

          <div className="p-4 border-t border-teal-200 flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-teal-200 shadow-sm">
              <AvatarImage src="/placeholder-user.jpg" alt="Kofi Mensah" />
              <AvatarFallback className="bg-gradient-to-br from-teal-100 to-teal-200 text-teal-800">
                KM
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "flex-1 min-w-0 transition-opacity",
                open ? "opacity-100" : "opacity-0"
              )}
            >
              <p className="text-sm font-medium text-teal-900 truncate">
                Kofi Mensah
              </p>
              <p className="text-xs text-teal-700 truncate">Xpress Gas Admin</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-teal-700 hover:bg-teal-200/50 rounded-full"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  open: boolean;
  badge?: string;
}

const NavItem = ({ href, icon, label, active, open, badge }: NavItemProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            "group flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-colors",
            active
              ? "bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-sm"
              : "text-teal-800 hover:bg-teal-200/50 hover:text-teal-900"
          )}
        >
          <span className="flex-shrink-0">{icon}</span>
          <span
            className={cn(
              "ml-3 flex-1 whitespace-nowrap transition-opacity",
              open ? "opacity-100" : "opacity-0"
            )}
          >
            {label}
          </span>
          {badge && (
            <span
              className={cn(
                "ml-auto bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full transition-opacity shadow-sm",
                open ? "opacity-100" : "opacity-0"
              )}
            >
              {badge}
            </span>
          )}
        </Link>
      </TooltipTrigger>
      {!open && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  );
};

interface ZoneNavItemProps {
  href: string;
  label: string;
  letter: string;
  active: boolean;
  open: boolean;
}

const ZoneNavItem = ({
  href,
  label,
  letter,
  active,
  open,
}: ZoneNavItemProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            "group flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-colors",
            active
              ? "bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-sm"
              : "text-teal-800 hover:bg-teal-200/50 hover:text-teal-900"
          )}
        >
          <div
            className={cn(
              "h-5 w-5 rounded-md flex items-center justify-center text-xs font-medium shadow-sm",
              active ? "bg-white text-teal-800" : "bg-teal-100 text-teal-800"
            )}
          >
            {letter}
          </div>
          <span
            className={cn(
              "ml-3 flex-1 whitespace-nowrap transition-opacity",
              open ? "opacity-100" : "opacity-0"
            )}
          >
            {label}
          </span>
        </Link>
      </TooltipTrigger>
      {!open && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  );
};

export default Sidebar;
