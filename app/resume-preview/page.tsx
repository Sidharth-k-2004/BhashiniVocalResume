
"use client"

import { useEffect, useState } from "react"
import html2pdf from "html2pdf.js";

import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Edit, Mic, FileEdit, Lightbulb, CheckCircle, AlertCircle, Info } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useRef } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import {
  ProfessionalTemplate,
  CreativeTemplate,
  MinimalTemplate,
  ExecutiveTemplate,
} from "@/components/resume-templates"
import jsPDF from "jspdf";



interface ResumeData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin?: string
  }
  summary: string
  experience: Array<{
    title: string
    company: string
    dates: string
    location: string
    description: string
  }>
  education: Array<{
    degree: string
    institution: string
    dates: string
    location: string
  }>
  projects?: Array<{
    name: string
    description: string
    technologies?: string
    link?: string
    dates?: string
  }>
  skills: string[]
}

interface Suggestion {
  id: string
  type: "critical" | "important" | "improvement"
  category: "contact" | "content" | "structure" | "keywords" | "formatting"
  title: string
  description: string
  action: string
}

export default function ResumePreview() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const resumeRef = useRef<HTMLDivElement>(null)

  const templateId = searchParams.get("template") || ""
  const categoryId = searchParams.get("category") || ""
  const resumeId = searchParams.get("id") || ""

  // Template categories mapping for display purposes
  const categoryNames: Record<string, string> = {
    "1": "Professional",
    "2": "Creative",
    "3": "Minimal",
    "4": "Executive",
  }


  useEffect(() => {
    // Dynamically import html2pdf only in browser
    import('html2pdf.js').then((html2pdf) => {
      (window as any).html2pdf = html2pdf.default;
    });
  }, []);

  // Template names mapping
  const templateNames: Record<string, string> = {
    // Professional templates
    p1: "Corporate",
    p2: "Business",
    p3: "Executive Pro",
    p4: "Modern Professional",
    p5: "Classic",
    // Creative templates
    c1: "Designer",
    c2: "Artistic",
    c3: "Digital Creative",
    c4: "Portfolio Plus",
    c5: "Innovation",
    // Minimal templates
    m1: "Clean",
    m2: "Simplicity",
    m3: "Essentials",
    m4: "Minimalist Pro",
    m5: "Whitespace",
    // Executive templates
    e1: "Leadership",
    e2: "C-Suite",
    e3: "Director",
    e4: "Board Member",
    e5: "Executive Elite",
  }

  // Analyze resume and generate suggestions
  const analyzeResume = (data: ResumeData): Suggestion[] => {
    const suggestions: Suggestion[] = []

    // Contact Information Analysis
    if (!data.personalInfo.phone || data.personalInfo.phone.length < 10) {
      suggestions.push({
        id: "phone-missing",
        type: "critical",
        category: "contact",
        title: "Add Phone Number",
        description: "Your resume is missing a phone number or has an incomplete one.",
        action: "Add a complete phone number to make it easy for employers to contact you.",
      })
    }

    if (!data.personalInfo.linkedin) {
      suggestions.push({
        id: "linkedin-missing",
        type: "important",
        category: "contact",
        title: "Add LinkedIn Profile",
        description: "LinkedIn profiles help employers learn more about your professional background.",
        action: "Include your LinkedIn profile URL in the contact section.",
      })
    }

    if (!data.personalInfo.email.includes("@")) {
      suggestions.push({
        id: "email-invalid",
        type: "critical",
        category: "contact",
        title: "Fix Email Address",
        description: "Your email address appears to be invalid.",
        action: "Ensure your email address is correct and professional.",
      })
    }

    // Summary Analysis
    if (!data.summary || data.summary.length < 50) {
      suggestions.push({
        id: "summary-short",
        type: "important",
        category: "content",
        title: "Expand Professional Summary",
        description: "Your professional summary is too short or missing.",
        action: "Write a 2-3 sentence summary highlighting your key skills and experience.",
      })
    }

    if (data.summary && data.summary.length > 200) {
      suggestions.push({
        id: "summary-long",
        type: "improvement",
        category: "content",
        title: "Shorten Professional Summary",
        description: "Your professional summary might be too long.",
        action: "Keep your summary concise - aim for 2-3 impactful sentences.",
      })
    }

    // Experience Analysis
    data.experience.forEach((exp, index) => {
      if (!exp.description || exp.description.length < 50) {
        suggestions.push({
          id: `exp-desc-${index}`,
          type: "important",
          category: "content",
          title: `Expand ${exp.title} Description`,
          description: `The description for your ${exp.title} role is too brief.`,
          action: "Add specific achievements, metrics, and responsibilities to showcase your impact.",
        })
      }

      if (exp.description && !exp.description.match(/\d+%|\$\d+|\d+\+/)) {
        suggestions.push({
          id: `exp-metrics-${index}`,
          type: "improvement",
          category: "content",
          title: `Add Metrics to ${exp.title}`,
          description: "Your experience lacks quantifiable achievements.",
          action: "Include numbers, percentages, or dollar amounts to demonstrate your impact.",
        })
      }

      if (!exp.dates || exp.dates === "") {
        suggestions.push({
          id: `exp-dates-${index}`,
          type: "important",
          category: "structure",
          title: `Add Dates for ${exp.title}`,
          description: "Employment dates are missing for this position.",
          action: 'Include start and end dates (or "Present" for current roles).',
        })
      }
    })

    // Projects Analysis
    if (!data.projects || data.projects.length === 0) {
      suggestions.push({
        id: "projects-missing",
        type: "improvement",
        category: "content",
        title: "Add Projects Section",
        description: "Including relevant projects can strengthen your resume.",
        action: "Add 2-3 projects that showcase your skills and experience.",
      })
    } else {
      data.projects.forEach((project, index) => {
        if (!project.description || project.description.length < 30) {
          suggestions.push({
            id: `project-desc-${index}`,
            type: "important",
            category: "content",
            title: `Improve ${project.name} Description`,
            description: "This project needs a more detailed description.",
            action: "Explain what you built, technologies used, and the impact or results.",
          })
        }

        if (!project.technologies) {
          suggestions.push({
            id: `project-tech-${index}`,
            type: "improvement",
            category: "keywords",
            title: `Add Technologies for ${project.name}`,
            description: "Listing technologies helps with keyword matching.",
            action: "Include the programming languages, frameworks, and tools you used.",
          })
        }
      })
    }

    // Skills Analysis
    if (data.skills.length < 5) {
      suggestions.push({
        id: "skills-few",
        type: "improvement",
        category: "keywords",
        title: "Add More Skills",
        description: "Your skills section could be more comprehensive.",
        action: "Include both technical and soft skills relevant to your target role.",
      })
    }

    if (data.skills.length > 15) {
      suggestions.push({
        id: "skills-many",
        type: "improvement",
        category: "keywords",
        title: "Focus Your Skills",
        description: "Too many skills can dilute your message.",
        action: "Focus on the most relevant skills for your target position.",
      })
    }

    // Education Analysis
    data.education.forEach((edu, index) => {
      if (!edu.dates) {
        suggestions.push({
          id: `edu-dates-${index}`,
          type: "improvement",
          category: "structure",
          title: `Add Graduation Date`,
          description: "Consider adding graduation dates for your education.",
          action: "Include graduation year or expected graduation date.",
        })
      }
    })

    // Overall Structure Analysis
    if (data.experience.length === 0) {
      suggestions.push({
        id: "no-experience",
        type: "critical",
        category: "structure",
        title: "Add Work Experience",
        description: "Your resume needs work experience entries.",
        action: "Include internships, part-time jobs, or volunteer work if you lack full-time experience.",
      })
    }

    return suggestions
  }

  useEffect(() => {
    // Load resume data from localStorage or API
    const loadResumeData = async () => {
      try {
        // First try to get data from localStorage (from audio processing)
        const storedData = localStorage.getItem("resumeData")
        if (storedData) {
          console.log("Found stored data:", storedData)
          // Parse the JSON string from localStorage
          const parsedData = JSON.parse(storedData)
          // If the data is wrapped in a "data" property (from your API response)
          const resumeJson = parsedData.data ? parsedData.data : parsedData

          // If the data contains a JSON string (from your backend)
          if (typeof resumeJson === "string" && resumeJson.startsWith("json")) {
            // Extract the JSON part from the string
            const jsonStart = resumeJson.indexOf("{")
            const jsonEnd = resumeJson.lastIndexOf("}") + 1
            const jsonString = resumeJson.substring(jsonStart, jsonEnd)
            const data = JSON.parse(jsonString)
            setResumeData(data)
            setSuggestions(analyzeResume(data))
          } else {
            setResumeData(resumeJson)
            setSuggestions(analyzeResume(resumeJson))
          }
        } else if (resumeId) {
          // If no localStorage data but we have a resumeId, fetch from API
          const response = await fetch(`http://localhost:5000/api/resume/${resumeId}`, {
            credentials: "include",
          })
          if (response.ok) {
            const data = await response.json()
            setResumeData(data)
            setSuggestions(analyzeResume(data))
          } else {
            toast({
              title: "Error",
              description: "Failed to load resume data. Please try again.",
              variant: "destructive",
            })
            const fallbackData = getFallbackResumeData()
            setResumeData(fallbackData)
            setSuggestions(analyzeResume(fallbackData))
          }
        } else {
          console.error("No resume data found")
          // Use fallback data if needed
          const fallbackData = getFallbackResumeData()
          setResumeData(fallbackData)
          setSuggestions(analyzeResume(fallbackData))
        }
      } catch (error) {
        console.error("Error loading resume data:", error)
        const fallbackData = getFallbackResumeData()
        setResumeData(fallbackData)
        setSuggestions(analyzeResume(fallbackData))
      } finally {
        setIsLoading(false)
      }
    }

    // Simulate loading the resume
    setTimeout(() => {
      loadResumeData()
    }, 1000)
  }, [resumeId])

  const getFallbackResumeData = (): ResumeData => {
    return {
      personalInfo: {
        name: "John Doe",
        title: "Software Engineer",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        location: "San Francisco, CA",
      },
      summary: "Experienced software engineer with a passion for building scalable web applications.",
      experience: [
        {
          title: "Senior Software Engineer",
          company: "Tech Innovations Inc.",
          dates: "2021 - Present",
          location: "",
          description:
            "Led development of company's flagship product. Managed team of 5 engineers. Implemented CI/CD pipeline reducing deployment time by 40%.",
        },
        {
          title: "Software Engineer",
          company: "Digital Solutions LLC",
          dates: "2019 - 2021",
          location: "",
          description:
            "Developed responsive web applications using React. Collaborated with design team to implement UI/UX improvements. Optimized database queries resulting in 30% performance improvement.",
        },
      ],
      education: [
        {
          degree: "Computer Science, BS",
          institution: "Stanford University",
          dates: "2015 - 2019",
          location: "",
        },
      ],
      projects: [
        {
          name: "E-Commerce Platform",
          description:
            "Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented secure payment processing and real-time inventory management.",
          technologies: "React, Node.js, MongoDB, Stripe API",
          link: "https://github.com/johndoe/ecommerce-platform",
          dates: "2023 - Present",
        },
        {
          name: "Task Management App",
          description:
            "Developed a collaborative task management application with real-time updates and team collaboration features.",
          technologies: "Vue.js, Express.js, Socket.io, PostgreSQL",
          link: "https://taskmanager-demo.com",
          dates: "2022 - 2023",
        },
      ],
      skills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL"],
    }
  }

 
  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-area');
    if (!element) return;

    const opt = {
      margin:       0.3,
      filename:     'resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
      await (window as any).html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };


  const handleEdit = () => {
    setShowEditModal(true)
  }

  const handleManualEdit = () => {
    setShowEditModal(false)
    // If we have a resumeId from the API, use it for editing
    if (resumeData && "id" in resumeData) {
      console.log("Editing existing resume with ID:", resumeData.id)
      router.push(`/edit-resume?id=${resumeData.id}`)
    } else {
      // Otherwise just pass the template and category
      router.push(`/edit-resume?template=${templateId}&category=${categoryId}`)
    }
  }

  const handleAudioEdit = () => {
    setShowEditModal(false)
    // Navigate to audio editing page with current resume data
    if (resumeData && "id" in resumeData) {
      router.push(`/audio-edit?id=${resumeData.id}`)
    } else {
      // Store current resume data in localStorage for audio editing
      localStorage.setItem("resumeDataForEdit", JSON.stringify(resumeData))
      router.push(`/audio-edit?template=${templateId}&category=${categoryId}`)
    }
  }

  const handleGoBack = () => {
    router.push("/templates")
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "important":
        return <Info className="h-4 w-4 text-orange-500" />
      case "improvement":
        return <Lightbulb className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getSuggestionBadgeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "important":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "improvement":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Render the appropriate template based on the template ID
  const renderTemplate = () => {
    if (!resumeData) return null

    // First character of template ID indicates the category
    const templateType = templateId.charAt(0)
    const templateNumber = templateId.substring(1)

    switch (templateType) {
      case "p":
        return <ProfessionalTemplate variant={templateNumber} data={resumeData} />
      case "c":
        return <CreativeTemplate variant={templateNumber} data={resumeData} />
      case "m":
        return <MinimalTemplate variant={templateNumber} data={resumeData} />
      case "e":
        return <ExecutiveTemplate variant={templateNumber} data={resumeData} />
      default:
        return <ProfessionalTemplate variant="1" data={resumeData} />
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Generating your resume...</p>
        </div>
      </div>
    )
  }

  const criticalSuggestions = suggestions.filter((s) => s.type === "critical")
  const importantSuggestions = suggestions.filter((s) => s.type === "important")
  const improvementSuggestions = suggestions.filter((s) => s.type === "improvement")

  return (
    <div className="container mx-auto py-8 px-6">
      <Button variant="ghost" size="sm" className="mb-6" onClick={handleGoBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to templates
      </Button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          Your {categoryNames[categoryId]} - {templateNames[templateId]} Resume
        </h1>
        <p className="text-gray-600 mt-2">Generated from your audio input</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Suggestions Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8 h-[calc(100vh-8rem)]">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Resume Suggestions
                </CardTitle>
                <Badge variant="outline">{suggestions.length} tips</Badge>
              </div>
              <CardDescription>Improve your resume with these personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 overflow-y-auto h-[calc(100%-8rem)] pr-2">
              {/* Critical Suggestions */}
              {criticalSuggestions.length > 0 && (
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="font-medium text-red-700">Critical ({criticalSuggestions.length})</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    {criticalSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="p-3 border border-red-200 rounded-lg bg-red-50">
                        <div className="flex items-start gap-2">
                          {getSuggestionIcon(suggestion.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-red-800">{suggestion.title}</h4>
                            <p className="text-xs text-red-600 mt-1">{suggestion.description}</p>
                            <p className="text-xs text-red-700 mt-2 font-medium">{suggestion.action}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Important Suggestions */}
              {importantSuggestions.length > 0 && (
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-orange-500" />
                      <span className="font-medium text-orange-700">Important ({importantSuggestions.length})</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    {importantSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="p-3 border border-orange-200 rounded-lg bg-orange-50">
                        <div className="flex items-start gap-2">
                          {getSuggestionIcon(suggestion.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-orange-800">{suggestion.title}</h4>
                            <p className="text-xs text-orange-600 mt-1">{suggestion.description}</p>
                            <p className="text-xs text-orange-700 mt-2 font-medium">{suggestion.action}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Improvement Suggestions */}
              {improvementSuggestions.length > 0 && (
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-blue-700">Improvements ({improvementSuggestions.length})</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-2">
                    {improvementSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                        <div className="flex items-start gap-2">
                          {getSuggestionIcon(suggestion.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-blue-800">{suggestion.title}</h4>
                            <p className="text-xs text-blue-600 mt-1">{suggestion.description}</p>
                            <p className="text-xs text-blue-700 mt-2 font-medium">{suggestion.action}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}

              {suggestions.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-medium text-green-700">Great job!</p>
                  <p className="text-xs text-green-600">Your resume looks comprehensive.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resume Preview */}
        <div className="lg:col-span-3">
          <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
            <div id="resume-area" ref={resumeRef} className="max-w-4xl mx-auto bg-white rounded shadow-lg">
              {renderTemplate()}
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Resume
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Options Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">Choose Edit Method</DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              How would you like to edit your resume?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              onClick={handleManualEdit}
              className="flex items-center justify-center gap-3 h-16 text-base bg-transparent"
              variant="outline"
            >
              <FileEdit className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">Edit Manually</div>
                <div className="text-sm text-gray-500">Use forms and text fields</div>
              </div>
            </Button>
            <Button onClick={handleAudioEdit} className="flex items-center justify-center gap-3 h-16 text-base">
              <Mic className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">Edit Through Audio</div>
                <div className="text-sm text-gray-100">Speak your changes naturally</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
