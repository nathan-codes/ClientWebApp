import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Download, Printer, Search, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <header className="border-b border-teal-100 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-white to-teal-50">
      <div>
        <h1 className="text-xl font-semibold text-teal-900">{title}</h1>
        {subtitle && <p className="text-sm text-teal-600">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {actions}

        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-teal-500" />
          <Input
            placeholder="Search..."
            className="pl-9 w-[250px] rounded-xl border-teal-200 focus-visible:ring-teal-500"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <DropdownMenuLabel className="text-teal-900">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-teal-100" />
            <div className="max-h-[300px] overflow-y-auto">
              <div className="py-2 px-3 hover:bg-teal-50 rounded-lg cursor-pointer">
                <div className="font-medium text-sm text-teal-900">
                  New refill request
                </div>
                <div className="text-xs text-teal-600">
                  East Legon zone - 5 minutes ago
                </div>
              </div>
              <div className="py-2 px-3 hover:bg-teal-50 rounded-lg cursor-pointer">
                <div className="font-medium text-sm text-teal-900">
                  Low gas level alert
                </div>
                <div className="text-xs text-teal-600">
                  Adenta zone - 15 minutes ago
                </div>
              </div>
              <div className="py-2 px-3 hover:bg-teal-50 rounded-lg cursor-pointer">
                <div className="font-medium text-sm text-teal-900">
                  System maintenance
                </div>
                <div className="text-xs text-teal-600">
                  Scheduled for tomorrow at 2:00 PM
                </div>
              </div>
            </div>
            <DropdownMenuSeparator className="bg-teal-100" />
            <DropdownMenuItem className="justify-center font-medium text-teal-700 hover:text-teal-900 hover:bg-teal-50">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-teal-700 hover:text-teal-900 hover:bg-teal-50">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </DropdownMenuItem>
            <DropdownMenuItem className="text-teal-700 hover:text-teal-900 hover:bg-teal-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-teal-100" />
            <DropdownMenuItem className="text-teal-700 hover:text-teal-900 hover:bg-teal-50">
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-teal-100"
            >
              <Avatar className="h-8 w-8 border-2 border-teal-200">
                <AvatarImage src="/placeholder-user.jpg" alt="Kofi Mensah" />
                <AvatarFallback className="bg-gradient-to-br from-teal-100 to-teal-200 text-teal-800">
                  KM
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-teal-900">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-teal-100" />
            <DropdownMenuItem className="text-teal-700 hover:text-teal-900 hover:bg-teal-50">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-teal-700 hover:text-teal-900 hover:bg-teal-50">
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-teal-100" />
            <DropdownMenuItem className="text-teal-700 hover:text-teal-900 hover:bg-teal-50">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
