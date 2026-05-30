import { useEffect, useState } from "react";
import { getDashboard } from "../../api/adminApi";
import "../../styles/AdminDashboard.css";


export default function AdminDashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getDashboard();
    setStats(res.data);
  };

 return (
  <div className="admin-dashboard-container">

    <h1>Admin Dashboard</h1>

    <div className="dashboard-grid">

      <div className="stat-card">
        <div className="stat-title">Total Users</div>
        <div className="stat-value users">
          {stats.totalUsers}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-title">Total Projects</div>
        <div className="stat-value projects">
          {stats.totalProjects}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-title">Total Orders</div>
        <div className="stat-value orders">
          {stats.totalOrders}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-title">Total Payments</div>
        <div className="stat-value payments">
          {stats.totalPayments}
        </div>
      </div>

    </div>

  </div>
);

}
