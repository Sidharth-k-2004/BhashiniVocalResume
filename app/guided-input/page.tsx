"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import {
  Mic,
  MicOff,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  ArrowLeft,
  Check,
  Edit3,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Question {
  id: string
  section: string
  question: string
  audioQuestion: string
  type: "text" | "textarea" | "array" | "object"
  field: string
  subField?: string
  placeholder?: string
  required: boolean
  examples?: string[]
}

interface ResumeData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin: string
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
  projects: Array<{
    name: string
    description: string
    technologies: string
    link: string
    dates: string
  }>
  publications: Array<{
    title: string
    authors: string
    journal: string
    year: string
    links: Array<{
      type: string
      url: string
      description: string
    }>
  }>
  skills: string[]
}

const questions: Question[] = [
  // Personal Information
  {
    id: "name",
    section: "Personal Information",
    question: "What's your full name?",
    audioQuestion: "Please tell me your full name",
    type: "text",
    field: "personalInfo",
    subField: "name",
    placeholder: "e.g., John Smith",
    required: true,
  },
  {
    id: "title",
    section: "Personal Information",
    question: "What's your professional title or the job you're targeting?",
    audioQuestion: "What is your professional title or the job position you're applying for?",
    type: "text",
    field: "personalInfo",
    subField: "title",
    placeholder: "e.g., Software Engineer, Marketing Manager",
    required: true,
    examples: ["Software Engineer", "Data Scientist", "Marketing Manager", "Product Designer"],
  },
  {
    id: "email",
    section: "Personal Information",
    question: "What's your email address?",
    audioQuestion: "Please provide your email address",
    type: "text",
    field: "personalInfo",
    subField: "email",
    placeholder: "e.g., john.smith@email.com",
    required: true,
  },
  {
    id: "phone",
    section: "Personal Information",
    question: "What's your phone number?",
    audioQuestion: "Please tell me your phone number",
    type: "text",
    field: "personalInfo",
    subField: "phone",
    placeholder: "e.g., (555) 123-4567",
    required: true,
  },
  {
    id: "location",
    section: "Personal Information",
    question: "Where are you located?",
    audioQuestion: "What is your current location or city?",
    type: "text",
    field: "personalInfo",
    subField: "location",
    placeholder: "e.g., San Francisco, CA",
    required: true,
  },
  {
    id: "linkedin",
    section: "Personal Information",
    question: "What's your LinkedIn profile URL? (Optional)",
    audioQuestion: "Do you have a LinkedIn profile? If yes, please provide the URL",
    type: "text",
    field: "personalInfo",
    subField: "linkedin",
    placeholder: "e.g., linkedin.com/in/johnsmith",
    required: false,
  },
  // Professional Summary
  {
    id: "summary",
    section: "Professional Summary",
    question: "Write a brief professional summary about yourself",
    audioQuestion:
      "Please tell me about yourself professionally. Describe your experience, key skills, and what makes you a great candidate",
    type: "textarea",
    field: "summary",
    placeholder: "e.g., Experienced software engineer with 5+ years in web development...",
    required: true,
    examples: [
      "Experienced software engineer with 5+ years developing scalable web applications",
      "Creative marketing professional with expertise in digital campaigns and brand strategy",
      "Data scientist passionate about machine learning and business intelligence",
    ],
  },
  // Skills
  {
    id: "skills",
    section: "Skills",
    question: "What are your key skills?",
    audioQuestion: "Please list your key skills, both technical and soft skills that are relevant to your career",
    type: "array",
    field: "skills",
    placeholder: "e.g., JavaScript, Python, Project Management (separate with commas)",
    required: true,
    examples: [
      "JavaScript, React, Node.js",
      "Python, Machine Learning, Data Analysis",
      "Project Management, Leadership, Communication",
    ],
  },
  // Experience
  {
    id: "experience",
    section: "Work Experience",
    question: "Tell me about your work experience",
    audioQuestion:
      "Please describe your work experience, starting with your most recent job. Include the job title, company name, dates, and what you did in each role",
    type: "textarea",
    field: "experience",
    placeholder: "Describe your work experience in detail...",
    required: true,
    examples: [
      "Senior Software Engineer at Tech Corp (2021-Present): Led development of web applications, managed team of 5 developers",
      "Marketing Specialist at ABC Company (2019-2021): Created digital marketing campaigns, increased engagement by 40%",
    ],
  },
  // Education
  {
    id: "education",
    section: "Education",
    question: "What's your educational background?",
    audioQuestion: "Please tell me about your education, including degrees, institutions, and graduation dates",
    type: "textarea",
    field: "education",
    placeholder: "Describe your educational background...",
    required: true,
    examples: [
      "Bachelor of Science in Computer Science, Stanford University, 2019",
      "Master of Business Administration, Harvard Business School, 2021",
    ],
  },
  // Projects (Optional)
  {
    id: "projects",
    section: "Projects",
    question: "Do you have any notable projects to showcase? (Optional)",
    audioQuestion:
      "Do you have any personal or professional projects you'd like to include? Please describe them including technologies used and outcomes",
    type: "textarea",
    field: "projects",
    placeholder: "Describe your projects...",
    required: false,
    examples: [
      "E-commerce Platform: Built using React and Node.js, handles 1000+ daily users",
      "Mobile App: iOS app for fitness tracking, 10k+ downloads on App Store",
    ],
  },
  // Publications (Optional)
  {
    id: "publications",
    section: "Publications",
    question: "Do you have any publications or research papers? (Optional)",
    audioQuestion:
      "Have you published any research papers, articles, or other publications? Please provide details including titles, co-authors, and publication venues",
    type: "textarea",
    field: "publications",
    placeholder: "Describe your publications...",
    required: false,
    examples: [
      "Deep Learning in Healthcare, published in IEEE Transactions, co-authored with Dr. Smith",
      "Machine Learning Applications, Nature Journal, 2023",
    ],
  },
]

