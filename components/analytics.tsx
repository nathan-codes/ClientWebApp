"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for analytics
const refillData = [
  { name: "Jan", value: 65 },
  { name: "Feb", value: 78 },
  { name: "Mar", value: 92 },
  { name: "Apr", value: 128 },
  { name: "May", value: 110 },
  { name: "Jun", value: 105 },
  { name: "Jul", value: 120 },
]

const depletionData = [
  { name: "Jan", value: 4.2 },
  { name: "Feb", value: 3.8 },
  { name: "Mar", value: 3.5 },
  { name: "Apr", value: 3.2 },
  { name: "May", value: 3.4 },
  { name: "Jun", value: 3.6 },
  { name: "Jul", value: 3.3 },
]

const zoneComparisonData = [
  { name: "Adenta", refills: 27, depletion: 2.8 },
  { name: "East Legon", refills: 17, depletion: 3.4 },
  { name: "Airport", refills: 24, depletion: 2.5 },
  { name: "Cantonments", refills: 15, depletion: 3.7 },
  { name: "Osu", refills: 14, depletion: 4.1 },
  { name: "Labadi", refills: 8, depletion: 5.2 },
  { name: "Tema", refills: 6, depletion: 6.1 },
]

const pieData = [
  { name: "High Priority (< 2 days)", value: 35, color: "#EF4444" },
  { name: "Medium Priority (2-4 days)", value: 45, color: "#F59E0B" },
  { name: "Low Priority (> 4 days)", value: 20, color: "#22C55E" },
]

const COLORS = ["#EF4444", "#F59E0B", "#22C55E"]

const Analytics = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  })

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Analytics"
        subtitle="Performance metrics and trends"
        actions={
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal rounded-xl",
                    !dateRange && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            <Button variant="outline" className="rounded-xl gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="overview" className="flex-1">
        <div className="px-4 sm:px-6 pt-4">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="overview" className="rounded-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="zones" className="rounded-lg">
              Zones
            </TabsTrigger>
            <TabsTrigger value="trends" className="rounded-lg">
              Trends
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="flex-1 px-4 sm:px-6 pb-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Refill Requests</CardDescription>
                <CardTitle className="text-2xl">128</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-emerald-600">+12% from previous period</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Depletion Time</CardDescription>
                <CardTitle className="text-2xl">3.2 days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-red-600">-0.5 days from previous period</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Monitoring Units</CardDescription>
                <CardTitle className="text-2xl">1,452</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-emerald-600">+24 new installations</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Request-Alert Ratio</CardDescription>
                <CardTitle className="text-2xl">0.89</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-emerald-600">+0.03 from previous period</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Refill Requests Over Time</CardTitle>
                <CardDescription>Monthly trend of refill requests</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={refillData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Refill Requests"
                      stroke="#1D4ED8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Average Depletion Time</CardTitle>
                <CardDescription>Monthly trend of gas depletion time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={depletionData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Avg. Days to Depletion"
                      stroke="#3B82F6"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Depletion Priority Distribution</CardTitle>
              <CardDescription>Current distribution of units by depletion priority</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="flex-1 px-4 sm:px-6 pb-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
            <Select defaultValue="refills">
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="refills">Refill Requests</SelectItem>
                <SelectItem value="depletion">Depletion Time</SelectItem>
                <SelectItem value="ratio">Request-Alert Ratio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Zone Comparison</CardTitle>
              <CardDescription>Comparing key metrics across zones</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={zoneComparisonData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#1D4ED8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="refills" name="Refill Requests" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
                  <Bar
                    yAxisId="right"
                    dataKey="depletion"
                    name="Avg. Depletion Time (days)"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Zones</CardTitle>
                <CardDescription>Zones with best metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 rounded-md flex items-center justify-center text-sm font-medium">
                        E
                      </div>
                      <div>
                        <div className="font-medium">East Legon</div>
                        <div className="text-sm text-muted-foreground">245 active units</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">0.92</div>
                      <div className="text-sm text-muted-foreground">Request-Alert Ratio</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 rounded-md flex items-center justify-center text-sm font-medium">
                        L
                      </div>
                      <div>
                        <div className="font-medium">Labadi</div>
                        <div className="text-sm text-muted-foreground">92 active units</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">0.94</div>
                      <div className="text-sm text-muted-foreground">Request-Alert Ratio</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 rounded-md flex items-center justify-center text-sm font-medium">
                        T
                      </div>
                      <div>
                        <div className="font-medium">Tema</div>
                        <div className="text-sm text-muted-foreground">78 active units</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">0.96</div>
                      <div className="text-sm text-muted-foreground">Request-Alert Ratio</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zones Needing Attention</CardTitle>
                <CardDescription>Zones with metrics below target</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 rounded-md flex items-center justify-center text-sm font-medium">
                        A
                      </div>
                      <div>
                        <div className="font-medium">Airport Residential</div>
                        <div className="text-sm text-muted-foreground">156 active units</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">0.78</div>
                      <div className="text-sm text-muted-foreground">Request-Alert Ratio</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 rounded-md flex items-center justify-center text-sm font-medium">
                        A
                      </div>
                      <div>
                        <div className="font-medium">Adenta</div>
                        <div className="text-sm text-muted-foreground">182 active units</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">0.85</div>
                      <div className="text-sm text-muted-foreground">Request-Alert Ratio</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 rounded-md flex items-center justify-center text-sm font-medium">
                        O
                      </div>
                      <div>
                        <div className="font-medium">Osu</div>
                        <div className="text-sm text-muted-foreground">156 active units</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">0.88</div>
                      <div className="text-sm text-muted-foreground">Request-Alert Ratio</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="flex-1 px-4 sm:px-6 pb-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
            <Select defaultValue="monthly">
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Long-term Trends</CardTitle>
              <CardDescription>Key metrics over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: "Jan", refills: 65, depletion: 4.2, ratio: 0.82 },
                    { month: "Feb", refills: 78, depletion: 3.8, ratio: 0.84 },
                    { month: "Mar", refills: 92, depletion: 3.5, ratio: 0.85 },
                    { month: "Apr", refills: 128, depletion: 3.2, ratio: 0.89 },
                    { month: "May", refills: 110, depletion: 3.4, ratio: 0.87 },
                    { month: "Jun", refills: 105, depletion: 3.6, ratio: 0.86 },
                    { month: "Jul", refills: 120, depletion: 3.3, ratio: 0.88 },
                  ]}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="refills"
                    name="Refill Requests"
                    stroke="#1D4ED8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="depletion"
                    name="Avg. Depletion Time (days)"
                    stroke="#3B82F6"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="ratio"
                    name="Request-Alert Ratio"
                    stroke="#22C55E"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seasonal Analysis</CardTitle>
              <CardDescription>Identifying seasonal patterns in gas consumption</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { quarter: "Q1 2024", consumption: 1250, refills: 85 },
                    { quarter: "Q2 2024", consumption: 1450, refills: 110 },
                    { quarter: "Q3 2024", consumption: 1350, refills: 95 },
                    { quarter: "Q4 2024", consumption: 1550, refills: 125 },
                    { quarter: "Q1 2025", consumption: 1300, refills: 90 },
                    { quarter: "Q2 2025", consumption: 1500, refills: 115 },
                  ]}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="consumption"
                    name="Gas Consumption (L)"
                    fill="#1D4ED8"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="refills"
                    name="Avg. Refills per Month"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Analytics
