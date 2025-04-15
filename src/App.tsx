import React, { useState } from 'react';
import { Search, BookOpen, Briefcase, Map, FileText, Menu, X } from 'lucide-react';

type Feature = 'dsa' | 'requirements' | 'roadmap' | 'experience';

interface DSAQuestion {
  id: number;
  title: string;
  company: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

interface JobRequirement {
  company: string;
  role: string;
  requirements: string[];
  experience: string;
}

interface RoadmapStep {
  title: string;
  description: string;
  timeframe: string;
  skills: string[];
}

interface InterviewExperience {
  company: string;
  role: string;
  date: string;
  rounds: string[];
  questions: string[];
  tips: string;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeature, setSelectedFeature] = useState<Feature>('dsa');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const dsaQuestions: DSAQuestion[] = [
    {
      id: 1,
      title: "Two Sum",
      company: "Google",
      difficulty: "Easy",
      category: "Arrays"
    },
    {
      id: 2,
      title: "Valid Parentheses",
      company: "Amazon",
      difficulty: "Easy",
      category: "Stacks"
    },
    {
      id: 3,
      title: "LRU Cache",
      company: "Microsoft",
      difficulty: "Medium",
      category: "Design"
    },
    // Add more questions here
  ];

  const jobRequirements: JobRequirement[] = [
    {
      company: "Google",
      role: "Software Engineer",
      requirements: [
        "Strong CS fundamentals",
        "Experience with distributed systems",
        "Problem-solving skills"
      ],
      experience: "3+ years"
    },
    {
      company: "Meta",
      role: "Frontend Engineer",
      requirements: [
        "React expertise",
        "Performance optimization",
        "UI/UX understanding"
      ],
      experience: "2+ years"
    }
  ];

  const roadmapSteps: RoadmapStep[] = [
    {
      title: "Foundation",
      description: "Build strong programming fundamentals",
      timeframe: "3-6 months",
      skills: ["Data Structures", "Algorithms", "System Design Basics"]
    },
    {
      title: "Specialization",
      description: "Focus on your chosen tech stack",
      timeframe: "6-12 months",
      skills: ["Frontend/Backend", "Databases", "Cloud Services"]
    }
  ];

  const interviewExperiences: InterviewExperience[] = [
    {
      company: "Amazon",
      role: "SDE II",
      date: "2024",
      rounds: ["Online Assessment", "Technical", "System Design", "Behavioral"],
      questions: ["Design a rate limiter", "Implement LRU cache"],
      tips: "Focus on leadership principles and system design"
    },
    {
      company: "Microsoft",
      role: "Software Engineer",
      date: "2024",
      rounds: ["Coding", "Design", "Behavioral"],
      questions: ["Binary tree traversal", "Design a parking lot"],
      tips: "Practice problem-solving communication"
    }
  ];

  const features = [
    {
      id: 'dsa',
      title: 'DSA Questions',
      description: 'Company-tagged DSA questions (30 questions)',
      icon: BookOpen,
    },
    {
      id: 'requirements',
      title: 'Job Requirements',
      description: 'Insights into job requirements',
      icon: Briefcase,
    },
    {
      id: 'roadmap',
      title: 'Career Roadmap',
      description: 'Personalized career roadmaps',
      icon: Map,
    },
    {
      id: 'experience',
      title: 'Interview Experience',
      description: 'Company-specific interview experiences',
      icon: FileText,
    },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const filteredContent = (content: any[], searchFields: string[]) => {
    if (!searchQuery) return content;
    return content.filter(item =>
      searchFields.some(field =>
        String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition duration-200 ease-in-out z-30`}
      >
        <div className="w-64 h-full bg-white border-r shadow-sm">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold text-gray-800">Career Portal</h1>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id as Feature)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  selectedFeature === feature.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <feature.icon size={20} />
                <span className="font-medium">{feature.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white border-b shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-600 hover:text-gray-800"
            >
              <Menu size={24} />
            </button>
            <div className="flex-1 max-w-2xl mx-auto">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            {selectedFeature === 'dsa' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">DSA Questions with Company Tags</h2>
                <div className="grid gap-4">
                  {filteredContent(dsaQuestions, ['title', 'company', 'category']).map((question) => (
                    <div key={question.id} className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{question.title}</h3>
                          <p className="text-gray-600">Company: {question.company}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {question.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-500 mt-2">Category: {question.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedFeature === 'requirements' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Job Requirement Insights</h2>
                <div className="grid gap-4">
                  {filteredContent(jobRequirements, ['company', 'role']).map((job, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-lg">{job.company}</h3>
                        <span className="text-blue-600 font-medium">{job.role}</span>
                      </div>
                      <div className="space-y-3">
                        <p className="text-gray-600">Experience: {job.experience}</p>
                        <div>
                          <h4 className="font-medium mb-2">Requirements:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {job.requirements.map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedFeature === 'roadmap' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Personalized Career Roadmaps</h2>
                <div className="space-y-8">
                  {filteredContent(roadmapSteps, ['title', 'description']).map((step, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border relative">
                      {index !== roadmapSteps.length - 1 && (
                        <div className="absolute h-8 w-1 bg-blue-200 left-1/2 -bottom-8 transform -translate-x-1/2" />
                      )}
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 text-blue-600 rounded-full p-3">
                          <Map size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                          <p className="text-gray-600 mb-3">{step.description}</p>
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <span className="font-medium">Timeframe:</span>
                            <span className="ml-2">{step.timeframe}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {step.skills.map((skill, i) => (
                              <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedFeature === 'experience' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Interview Experiences</h2>
                <div className="grid gap-6">
                  {filteredContent(interviewExperiences, ['company', 'role']).map((exp, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{exp.company}</h3>
                          <p className="text-gray-600">{exp.role}</p>
                        </div>
                        <span className="text-gray-500">{exp.date}</span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Interview Rounds:</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.rounds.map((round, i) => (
                              <span key={i} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                                {round}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Sample Questions:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {exp.questions.map((q, i) => (
                              <li key={i}>{q}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Tips:</h4>
                          <p className="text-gray-600">{exp.tips}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;