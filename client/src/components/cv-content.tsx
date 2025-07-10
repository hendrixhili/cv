import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Microscope, 
  ProjectorIcon, 
  Settings, 
  Lightbulb,
  MapPin,
  Phone,
  Mail,
  Globe,
  Github
} from "lucide-react";

export function CVContent() {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Personal Information */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">KUN PANG HENDRIX</h1>
            <div className="flex flex-wrap justify-center items-center gap-6 text-slate-600 text-sm">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Guangzhou, China</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>(+86) 157 1324 2663</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:hendrixmathsmtk@outlook.com" className="text-academic-blue hover:underline">
                  hendrixmathsmtk@outlook.com
                </a>
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <a href="http://www.hendrixmathsmtk.com" className="text-academic-blue hover:underline">
                  www.hendrixmathsmtk.com
                </a>
              </div>
              <div className="flex items-center">
                <Github className="w-4 h-4 mr-2" />
                <a href="https://github.com/commHendrix" className="text-academic-blue hover:underline">
                  github.com/commHendrix
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-semibold text-slate-900">
            <GraduationCap className="w-6 h-6 mr-3 text-academic-blue" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="space-y-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Sun Yat-sen University</h3>
                <p className="text-slate-600 italic">B.Eng. in Information Engineering (Elite Class)</p>
              </div>
              <div className="text-right text-slate-500">
                <p>Guangzhou, China</p>
                <p className="italic">Sept. 2022 — Present</p>
              </div>
            </div>
            <ul className="text-slate-700 space-y-2 ml-4">
              <li className="flex items-start">
                <span className="text-academic-blue mr-2">•</span>
                Selected into the elite class from all freshmen in the university.
              </li>
              <li className="flex items-start">
                <span className="text-academic-blue mr-2">•</span>
                GPA: 3.7/4.0. Notable coursework: Digital Signal Processing (4.0/4.0), Electromagnetic Fields & Waves (4.0/4.0), Automatic Control Principle (4.0/4.0), Radar Technology (4.0/4.0).
              </li>
              <li className="flex items-start">
                <span className="text-academic-blue mr-2">•</span>
                Focus areas: Antenna design, signal processing, communication systems, and embedded system development.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Research Experience */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-semibold text-slate-900">
            <Microscope className="w-6 h-6 mr-3 text-academic-blue" />
            Research Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="space-y-8">
            {/* Research 1 */}
            <div className="border-l-4 border-academic-blue pl-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Research on RIS-aided Communication Systems</h3>
                  <p className="text-slate-600 italic">Sun Yat-sen University</p>
                </div>
                <p className="text-slate-500 italic text-right">Dec. 2024 — Present</p>
              </div>
              <ul className="text-slate-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-academic-blue mr-2">•</span>
                  Optimizing the unit design of multi-layer Reconfigurable Intelligent Surfaces (RIS) in the Ka-Band.
                </li>
                <li className="flex items-start">
                  <span className="text-academic-blue mr-2">•</span>
                  Building the path-loss model and simulating it within a MIMO environment.
                </li>
                <li className="flex items-start">
                  <span className="text-academic-blue mr-2">•</span>
                  Supervised by Prof. Shaoqiu Xiao.
                </li>
              </ul>
            </div>

            {/* Research 2 */}
            <div className="border-l-4 border-slate-500 pl-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Research on Coupling Suppression of Antenna Array</h3>
                  <p className="text-slate-600 italic">Sun Yat-sen University</p>
                </div>
                <p className="text-slate-500 italic text-right">Mar. 2024 — Dec. 2024</p>
              </div>
              <ul className="text-slate-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-slate-500 mr-2">•</span>
                  Designed a 4-port antenna array with high isolation operating at 4.8GHz.
                </li>
                <li className="flex items-start">
                  <span className="text-slate-500 mr-2">•</span>
                  Utilized professional laboratory equipment for testing and data analysis under the guidance of Prof. Xiao.
                </li>
              </ul>
            </div>


          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-semibold text-slate-900">
            <ProjectorIcon className="w-6 h-6 mr-3 text-academic-blue" />
            Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="border-l-4 border-academic-blue pl-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-slate-900">Lingte Cup (Communication Systems Design and Simulation)</h3>
              <p className="text-slate-500 italic">Apr. 2025</p>
            </div>
            <ul className="text-slate-700 space-y-2">
              <li className="flex items-start">
                <span className="text-academic-blue mr-2">•</span>
                Developed a highly robust BPSK digital link voice transmission system.
              </li>
              <li className="flex items-start">
                <span className="text-academic-blue mr-2">•</span>
                Utilized MATLAB and the Lingte software suite for system simulation and implementation.
              </li>
              <li className="flex items-start">
                <span className="text-academic-blue mr-2">•</span>
                Supervised by Prof. Xiang Chen.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Technical Skills */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-semibold text-slate-900">
            <Settings className="w-6 h-6 mr-3 text-academic-blue" />
            Technical Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Languages</h3>
              <p className="text-slate-700">Proficient in English and Mandarin, with basic knowledge of Spanish.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Programming</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Python</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">MATLAB</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Julia (Syslab)</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">GNU Radio</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Embedded Development</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">VSCode</Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">Keil5</Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">Microcontroller Programming</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Simulation & Tools</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">Ansys HFSS</Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800">System Simulation</Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">Git</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notable Coursework */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-semibold text-slate-900">
            <GraduationCap className="w-6 h-6 mr-3 text-academic-blue" />
            Notable Coursework (90+ Scores)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-slate-900">Digital Signal Processing</span>
                <Badge className="bg-academic-blue text-white">4.0/4.0</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-slate-900">Electromagnetic Fields & Waves</span>
                <Badge className="bg-academic-blue text-white">4.0/4.0</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-slate-900">Automatic Control Principle</span>
                <Badge className="bg-academic-blue text-white">4.0/4.0</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-slate-900">Radar Technology</span>
                <Badge className="bg-academic-blue text-white">4.0/4.0</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-slate-900">ROS Robot Operating System</span>
                <Badge className="bg-green-600 text-white">4.0/4.0</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-slate-900">Digital Circuit Experiments</span>
                <Badge className="bg-green-600 text-white">4.0/4.0</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-slate-900">Programming Experiments</span>
                <Badge className="bg-green-600 text-white">4.0/4.0</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-slate-900">Embedded System Experiments</span>
                <Badge className="bg-green-600 text-white">4.0/4.0</Badge>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-slate-900 mb-2">Research-Oriented Competencies</h4>
            <p className="text-sm text-slate-700">
              Strong foundation in <strong>electromagnetic theory</strong>, <strong>signal processing</strong>, and <strong>system simulation</strong>, 
              combined with practical <strong>embedded development</strong> experience. This multidisciplinary background enables 
              comprehensive antenna design from theoretical modeling to hardware implementation and intelligent control systems.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Research Interests */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-semibold text-slate-900">
            <Lightbulb className="w-6 h-6 mr-3 text-academic-blue" />
            Intended Doctoral Research Direction
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-academic-blue rounded-full mr-3"></div>
              <span className="font-medium text-slate-900">Antenna Design</span>
            </div>
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-academic-blue rounded-full mr-3"></div>
              <span className="font-medium text-slate-900">Millimeter Wave and 6G</span>
            </div>
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-academic-blue rounded-full mr-3"></div>
              <span className="font-medium text-slate-900">Communication Systems</span>
            </div>
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-academic-blue rounded-full mr-3"></div>
              <span className="font-medium text-slate-900">RIS Design</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
