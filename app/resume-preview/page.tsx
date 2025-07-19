
// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft, Download, Share2, Edit } from "lucide-react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { toast } from "@/components/ui/use-toast"
// import html2canvas from "html2canvas"
// import jsPDF from "jspdf"
// import { useRef } from "react"

// interface ResumeData {
//   personalInfo: {
//     name: string
//     title: string
//     email: string
//     phone: string
//     location: string
//     linkedin?: string
//   }
//   summary: string
//   experience: Array<{
//     title: string
//     company: string
//     dates: string
//     location: string
//     description: string
//   }>
//   education: Array<{
//     degree: string
//     institution: string
//     dates: string
//     location: string
//   }>
//   skills: string[]
// }

// export default function ResumePreview() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const [isLoading, setIsLoading] = useState(true)
//   const [resumeData, setResumeData] = useState<ResumeData | null>(null)
//   const resumeRef = useRef<HTMLDivElement>(null)

//   const templateId = searchParams.get("template") || ""
//   const categoryId = searchParams.get("category") || ""
//   const resumeId = searchParams.get("id") || ""

//   // Template categories mapping for display purposes
//   const categoryNames: Record<string, string> = {
//     "1": "Professional",
//     "2": "Creative",
//     "3": "Minimal",
//     "4": "Executive",
//   }

//   // Template names mapping
//   const templateNames: Record<string, string> = {
//     // Professional templates
//     p1: "Corporate",
//     p2: "Business",
//     p3: "Executive Pro",
//     p4: "Modern Professional",
//     p5: "Classic",
//     // Creative templates
//     c1: "Designer",
//     c2: "Artistic",
//     c3: "Digital Creative",
//     c4: "Portfolio Plus",
//     c5: "Innovation",
//     // Minimal templates
//     m1: "Clean",
//     m2: "Simplicity",
//     m3: "Essentials",
//     m4: "Minimalist Pro",
//     m5: "Whitespace",
//     // Executive templates
//     e1: "Leadership",
//     e2: "C-Suite",
//     e3: "Director",
//     e4: "Board Member",
//     e5: "Executive Elite",
//   }

//   useEffect(() => {
//     // Load resume data from localStorage or API
//     const loadResumeData = async () => {
//       try {
//         // First try to get data from localStorage (from audio processing)
//         const storedData = localStorage.getItem("resumeData")

//         if (storedData) {
//           console.log("Found stored data:", storedData)
//           // Parse the JSON string from localStorage
//           const parsedData = JSON.parse(storedData)

//           // If the data is wrapped in a "data" property (from your API response)
//           const resumeJson = parsedData.data ? parsedData.data : parsedData

//           // If the data contains a JSON string (from your backend)
//           if (typeof resumeJson === "string" && resumeJson.startsWith("json")) {
//             // Extract the JSON part from the string
//             const jsonStart = resumeJson.indexOf("{")
//             const jsonEnd = resumeJson.lastIndexOf("}") + 1
//             const jsonString = resumeJson.substring(jsonStart, jsonEnd)
//             setResumeData(JSON.parse(jsonString))
//           } else {
//             setResumeData(resumeJson)
//           }
//         } else if (resumeId) {
//           // If no localStorage data but we have a resumeId, fetch from API
//           const response = await fetch(`http://localhost:5000/api/resume/${resumeId}`, {
//             credentials: "include",
//           })

//           if (response.ok) {
//             const data = await response.json()
//             setResumeData(data)
//           } else {
//             toast({
//               title: "Error",
//               description: "Failed to load resume data. Please try again.",
//               variant: "destructive",
//             })
//             setResumeData(getFallbackResumeData())
//           }
//         } else {
//           console.error("No resume data found")
//           // Use fallback data if needed
//           setResumeData(getFallbackResumeData())
//         }
//       } catch (error) {
//         console.error("Error loading resume data:", error)
//         setResumeData(getFallbackResumeData())
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     // Simulate loading the resume
//     setTimeout(() => {
//       loadResumeData()
//     }, 1000)
//   }, [resumeId])

