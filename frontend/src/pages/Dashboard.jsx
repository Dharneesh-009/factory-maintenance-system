import { useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [machineReport, setMachineReport] = useState(null);
  const [maintenanceReport, setMaintenanceReport] = useState(null);
  const [breakdownReport, setBreakdownReport] = useState(null);
  const [sparePartReport, setSparePartReport] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          machineData,
          maintenanceData,
          breakdownData,
          sparePartData,
        ] = await Promise.all([
          dashboardService.getMachineReport(),
          dashboardService.getMaintenanceReport(),
          dashboardService.getBreakdownReport(),
          dashboardService.getSparePartReport(),
        ]);

        setMachineReport(machineData);
        setMaintenanceReport(maintenanceData);
        setBreakdownReport(breakdownData);
        setSparePartReport(sparePartData);
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-message">
          Loading dashboard data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Dashboard Heading */}
      <div className="dashboard-heading">
        <h1>Dashboard</h1>
        <p>
          Welcome to the Factory Maintenance System.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-cards">

        {/* Machines */}
        <div className="dashboard-card">
          <div className="card-top">
            <span className="card-title">
              Total Machines
            </span>

            <div className="card-icon">
              🏭
            </div>
          </div>

          <div className="card-value">
            {machineReport?.total}
          </div>

          <div className="card-description">
            {machineReport?.running} machines currently running
          </div>
        </div>

        {/* Maintenance */}
        <div className="dashboard-card">
          <div className="card-top">
            <span className="card-title">
              Maintenance
            </span>

            <div className="card-icon">
              🔧
            </div>
          </div>

          <div className="card-value">
            {maintenanceReport?.total}
          </div>

          <div className="card-description">
            {maintenanceReport?.pending} maintenance tasks pending
          </div>
        </div>

        {/* Breakdowns */}
        <div className="dashboard-card">
          <div className="card-top">
            <span className="card-title">
              Breakdowns
            </span>

            <div className="card-icon">
              🚨
            </div>
          </div>

          <div className="card-value">
            {breakdownReport?.total}
          </div>

          <div className="card-description">
            {breakdownReport?.open} breakdowns currently open
          </div>
        </div>

        {/* Spare Parts */}
        <div className="dashboard-card">
          <div className="card-top">
            <span className="card-title">
              Spare Parts
            </span>

            <div className="card-icon">
              📦
            </div>
          </div>

          <div className="card-value">
            {sparePartReport?.totalParts}
          </div>

          <div className="card-description">
            {sparePartReport?.lowStockParts} parts are low in stock
          </div>
        </div>

      </div>

      {/* Detailed Sections */}
      <div className="dashboard-sections">
{/* Machine Health Overview */}
<div className="dashboard-section machine-health-section">

  <div className="health-header">
    <div>
      <h2>Machine Health</h2>
      <p>Current machine distribution</p>
    </div>

    <div className="health-total">
      <span>{machineReport?.total}</span>
      <small>Total</small>
    </div>
  </div>

  <div className="health-bar">

    <div
      className="health-bar-running"
      style={{
        width: `${
          machineReport?.total
            ? (machineReport.running / machineReport.total) * 100
            : 0
        }%`,
      }}
    ></div>

    <div
      className="health-bar-maintenance"
      style={{
        width: `${
          machineReport?.total
            ? (machineReport.maintenance / machineReport.total) * 100
            : 0
        }%`,
      }}
    ></div>

    <div
      className="health-bar-stopped"
      style={{
        width: `${
          machineReport?.total
            ? (machineReport.stopped / machineReport.total) * 100
            : 0
        }%`,
      }}
    ></div>

  </div>

  <div className="health-legend">

    <div className="health-item">
      <span className="health-dot running"></span>

      <div>
        <span className="health-label">Running</span>
        <strong>{machineReport?.running}</strong>
      </div>
    </div>

    <div className="health-item">
      <span className="health-dot maintenance"></span>

      <div>
        <span className="health-label">Maintenance</span>
        <strong>{machineReport?.maintenance}</strong>
      </div>
    </div>

    <div className="health-item">
      <span className="health-dot stopped"></span>

      <div>
        <span className="health-label">Stopped</span>
        <strong>{machineReport?.stopped}</strong>
      </div>
    </div>

  </div>

</div>

