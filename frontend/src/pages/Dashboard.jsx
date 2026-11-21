import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Factory,
  Package,
  RefreshCw,
  TriangleAlert,
  Wrench,
} from "lucide-react";

import dashboardService from "../services/dashboardService";
import "../styles/dashboard.css";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import PageHeader from "../components/ui/PageHeader";
import ProgressBar from "../components/ui/ProgressBar";
import StatCard from "../components/ui/StatCard";

// Percent of a total, rounded for display. Returns 0 when there is no total.
const percent = (part = 0, total = 0) =>
  total ? Math.round((part / total) * 100) : 0;

// Display helper: show an em dash when the API has not returned a value.
const show = (value) => (value === null || value === undefined ? "—" : value);

const QUICK_ACTIONS = [
  {
    key: "machines",
    title: "Manage Machines",
    description: "Add or update machines",
    icon: Factory,
    path: "/machines",
  },
  {
    key: "maintenance",
    title: "Maintenance",
    description: "Schedule and track tasks",
    icon: Wrench,
    path: "/maintenance",
  },
  {
    key: "breakdowns",
    title: "Report Breakdown",
    description: "Log a machine failure",
    icon: TriangleAlert,
    path: "/breakdowns",
  },
  {
    key: "spare-parts",
    title: "Spare Parts",
    description: "Review inventory levels",
    icon: Package,
    path: "/spare-parts",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [machineReport, setMachineReport] = useState(null);
  const [maintenanceReport, setMaintenanceReport] = useState(null);
  const [breakdownReport, setBreakdownReport] = useState(null);
  const [sparePartReport, setSparePartReport] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [machineData, maintenanceData, breakdownData, sparePartData] =
        await Promise.all([
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
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  if (loading) {
    return (
      <div className="dashboard-page">
        <EmptyState title="Loading dashboard data…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <EmptyState
          icon={AlertCircle}
          tone="danger"
          title={error}
          description="Check that the server is running and try again."
          action={
            <Button
              variant="secondary"
              icon={RefreshCw}
              onClick={loadDashboardData}
            >
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  const machines = machineReport ?? {};
  const maintenance = maintenanceReport ?? {};
  const breakdowns = breakdownReport ?? {};
  const spareParts = sparePartReport ?? {};

  return (
    <div className="dashboard-page">
      <PageHeader
        title="Dashboard"
        description="Plant-wide overview of machines, maintenance, breakdowns and spare parts."
      />

      {/* Key figures */}
      <section className="dashboard-stats" aria-label="Key figures">
        <StatCard
          label="Total machines"
          value={machines.total}
          description={`${show(machines.running)} running`}
          icon={Factory}
          tone="primary"
        />
        <StatCard
          label="Maintenance tasks"
          value={maintenance.total}
          description={`${show(maintenance.pending)} pending`}
          icon={Wrench}
          tone="info"
        />
        <StatCard
          label="Open breakdowns"
          value={breakdowns.open}
          description={`${show(breakdowns.total)} recorded in total`}
          icon={TriangleAlert}
          tone="danger"
        />
        <StatCard
          label="Low-stock parts"
          value={spareParts.lowStockParts}
          description={`of ${show(spareParts.totalParts)} part types`}
          icon={Package}
          tone="warning"
        />
      </section>

      <section className="dashboard-grid">
        {/* Machine status */}
        <Card
          title="Machine status"
          description="Current distribution across all machines"
        >
          <div
            className="dashboard-stack-bar"
            role="img"
            aria-label={`Running ${machines.running ?? 0}, under maintenance ${
              machines.maintenance ?? 0
            }, stopped ${machines.stopped ?? 0}`}
          >
            <div
              className="dashboard-stack-bar__segment dashboard-stack-bar__segment--success"
              style={{ width: `${percent(machines.running, machines.total)}%` }}
            />
            <div
              className="dashboard-stack-bar__segment dashboard-stack-bar__segment--warning"
              style={{
                width: `${percent(machines.maintenance, machines.total)}%`,
              }}
            />
            <div
              className="dashboard-stack-bar__segment dashboard-stack-bar__segment--danger"
              style={{ width: `${percent(machines.stopped, machines.total)}%` }}
            />
          </div>

          <div className="dashboard-legend">
            <Metric
              label="Running"
              dot="#16a34a"
              value={machines.running}
              percentValue={percent(machines.running, machines.total)}
            />
            <Metric
              label="Under maintenance"
              dot="#f59e0b"
              value={machines.maintenance}
              percentValue={percent(machines.maintenance, machines.total)}
            />
            <Metric
              label="Stopped"
              dot="#dc2626"
              value={machines.stopped}
              percentValue={percent(machines.stopped, machines.total)}
            />
          </div>
        </Card>

        {/* Maintenance workload */}
        <Card
          title="Maintenance workload"
          description="Progress of maintenance tasks"
        >
          <div className="dashboard-rows">
            <ProgressRow
              label="Pending"
              value={maintenance.pending}
              total={maintenance.total}
              tone="warning"
            />
            <ProgressRow
              label="In progress"
              value={maintenance.inProgress}
              total={maintenance.total}
              tone="info"
            />
            <ProgressRow
              label="Completed"
              value={maintenance.completed}
              total={maintenance.total}
              tone="success"
            />
          </div>
        </Card>

        {/* Breakdowns */}
        <Card
          title="Breakdown overview"
          description="Current breakdown activity and priority"
        >
          <div className="dashboard-mini-stats">
            <Metric label="Open" value={breakdowns.open} />
            <Metric label="In progress" value={breakdowns.inProgress} />
            <Metric label="Resolved" value={breakdowns.resolved} />
          </div>

          <div className="dashboard-divider" />

          <div className="dashboard-rows">
            <ProgressRow
              label="High priority"
              value={breakdowns.highPriority}
              total={breakdowns.total}
              tone="danger"
            />
            <ProgressRow
              label="Medium priority"
              value={breakdowns.mediumPriority}
              total={breakdowns.total}
              tone="warning"
            />
            <ProgressRow
              label="Low priority"
              value={breakdowns.lowPriority}
              total={breakdowns.total}
              tone="success"
            />
          </div>
        </Card>

        {/* Spare parts */}
        <Card
          title="Spare parts stock"
          description="Inventory health across all spare parts"
        >
          <div className="dashboard-mini-stats">
            <Metric label="Part types" value={spareParts.totalParts} />
            <Metric label="Low stock" value={spareParts.lowStockParts} />
            <Metric
              label="Sufficient"
              value={spareParts.sufficientStockParts}
            />
          </div>

          <div className="dashboard-divider" />

          <ProgressRow
            label="Stock health"
            value={spareParts.sufficientStockParts}
            total={spareParts.totalParts}
            tone="success"
          />
          <p className="dashboard-footnote">
            Total quantity on hand: {show(spareParts.totalQuantity)}
          </p>
        </Card>
      </section>

      {/* Quick actions (single instance) */}
      <Card
        title="Quick actions"
        description="Jump straight into common maintenance tasks"
      >
        <div className="dashboard-quick-actions">
          {QUICK_ACTIONS.map(({ key, title, description, icon: Icon, path }) => (
            <button
              key={key}
              type="button"
              className="dashboard-action"
              onClick={() => navigate(path)}
            >
              <span className="ui-icon-tile ui-icon-tile--primary" aria-hidden="true">
                <Icon size={20} />
              </span>
              <span>
                <span className="dashboard-action__title">{title}</span>
                <span className="dashboard-action__description">
                  {description}
                </span>
              </span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Labelled number with an optional coloured dot and percentage.
const Metric = ({ label, value, dot, percentValue }) => (
  <div className="dashboard-metric">
    <div className="dashboard-metric__label">
      {dot && (
        <span
          className="dashboard-metric__dot"
          style={{ background: dot }}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </div>
    <div className="dashboard-metric__value">
      {show(value)}
      {percentValue !== undefined && (
        <span className="dashboard-metric__percent">{percentValue}%</span>
      )}
    </div>
  </div>
);

// One row with a label, count and a proportional progress bar.
const ProgressRow = ({ label, value, total, tone }) => (
  <div className="dashboard-row">
    <div className="dashboard-row__top">
      <span>{label}</span>
      <span className="dashboard-row__value">
        {show(value)}
        {total ? ` / ${total}` : ""}
      </span>
    </div>
    <ProgressBar value={value ?? 0} max={total ?? 0} tone={tone} label={label} />
  </div>
);

export default Dashboard;
