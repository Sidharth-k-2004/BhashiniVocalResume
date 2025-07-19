"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Edit, Mic, FileEdit } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useRef } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ProfessionalTemplate,
  CreativeTemplate,
  MinimalTemplate,
  ExecutiveTemplate,
} from "@/components/resume-templates"

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

export default function ResumePreview() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
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
            setResumeData(JSON.parse(jsonString))
          } else {
            setResumeData(resumeJson)
          }
        } else if (resumeId) {
          // If no localStorage data but we have a resumeId, fetch from API
          const response = await fetch(`http://localhost:5000/api/resume/${resumeId}`, {
            credentials: "include",
          })
          if (response.ok) {
            const data = await response.json()
            setResumeData(data)
          } else {
            toast({
              title: "Error",
              description: "Failed to load resume data. Please try again.",
              variant: "destructive",
            })
            setResumeData(getFallbackResumeData())
          }
        } else {
          console.error("No resume data found")
          // Use fallback data if needed
          setResumeData(getFallbackResumeData())
        }
      } catch (error) {
        console.error("Error loading resume data:", error)
        setResumeData(getFallbackResumeData())
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
    const html2canvas = (await import("html2canvas")).default
    const jsPDF = (await import("jspdf")).default
    const input = document.getElementById("resume-area")
    if (!input) return

    const canvas = await html2canvas(input)
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save("resume.pdf")
  }

  const handleEdit = () => {
    setShowEditModal(true)
  }

  const handleManualEdit = () => {
    setShowEditModal(false)
    // If we have a resumeId from the API, use it for editing
    if (resumeData && "id" in resumeData) {
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
