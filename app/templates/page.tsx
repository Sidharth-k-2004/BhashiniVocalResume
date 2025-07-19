// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useRouter } from "next/navigation"

// export default function TemplatesPage() {
//   const router = useRouter()
//   const [selectedCategory, setSelectedCategory] = useState("1")

//   // Template categories
//   const categories = [
//     { id: "1", name: "Professional" },
//     { id: "2", name: "Creative" },
//     { id: "3", name: "Minimal" },
//     { id: "4", name: "Executive" },
//   ]

//   // Templates for each category
//   const templates = {
//     "1": [
//       { id: "p1", name: "Corporate" },
//       { id: "p2", name: "Business" },
//       { id: "p3", name: "Executive Pro" },
//       { id: "p4", name: "Modern Professional" },
//       { id: "p5", name: "Classic" },
//     ],
//     "2": [
//       { id: "c1", name: "Designer" },
//       { id: "c2", name: "Artistic" },
//       { id: "c3", name: "Digital Creative" },
//       { id: "c4", name: "Portfolio Plus" },
//       { id: "c5", name: "Innovation" },
//     ],
//     "3": [
//       { id: "m1", name: "Clean" },
//       { id: "m2", name: "Simplicity" },
//       { id: "m3", name: "Essentials" },
//       { id: "m4", name: "Minimalist Pro" },
//       { id: "m5", name: "Whitespace" },
//     ],
//     "4": [
//       { id: "e1", name: "Leadership" },
//       { id: "e2", name: "C-Suite" },
//       { id: "e3", name: "Director" },
//       { id: "e4", name: "Board Member" },
//       { id: "e5", name: "Executive Elite" },
//     ],
//   }

//   const handlePreview = (categoryId: string, templateId: string) => {
//     router.push(`/preview-template/${categoryId}/${templateId}`)
//   }

//   return (
//     <div className="container mx-auto py-8 px-6">
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-bold mb-4">Choose Your Resume Template</h1>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Select a template that best represents your professional style. After selecting, you'll be able to provide
//           your resume details through audio input.
//         </p>
//       </div>

//       <Tabs defaultValue="1" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
//         <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
//           {categories.map((category) => (
//             <TabsTrigger key={category.id} value={category.id} className="w-full">
//               {category.name}
//             </TabsTrigger>
//           ))}
//         </TabsList>

//         {categories.map((category) => (
//           <TabsContent key={category.id} value={category.id}>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {templates[category.id as keyof typeof templates].map((template) => (
//                 <Card key={template.id} className="overflow-hidden">
//                   <CardContent className="p-0">
//                     <div className="relative h-64 bg-gray-100">
//                       {/* Template thumbnail/preview image */}
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="w-full h-full p-4">
//                           <div className="w-full h-full border border-gray-200 bg-white rounded flex items-center justify-center">
//                             <div className="text-center p-4">
//                               <div className="font-bold">{template.name}</div>
//                               <div className="text-xs text-gray-500 mt-1">Template Preview</div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-4">
//                       <div className="flex items-center justify-between">
//                         <h3 className="font-medium">{template.name}</h3>
//                         <Button size="sm" onClick={() => handlePreview(category.id, template.id)}>
//                           Preview
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//         ))}
//       </Tabs>
//     </div>
//   )
// }







"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