//   const getFallbackResumeData = (): ResumeData => {
//     return {
//       personalInfo: {
//         name: "John Doe",
//         title: "Software Engineer",
//         email: "john.doe@example.com",
//         phone: "(555) 123-4567",
//         location: "San Francisco, CA",
//       },
//       summary: "Experienced software engineer with a passion for building scalable web applications.",
//       experience: [
//         {
//           title: "Senior Software Engineer",
//           company: "Tech Innovations Inc.",
//           dates: "2021 - Present",
//           location: "",
//           description:
//             "Led development of company's flagship product. Managed team of 5 engineers. Implemented CI/CD pipeline reducing deployment time by 40%.",
//         },
//         {
//           title: "Software Engineer",
//           company: "Digital Solutions LLC",
//           dates: "2019 - 2021",
//           location: "",
//           description:
//             "Developed responsive web applications using React. Collaborated with design team to implement UI/UX improvements. Optimized database queries resulting in 30% performance improvement.",
//         },
//       ],
//       education: [
//         {
//           degree: "Computer Science, BS",
//           institution: "Stanford University",
//           dates: "2015 - 2019",
//           location: "",
//         },
//       ],
//       skills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL"],
//     }
//   }

//   const handleDownloadPDF = async () => {
//     const html2canvas = (await import("html2canvas")).default
//     const jsPDF = (await import("jspdf")).default
  
//     const input = document.getElementById("resume-area")
//     if (!input) return
  
//     const canvas = await html2canvas(input)
//     const imgData = canvas.toDataURL("image/png")
  
//     const pdf = new jsPDF("p", "mm", "a4")
//     const imgProps = pdf.getImageProperties(imgData)
//     const pdfWidth = pdf.internal.pageSize.getWidth()
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
  
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
//     pdf.save("resume.pdf")
//   }
  

//   const handleEdit = () => {
//     // If we have a resumeId from the API, use it for editing
//     if (resumeData && "id" in resumeData) {
//       router.push(`/edit-resume?id=${resumeData.id}`)
//     } else {
//       // Otherwise just pass the template and category
//       router.push(`/edit-resume?template=${templateId}&category=${categoryId}`)
//     }
//   }

//   const handleGoBack = () => {
//     router.push("/templates")
//   }

//   // Render the appropriate template based on the template ID
//   const renderTemplate = () => {
//     if (!resumeData) return null

//     // First character of template ID indicates the category
//     const templateType = templateId.charAt(0)
//     const templateNumber = templateId.substring(1)

//     switch (templateType) {
//       case "p":
//         return <ProfessionalTemplate variant={templateNumber} data={resumeData} />
//       case "c":
//         return <CreativeTemplate variant={templateNumber} data={resumeData} />
//       case "m":
//         return <MinimalTemplate variant={templateNumber} data={resumeData} />
//       case "e":
//         return <ExecutiveTemplate variant={templateNumber} data={resumeData} />
//       default:
//         return <ProfessionalTemplate variant="1" data={resumeData} />
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p>Generating your resume...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto py-8 px-6">
//       <Button variant="ghost" size="sm" className="mb-6" onClick={handleGoBack}>
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to templates
//       </Button>

//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold">
//           Your {categoryNames[categoryId]} - {templateNames[templateId]} Resume
//         </h1>
//         <p className="text-gray-600 mt-2">Generated from your audio input</p>
//       </div>

//       <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
//       <div id="resume-area" ref={resumeRef} className="max-w-4xl mx-auto bg-white rounded shadow-lg">
//   {renderTemplate()}
// </div>

//       </div>

//       <div className="text-center mt-8">
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Button onClick={handleDownloadPDF}>
//             <Download className="mr-2 h-4 w-4" />
//             Download PDF
//           </Button>
//           <Button variant="outline" onClick={handleEdit}>
//             <Edit className="mr-2 h-4 w-4" />
//             Edit Resume
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Professional template variations
// function ProfessionalTemplate({ variant = "1", data }: { variant: string; data: any }) {
//   switch (variant) {
//     case "2":
//       return <ProfessionalBusinessTemplate data={data} />
//     default:
//       return <ProfessionalCorporateTemplate data={data} />
//   }
// }

