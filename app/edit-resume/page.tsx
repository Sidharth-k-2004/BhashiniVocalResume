"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Plus, X, Save } from "lucide-react"

export default function EditResumePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const resumeId = searchParams.get("id")
  const templateId = searchParams.get("template")
  const categoryId = searchParams.get("category")

  const [resumeData, setResumeData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load resume data
    const loadResumeData = async () => {
      try {
        if (resumeId) {
          // If we have a resumeId, fetch from API
          try {
            const response = await fetch(`http://localhost:5000/api/resume/${resumeId}`, {
              credentials: "include",
            })
            if (response.ok) {
              const data = await response.json()
              setResumeData(ensureResumeStructure(data))
            } else {
              throw new Error("Failed to load resume data from API")
            }
          } catch (error) {
            console.error("API fetch error:", error)
            // Fall back to localStorage if API fails
            const storedData = localStorage.getItem("resumeData")
            if (storedData) {
              handleStoredData(storedData)
            } else {
              setResumeData(getEmptyResumeData())
            }
          }
        } else {
          // No resumeId, try localStorage
          const storedData = localStorage.getItem("resumeData")
          if (storedData) {
            handleStoredData(storedData)
          } else {
            setResumeData(getEmptyResumeData())
          }
        }
      } catch (error) {
        console.error("Error loading resume data:", error)
        setResumeData(getEmptyResumeData())
      } finally {
        setIsLoading(false)
      }
    }

    loadResumeData()
  }, [resumeId])

  const handleStoredData = (storedData: string) => {
    try {
      const parsedData = JSON.parse(storedData)
      const resumeJson = parsedData.data ? parsedData.data : parsedData
      if (typeof resumeJson === "string" && resumeJson.startsWith("json")) {
        const jsonStart = resumeJson.indexOf("{")
        const jsonEnd = resumeJson.lastIndexOf("}") + 1
        const jsonString = resumeJson.substring(jsonStart, jsonEnd)
        setResumeData(ensureResumeStructure(JSON.parse(jsonString)))
      } else {
        setResumeData(ensureResumeStructure(resumeJson))
      }
    } catch (error) {
      console.error("Error parsing stored data:", error)
      setResumeData(getEmptyResumeData())
    }
  }

  const ensureResumeStructure = (data: any) => {
    // Ensure all required arrays exist
    return {
      ...data,
      experience: Array.isArray(data.experience) ? data.experience : [],
      education: Array.isArray(data.education) ? data.education : [],
      projects: Array.isArray(data.projects) ? data.projects : [],
      publications: Array.isArray(data.publications) ? data.publications : [], // Add publications
      skills: Array.isArray(data.skills) ? data.skills : [""],
      personalInfo: data.personalInfo || {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
      },
      summary: data.summary || "",
    }
  }

  const getEmptyResumeData = () => {
    return {
      personalInfo: {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
      },
      summary: "",
      experience: [
        {
          title: "",
          company: "",
          dates: "",
          location: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          dates: "",
          location: "",
        },
      ],
      projects: [],
      publications: [], // Add empty publications array
      skills: [""],
    }
  }

  const handleInputChange = (section: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      [section]: {
        ...resumeData[section],
        [field]: value,
      },
    })
  }

  const handleArrayItemChange = (section: string, index: number, field: string, value: string) => {
    const newArray = [...(resumeData[section] || [])]
    newArray[index] = {
      ...newArray[index],
      [field]: value,
    }
    setResumeData({
      ...resumeData,
      [section]: newArray,
    })
  }

  const handlePublicationLinkChange = (pubIndex: number, linkIndex: number, field: string, value: string) => {
    const newPublications = [...(resumeData.publications || [])]
    const newLinks = [...(newPublications[pubIndex].links || [])]
    newLinks[linkIndex] = {
      ...newLinks[linkIndex],
      [field]: value,
    }
    newPublications[pubIndex] = {
      ...newPublications[pubIndex],
      links: newLinks,
    }
    setResumeData({
      ...resumeData,
      publications: newPublications,
    })
  }

  const addPublicationLink = (pubIndex: number) => {
    const newPublications = [...(resumeData.publications || [])]
    const currentLinks = Array.isArray(newPublications[pubIndex].links) ? newPublications[pubIndex].links : []
    newPublications[pubIndex] = {
      ...newPublications[pubIndex],
      links: [...currentLinks, { type: "", url: "", description: "" }],
    }
    setResumeData({
      ...resumeData,
      publications: newPublications,
    })
  }

  const removePublicationLink = (pubIndex: number, linkIndex: number) => {
    const newPublications = [...(resumeData.publications || [])]
    const newLinks = [...(newPublications[pubIndex].links || [])]
    newLinks.splice(linkIndex, 1)
    newPublications[pubIndex] = {
      ...newPublications[pubIndex],
      links: newLinks,
    }
    setResumeData({
      ...resumeData,
      publications: newPublications,
    })
  }

  const addArrayItem = (section: string, template: any) => {
    // Ensure the section exists and is an array
    const currentArray = Array.isArray(resumeData[section]) ? resumeData[section] : []
    setResumeData({
      ...resumeData,
      [section]: [...currentArray, template],
    })
  }

  const removeArrayItem = (section: string, index: number) => {
    const newArray = [...(resumeData[section] || [])]
    newArray.splice(index, 1)
    setResumeData({
      ...resumeData,
      [section]: newArray,
    })
  }

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...(resumeData.skills || [])]
    newSkills[index] = value
    setResumeData({
      ...resumeData,
      skills: newSkills,
    })
  }

  const addSkill = () => {
    const currentSkills = Array.isArray(resumeData.skills) ? resumeData.skills : []
    setResumeData({
      ...resumeData,
      skills: [...currentSkills, ""],
    })
  }

  const removeSkill = (index: number) => {
    const newSkills = [...(resumeData.skills || [])]
    newSkills.splice(index, 1)
    setResumeData({
      ...resumeData,
      skills: newSkills,
    })
  }

  // const handleSaveResume = async () => {
  //   setIsSaving(true)
  //   try {
  //     if (resumeId) {
  //       // If we have a resumeId, update via API
  //       try {
  //         const response = await fetch(`http://localhost:5000/api/resume/${resumeId}`, {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(resumeData),
  //           credentials: "include",
  //         })
  //         if (response.ok) {
  //           toast({
  //             title: "Resume updated",
  //             description: "Your resume has been updated successfully.",
  //           })
  //         } else {
  //           throw new Error("Failed to update resume via API")
  //         }
  //       } catch (error) {
  //         console.error("API update error:", error)
  //         // Fall back to localStorage
  //         localStorage.setItem("resumeData", JSON.stringify(resumeData))
  //         toast({
  //           title: "Resume saved locally",
  //           description: "Your resume has been saved to your browser.",
  //         })
  //       }
  //     } else {
  //       // No resumeId, save to localStorage
  //       localStorage.setItem("resumeData", JSON.stringify(resumeData))
  //       toast({
  //         title: "Resume saved locally",
  //         description: "Your resume has been saved to your browser.",
  //       })
  //     }
  //     // Navigate to preview
  //     if (resumeId) {
  //       router.push(`/resume-preview?id=${resumeId}`)
  //     } else {
  //       router.push(`/resume-preview?template=${templateId}&category=${categoryId}`)
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "An error occurred while saving your resume.",
  //       variant: "destructive",
  //     })
  //   } finally {
  //     setIsSaving(false)
  //   }
  // }

  const handleSaveResume = async () => {
  setIsSaving(true)
  try {
    // Use resumeId if present, else try to get it from localStorage
    let effectiveResumeId = resumeId
    if (!effectiveResumeId) {
      const stored = localStorage.getItem("resumeData")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.resumeId) {
          effectiveResumeId = parsed.resumeId
        }
      }
    }

    if (effectiveResumeId) {
      // If we have a resumeId (either from state or localStorage), update via API
      try {
        const response = await fetch(`http://localhost:5000/api/resume/${effectiveResumeId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resumeData),
          credentials: "include",
        })
        if (response.ok) {
          localStorage.setItem("resumeData", JSON.stringify(resumeData))
  //       toast({
  //         title: "Resume saved locally",
  //         description: "Your resume has been saved to your browser.",
  //       })
          toast({
            title: "Resume updated",
            description: "Your resume has been updated successfully.",
          })
        } else {
          throw new Error("Failed to update resume via API")
        }
      } catch (error) {
        console.error("API update error:", error)
        // Fall back to localStorage
        localStorage.setItem("resumeData", JSON.stringify(resumeData))
        toast({
          title: "Resume saved locally",
          description: "Your resume has been saved to your browser.",
        })
      }
    } else {
      // No resumeId at all, save to localStorage
      localStorage.setItem("resumeData", JSON.stringify(resumeData))
      toast({
        title: "Resume saved locally",
        description: "Your resume has been saved to your browser.",
      })
    }

    // Navigate to preview
    if (effectiveResumeId) {
      router.push(`/resume-preview?id=${effectiveResumeId}`)
    } else {
      router.push(`/resume-preview?template=${templateId}&category=${categoryId}`)
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "An error occurred while saving your resume.",
      variant: "destructive",
    })
  } finally {
    setIsSaving(false)
  }
}


  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your resume...</p>
        </div>
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className="container mx-auto py-12 px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Resume Not Found</h1>
        <p className="mb-8">The resume you are looking for could not be found.</p>
        <Button onClick={() => router.push("/templates")}>Back to Templates</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Resume</h1>
        <Button onClick={handleSaveResume} disabled={isSaving} className="gap-2">
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
      <div className="space-y-8">
        {/* Personal Information */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={resumeData.personalInfo?.name || ""}
                  onChange={(e) => handleInputChange("personalInfo", "name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Professional Title</label>
                <Input
                  value={resumeData.personalInfo?.title || ""}
                  onChange={(e) => handleInputChange("personalInfo", "title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  value={resumeData.personalInfo?.email || ""}
                  onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={resumeData.personalInfo?.phone || ""}
                  onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={resumeData.personalInfo?.location || ""}
                  onChange={(e) => handleInputChange("personalInfo", "location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LinkedIn</label>
                <Input
                  value={resumeData.personalInfo?.linkedin || ""}
                  onChange={(e) => handleInputChange("personalInfo", "linkedin", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Summary */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
            <div className="space-y-2">
              <Textarea
                rows={4}
                value={resumeData.summary || ""}
                onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                placeholder="Write a brief summary of your professional background and key qualifications..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Work Experience */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
            {resumeData.experience &&
              resumeData.experience.map((exp: any, index: number) => (
                <div key={index} className="mb-6 pb-6 border-b last:border-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Experience {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeArrayItem("experience", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Job Title</label>
                      <Input
                        value={exp.title || ""}
                        onChange={(e) => handleArrayItemChange("experience", index, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company</label>
                      <Input
                        value={exp.company || ""}
                        onChange={(e) => handleArrayItemChange("experience", index, "company", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Dates</label>
                      <Input
                        value={exp.dates || ""}
                        onChange={(e) => handleArrayItemChange("experience", index, "dates", e.target.value)}
                        placeholder="e.g., Jan 2020 - Present"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        value={exp.location || ""}
                        onChange={(e) => handleArrayItemChange("experience", index, "location", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        rows={3}
                        value={exp.description || ""}
                        onChange={(e) => handleArrayItemChange("experience", index, "description", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              onClick={() =>
                addArrayItem("experience", {
                  title: "",
                  company: "",
                  dates: "",
                  location: "",
                  description: "",
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Work Experience
            </Button>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            {resumeData.education &&
              resumeData.education.map((edu: any, index: number) => (
                <div key={index} className="mb-6 pb-6 border-b last:border-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Education {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeArrayItem("education", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Degree</label>
                      <Input
                        value={edu.degree || ""}
                        onChange={(e) => handleArrayItemChange("education", index, "degree", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Institution</label>
                      <Input
                        value={edu.institution || ""}
                        onChange={(e) => handleArrayItemChange("education", index, "institution", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Dates</label>
                      <Input
                        value={edu.dates || ""}
                        onChange={(e) => handleArrayItemChange("education", index, "dates", e.target.value)}
                        placeholder="e.g., 2016 - 2020"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        value={edu.location || ""}
                        onChange={(e) => handleArrayItemChange("education", index, "location", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              onClick={() =>
                addArrayItem("education", {
                  degree: "",
                  institution: "",
                  dates: "",
                  location: "",
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            {resumeData.projects &&
              resumeData.projects.map((project: any, index: number) => (
                <div key={index} className="mb-6 pb-6 border-b last:border-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Project {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeArrayItem("projects", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Project Name</label>
                      <Input
                        value={project.name || ""}
                        onChange={(e) => handleArrayItemChange("projects", index, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Role</label>
                      <Input
                        value={project.role || ""}
                        onChange={(e) => handleArrayItemChange("projects", index, "role", e.target.value)}
                        placeholder="e.g., Lead Developer, Team Member"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Technologies Used</label>
                      <Input
                        value={project.technologies || ""}
                        onChange={(e) => handleArrayItemChange("projects", index, "technologies", e.target.value)}
                        placeholder="e.g., React, Node.js, MongoDB"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Dates</label>
                      <Input
                        value={project.dates || ""}
                        onChange={(e) => handleArrayItemChange("projects", index, "dates", e.target.value)}
                        placeholder="e.g., Jan 2023 - Mar 2023"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Project Link (Optional)</label>
                      <Input
                        value={project.link || ""}
                        onChange={(e) => handleArrayItemChange("projects", index, "link", e.target.value)}
                        placeholder="e.g., https://github.com/username/project or https://project-demo.com"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        rows={3}
                        value={project.description || ""}
                        onChange={(e) => handleArrayItemChange("projects", index, "description", e.target.value)}
                        placeholder="Describe what the project does, your contributions, and key achievements..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              onClick={() =>
                addArrayItem("projects", {
                  name: "",
                  description: "",
                  technologies: "",
                  dates: "",
                  link: "",
                  role: "",
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </CardContent>
        </Card>

        {/* Publications */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Publications & Research</h2>
            {resumeData.publications &&
              resumeData.publications.map((pub: any, index: number) => (
                <div key={index} className="mb-6 pb-6 border-b last:border-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Publication {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeArrayItem("publications", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Publication Title</label>
                      <Input
                        value={pub.title || ""}
                        onChange={(e) => handleArrayItemChange("publications", index, "title", e.target.value)}
                        placeholder="e.g., Deep Learning Applications in Healthcare"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Authors</label>
                      <Input
                        value={pub.authors || ""}
                        onChange={(e) => handleArrayItemChange("publications", index, "authors", e.target.value)}
                        placeholder="e.g., John Doe, Jane Smith, et al."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Journal/Conference</label>
                      <Input
                        value={pub.journal || ""}
                        onChange={(e) => handleArrayItemChange("publications", index, "journal", e.target.value)}
                        placeholder="e.g., IEEE Transactions on Medical Imaging"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Publication Year</label>
                      <Input
                        value={pub.year || ""}
                        onChange={(e) => handleArrayItemChange("publications", index, "year", e.target.value)}
                        placeholder="e.g., 2023"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Publication Links</label>
                      {pub.links &&
                        pub.links.map((link: any, linkIndex: number) => (
                          <div key={linkIndex} className="flex gap-2 items-end">
                            <div className="flex-1 grid grid-cols-3 gap-2">
                              <Input
                                placeholder="Link Type (e.g., DOI, PDF)"
                                value={link.type || ""}
                                onChange={(e) => handlePublicationLinkChange(index, linkIndex, "type", e.target.value)}
                              />
                              <Input
                                placeholder="URL"
                                value={link.url || ""}
                                onChange={(e) => handlePublicationLinkChange(index, linkIndex, "url", e.target.value)}
                              />
                              <Input
                                placeholder="Description (optional)"
                                value={link.description || ""}
                                onChange={(e) =>
                                  handlePublicationLinkChange(index, linkIndex, "description", e.target.value)
                                }
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removePublicationLink(index, linkIndex)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent"
                        onClick={() => addPublicationLink(index)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Link
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              onClick={() =>
                addArrayItem("publications", {
                  title: "",
                  authors: "",
                  journal: "",
                  year: "",
                  links: [],
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Publication
            </Button>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="space-y-4">
              {resumeData.skills &&
                resumeData.skills.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      placeholder="e.g., JavaScript, Project Management, etc."
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeSkill(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              <Button variant="outline" className="w-full bg-transparent" onClick={addSkill}>
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSaveResume} disabled={isSaving} size="lg" className="gap-2">
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