export default function TemplatesPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("1")

  // Template categories
  const categories = [
    { id: "1", name: "Professional" },
    { id: "2", name: "Creative" },
    { id: "3", name: "Minimal" },
    { id: "4", name: "Executive" },
  ]

  // Templates for each category with descriptions
  const templates = {
    "1": [
      { id: "p1", name: "Corporate", description: "Traditional two-column layout with sidebar" },
      { id: "p2", name: "Business", description: "Clean centered design with section dividers" },
      { id: "p3", name: "Executive Pro", description: "Header-focused layout with timeline" },
      { id: "p4", name: "Modern Professional", description: "Card-based sections with accent colors" },
      { id: "p5", name: "Classic", description: "Single column with elegant typography" },
    ],
    "2": [
      { id: "c1", name: "Designer", description: "Colorful sidebar with circular profile" },
      { id: "c2", name: "Artistic", description: "Asymmetric layout with creative elements" },
      { id: "c3", name: "Digital Creative", description: "Modern grid with gradient accents" },
      { id: "c4", name: "Portfolio Plus", description: "Image-focused with portfolio sections" },
      { id: "c5", name: "Innovation", description: "Geometric shapes with bold typography" },
    ],
    "3": [
      { id: "m1", name: "Clean", description: "Ultra-minimal with subtle dividers" },
      { id: "m2", name: "Simplicity", description: "Typography-focused single column" },
      { id: "m3", name: "Essentials", description: "Compact layout with essential info only" },
      { id: "m4", name: "Minimalist Pro", description: "Spacious design with selective emphasis" },
      { id: "m5", name: "Whitespace", description: "Maximum whitespace with minimal text" },
    ],
    "4": [
      { id: "e1", name: "Leadership", description: "Bold header with executive summary focus" },
      { id: "e2", name: "C-Suite", description: "Formal layout with achievement highlights" },
      { id: "e3", name: "Director", description: "Professional columns with metrics emphasis" },
      { id: "e4", name: "Board Member", description: "Distinguished design with board experience" },
      { id: "e5", name: "Executive Elite", description: "Premium layout with luxury styling" },
    ],
  }

  const handlePreview = (categoryId: string, templateId: string) => {
    router.push(`/preview-template/${categoryId}/${templateId}`)
  }

  // Generate preview thumbnails for each template
  const renderTemplateThumbnail = (categoryId: string, templateId: string) => {
    const templateType = templateId.charAt(0)
    const templateNumber = templateId.substring(1)

    switch (templateType) {
      case "p":
        return <ProfessionalThumbnail variant={templateNumber} />
      case "c":
        return <CreativeThumbnail variant={templateNumber} />
      case "m":
        return <MinimalThumbnail variant={templateNumber} />
      case "e":
        return <ExecutiveThumbnail variant={templateNumber} />
      default:
        return <ProfessionalThumbnail variant="1" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Choose Your Resume Template</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a template that best represents your professional style. Each template offers a unique design approach
          within its category.
        </p>
      </div>

      <Tabs defaultValue="1" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="w-full">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates[category.id as keyof typeof templates].map((template) => (
                <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative h-64 bg-gray-50">{renderTemplateThumbnail(category.id, template.id)}</div>
                    <div className="p-4">
                      <div className="mb-2">
                        <h3 className="font-semibold text-lg">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                      <Button size="sm" className="w-full" onClick={() => handlePreview(category.id, template.id)}>
                        Preview & Select
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

// Thumbnail components for each template type
function ProfessionalThumbnail({ variant }: { variant: string }) {
  const thumbnails = {
    "1": ( // Corporate - Two column with sidebar
      <div className="w-full h-full p-2 bg-white">
        <div className="flex h-full gap-1">
          <div className="w-1/3 bg-blue-50 p-2">
            <div className="w-full h-3 bg-blue-200 mb-2"></div>
            <div className="space-y-1">
              <div className="w-full h-1 bg-gray-300"></div>
              <div className="w-3/4 h-1 bg-gray-300"></div>
              <div className="w-full h-1 bg-gray-300"></div>
            </div>
          </div>
          <div className="flex-1 p-2">
            <div className="w-3/4 h-4 bg-gray-800 mb-2"></div>
            <div className="w-1/2 h-2 bg-gray-400 mb-3"></div>
            <div className="space-y-1">
              <div className="w-full h-1 bg-gray-300"></div>
              <div className="w-full h-1 bg-gray-300"></div>
              <div className="w-2/3 h-1 bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    ),
    "2": ( // Business - Centered with dividers
      <div className="w-full h-full p-3 bg-white">
        <div className="text-center mb-3">
          <div className="w-2/3 h-4 bg-gray-800 mx-auto mb-1"></div>
          <div className="w-1/2 h-2 bg-gray-400 mx-auto"></div>
          <div className="w-full h-px bg-gray-300 mt-2"></div>
        </div>
        <div className="space-y-2">
          <div className="w-1/3 h-2 bg-gray-600"></div>
          <div className="space-y-1">
            <div className="w-full h-1 bg-gray-300"></div>
            <div className="w-5/6 h-1 bg-gray-300"></div>
          </div>
        </div>
      </div>
    ),
    "3": ( // Executive Pro - Header with timeline
      <div className="w-full h-full bg-white">
        <div className="bg-gray-800 p-2 text-white">
          <div className="w-2/3 h-3 bg-white mb-1"></div>
          <div className="w-1/2 h-2 bg-gray-300"></div>
        </div>
        <div className="p-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-1/2 h-2 bg-gray-600"></div>
          </div>
          <div className="ml-3 space-y-1">
            <div className="w-full h-1 bg-gray-300"></div>
            <div className="w-3/4 h-1 bg-gray-300"></div>
          </div>
        </div>
      </div>
    ),
    "4": ( // Modern Professional - Cards
      <div className="w-full h-full p-2 bg-gray-50">
        <div className="bg-white p-2 rounded mb-2">
          <div className="w-2/3 h-3 bg-gray-800 mb-1"></div>
          <div className="w-1/2 h-2 bg-blue-500"></div>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="bg-white p-1 rounded">
            <div className="w-full h-1 bg-gray-400 mb-1"></div>
            <div className="w-3/4 h-1 bg-gray-300"></div>
          </div>
          <div className="bg-white p-1 rounded">
            <div className="w-full h-1 bg-gray-400 mb-1"></div>
            <div className="w-2/3 h-1 bg-gray-300"></div>
          </div>
        </div>
      </div>
    ),
    "5": ( // Classic - Single column elegant
      <div className="w-full h-full p-3 bg-white">
        <div className="text-center mb-4">
          <div className="w-3/4 h-4 bg-gray-800 mx-auto mb-2"></div>
          <div className="w-1/2 h-2 bg-gray-500 mx-auto"></div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="w-1/3 h-2 bg-gray-700 mb-1"></div>
            <div className="space-y-1">
              <div className="w-full h-1 bg-gray-300"></div>
              <div className="w-4/5 h-1 bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    ),
  }

  return thumbnails[variant as keyof typeof thumbnails] || thumbnails["1"]
}

function CreativeThumbnail({ variant }: { variant: string }) {
  const thumbnails = {
    "1": ( // Designer - Colorful sidebar
      <div className="w-full h-full flex bg-white">
        <div className="w-1/3 bg-gradient-to-b from-purple-400 to-pink-400 p-2">
          <div className="w-8 h-8 bg-white rounded-full mx-auto mb-2"></div>
          <div className="text-center">
            <div className="w-full h-2 bg-white/80 mb-1"></div>
            <div className="w-3/4 h-1 bg-white/60 mx-auto"></div>
          </div>
        </div>
        <div className="flex-1 p-2">
          <div className="w-3/4 h-3 bg-gray-800 mb-2"></div>
          <div className="space-y-1">
            <div className="w-full h-1 bg-gray-300"></div>
            <div className="w-5/6 h-1 bg-gray-300"></div>
          </div>
        </div>
      </div>
    ),
    "2": ( // Artistic - Asymmetric
      <div className="w-full h-full bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-gradient-to-bl from-orange-300 to-red-300"></div>
        <div className="p-2 relative z-10">
          <div className="w-2/3 h-4 bg-gray-800 mb-2"></div>
          <div className="w-1/2 h-2 bg-orange-500 mb-3"></div>
          <div className="space-y-1">
            <div className="w-full h-1 bg-gray-300"></div>
            <div className="w-3/4 h-1 bg-gray-300"></div>
          </div>
        </div>
      </div>
    ),
    "3": ( // Digital Creative - Grid with gradients
      <div className="w-full h-full p-2 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="grid grid-cols-3 gap-1 mb-2">
          <div className="col-span-2 bg-white p-1 rounded">
            <div className="w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
          <div className="bg-white p-1 rounded">
            <div className="w-full h-2 bg-gray-300"></div>
          </div>
        </div>
        <div className="bg-white p-2 rounded">
          <div className="space-y-1">
            <div className="w-full h-1 bg-gray-300"></div>
            <div className="w-4/5 h-1 bg-gray-300"></div>
          </div>
        </div>
      </div>
    ),
    "4": ( // Portfolio Plus - Image focused
      <div className="w-full h-full bg-white p-2">
        <div className="flex gap-2 mb-2">
          <div className="w-1/3 h-12 bg-gradient-to-br from-green-300 to-blue-300 rounded"></div>
          <div className="flex-1">
            <div className="w-full h-3 bg-gray-800 mb-1"></div>
            <div className="w-2/3 h-2 bg-green-500"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    ),
    "5": ( // Innovation - Geometric
      <div className="w-full h-full bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-4 h-4 bg-yellow-400 transform rotate-45 -translate-x-2 -translate-y-2"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full translate-x-3 translate-y-3"></div>
        <div className="p-3">
          <div className="w-3/4 h-4 bg-gray-800 mb-2"></div>
          <div className="w-1/2 h-2 bg-yellow-500 mb-3"></div>
          <div className="space-y-1">
            <div className="w-full h-1 bg-gray-300"></div>
            <div className="w-2/3 h-1 bg-gray-300"></div>
          </div>
        </div>
      </div>
    ),
  }

  return thumbnails[variant as keyof typeof thumbnails] || thumbnails["1"]
}

function MinimalThumbnail({ variant }: { variant: string }) {
  const thumbnails = {
    "1": ( // Clean - Subtle dividers
      <div className="w-full h-full p-4 bg-white">
        <div className="mb-4">
          <div className="w-2/3 h-3 bg-gray-800 mb-1"></div>
          <div className="w-1/2 h-2 bg-gray-400"></div>
        </div>
        <div className="space-y-3">
          <div className="border-b border-gray-200 pb-2">
            <div className="w-1/4 h-1 bg-gray-500 mb-2"></div>
            <div className="w-full h-1 bg-gray-300"></div>
          </div>
        </div>
      </div>
    ),
    "2": ( // Simplicity - Typography focused
      <div className="w-full h-full p-4 bg-white">
        <div className="text-center mb-6">
          <div className="w-3/4 h-4 bg-gray-900 mx-auto mb-2"></div>
          <div className="w-1/2 h-1 bg-gray-400 mx-auto"></div>
        </div>
        <div className="space-y-2">
          <div className="w-1/3 h-1 bg-gray-600"></div>
          <div className="w-full h-1 bg-gray-300"></div>
          <div className="w-5/6 h-1 bg-gray-300"></div>
        </div>
      </div>
    ),
    "3": ( // Essentials - Compact
      <div className="w-full h-full p-2 bg-white">
        <div className="mb-2">
          <div className="w-2/3 h-3 bg-gray-800 mb-1"></div>
          <div className="flex gap-2 text-xs">
            <div className="w-1/4 h-1 bg-gray-400"></div>
            <div className="w-1/4 h-1 bg-gray-400"></div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="w-1/4 h-1 bg-gray-600"></div>
          <div className="w-full h-1 bg-gray-300"></div>
          <div className="w-3/4 h-1 bg-gray-300"></div>
        </div>
      </div>
    ),
    "4": ( // Minimalist Pro - Spacious
      <div className="w-full h-full p-6 bg-white">
        <div className="mb-6">
          <div className="w-1/2 h-3 bg-gray-800 mb-2"></div>
          <div className="w-1/3 h-1 bg-gray-400"></div>
        </div>
        <div className="space-y-4">
          <div className="w-1/5 h-1 bg-gray-500"></div>
          <div className="w-4/5 h-1 bg-gray-300"></div>
        </div>
      </div>
    ),
    "5": ( // Whitespace - Maximum space
      <div className="w-full h-full p-8 bg-white">
        <div className="text-center mb-8">
          <div className="w-1/2 h-2 bg-gray-800 mx-auto"></div>
        </div>
        <div className="space-y-6">
          <div className="w-1/6 h-1 bg-gray-400"></div>
          <div className="w-3/4 h-1 bg-gray-300"></div>
        </div>
      </div>
    ),
  }

  return thumbnails[variant as keyof typeof thumbnails] || thumbnails["1"]
}

function ExecutiveThumbnail({ variant }: { variant: string }) {
  const thumbnails = {
    "1": ( // Leadership - Bold header
      <div className="w-full h-full bg-white">
        <div className="bg-gray-900 p-2 mb-2">
          <div className="w-3/4 h-3 bg-white mb-1"></div>
          <div className="w-1/2 h-2 bg-gray-300"></div>
        </div>
        <div className="p-2">
          <div className="w-1/3 h-2 bg-gray-700 mb-2"></div>
          <div className="space-y-1">
            <div className="w-full h-1 bg-gray-300"></div>
            <div className="w-4/5 h-1 bg-gray-300"></div>
          </div>
        </div>
      </div>
    ),
    "2": ( // C-Suite - Formal with highlights
      <div className="w-full h-full p-2 bg-gray-50">
        <div className="bg-white p-2 border-l-4 border-blue-600 mb-2">
          <div className="w-2/3 h-3 bg-gray-800 mb-1"></div>
          <div className="w-1/2 h-2 bg-blue-600"></div>
        </div>
        <div className="bg-white p-2">
          <div className="flex justify-between mb-1">
            <div className="w-1/3 h-1 bg-gray-600"></div>
            <div className="w-1/4 h-1 bg-gray-400"></div>
          </div>
          <div className="w-full h-1 bg-gray-300"></div>
        </div>
      </div>
    ),
    "3": ( // Director - Professional columns
      <div className="w-full h-full p-2 bg-white">
        <div className="border-b-2 border-gray-800 pb-2 mb-2">
          <div className="w-3/4 h-3 bg-gray-800 mb-1"></div>
          <div className="w-1/2 h-2 bg-gray-600"></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="w-full h-1 bg-gray-600 mb-1"></div>
            <div className="w-3/4 h-1 bg-gray-300"></div>
          </div>
          <div>
            <div className="w-full h-1 bg-gray-600 mb-1"></div>
            <div className="w-2/3 h-1 bg-gray-300"></div>
          </div>
        </div>
      </div>
    ),
    "4": ( // Board Member - Distinguished
      <div className="w-full h-full bg-white border-2 border-gray-300">
        <div className="bg-gray-100 p-2 border-b">
          <div className="w-2/3 h-3 bg-gray-800 mb-1"></div>
          <div className="w-1/2 h-2 bg-gray-600"></div>
        </div>
        <div className="p-2">
          <div className="w-1/3 h-2 bg-gray-700 mb-2"></div>
          <div className="space-y-1">
            <div className="w-full h-1 bg-gray-300"></div>
            <div className="w-5/6 h-1 bg-gray-300"></div>
          </div>
        </div>
      </div>
    ),
    "5": ( // Executive Elite - Premium
      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 text-white p-2">
        <div className="mb-3">
          <div className="w-3/4 h-3 bg-white mb-1"></div>
          <div className="w-1/2 h-2 bg-yellow-400"></div>
        </div>
        <div className="space-y-2">
          <div className="w-1/3 h-1 bg-gray-300"></div>
          <div className="w-full h-1 bg-gray-400"></div>
          <div className="w-4/5 h-1 bg-gray-400"></div>
        </div>
      </div>
    ),
  }

  return thumbnails[variant as keyof typeof thumbnails] || thumbnails["1"]
}
