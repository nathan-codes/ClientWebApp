"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

const Preferences = () => {
  const { toast } = useToast()
  const [refreshInterval, setRefreshInterval] = useState(5)

  const handleSavePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <div className="h-full flex flex-col">
      <PageHeader title="Preferences" subtitle="Customize your dashboard experience" />

      <Tabs defaultValue="general" className="flex-1">
        <div className="px-4 sm:px-6 pt-4">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="general" className="rounded-lg">
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-lg">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="rounded-lg">
              Appearance
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general" className="flex-1 px-4 sm:px-6 pb-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Settings</CardTitle>
              <CardDescription>Customize your dashboard layout and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Default View</h4>
                    <p className="text-sm text-muted-foreground">Choose which view to show when you log in</p>
                  </div>
                  <Select defaultValue="map">
                    <SelectTrigger className="w-[180px] rounded-xl">
                      <SelectValue placeholder="Select view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="map">Map View</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-refresh Data</h4>
                    <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Refresh Interval</h4>
                    <span className="text-sm">{refreshInterval} minutes</span>
                  </div>
                  <Slider
                    defaultValue={[5]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) => setRefreshInterval(value[0])}
                  />
                  <p className="text-xs text-muted-foreground">How often to refresh dashboard data</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Compact View</h4>
                    <p className="text-sm text-muted-foreground">Display more content with less spacing</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Show Welcome Message</h4>
                    <p className="text-sm text-muted-foreground">Display welcome message on dashboard</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Display</CardTitle>
              <CardDescription>Configure how data is displayed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Date Format</h4>
                    <p className="text-sm text-muted-foreground">Choose how dates are displayed</p>
                  </div>
                  <Select defaultValue="mdy">
                    <SelectTrigger className="w-[180px] rounded-xl">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Time Format</h4>
                    <p className="text-sm text-muted-foreground">Choose how times are displayed</p>
                  </div>
                  <Select defaultValue="12h">
                    <SelectTrigger className="w-[180px] rounded-xl">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Units of Measurement</h4>
                    <p className="text-sm text-muted-foreground">Choose your preferred units</p>
                  </div>
                  <Select defaultValue="metric">
                    <SelectTrigger className="w-[180px] rounded-xl">
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (kg, L)</SelectItem>
                      <SelectItem value="imperial">Imperial (lb, gal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Show Percentages</h4>
                    <p className="text-sm text-muted-foreground">Display percentage values in charts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-xl" onClick={handleSavePreferences}>
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="flex-1 px-4 sm:px-6 pb-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Email Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Critical Alerts</div>
                      <div className="text-sm text-muted-foreground">Gas leaks, connection loss, etc.</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Warning Alerts</div>
                      <div className="text-sm text-muted-foreground">Low gas levels, refill requests, etc.</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Informational Alerts</div>
                      <div className="text-sm text-muted-foreground">Refills completed, system updates, etc.</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Daily Summary</div>
                      <div className="text-sm text-muted-foreground">Daily summary of system activity</div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Weekly Reports</div>
                      <div className="text-sm text-muted-foreground">Weekly summary of system activity</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">SMS Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Enable SMS Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive notifications via SMS</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Critical Alerts Only</div>
                      <div className="text-sm text-muted-foreground">Receive only critical alerts via SMS</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+233 20 123 4567" className="rounded-xl" />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">In-App Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">All Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive all notifications in the app</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Sound Alerts</div>
                      <div className="text-sm text-muted-foreground">Play sound for new notifications</div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Desktop Notifications</div>
                      <div className="text-sm text-muted-foreground">Show browser notifications</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-xl" onClick={handleSavePreferences}>
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Thresholds</CardTitle>
              <CardDescription>Configure when alerts are triggered</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Critical Gas Level</h4>
                    <span className="text-sm">5%</span>
                  </div>
                  <Slider defaultValue={[5]} min={1} max={20} step={1} />
                  <p className="text-xs text-muted-foreground">Gas level that triggers critical alerts</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Low Gas Level</h4>
                    <span className="text-sm">15%</span>
                  </div>
                  <Slider defaultValue={[15]} min={5} max={30} step={1} />
                  <p className="text-xs text-muted-foreground">Gas level that triggers warning alerts</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Connection Timeout</h4>
                    <span className="text-sm">30 minutes</span>
                  </div>
                  <Slider defaultValue={[30]} min={5} max={120} step={5} />
                  <p className="text-xs text-muted-foreground">Time before connection loss alert is triggered</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-xl" onClick={handleSavePreferences}>
                Save Threshold Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="flex-1 px-4 sm:px-6 pb-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger id="theme" className="rounded-xl">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <Select defaultValue="blue">
                    <SelectTrigger id="accent-color" className="rounded-xl">
                      <SelectValue placeholder="Select accent color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Reduced Motion</h4>
                    <p className="text-sm text-muted-foreground">Minimize animations throughout the interface</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">High Contrast</h4>
                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Large Text</h4>
                    <p className="text-sm text-muted-foreground">Increase text size throughout the interface</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Map Settings</CardTitle>
              <CardDescription>Customize the map view appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Map Style</h4>
                    <p className="text-sm text-muted-foreground">Choose the map visual style</p>
                  </div>
                  <Select defaultValue="standard">
                    <SelectTrigger className="w-[180px] rounded-xl">
                      <SelectValue placeholder="Select map style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="satellite">Satellite</SelectItem>
                      <SelectItem value="terrain">Terrain</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Show Zone Labels</h4>
                    <p className="text-sm text-muted-foreground">Display zone names on the map</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Show Unit Markers</h4>
                    <p className="text-sm text-muted-foreground">Display individual unit markers on the map</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Heat Map Visualization</h4>
                    <p className="text-sm text-muted-foreground">Show data as a heat map overlay</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-xl" onClick={handleSavePreferences}>
                Save Appearance Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Preferences