// function ProfessionalCorporateTemplate({ data }: { data: any }) {
//   return (
//     <div className="p-8">
//       <div className="border-b pb-4 mb-6">
//         <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
//         <p className="text-xl text-gray-600">{data.personalInfo.title}</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="md:col-span-1">
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2">Contact</h3>
//             {data.personalInfo.email && <p className="text-sm">{data.personalInfo.email}</p>}
//             {data.personalInfo.phone && <p className="text-sm">{data.personalInfo.phone}</p>}
//             {data.personalInfo.location && <p className="text-sm">{data.personalInfo.location}</p>}
//             {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
//           </div>

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2">Skills</h3>
//             <ul className="list-disc list-inside text-sm">
//               {data.skills.map((skill: string, index: number) => (
//                 <li key={index}>{skill}</li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-2">Education</h3>
//             {data.education.map((edu: any, index: number) => (
//               <div key={index} className="mb-3">
//                 <p className="font-medium">{edu.degree}</p>
//                 {edu.institution && <p className="text-sm">{edu.institution}</p>}
//                 {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
//                 {edu.location && <p className="text-sm">{edu.location}</p>}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           {data.summary && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-3">Summary</h3>
//               <p className="text-sm">{data.summary}</p>
//             </div>
//           )}

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-3">Experience</h3>

//             {data.experience.map((exp: any, index: number) => (
//               <div key={index} className="mb-4">
//                 <div className="flex justify-between">
//                   <p className="font-medium">{exp.title}</p>
//                   {exp.dates && <p className="text-sm text-gray-600">{exp.dates}</p>}
//                 </div>
//                 <p className="text-sm">{exp.company}</p>
//                 {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
//                 <p className="text-sm mt-2">{exp.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function ProfessionalBusinessTemplate({ data }: { data: any }) {
//   return (
//     <div className="p-8">
//       <div className="text-center border-b pb-6 mb-6">
//         <h2 className="text-4xl font-bold">{data.personalInfo.name}</h2>
//         <p className="text-xl text-gray-600 mt-2">{data.personalInfo.title}</p>

//         <div className="flex flex-wrap justify-center gap-4 mt-4">
//           {data.personalInfo.email && <p className="text-sm">{data.personalInfo.email}</p>}
//           {data.personalInfo.email && data.personalInfo.phone && <span className="text-gray-400">|</span>}
//           {data.personalInfo.phone && <p className="text-sm">{data.personalInfo.phone}</p>}
//           {data.personalInfo.phone && data.personalInfo.location && <span className="text-gray-400">|</span>}
//           {data.personalInfo.location && <p className="text-sm">{data.personalInfo.location}</p>}
//         </div>
//       </div>

//       {data.summary && (
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold border-b pb-2 mb-3">Summary</h3>
//           <p className="text-sm">{data.summary}</p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 gap-6">
//         <div>
//           <h3 className="text-lg font-semibold border-b pb-2 mb-3">Experience</h3>
//           {data.experience.map((exp: any, index: number) => (
//             <div key={index} className="mb-5">
//               <div className="flex justify-between items-center">
//                 <p className="font-bold text-lg">{exp.title}</p>
//                 {exp.dates && <p className="text-sm text-gray-600">{exp.dates}</p>}
//               </div>
//               <p className="text-md font-medium">{exp.company}</p>
//               {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
//               <p className="text-sm mt-2">{exp.description}</p>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="text-lg font-semibold border-b pb-2 mb-3">Education</h3>
//             {data.education.map((edu: any, index: number) => (
//               <div key={index} className="mb-3">
//                 <p className="font-medium">{edu.degree}</p>
//                 {edu.institution && <p className="text-sm">{edu.institution}</p>}
//                 {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
//                 {edu.location && <p className="text-sm">{edu.location}</p>}
//               </div>
//             ))}
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold border-b pb-2 mb-3">Skills</h3>
//             <div className="flex flex-wrap gap-2">
//               {data.skills.map((skill: string, index: number) => (
//                 <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Creative template variations
// function CreativeTemplate({ variant = "1", data }: { variant: string; data: any }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3">
//       <div className="bg-rose-100 p-8 md:col-span-1">
//         <div className="mb-8">
//           <div className="w-32 h-32 bg-rose-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-rose-500">
//             {data.personalInfo.name
//               .split(" ")
//               .map((name: string) => name[0])
//               .join("")}
//           </div>
//           <h2 className="text-2xl font-bold text-center">{data.personalInfo.name}</h2>
//           <p className="text-md text-center text-rose-700 mt-1">{data.personalInfo.title}</p>
//         </div>

