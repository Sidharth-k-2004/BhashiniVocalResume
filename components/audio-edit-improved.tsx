"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mic, MicOff, Play, RotateCcw, Check, X, Volume2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

interface EditChange {
  type: "add" | "remove" | "modify"
  section: string
  field?: string
  oldValue?: any
  newValue?: any
  description: string
}

export default function AudioEditImproved() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [originalData, setOriginalData] = useState<ResumeData | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [changes, setChanges] = useState<EditChange[]>([])
  const [showChanges, setShowChanges] = useState(false)
  const [transcript, setTranscript] = useState<string>("")
  const audioRef = useRef<HTMLAudioElement>(null)
  const recordingInterval = useRef<NodeJS.Timeout | null>(null)

  const resumeId = searchParams.get("id") || ""
  const templateId = searchParams.get("template") || ""
  const categoryId = searchParams.get("category") || ""

  useEffect(() => {
    loadResumeData()
  }, [resumeId])

  useEffect(() => {
    if (isRecording) {
      recordingInterval.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current)
      }
    }

    return () => {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current)
      }
    }
  }, [isRecording])

  const loadResumeData = async () => {
    try {
      let data: ResumeData | null = null

      if (resumeId) {
        // Load from API
        const response = await fetch(`http://localhost:5000/api/resume/${resumeId}`, {
          credentials: "include",
        })
        if (response.ok) {
          data = await response.json()
        }
      } else {
        // Load from localStorage
        const storedData = localStorage.getItem("resumeDataForEdit") || localStorage.getItem("resumeData")
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          data = parsedData.data ? parsedData.data : parsedData
        }
      }

      if (data) {
        // Ensure skills is an array
        if (typeof data.skills === "string") {
          data.skills = (data.skills as string).split(",").map((s) => s.trim())
        }
        setResumeData(data)
        setOriginalData(JSON.parse(JSON.stringify(data))) // Deep copy
      } else {
        toast({
          title: "Error",
          description: "Could not load resume data",
          variant: "destructive",
        })
        router.push("/templates")
      }
    } catch (error) {
      console.error("Error loading resume data:", error)
      toast({
        title: "Error",
        description: "Failed to load resume data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: BlobPart[] = []

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" })
        setAudioBlob(blob)
        stream.getTracks().forEach((track) => track.stop())
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
      setRecordingTime(0)
      setTranscript("")
      setChanges([])
      setShowChanges(false)
    } catch (error) {
      console.error("Error starting recording:", error)
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop()
      setIsRecording(false)
      setMediaRecorder(null)
    }
  }

  const playRecording = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob)
      audioRef.current.src = audioUrl
      audioRef.current.play()
    }
  }

  const processAudioEdit = async () => {
    if (!audioBlob || !resumeData) return

    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append("audio", audioBlob, "edit_command.wav")
      formData.append("resumeData", JSON.stringify(resumeData))
      formData.append("language", "en")

      const response = await fetch("http://localhost:5000/api/process-audio-edit", {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      if (response.ok) {
        const result = await response.json()

        // Ensure skills is an array after processing
        if (result.updatedData && typeof result.updatedData.skills === "string") {
          result.updatedData.skills = (result.updatedData.skills as string)
            .split(",")
            .map((s: string) => s.trim())
            .filter((s: string) => s.length > 0)
        }

        setResumeData(result.updatedData)
        setChanges(result.changes || [])
        setTranscript(result.transcript || "")
        setShowChanges(true)

        toast({
          title: "Success",
          description: "Audio processed successfully! Review the changes below.",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.message || "Failed to process audio",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error processing audio:", error)
      toast({
        title: "Error",
        description: "Failed to process audio edit",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const acceptChanges = async () => {
    if (!resumeData) return

    try {
      if (resumeId) {
        // Update existing resume
        const response = await fetch(`http://localhost:5000/api/resume/${resumeId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resumeData),
          credentials: "include",
        })

        if (response.ok) {
          toast({
            title: "Success",
            description: "Resume updated successfully!",
          })
          router.push(`/resume-preview?id=${resumeId}&template=${templateId}&category=${categoryId}`)
        } else {
          throw new Error("Failed to update resume")
        }
      } else {
        // Store in localStorage and navigate to preview
        localStorage.setItem("resumeData", JSON.stringify({ data: resumeData }))
        router.push(`/resume-preview?template=${templateId}&category=${categoryId}`)
      }
    } catch (error) {
      console.error("Error saving changes:", error)
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      })
    }
  }

  const rejectChanges = () => {
    if (originalData) {
      setResumeData(JSON.parse(JSON.stringify(originalData)))
      setChanges([])
      setShowChanges(false)
      setTranscript("")
      toast({
        title: "Changes Rejected",
        description: "Resume reverted to original state",
      })
    }
  }

  const resetRecording = () => {
    setAudioBlob(null)
    setRecordingTime(0)
    setChanges([])
    setShowChanges(false)
    setTranscript("")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case "add":
        return "bg-green-100 text-green-800 border-green-200"
      case "remove":
        return "bg-red-100 text-red-800 border-red-200"
      case "modify":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const renderResumePreview = () => {
    if (!resumeData) return null

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Name:</strong> {resumeData.personalInfo.name}
            </div>
            <div>
              <strong>Title:</strong> {resumeData.personalInfo.title}
            </div>
            <div>
              <strong>Email:</strong> {resumeData.personalInfo.email}
            </div>
            <div>
              <strong>Phone:</strong> {resumeData.personalInfo.phone}
            </div>
            <div>
              <strong>Location:</strong> {resumeData.personalInfo.location}
            </div>
            {resumeData.personalInfo.linkedin && (
              <div>
                <strong>LinkedIn:</strong> {resumeData.personalInfo.linkedin}
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Summary</h3>
          <p className="text-sm">{resumeData.summary}</p>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(resumeData.skills) &&
              resumeData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Experience</h3>
          <div className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <h4 className="font-medium">
                  {exp.title} at {exp.company}
                </h4>
                <p className="text-sm text-gray-600">
                  {exp.dates} • {exp.location}
                </p>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          <div className="space-y-2">
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                <h4 className="font-medium">{edu.degree}</h4>
                <p className="text-sm text-gray-600">
                  {edu.institution} • {edu.dates}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading resume data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-6">
      <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Edit Resume Through Audio</h1>
          <p className="text-gray-600 mt-2">
            Record your voice to make changes to your resume. Say things like "Remove Python from skills" or "Change my
            location to New York"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Audio Recording Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Voice Commands</CardTitle>
                <CardDescription>Record your editing instructions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  {!isRecording && !audioBlob && (
                    <Button onClick={startRecording} size="lg" className="w-full">
                      <Mic className="mr-2 h-5 w-5" />
                      Start Recording
                    </Button>
                  )}

                  {isRecording && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-lg font-mono">{formatTime(recordingTime)}</span>
                      </div>
                      <Button onClick={stopRecording} variant="destructive" size="lg" className="w-full">
                        <MicOff className="mr-2 h-5 w-5" />
                        Stop Recording
                      </Button>
                    </div>
                  )}

                  {audioBlob && !isRecording && (
                    <div className="space-y-4">
                      <div className="flex justify-center space-x-2">
                        <Button onClick={playRecording} variant="outline">
                          <Play className="mr-2 h-4 w-4" />
                          Play
                        </Button>
                        <Button onClick={resetRecording} variant="outline">
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reset
                        </Button>
                      </div>
                      <Button onClick={processAudioEdit} disabled={isProcessing} size="lg" className="w-full">
                        {isProcessing ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          "Apply Changes"
                        )}
                      </Button>
                    </div>
                  )}
                </div>
                <audio ref={audioRef} className="hidden" />
              </CardContent>
            </Card>

            {/* Transcript Display */}
            {transcript && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Volume2 className="mr-2 h-5 w-5" />
                    What You Said
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <AlertDescription className="italic">"{transcript}"</AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}

            {/* Example Commands */}
            <Card>
              <CardHeader>
                <CardTitle>Example Commands</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-gray-50 rounded">"Remove Python from my skills"</div>
                  <div className="p-2 bg-gray-50 rounded">"Add React and Node.js to my skills"</div>
                  <div className="p-2 bg-gray-50 rounded">"Change my location to San Francisco, CA"</div>
                  <div className="p-2 bg-gray-50 rounded">"Update my job title to Senior Developer"</div>
                  <div className="p-2 bg-gray-50 rounded">
                    "Add a new education: Master's in Computer Science from MIT"
                  </div>
                  <div className="p-2 bg-gray-50 rounded">"Change my current company to Google"</div>
                  <div className="p-2 bg-gray-50 rounded">"Update my summary to mention AI experience"</div>
                </div>
              </CardContent>
            </Card>

            {/* Changes Preview */}
            {showChanges && changes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Detected Changes</CardTitle>
                  <CardDescription>Review the changes before applying them</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {changes.map((change, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getChangeTypeColor(change.type)}>{change.type.toUpperCase()}</Badge>
                          <span className="font-medium text-sm">{change.section}</span>
                          {change.field && <span className="text-xs text-gray-500">({change.field})</span>}
                        </div>
                        <p className="text-sm text-gray-700">{change.description}</p>
                        {change.oldValue && (
                          <div className="mt-2 text-xs">
                            <span className="text-red-600">Old: {JSON.stringify(change.oldValue)}</span>
                          </div>
                        )}
                        {change.newValue && (
                          <div className="mt-1 text-xs">
                            <span className="text-green-600">New: {JSON.stringify(change.newValue)}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2 mt-6">
                    <Button onClick={acceptChanges} className="flex-1">
                      <Check className="mr-2 h-4 w-4" />
                      Accept Changes
                    </Button>
                    <Button onClick={rejectChanges} variant="outline" className="flex-1 bg-transparent">
                      <X className="mr-2 h-4 w-4" />
                      Reject Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Resume Preview Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
                <CardDescription>
                  {showChanges ? "Updated resume with your changes" : "Current state of your resume"}
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-[800px] overflow-y-auto">{renderResumePreview()}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
