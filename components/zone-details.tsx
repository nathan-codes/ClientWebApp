"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Download, Search, MessageSquare, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/layout/page-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for zone details
const zoneData = {
  "east-legon": {
    name: "East Legon",
    activeUnits: 245,
    lastUpdated: "April 25, 2025 14:30",
    avgDepletionTime: { value: "3.4 days", trend: "up", change: "0.2 days from last week" },
    activeRefillRequests: { value: 17, trend: "down", change: "8% from last week" },
    unitsRequiringAction: { value: 42, unmessaged: 28 },
    requestAlertRatio: { value: 0.92, status: "Good performance" },
    units: [
      {
        serialNumber: "ACM-2025-0123",
        lastRefill: "April 20, 2025",
        totalRefills: 24,
        requestedRefill: true,
        messaged: false,
        location: "12 Boundary Road",
        customer: "Akosua Mensah",
        gasLevel: "15%",
        estimatedDepletion: "2 days",
      },
      {
        serialNumber: "ACM-2025-0124",
        lastRefill: "April 18, 2025",
        totalRefills: 18,
        requestedRefill: true,
        messaged: false,
        location: "5 Lagos Avenue",
        customer: "Kwame Osei",
        gasLevel: "12%",
        estimatedDepletion: "1 day",
      },
      {
        serialNumber: "ACM-2025-0125",
        lastRefill: "April 22, 2025",
        totalRefills: 15,
        requestedRefill: true,
        messaged: true,
        location: "8 Accra Road",
        customer: "Ama Darko",
        gasLevel: "18%",
        estimatedDepletion: "3 days",
      },
      {
        serialNumber: "ACM-2025-0126",
        lastRefill: "April 19, 2025",
        totalRefills: 22,
        requestedRefill: false,
        messaged: false,
        location: "23 Independence Avenue",
        customer: "Kofi Annan",
        gasLevel: "35%",
        estimatedDepletion: "5 days",
      },
      {
        serialNumber: "ACM-2025-0127",
        lastRefill: "April 21, 2025",
        totalRefills: 19,
        requestedRefill: true,
        messaged: false,
        location: "17 Liberation Road",
        customer: "Abena Poku",
        gasLevel: "10%",
        estimatedDepletion: "1 day",
      },
    ],
    history: [
      { date: "April 25, 2025", event: "5 new refill requests", type: "request" },
      { date: "April 24, 2025", event: "12 units refilled", type: "refill" },
      { date: "April 23, 2025", event: "System maintenance", type: "system" },
      { date: "April 22, 2025", event: "8 new refill requests", type: "request" },
      { date: "April 21, 2025", event: "15 units refilled", type: "refill" },
    ],
  },
  adenta: {
    name: "Adenta",
    activeUnits: 182,
    lastUpdated: "April 25, 2025 14:15",
    avgDepletionTime: { value: "2.8 days", trend: "down", change: "0.5 days from last week" },
    activeRefillRequests: { value: 27, trend: "up", change: "12% from last week" },
    unitsRequiringAction: { value: 35, unmessaged: 22 },
    requestAlertRatio: { value: 0.85, status: "Good performance" },
    units: [
      {
        serialNumber: "ACM-2025-0128",
        lastRefill: "April 19, 2025",
        totalRefills: 18,
        requestedRefill: true,
        messaged: false,
        location: "45 Adenta Road",
        customer: "Kwesi Amissah",
        gasLevel: "8%",
        estimatedDepletion: "1 day",
      },
      {
        serialNumber: "ACM-2025-0129",
        lastRefill: "April 21, 2025",
        totalRefills: 20,
        requestedRefill: true,
        messaged: true,
        location: "12 School Junction",
        customer: "Efua Sutherland",
        gasLevel: "14%",
        estimatedDepletion: "2 days",
      },
    ],
    history: [
      { date: "April 25, 2025", event: "7 new refill requests", type: "request" },
      { date: "April 24, 2025", event: "9 units refilled", type: "refill" },
      { date: "April 23, 2025", event: "System maintenance", type: "system" },
      { date: "April 22, 2025", event: "5 new refill requests", type: "request" },
      { date: "April 21, 2025", event: "11 units refilled", type: "refill" },
    ],
  },
  osu: {
    name: "Osu",
    activeUnits: 156,
    lastUpdated: "April 25, 2025 13:45",
    avgDepletionTime: { value: "4.1 days", trend: "none", change: "No change from last week" },
    activeRefillRequests: { value: 14, trend: "up", change: "5% from last week" },
    unitsRequiringAction: { value: 28, unmessaged: 15 },
    requestAlertRatio: { value: 0.88, status: "Good performance" },
    units: [
      {
        serialNumber: "ACM-2025-0130",
        lastRefill: "April 21, 2025",
        totalRefills: 22,
        requestedRefill: true,
        messaged: false,
        location: "8 Oxford Street",
        customer: "Nii Armah",
        gasLevel: "11%",
        estimatedDepletion: "2 days",
      },
      {
        serialNumber: "ACM-2025-0131",
        lastRefill: "April 20, 2025",
        totalRefills: 16,
        requestedRefill: true,
        messaged: false,
        location: "23 Ring Road",
        customer: "Adjoa Baiden",
        gasLevel: "9%",
        estimatedDepletion: "1 day",
      },
    ],
    history: [
      { date: "April 25, 2025", event: "4 new refill requests", type: "request" },
      { date: "April 24, 2025", event: "7 units refilled", type: "refill" },
      { date: "April 23, 2025", event: "System maintenance", type: "system" },
      { date: "April 22, 2025", event: "3 new refill requests", type: "request" },
      { date: "April 21, 2025", event: "8 units refilled", type: "refill" },
    ],
  },
}

