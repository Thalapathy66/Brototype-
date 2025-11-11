import { UserData } from "./types";
import { Users, Award, Target, Heart, MapPin, Mail, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface AboutPageProps {
  userData: UserData;
}

export function AboutPage({ userData }: AboutPageProps) {
  return (
    <div className="flex flex-1">
      <div className="p-4 md:p-8 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-8 flex-1 w-full h-full overflow-y-auto">
        {/* Header with Theme Toggle */}
        <div className="relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAASFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRV4eHjd3d24uLj09PTGxsaZmZlSUlKNjY1paWlFRUVcXFw5OTmjo6MqKirsa+ksAAAACXRSTlMAWqLU9v8jsxr/6bdlAAAA7ElEQVR4AYWTBZbFMAhFK3mVKA1hsv+dDue7c+tNcBgeGKfZAW6exuEDy4oH1uV1fcIL0/DI5vCG2x7U4yPLTR5fuOpw+IL77N8D04sDn91Y8YNVN+Anml/8ZDy5uO+X85ObM+BDTFHPnHyhw9fiiVvhowCYB6cbavXi+a9lRO8LR8R4SM7tlArohna0vv950Q21RH1Uf+ijQTltCDmFkHJIYFQCo3eB7jptcNBP6p3BsjNLl7110ncROpmYAWmVhbjpMhN1aqQbuBKdnJzwk8lMlJVqs1hmua2GsVrObFqz7e3BsUfPHl5z/P8BM4MWdg84T6oAAAAASUVORK5CYII="
                alt="Brototype Logo"
                className="h-16 w-20"
              />
            </div>
            <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
              About Brototype
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              No.1 Software Training Institute in Kerala - Transforming lives through education
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-2xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">Our Mission</h2>
          </div>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">
            To help motivated individuals from any background build a high-paying career in software engineering. 
            We believe that if you know how to read and write in English and have basic math knowledge, 
            you too can become a software engineer.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800 text-center">
            <Users className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-green-900 dark:text-green-100 mb-2">2200+</div>
            <p className="text-green-700 dark:text-green-300 font-medium">Students Placed</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">In the last 6 years</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
            <Award className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-2">₹39,000</div>
            <p className="text-blue-700 dark:text-blue-300 font-medium">Average Salary</p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Per month</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800 text-center">
            <Heart className="w-10 h-10 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-900 dark:text-orange-100 mb-2">71%</div>
            <p className="text-orange-700 dark:text-orange-300 font-medium">Non-IT Background</p>
            <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">Successfully placed</p>
          </div>
        </div>

        {/* About Brocamp */}
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            About Brocamp
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
            Brocamp is a 12-month intensive training program, offered both in-house and online, 
            for motivated individuals who are ready to work hard and build a high-paying career in software engineering.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Our study materials worth more than ₹5 Lakhs are 100% FREE of cost, and we provide 
            24x7 doubt clearance support with our Exclusive Membership program.
          </p>
        </div>

        {/* Courses Offered */}
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
            Our Courses (1 Year Duration Each)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Web Development",
              "Mobile App Development",
              "Cyber Security",
              "Artificial Intelligence/ML",
              "Game Development",
              "Data Science",
              "Blockchain",
              "AR/VR Development",
              "Software Testing",
              "DevOps"
            ].map((course, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 p-4 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:shadow-md transition"
              >
                <p className="text-neutral-800 dark:text-neutral-200 font-medium text-center">
                  {course}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-8 rounded-2xl border border-yellow-200 dark:border-yellow-800">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4 text-center">
            Official Partnerships
          </h2>
          <p className="text-center text-neutral-700 dark:text-neutral-300 mb-6">
            Brototype (Packapeer Academy Private Limited) is officially partnered with:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg flex items-center justify-center">
              <img
                src="https://website-main.blr1.cdn.digitaloceanspaces.com/assets/NCVET_r1wu73.png"
                alt="NCVET - Government of India"
                className="max-h-16 object-contain"
              />
            </div>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg flex items-center justify-center">
              <img
                src="https://website-main.blr1.cdn.digitaloceanspaces.com/assets/Skill_India_uyisbf.png"
                alt="Skill India"
                className="max-h-16 object-contain"
              />
            </div>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg flex items-center justify-center">
              <img
                src="https://website-main.blr1.cdn.digitaloceanspaces.com/assets/nasscom_logo_k53qrh.jpg"
                alt="NASSCOM"
                className="max-h-16 object-contain"
              />
            </div>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg flex items-center justify-center">
              <img
                src="https://website-main.blr1.cdn.digitaloceanspaces.com/assets/IT_-_ITeS_SSC_cxeouf.png"
                alt="IT-ITeS SSC"
                className="max-h-16 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Locations */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">Our Locations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-200 mb-2">
                Kochi (Headquarters)
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Edathuruthikaran Holdings, 10/450-2, Kundanoor, Maradu, Ernakulam, Kerala 682304
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-200 mb-2">
                Kozhikode
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Kinfra Techno Industrial Park, Calicut University PO, Kakkanchery, Kerala 673635
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-200 mb-2">
                Trivandrum
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Dotspace Business Park, Kazhakkoottam, Thiruvananthapuram, Kerala 695585
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-200 mb-2">
                Bengaluru
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Hustlehub Tech Park, Sector 2, HSR Layout, Bengaluru, Karnataka 560102
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-200 mb-2">
                Coimbatore
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                4th Floor, 35/4, Desabandhu St, Ramarkovk, Ram Nagar, Coimbatore, Tamil Nadu 641009
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-200 mb-2">
                Chennai
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Canyon Coworking Space, A4, Chandrasekaran Avenue, 1st Main Rd, Thoraipakkam, Tamil Nadu 600097
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 text-center">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-800 dark:text-neutral-200">Admissions</p>
                  <a href="mailto:admissions@brototype.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    admissions@brototype.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-800 dark:text-neutral-200">Official Queries</p>
                  <a href="mailto:talk@brototype.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    talk@brototype.com
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-800 dark:text-neutral-200">Feedback & Complaints</p>
                  <a href="mailto:feedback@brototype.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    feedback@brototype.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-800 dark:text-neutral-200">Contact Number</p>
                  <a href="tel:+917034395811" className="text-blue-600 dark:text-blue-400 hover:underline">
                    +91 7034 395 811
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl border border-purple-200 dark:border-purple-800">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="https://www.brototype.com/images/nikhil.webp"
              alt="Nikhil Kilivayil"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-300 dark:border-purple-600"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                Nikhil Kilivayil
              </h3>
              <p className="text-purple-600 dark:text-purple-400 font-semibold mb-3">
                Founder & CEO, Brototype
              </p>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                "Hi all, if you think there is something that I should know whether it is a concern, 
                query, feedback or whatever please write me directly at{" "}
                <a href="mailto:ceo@brototype.com" className="text-purple-600 dark:text-purple-400 hover:underline">
                  ceo@brototype.com
                </a>
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                I will be personally checking this email and try my best to reply to all the emails as my time permits.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-neutral-600 dark:text-neutral-400 py-4">
          <p className="text-sm">
            This complaint management system helps Brototype students and staff report and track issues effectively.
          </p>
          <p className="text-xs mt-2">
            Packapeer Academy Pvt Ltd. © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
