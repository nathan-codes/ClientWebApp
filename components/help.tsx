"use client"

import type React from "react"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ChevronRight, FileText } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const { toast } = useToast()
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Support request submitted",
      description: "We'll get back to you as soon as possible.",
    })
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm({
      ...contactForm,
      [name]: value,
    })
  }

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Help & Support"
        subtitle="Find answers and get assistance"
      />

      <div className="px-4 sm:px-6 pt-4 pb-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for help topics..." 
              className="pl-12 h-12 text-lg rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="faq" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq" className="rounded-lg">FAQ</TabsTrigger>
              <TabsTrigger value="guides" className="rounded-lg">Guides</TabsTrigger>
              <TabsTrigger value="videos" className="rounded-lg">Videos</TabsTrigger>
              <TabsTrigger value="contact" className="rounded-lg">Contact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions about AcuteMeter</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How does the gas monitoring system work?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          AcuteMeter uses IoT sensors attached to LPG cylinders to monitor gas levels in real-time. 
                          These sensors transmit data wirelessly to our cloud platform, which processes the information 
                          and displays it on your dashboard. The system can predict when a cylinder will need refilling 
                          based on usage patterns and send alerts when gas levels are low.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>What do the different alert types mean?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-2">
                          AcuteMeter uses three types of alerts to keep you informed:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                          <li><span className="font-medium text-red-600">Critical Alerts</span>: Require immediate attention, such as gas leaks or critical gas levels (below 5%).</li>
                          <li><span className="font-medium text-amber-600">Warning Alerts</span>: Indicate potential issues that need attention soon, such as low gas levels (below 15%).</li>
                          <li><span className="font-medium text-blue-600">Information Alerts</span>: Provide general updates like completed refills or system maintenance.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How accurate are the gas level readings?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          AcuteMeter sensors provide gas level readings with an accuracy of ±2%. The system is calibrated 
                          during installation and performs regular self-calibration to maintain accuracy. Factors like 
                          extreme temperatures can temporarily affect readings, but the system accounts for these variables 
                          in its calculations.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>How do I add a new monitoring unit?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          To add a new monitoring unit, go to the Settings page and select "Manage Units." Click on 
                          "Add New Unit" and follow the step-by-step instructions. You'll need the unit's serial number 
                          and activation code, which are provided with the device. Once added, the unit will appear in 
                          your dashboard within 5-10 minutes after it's physically installed and powered on.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>What should I do if a unit loses connection?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          If a unit loses connection, first check that it has power and is within range of your WiFi network. 
                          Most connection issues can be resolved by power cycling the device (turning it off and on again). 
                          If the problem persists, check the signal strength in the unit details page. You may need to move 
                          the unit closer to your router or add a WiFi extender. For persistent issues, contact our support team.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="guides" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Guides & Documentation</CardTitle>
                  <CardDescription>Step-by-step guides to help you use AcuteMeter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Getting Started Guide</h3>
                              <p className="text-sm text-muted-foreground mt-1">Learn the basics of using AcuteMeter</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" className="w-full rounded-xl flex items-center justify-between">
                              View Guide
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Dashboard User Manual</h3>
                              <p className="text-sm text-muted-foreground mt-1">Complete guide to all dashboard features</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" className="w-full rounded-xl flex items-center justify-between">
                              View Manual
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Installation Guide</h3>
                              <p className="text-sm text-muted-foreground mt-1">How to install and set up monitoring units</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" className="w-full rounded-xl flex items-center justify-between">
                              View Guide
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Troubleshooting Guide</h3>
                              <p className="text-sm text-muted-foreground mt-1">Solutions for common issues</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" className="w-full rounded-xl flex items-center justify-between">
                              View Guide
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="videos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>Learn through step-by-step video guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="overflow-hidden">
                      <div className="aspect-video bg-muted"></div>
                      <div className="p-4">
                        <h3 className="font-medium">Getting Started with AcuteMeter</h3>
                        <p className="text-sm text-muted-foreground mt-1">5:32</p>
                      </div>
                    </Card>
                    
                    <Card className="overflow-hidden">
                      <div className="aspect-video bg-muted"></div>
                      <div className="p-4">
                        <h3 className="font-medium">Setting Up Alerts</h3>
                        <p className="text-sm text-muted-foreground mt-1">3:45</p>
                      </div>
                    </Card>
                    
                    <Card className="overflow-hidden">
                      <div className="aspect-video bg-muted"></div>
                      <div className="p-4">
                        <h3 className="font-medium">Understanding Usage Analytics</h3>
                        <p className="text-sm text-muted-foreground mt-1">7:18</p>
                      </div>
                    </Card>
                    
                    <Card className="overflow-hidden">
                      <div className="aspect-video bg-muted"></div>
                      <div className="p-4">
                        <h3 className="font-medium">Troubleshooting Common Issues</h3>
                        <p className="text-sm text-muted-foreground mt-1">6:24</p>
                      </div>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get in touch with our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={contactForm.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={contactForm.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input 
                        id="subject" 
                        name="subject" 
                        value={contactForm.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={5} 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                        value={contactForm.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full">Submit Request</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Help



