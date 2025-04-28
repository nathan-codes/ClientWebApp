"use client";

import { cn } from "@/lib/utils";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  Filter,
  Printer,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/layout/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// Mock data for zones
const zones = [
  {
    id: "adenta",
    name: "Adenta",
    letter: "A",
    avgTimeToDepletion: {
      value: "2.8 days",
      trend: "down",
      change: "0.5 days",
    },
    refillRequests: { value: 27, trend: "up", change: "12%" },
    pastRefills: 324,
    requestAlertRatio: 0.85,
    avgTimeBetweenRefills: "14.2 days",
    activeUnits: 182,
  },
  {
    id: "east-legon",
    name: "East Legon",
    letter: "E",
    avgTimeToDepletion: { value: "3.4 days", trend: "up", change: "0.2 days" },
    refillRequests: { value: 17, trend: "down", change: "8%" },
    pastRefills: 412,
    requestAlertRatio: 0.92,
    avgTimeBetweenRefills: "15.8 days",
    activeUnits: 245,
  },
  {
    id: "airport-residential",
    name: "Airport Residential",
    letter: "A",
    avgTimeToDepletion: {
      value: "2.5 days",
      trend: "down",
      change: "0.3 days",
    },
    refillRequests: { value: 24, trend: "up", change: "15%" },
    pastRefills: 287,
    requestAlertRatio: 0.78,
    avgTimeBetweenRefills: "13.5 days",
    activeUnits: 156,
  },
  {
    id: "cantonments",
    name: "Cantonments",
    letter: "C",
    avgTimeToDepletion: { value: "3.7 days", trend: "up", change: "0.4 days" },
    refillRequests: { value: 15, trend: "down", change: "5%" },
    pastRefills: 198,
    requestAlertRatio: 0.89,
    avgTimeBetweenRefills: "16.2 days",
    activeUnits: 128,
  },
  {
    id: "osu",
    name: "Osu",
    letter: "O",
    avgTimeToDepletion: {
      value: "4.1 days",
      trend: "none",
      change: "No change",
    },
    refillRequests: { value: 14, trend: "up", change: "5%" },
    pastRefills: 278,
    requestAlertRatio: 0.88,
    avgTimeBetweenRefills: "16.4 days",
    activeUnits: 156,
  },
  {
    id: "labadi",
    name: "Labadi",
    letter: "L",
    avgTimeToDepletion: { value: "5.2 days", trend: "up", change: "0.7 days" },
    refillRequests: { value: 8, trend: "down", change: "10%" },
    pastRefills: 156,
    requestAlertRatio: 0.94,
    avgTimeBetweenRefills: "18.7 days",
    activeUnits: 92,
  },
  {
    id: "tema",
    name: "Tema",
    letter: "T",
    avgTimeToDepletion: { value: "6.1 days", trend: "up", change: "0.9 days" },
    refillRequests: { value: 6, trend: "none", change: "No change" },
    pastRefills: 124,
    requestAlertRatio: 0.96,
    avgTimeBetweenRefills: "21.3 days",
    activeUnits: 78,
  },
];

