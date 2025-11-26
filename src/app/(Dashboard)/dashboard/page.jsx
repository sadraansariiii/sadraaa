"use client";

import UserDashboard from "@/src/components/pages/dashboard/CompanyDashboard/userDashboard";
import ParkDashboard from "@/src/components/pages/dashboard/ParkDashboard/parkDashboard";
import { useState } from "react";

const Dashboard = () => {
  const [transformative, setTransformative] = useState("user");
  return (
    <div className="w-full h-full">
      {transformative == "park" && <ParkDashboard/>}
      {transformative == "user" && <UserDashboard />}
    </div>
  );
};

export default Dashboard;