//         <div className="mb-6">
//           <h3 className="text-lg font-bold text-rose-800 mb-3 border-b border-rose-200 pb-1">Contact</h3>
//           <div className="space-y-2">
//             {data.personalInfo.email && <p className="text-sm">{data.personalInfo.email}</p>}
//             {data.personalInfo.phone && <p className="text-sm">{data.personalInfo.phone}</p>}
//             {data.personalInfo.location && <p className="text-sm">{data.personalInfo.location}</p>}
//             {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
//           </div>
//         </div>

//         <div className="mb-6">
//           <h3 className="text-lg font-bold text-rose-800 mb-3 border-b border-rose-200 pb-1">Skills</h3>
//           <div className="space-y-2">
//             {data.skills.map((skill: string, index: number) => (
//               <div key={index} className="bg-white rounded-full px-3 py-1 text-sm">
//                 {skill}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h3 className="text-lg font-bold text-rose-800 mb-3 border-b border-rose-200 pb-1">Education</h3>
//           {data.education.map((edu: any, index: number) => (
//             <div key={index} className="mb-3">
//               <p className="font-medium">{edu.degree}</p>
//               {edu.institution && <p className="text-sm">{edu.institution}</p>}
//               {edu.dates && <p className="text-sm text-rose-700">{edu.dates}</p>}
//               {edu.location && <p className="text-sm">{edu.location}</p>}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="p-8 md:col-span-2">
//         {data.summary && (
//           <div className="mb-6">
//             <h3 className="text-2xl font-bold text-rose-800 mb-4 border-b border-rose-200 pb-2">Summary</h3>
//             <p className="text-sm">{data.summary}</p>
//           </div>
//         )}

//         <div className="mb-6">
//           <h3 className="text-2xl font-bold text-rose-800 mb-4 border-b border-rose-200 pb-2">Experience</h3>
//           {data.experience.map((exp: any, index: number) => (
//             <div key={index} className="mb-6">
//               <div className="flex justify-between items-baseline">
//                 <p className="font-bold text-lg">{exp.title}</p>
//                 {exp.dates && <p className="text-sm text-rose-700">{exp.dates}</p>}
//               </div>
//               <p className="text-md italic mb-2">{exp.company}</p>
//               {exp.location && <p className="text-sm text-rose-500">{exp.location}</p>}
//               <p className="text-sm mt-2">{exp.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// // Minimal template variations
// function MinimalTemplate({ variant = "1", data }: { variant: string; data: any }) {
//   return (
//     <div className="p-8 font-light">
//       <div className="mb-8">
//         <h2 className="text-3xl font-normal tracking-wide">{data.personalInfo.name}</h2>
//         <p className="text-lg text-gray-500 mt-1">{data.personalInfo.title}</p>

//         <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
//           {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
//           {data.personalInfo.email && data.personalInfo.phone && <span>•</span>}
//           {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
//           {data.personalInfo.phone && data.personalInfo.location && <span>•</span>}
//           {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
//         </div>
//       </div>