const ZoneDetails = ({ zone }: { zone: string }) => {
  const [message, setMessage] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
  const [unitMessage, setUnitMessage] = useState("")
  const { toast } = useToast()

  // Default to East Legon if zone not found
  const zoneInfo = zoneData[zone as keyof typeof zoneData] || zoneData["east-legon"]

  const handleSendMessage = () => {
    toast({
      title: "Message sent successfully",
      description: `Message sent to ${zoneInfo.unitsRequiringAction.unmessaged} units in ${zoneInfo.name}.`,
    })
    setMessage("")
  }

  const handleSendUnitMessage = () => {
    toast({
      title: "Message sent successfully",
      description: `Message sent to unit ${selectedUnit}.`,
    })
    setUnitMessage("")
    setSelectedUnit(null)
  }

  // Filter units based on search and filter status
  const filteredUnits = zoneInfo.units.filter((unit) => {
    const matchesSearch =
      searchTerm === "" ||
      unit.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.location.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterStatus === "all") return matchesSearch
    if (filterStatus === "requested") return matchesSearch && unit.requestedRefill
    if (filterStatus === "not-messaged") return matchesSearch && !unit.messaged
    if (filterStatus === "messaged") return matchesSearch && unit.messaged

    return matchesSearch
  })

  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage)
  const paginatedUnits = filteredUnits.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title={`${zoneInfo.name} Zone Details`}
        subtitle={`${zoneInfo.activeUnits} Active Units • Last Updated: ${zoneInfo.lastUpdated}`}
        actions={
          <Button variant="outline" className="rounded-xl gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        }
      />

      <Tabs defaultValue="overview" className="flex-1">
        <div className="px-4 sm:px-6 pt-4">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="overview" className="rounded-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="units" className="rounded-lg">
              Units
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg">
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="flex-1 px-4 sm:px-6 pb-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Depletion Time</CardDescription>
                <CardTitle className="text-2xl">{zoneInfo.avgDepletionTime.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm flex items-center gap-1">
                  {zoneInfo.avgDepletionTime.trend === "up" && <ArrowUp className="h-3 w-3 text-emerald-500" />}
                  {zoneInfo.avgDepletionTime.trend === "down" && <ArrowDown className="h-3 w-3 text-red-500" />}
                  <span className="text-muted-foreground">{zoneInfo.avgDepletionTime.change}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Refill Requests</CardDescription>
                <CardTitle className="text-2xl">{zoneInfo.activeRefillRequests.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm flex items-center gap-1">
                  {zoneInfo.activeRefillRequests.trend === "up" && <ArrowUp className="h-3 w-3 text-emerald-500" />}
                  {zoneInfo.activeRefillRequests.trend === "down" && <ArrowDown className="h-3 w-3 text-red-500" />}
                  <span className="text-muted-foreground">{zoneInfo.activeRefillRequests.change}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Units Requiring Action</CardDescription>
                <CardTitle className="text-2xl">{zoneInfo.unitsRequiringAction.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {zoneInfo.unitsRequiringAction.unmessaged} not yet messaged
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Request-Alert Ratio</CardDescription>
                <CardTitle className="text-2xl">{zoneInfo.requestAlertRatio.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">{zoneInfo.requestAlertRatio.status}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Global Message</CardTitle>
              <CardDescription>Send a message to all unmessaged units in this zone</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Textarea
                  placeholder="Type message for unmessaged units..."
                  className="flex-1 min-h-[80px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button className="sm:self-end rounded-xl" onClick={handleSendMessage} disabled={!message.trim()}>
                  Send to All ({zoneInfo.unitsRequiringAction.unmessaged})
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest events in this zone</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {zoneInfo.history.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 mt-2 rounded-full ${
                        item.type === "request"
                          ? "bg-blue-500"
                          : item.type === "refill"
                            ? "bg-green-500"
                            : "bg-amber-500"
                      }`}
                    />
                    <div>
                      <div className="font-medium">{item.event}</div>
                      <div className="text-sm text-muted-foreground">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="units" className="flex-1 px-4 sm:px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px] rounded-xl gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Units</SelectItem>
                  <SelectItem value="requested">Requested Refill</SelectItem>
                  <SelectItem value="not-messaged">Not Messaged</SelectItem>
                  <SelectItem value="messaged">Messaged</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search units..."
                  className="pl-9 w-full rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Gas Level</TableHead>
                    <TableHead>Est. Depletion</TableHead>
                    <TableHead>Last Refill</TableHead>
                    <TableHead>Requested Refill</TableHead>
                    <TableHead>Messaged</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUnits.map((unit) => (
                    <TableRow key={unit.serialNumber} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{unit.serialNumber}</TableCell>
                      <TableCell>{unit.customer}</TableCell>
                      <TableCell>{unit.location}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            Number.parseFloat(unit.gasLevel) > 30
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : Number.parseFloat(unit.gasLevel) > 15
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {unit.gasLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>{unit.estimatedDepletion}</TableCell>
                      <TableCell>{unit.lastRefill}</TableCell>
                      <TableCell>
                        <Badge variant={unit.requestedRefill ? "default" : "outline"}>
                          {unit.requestedRefill ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            unit.messaged
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {unit.messaged ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg gap-1"
                              onClick={() => setSelectedUnit(unit.serialNumber)}
                            >
                              <MessageSquare className="h-4 w-4" />
                              Message
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Send Message</DialogTitle>
                              <DialogDescription>
                                Send a message to unit {unit.serialNumber} at {unit.location}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <Textarea
                                placeholder="Type your message here..."
                                className="min-h-[100px]"
                                value={unitMessage}
                                onChange={(e) => setUnitMessage(e.target.value)}
                              />
                            </div>
                            <DialogFooter>
                              <Button
                                type="submit"
                                className="rounded-xl"
                                onClick={handleSendUnitMessage}
                                disabled={!unitMessage.trim()}
                              >
                                Send Message
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="px-4 py-3 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredUnits.length)} of {filteredUnits.length} units
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                >
                  Previous
                </Button>

                {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className={currentPage === page ? "bg-primary rounded-lg" : "rounded-lg"}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                })}

                {totalPages > 3 && currentPage < totalPages - 1 && <span className="text-muted-foreground">...</span>}

                {totalPages > 3 && currentPage < totalPages && (
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    className={currentPage === totalPages ? "bg-primary rounded-lg" : "rounded-lg"}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="flex-1 px-4 sm:px-6 pb-6">
          <Card>
            <CardHeader>
              <CardTitle>Zone Activity History</CardTitle>
              <CardDescription>Complete history of events in this zone</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {zoneInfo.history.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 pb-6 border-b last:border-0">
                    <div
                      className={`w-3 h-3 mt-1 rounded-full flex-shrink-0 ${
                        item.type === "request"
                          ? "bg-blue-500"
                          : item.type === "refill"
                            ? "bg-green-500"
                            : "bg-amber-500"
                      }`}
                    />
                    <div>
                      <div className="font-medium">{item.event}</div>
                      <div className="text-sm text-muted-foreground">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ZoneDetails
