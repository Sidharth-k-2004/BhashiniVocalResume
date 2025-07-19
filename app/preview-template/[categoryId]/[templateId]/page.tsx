"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  ProfessionalTemplate,
  CreativeTemplate,
  MinimalTemplate,
  ExecutiveTemplate,
} from "@/components/resume-templates"

export default function PreviewTemplate({ params }: { params: { categoryId: string; templateId: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { categoryId, templateId } = params

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

  // Sample data for preview - NOW INCLUDING PROJECTS
  const sampleData = {
    personalInfo: {
      name: "John Doe",
      title: "Software Engineer",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
    },
    summary:
      "Experienced software engineer with a passion for building scalable web applications and leading high-performing teams.",
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Innovations Inc.",
        dates: "2021 - Present",
        location: "San Francisco, CA",
        description:
          "Led development of company's flagship product. Managed team of 5 engineers. Implemented CI/CD pipeline reducing deployment time by 40%.",
      },
      {
        title: "Software Engineer",
        company: "Digital Solutions LLC",
        dates: "2019 - 2021",
        location: "Remote",
        description:
          "Developed responsive web applications using React. Collaborated with design team to implement UI/UX improvements. Optimized database queries resulting in 30% performance improvement.",
      },
    ],
    education: [
      {
        degree: "Computer Science, BS",
        institution: "Stanford University",
        dates: "2015 - 2019",
        location: "Stanford, CA",
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
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL", "Python"],
  }

  useEffect(() => {
    // Simulate loading the template
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleSelectTemplate = () => {
    // Navigate to the audio input page with the selected template
    router.push(`/audio-input?template=${templateId}&category=${categoryId}`)
  }

  const handleGoBack = () => {
    router.push(`/templates?category=${categoryId}`)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading template preview...</p>
        </div>
      </div>
    )
  }

  // Render the appropriate template based on the template ID
  const renderTemplate = () => {
    // First character of template ID indicates the category
    const templateType = templateId.charAt(0)
    const templateNumber = templateId.substring(1)

    switch (templateType) {
      case "p":
        return <ProfessionalTemplate variant={templateNumber} data={sampleData} />
      case "c":
        return <CreativeTemplate variant={templateNumber} data={sampleData} />
      case "m":
        return <MinimalTemplate variant={templateNumber} data={sampleData} />
      case "e":
        return <ExecutiveTemplate variant={templateNumber} data={sampleData} />
      default:
        return <ProfessionalTemplate variant="1" data={sampleData} />
    }
  }

  return (
    <div className="container mx-auto py-8 px-6">
      <Button variant="ghost" size="sm" className="mb-6" onClick={handleGoBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to selection
      </Button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          {categoryNames[categoryId] || "Template"} - {templateNames[templateId] || "Preview"}
        </h1>
        <p className="text-gray-600 mt-2">Template Preview</p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
        <div className="max-w-4xl mx-auto bg-white rounded shadow-lg">{renderTemplate()}</div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">
          Like this template? Select it and record your resume details to generate your personalized resume.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleSelectTemplate}>Select This Template</Button>
          <Button variant="outline" onClick={handleGoBack}>
            View Other Templates
          </Button>
        </div>
      </div>
    </div>
  )
}