//       {data.summary && (
//         <div className="mb-6">
//           <h3 className="text-md uppercase tracking-wider text-gray-500 mb-3">Summary</h3>
//           <p className="text-sm">{data.summary}</p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 gap-6">
//         <div>
//           <h3 className="text-md uppercase tracking-wider text-gray-500 mb-3">Experience</h3>
//           {data.experience.map((exp: any, index: number) => (
//             <div key={index} className="mb-5">
//               <div className="flex justify-between items-baseline">
//                 <p className="font-medium">{exp.title}</p>
//                 {exp.dates && <p className="text-sm text-gray-500">{exp.dates}</p>}
//               </div>
//               <p className="text-sm">{exp.company}</p>
//               {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
//               <p className="text-sm mt-2">{exp.description}</p>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="text-md uppercase tracking-wider text-gray-500 mb-3">Education</h3>
//             {data.education.map((edu: any, index: number) => (
//               <div key={index} className="mb-3">
//                 <p className="font-medium">{edu.degree}</p>
//                 {edu.institution && <p className="text-sm">{edu.institution}</p>}
//                 {edu.dates && <p className="text-sm text-gray-500">{edu.dates}</p>}
//                 {edu.location && <p className="text-sm">{edu.location}</p>}
//               </div>
//             ))}
//           </div>

//           <div>
//             <h3 className="text-md uppercase tracking-wider text-gray-500 mb-3">Skills</h3>
//             <div className="flex flex-wrap gap-2">
//               {data.skills.map((skill: string, index: number) => (
//                 <span key={index} className="text-sm">
//                   {skill}
//                   {index < data.skills.length - 1 && <span className="ml-1 mr-1">•</span>}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Executive template variations
// function ExecutiveTemplate({ variant = "1", data }: { variant: string; data: any }) {
//   return (
//     <div className="p-8 bg-slate-50">
//       <div className="border-b-4 border-slate-800 pb-6 mb-6">
//         <h2 className="text-4xl font-bold text-slate-800">{data.personalInfo.name}</h2>
//         <p className="text-xl text-slate-600 mt-2">{data.personalInfo.title}</p>

//         <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-700">
//           {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
//           {data.personalInfo.email && data.personalInfo.phone && <span>|</span>}
//           {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
//           {data.personalInfo.phone && data.personalInfo.location && <span>|</span>}
//           {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
//         </div>
//       </div>

//       {data.summary && (
//         <div className="mb-6">
//           <h3 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-wider">Summary</h3>
//           <p className="text-sm">{data.summary}</p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 gap-8">
//         <div>
//           <h3 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-wider">Professional Experience</h3>
//           {data.experience.map((exp: any, index: number) => (
//             <div key={index} className="mb-6">
//               <div className="flex justify-between items-baseline border-b border-slate-300 pb-1 mb-2">
//                 <p className="font-bold text-lg">{exp.title}</p>
//                 {exp.dates && <p className="text-sm text-slate-600">{exp.dates}</p>}
//               </div>
//               <p className="text-md font-medium mb-2">{exp.company}</p>
//               {exp.location && <p className="text-sm text-slate-500">{exp.location}</p>}
//               <p className="text-sm mt-2">{exp.description}</p>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div>
//             <h3 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-wider">Education</h3>
//             {data.education.map((edu: any, index: number) => (
//               <div key={index} className="mb-4">
//                 <p className="font-bold">{edu.degree}</p>
//                 {edu.institution && <p className="text-sm">{edu.institution}</p>}
//                 {edu.dates && <p className="text-sm text-slate-600">{edu.dates}</p>}
//                 {edu.location && <p className="text-sm">{edu.location}</p>}
//               </div>
//             ))}
//           </div>

//           <div>
//             <h3 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-wider">Skills & Expertise</h3>
//             <div className="grid grid-cols-2 gap-2">
//               {data.skills.map((skill: string, index: number) => (
//                 <div key={index} className="bg-white border border-slate-200 px-3 py-2 rounded text-sm">
//                   {skill}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }







"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Edit } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useRef } from "react"
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
  skills: string[]
}

export default function ResumePreview() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
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
    // If we have a resumeId from the API, use it for editing
    if (resumeData && "id" in resumeData) {
      router.push(`/edit-resume?id=${resumeData.id}`)
    } else {
      // Otherwise just pass the template and category
      router.push(`/edit-resume?template=${templateId}&category=${categoryId}`)
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
    </div>
  )
}
