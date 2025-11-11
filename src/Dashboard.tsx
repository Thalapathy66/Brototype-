import { SidebarDemo } from "../components/ui/sidebar-demo";
import { UserData } from "./types";

interface DashboardProps {
  userData: UserData;
  onLogout: () => void;
  onUpdateProfile: (updatedData: UserData) => void;
}

function Dashboard({ userData, onLogout, onUpdateProfile }: DashboardProps) {
  return <SidebarDemo userData={userData} onLogout={onLogout} onUpdateProfile={onUpdateProfile} />;
}

export default Dashboard;
