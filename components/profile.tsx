"use client"

import type React from "react"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Kofi Mensah",
    email: "kofi.mensah@xpressgas.com",
    phone: "+233 20 123 4567",
    role: "Administrator",
    company: "Xpress Gas",
    location: "Accra, Ghana",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "New password and confirm password must match.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    })

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="h-full flex flex-col">
      <PageHeader title="Profile" subtitle="Manage your account settings" />

      <Tabs defaultValue="general" className="flex-1">
        <div className="px-4 sm:px-6 pt-4">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="general" className="rounded-lg">
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-lg">
              Security
            </TabsTrigger>
            <TabsTrigger value="preferences" className="rounded-lg">
              Preferences
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general" className="flex-1 px-4 sm:px-6 pb-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate}>
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder-user.jpg" alt="Kofi Mensah" />
                      <AvatarFallback className="text-lg">KM</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="rounded-xl">
                      Change Photo
                    </Button>
                  </div>

                  <div className="grid flex-1 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="rounded-xl"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="rounded-xl">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>View your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <div className="text-muted-foreground">Account ID</div>
                  <div className="font-medium">XG-2025-001</div>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <div className="text-muted-foreground">Account Type</div>
                  <div className="font-medium">Administrator</div>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <div className="text-muted-foreground">Account Created</div>
                  <div className="font-medium">January 15, 2025</div>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <div className="text-muted-foreground">Last Login</div>
                  <div className="font-medium">April 25, 2025 14:30</div>
                </div>
                <div className="flex justify-between py-2">
                  <div className="text-muted-foreground">Account Status</div>
                  <div className="font-medium text-emerald-600">Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="flex-1 px-4 sm:px-6 pb-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate}>
                <div className="grid gap-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="flex justify-end mt-2">
                    <Button type="submit" className="rounded-xl">
                      Update Password
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Enable Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Protect your account with an additional security layer
                  </p>
                </div>
                <Switch />
              </div>

              <Separator className="my-6" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Login Notifications</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Receive notifications when someone logs into your account
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login Sessions</CardTitle>
              <CardDescription>Manage your active sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-start py-2 border-b">
                  <div>
                    <div className="font-medium">Chrome on Windows</div>
                    <div className="text-sm text-muted-foreground">Accra, Ghana • Current session</div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    This Device
                  </Button>
                </div>
                <div className="flex justify-between items-start py-2 border-b">
                  <div>
                    <div className="font-medium">Safari on iPhone</div>
                    <div className="text-sm text-muted-foreground">Accra, Ghana • Last active: 2 hours ago</div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    Sign Out
                  </Button>
                </div>
                <div className="flex justify-between items-start py-2">
                  <div>
                    <div className="font-medium">Chrome on MacBook</div>
                    <div className="text-sm text-muted-foreground">Accra, Ghana • Last active: Yesterday</div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full rounded-xl">
                Sign Out All Other Devices
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="flex-1 px-4 sm:px-6 pb-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
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
                        <div className="font-medium">Critical Alerts Only</div>
                        <div className="text-sm text-muted-foreground">Receive only critical alerts via SMS</div>
                      </div>
                      <Switch defaultChecked />
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
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-xl">Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize your dashboard experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
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
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language" className="rounded-xl">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="gmt">
                    <SelectTrigger id="timezone" className="rounded-xl">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmt">GMT (Accra)</SelectItem>
                      <SelectItem value="est">EST (New York)</SelectItem>
                      <SelectItem value="pst">PST (Los Angeles)</SelectItem>
                      <SelectItem value="cet">CET (Paris)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Compact View</div>
                    <div className="text-sm text-muted-foreground">Display more content with less spacing</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Show Welcome Message</div>
                    <div className="text-sm text-muted-foreground">Display welcome message on dashboard</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-xl">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Profile