const ListView = () => {
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const itemsPerPage = 5;
  const { toast } = useToast();

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const filteredZones = useMemo(() => {
    let filtered = [...zones];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((zone) =>
        zone.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterValue !== "all") {
      if (filterValue === "high") {
        filtered = filtered.filter((zone) => zone.refillRequests.value >= 20);
      } else if (filterValue === "medium") {
        filtered = filtered.filter(
          (zone) =>
            zone.refillRequests.value >= 10 && zone.refillRequests.value < 20
        );
      } else if (filterValue === "low") {
        filtered = filtered.filter((zone) => zone.refillRequests.value < 10);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "avgTimeToDepletion") {
        const aValue = Number.parseFloat(
          a.avgTimeToDepletion.value.split(" ")[0]
        );
        const bValue = Number.parseFloat(
          b.avgTimeToDepletion.value.split(" ")[0]
        );
        comparison = aValue - bValue;
      } else if (sortBy === "refillRequests") {
        comparison = a.refillRequests.value - b.refillRequests.value;
      } else if (sortBy === "pastRefills") {
        comparison = a.pastRefills - b.pastRefills;
      } else if (sortBy === "requestAlertRatio") {
        comparison = a.requestAlertRatio - b.requestAlertRatio;
      } else if (sortBy === "avgTimeBetweenRefills") {
        const aValue = Number.parseFloat(a.avgTimeBetweenRefills.split(" ")[0]);
        const bValue = Number.parseFloat(b.avgTimeBetweenRefills.split(" ")[0]);
        comparison = aValue - bValue;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [zones, sortBy, sortOrder, searchTerm, filterValue]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredZones.length / itemsPerPage);
  const paginatedZones = filteredZones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = (format: string) => {
    toast({
      title: `Exporting data as ${format}`,
      description: "Your export will be ready in a few moments.",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Preparing print view",
      description: "The print dialog will open shortly.",
    });
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <PageHeader
        title="List View"
        subtitle="Accra, Ghana Gas Monitoring Dashboard"
        actions={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-xl gap-2 text-teal-700 border-teal-200 hover:bg-teal-50 hover:text-teal-800"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("CSV")}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("Excel")}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("PDF")}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />

      <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 bg-gradient-to-r from-teal-50 to-white">
        <div className="flex flex-wrap items-center gap-3">
          <Select value={filterValue} onValueChange={setFilterValue}>
            <SelectTrigger className="w-[180px] rounded-xl gap-2 border-teal-200 text-teal-700">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Filter Zones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              <SelectItem value="high">High Requests (20+)</SelectItem>
              <SelectItem value="medium">Medium Requests (10-19)</SelectItem>
              <SelectItem value="low">Low Requests (&lt; 10)</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-teal-500" />
            <Input
              placeholder="Search zones..."
              className="pl-9 w-full sm:w-[250px] rounded-xl border-teal-200 focus-visible:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                  onClick={handlePrint}
                >
                  <Printer className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Print</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="bg-white rounded-xl border border-teal-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-teal-50">
                <TableRow>
                  <TableHead className="w-[250px]">
                    <button
                      className="flex items-center gap-1 font-medium text-teal-900"
                      onClick={() => handleSort("name")}
                    >
                      Zone Name
                      {sortBy === "name" ? (
                        sortOrder === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center gap-1 font-medium text-teal-900"
                      onClick={() => handleSort("avgTimeToDepletion")}
                    >
                      Avg. Time to Depletion
                      {sortBy === "avgTimeToDepletion" ? (
                        sortOrder === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center gap-1 font-medium text-teal-900"
                      onClick={() => handleSort("refillRequests")}
                    >
                      Refill Requests
                      {sortBy === "refillRequests" ? (
                        sortOrder === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center gap-1 font-medium text-teal-900"
                      onClick={() => handleSort("pastRefills")}
                    >
                      Past Refills
                      {sortBy === "pastRefills" ? (
                        sortOrder === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center gap-1 font-medium text-teal-900"
                      onClick={() => handleSort("requestAlertRatio")}
                    >
                      Request-Alert Ratio
                      {sortBy === "requestAlertRatio" ? (
                        sortOrder === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center gap-1 font-medium text-teal-900"
                      onClick={() => handleSort("avgTimeBetweenRefills")}
                    >
                      Avg. Time Between Refills
                      {sortBy === "avgTimeBetweenRefills" ? (
                        sortOrder === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      )}
                    </button>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedZones.map((zone) => (
                  <TableRow key={zone.id} className="hover:bg-accent/50">
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-teal-100 rounded-md flex items-center justify-center text-sm font-medium text-teal-800 mr-3">
                          {zone.letter}
                        </div>
                        <div>
                          <div className="font-medium text-teal-900">
                            {zone.name}
                          </div>
                          {/* <div className="text-sm text-teal-600">
                            {zone.activeUnits} active units
                          </div> */}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {zone.avgTimeToDepletion.value}
                      </div>
                      <div className="text-sm flex items-center gap-1">
                        {zone.avgTimeToDepletion.trend === "up" && (
                          <ArrowUp className="h-3 w-3 text-emerald-500" />
                        )}
                        {zone.avgTimeToDepletion.trend === "down" && (
                          <ArrowDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className="text-teal-600">
                          {zone.avgTimeToDepletion.change}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {zone.refillRequests.value}
                      </div>
                      <div className="text-sm flex items-center gap-1">
                        {zone.refillRequests.trend === "up" && (
                          <ArrowUp className="h-3 w-3 text-emerald-500" />
                        )}
                        {zone.refillRequests.trend === "down" && (
                          <ArrowDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className="text-teal-600">
                          {zone.refillRequests.change}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{zone.pastRefills}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {zone.requestAlertRatio.toFixed(2)}
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          zone.requestAlertRatio > 0.9
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : zone.requestAlertRatio > 0.8
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {zone.requestAlertRatio > 0.9
                          ? "Good"
                          : zone.requestAlertRatio > 0.8
                          ? "Average"
                          : "Poor"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {zone.avgTimeBetweenRefills}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/zone-details/${zone.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg gap-1 border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="px-4 py-3 border-t border-teal-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-r from-teal-50 to-white">
            <div className="text-sm text-teal-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredZones.length)} of{" "}
              {filteredZones.length} zones
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                Previous
              </Button>

              {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-lg",
                      currentPage === page
                        ? "bg-teal-600 hover:bg-teal-700"
                        : "border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                    )}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}

              {totalPages > 3 && currentPage < totalPages - 1 && (
                <span className="text-teal-600">...</span>
              )}

              {totalPages > 3 && currentPage < totalPages && (
                <Button
                  variant={currentPage === totalPages ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-lg",
                    currentPage === totalPages
                      ? "bg-teal-600 hover:bg-teal-700"
                      : "border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                  )}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;
