import { useState } from "react";
import { UserData } from "./types";
import { Users, Award, Target, Heart, MapPin, Mail, Phone, MessageSquareWarning, CheckCircle, Clock, Shield } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface AboutPageProps {
  userData: UserData;
}

export function AboutPage({ }: AboutPageProps) {
  const [selectedSection, setSelectedSection] = useState<"brototype" | "brototalk">("brototype");

  return (
    <div className="flex flex-1">
      <div className="p-4 md:p-8 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-8 flex-1 w-full h-full overflow-y-auto">
        {/* Header with Theme Toggle */}
        <div className="relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
              About Us
            </h1>
            
            {/* Two Section Buttons */}
            <div className="flex justify-center gap-4 max-w-2xl mx-auto">
              <button
                onClick={() => setSelectedSection("brototype")}
                className="flex-1 relative"
              >
                <div className={`relative p-6 rounded-[1.25rem] border-[0.75px] transition-all ${
                  selectedSection === "brototype"
                    ? "border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 shadow-lg"
                    : "border-neutral-300 dark:border-neutral-600 hover:border-purple-400 dark:hover:border-purple-500"
                }`}>
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  <div className="flex flex-col items-center gap-3 relative z-10">
                    <img
                      src="https://i.ibb.co/CKRKyKL1/images.png"
                      alt="Brototype Logo"
                      className="h-16 w-16 object-contain rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                        Brototype
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        Training Institute
                      </p>
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedSection("brototalk")}
                className="flex-1 relative"
              >
                <div className={`relative p-6 rounded-[1.25rem] border-[0.75px] transition-all ${
                  selectedSection === "brototalk"
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 shadow-lg"
                    : "border-neutral-300 dark:border-neutral-600 hover:border-blue-400 dark:hover:border-blue-500"
                }`}>
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  <div className="flex flex-col items-center gap-3 relative z-10">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <MessageSquareWarning className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                        Brototalk
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        Complaint System
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Conditional Content Based on Selection */}
        {selectedSection === "brototype" ? (
          <BrototypeSectionContent />
        ) : (
          <BrototalkSectionContent />
        )}
      </div>
    </div>
  );
}

// Brototype Section Component
function BrototypeSectionContent() {
  return (
    <>
      {/* Mission Section */}
      <div className="relative p-px rounded-[1.5rem]">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-2xl border border-purple-200 dark:border-purple-800">
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
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative p-px rounded-[1.25rem]">
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
          <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800 text-center">
            <Users className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-green-900 dark:text-green-100 mb-2">2200+</div>
            <p className="text-green-700 dark:text-green-300 font-medium">Students Placed</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">In the last 6 years</p>
          </div>
        </div>

        <div className="relative p-px rounded-[1.25rem]">
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
          <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
            <Award className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-2">₹39,000</div>
            <p className="text-blue-700 dark:text-blue-300 font-medium">Average Salary</p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Per month</p>
          </div>
        </div>

        <div className="relative p-px rounded-[1.25rem]">
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
          <div className="relative bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800 text-center">
            <Heart className="w-10 h-10 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-900 dark:text-orange-100 mb-2">71%</div>
            <p className="text-orange-700 dark:text-orange-300 font-medium">Non-IT Background</p>
            <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">Successfully placed</p>
          </div>
        </div>
      </div>

      {/* About Brocamp */}
      <div className="relative p-px rounded-[1.5rem]">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="relative bg-white dark:bg-neutral-800 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
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
      <div className="relative p-px rounded-[1.5rem]">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="relative bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-8 rounded-2xl border border-yellow-200 dark:border-yellow-800">
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
      <div className="relative p-px rounded-[1.5rem]">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 text-center">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Admissions</p>
                  <a href="mailto:admissions@brototype.com" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
                    admissions@brototype.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Official Queries</p>
                  <a href="mailto:talk@brototype.com" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
                    talk@brototype.com
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Feedback & Complaints</p>
                  <a href="mailto:feedback@brototype.com" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
                    feedback@brototype.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Contact Number</p>
                  <a href="tel:+917034395811" className="text-blue-600 dark:text-blue-400 hover:underline">
                    +91 7034 395 811
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="relative p-px rounded-[1.5rem]">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl border border-purple-200 dark:border-purple-800">
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
      </div>

      {/* Footer Note */}
      <div className="text-center text-neutral-600 dark:text-neutral-400 py-4">
        <p className="text-xs">
          Packapeer Academy Pvt Ltd. © 2025
        </p>
      </div>
    </>
  );
}

// Brototalk Section Component
function BrototalkSectionContent() {
  return (
    <>
      {/* About Brototalk */}
      <div className="relative p-px rounded-[1.5rem]">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquareWarning className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">What is Brototalk?</h2>
          </div>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg mb-4">
            Brototalk is Brototype's official complaint management system designed to help students and staff 
            report, track, and resolve issues efficiently. We believe in transparency and accountability in 
            addressing concerns to maintain a healthy learning environment.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">
            This platform ensures that every voice is heard and every complaint is properly documented and 
            addressed by the appropriate authorities.
          </p>
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                  Easy Submission
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Submit complaints with a simple form including title, description, category, and priority level.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                  Real-time Tracking
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Track your complaint status in real-time - Pending, In Progress, or Resolved.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                  Secure & Private
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Your complaints are secure with Firebase authentication and only visible to you and admins.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                  Admin Management
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Admins can view all complaints, update status, add comments, and export data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complaint Categories */}
      <div className="relative p-px rounded-[1.5rem]">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl border border-purple-200 dark:border-purple-800">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 text-center">
            Complaint Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Technical Issues",
              "Course Content",
              "Infrastructure",
              "Faculty Related",
              "Administrative",
              "Harassment",
              "Payment Issues",
              "Other"
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700 text-center hover:shadow-md transition"
              >
                <p className="text-neutral-800 dark:text-neutral-200 font-medium text-sm">
                  {category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Levels */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 text-center">
          Priority Levels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-xl border-2 border-red-300 dark:border-red-700 text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">High</div>
            <p className="text-neutral-700 dark:text-neutral-300">
              Urgent issues requiring immediate attention
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 rounded-xl border-2 border-yellow-300 dark:border-yellow-700 text-center">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">Medium</div>
            <p className="text-neutral-700 dark:text-neutral-300">
              Important issues to be resolved soon
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border-2 border-green-300 dark:border-green-700 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Low</div>
            <p className="text-neutral-700 dark:text-neutral-300">
              Non-urgent issues for general improvement
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative p-px rounded-[1.5rem]">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="relative bg-white dark:bg-neutral-800 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 text-center">
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-neutral-800 dark:text-neutral-200 mb-1">Create an Account</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Sign up with your email and verify your account to get started.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-neutral-800 dark:text-neutral-200 mb-1">Submit a Complaint</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Fill out the complaint form with all necessary details including category and priority.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-neutral-800 dark:text-neutral-200 mb-1">Track Progress</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Monitor your complaint status and receive updates from the admin team.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-neutral-800 dark:text-neutral-200 mb-1">Resolution</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Get notified when your complaint is resolved with admin comments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-neutral-600 dark:text-neutral-400 py-4">
        <p className="text-sm">
          This complaint management system helps Brototype students and staff report and track issues effectively.
        </p>
        <p className="text-xs mt-2">
          Powered by Brototype © 2025
        </p>
      </div>
    </>
  );
}
