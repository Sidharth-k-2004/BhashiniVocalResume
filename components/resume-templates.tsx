"use client"

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

// Professional template variations (5 unique designs)
export function ProfessionalTemplate({ variant = "1", data }: { variant: string; data: ResumeData }) {
  switch (variant) {
    case "1":
      return <ProfessionalCorporateTemplate data={data} />
    case "2":
      return <ProfessionalBusinessTemplate data={data} />
    case "3":
      return <ProfessionalExecutiveProTemplate data={data} />
    case "4":
      return <ProfessionalModernTemplate data={data} />
    case "5":
      return <ProfessionalClassicTemplate data={data} />
    default:
      return <ProfessionalCorporateTemplate data={data} />
  }
}

// P1: Corporate - Traditional two-column with sidebar
function ProfessionalCorporateTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-600">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-blue-50 p-6 rounded-lg">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Contact</h3>
            {data.personalInfo.email && <p className="text-sm mb-1">{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p className="text-sm mb-1">{data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p className="text-sm mb-1">{data.personalInfo.location}</p>}
            {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Skills</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {data.skills.map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Education</h3>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-3">
                <p className="font-medium">{edu.degree}</p>
                {edu.institution && <p className="text-sm">{edu.institution}</p>}
                {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
                {edu.location && <p className="text-sm">{edu.location}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          {data.summary && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Summary</h3>
              <p className="text-sm">{data.summary}</p>
            </div>
          )}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Experience</h3>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <p className="font-medium">{exp.title}</p>
                  {exp.dates && <p className="text-sm text-gray-600">{exp.dates}</p>}
                </div>
                <p className="text-sm font-medium text-blue-600">{exp.company}</p>
                {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// P2: Business - Clean centered design with section dividers
function ProfessionalBusinessTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8">
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
        <h2 className="text-4xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-600 mt-2">{data.personalInfo.title}</p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {data.personalInfo.email && <p className="text-sm">{data.personalInfo.email}</p>}
          {data.personalInfo.email && data.personalInfo.phone && <span className="text-gray-400">|</span>}
          {data.personalInfo.phone && <p className="text-sm">{data.personalInfo.phone}</p>}
          {data.personalInfo.phone && data.personalInfo.location && <span className="text-gray-400">|</span>}
          {data.personalInfo.location && <p className="text-sm">{data.personalInfo.location}</p>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Summary</h3>
          <p className="text-sm text-center">{data.summary}</p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Experience</h3>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-5 text-center">
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">{exp.title}</p>
              {exp.dates && <p className="text-sm text-gray-600">{exp.dates}</p>}
            </div>
            <p className="text-md font-medium">{exp.company}</p>
            {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
            <p className="text-sm mt-2">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3 text-center">
              <p className="font-medium">{edu.degree}</p>
              {edu.institution && <p className="text-sm">{edu.institution}</p>}
              {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
              {edu.location && <p className="text-sm">{edu.location}</p>}
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {data.skills.map((skill: string, index: number) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// P3: Executive Pro - Header-focused layout with timeline
function ProfessionalExecutiveProTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white">
      <div className="bg-gray-800 text-white p-8">
        <h2 className="text-4xl font-bold mb-2">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-300 mb-4">{data.personalInfo.title}</p>
        <div className="flex flex-wrap gap-6 text-sm">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      <div className="p-8">
        {data.summary && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Professional Summary</h3>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-gray-800">Experience</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500"></div>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="relative pl-12 pb-8">
                <div className="absolute left-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow"></div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-lg">{exp.title}</p>
                    {exp.dates && (
                      <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded">{exp.dates}</span>
                    )}
                  </div>
                  <p className="text-md font-medium text-blue-600 mb-1">{exp.company}</p>
                  {exp.location && <p className="text-sm text-gray-500 mb-2">{exp.location}</p>}
                  <p className="text-sm">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Education</h3>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
                <p className="font-bold">{edu.degree}</p>
                {edu.institution && <p className="text-sm font-medium">{edu.institution}</p>}
                {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
                {edu.location && <p className="text-sm">{edu.location}</p>}
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Skills</h3>
            <div className="grid grid-cols-1 gap-2">
              {data.skills.map((skill: string, index: number) => (
                <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// P4: Modern Professional - Card-based sections with accent colors
function ProfessionalModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{data.personalInfo.name}</h2>
        <p className="text-xl text-blue-600 mt-1">{data.personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
          {data.personalInfo.email && <p className="flex items-center gap-1">{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p className="flex items-center gap-1">{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p className="flex items-center gap-1">{data.personalInfo.location}</p>}
        </div>
      </div>

      {data.summary && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-500 rounded"></div>
            Summary
          </h3>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-1 h-6 bg-green-500 rounded"></div>
          Experience
        </h3>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="border-l-2 border-green-100 pl-4 mb-6 last:mb-0">
            <div className="flex justify-between items-start mb-2">
              <p className="font-bold text-lg">{exp.title}</p>
              {exp.dates && <span className="text-sm text-white bg-green-500 px-3 py-1 rounded-full">{exp.dates}</span>}
            </div>
            <p className="text-md font-medium text-green-600 mb-1">{exp.company}</p>
            {exp.location && <p className="text-sm text-gray-500 mb-2">{exp.location}</p>}
            <p className="text-sm">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-purple-500 rounded"></div>
            Education
          </h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="border border-purple-100 rounded-lg p-3 mb-3 last:mb-0">
              <p className="font-bold">{edu.degree}</p>
              {edu.institution && <p className="text-sm font-medium text-purple-600">{edu.institution}</p>}
              {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
              {edu.location && <p className="text-sm">{edu.location}</p>}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-orange-500 rounded"></div>
            Skills
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {data.skills.map((skill: string, index: number) => (
              <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                <span className="font-medium text-orange-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// P5: Classic - Single column with elegant typography
function ProfessionalClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8 border-b-2 border-gray-800 pb-6">
        <h2 className="text-4xl font-serif font-bold text-gray-800 mb-2">{data.personalInfo.name}</h2>
        <p className="text-xl font-serif text-gray-600 mb-4">{data.personalInfo.title}</p>
        <div className="flex justify-center gap-6 text-sm">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-8">
          <h3 className="text-xl font-serif font-bold text-gray-800 mb-4 text-center">Professional Summary</h3>
          <p className="text-sm leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-serif font-bold text-gray-800 mb-6 text-center">Professional Experience</h3>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-6 pb-4 border-b border-gray-200 last:border-b-0">
            <div className="text-center mb-3">
              <p className="font-bold text-lg">{exp.title}</p>
              <p className="text-md font-serif italic">{exp.company}</p>
              <div className="flex justify-center gap-4 text-sm text-gray-600 mt-1">
                {exp.dates && <p>{exp.dates}</p>}
                {exp.location && <p>{exp.location}</p>}
              </div>
            </div>
            <p className="text-sm text-justify">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-serif font-bold text-gray-800 mb-4 text-center">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="text-center mb-4">
              <p className="font-bold">{edu.degree}</p>
              {edu.institution && <p className="text-sm font-serif italic">{edu.institution}</p>}
              {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
              {edu.location && <p className="text-sm">{edu.location}</p>}
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-serif font-bold text-gray-800 mb-4 text-center">Skills</h3>
          <div className="text-center">
            {data.skills.map((skill: string, index: number) => (
              <span key={index} className="inline-block">
                {skill}
                {index < data.skills.length - 1 && <span className="mx-2">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Creative template variations (5 unique designs)
export function CreativeTemplate({ variant = "1", data }: { variant: string; data: ResumeData }) {
  switch (variant) {
    case "1":
      return <CreativeDesignerTemplate data={data} />
    case "2":
      return <CreativeArtisticTemplate data={data} />
    case "3":
      return <CreativeDigitalTemplate data={data} />
    case "4":
      return <CreativePortfolioTemplate data={data} />
    case "5":
      return <CreativeInnovationTemplate data={data} />
    default:
      return <CreativeDesignerTemplate data={data} />
  }
}

// C1: Designer - Colorful sidebar with circular profile
function CreativeDesignerTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
      <div className="bg-gradient-to-b from-purple-400 to-pink-400 p-8 md:col-span-1 text-white">
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-purple-500 shadow-lg">
            {data.personalInfo.name
              .split(" ")
              .map((name: string) => name[0])
              .join("")}
          </div>
          <h2 className="text-2xl font-bold">{data.personalInfo.name}</h2>
          <p className="text-lg opacity-90 mt-1">{data.personalInfo.title}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">Contact</h3>
          <div className="space-y-3">
            {data.personalInfo.email && <p className="text-sm flex items-center gap-2">{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p className="text-sm flex items-center gap-2">{data.personalInfo.phone}</p>}
            {data.personalInfo.location && (
              <p className="text-sm flex items-center gap-2">{data.personalInfo.location}</p>
            )}
            {data.personalInfo.linkedin && (
              <p className="text-sm flex items-center gap-2">{data.personalInfo.linkedin}</p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">Skills</h3>
          <div className="space-y-3">
            {data.skills.map((skill: string, index: number) => (
              <div key={index} className="bg-white/20 backdrop-blur rounded-full px-4 py-2 text-sm font-medium">
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-bold">{edu.degree}</p>
              {edu.institution && <p className="text-sm opacity-90">{edu.institution}</p>}
              {edu.dates && <p className="text-sm opacity-75">{edu.dates}</p>}
              {edu.location && <p className="text-sm opacity-75">{edu.location}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 md:col-span-2">
        {data.summary && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">About Me</h3>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-purple-800 mb-6 border-b-2 border-purple-200 pb-2">Experience</h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-8 relative">
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-400 rounded"></div>
              <div className="pl-6">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-lg text-gray-800">{exp.title}</p>
                  {exp.dates && (
                    <span className="text-sm text-white bg-gradient-to-r from-purple-400 to-pink-400 px-3 py-1 rounded-full">
                      {exp.dates}
                    </span>
                  )}
                </div>
                <p className="text-md font-medium text-purple-600 mb-1">{exp.company}</p>
                {exp.location && <p className="text-sm text-gray-500 mb-3">{exp.location}</p>}
                <p className="text-sm leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// C2: Artistic - Asymmetric layout with creative elements
function CreativeArtisticTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-orange-300 to-red-300 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-gradient-to-tr from-blue-300 to-purple-300 opacity-20"></div>

      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h2 className="text-5xl font-bold text-gray-800 mb-2 transform -skew-x-6">{data.personalInfo.name}</h2>
          <p className="text-2xl text-orange-600 font-light italic">{data.personalInfo.title}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            {data.personalInfo.email && (
              <p className="bg-orange-100 px-3 py-1 rounded-full">{data.personalInfo.email}</p>
            )}
            {data.personalInfo.phone && <p className="bg-blue-100 px-3 py-1 rounded-full">{data.personalInfo.phone}</p>}
            {data.personalInfo.location && (
              <p className="bg-purple-100 px-3 py-1 rounded-full">{data.personalInfo.location}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {data.summary && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-orange-600 mb-4 relative">
                  Creative Vision
                  <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-orange-400 to-red-400"></div>
                </h3>
                <p className="text-sm leading-relaxed bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                  {data.summary}
                </p>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-blue-600 mb-6 relative">
                Experience Journey
                <div className="absolute -bottom-1 left-0 w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
              </h3>
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="mb-6 relative">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <p className="font-bold text-lg text-gray-800">{exp.title}</p>
                      {exp.dates && (
                        <span className="text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 rounded-full transform rotate-1">
                          {exp.dates}
                        </span>
                      )}
                    </div>
                    <p className="text-md font-medium text-blue-600 mb-1">{exp.company}</p>
                    {exp.location && <p className="text-sm text-gray-500 mb-3">{exp.location}</p>}
                    <p className="text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-purple-600 mb-4 relative">
                Skills Palette
                <div className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>
              </h3>
              <div className="space-y-3">
                {data.skills.map((skill: string, index: number) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-sm font-medium transform hover:scale-105 transition-transform ${
                      index % 3 === 0
                        ? "bg-orange-100 text-orange-700 border-l-4 border-orange-400"
                        : index % 3 === 1
                          ? "bg-blue-100 text-blue-700 border-l-4 border-blue-400"
                          : "bg-purple-100 text-purple-700 border-l-4 border-purple-400"
                    }`}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-600 mb-4 relative">
                Education
                <div className="absolute -bottom-1 left-0 w-10 h-1 bg-gradient-to-r from-green-400 to-teal-400"></div>
              </h3>
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                  <p className="font-bold text-green-800">{edu.degree}</p>
                  {edu.institution && <p className="text-sm font-medium text-green-600">{edu.institution}</p>}
                  {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
                  {edu.location && <p className="text-sm text-gray-500">{edu.location}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// C3: Digital Creative - Modern grid with gradient accents
function CreativeDigitalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {data.personalInfo.name}
            </h2>
            <p className="text-xl text-gray-600 mb-4">{data.personalInfo.title}</p>
            {data.summary && <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Contact</h3>
            <div className="space-y-3">
              {data.personalInfo.email && (
                <p className="text-sm bg-blue-50 p-2 rounded-lg">{data.personalInfo.email}</p>
              )}
              {data.personalInfo.phone && (
                <p className="text-sm bg-purple-50 p-2 rounded-lg">{data.personalInfo.phone}</p>
              )}
              {data.personalInfo.location && (
                <p className="text-sm bg-pink-50 p-2 rounded-lg">{data.personalInfo.location}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
              Experience
            </h3>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <p className="font-bold text-lg text-gray-800">{exp.title}</p>
                    {exp.dates && (
                      <span className="text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 rounded-full">
                        {exp.dates}
                      </span>
                    )}
                  </div>
                  <p className="text-md font-medium text-purple-600 mb-2">{exp.company}</p>
                  {exp.location && <p className="text-sm text-gray-500 mb-3">{exp.location}</p>}
                  <p className="text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg"></div>
                Skills
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {data.skills.map((skill: string, index: number) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-green-50 to-blue-50 border border-gray-100 rounded-lg p-3 text-center"
                  >
                    <span className="font-medium text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg"></div>
                Education
              </h3>
              {data.education.map((edu: any, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 border border-gray-100 rounded-lg p-4 mb-3 last:mb-0"
                >
                  <p className="font-bold text-gray-800">{edu.degree}</p>
                  {edu.institution && <p className="text-sm font-medium text-purple-600">{edu.institution}</p>}
                  {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
                  {edu.location && <p className="text-sm text-gray-500">{edu.location}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// C4: Portfolio Plus - Image-focused with portfolio sections
function CreativePortfolioTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-8">
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 text-white mb-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-2xl mb-4 flex items-center justify-center text-2xl font-bold">
              {data.personalInfo.name
                .split(" ")
                .map((name: string) => name[0])
                .join("")}
            </div>
            <h2 className="text-2xl font-bold mb-2">{data.personalInfo.name}</h2>
            <p className="text-lg opacity-90">{data.personalInfo.title}</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Info</h3>
            <div className="space-y-3">
              {data.personalInfo.email && <p className="text-sm">{data.personalInfo.email}</p>}
              {data.personalInfo.phone && <p className="text-sm">{data.personalInfo.phone}</p>}
              {data.personalInfo.location && <p className="text-sm">{data.personalInfo.location}</p>}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill: string, index: number) => (
                <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Education</h3>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-4 last:mb-0">
                <p className="font-bold">{edu.degree}</p>
                {edu.institution && <p className="text-sm text-green-600">{edu.institution}</p>}
                {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
                {edu.location && <p className="text-sm text-gray-500">{edu.location}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          {data.summary && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">About</h3>
              <p className="text-sm leading-relaxed bg-green-50 p-6 rounded-2xl border-l-4 border-green-400">
                {data.summary}
              </p>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Experience</h3>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-8 last:mb-0">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-xl text-gray-800">{exp.title}</p>
                      <p className="text-lg font-medium text-green-600">{exp.company}</p>
                      {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                    </div>
                    {exp.dates && (
                      <span className="text-sm text-white bg-green-500 px-4 py-2 rounded-full">{exp.dates}</span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Portfolio Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-200 rounded-xl mx-auto mb-3"></div>
                <p className="font-medium">Project 1</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-blue-200 rounded-xl mx-auto mb-3"></div>
                <p className="font-medium">Project 2</p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-purple-200 rounded-xl mx-auto mb-3"></div>
                <p className="font-medium">Project 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// C5: Innovation - Geometric shapes with bold typography
function CreativeInnovationTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white relative overflow-hidden min-h-screen">
      {/* Geometric background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 transform rotate-45 -translate-x-16 -translate-y-16"></div>
      <div className="absolute top-1/4 right-0 w-24 h-24 bg-blue-500 rounded-full translate-x-12"></div>
      <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-purple-400 transform rotate-12 translate-y-20"></div>
      <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-green-400 transform rotate-45"></div>

      <div className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-6xl font-black text-gray-900 mb-4 transform -skew-x-12">{data.personalInfo.name}</h2>
            <p className="text-3xl font-light text-yellow-600 transform skew-x-6">{data.personalInfo.title}</p>
            <div className="flex flex-wrap gap-4 mt-6">
              {data.personalInfo.email && (
                <div className="bg-yellow-400 text-black px-4 py-2 transform rotate-1 font-bold">
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="bg-blue-500 text-white px-4 py-2 transform -rotate-1 font-bold">
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="bg-purple-400 text-white px-4 py-2 transform rotate-2 font-bold">
                  {data.personalInfo.location}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {data.summary && (
                <div className="mb-12">
                  <h3 className="text-3xl font-black text-gray-900 mb-6 transform -skew-x-6">INNOVATION MINDSET</h3>
                  <div className="bg-yellow-50 border-l-8 border-yellow-400 p-6 transform skew-x-1">
                    <p className="text-sm leading-relaxed font-medium">{data.summary}</p>
                  </div>
                </div>
              )}

              <div className="mb-12">
                <h3 className="text-3xl font-black text-gray-900 mb-8 transform -skew-x-6">EXPERIENCE JOURNEY</h3>
                {data.experience.map((exp: any, index: number) => (
                  <div key={index} className="mb-8 last:mb-0">
                    <div
                      className={`p-6 transform ${index % 2 === 0 ? "skew-x-1" : "-skew-x-1"} ${
                        index % 3 === 0
                          ? "bg-yellow-50 border-l-8 border-yellow-400"
                          : index % 3 === 1
                            ? "bg-blue-50 border-l-8 border-blue-500"
                            : "bg-purple-50 border-l-8 border-purple-400"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-black text-xl text-gray-900">{exp.title}</p>
                          <p className="text-lg font-bold text-gray-700">{exp.company}</p>
                          {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                        </div>
                        {exp.dates && (
                          <div
                            className={`px-4 py-2 transform rotate-3 font-black text-white ${
                              index % 3 === 0 ? "bg-yellow-500" : index % 3 === 1 ? "bg-blue-500" : "bg-purple-500"
                            }`}
                          >
                            {exp.dates}
                          </div>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed font-medium">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 transform -skew-x-6">SKILLS</h3>
                <div className="space-y-3">
                  {data.skills.map((skill: string, index: number) => (
                    <div
                      key={index}
                      className={`p-3 transform ${index % 2 === 0 ? "rotate-1" : "-rotate-1"} font-bold text-center ${
                        index % 4 === 0
                          ? "bg-yellow-400 text-black"
                          : index % 4 === 1
                            ? "bg-blue-500 text-white"
                            : index % 4 === 2
                              ? "bg-purple-400 text-white"
                              : "bg-green-400 text-black"
                      }`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 transform -skew-x-6">EDUCATION</h3>
                {data.education.map((edu: any, index: number) => (
                  <div key={index} className="bg-gray-100 p-4 mb-4 transform skew-x-1">
                    <p className="font-black text-gray-900">{edu.degree}</p>
                    {edu.institution && <p className="text-sm font-bold text-gray-700">{edu.institution}</p>}
                    {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
                    {edu.location && <p className="text-sm text-gray-500">{edu.location}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Minimal template variations (5 unique designs)
export function MinimalTemplate({ variant = "1", data }: { variant: string; data: ResumeData }) {
  switch (variant) {
    case "1":
      return <MinimalCleanTemplate data={data} />
    case "2":
      return <MinimalSimplicityTemplate data={data} />
    case "3":
      return <MinimalEssentialsTemplate data={data} />
    case "4":
      return <MinimalProTemplate data={data} />
    case "5":
      return <MinimalWhitespaceTemplate data={data} />
    default:
      return <MinimalCleanTemplate data={data} />
  }
}

// M1: Clean - Ultra-minimal with subtle dividers
function MinimalCleanTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-12 font-light max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-normal tracking-wide text-gray-900">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-500 mt-2">{data.personalInfo.title}</p>
        <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-600">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.email && data.personalInfo.phone && <span>•</span>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.phone && data.personalInfo.location && <span>•</span>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-12 pb-8 border-b border-gray-200">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Summary</h3>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      <div className="mb-12 pb-8 border-b border-gray-200">
        <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Experience</h3>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-8 last:mb-0">
            <div className="flex justify-between items-baseline mb-1">
              <p className="font-medium text-gray-900">{exp.title}</p>
              {exp.dates && <p className="text-sm text-gray-500">{exp.dates}</p>}
            </div>
            <p className="text-sm text-gray-700 mb-1">{exp.company}</p>
            {exp.location && <p className="text-sm text-gray-500 mb-3">{exp.location}</p>}
            <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-medium text-gray-900">{edu.degree}</p>
              {edu.institution && <p className="text-sm text-gray-700">{edu.institution}</p>}
              {edu.dates && <p className="text-sm text-gray-500">{edu.dates}</p>}
              {edu.location && <p className="text-sm text-gray-500">{edu.location}</p>}
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Skills</h3>
          <div className="space-y-2">
            {data.skills.map((skill: string, index: number) => (
              <p key={index} className="text-sm text-gray-700">
                {skill}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// M2: Simplicity - Typography-focused single column
function MinimalSimplicityTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-16 max-w-3xl mx-auto font-light">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-thin text-gray-900 mb-4">{data.personalInfo.name}</h2>
        <p className="text-lg text-gray-500 mb-6">{data.personalInfo.title}</p>
        <div className="text-sm text-gray-600 space-y-1">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-16 text-center">
          <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Summary</h3>
          <p className="text-sm leading-loose text-gray-700 max-w-2xl mx-auto">{data.summary}</p>
        </div>
      )}

      <div className="mb-16">
        <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-8 text-center">Experience</h3>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-12 last:mb-0 text-center">
            <p className="text-lg font-normal text-gray-900 mb-1">{exp.title}</p>
            <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
            <div className="flex justify-center gap-4 text-xs text-gray-500 mb-4">
              {exp.dates && <p>{exp.dates}</p>}
              {exp.location && <p>{exp.location}</p>}
            </div>
            <p className="text-sm leading-loose text-gray-700 max-w-2xl mx-auto">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="text-center">
          <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-6">
              <p className="font-normal text-gray-900">{edu.degree}</p>
              {edu.institution && <p className="text-sm text-gray-600">{edu.institution}</p>}
              {edu.dates && <p className="text-xs text-gray-500">{edu.dates}</p>}
              {edu.location && <p className="text-xs text-gray-500">{edu.location}</p>}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Skills</h3>
          <div className="space-y-2">
            {data.skills.map((skill: string, index: number) => (
              <p key={index} className="text-sm text-gray-700">
                {skill}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// M3: Essentials - Compact layout with essential info only
function MinimalEssentialsTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-medium text-gray-900">{data.personalInfo.name}</h2>
        <p className="text-lg text-gray-600">{data.personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Summary</h3>
          <p className="text-sm text-gray-600">{data.summary}</p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Experience</h3>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-4 last:mb-0">
            <div className="flex justify-between items-baseline">
              <p className="font-medium text-gray-900">{exp.title}</p>
              {exp.dates && <p className="text-xs text-gray-500">{exp.dates}</p>}
            </div>
            <p className="text-sm text-gray-700">{exp.company}</p>
            {exp.location && <p className="text-xs text-gray-500">{exp.location}</p>}
            <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-2">
              <p className="text-sm font-medium text-gray-900">{edu.degree}</p>
              {edu.institution && <p className="text-xs text-gray-600">{edu.institution}</p>}
              {edu.dates && <p className="text-xs text-gray-500">{edu.dates}</p>}
            </div>
          ))}
        </div>
        <div className="md:col-span-2">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string, index: number) => (
              <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// M4: Minimalist Pro - Spacious design with selective emphasis
function MinimalProTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-20 max-w-4xl mx-auto">
      <div className="mb-20">
        <h2 className="text-3xl font-light text-gray-900 mb-4">{data.personalInfo.name}</h2>
        <p className="text-lg text-gray-500 mb-8">{data.personalInfo.title}</p>
        <div className="space-y-2 text-sm text-gray-600">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-20">
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-8">Summary</h3>
          <p className="text-sm leading-relaxed text-gray-700 max-w-2xl">{data.summary}</p>
        </div>
      )}

      <div className="mb-20">
        <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-12">Experience</h3>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-16 last:mb-0">
            <div className="flex justify-between items-baseline mb-2">
              <p className="text-lg font-light text-gray-900">{exp.title}</p>
              {exp.dates && <p className="text-sm text-gray-400">{exp.dates}</p>}
            </div>
            <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
            {exp.location && <p className="text-sm text-gray-500 mb-6">{exp.location}</p>}
            <p className="text-sm leading-relaxed text-gray-700 max-w-2xl">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-8">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-8">
              <p className="font-light text-gray-900">{edu.degree}</p>
              {edu.institution && <p className="text-sm text-gray-600">{edu.institution}</p>}
              {edu.dates && <p className="text-sm text-gray-500">{edu.dates}</p>}
              {edu.location && <p className="text-sm text-gray-500">{edu.location}</p>}
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-8">Skills</h3>
          <div className="space-y-3">
            {data.skills.map((skill: string, index: number) => (
              <p key={index} className="text-sm text-gray-700">
                {skill}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// M5: Whitespace - Maximum whitespace with minimal text
function MinimalWhitespaceTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-24 max-w-2xl mx-auto">
      <div className="text-center mb-32">
        <h2 className="text-2xl font-extralight text-gray-900 mb-8">{data.personalInfo.name}</h2>
        <p className="text-sm text-gray-400 mb-16">{data.personalInfo.title}</p>
        <div className="space-y-4 text-xs text-gray-500">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-32 text-center">
          <p className="text-xs leading-loose text-gray-600 max-w-md mx-auto">{data.summary}</p>
        </div>
      )}

      <div className="mb-32">
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-24 last:mb-0 text-center">
            <p className="text-sm font-light text-gray-900 mb-2">{exp.title}</p>
            <p className="text-xs text-gray-500 mb-1">{exp.company}</p>
            {exp.dates && <p className="text-xs text-gray-400 mb-8">{exp.dates}</p>}
            <p className="text-xs leading-loose text-gray-600 max-w-md mx-auto">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center space-y-16">
        <div>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-8">
              <p className="text-xs text-gray-700">{edu.degree}</p>
              {edu.institution && <p className="text-xs text-gray-500">{edu.institution}</p>}
              {edu.dates && <p className="text-xs text-gray-400">{edu.dates}</p>}
            </div>
          ))}
        </div>
        <div>
          <div className="space-y-2">
            {data.skills.map((skill: string, index: number) => (
              <p key={index} className="text-xs text-gray-600">
                {skill}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Executive template variations (5 unique designs)
export function ExecutiveTemplate({ variant = "1", data }: { variant: string; data: ResumeData }) {
  switch (variant) {
    case "1":
      return <ExecutiveLeadershipTemplate data={data} />
    case "2":
      return <ExecutiveCSuiteTemplate data={data} />
    case "3":
      return <ExecutiveDirectorTemplate data={data} />
    case "4":
      return <ExecutiveBoardMemberTemplate data={data} />
    case "5":
      return <ExecutiveEliteTemplate data={data} />
    default:
      return <ExecutiveLeadershipTemplate data={data} />
  }
}

// E1: Leadership - Bold header with executive summary focus
function ExecutiveLeadershipTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white">
      <div className="bg-gray-900 text-white p-12">
        <h2 className="text-5xl font-bold mb-4">{data.personalInfo.name}</h2>
        <p className="text-2xl text-gray-300 mb-6">{data.personalInfo.title}</p>
        <div className="flex flex-wrap gap-8 text-sm">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      <div className="p-12">
        {data.summary && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Executive Summary</h3>
            <p className="text-lg leading-relaxed text-gray-700 bg-gray-50 p-6 border-l-4 border-gray-900">
              {data.summary}
            </p>
          </div>
        )}

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 uppercase tracking-wider">Leadership Experience</h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-10 last:mb-0">
              <div className="bg-gray-50 p-8 border-l-4 border-gray-900">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xl font-bold text-gray-900">{exp.title}</p>
                    <p className="text-lg font-semibold text-gray-700">{exp.company}</p>
                    {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                  </div>
                  {exp.dates && <span className="text-sm text-white bg-gray-900 px-4 py-2 font-bold">{exp.dates}</span>}
                </div>
                <p className="text-sm leading-relaxed text-gray-700">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Education</h3>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="bg-gray-50 p-6 mb-4 border-l-4 border-gray-600">
                <p className="font-bold text-gray-900">{edu.degree}</p>
                {edu.institution && <p className="text-sm font-semibold text-gray-700">{edu.institution}</p>}
                {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
                {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Core Competencies</h3>
            <div className="grid grid-cols-1 gap-3">
              {data.skills.map((skill: string, index: number) => (
                <div key={index} className="bg-gray-900 text-white px-4 py-3 font-semibold text-center">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// E2: C-Suite - Formal layout with achievement highlights
function ExecutiveCSuiteTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-12 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white shadow-lg">
        <div className="bg-white p-12 border-l-8 border-blue-600">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">{data.personalInfo.name}</h2>
          <p className="text-xl text-blue-600 font-semibold mb-6">{data.personalInfo.title}</p>
          <div className="flex flex-wrap gap-6 text-sm text-gray-700">
            {data.personalInfo.email && <p className="flex items-center gap-2">{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p className="flex items-center gap-2">{data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p className="flex items-center gap-2">{data.personalInfo.location}</p>}
          </div>
        </div>

        <div className="p-12">
          {data.summary && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                EXECUTIVE PROFILE
              </h3>
              <div className="bg-blue-50 border border-blue-200 p-6">
                <p className="text-sm leading-relaxed text-gray-800">{data.summary}</p>
              </div>
            </div>
          )}

          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-8 border-b-2 border-blue-600 pb-2">
              EXECUTIVE EXPERIENCE
            </h3>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-8 last:mb-0">
                <div className="bg-white border border-gray-200 p-8 shadow-sm">
                  <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-4">
                    <div>
                      <p className="text-lg font-bold text-gray-900">{exp.title}</p>
                      <p className="text-md font-semibold text-blue-600">{exp.company}</p>
                      {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                    </div>
                    {exp.dates && (
                      <span className="text-sm text-white bg-blue-600 px-4 py-2 font-semibold">{exp.dates}</span>
                    )}
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                    <p className="text-sm leading-relaxed text-gray-800">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                EDUCATION & CREDENTIALS
              </h3>
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="bg-white border border-gray-200 p-6 mb-4 shadow-sm">
                  <p className="font-bold text-gray-900">{edu.degree}</p>
                  {edu.institution && <p className="text-sm font-semibold text-blue-600">{edu.institution}</p>}
                  {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
                  {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                CORE COMPETENCIES
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {data.skills.map((skill: string, index: number) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-blue-200 px-4 py-3 text-center hover:bg-blue-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-800">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// E3: Director - Professional columns with metrics emphasis
function ExecutiveDirectorTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="border-b-4 border-gray-800 pb-8 mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">{data.personalInfo.name}</h2>
          <p className="text-xl text-gray-600 mb-4">{data.personalInfo.title}</p>
          <div className="flex flex-wrap gap-6 text-sm text-gray-700">
            {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {data.summary && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
                  Professional Summary
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-wider border-b border-gray-300 pb-2">
                Professional Experience
              </h3>
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="mb-8 last:mb-0">
                  <div className="border-b border-gray-300 pb-2 mb-4">
                    <div className="flex justify-between items-baseline">
                      <p className="text-lg font-bold text-gray-800">{exp.title}</p>
                      {exp.dates && <p className="text-sm text-gray-600 font-semibold">{exp.dates}</p>}
                    </div>
                    <p className="text-md font-semibold text-gray-700">{exp.company}</p>
                    {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                  </div>
                  <div className="bg-gray-50 p-4 border-l-4 border-gray-800">
                    <p className="text-sm leading-relaxed text-gray-700">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
                Education
              </h3>
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="bg-gray-50 p-4 mb-4 border-l-4 border-gray-600">
                  <p className="font-bold text-gray-800">{edu.degree}</p>
                  {edu.institution && <p className="text-sm font-semibold text-gray-700">{edu.institution}</p>}
                  {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
                  {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
                Key Skills
              </h3>
              <div className="space-y-2">
                {data.skills.map((skill: string, index: number) => (
                  <div key={index} className="bg-gray-800 text-white px-3 py-2 text-sm font-semibold">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// E4: Board Member - Distinguished design with board experience
function ExecutiveBoardMemberTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white border-4 border-gray-300">
      <div className="bg-gray-100 border-b-2 border-gray-300 p-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">{data.personalInfo.name}</h2>
          <p className="text-xl text-gray-700 mb-6">{data.personalInfo.title}</p>
          <div className="flex justify-center gap-8 text-sm text-gray-700">
            {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
          </div>
        </div>
      </div>

      <div className="p-10">
        <div className="max-w-5xl mx-auto">
          {data.summary && (
            <div className="mb-10 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Board Profile</h3>
              <div className="bg-gray-50 border-2 border-gray-200 p-8 max-w-4xl mx-auto">
                <p className="text-sm leading-relaxed text-gray-800">{data.summary}</p>
              </div>
            </div>
          )}

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-wider text-center">
              Board & Executive Experience
            </h3>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-8 last:mb-0">
                <div className="bg-gray-50 border-2 border-gray-200 p-8">
                  <div className="text-center mb-6">
                    <p className="text-lg font-bold text-gray-900">{exp.title}</p>
                    <p className="text-md font-semibold text-gray-700">{exp.company}</p>
                    <div className="flex justify-center gap-4 text-sm text-gray-600 mt-2">
                      {exp.dates && <p>{exp.dates}</p>}
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 p-6">
                    <p className="text-sm leading-relaxed text-gray-800 text-center">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider">Education & Credentials</h3>
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="bg-gray-50 border-2 border-gray-200 p-6 mb-4">
                  <p className="font-bold text-gray-900">{edu.degree}</p>
                  {edu.institution && <p className="text-sm font-semibold text-gray-700">{edu.institution}</p>}
                  {edu.dates && <p className="text-sm text-gray-600">{edu.dates}</p>}
                  {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider">Board Competencies</h3>
              <div className="space-y-3">
                {data.skills.map((skill: string, index: number) => (
                  <div key={index} className="bg-gray-50 border-2 border-gray-200 px-4 py-3">
                    <span className="font-semibold text-gray-800">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// E5: Executive Elite - Premium layout with luxury styling
function ExecutiveEliteTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white min-h-screen">
      <div className="p-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              {data.personalInfo.name}
            </h2>
            <p className="text-2xl text-yellow-400 mb-8">{data.personalInfo.title}</p>
            <div className="flex justify-center gap-8 text-sm text-gray-300">
              {data.personalInfo.email && <p className="bg-gray-800 px-4 py-2 rounded">{data.personalInfo.email}</p>}
              {data.personalInfo.phone && <p className="bg-gray-800 px-4 py-2 rounded">{data.personalInfo.phone}</p>}
              {data.personalInfo.location && (
                <p className="bg-gray-800 px-4 py-2 rounded">{data.personalInfo.location}</p>
              )}
            </div>
          </div>

          {data.summary && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-yellow-400 mb-8 text-center uppercase tracking-wider">
                Executive Excellence
              </h3>
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-lg border border-yellow-400">
                <p className="text-lg leading-relaxed text-center text-gray-100">{data.summary}</p>
              </div>
            </div>
          )}

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-yellow-400 mb-10 text-center uppercase tracking-wider">
              Elite Experience
            </h3>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-10 last:mb-0">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-lg border border-gray-600">
                  <div className="text-center mb-6">
                    <p className="text-xl font-bold text-yellow-400">{exp.title}</p>
                    <p className="text-lg font-semibold text-gray-200">{exp.company}</p>
                    <div className="flex justify-center gap-6 text-sm text-gray-400 mt-3">
                      {exp.dates && <p className="bg-yellow-400 text-black px-3 py-1 rounded font-bold">{exp.dates}</p>}
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  <div className="bg-gray-900 p-6 rounded border border-yellow-400/30">
                    <p className="text-sm leading-relaxed text-gray-200 text-center">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-8 text-center uppercase tracking-wider">
                Distinguished Education
              </h3>
              {data.education.map((edu: any, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 mb-6 rounded-lg border border-gray-600"
                >
                  <p className="font-bold text-yellow-400 text-center">{edu.degree}</p>
                  {edu.institution && (
                    <p className="text-sm font-semibold text-gray-200 text-center">{edu.institution}</p>
                  )}
                  {edu.dates && <p className="text-sm text-gray-400 text-center">{edu.dates}</p>}
                  {edu.location && <p className="text-sm text-gray-400 text-center">{edu.location}</p>}
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-8 text-center uppercase tracking-wider">
                Executive Mastery
              </h3>
              <div className="space-y-4">
                {data.skills.map((skill: string, index: number) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-6 py-4 rounded-lg text-center font-bold"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
