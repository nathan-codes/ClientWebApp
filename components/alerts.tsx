"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Bell, BellOff, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

// Mock data for alerts
const alerts = [
  {
    id: "alert-001",
    type: "critical",
    title: "Critical Gas Level",
    description: "Unit ACM-2025-0123 has reached critical gas level (5%)",
    zone: "East Legon",
    timestamp: "10 minutes ago",
    read: false,
  },
  {
    id: "alert-002",
    type: "warning",
    title: "Low Gas Level",
    description: "Unit ACM-2025-0124 has low gas level (15%)",
    zone: "East Legon",
    timestamp: "25 minutes ago",
    read: false,
  },
  {
    id: "alert-003",
    type: "info",
    title: "Refill Completed",
    description: "Unit ACM-2025-0125 has been refilled successfully",
    zone: "Adenta",
    timestamp: "1 hour ago",
    read: true,
  },
  {
    id: "alert-004",
    type: "critical",
    title: "Connection Lost",
    description: "Lost connection with unit ACM-2025-0126",
    zone: "Osu",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "alert-005",
    type: "warning",
    title: "Refill Request",
    description: "Unit ACM-2025-0127 has requested a refill",
    zone: "Adenta",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "alert-006",
    type: "info",
    title: "New Unit Added",
    description: "Unit ACM-2025-0128 has been added to the system",
    zone: "Tema",
    timestamp: "5 hours ago",
    read: true,
  },
  {
    id: "alert-007",
    type: "warning",
    title: "Battery Low",
    description: "Unit ACM-2025-0129 has low battery (15%)",
    zone: "Labadi",
    timestamp: "6 hours ago",
    read: false,
  },
  {
    id: "alert-008",
    type: "info",
    title: "Maintenance Completed",
    description: "Scheduled maintenance completed for unit ACM-2025-0130",
    zone: "Airport Residential",
    timestamp: "8 hours ago",
    read: true,
  },
  {
    id: "alert-009",
    type: "critical",
    title: "Possible Gas Leak",
    description: "Unusual gas level drop detected in unit ACM-2025-0131",
    zone: "Cantonments",
    timestamp: "10 hours ago",
    read: false,
  },
  {
    id: "alert-010",
    type: "info",
    title: "System Update",
    description: "System update completed successfully",
    zone: "All Zones",
    timestamp: "1 day ago",
    read: true,
  },
]

// Alert notification settings
const notificationSettings = [
  { id: "critical-alerts", label: "Critical Alerts", description: "Gas leaks, connection loss, etc.", enabled: true },
  {
    id: "warning-alerts",
    label: "Warning Alerts",
    description: "Low gas levels, refill requests, etc.",
    enabled: true,
  },
  {
    id: "info-alerts",
    label: "Informational Alerts",
    description: "Refills completed, system updates, etc.",
    enabled: true,
  },
  { id: "email-notifications", label: "Email Notifications", description: "Receive alerts via email", enabled: false },
  { id: "sms-notifications", label: "SMS Notifications", description: "Receive alerts via SMS", enabled: true },
  {
    id: "push-notifications",
    label: "Push Notifications",
    description: "Receive alerts via push notifications",
    enabled: true,
  },
]

const Alerts = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [settings, setSettings] = useState(notificationSettings)
  const [alertsData, setAlertsData] = useState(alerts)
  const { toast } = useToast()

  const handleMarkAsRead = (id: string) => {
    setAlertsData(alertsData.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)))
    toast({
      title: "Alert marked as read",
      description: "The alert has been marked as read.",
    })
  }

  const handleMarkAllAsRead = () => {
    setAlertsData(alertsData.map((alert) => ({ ...alert, read: true })))
    toast({
      title: "All alerts marked as read",
      description: "All alerts have been marked as read.",
    })
  }

  const handleClearAll = () => {
    setAlertsData([])
    toast({
      title: "All alerts cleared",
      description: "All alerts have been cleared from your list.",
    })
  }

  const handleToggleSetting = (id: string) => {
    setSettings(settings.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)))
    toast({
      title: "Setting updated",
      description: "Your notification setting has been updated.",
    })
  }

  // Filter alerts based on active tab, search term, and filter type
  const filteredAlerts = alertsData.filter((alert) => {
    // Filter by tab
    if (activeTab === "unread" && alert.read) return false
    if (activeTab === "read" && !alert.read) return false

    // Filter by search term
    if (
      searchTerm &&
      !alert.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !alert.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !alert.zone.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by type
    if (filterType !== "all" && alert.type !== filterType) return false

    return true
  })

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Alerts"
        subtitle="Notifications and system alerts"
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl gap-2" onClick={handleMarkAllAsRead}>
              <CheckCircle className="h-4 w-4" />
              Mark All as Read
            </Button>
            <Button variant="outline" className="rounded-xl gap-2" onClick={handleClearAll}>
              <BellOff className="h-4 w-4" />
              Clear All
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <div className="px-4 sm:px-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all" className="rounded-lg">
                All Alerts
              </TabsTrigger>
              <TabsTrigger value="unread" className="rounded-lg">
                Unread
              </TabsTrigger>
              <TabsTrigger value="read" className="rounded-lg">
                Read
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  className="pl-9 w-full rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px] rounded-xl gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="info">Information</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="flex-1 px-4 sm:px-6 pb-6">
          <AlertsList alerts={filteredAlerts} onMarkAsRead={handleMarkAsRead} />
        </TabsContent>

        <TabsContent value="unread" className="flex-1 px-4 sm:px-6 pb-6">
          <AlertsList alerts={filteredAlerts} onMarkAsRead={handleMarkAsRead} />
        </TabsContent>

        <TabsContent value="read" className="flex-1 px-4 sm:px-6 pb-6">
          <AlertsList alerts={filteredAlerts} onMarkAsRead={handleMarkAsRead} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface AlertsListProps {
  alerts: typeof alerts
  onMarkAsRead: (id: string) => void
}

const AlertsList = ({ alerts, onMarkAsRead }: AlertsListProps) => {
  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Bell className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No alerts found</h3>
        <p className="text-muted-foreground mt-1">There are no alerts matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className={alert.read ? "opacity-80" : "border-l-4 border-l-primary"}>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {alert.type === "critical" && (
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                  )}
                  {alert.type === "warning" && (
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                  )}
                  {alert.type === "info" && (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{alert.title}</h3>
                    <Badge
                      variant="outline"
                      className={
                        alert.type === "critical"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : alert.type === "warning"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                      }
                    >
                      {alert.type === "critical" ? "Critical" : alert.type === "warning" ? "Warning" : "Info"}
                    </Badge>
                    {!alert.read && <Badge className="bg-primary">New</Badge>}
                  </div>
                  <p className="text-muted-foreground mt-1">{alert.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <span>{alert.zone}</span>
                    <span>•</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              </div>
              {!alert.read && (
                <Button variant="outline" size="sm" className="rounded-lg" onClick={() => onMarkAsRead(alert.id)}>
                  Mark as Read
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Alerts
