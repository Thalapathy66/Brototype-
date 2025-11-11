"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, LogOut, MessageSquareWarning, Users } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProfilePage } from "@/src/ProfilePage";
import { ComplaintsPage } from "@/src/ComplaintsPage";
import { UsersPage } from "@/src/UsersPage";
import { UserData } from "@/src/types";

interface SidebarDemoProps {
  userData: UserData;
  onLogout: () => void;
  onUpdateProfile: (updatedData: UserData) => void;
}

export function SidebarDemo({ userData, onLogout, onUpdateProfile }: SidebarDemoProps) {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<"dashboard" | "profile" | "complaints" | "users">("complaints");

  const handleNavigation = (page: "dashboard" | "profile" | "complaints" | "users" | "logout") => {
    if (page === "logout") {
      onLogout();
    } else {
      setCurrentPage(page);
    }
  };

  // Base links for all users
  const baseLinks = [
    {
      label: "Complaints",
      href: "#",
      icon: (
        <MessageSquareWarning className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => handleNavigation("complaints"),
    },
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => handleNavigation("dashboard"),
    },
  ];

  // Admin-only link
  const adminLink = userData.isAdmin ? [{
    label: "Users",
    href: "#",
    icon: (
      <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    onClick: () => handleNavigation("users"),
  }] : [];

  // Profile and logout links
  const endLinks = [
    {
      label: "Profile",
      href: "#",
      icon: (
        <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => handleNavigation("profile"),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => handleNavigation("logout"),
    },
  ];

  // Combine all links
  const links = [...baseLinks, ...adminLink, ...endLinks];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx} onClick={link.onClick} style={{ cursor: "pointer" }}>
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: userData.name,
                href: "#",
                icon: (
                  <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                    {userData.name.charAt(0).toUpperCase()}
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {currentPage === "profile" ? (
        <ProfilePage
          userData={userData}
          onUpdateProfile={onUpdateProfile}
          onBack={() => setCurrentPage("complaints")}
        />
      ) : currentPage === "complaints" ? (
        <ComplaintsPage userData={userData} />
      ) : currentPage === "users" ? (
        <UsersPage userData={userData} />
      ) : (
        <DashboardContent />
      )}
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAASFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRV4eHjd3d24uLj09PTGxsaZmZlSUlKNjY1paWlFRUVcXFw5OTmjo6MqKirsa+ksAAAACXRSTlMAWqLU9v8jsxr/6bdlAAAA7ElEQVR4AYWTBZbFMAhFK3mVKA1hsv+dDue7c+tNcBgeGKfZAW6exuEDy4oH1uV1fcIL0/DI5vCG2x7U4yPLTR5fuOpw+IL77N8D04sDn91Y8YNVN+Anml/8ZDy5uO+X85ObM+BDTFHPnHyhw9fiiVvhowCYB6cbavXi+a9lRO8LR8R4SM7tlArohna0vv950Q21RH1Uf+ijQTltCDmFkHJIYFQCo3eB7jptcNBP6p3BsjNLl7110ncROpmYAWmVhbjpMhN1aqQbuBKdnJzwk8lMlJVqs1hmua2GsVrObFqz7e3BsUfPHl5z/P8BM4MWdg84T6oAAAAASUVORK5CYII="
        alt="Brototalk Logo"
        className="h-5 w-6 flex-shrink-0"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Brototalk
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAASFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRV4eHjd3d24uLj09PTGxsaZmZlSUlKNjY1paWlFRUVcXFw5OTmjo6MqKirsa+ksAAAACXRSTlMAWqLU9v8jsxr/6bdlAAAA7ElEQVR4AYWTBZbFMAhFK3mVKA1hsv+dDue7c+tNcBgeGKfZAW6exuEDy4oH1uV1fcIL0/DI5vCG2x7U4yPLTR5fuOpw+IL77N8D04sDn91Y8YNVN+Anml/8ZDy5uO+X85ObM+BDTFHPnHyhw9fiiVvhowCYB6cbavXi+a9lRO8LR8R4SM7tlArohna0vv950Q21RH1Uf+ijQTltCDmFkHJIYFQCo3eB7jptcNBP6p3BsjNLl7110ncROpmYAWmVhbjpMhN1aqQbuBKdnJzwk8lMlJVqs1hmua2GsVrObFqz7e3BsUfPHl5z/P8BM4MWdg84T6oAAAAASUVORK5CYII="
        alt="Brototalk Logo"
        className="h-5 w-6 flex-shrink-0"
      />
    </a>
  );
};

// Dashboard home content
const DashboardContent = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">Welcome back! Here's your overview.</p>
        </div>
        <div className="flex gap-2">
          {[...new Array(4)].map((_, i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((_, i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
