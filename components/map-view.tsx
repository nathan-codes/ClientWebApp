"use client";

import { useState, useEffect } from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChartIcon,
  Clock,
  Download,
  Expand,
  Filter,
  MapPin,
  Minus,
  Plus,
  Printer,
  Signal,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/layout/page-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for zones
const zones = [
  {
    id: "adenta",
    name: "Adenta",
    level: "high",
    coordinates: { lat: 5.7019, lng: -0.1548 },
    position: { top: "25%", left: "65%" },
    stats: {
      refillRequests: 27,
      avgTimeToDepletion: "2.8 days",
      activeUnits: 182,
    },
  },
  {
    id: "east-legon",
    name: "East Legon",
    level: "medium",
    coordinates: { lat: 5.6364, lng: -0.1633 },
    position: { top: "35%", left: "55%" },
    stats: {
      refillRequests: 17,
      avgTimeToDepletion: "3.4 days",
      activeUnits: 245,
    },
  },
  {
    id: "airport-residential",
    name: "Airport Residential",
    level: "high",
    coordinates: { lat: 5.6056, lng: -0.1819 },
    position: { top: "45%", left: "45%" },
    stats: {
      refillRequests: 24,
      avgTimeToDepletion: "2.5 days",
      activeUnits: 156,
    },
  },
  {
    id: "cantonments",
    name: "Cantonments",
    level: "medium",
    coordinates: { lat: 5.5881, lng: -0.1763 },
    position: { top: "55%", left: "35%" },
    stats: {
      refillRequests: 15,
      avgTimeToDepletion: "3.7 days",
      activeUnits: 128,
    },
  },
  {
    id: "osu",
    name: "Osu",
    level: "medium",
    coordinates: { lat: 5.5565, lng: -0.1743 },
    position: { top: "65%", left: "45%" },
    stats: {
      refillRequests: 14,
      avgTimeToDepletion: "4.1 days",
      activeUnits: 156,
    },
  },
  {
    id: "labadi",
    name: "Labadi",
    level: "low",
    coordinates: { lat: 5.5629, lng: -0.1494 },
    position: { top: "70%", left: "55%" },
    stats: {
      refillRequests: 8,
      avgTimeToDepletion: "5.2 days",
      activeUnits: 92,
    },
  },
  {
    id: "tema",
    name: "Tema",
    level: "low",
    coordinates: { lat: 5.6698, lng: -0.0167 },
    position: { top: "40%", left: "85%" },
    stats: {
      refillRequests: 6,
      avgTimeToDepletion: "6.1 days",
      activeUnits: 78,
    },
  },
];

// Metrics for the dashboard
const metrics = [
  {
    id: "refill-requests",
    name: "Refill Requests",
    icon: <BarChartIcon className="h-4 w-4" />,
  },
  {
    id: "time-to-depletion",
    name: "Time to Depletion",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: "request-alert-ratio",
    name: "Request-Alert Ratio",
    icon: <Signal className="h-4 w-4" />,
  },
];

// Stats for the dashboard
const stats = [
  {
    id: "total-zones",
    title: "Total Zones",
    value: "12",
    icon: <MapPin className="h-5 w-5 text-primary/60" />,
    subtitle: "Across Greater Accra",
  },
  {
    id: "total-refill-requests",
    title: "Total Refill Requests",
    value: "128",
    icon: <BarChartIcon className="h-5 w-5 text-primary/60" />,
    subtitle: "12% from yesterday",
    trend: "up",
  },
  {
    id: "avg-time-to-depletion",
    title: "Avg. Time to Depletion",
    value: "3.2 days",
    icon: <Clock className="h-5 w-5 text-primary/60" />,
    subtitle: "0.5 days from last week",
    trend: "down",
  },
  {
    id: "active-monitoring-units",
    title: "Active Monitoring Units",
    value: "1,452",
    icon: <Wifi className="h-5 w-5 text-primary/60" />,
    subtitle: "24 new installations this week",
    trend: "up",
  },
];

