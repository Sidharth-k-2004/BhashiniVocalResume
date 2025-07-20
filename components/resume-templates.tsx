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
  projects?: Array<{
    name: string
    description: string
    technologies?: string
    link?: string
    dates?: string
  }>
  publications?: Array<{
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
          {data.projects && data.projects.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Projects</h3>
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <p className="font-medium">{project.name}</p>
                    {project.dates && <p className="text-sm text-gray-600">{project.dates}</p>}
                  </div>
                  {project.technologies && <p className="text-sm font-medium text-blue-600">{project.technologies}</p>}
                  {project.link && <p className="text-sm text-gray-500">{project.link}</p>}
                  <p className="text-sm mt-2">{project.description}</p>
                </div>
              ))}
            </div>
          )}
          {data.publications && data.publications.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Publications</h3>
              {data.publications.map((pub: any, index: number) => (
                <div key={index} className="mb-4 bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-800">{pub.title}</p>
                  {pub.authors && <p className="text-sm text-gray-700 mt-1">Authors: {pub.authors}</p>}
                  {pub.journal && <p className="text-sm text-gray-700">Published in: {pub.journal}</p>}
                  {pub.year && <p className="text-sm text-gray-700">Year: {pub.year}</p>}
                  {pub.links && pub.links.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-blue-700">Links:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {pub.links.map((link: any, linkIndex: number) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                          >
                            {link.type}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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
      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Projects</h3>
          {data.projects.map((project: any, index: number) => (
            <div key={index} className="mb-5 text-center">
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg">{project.name}</p>
                {project.dates && <p className="text-sm text-gray-600">{project.dates}</p>}
              </div>
              {project.technologies && <p className="text-md font-medium">{project.technologies}</p>}
              {project.link && <p className="text-sm text-gray-500">{project.link}</p>}
              <p className="text-sm mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      )}
      {data.publications && data.publications.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Publications</h3>
          {data.publications.map((pub: any, index: number) => (
            <div key={index} className="mb-5 text-center bg-gray-50 p-4 rounded-lg">
              <p className="font-bold text-lg text-gray-800">{pub.title}</p>
              {pub.authors && <p className="text-sm text-gray-700 mt-1">Authors: {pub.authors}</p>}
              {pub.journal && <p className="text-sm text-gray-700">Published in: {pub.journal}</p>}
              {pub.year && <p className="text-sm text-gray-700">Year: {pub.year}</p>}
              {pub.links && pub.links.length > 0 && (
                <div className="mt-2">
                  <div className="flex flex-wrap justify-center gap-2 mt-1">
                    {pub.links.map((link: any, linkIndex: number) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        {link.type}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
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
        {data.projects && data.projects.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Projects</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-500"></div>
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="relative pl-12 pb-8">
                  <div className="absolute left-2 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow"></div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-lg">{project.name}</p>
                      {project.dates && (
                        <span className="text-sm text-gray-600 bg-green-100 px-2 py-1 rounded">{project.dates}</span>
                      )}
                    </div>
                    {project.technologies && (
                      <p className="text-md font-medium text-green-600 mb-1">{project.technologies}</p>
                    )}
                    {project.link && <p className="text-sm text-gray-500 mb-2">{project.link}</p>}
                    <p className="text-sm">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.publications && data.publications.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Publications</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-500"></div>
              {data.publications.map((pub: any, index: number) => (
                <div key={index} className="relative pl-12 pb-8">
                  <div className="absolute left-2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow"></div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold text-lg text-gray-800">{pub.title}</p>
                    {pub.authors && <p className="text-sm text-gray-700 mt-1">Authors: {pub.authors}</p>}
                    {pub.journal && <p className="text-sm text-purple-600 font-medium">Published in: {pub.journal}</p>}
                    {pub.year && <p className="text-sm text-gray-600">Year: {pub.year}</p>}
                    {pub.links && pub.links.length > 0 && (
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-2 mt-1">
                          {pub.links.map((link: any, linkIndex: number) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                            >
                              {link.type}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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

// P4: Modern - Minimalist design with icons
function ProfessionalModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-600">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Contact</h3>
            {data.personalInfo.email && <p className="text-sm mb-1">{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p className="text-sm mb-1">{data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p className="text-sm mb-1">{data.personalInfo.location}</p>}
            {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Skills</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {data.skills.map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Education</h3>
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
                <p className="text-sm font-medium text-gray-800">{exp.company}</p>
                {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
          {data.projects && data.projects.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Projects</h3>
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <p className="font-medium">{project.name}</p>
                    {project.dates && <p className="text-sm text-gray-600">{project.dates}</p>}
                  </div>
                  {project.technologies && <p className="text-sm font-medium text-gray-800">{project.technologies}</p>}
                  {project.link && <p className="text-sm text-gray-500">{project.link}</p>}
                  <p className="text-sm mt-2">{project.description}</p>
                </div>
              ))}
            </div>
          )}
          {data.publications && data.publications.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Publications</h3>
              {data.publications.map((pub: any, index: number) => (
                <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-800">{pub.title}</p>
                  {pub.authors && <p className="text-sm text-gray-700 mt-1">Authors: {pub.authors}</p>}
                  {pub.journal && <p className="text-sm text-gray-700">Published in: {pub.journal}</p>}
                  {pub.year && <p className="text-sm text-gray-700">Year: {pub.year}</p>}
                  {pub.links && pub.links.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Links:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {pub.links.map((link: any, linkIndex: number) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                          >
                            {link.type}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// P5: Classic - Traditional one-column layout
function ProfessionalClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-600">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          {data.personalInfo.email && <p className="text-sm mb-1">{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p className="text-sm mb-1">{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p className="text-sm mb-1">{data.personalInfo.location}</p>}
          {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Experience</h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <p className="font-medium">{exp.title}</p>
                {exp.dates && <p className="text-sm text-gray-600">{exp.dates}</p>}
              </div>
              <p className="text-sm font-medium text-gray-800">{exp.company}</p>
              {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Projects</h3>
          {data.projects && data.projects.length > 0 && (
            <div className="mb-4">
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <p className="font-medium">{project.name}</p>
                    {project.dates && <p className="text-sm text-gray-600">{project.dates}</p>}
                  </div>
                  {project.technologies && <p className="text-sm font-medium text-gray-800">{project.technologies}</p>}
                  {project.link && <p className="text-sm text-gray-500">{project.link}</p>}
                  <p className="text-sm mt-2">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Publications</h3>
          {data.publications && data.publications.length > 0 && (
            <div className="mb-4">
              {data.publications.map((pub: any, index: number) => (
                <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-800">{pub.title}</p>
                  {pub.authors && <p className="text-sm text-gray-700 mt-1">Authors: {pub.authors}</p>}
                  {pub.journal && <p className="text-sm text-gray-700">Published in: {pub.journal}</p>}
                  {pub.year && <p className="text-sm text-gray-700">Year: {pub.year}</p>}
                  {pub.links && pub.links.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Links:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {pub.links.map((link: any, linkIndex: number) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                          >
                            {link.type}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Education</h3>
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
      return <CreativeDigitalCreativeTemplate data={data} />
    case "4":
      return <CreativePortfolioPlusTemplate data={data} />
    case "5":
      return <CreativeInnovationTemplate data={data} />
    default:
      return <CreativeDesignerTemplate data={data} />
  }
}

// C1: Designer - Bold colors and shapes
function CreativeDesignerTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-gradient-to-r from-purple-200 to-pink-200">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-purple-800">{data.personalInfo.name}</h2>
          <p className="text-xl text-pink-700">{data.personalInfo.title}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">Contact</h3>
            <p className="text-sm text-gray-700">{data.personalInfo.email}</p>
            <p className="text-sm text-gray-700">{data.personalInfo.phone}</p>
            <p className="text-sm text-gray-700">{data.personalInfo.location}</p>
            {data.personalInfo.linkedin && <p className="text-sm text-gray-700">{data.personalInfo.linkedin}</p>}
            <h3 className="text-lg font-semibold text-purple-800 mt-4 mb-3">Skills</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {data.skills.map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold text-purple-800 mt-4 mb-3">Education</h3>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-3">
                <p className="font-medium text-gray-800">{edu.degree}</p>
                <p className="text-sm text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-700">{edu.dates}</p>
                <p className="text-sm text-gray-700">{edu.location}</p>
              </div>
            ))}
          </div>
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">Summary</h3>
            <p className="text-sm text-gray-700">{data.summary}</p>
            <h3 className="text-lg font-semibold text-purple-800 mt-4 mb-3">Experience</h3>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium text-gray-800">{exp.title}</p>
                <p className="text-sm text-pink-700">{exp.company}</p>
                <p className="text-sm text-gray-700">{exp.dates}</p>
                <p className="text-sm text-gray-700">{exp.location}</p>
                <p className="text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
            {data.projects && data.projects.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mt-4 mb-3">Projects</h3>
                {data.projects.map((project: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800">{project.name}</p>
                    <p className="text-sm text-pink-700">{project.technologies}</p>
                    <p className="text-sm text-gray-700">{project.description}</p>
                    {project.link && (
                      <a href={project.link} className="text-sm text-blue-500">
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
            {data.publications && data.publications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mt-4 mb-3">Publications</h3>
                {data.publications.map((pub: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800">{pub.title}</p>
                    <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                    <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                    <p className="text-sm text-gray-700">Year: {pub.year}</p>
                    {pub.links && pub.links.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-purple-700">Links:</p>
                        {pub.links.map((link: any, linkIndex: number) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                          >
                            {link.type}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// C2: Artistic - Hand-drawn elements and unique typography
function CreativeArtisticTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-yellow-50">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-green-800">{data.personalInfo.name}</h2>
          <p className="text-xl text-yellow-700">{data.personalInfo.title}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-green-800 mb-3">Contact</h3>
            <p className="text-sm text-gray-700">{data.personalInfo.email}</p>
            <p className="text-sm text-gray-700">{data.personalInfo.phone}</p>
            <p className="text-sm text-gray-700">{data.personalInfo.location}</p>
            {data.personalInfo.linkedin && <p className="text-sm text-gray-700">{data.personalInfo.linkedin}</p>}
            <h3 className="text-lg font-semibold text-green-800 mt-4 mb-3">Skills</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {data.skills.map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold text-green-800 mt-4 mb-3">Education</h3>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-3">
                <p className="font-medium text-gray-800">{edu.degree}</p>
                <p className="text-sm text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-700">{edu.dates}</p>
                <p className="text-sm text-gray-700">{edu.location}</p>
              </div>
            ))}
          </div>
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-green-800 mb-3">Summary</h3>
            <p className="text-sm text-gray-700">{data.summary}</p>
            <h3 className="text-lg font-semibold text-green-800 mt-4 mb-3">Experience</h3>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium text-gray-800">{exp.title}</p>
                <p className="text-sm text-yellow-700">{exp.company}</p>
                <p className="text-sm text-gray-700">{exp.dates}</p>
                <p className="text-sm text-gray-700">{exp.location}</p>
                <p className="text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
            {data.projects && data.projects.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-green-800 mt-4 mb-3">Projects</h3>
                {data.projects.map((project: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800">{project.name}</p>
                    <p className="text-sm text-yellow-700">{project.technologies}</p>
                    <p className="text-sm text-gray-700">{project.description}</p>
                    {project.link && (
                      <a href={project.link} className="text-sm text-blue-500">
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
            {data.publications && data.publications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-green-800 mt-4 mb-3">Publications</h3>
                {data.publications.map((pub: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800">{pub.title}</p>
                    <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                    <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                    <p className="text-sm text-gray-700">Year: {pub.year}</p>
                    {pub.links && pub.links.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-green-700">Links:</p>
                        {pub.links.map((link: any, linkIndex: number) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          >
                            {link.type}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// C3: Digital Creative - Modern and tech-focused
function CreativeDigitalCreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-blue-100">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-blue-800">{data.personalInfo.name}</h2>
          <p className="text-xl text-indigo-700">{data.personalInfo.title}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Contact</h3>
            <p className="text-sm text-gray-700">{data.personalInfo.email}</p>
            <p className="text-sm text-gray-700">{data.personalInfo.phone}</p>
            <p className="text-sm text-gray-700">{data.personalInfo.location}</p>
            {data.personalInfo.linkedin && <p className="text-sm text-gray-700">{data.personalInfo.linkedin}</p>}
            <h3 className="text-lg font-semibold text-blue-800 mt-4 mb-3">Skills</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {data.skills.map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold text-blue-800 mt-4 mb-3">Education</h3>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-3">
                <p className="font-medium text-gray-800">{edu.degree}</p>
                <p className="text-sm text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-700">{edu.dates}</p>
                <p className="text-sm text-gray-700">{edu.location}</p>
              </div>
            ))}
          </div>
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Summary</h3>
            <p className="text-sm text-gray-700">{data.summary}</p>
            <h3 className="text-lg font-semibold text-blue-800 mt-4 mb-3">Experience</h3>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium text-gray-800">{exp.title}</p>
                <p className="text-sm text-indigo-700">{exp.company}</p>
                <p className="text-sm text-gray-700">{exp.dates}</p>
                <p className="text-sm text-gray-700">{exp.location}</p>
                <p className="text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
            {data.projects && data.projects.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mt-4 mb-3">Projects</h3>
                {data.projects.map((project: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800">{project.name}</p>
                    <p className="text-sm text-indigo-700">{project.technologies}</p>
                    <p className="text-sm text-gray-700">{project.description}</p>
                    {project.link && (
                      <a href={project.link} className="text-sm text-blue-500">
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
            {data.publications && data.publications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mt-4 mb-3">Publications</h3>
                {data.publications.map((pub: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800">{pub.title}</p>
                    <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                    <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                    <p className="text-sm text-gray-700">Year: {pub.year}</p>
                    {pub.links && pub.links.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-blue-700">Links:</p>
                        {pub.links.map((link: any, linkIndex: number) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                          >
                            {link.type}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// C4: Portfolio Plus - Image gallery and visual elements
function CreativePortfolioPlusTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-gray-100">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800">{data.personalInfo.name}</h2>
          <p className="text-xl text-gray-700">{data.personalInfo.title}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact</h3>
            <p className="text-sm text-gray-700">{data.personalInfo.email}</p>
            <p className="text-sm text-gray-700">{data.personalInfo.phone}</p>
            <p className="text-sm text-gray-700">{data.personalInfo.location}</p>
            {data.personalInfo.linkedin && <p className="text-sm text-gray-700">{data.personalInfo.linkedin}</p>}
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-3">Skills</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {data.skills.map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-3">Education</h3>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-3">
                <p className="font-medium text-gray-800">{edu.degree}</p>
                <p className="text-sm text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-700">{edu.dates}</p>
                <p className="text-sm text-gray-700">{edu.location}</p>
              </div>
            ))}
          </div>
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Summary</h3>
            <p className="text-sm text-gray-700">{data.summary}</p>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-3">Experience</h3>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium text-gray-800">{exp.title}</p>
                <p className="text-sm text-gray-700">{exp.company}</p>
                <p className="text-sm text-gray-700">{exp.dates}</p>
                <p className="text-sm text-gray-700">{exp.location}</p>
                <p className="text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
            {data.projects && data.projects.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-3">Projects</h3>
                {data.projects.map((project: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800">{project.name}</p>
                    <p className="text-sm text-gray-700">{project.technologies}</p>
                    <p className="text-sm text-gray-700">{project.description}</p>
                    {project.link && (
                      <a href={project.link} className="text-sm text-blue-500">
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
            {data.publications && data.publications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-3">Publications</h3>
                {data.publications.map((pub: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800">{pub.title}</p>
                    <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                    <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                    <p className="text-sm text-gray-700">Year: {pub.year}</p>
                    {pub.links && pub.links.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Links:</p>
                        {pub.links.map((link: any, linkIndex: number) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                          >
                            {link.type}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// C5: Innovation - Modern and unique layout
function CreativeInnovationTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-indigo-50">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-indigo-800">{data.personalInfo.name}</h2>
          <p className="text-xl text-teal-700">{data.personalInfo.title}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-indigo-800 mb-3">Contact</h3>
            <p className="text-sm text-gray-700">{data.personalInfo.email}</p>
            <p className="text-sm text-gray-700">{data.personalInfo.phone}</p>
            <p className="text-sm text-gray-700">{data.personalInfo.location}</p>
            {data.personalInfo.linkedin && <p className="text-sm text-gray-700">{data.personalInfo.linkedin}</p>}
            <h3 className="text-lg font-semibold text-indigo-800 mt-4 mb-3">Skills</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {data.skills.map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold text-indigo-800 mt-4 mb-3">Education</h3>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-3">
                <p className="font-medium text-gray-800">{edu.degree}</p>
                <p className="text-sm text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-700">{edu.dates}</p>
                <p className="text-sm text-gray-700">{edu.location}</p>
              </div>
            ))}
          </div>
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-indigo-800 mb-3">Summary</h3>
            <p className="text-sm text-gray-700">{data.summary}</p>
            <h3 className="text-lg font-semibold text-indigo-800 mt-4 mb-3">Experience</h3>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium text-gray-800">{exp.title}</p>
                <p className="text-sm text-teal-700">{exp.company}</p>
                <p className="text-sm text-gray-700">{exp.dates}</p>
                <p className="text-sm text-gray-700">{exp.location}</p>
                <p className="text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
            {data.projects && data.projects.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-indigo-800 mt-4 mb-3">Projects</h3>
                {data.projects.map((project: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800">{project.name}</p>
                    <p className="text-sm text-teal-700">{project.technologies}</p>
                    <p className="text-sm text-gray-700">{project.description}</p>
                    {project.link && (
                      <a href={project.link} className="text-sm text-blue-500">
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
            {data.publications && data.publications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-indigo-800 mt-4 mb-3">Publications</h3>
                {data.publications.map((pub: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800">{pub.title}</p>
                    <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                    <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                    <p className="text-sm text-gray-700">Year: {pub.year}</p>
                    {pub.links && pub.links.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-indigo-700">Links:</p>
                        {pub.links.map((link: any, linkIndex: number) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
                          >
                            {link.type}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
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
      return <MinimalMinimalistProTemplate data={data} />
    case "5":
      return <MinimalWhitespaceTemplate data={data} />
    default:
      return <MinimalCleanTemplate data={data} />
  }
}

// M1: Clean - Simple and straightforward
function MinimalCleanTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-600">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm mb-1">{data.personalInfo.email}</p>
          <p className="text-sm mb-1">{data.personalInfo.phone}</p>
          <p className="text-sm mb-1">{data.personalInfo.location}</p>
          {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Experience</h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{exp.title}</p>
              <p className="text-sm text-gray-800">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.location}</p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
        {data.projects && data.projects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Projects</h3>
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-gray-800">{project.technologies}</p>
                <p className="text-sm text-gray-500">{project.link}</p>
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        )}
        {data.publications && data.publications.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Publications</h3>
            {data.publications.map((pub: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{pub.title}</p>
                <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                <p className="text-sm text-gray-700">Year: {pub.year}</p>
                {pub.links && pub.links.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Links:</p>
                    {pub.links.map((link: any, linkIndex: number) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold mb-3">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.dates}</p>
              <p className="text-sm">{edu.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// M2: Simplicity - Minimalist with a focus on typography
function MinimalSimplicityTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-600">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm mb-1">{data.personalInfo.email}</p>
          <p className="text-sm mb-1">{data.personalInfo.phone}</p>
          <p className="text-sm mb-1">{data.personalInfo.location}</p>
          {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Experience</h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{exp.title}</p>
              <p className="text-sm text-gray-800">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.location}</p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
        {data.projects && data.projects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Projects</h3>
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-gray-800">{project.technologies}</p>
                <p className="text-sm text-gray-500">{project.link}</p>
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        )}
        {data.publications && data.publications.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Publications</h3>
            {data.publications.map((pub: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{pub.title}</p>
                <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                <p className="text-sm text-gray-700">Year: {pub.year}</p>
                {pub.links && pub.links.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Links:</p>
                    {pub.links.map((link: any, linkIndex: number) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold mb-3">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.dates}</p>
              <p className="text-sm">{edu.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// M3: Essentials - Focus on key information
function MinimalEssentialsTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-600">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm mb-1">{data.personalInfo.email}</p>
          <p className="text-sm mb-1">{data.personalInfo.phone}</p>
          <p className="text-sm mb-1">{data.personalInfo.location}</p>
          {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Experience</h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{exp.title}</p>
              <p className="text-sm text-gray-800">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.location}</p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
        {data.projects && data.projects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Projects</h3>
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-gray-800">{project.technologies}</p>
                <p className="text-sm text-gray-500">{project.link}</p>
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        )}
        {data.publications && data.publications.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Publications</h3>
            {data.publications.map((pub: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{pub.title}</p>
                <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                <p className="text-sm text-gray-700">Year: {pub.year}</p>
                {pub.links && pub.links.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Links:</p>
                    {pub.links.map((link: any, linkIndex: number) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold mb-3">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.dates}</p>
              <p className="text-sm">{edu.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// M4: Minimalist Pro - Clean lines and professional look
function MinimalMinimalistProTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-600">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm mb-1">{data.personalInfo.email}</p>
          <p className="text-sm mb-1">{data.personalInfo.phone}</p>
          <p className="text-sm mb-1">{data.personalInfo.location}</p>
          {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Experience</h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{exp.title}</p>
              <p className="text-sm text-gray-800">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.location}</p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
        {data.projects && data.projects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Projects</h3>
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-gray-800">{project.technologies}</p>
                <p className="text-sm text-gray-500">{project.link}</p>
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        )}
        {data.publications && data.publications.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Publications</h3>
            {data.publications.map((pub: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{pub.title}</p>
                <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                <p className="text-sm text-gray-700">Year: {pub.year}</p>
                {pub.links && pub.links.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Links:</p>
                    {pub.links.map((link: any, linkIndex: number) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold mb-3">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.dates}</p>
              <p className="text-sm">{edu.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// M5: Whitespace - Emphasizes whitespace and readability
function MinimalWhitespaceTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-600">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm mb-1">{data.personalInfo.email}</p>
          <p className="text-sm mb-1">{data.personalInfo.phone}</p>
          <p className="text-sm mb-1">{data.personalInfo.location}</p>
          {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Experience</h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{exp.title}</p>
              <p className="text-sm text-gray-800">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.location}</p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
        {data.projects && data.projects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Projects</h3>
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-gray-800">{project.technologies}</p>
                <p className="text-sm text-gray-500">{project.link}</p>
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        )}
        {data.publications && data.publications.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Publications</h3>
            {data.publications.map((pub: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{pub.title}</p>
                <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                <p className="text-sm text-gray-700">Year: {pub.year}</p>
                {pub.links && pub.links.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Links:</p>
                    {pub.links.map((link: any, linkIndex: number) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold mb-3">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.dates}</p>
              <p className="text-sm">{edu.location}</p>
            </div>
          ))}
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

// E1: Leadership - Strong and authoritative
function ExecutiveLeadershipTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-gray-900 text-white">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-400">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm mb-1">{data.personalInfo.email}</p>
          <p className="text-sm mb-1">{data.personalInfo.phone}</p>
          <p className="text-sm mb-1">{data.personalInfo.location}</p>
          {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Experience</h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{exp.title}</p>
              <p className="text-sm text-gray-400">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.location}</p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
        {data.projects && data.projects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Projects</h3>
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-gray-400">{project.technologies}</p>
                <p className="text-sm text-gray-500">{project.link}</p>
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        )}
        {data.publications && data.publications.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Publications</h3>
            {data.publications.map((pub: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{pub.title}</p>
                <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                <p className="text-sm text-gray-700">Year: {pub.year}</p>
                {pub.links && pub.links.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Links:</p>
                    {pub.links.map((link: any, linkIndex: number) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold mb-3">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.dates}</p>
              <p className="text-sm">{edu.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// E2: C-Suite - Sophisticated and elegant
function ExecutiveCSuiteTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-indigo-900 text-white">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-400">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm mb-1">{data.personalInfo.email}</p>
          <p className="text-sm mb-1">{data.personalInfo.phone}</p>
          <p className="text-sm mb-1">{data.personalInfo.location}</p>
          {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Experience</h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{exp.title}</p>
              <p className="text-sm text-gray-400">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.location}</p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
        {data.projects && data.projects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Projects</h3>
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-gray-400">{project.technologies}</p>
                <p className="text-sm text-gray-500">{project.link}</p>
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        )}
        {data.publications && data.publications.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Publications</h3>
            {data.publications.map((pub: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{pub.title}</p>
                <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                <p className="text-sm text-gray-700">Year: {pub.year}</p>
                {pub.links && pub.links.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Links:</p>
                    {pub.links.map((link: any, linkIndex: number) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold mb-3">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.dates}</p>
              <p className="text-sm">{edu.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// E3: Director - Focused on leadership and achievements
function ExecutiveDirectorTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-teal-900 text-white">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-400">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm mb-1">{data.personalInfo.email}</p>
          <p className="text-sm mb-1">{data.personalInfo.phone}</p>
          <p className="text-sm mb-1">{data.personalInfo.location}</p>
          {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Experience</h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{exp.title}</p>
              <p className="text-sm text-gray-400">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.location}</p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
        {data.projects && data.projects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Projects</h3>
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-gray-400">{project.technologies}</p>
                <p className="text-sm text-gray-500">{project.link}</p>
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        )}
        {data.publications && data.publications.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Publications</h3>
            {data.publications.map((pub: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{pub.title}</p>
                <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                <p className="text-sm text-gray-700">Year: {pub.year}</p>
                {pub.links && pub.links.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Links:</p>
                    {pub.links.map((link: any, linkIndex: number) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold mb-3">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.dates}</p>
              <p className="text-sm">{edu.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// E4: Board Member - Emphasizes experience and qualifications
function ExecutiveBoardMemberTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-blue-900 text-white">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-400">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm mb-1">{data.personalInfo.email}</p>
          <p className="text-sm mb-1">{data.personalInfo.phone}</p>
          <p className="text-sm mb-1">{data.personalInfo.location}</p>
          {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Experience</h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{exp.title}</p>
              <p className="text-sm text-gray-400">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.location}</p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
        {data.projects && data.projects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Projects</h3>
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-gray-400">{project.technologies}</p>
                <p className="text-sm text-gray-500">{project.link}</p>
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        )}
        {data.publications && data.publications.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Publications</h3>
            {data.publications.map((pub: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{pub.title}</p>
                <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                <p className="text-sm text-gray-700">Year: {pub.year}</p>
                {pub.links && pub.links.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Links:</p>
                    {pub.links.map((link: any, linkIndex: number) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold mb-3">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.dates}</p>
              <p className="text-sm">{edu.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// E5: Executive Elite - Premium design with a focus on achievements
function ExecutiveEliteTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-black text-white">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold">{data.personalInfo.name}</h2>
        <p className="text-xl text-gray-400">{data.personalInfo.title}</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm mb-1">{data.personalInfo.email}</p>
          <p className="text-sm mb-1">{data.personalInfo.phone}</p>
          <p className="text-sm mb-1">{data.personalInfo.location}</p>
          {data.personalInfo.linkedin && <p className="text-sm">{data.personalInfo.linkedin}</p>}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Experience</h3>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{exp.title}</p>
              <p className="text-sm text-gray-400">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.location}</p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
        {data.projects && data.projects.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Projects</h3>
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-gray-400">{project.technologies}</p>
                <p className="text-sm text-gray-500">{project.link}</p>
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        )}
        {data.publications && data.publications.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Publications</h3>
            {data.publications.map((pub: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{pub.title}</p>
                <p className="text-sm text-gray-700">Authors: {pub.authors}</p>
                <p className="text-sm text-gray-700">Journal: {pub.journal}</p>
                <p className="text-sm text-gray-700">Year: {pub.year}</p>
                {pub.links && pub.links.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Links:</p>
                    {pub.links.map((link: any, linkIndex: number) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        {link.type}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold mb-3">Education</h3>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.dates}</p>
              <p className="text-sm">{edu.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
