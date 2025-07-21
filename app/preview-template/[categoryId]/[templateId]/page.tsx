"use client"

import { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageSquare, Mic } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ProfessionalTemplate,
  CreativeTemplate,
  MinimalTemplate,
  ExecutiveTemplate,
} from "@/components/resume-templates"


export default function PreviewTemplate({
  params,
}: {
  // params: { categoryId: string; templateId: string }
   params: Promise<{ categoryId: string; templateId: string }>
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [showModeSelection, setShowModeSelection] = useState(false)
  const router = useRouter()
  // const { categoryId, templateId } = params
  const { categoryId, templateId } = use(params)

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

  // Sample data for preview - NOW INCLUDING PUBLICATIONS
  const sampleData = {
    personalInfo: {
      name: "Dr. Sarah Johnson",
      title: "Senior Research Scientist & AI Engineer",
      email: "sarah.johnson@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
    },
    summary:
      "Experienced research scientist and AI engineer with 8+ years in machine learning, computer vision, and healthcare applications. Published 15+ peer-reviewed papers and led cross-functional teams in developing innovative AI solutions.",
    experience: [
      {
        title: "Senior Research Scientist",
        company: "Tech Innovations Inc.",
        dates: "2021 - Present",
        location: "San Francisco, CA",
        description:
          "Led development of AI-powered medical imaging solutions. Managed team of 8 researchers. Published 6 papers in top-tier conferences. Secured $2M in research funding.",
      },
      {
        title: "AI Research Engineer",
        company: "Digital Health Solutions",
        dates: "2019 - 2021",
        location: "Remote",
        description:
          "Developed machine learning models for healthcare applications. Collaborated with medical professionals to implement AI solutions. Published 4 research papers and filed 2 patents.",
      },
    ],
    education: [
      {
        degree: "Ph.D. in Computer Science",
        institution: "Stanford University",
        dates: "2015 - 2019",
        location: "Stanford, CA",
      },
      {
        degree: "M.S. in Machine Learning",
        institution: "MIT",
        dates: "2013 - 2015",
        location: "Cambridge, MA",
      },
    ],
    projects: [
      {
        name: "AI-Powered Medical Diagnosis System",
        description:
          "Developed a deep learning system for automated medical image analysis with 95% accuracy. Implemented using TensorFlow and deployed on cloud infrastructure.",
        technologies: "Python, TensorFlow, AWS, Docker",
        link: "https://github.com/sarahjohnson/medical-ai",
        dates: "2023 - Present",
      },
      {
        name: "Computer Vision for Autonomous Vehicles",
        description:
          "Built real-time object detection and tracking system for autonomous driving applications using state-of-the-art computer vision techniques.",
        technologies: "PyTorch, OpenCV, CUDA, ROS",
        link: "https://autonomous-vision-demo.com",
        dates: "2022 - 2023",
      },
    ],
    publications: [
      {
        title: "Deep Learning Applications in Medical Image Analysis: A Comprehensive Survey",
        authors: "Sarah Johnson, Michael Chen, David Rodriguez",
        journal: "IEEE Transactions on Medical Imaging",
        year: "2023",
        links: [
          {
            type: "DOI",
            url: "https://doi.org/10.1109/TMI.2023.1234567",
            description: "Official DOI link",
          },
          {
            type: "PDF",
            url: "https://arxiv.org/pdf/2023.12345.pdf",
            description: "ArXiv preprint",
          },
          {
            type: "Google Scholar",
            url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=abc123&citation_for_view=abc123:def456",
            description: "Google Scholar page",
          },
        ],
      },
      {
        title: "Automated Diagnosis of Skin Cancer Using Convolutional Neural Networks",
        authors: "Sarah Johnson, Lisa Wang, Robert Kim",
        journal: "Nature Medicine",
        year: "2022",
        links: [
          {
            type: "DOI",
            url: "https://doi.org/10.1038/s41591-022-01234-5",
            description: "Nature Medicine publication",
          },
          {
            type: "Supplementary",
            url: "https://static-content.springer.com/esm/art%3A10.1038%2Fs41591-022-01234-5/MediaObjects/supplementary.pdf",
            description: "Supplementary materials",
          },
        ],
      },
      {
        title: "Federated Learning for Privacy-Preserving Healthcare AI",
        authors: "Sarah Johnson, Alex Thompson, Maria Garcia, James Wilson",
        journal: "Proceedings of ICML 2022",
        year: "2022",
        links: [
          {
            type: "ArXiv",
            url: "https://arxiv.org/abs/2022.06789",
            description: "ArXiv preprint",
          },
          {
            type: "Conference",
            url: "https://proceedings.mlr.press/v162/johnson22a.html",
            description: "ICML proceedings",
          },
        ],
      },
    ],
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Python",
      "TensorFlow",
      "PyTorch",
      "Research",
      "Publications",
    ],
  }

  useEffect(() => {
    // Simulate loading the template
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleSelectTemplate = () => {
    setShowModeSelection(true)
  }

  const handleModeSelection = (mode: "guided" | "freeform") => {
    setShowModeSelection(false)
    if (mode === "guided") {
      // Navigate to guided input page
      router.push(`/guided-input?template=${templateId}&category=${categoryId}`)
    } else {
      // Navigate to the audio input page for freeform mode
      router.push(`/audio-input?template=${templateId}&category=${categoryId}&mode=${mode}`)
    }
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
        <p className="text-gray-600 mt-2">Template Preview with Sample Publications</p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
        <div className="max-w-4xl mx-auto bg-white rounded shadow-lg">{renderTemplate()}</div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">
          Like this template? Select it and choose how you'd like to provide your resume information.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleSelectTemplate}>Select This Template</Button>
          <Button variant="outline" onClick={handleGoBack}>
            View Other Templates
          </Button>
        </div>
      </div>

      {/* Mode Selection Modal */}
      <Dialog open={showModeSelection} onOpenChange={setShowModeSelection}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">Choose Your Input Mode</DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              How would you like to provide your resume information?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              onClick={() => handleModeSelection("guided")}
              className="h-auto p-6 flex flex-col items-center gap-3 text-left"
              variant="outline"
            >
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div>
                <div className="font-semibold text-lg">Guided Mode</div>
                <div className="text-sm text-gray-600 mt-1">We'll ask you questions step by step</div>
                <div className="text-xs text-gray-500 mt-2">Perfect for structured input with guided prompts</div>
              </div>
            </Button>
            <Button
              onClick={() => handleModeSelection("freeform")}
              className="h-auto p-6 flex flex-col items-center gap-3 text-left"
              variant="outline"
            >
              <Mic className="h-8 w-8 text-green-600" />
              <div>
                <div className="font-semibold text-lg">Freeform Mode</div>
                <div className="text-sm text-gray-600 mt-1">Speak everything in your own flow</div>
                <div className="text-xs text-gray-500 mt-2">
                  Ideal for natural conversation and detailed explanations
                </div>
              </div>
            </Button>
          </div>
          <div className="text-center">
            <Button variant="ghost" onClick={() => setShowModeSelection(false)} className="text-sm">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