{/* Maintenance Activity Overview */}
<div className="dashboard-section maintenance-activity-section">

  <div className="maintenance-header">
    <div>
      <h2>Maintenance Activity</h2>
      <p>Current maintenance workload</p>
    </div>

    <div className="maintenance-total">
      <span>{maintenanceReport?.total}</span>
      <small>Total</small>
    </div>
  </div>

  <div className="maintenance-progress-list">

    {/* Pending */}
    <div className="maintenance-progress-item">

      <div className="maintenance-progress-top">
        <span>Pending</span>
        <strong>{maintenanceReport?.pending}</strong>
      </div>

      <div className="maintenance-progress-track">
        <div
          className="maintenance-progress pending"
          style={{
            width: `${
              maintenanceReport?.total
                ? (maintenanceReport.pending /
                    maintenanceReport.total) *
                  100
                : 0
            }%`,
          }}
        ></div>
      </div>

    </div>


    {/* In Progress */}
    <div className="maintenance-progress-item">

      <div className="maintenance-progress-top">
        <span>In Progress</span>
        <strong>{maintenanceReport?.inProgress}</strong>
      </div>

      <div className="maintenance-progress-track">
        <div
          className="maintenance-progress in-progress"
          style={{
            width: `${
              maintenanceReport?.total
                ? (maintenanceReport.inProgress /
                    maintenanceReport.total) *
                  100
                : 0
            }%`,
          }}
        ></div>
      </div>

    </div>


    {/* Completed */}
    <div className="maintenance-progress-item">

      <div className="maintenance-progress-top">
        <span>Completed</span>
        <strong>{maintenanceReport?.completed}</strong>
      </div>

      <div className="maintenance-progress-track">
        <div
          className="maintenance-progress completed"
          style={{
            width: `${
              maintenanceReport?.total
                ? (maintenanceReport.completed /
                    maintenanceReport.total) *
                  100
                : 0
            }%`,
          }}
        ></div>
      </div>

    </div>

  </div>

</div>

  {/* Machine Status */}
  <div className="dashboard-section">
    <h2>Machine Status</h2>

    <div className="status-list">

      <div className="status-row">
        <span className="status-label">
          🟢 Running
        </span>
        <span className="status-value">
          {machineReport?.running}
        </span>
      </div>

      <div className="status-row">
        <span className="status-label">
          🔴 Stopped
        </span>
        <span className="status-value">
          {machineReport?.stopped}
        </span>
      </div>

      <div className="status-row">
        <span className="status-label">
          🟡 Under Maintenance
        </span>
        <span className="status-value">
          {machineReport?.maintenance}
        </span>
      </div>

    </div>
  </div>


  {/* Maintenance Status */}
  <div className="dashboard-section">
    <h2>Maintenance Status</h2>

    <div className="status-list">

      <div className="status-row">
        <span className="status-label">
          ⏳ Pending
        </span>
        <span className="status-value">
          {maintenanceReport?.pending}
        </span>
      </div>

      <div className="status-row">
        <span className="status-label">
          🔄 In Progress
        </span>
        <span className="status-value">
          {maintenanceReport?.inProgress}
        </span>
      </div>

      <div className="status-row">
        <span className="status-label">
          ✅ Completed
        </span>
        <span className="status-value">
          {maintenanceReport?.completed}
        </span>
      </div>

    </div>
  </div>


  {/* Breakdown & Priority Overview */}