export default function GuidedInputPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template") || "p1"
  const categoryId = searchParams.get("category") || "1"

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessingAudio, setIsProcessingAudio] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [isPlayingQuestion, setIsPlayingQuestion] = useState(false)
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true)
  const [resumeData, setResumeData] = useState<Partial<ResumeData>>({})
  const [isGenerating, setIsGenerating] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  // Check authentication on component mount
  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/check-auth", {
        method: "GET",
        credentials: "include",
      })

      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        toast({
          title: "Authentication Required",
          description: "Please log in to continue building your resume.",
          variant: "destructive",
        })
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    } catch (error) {
      console.error("Error checking authentication:", error)
      setIsAuthenticated(false)
      toast({
        title: "Connection Error",
        description: "Unable to verify authentication. Please check your connection.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      // Load existing answer for current question
      const existingAnswer = answers[currentQuestion.id] || ""
      setCurrentAnswer(existingAnswer)
      // Auto-play question if speech is enabled
      if (isSpeechEnabled && currentQuestion) {
        setTimeout(() => playQuestion(), 500)
      }
    }
  }, [currentQuestionIndex, isSpeechEnabled, isAuthenticated])

  const playQuestion = () => {
    if (!isSpeechEnabled) return
    // Stop any existing speech
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(currentQuestion.audioQuestion)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 0.8
    utterance.onstart = () => setIsPlayingQuestion(true)
    utterance.onend = () => setIsPlayingQuestion(false)
    utterance.onerror = () => setIsPlayingQuestion(false)
    speechSynthRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const stopQuestion = () => {
    window.speechSynthesis.cancel()
    setIsPlayingQuestion(false)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        setAudioBlob(audioBlob)
        processAudioAnswer(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      toast({
        title: "Microphone Error",
        description: "Could not access your microphone. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const processAudioAnswer = async (audioBlob: Blob) => {
    setIsProcessingAudio(true)
    try {
      const formData = new FormData()
      formData.append("audio", audioBlob)
      formData.append("question", currentQuestion.audioQuestion)
      formData.append("questionId", currentQuestion.id)
      formData.append("language", "en")

      const response = await fetch("http://localhost:5000/api/process-guided-audio", {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      if (response.status === 401) {
        // Handle authentication error
        setIsAuthenticated(false)
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        })
        router.push("/login")
        return
      }

      if (response.ok) {
        const data = await response.json()
        setCurrentAnswer(data.answer || data.transcript || "")
        toast({
          title: "Audio processed",
          description: "Your response has been transcribed. You can edit it if needed.",
        })
      } else {
        throw new Error(`Failed to process audio: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error("Error processing audio:", error)
      toast({
        title: "Error",
        description: "Failed to process audio. Please try again or type your answer.",
        variant: "destructive",
      })
    } finally {
      setIsProcessingAudio(false)
    }
  }

  const handleNext = () => {
    if (currentQuestion.required && !currentAnswer.trim()) {
      toast({
        title: "Required field",
        description: "Please provide an answer before continuing.",
        variant: "destructive",
      })
      return
    }

    // Save current answer
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: currentAnswer,
    }))

    if (isLastQuestion) {
      generateResume()
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      // Save current answer
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: currentAnswer,
      }))
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const generateResume = async () => {
    setIsGenerating(true)
    try {
      // Combine all answers
      const allAnswers = {
        ...answers,
        [currentQuestion.id]: currentAnswer,
      }

      const response = await fetch("http://localhost:5000/api/generate-guided-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: allAnswers,
          templateId,
          categoryId,
        }),
        credentials: "include",
      })

      if (response.status === 401) {
        // Handle authentication error
        setIsAuthenticated(false)
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        })
        router.push("/login")
        return
      }

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("resumeData", JSON.stringify(data))
        toast({
          title: "Resume generated!",
          description: "Your resume has been created successfully.",
        })
        router.push(`/resume-preview?template=${templateId}&category=${categoryId}`)
      } else {
        throw new Error(`Failed to generate resume: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error("Error generating resume:", error)
      toast({
        title: "Error",
        description: "Failed to generate resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGoBack = () => {
    router.push(`/preview-template/${categoryId}/${templateId}`)
  }

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="container mx-auto py-8 px-6 max-w-4xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Checking authentication...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show authentication error
  if (isAuthenticated === false) {
    return (
      <div className="container mx-auto py-8 px-6 max-w-4xl">
        <Alert className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>You need to be logged in to access this page. Redirecting to login...</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-6 max-w-4xl">
      <Button variant="ghost" size="sm" className="mb-6" onClick={handleGoBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to template selection
      </Button>

      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Guided Resume Builder</h1>
          <Badge variant="outline">
            {currentQuestionIndex + 1} of {questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{currentQuestion.section}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Question Panel */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={isSpeechEnabled ? (isPlayingQuestion ? stopQuestion : playQuestion) : undefined}
                    disabled={!isSpeechEnabled}
                  >
                    {isSpeechEnabled ? (
                      isPlayingQuestion ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )
                    ) : (
                      <VolumeX className="h-4 w-4 opacity-50" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}>
                    {isSpeechEnabled ? "Disable Audio" : "Enable Audio"}
                  </Button>
                </div>
              </div>
              {!currentQuestion.required && (
                <Badge variant="secondary" className="w-fit">
                  Optional
                </Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Examples */}
              {currentQuestion.examples && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Examples:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {currentQuestion.examples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Audio Recording */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Voice Response</h4>
                  {isProcessingAudio && <Badge variant="outline">Processing...</Badge>}
                </div>
                <div className="flex items-center gap-4">
                  {!isRecording ? (
                    <Button onClick={startRecording} disabled={isProcessingAudio} className="flex items-center gap-2">
                      <Mic className="h-4 w-4" />
                      Start Recording
                    </Button>
                  ) : (
                    <Button
                      onClick={stopRecording}
                      variant="destructive"
                      className="flex items-center gap-2 animate-pulse"
                    >
                      <MicOff className="h-4 w-4" />
                      Stop Recording
                    </Button>
                  )}
                  {audioBlob && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Check className="h-4 w-4" />
                      Audio recorded
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Text Input */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Edit3 className="h-4 w-4" />
                  <h4 className="font-medium">Type or Edit Your Response</h4>
                </div>
                {currentQuestion.type === "textarea" ? (
                  <Textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    rows={6}
                    className="resize-none"
                  />
                ) : (
                  <Input
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                  />
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="bg-transparent"
                >
                  <SkipBack className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={isProcessingAudio || isGenerating} className="min-w-[120px]">
                  {isGenerating ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Generating...
                    </>
                  ) : isLastQuestion ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Generate Resume
                    </>
                  ) : (
                    <>
                      Next
                      <SkipForward className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-lg">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const isCompleted = answers[question.id]
                  const isCurrent = index === currentQuestionIndex
                  const isPast = index < currentQuestionIndex
                  return (
                    <div
                      key={question.id}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        isCurrent ? "bg-blue-50 border border-blue-200" : isPast ? "bg-green-50" : "bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isCurrent
                              ? "bg-blue-500 text-white"
                              : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {isCompleted ? <Check className="h-3 w-3" /> : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-sm font-medium truncate ${
                            isCurrent ? "text-blue-900" : isCompleted ? "text-green-900" : "text-gray-600"
                          }`}
                        >
                          {question.section}
                        </div>
                        <div className="text-xs text-gray-500 truncate">{question.question}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
