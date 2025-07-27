"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Download,
  Eye,
  Code,
  Stethoscope,
  Wrench,
  BarChart3,
  Palette,
  GraduationCap,
  Scale,
  FileText,
  Zap,
} from "lucide-react"

export default function ProfessionalTemplatesPage() {
  const router = useRouter()
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null)

  const professions = [
    {
      id: "software-developer",
      name: "Software Developer",
      icon: Code,
      description: "Full-stack developer with expertise in modern web technologies",
      skills: ["React", "Node.js", "Python", "AWS", "Docker"],
      experience: "5+ years",
    },
    {
      id: "research-scientist",
      name: "Research Scientist",
      icon: Zap,
      description: "PhD researcher specializing in machine learning and data science",
      skills: ["Python", "TensorFlow", "Research", "Statistics", "Publications"],
      experience: "8+ years",
    },
    {
      id: "mechanical-engineer",
      name: "Mechanical Engineer",
      icon: Wrench,
      description: "Design engineer with expertise in CAD and manufacturing processes",
      skills: ["AutoCAD", "SolidWorks", "Manufacturing", "Project Management", "Quality Control"],
      experience: "6+ years",
    },
    {
      id: "business-analyst",
      name: "Business Analyst",
      icon: BarChart3,
      description: "Strategic analyst with strong background in data analysis and process improvement",
      skills: ["SQL", "Tableau", "Process Mapping", "Requirements Analysis", "Agile"],
      experience: "4+ years",
    },
    {
      id: "graphic-designer",
      name: "Graphic Designer",
      icon: Palette,
      description: "Creative designer specializing in brand identity and digital design",
      skills: ["Adobe Creative Suite", "Figma", "Branding", "UI/UX", "Typography"],
      experience: "7+ years",
    },
    {
      id: "school-teacher",
      name: "School Teacher",
      icon: GraduationCap,
      description: "Dedicated educator with expertise in curriculum development and student engagement",
      skills: ["Curriculum Design", "Classroom Management", "Educational Technology", "Assessment", "Mentoring"],
      experience: "10+ years",
    },
    {
      id: "general-physician",
      name: "General Physician",
      icon: Stethoscope,
      description: "Board-certified physician with comprehensive primary care experience",
      skills: ["Primary Care", "Diagnosis", "Patient Care", "Medical Records", "Emergency Medicine"],
      experience: "12+ years",
    },
    {
      id: "advocate-lawyer",
      name: "Advocate (Lawyer)",
      icon: Scale,
      description: "Experienced attorney specializing in corporate law and litigation",
      skills: ["Corporate Law", "Litigation", "Contract Negotiation", "Legal Research", "Client Relations"],
      experience: "9+ years",
    },
    {
      id: "journalist",
      name: "Journalist",
      icon: FileText,
      description: "Investigative journalist with expertise in digital media and storytelling",
      skills: ["Investigative Reporting", "Digital Media", "Content Writing", "Interviewing", "Fact-checking"],
      experience: "6+ years",
    },
    {
      id: "radiologist",
      name: "Radiologist",
      icon: Zap,
      description: "Board-certified radiologist specializing in diagnostic imaging",
      skills: ["Medical Imaging", "Diagnostic Radiology", "PACS", "CT/MRI", "Interventional Procedures"],
      experience: "15+ years",
    },
  ]

  const handleBackToTemplates = () => {
    router.push("/templates")
  }

  const handleViewResume = (professionId: string) => {
    setSelectedProfession(professionId)
  }

  const handleUseTemplate = (professionId: string) => {
    router.push(`/create-resume?template=${professionId}`)
  }

  const renderResumePreview = (profession: any) => {
    switch (profession.id) {
      case "software-developer":
        return (
          <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto border-l-4 border-gray-800">
            {/* Minimal Header */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Alex Johnson</h1>
                  <h2 className="text-xl text-gray-600 mb-4">Software Developer</h2>
                </div>
                <div className="text-right text-sm text-gray-600 space-y-1">
                  <p>alex.johnson@email.com</p>
                  <p>(555) 123-4567</p>
                  <p>github.com/alexjohnson</p>
                  <p>linkedin.com/in/alexjohnson</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Two Column Layout */}
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 space-y-8">
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Technical Stack</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Frontend</h4>
                          <p className="text-gray-700 text-sm">JavaScript, TypeScript, React, Next.js, Tailwind CSS</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Backend</h4>
                          <p className="text-gray-700 text-sm">Node.js, Python, Express, Django, PostgreSQL</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Tools & Cloud</h4>
                          <p className="text-gray-700 text-sm">Docker, AWS, Git, Jenkins, Kubernetes</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Databases</h4>
                          <p className="text-gray-700 text-sm">PostgreSQL, MongoDB, Redis, MySQL</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Experience</h3>
                    <div className="space-y-6">
                      <div className="border-l-2 border-gray-300 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900">Senior Software Developer</h4>
                            <p className="text-gray-600">TechCorp Solutions</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">2021 - Present</span>
                        </div>
                        <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                          <li>Developed and maintained web applications serving 100k+ users</li>
                          <li>Led migration from monolithic to microservices architecture</li>
                          <li>Reduced application load time by 40% through optimization</li>
                          <li>Mentored 3 junior developers and conducted code reviews</li>
                        </ul>
                      </div>
                      <div className="border-l-2 border-gray-300 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900">Software Developer</h4>
                            <p className="text-gray-600">StartupXYZ</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">2019 - 2021</span>
                        </div>
                        <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                          <li>Built full-stack web applications using React and Node.js</li>
                          <li>Implemented RESTful APIs and database design</li>
                          <li>Collaborated with cross-functional teams in Agile environment</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Featured Projects</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-1">E-Commerce Platform</h4>
                        <p className="text-xs text-gray-500 mb-2">React, Node.js, PostgreSQL, Stripe</p>
                        <p className="text-gray-700 text-sm">
                          Full-stack e-commerce solution with payment processing and admin dashboard
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-1">Real-time Chat Application</h4>
                        <p className="text-xs text-gray-500 mb-2">Socket.io, Express, MongoDB</p>
                        <p className="text-gray-700 text-sm">
                          Scalable messaging app with user authentication and file sharing
                        </p>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Education</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900">B.S. Computer Science</h4>
                      <p className="text-gray-600 text-sm">UC Berkeley</p>
                      <p className="text-gray-500 text-xs">2019 • GPA: 3.8/4.0</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Certifications</h3>
                    <div className="space-y-3">
                      <div className="border border-gray-200 p-3 rounded">
                        <h4 className="font-semibold text-sm text-gray-900">AWS Solutions Architect</h4>
                        <p className="text-xs text-gray-500">Valid until 2025</p>
                      </div>
                      <div className="border border-gray-200 p-3 rounded">
                        <h4 className="font-semibold text-sm text-gray-900">Google Cloud Professional</h4>
                        <p className="text-xs text-gray-500">Valid until 2024</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">GitHub</h3>
                    <div className="text-center space-y-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">150+</div>
                        <div className="text-xs text-gray-600">Repositories</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">2.5k</div>
                        <div className="text-xs text-gray-600">Contributions</div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )

      case "research-scientist":
        return (
          <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
            {/* Academic Header with Sidebar */}
            <div className="flex">
              <div className="w-1/4 bg-gray-100 p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-gray-600">
                    SC
                  </div>
                  <h2 className="text-sm font-semibold text-gray-800">Research Scientist</h2>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Contact</h4>
                    <div className="space-y-1 text-gray-600">
                      <p>s.chen@university.edu</p>
                      <p>(555) 987-6543</p>
                      <p>ORCID: 0000-0000-0000-0000</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Publications:</span>
                        <span className="font-semibold">45</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Citations:</span>
                        <span className="font-semibold">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span>h-index:</span>
                        <span className="font-semibold">18</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Skills</h4>
                    <div className="space-y-1 text-gray-600">
                      <p>Python, R, MATLAB</p>
                      <p>PyTorch, TensorFlow</p>
                      <p>Statistical Analysis</p>
                      <p>Machine Learning</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-8">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Dr. Sarah Chen, Ph.D.</h1>
                  <p className="text-gray-600 mb-4">Machine Learning & AI Research</p>
                  <div className="flex flex-wrap gap-2">
                    {["Machine Learning", "Deep Neural Networks", "Computer Vision", "NLP"].map((interest) => (
                      <span key={interest} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Selected Publications</h3>
                    <div className="space-y-4">
                      <div className="pb-4 border-b border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          "Advanced Neural Networks for Predictive Analytics"
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">Nature Machine Intelligence, 2023 • Citations: 127</p>
                        <p className="text-xs text-gray-500">First Author • Impact Factor: 25.898</p>
                      </div>
                      <div className="pb-4 border-b border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          "Reinforcement Learning in Complex Environments"
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">ICML 2022 • Citations: 89</p>
                        <p className="text-xs text-gray-500">Co-Author • Acceptance Rate: 21.9%</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Research Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">Principal Research Scientist</h4>
                            <p className="text-gray-600">Stanford AI Lab</p>
                          </div>
                          <span className="text-sm text-gray-500">2020 - Present</span>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                          <li>Lead research team of 8 members on $2.5M NSF-funded project</li>
                          <li>Developed novel algorithms improving model accuracy by 23%</li>
                          <li>Published 12 peer-reviewed papers in top-tier conferences</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Education</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">Ph.D. Computer Science</h4>
                          <p className="text-gray-600">MIT</p>
                          <p className="text-xs text-gray-500">
                            Thesis: "Deep Learning for Sequential Decision Making"
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">2018</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">M.S. Computer Science</h4>
                          <p className="text-gray-600">Stanford University</p>
                        </div>
                        <span className="text-sm text-gray-500">2014</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )

      case "mechanical-engineer":
        return (
          <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
            {/* Professional Header */}
            <div className="bg-white border-b-4 border-gray-800 p-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Michael Rodriguez, P.E.</h1>
                <h2 className="text-xl text-gray-600 mb-4">Mechanical Engineer</h2>
                <div className="flex justify-center space-x-6 text-sm text-gray-600">
                  <span>m.rodriguez@engineering.com</span>
                  <span>(555) 456-7890</span>
                  <span>PE License: CA-ME-12345</span>
                  <span>linkedin.com/in/mrodriguez</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Skills Grid */}
              <section className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technical Expertise</h3>
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">CAD Software</h4>
                    <p className="text-sm text-gray-700">SolidWorks, AutoCAD, Inventor, CATIA</p>
                  </div>
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Analysis Tools</h4>
                    <p className="text-sm text-gray-700">ANSYS, MATLAB, LabVIEW, Simulink</p>
                  </div>
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Manufacturing</h4>
                    <p className="text-sm text-gray-700">CNC Machining, 3D Printing, Injection Molding</p>
                  </div>
                  <div className="text-center p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Management</h4>
                    <p className="text-sm text-gray-700">PMP, Lean Manufacturing, Six Sigma</p>
                  </div>
                </div>
              </section>

              {/* Experience Timeline */}
              <section className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                  <div className="space-y-8">
                    <div className="relative flex items-start">
                      <div className="absolute left-2 w-4 h-4 bg-gray-800 rounded-full"></div>
                      <div className="ml-12">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">Senior Mechanical Engineer</h4>
                            <p className="text-gray-600">Aerospace Dynamics Corp</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            2020 - Present
                          </span>
                        </div>
                        <ul className="text-gray-700 space-y-1 list-disc list-inside">
                          <li>Lead design and development of aircraft engine components</li>
                          <li>Managed $2M+ projects from concept to production</li>
                          <li>Reduced manufacturing costs by 15% through design optimization</li>
                          <li>Supervised team of 6 engineers and 3 technicians</li>
                        </ul>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="absolute left-2 w-4 h-4 bg-gray-600 rounded-full"></div>
                      <div className="ml-12">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">Mechanical Engineer</h4>
                            <p className="text-gray-600">Manufacturing Solutions Inc</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">2018 - 2020</span>
                        </div>
                        <ul className="text-gray-700 space-y-1 list-disc list-inside">
                          <li>Designed automated manufacturing equipment and tooling</li>
                          <li>Performed FEA analysis and thermal simulations</li>
                          <li>Collaborated with cross-functional teams on product development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bottom Grid */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Education</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900">B.S. Mechanical Engineering</h4>
                    <p className="text-gray-600">UC San Diego</p>
                    <p className="text-sm text-gray-500">2018 • Magna Cum Laude</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Certifications</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="font-semibold text-sm">Professional Engineer (P.E.)</h4>
                      <p className="text-xs text-gray-500">California - Active</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="font-semibold text-sm">Six Sigma Green Belt</h4>
                      <p className="text-xs text-gray-500">ASQ Certified</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Patents</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">• US Patent 11,234,567: "Improved Cooling System Design"</p>
                    <p className="text-gray-700">• US Patent 11,345,678: "Automated Assembly Method"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "business-analyst":
        return (
          <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto border-t-8 border-gray-800">
            {/* Clean Header */}
            <div className="p-8 text-center border-b border-gray-200">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Emily Davis</h1>
              <h2 className="text-xl text-gray-600 mb-4">Senior Business Analyst</h2>
              <p className="text-gray-600">emily.davis@business.com • (555) 567-8901 • linkedin.com/in/emilydavis</p>
            </div>

            <div className="p-8">
              {/* Competencies Cards */}
              <section className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Competencies</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
                    <h4 className="font-bold text-gray-900 mb-3">Analysis & Reporting</h4>
                    <p className="text-gray-700">SQL, Tableau, Power BI, Excel, Python</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
                    <h4 className="font-bold text-gray-900 mb-3">Process Improvement</h4>
                    <p className="text-gray-700">Lean Six Sigma, Process Mapping, Workflow Analysis</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
                    <h4 className="font-bold text-gray-900 mb-3">Requirements Management</h4>
                    <p className="text-gray-700">JIRA, Confluence, User Stories, UAT</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
                    <h4 className="font-bold text-gray-900 mb-3">Methodologies</h4>
                    <p className="text-gray-700">Agile, Scrum, Waterfall, BABOK</p>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                  <section className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h3>
                    <div className="space-y-6">
                      <div className="bg-white border border-gray-200 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">Senior Business Analyst</h4>
                            <p className="text-gray-600">Global Financial Services</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2021 - Present</span>
                        </div>
                        <ul className="text-gray-700 space-y-1 list-disc list-inside">
                          <li>Led digital transformation initiative saving $1.2M annually</li>
                          <li>Analyzed business processes and identified 25% efficiency improvements</li>
                          <li>Managed stakeholder requirements for 5 concurrent projects</li>
                          <li>Created executive dashboards and KPI reporting systems</li>
                        </ul>
                      </div>
                      <div className="bg-white border border-gray-200 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">Business Analyst</h4>
                            <p className="text-gray-600">TechStart Solutions</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2019 - 2021</span>
                        </div>
                        <ul className="text-gray-700 space-y-1 list-disc list-inside">
                          <li>Gathered and documented business requirements for software development</li>
                          <li>Facilitated workshops with cross-functional teams</li>
                          <li>Performed gap analysis and recommended solutions</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Projects</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-gray-600 pl-4">
                        <h4 className="font-bold text-gray-900">Customer Data Platform Implementation</h4>
                        <p className="text-sm text-gray-600 mb-1">Stakeholder Management, Requirements Analysis, UAT</p>
                        <p className="text-gray-700">
                          Led $2M project improving customer insights and reducing churn by 18%
                        </p>
                      </div>
                      <div className="border-l-4 border-gray-600 pl-4">
                        <h4 className="font-bold text-gray-900">Process Automation Initiative</h4>
                        <p className="text-sm text-gray-600 mb-1">Process Mapping, RPA, Change Management</p>
                        <p className="text-gray-700">Automated manual processes reducing processing time by 60%</p>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Education</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900">MBA - Business Analytics</h4>
                        <p className="text-gray-600">Northwestern Kellogg</p>
                        <p className="text-sm text-gray-500">2019</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900">B.S. Business Administration</h4>
                        <p className="text-gray-600">UC Berkeley</p>
                        <p className="text-sm text-gray-500">2017</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Certifications</h3>
                    <div className="space-y-2">
                      <div className="border border-gray-200 p-3 rounded">
                        <h4 className="font-semibold text-sm">CBAP</h4>
                        <p className="text-xs text-gray-500">IIBA Certified</p>
                      </div>
                      <div className="border border-gray-200 p-3 rounded">
                        <h4 className="font-semibold text-sm">Tableau Specialist</h4>
                        <p className="text-xs text-gray-500">Valid until 2024</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Impact Metrics</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span>Projects Led:</span>
                        <span className="font-bold text-xl">15+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cost Savings:</span>
                        <span className="font-bold text-xl">$3.2M</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Process Improvements:</span>
                        <span className="font-bold text-xl">40%</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )

      case "graphic-designer":
        return (
          <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto overflow-hidden">
            {/* Creative Header */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8">
              <div className="absolute top-0 right-0 w-32 h-32 border-4 border-white/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-white/20 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-2">Jordan Kim</h1>
                <h2 className="text-xl mb-4">Graphic Designer & Brand Strategist</h2>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span>jordan.kim@design.com</span>
                  <span>(555) 678-9012</span>
                  <span>behance.net/jordankim</span>
                  <span>dribbble.com/jordankim</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Portfolio Grid */}
              <section className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Work</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="w-full h-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-lg">
                      BRAND IDENTITY
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">TechStart Complete Rebrand</h4>
                    <p className="text-sm text-gray-600 mb-3">Brand Identity, Logo Design, Brand Guidelines</p>
                    <div className="flex gap-2">
                      <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">Branding</span>
                      <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">Logo Design</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="w-full h-32 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-lg">
                      UI/UX DESIGN
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">E-commerce Mobile App</h4>
                    <p className="text-sm text-gray-600 mb-3">UI/UX Design, Prototyping, User Testing</p>
                    <div className="flex gap-2">
                      <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">UI Design</span>
                      <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">UX Research</span>
                    </div>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                  <section className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Experience</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">Senior Graphic Designer</h4>
                            <p className="text-gray-600">Creative Agency Pro</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2020 - Present</span>
                        </div>
                        <ul className="text-gray-700 space-y-1 list-disc list-inside">
                          <li>Led rebranding projects for 15+ Fortune 500 companies</li>
                          <li>Increased client engagement by 45% through innovative design solutions</li>
                          <li>Managed design projects from concept to final delivery</li>
                          <li>Mentored 3 junior designers and established design system standards</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Design Expertise</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Software</h4>
                        <p className="text-gray-700 text-sm">Adobe Creative Suite, Figma, Sketch, InVision</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Specializations</h4>
                        <p className="text-gray-700 text-sm">Brand Identity, UI/UX Design, Print Design, Typography</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Web Technologies</h4>
                        <p className="text-gray-700 text-sm">HTML, CSS, JavaScript, WordPress, Webflow</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Print Production</h4>
                        <p className="text-gray-700 text-sm">Offset Printing, Digital Printing, Color Management</p>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Education</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900">BFA Graphic Design</h4>
                      <p className="text-gray-600">Art Institute of California</p>
                      <p className="text-sm text-gray-500">2018 • Summa Cum Laude</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Awards</h3>
                    <div className="space-y-3">
                      <div className="border-l-4 border-gray-600 pl-3">
                        <h4 className="font-semibold text-sm">Design Excellence Award</h4>
                        <p className="text-xs text-gray-500">American Design Association • 2023</p>
                      </div>
                      <div className="border-l-4 border-gray-600 pl-3">
                        <h4 className="font-semibold text-sm">Creative Innovation Prize</h4>
                        <p className="text-xs text-gray-500">International Design Festival • 2022</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Portfolio Stats</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">150+</div>
                        <div className="text-xs text-gray-600">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">50+</div>
                        <div className="text-xs text-gray-600">Clients</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">8</div>
                        <div className="text-xs text-gray-600">Awards</div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )

      case "school-teacher":
        return (
          <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
            {/* Educational Header */}
            <div className="bg-gray-50 border-b-2 border-gray-300 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Lisa Thompson, M.Ed.</h1>
                  <h2 className="text-xl text-gray-600 mb-4">Elementary School Teacher - 5th Grade</h2>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>l.thompson@school.edu • (555) 789-0123</p>
                    <p>Teaching License: CA-EL-56789</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h4 className="font-bold text-gray-900 mb-2">Teaching Excellence</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Experience:</span>
                        <span className="font-semibold">10+ years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Student Growth:</span>
                        <span className="font-semibold">+25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Parent Satisfaction:</span>
                        <span className="font-semibold">98%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Teaching Philosophy */}
              <section className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Teaching Philosophy</h3>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-600">
                  <p className="text-gray-700 italic text-lg leading-relaxed">
                    "Every child has unique potential waiting to be unlocked. I believe in creating an inclusive,
                    engaging learning environment where students feel safe to explore, question, and grow both
                    academically and personally."
                  </p>
                </div>
              </section>

              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                  <section className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Teaching Experience</h3>
                    <div className="space-y-6">
                      <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">5th Grade Teacher</h4>
                            <p className="text-gray-600">Lincoln Elementary School</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2018 - Present</span>
                        </div>
                        <ul className="text-gray-700 space-y-1 list-disc list-inside">
                          <li>Teach 28 students across all core subjects using differentiated instruction</li>
                          <li>Improved student reading scores by 25% through targeted interventions</li>
                          <li>Integrated technology and project-based learning into curriculum</li>
                          <li>Collaborate with parents and support staff to meet individual student needs</li>
                        </ul>
                      </div>
                      <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">3rd Grade Teacher</h4>
                            <p className="text-gray-600">Washington Elementary School</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2015 - 2018</span>
                        </div>
                        <ul className="text-gray-700 space-y-1 list-disc list-inside">
                          <li>Developed and implemented engaging lesson plans for diverse learners</li>
                          <li>Led school-wide literacy initiative improving reading comprehension</li>
                          <li>Mentored new teachers and student teachers</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Curriculum & Methods</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-2">Core Subjects</h4>
                        <p className="text-gray-700 text-sm">
                          Mathematics, English Language Arts, Science, Social Studies
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-2">Teaching Methods</h4>
                        <p className="text-gray-700 text-sm">
                          Differentiated Instruction, Project-Based Learning, Cooperative Learning
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-2">Assessment</h4>
                        <p className="text-gray-700 text-sm">
                          Formative Assessment, Standards-Based Grading, Portfolio Assessment
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-2">Technology</h4>
                        <p className="text-gray-700 text-sm">
                          Google Classroom, Interactive Whiteboards, Educational Apps
                        </p>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Education</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900">M.Ed. Curriculum & Instruction</h4>
                        <p className="text-gray-600">UCLA</p>
                        <p className="text-sm text-gray-500">2017</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900">B.A. Elementary Education</h4>
                        <p className="text-gray-600">Cal State Long Beach</p>
                        <p className="text-sm text-gray-500">2015 • Magna Cum Laude</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Credentials</h3>
                    <div className="space-y-2">
                      <div className="border border-gray-200 p-3 rounded">
                        <h4 className="font-semibold text-sm">Multiple Subject Teaching Credential</h4>
                        <p className="text-xs text-gray-500">California - Clear Credential</p>
                      </div>
                      <div className="border border-gray-200 p-3 rounded">
                        <h4 className="font-semibold text-sm">English Learner Authorization</h4>
                        <p className="text-xs text-gray-500">CLAD Certified</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Leadership</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm">Grade Level Team Leader</h4>
                        <p className="text-xs text-gray-500">2020 - Present</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Literacy Coach</h4>
                        <p className="text-xs text-gray-500">2019 - 2021</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Student Teacher Mentor</h4>
                        <p className="text-xs text-gray-500">2017 - Present</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Awards</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">• Teacher of the Year (2022)</p>
                      <p className="text-gray-700">• Excellence in Education Award (2021)</p>
                      <p className="text-gray-700">• Innovation in Teaching Grant</p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )

      case "advocate-lawyer":
        return (
          <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
            {/* Legal Header */}
            <div className="border-b-4 border-gray-900 p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Amanda Foster, Esq.</h1>
                  <h2 className="text-xl text-gray-600 mb-4">Corporate Attorney & Legal Counsel</h2>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>a.foster@lawfirm.com • (555) 890-1234</p>
                    <p>Bar Admissions: California, New York</p>
                    <p>linkedin.com/in/amandafoster</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Legal Excellence</h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">85%</span>
                        <p className="text-gray-600">Cases Won</p>
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-gray-900">$1B+</span>
                        <p className="text-gray-600">Client Value</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Practice Areas */}
              <section className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Areas of Practice</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Corporate Law</h4>
                    <p className="text-xs text-gray-700">M&A, Securities, Governance</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Litigation</h4>
                    <p className="text-xs text-gray-700">Commercial, Employment</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">IP Law</h4>
                    <p className="text-xs text-gray-700">Patents, Trademarks</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Compliance</h4>
                    <p className="text-xs text-gray-700">SEC, Regulatory</p>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-4 gap-8">
                <div className="col-span-3">
                  <section className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h3>
                    <div className="space-y-6">
                      <div className="border border-gray-300 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">Senior Associate</h4>
                            <p className="text-gray-600">Morrison & Associates LLP</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2020 - Present</span>
                        </div>
                        <ul className="text-gray-700 space-y-1 list-disc list-inside">
                          <li>Lead counsel on M&A transactions totaling $500M+ in value</li>
                          <li>Successfully defended Fortune 500 client in $50M commercial litigation</li>
                          <li>Advised startups on corporate structure and securities compliance</li>
                          <li>Managed team of 4 junior associates and paralegals</li>
                        </ul>
                      </div>
                      <div className="border border-gray-300 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">Associate Attorney</h4>
                            <p className="text-gray-600">Global Law Partners</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2017 - 2020</span>
                        </div>
                        <ul className="text-gray-700 space-y-1 list-disc list-inside">
                          <li>Represented clients in complex commercial litigation matters</li>
                          <li>Drafted and negotiated commercial contracts and agreements</li>
                          <li>Conducted legal research and prepared memoranda</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Notable Cases</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-600">
                        <h4 className="font-bold text-gray-900">TechCorp Acquisition</h4>
                        <p className="text-sm text-gray-600 mb-1">M&A Transaction • $250M Value</p>
                        <p className="text-gray-700 text-sm">
                          Led due diligence and negotiation for strategic acquisition
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-600">
                        <h4 className="font-bold text-gray-900">IP Dispute Defense</h4>
                        <p className="text-sm text-gray-600 mb-1">Federal Court • Patent Infringement</p>
                        <p className="text-gray-700 text-sm">Successfully defended client against $25M patent claim</p>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Education</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900">J.D. Law</h4>
                        <p className="text-gray-600">Yale Law School</p>
                        <p className="text-sm text-gray-500">2017 • Magna Cum Laude</p>
                        <p className="text-xs text-gray-500">Yale Law Journal, Editor</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900">B.A. Political Science</h4>
                        <p className="text-gray-600">Harvard University</p>
                        <p className="text-sm text-gray-500">2014 • Summa Cum Laude</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Bar Admissions</h3>
                    <div className="space-y-2">
                      <div className="border border-gray-200 p-3 rounded">
                        <h4 className="font-semibold text-sm">California State Bar</h4>
                        <p className="text-xs text-gray-500">Admitted 2017 • Active</p>
                      </div>
                      <div className="border border-gray-200 p-3 rounded">
                        <h4 className="font-semibold text-sm">New York State Bar</h4>
                        <p className="text-xs text-gray-500">Admitted 2018 • Active</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recognition</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">• Super Lawyers Rising Star (2023)</p>
                      <p className="text-gray-700">• Best Lawyers Under 40 (2022)</p>
                      <p className="text-gray-700">• Pro Bono Service Award (2021)</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Publications</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">
                        "Corporate Governance in Digital Age" - Harvard Business Law Review
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )

      case "journalist":
        return (
          <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
            {/* Media Header */}
            <div className="bg-gray-50 p-8 border-l-8 border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">David Martinez</h1>
                  <h2 className="text-xl text-gray-600 mb-4">Investigative Journalist & Senior Reporter</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>d.martinez@newsnetwork.com</span>
                    <span>(555) 901-2345</span>
                    <span>twitter.com/davidmartinez</span>
                    <span>davidmartinez.com</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h4 className="font-bold text-gray-900 mb-2 text-center">Impact</h4>
                  <div className="grid grid-cols-2 gap-4 text-center text-sm">
                    <div>
                      <div className="text-xl font-bold text-gray-900">500+</div>
                      <div className="text-gray-600">Articles</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">25</div>
                      <div className="text-gray-600">Investigations</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">8</div>
                      <div className="text-gray-600">Policy Changes</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">3</div>
                      <div className="text-gray-600">Awards</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Beat Coverage */}
              <section className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Politics",
                    "Government",
                    "Public Policy",
                    "Investigative Reporting",
                    "Data Analysis",
                    "Corporate Accountability",
                  ].map((area) => (
                    <span key={area} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                  <section className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Major Investigations</h3>
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-700">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">"City Hall Corruption Exposed"</h4>
                        <p className="text-sm text-gray-600 mb-2">Investigative Series • 6 months • 2023</p>
                        <p className="text-gray-700 mb-3">
                          Uncovered $5M embezzlement scheme leading to 3 arrests and policy reform
                        </p>
                        <div className="flex gap-2">
                          <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">FOIA Requests</span>
                          <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">Data Analysis</span>
                          <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">
                            Source Development
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-700">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          "Corporate Tax Avoidance Investigation"
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">Data Journalism • Collaboration • 2022</p>
                        <p className="text-gray-700 mb-3">
                          Analyzed 10,000+ documents revealing corporate tax loopholes
                        </p>
                        <div className="flex gap-2">
                          <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">Document Analysis</span>
                          <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">Financial Records</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h3>
                    <div className="space-y-4">
                      <div className="border border-gray-200 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">Senior Investigative Reporter</h4>
                            <p className="text-gray-600">National News Network</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2020 - Present</span>
                        </div>
                        <ul className="text-gray-700 space-y-1 list-disc list-inside">
                          <li>Lead investigative team covering government corruption and corporate malfeasance</li>
                          <li>Published 25+ investigative pieces resulting in policy changes</li>
                          <li>Broke major story on municipal contract fraud saving taxpayers $2M</li>
                          <li>Mentored 3 junior reporters and freelance contributors</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Media & Publications</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-2">Articles Published</h4>
                        <p className="text-gray-700 text-sm">500+ articles across print and digital platforms</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-2">Podcast Host</h4>
                        <p className="text-gray-700 text-sm">"Inside Politics" - 50k+ downloads weekly</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-2">TV Appearances</h4>
                        <p className="text-gray-700 text-sm">CNN, MSNBC, Local News - Political Analysis</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-2">Speaking Engagements</h4>
                        <p className="text-gray-700 text-sm">Journalism conferences and university lectures</p>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Education</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900">M.A. Journalism</h4>
                        <p className="text-gray-600">Columbia Journalism School</p>
                        <p className="text-sm text-gray-500">2018</p>
                        <p className="text-xs text-gray-500">Investigative Reporting Concentration</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900">B.A. Political Science</h4>
                        <p className="text-gray-600">UC Berkeley</p>
                        <p className="text-sm text-gray-500">2016 • Cum Laude</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Awards</h3>
                    <div className="space-y-3">
                      <div className="border-l-4 border-gray-600 pl-3">
                        <h4 className="font-semibold text-sm">Regional Emmy Award</h4>
                        <p className="text-xs text-gray-500">Outstanding Investigative Reporting • 2023</p>
                      </div>
                      <div className="border-l-4 border-gray-600 pl-3">
                        <h4 className="font-semibold text-sm">Press Club Award</h4>
                        <p className="text-xs text-gray-500">Best Investigative Series • 2022</p>
                      </div>
                      <div className="border-l-4 border-gray-600 pl-3">
                        <h4 className="font-semibold text-sm">SPJ Excellence Award</h4>
                        <p className="text-xs text-gray-500">Society of Professional Journalists • 2021</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Technical Skills</h3>
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Research Tools</h4>
                        <p className="text-gray-700 text-sm">LexisNexis, Westlaw, Public Records</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Data Analysis</h4>
                        <p className="text-gray-700 text-sm">Excel, Google Sheets, Basic SQL</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Digital Tools</h4>
                        <p className="text-gray-700 text-sm">WordPress, Social Media, Audio Editing</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Languages</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-700">• English (Native)</p>
                      <p className="text-gray-700">• Spanish (Fluent)</p>
                      <p className="text-gray-700">• Portuguese (Conversational)</p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )

      case "radiologist":
        return (
          <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
            {/* Medical Header with Sidebar */}
            <div className="flex">
              <div className="w-1/3 bg-gray-900 text-white p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-gray-900">
                    JL
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Dr. Jennifer Lee, MD</h1>
                  <h2 className="text-lg text-gray-300">Board-Certified Radiologist</h2>
                </div>

                <div className="space-y-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Contact Information</h4>
                    <div className="space-y-2 text-gray-300">
                      <p>j.lee@radiology.com</p>
                      <p>(555) 012-3456</p>
                      <p>Medical License: CA-RAD-78901</p>
                      <p>NPI: 9876543210</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Board Certifications</h4>
                    <div className="space-y-2 text-gray-300">
                      <p>• Diagnostic Radiology (ABR)</p>
                      <p>• Neuroradiology Subspecialty</p>
                      <p>• California Medical License</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Clinical Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Studies/Year:</span>
                        <span className="font-semibold text-white">15,000+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Accuracy Rate:</span>
                        <span className="font-semibold text-white">99.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Turnaround:</span>
                        <span className="font-semibold text-white">&lt; 2 hrs</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Technology Systems</h4>
                    <div className="space-y-1 text-gray-300">
                      <p>• PACS Integration</p>
                      <p>• RIS Management</p>
                      <p>• DICOM Standards</p>
                      <p>• AI-Assisted Diagnosis</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-8">
                <section className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Subspecialty Expertise</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">Diagnostic Imaging</h4>
                      <p className="text-gray-700 text-sm">CT, MRI, Ultrasound, X-ray, Mammography</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">Interventional Radiology</h4>
                      <p className="text-gray-700 text-sm">Angiography, Biopsy, Drainage Procedures</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">Neuroradiology</h4>
                      <p className="text-gray-700 text-sm">Brain MRI, Spine Imaging, Stroke Protocol</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">Cardiac Imaging</h4>
                      <p className="text-gray-700 text-sm">Cardiac CT, MRI, Coronary Assessment</p>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-gray-600 pl-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">Attending Radiologist</h4>
                          <p className="text-gray-600">University Medical Center</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2019 - Present</span>
                      </div>
                      <ul className="text-gray-700 space-y-1 list-disc list-inside">
                        <li>Interpret 15,000+ imaging studies annually across all modalities</li>
                        <li>Lead multidisciplinary tumor board meetings and case conferences</li>
                        <li>Supervise radiology residents and medical students</li>
                        <li>Maintain 99.2% diagnostic accuracy rate with peer review</li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-gray-400 pl-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">Chief Resident</h4>
                          <p className="text-gray-600">Stanford Medical Center</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2018 - 2019</span>
                      </div>
                      <ul className="text-gray-700 space-y-1 list-disc list-inside">
                        <li>Led resident education program and quality improvement initiatives</li>
                        <li>Coordinated on-call schedules for 20+ residents</li>
                        <li>Implemented new PACS workflow improving efficiency by 20%</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Medical Education</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900">Fellowship - Neuroradiology</h4>
                        <p className="text-gray-600">UCSF Medical Center</p>
                      </div>
                      <span className="text-sm text-gray-500">2019</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900">Residency - Diagnostic Radiology</h4>
                        <p className="text-gray-600">Stanford Medical Center</p>
                      </div>
                      <span className="text-sm text-gray-500">2015 - 2019</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900">Doctor of Medicine (MD)</h4>
                        <p className="text-gray-600">Johns Hopkins School of Medicine</p>
                        <p className="text-xs text-gray-500">Alpha Omega Alpha Honor Society</p>
                      </div>
                      <span className="text-sm text-gray-500">2015</span>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Research & Publications</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">"AI-Assisted Diagnosis in Emergency Radiology"</h4>
                      <p className="text-sm text-gray-600">Radiology Journal • 2023 • First Author</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">"Advanced MRI Techniques in Stroke Evaluation"</h4>
                      <p className="text-sm text-gray-600">Neuroradiology • 2022 • Co-Author</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">"Cardiac CT in Emergency Department Settings"</h4>
                      <p className="text-sm text-gray-600">Emergency Radiology • 2021 • First Author</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Hospital Affiliations</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">University Medical Center</h4>
                      <p className="text-gray-600 text-sm">Attending Staff</p>
                      <p className="text-gray-500 text-sm">Active Staff</p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">Regional Hospital Network</h4>
                      <p className="text-gray-600 text-sm">Consulting Radiologist</p>
                      <p className="text-gray-500 text-sm">Courtesy Staff</p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">Emergency Imaging Center</h4>
                      <p className="text-gray-600 text-sm">On-call Coverage</p>
                      <p className="text-gray-500 text-sm">24/7 Availability</p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900">Professional Memberships</h4>
                      <p className="text-gray-600 text-sm">RSNA, ACR, ASNR, SCCT</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )

      case "general-physician":
        return (
          <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
            {/* Medical Header */}
            <div className="bg-gradient-to-r from-white to-gray-50 p-8 border-b-2 border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Dr. Robert Wilson, MD</h1>
                    <h2 className="text-xl text-gray-600 mb-3">Board-Certified Family Medicine Physician</h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>dr.wilson@healthcenter.com</span>
                      <span>(555) 234-5678</span>
                      <span>Medical License: CA123456</span>
                      <span>NPI: 1234567890</span>
                    </div>
                  </div>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
                  <h4 className="font-bold text-gray-900 mb-2">Patient Care Excellence</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">2,000+</div>
                      <div className="text-gray-600">Active Patients</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">98%</div>
                      <div className="text-gray-600">Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">15</div>
                      <div className="text-gray-600">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">24/7</div>
                      <div className="text-gray-600">On-Call</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Medical Specializations */}
              <section className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Medical Specializations</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <h4 className="font-bold text-gray-900 mb-3">Primary Care</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Preventive Medicine</li>
                      <li>• Chronic Disease Management</li>
                      <li>• Health Screenings</li>
                      <li>• Wellness Programs</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <h4 className="font-bold text-gray-900 mb-3">Emergency Care</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Acute Care Management</li>
                      <li>• Trauma Assessment</li>
                      <li>• Critical Care</li>
                      <li>• Emergency Procedures</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <h4 className="font-bold text-gray-900 mb-3">Family Medicine</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Pediatric Care</li>
                      <li>• Geriatric Medicine</li>
                      <li>• Women's Health</li>
                      <li>• Mental Health</li>
                    </ul>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                  <section className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Clinical Experience</h3>
                    <div className="space-y-6">
                      <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">Attending Physician</h4>
                            <p className="text-gray-600">City General Hospital - Family Medicine</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2018 - Present</span>
                        </div>
                        <ul className="text-gray-700 space-y-1 list-disc list-inside">
                          <li>Provide comprehensive primary care to 2,000+ patients</li>
                          <li>Manage complex chronic conditions including diabetes, hypertension</li>
                          <li>Supervise medical residents and nurse practitioners</li>
                          <li>Maintain 98% patient satisfaction rating</li>
                        </ul>
                      </div>
                      <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">Chief Resident</h4>
                            <p className="text-gray-600">University Medical Center</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2017 - 2018</span>
                        </div>
                        <ul className="text-gray-700 space-y-1 list-disc list-inside">
                          <li>Led team of 12 residents in family medicine program</li>
                          <li>Coordinated patient care across multiple departments</li>
                          <li>Implemented quality improvement initiatives</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Hospital Affiliations</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">City General Hospital</h4>
                        <p className="text-gray-600 text-sm">Attending Physician</p>
                        <p className="text-gray-500 text-sm">Active Staff</p>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">Regional Medical Center</h4>
                        <p className="text-gray-600 text-sm">Consulting Physician</p>
                        <p className="text-gray-500 text-sm">Courtesy Staff</p>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">Community Health Clinic</h4>
                        <p className="text-gray-600 text-sm">Volunteer Physician</p>
                        <p className="text-gray-500 text-sm">Pro Bono Services</p>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">Emergency Department</h4>
                        <p className="text-gray-600 text-sm">On-Call Coverage</p>
                        <p className="text-gray-500 text-sm">24/7 Availability</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Publications & Research</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-600">
                        <h4 className="font-semibold text-gray-900">"Preventive Care in Primary Practice"</h4>
                        <p className="text-sm text-gray-600">Journal of Family Medicine, 2023</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-600">
                        <h4 className="font-semibold text-gray-900">"Managing Diabetes in Rural Communities"</h4>
                        <p className="text-sm text-gray-600">American Family Physician, 2022</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-600">
                        <h4 className="font-semibold text-gray-900">"Telemedicine in Post-Pandemic Healthcare"</h4>
                        <p className="text-sm text-gray-600">Primary Care Medicine Review, 2021</p>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Medical Education</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900">Doctor of Medicine (MD)</h4>
                        <p className="text-gray-600">Harvard Medical School</p>
                        <p className="text-sm text-gray-500">2012 • Magna Cum Laude</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900">Residency Training</h4>
                        <p className="text-gray-600">Family Medicine</p>
                        <p className="text-sm text-gray-500">University Medical Center • 2015</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Licenses & Certifications</h3>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">Medical License</h4>
                        <p className="text-xs text-gray-600">California - Active</p>
                        <p className="text-xs text-gray-500">Expires: 2025</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">Board Certification</h4>
                        <p className="text-xs text-gray-600">Family Medicine</p>
                        <p className="text-xs text-gray-500">ABFM Certified</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">ACLS Certification</h4>
                        <p className="text-xs text-gray-600">Advanced Cardiac Life Support</p>
                        <p className="text-xs text-gray-500">Valid until 2024</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">BLS Certification</h4>
                        <p className="text-xs text-gray-600">Basic Life Support</p>
                        <p className="text-xs text-gray-500">Valid until 2024</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Professional Memberships</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-700">• American Academy of Family Physicians</p>
                      <p className="text-gray-700">• American Medical Association</p>
                      <p className="text-gray-700">• California Medical Association</p>
                      <p className="text-gray-700">• Society of Teachers of Family Medicine</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Community Service</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">• Free Clinic Volunteer (5 years)</p>
                      <p className="text-gray-700">• Medical Mission Trips (3 countries)</p>
                      <p className="text-gray-700">• Health Education Speaker</p>
                      <p className="text-gray-700">• Medical Student Mentor</p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Professional Resume Template</h1>
            <p>Template for {profession.name} coming soon...</p>
          </div>
        )
    }
  }

  if (selectedProfession) {
    const profession = professions.find((p) => p.id === selectedProfession)
    if (!profession) return null

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="mb-6 flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedProfession(null)} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Templates
            </Button>
            
          </div>

          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">{profession.name} Resume Template</h1>
            <p className="text-gray-600">Professional resume template with industry-specific content</p>
          </div>

          {renderResumePreview(profession)}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="mb-6">
        <Button variant="outline" onClick={handleBackToTemplates} className="flex items-center gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Back to Templates
        </Button>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Professional Resume References</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore high-quality resume templates tailored for specific professions. Each template includes
          industry-relevant content, skills, and formatting to help you create a standout resume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {professions.map((profession) => {
          const IconComponent = profession.icon
          return (
            <Card
              key={profession.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gray-700 text-white">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{profession.name}</CardTitle>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{profession.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-700">Experience:</span>
                    <Badge variant="secondary" className="text-xs">
                      {profession.experience}
                    </Badge>
                  </div>
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-700 block mb-2">Key Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {profession.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {profession.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{profession.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewResume(profession.id)}
                    className="flex-1 flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

    </div>
  )
}