<div className="dashboard-section breakdown-overview-section">

  <div className="breakdown-header">
    <div>
      <h2>Breakdown Overview</h2>
      <p>Current breakdown activity and priority</p>
    </div>

    <div className="breakdown-total">
      <span>{breakdownReport?.total}</span>
      <small>Total</small>
    </div>
  </div>


  {/* Breakdown Status */}
  <div className="breakdown-status-grid">

    <div className="breakdown-status-card">
      <span className="breakdown-status-label">
        Open
      </span>

      <strong>
        {breakdownReport?.open}
      </strong>
    </div>


    <div className="breakdown-status-card">
      <span className="breakdown-status-label">
        In Progress
      </span>

      <strong>
        {breakdownReport?.inProgress}
      </strong>
    </div>


    <div className="breakdown-status-card">
      <span className="breakdown-status-label">
        Resolved
      </span>

      <strong>
        {breakdownReport?.resolved}
      </strong>
    </div>

  </div>


  {/* Priority Overview */}
  <div className="priority-overview">

    <div className="priority-title">
      Priority Distribution
    </div>


    {/* High Priority */}
    <div className="priority-item">

      <div className="priority-top">
        <span>High</span>

        <strong>
          {breakdownReport?.highPriority}
        </strong>
      </div>

      <div className="priority-track">
        <div
          className="priority-bar high"
          style={{
            width: `${
              breakdownReport?.total
                ? (breakdownReport.highPriority /
                    breakdownReport.total) *
                  100
                : 0
            }%`,
          }}
        ></div>
      </div>

    </div>


    {/* Medium Priority */}
    <div className="priority-item">

      <div className="priority-top">
        <span>Medium</span>

        <strong>
          {breakdownReport?.mediumPriority}
        </strong>
      </div>

      <div className="priority-track">
        <div
          className="priority-bar medium"
          style={{
            width: `${
              breakdownReport?.total
                ? (breakdownReport.mediumPriority /
                    breakdownReport.total) *
                  100
                : 0
            }%`,
          }}
        ></div>
      </div>

    </div>


    {/* Low Priority */}
    <div className="priority-item">

      <div className="priority-top">
        <span>Low</span>

        <strong>
          {breakdownReport?.lowPriority}
        </strong>
      </div>

      <div className="priority-track">
        <div
          className="priority-bar low"
          style={{
            width: `${
              breakdownReport?.total
                ? (breakdownReport.lowPriority /
                    breakdownReport.total) *
                  100
                : 0
            }%`,
          }}
        ></div>
      </div>

    </div>

  </div>

</div>


 {/* Spare Parts Stock Overview */}
<div className="dashboard-section spare-parts-overview-section">

  <div className="spare-parts-header">
    <div>
      <h2>Spare Parts Stock</h2>
      <p>Current inventory health</p>
    </div>

    <div className="spare-parts-total">
      <span>{sparePartReport?.totalQuantity}</span>
      <small>Total Quantity</small>
    </div>
  </div>

  {/* Stock Summary */}
  <div className="spare-parts-summary">

    <div className="spare-parts-card">
      <span>Total Parts</span>
      <strong>{sparePartReport?.totalParts}</strong>
    </div>

    <div className="spare-parts-card">
      <span>Low Stock</span>
      <strong>{sparePartReport?.lowStockParts}</strong>
    </div>

    <div className="spare-parts-card">
      <span>Sufficient Stock</span>
      <strong>{sparePartReport?.sufficientStockParts}</strong>
    </div>

  </div>

  {/* Stock Health */}
  <div className="stock-health">

    <div className="stock-health-top">
      <span>Stock Health</span>

      <strong>
        {sparePartReport?.totalParts
          ? Math.round(
              (sparePartReport.sufficientStockParts /
                sparePartReport.totalParts) *
                100
            )
          : 0}
        %
      </strong>
    </div>

    <div className="stock-health-track">

      <div
        className="stock-health-bar"
        style={{
          width: `${
            sparePartReport?.totalParts
              ? (sparePartReport.sufficientStockParts /
                  sparePartReport.totalParts) *
                100
              : 0
          }%`,
        }}
      ></div>

    </div>

  </div>

</div>

{/* Quick Actions */}
<div className="dashboard-section quick-actions-section">

  <div className="quick-actions-header">
    <div>
      <h2>Quick Actions</h2>
      <p>Frequently used maintenance operations</p>
    </div>
  </div>

  <div className="quick-actions-grid">

    {/* Add Machine */}
    <button className="quick-action-card">
      <div className="quick-action-icon">
        +
      </div>

      <div className="quick-action-content">
        <strong>Add Machine</strong>
        <span>Register a new machine</span>
      </div>
    </button>

    {/* Schedule Maintenance */}
    <button className="quick-action-card">
      <div className="quick-action-icon">
        +
      </div>

      <div className="quick-action-content">
        <strong>Schedule Maintenance</strong>
        <span>Create a maintenance task</span>
      </div>
    </button>

    {/* Report Breakdown */}
    <button className="quick-action-card">
      <div className="quick-action-icon">
        !
      </div>

      <div className="quick-action-content">
        <strong>Report Breakdown</strong>
        <span>Record a machine breakdown</span>
      </div>
    </button>

    {/* Manage Spare Parts */}
    <button className="quick-action-card">
      <div className="quick-action-icon">
        +
      </div>

      <div className="quick-action-content">
        <strong>Manage Spare Parts</strong>
        <span>View and update inventory</span>
      </div>
    </button>

  </div>

</div>


</div>

    </div>
  );
};

export default Dashboard;