// Geographic features of Accra (simplified)
const accraMapFeatures = [
  {
    id: "ocean",
    className: "bg-blue-100",
    path: "M0 0 L100 0 L100 100 L0 100 Z",
    position: { top: "0", left: "0", right: "0", bottom: "0" },
  },
  {
    id: "main-roads",
    className: "border-2 border-amber-200",
    path: "M25 50 L75 50 M50 25 L50 75",
    position: { top: "0", left: "0", right: "0", bottom: "0" },
  },
  {
    id: "coastline",
    className: "bg-yellow-100",
    path: "M0 70 L100 80",
    position: { top: "0", left: "0", right: "0", bottom: "0" },
  },
];

const MapView = () => {
  const [activeMetric, setActiveMetric] = useState("refill-requests");
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentYear, setCurrentYear] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(zoneId);
  };

  const handleQuickAction = (action: string, zoneId: string) => {
    const zone = zones.find((z) => z.id === zoneId);
    if (!zone) return;

    toast({
      title: `${action} for ${zone.name}`,
      description: `Action triggered successfully for ${zone.name} zone.`,
    });
  };

  const getZoneColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-500 hover:bg-red-600";
      case "medium":
        return "bg-amber-500 hover:bg-amber-600";
      case "low":
        return "bg-emerald-500 hover:bg-emerald-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getZoneLevel = (zone: (typeof zones)[0], metric: string) => {
    switch (metric) {
      case "refill-requests":
        if (zone.stats.refillRequests >= 20) return "high";
        if (zone.stats.refillRequests >= 10) return "medium";
        if (zone.stats.refillRequests > 0) return "low";
        return "none";

      case "time-to-depletion":
        const days = parseFloat(zone.stats.avgTimeToDepletion.split(" ")[0]);
        if (days <= 2) return "high";
        if (days <= 4) return "medium";
        return "low";

      case "request-alert-ratio":
        const ratio = zone.stats.refillRequests / zone.stats.activeUnits;
        if (ratio >= 0.2) return "high";
        if (ratio >= 0.1) return "medium";
        if (ratio > 0) return "low";
        return "none";

      default:
        return "none";
    }
  };

  const getZoneFillColor = (zoneId: string, metric: string) => {
    const zone = zones.find((z) => z.id === zoneId);
    if (!zone) return "#F5F5F5";

    const level = getZoneLevel(zone, metric);

    // If zone is selected, use a highlighted version
    if (selectedZone === zoneId) {
      return level === "high"
        ? "#FFDDDD"
        : level === "medium"
        ? "#FFF2DD"
        : level === "low"
        ? "#D7F0E5"
        : "#F5F5F5";
    }

    // Default colors based on zone level
    return level === "high"
      ? "#FFF0F0"
      : level === "medium"
      ? "#FFFBF0"
      : level === "low"
      ? "#E8F6F1"
      : "#F5F5F5";
  };

  const getZoneStrokeColor = (zoneId: string, metric: string) => {
    const zone = zones.find((z) => z.id === zoneId);
    if (!zone) return "#D0D0D0";

    const level = getZoneLevel(zone, metric);

    // If zone is selected, use a highlighted version
    if (selectedZone === zoneId) {
      return level === "high"
        ? "#FF6666"
        : level === "medium"
        ? "#FFCC66"
        : level === "low"
        ? "#4BD3A4"
        : "#D0D0D0";
    }

    // Default colors based on zone level
    return level === "high"
      ? "#FFB0B0"
      : level === "medium"
      ? "#FFE0B0"
      : level === "low"
      ? "#A5E1D1"
      : "#D0D0D0";
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <PageHeader
        title="Map View"
        subtitle="Accra, Ghana Gas Monitoring Dashboard"
        actions={
          <Button variant="outline" className="rounded-xl gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        }
      />

      <div className="p-4 sm:p-6 flex flex-wrap items-center gap-3">
        <div className="text-sm font-medium">Metric:</div>

        {metrics.map((metric) => (
          <Button
            key={metric.id}
            variant={activeMetric === metric.id ? "default" : "outline"}
            className={cn(
              "gap-2 rounded-xl",
              activeMetric === metric.id ? "bg-primary hover:bg-primary/90" : ""
            )}
            onClick={() => setActiveMetric(metric.id)}
          >
            {metric.icon}
            {metric.name}
          </Button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl">
                  <Expand className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Fullscreen</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-xl">
                <Printer className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Print Map</DropdownMenuItem>
              <DropdownMenuItem>Print Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-xl">
                <Download className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Export as PNG</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export Data as CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6 relative overflow-hidden min-h-[500px]">
        <div className="relative h-full rounded-2xl overflow-hidden shadow-sm border">
          {/* Map container with Accra styled map */}
          <div className="absolute inset-0 bg-blue-50 overflow-hidden">
            {/* Map title overlay */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm border z-20">
              <h3 className="font-medium text-sm text-teal-900">
                Greater Accra Region
              </h3>
              <p className="text-xs text-teal-700">
                Gas monitoring zones overlay
              </p>
            </div>

            {/* Map scale */}
            <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded-lg shadow-sm border z-20 flex items-center text-xs">
              <div className="w-12 h-[2px] bg-teal-700 mr-2"></div>
              <span className="text-teal-700">5 km</span>
            </div>

            {/* Map data attribution */}
            <div className="absolute bottom-4 left-28 text-xs text-teal-600 bg-white/80 px-2 py-1 rounded z-20">
              AcuteMeter {currentYear ? `© ${currentYear}` : ""}
            </div>

            {/* Styled map representation of Accra */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
              {/* Base map - Ghana outline with Accra highlighted */}
              <svg
                viewBox="0 0 800 600"
                className="absolute inset-0 w-full h-full"
                style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.1))" }}
              >
                {/* Gulf of Guinea */}
                <rect
                  x="0"
                  y="400"
                  width="800"
                  height="200"
                  fill="#A5E1E9"
                  opacity="0.6"
                />

                {/* Ghana simplified outline */}
                <path
                  d="M150,100 L650,100 L650,400 C650,400 600,450 500,480 C400,510 350,450 300,450 C250,450 200,480 150,400 Z"
                  fill="#E8F6F1"
                  stroke="#CCCCCC"
                  strokeWidth="1"
                />

                {/* Greater Accra region highlight */}
                <path
                  d="M350,350 C350,350 380,330 410,340 C440,350 480,380 520,370 C560,360 580,400 580,400 C580,400 550,430 500,440 C450,450 420,420 380,420 C340,420 320,400 320,400 Z"
                  fill="#D7F0E5"
                  stroke="#A0A0A0"
                  strokeWidth="1.5"
                />

                {/* Zone neighborhood areas */}
                {/* Adenta zone */}
                <path
                  d="M520,340 C520,340 540,330 550,340 C560,350 555,365 545,370 C535,375 525,365 520,355 C515,345 520,340 520,340 Z"
                  fill={getZoneFillColor("adenta", activeMetric)}
                  stroke={getZoneStrokeColor("adenta", activeMetric)}
                  strokeWidth={selectedZone === "adenta" ? "2" : "1"}
                  opacity={selectedZone === "adenta" ? "0.9" : "0.7"}
                />

                {/* East Legon zone */}
                <path
                  d="M470,350 C470,350 485,345 495,350 C505,355 510,365 505,370 C500,375 485,375 475,365 C465,355 470,350 470,350 Z"
                  fill={getZoneFillColor("east-legon", activeMetric)}
                  stroke={getZoneStrokeColor("east-legon", activeMetric)}
                  strokeWidth={selectedZone === "east-legon" ? "2" : "1"}
                  opacity={selectedZone === "east-legon" ? "0.9" : "0.7"}
                />

                {/* Airport Residential zone */}
                <path
                  d="M440,355 C440,355 450,350 460,355 C470,360 470,370 460,375 C450,380 440,375 435,370 C430,365 440,355 440,355 Z"
                  fill={getZoneFillColor("airport-residential", activeMetric)}
                  stroke={getZoneStrokeColor(
                    "airport-residential",
                    activeMetric
                  )}
                  strokeWidth={
                    selectedZone === "airport-residential" ? "2" : "1"
                  }
                  opacity={
                    selectedZone === "airport-residential" ? "0.9" : "0.7"
                  }
                />

                {/* Cantonments zone */}
                <path
                  d="M410,375 C410,375 425,370 435,380 C445,390 440,400 430,405 C420,410 405,400 405,390 C405,380 410,375 410,375 Z"
                  fill={getZoneFillColor("cantonments", activeMetric)}
                  stroke={getZoneStrokeColor("cantonments", activeMetric)}
                  strokeWidth={selectedZone === "cantonments" ? "2" : "1"}
                  opacity={selectedZone === "cantonments" ? "0.9" : "0.7"}
                />

                {/* Osu zone */}
                <path
                  d="M380,385 C380,385 395,380 405,390 C415,400 410,410 400,415 C390,420 375,410 375,400 C375,390 380,385 380,385 Z"
                  fill={getZoneFillColor("osu", activeMetric)}
                  stroke={getZoneStrokeColor("osu", activeMetric)}
                  strokeWidth={selectedZone === "osu" ? "2" : "1"}
                  opacity={selectedZone === "osu" ? "0.9" : "0.7"}
                />

                {/* Labadi zone */}
                <path
                  d="M350,390 C350,390 365,385 375,395 C385,405 380,415 370,420 C360,425 345,415 345,405 C345,395 350,390 350,390 Z"
                  fill={getZoneFillColor("labadi", activeMetric)}
                  stroke={getZoneStrokeColor("labadi", activeMetric)}
                  strokeWidth={selectedZone === "labadi" ? "2" : "1"}
                  opacity={selectedZone === "labadi" ? "0.9" : "0.7"}
                />

                {/* Tema zone */}
                <path
                  d="M540,385 C540,385 555,380 565,385 C575,390 580,400 570,410 C560,420 545,415 535,405 C525,395 540,385 540,385 Z"
                  fill={getZoneFillColor("tema", activeMetric)}
                  stroke={getZoneStrokeColor("tema", activeMetric)}
                  strokeWidth={selectedZone === "tema" ? "2" : "1"}
                  opacity={selectedZone === "tema" ? "0.9" : "0.7"}
                />

                {/* Major water bodies */}
                {/* Volta Lake (eastern edge) */}
                <path
                  d="M630,150 Q650,250 620,350"
                  stroke="#A4D3EE"
                  strokeWidth="15"
                  fill="none"
                  opacity="0.5"
                />

                {/* Weija Reservoir */}
                <ellipse
                  cx="340"
                  cy="370"
                  rx="20"
                  ry="10"
                  fill="#A4D3EE"
                  opacity="0.5"
                />

                {/* Accra coastline */}
                <path
                  d="M320,400 Q400,430 500,410 Q550,400 580,400"
                  stroke="#F9E79F"
                  strokeWidth="3"
                  fill="none"
                />

                {/* Major Roads */}
                {/* N1 Highway */}
                <path
                  d="M320,380 L580,380"
                  stroke="#D5D5D5"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Accra-Tema Motorway */}
                <path
                  d="M400,360 L550,350"
                  stroke="#D5D5D5"
                  strokeWidth="2.5"
                  fill="none"
                />

                {/* Ring Road */}
                <path
                  d="M410,370 Q430,360 450,370 Q470,380 450,390 Q430,400 410,390 Q390,380 410,370"
                  stroke="#D5D5D5"
                  strokeWidth="1.5"
                  fill="none"
                />

                {/* City center marker */}
                <circle cx="430" cy="380" r="3" fill="#909090" opacity="0.6" />

                {/* Kotoka Airport marker */}
                <rect
                  x="450"
                  y="355"
                  width="15"
                  height="10"
                  fill="#D5D5D5"
                  transform="rotate(45, 450, 355)"
                />

                {/* Tema Port */}
                <path
                  d="M550,400 L560,410 L540,410 Z"
                  fill="#A4D3EE"
                  opacity="0.6"
                />

                {/* Text labels */}
                <text
                  x="425"
                  y="395"
                  fontSize="10"
                  fill="#505050"
                  textAnchor="middle"
                  fontWeight="500"
                >
                  ACCRA
                </text>
                <text
                  x="550"
                  y="395"
                  fontSize="8"
                  fill="#505050"
                  textAnchor="middle"
                >
                  TEMA
                </text>
                <text
                  x="380"
                  y="365"
                  fontSize="6"
                  fill="#505050"
                  textAnchor="middle"
                >
                  AIRPORT
                </text>
                <text
                  x="340"
                  y="385"
                  fontSize="6"
                  fill="#505050"
                  textAnchor="middle"
                >
                  LABADI
                </text>
                <text
                  x="470"
                  y="365"
                  fontSize="6"
                  fill="#505050"
                  textAnchor="middle"
                >
                  EAST LEGON
                </text>
                <text
                  x="500"
                  y="380"
                  fontSize="6"
                  fill="#505050"
                  textAnchor="middle"
                >
                  CANTONMENTS
                </text>
                <text
                  x="400"
                  y="410"
                  fontSize="10"
                  fill="#6CA6CD"
                  textAnchor="middle"
                  opacity="0.7"
                >
                  Gulf of Guinea
                </text>
              </svg>
            </div>

            {/* Zones - update positions to match geographic locations */}
            {zones.map((zone) => (
              <div
                key={zone.id}
                className="absolute"
                style={{
                  top: zone.position.top,
                  left: zone.position.left,
                  transform: `scale(${zoomLevel})`,
                  transition: "transform 0.3s ease",
                  zIndex: 10,
                }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="group relative">
                      {/* Animated pulse effect for high request zones */}
                      {getZoneLevel(zone, activeMetric) === "high" && (
                        <div className="absolute inset-0 rounded-xl animate-ping bg-red-500 opacity-25 -z-10"></div>
                      )}

                      {/* Zone marker with drop shadow and hover effects */}
                      <Button
                        className={cn(
                          "p-4 rounded-xl text-white font-medium transition-all shadow-md group-hover:shadow-lg group-hover:translate-y-[-2px]",
                          getZoneColor(getZoneLevel(zone, activeMetric))
                        )}
                        style={{
                          minWidth: "120px",
                          textAlign: "center",
                        }}
                        onClick={() => handleZoneClick(zone.id)}
                      >
                        <div>
                          {zone.name}
                          <div className="text-xs font-normal text-white/80 mt-1">
                            {activeMetric === "refill-requests" &&
                              `${zone.stats.refillRequests} requests`}
                            {activeMetric === "time-to-depletion" &&
                              zone.stats.avgTimeToDepletion}
                            {activeMetric === "request-alert-ratio" &&
                              `${(
                                zone.stats.refillRequests /
                                zone.stats.activeUnits
                              ).toFixed(2)} ratio`}
                          </div>
                        </div>
                      </Button>

                      {/* Connection line to actual location on map */}
                      <div className="absolute w-[1px] h-6 bg-gray-400/50 bottom-full left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      {/* Exact location dot */}
                      <div className="absolute w-2 h-2 rounded-full bg-gray-700 bottom-full left-1/2 -translate-x-1/2 -translate-y-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{zone.name} Zone</DialogTitle>
                      <DialogDescription>
                        Quick overview of zone metrics
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className={cn(
                            "p-3 rounded-xl",
                            getZoneLevel(zone, activeMetric) === "high"
                              ? "bg-red-50"
                              : getZoneLevel(zone, activeMetric) === "medium"
                              ? "bg-amber-50"
                              : "bg-emerald-50"
                          )}
                        >
                          <div className="text-sm text-muted-foreground">
                            {activeMetric === "refill-requests" &&
                              "Refill Requests"}
                            {activeMetric === "time-to-depletion" &&
                              "Time to Depletion"}
                            {activeMetric === "request-alert-ratio" &&
                              "Request-Alert Ratio"}
                          </div>
                          <div className="text-xl font-semibold">
                            {activeMetric === "refill-requests" &&
                              zone.stats.refillRequests}
                            {activeMetric === "time-to-depletion" &&
                              zone.stats.avgTimeToDepletion}
                            {activeMetric === "request-alert-ratio" &&
                              (
                                zone.stats.refillRequests /
                                zone.stats.activeUnits
                              ).toFixed(2)}
                          </div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <div className="text-sm text-muted-foreground">
                            Active Units
                          </div>
                          <div className="text-xl font-semibold">
                            {zone.stats.activeUnits}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          className="rounded-xl"
                          onClick={() =>
                            handleQuickAction("Send Message", zone.id)
                          }
                        >
                          Send Message
                        </Button>
                        <Button
                          className="rounded-xl"
                          onClick={() =>
                            (window.location.href = `/zone-details/${zone.id}`)
                          }
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white p-4 rounded-xl shadow-md border z-20">
              <h3 className="font-medium mb-3 text-teal-900">
                {activeMetric === "refill-requests" && "Refill Requests"}
                {activeMetric === "time-to-depletion" && "Time to Depletion"}
                {activeMetric === "request-alert-ratio" &&
                  "Request-Alert Ratio"}
              </h3>
              <div className="space-y-3">
                {activeMetric === "refill-requests" && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm text-gray-700">High (20+)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-500 rounded"></div>
                      <span className="text-sm text-gray-700">
                        Medium (10-19)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                      <span className="text-sm text-gray-700">Low (1-9)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                      <span className="text-sm text-gray-700">None (0)</span>
                    </div>
                  </>
                )}
                {activeMetric === "time-to-depletion" && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm text-gray-700">
                        High (≤ 2 days)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-500 rounded"></div>
                      <span className="text-sm text-gray-700">
                        Medium (2-4 days)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                      <span className="text-sm text-gray-700">
                        Low ({">"} 4 days)
                      </span>
                    </div>
                  </>
                )}
                {activeMetric === "request-alert-ratio" && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm text-gray-700">
                        High (≥ 0.2)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-500 rounded"></div>
                      <span className="text-sm text-gray-700">
                        Medium (0.1-0.19)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                      <span className="text-sm text-gray-700">
                        Low ({"<"} 0.1)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                      <span className="text-sm text-gray-700">None (0)</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Zoom controls */}
            <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-md border z-20">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-t-xl rounded-b-none border-b"
                onClick={() => setZoomLevel(Math.min(zoomLevel + 0.1, 1.5))}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-b-xl rounded-t-none"
                onClick={() => setZoomLevel(Math.max(zoomLevel - 0.1, 0.8))}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 bg-white border-t">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-gradient-to-br from-white to-teal-50 p-4 rounded-xl border border-teal-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-teal-100 p-2 rounded-lg text-teal-700">
                {stat.icon}
              </div>
              <div>
                <div className="text-sm text-teal-700">{stat.title}</div>
                <div className="text-2xl font-semibold text-teal-900">
                  {stat.value}
                </div>
                <div className="text-sm flex items-center gap-1">
                  {stat.trend === "up" && (
                    <ArrowUp className="h-3 w-3 text-emerald-500" />
                  )}
                  {stat.trend === "down" && (
                    <ArrowDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className="text-teal-600">{stat.subtitle}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapView;
