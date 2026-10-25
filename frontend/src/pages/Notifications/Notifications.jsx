
import { useCallback, useEffect, useState } from "react";
import notificationService from "../../services/notificationService";
import "../../styles/notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [notificationData, count] = await Promise.all([
        notificationService.getAll(),
        notificationService.getUnreadCount(),
      ]);

      setNotifications(notificationData);
      setUnreadCount(count);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load notifications. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleMarkAsRead = async (id) => {
    try {
      setError("");
      setSuccess("");

      await notificationService.markAsRead(id);
      setSuccess("Notification marked as read.");
      await loadNotifications();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to mark notification as read."
      );
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      setError("");
      setSuccess("");

      await notificationService.markAllAsRead();
      setSuccess("All notifications marked as read.");
      await loadNotifications();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to mark all notifications as read."
      );
    }
  };

 

const handleDelete = async (id) => {
  console.log("DELETE HANDLER STARTED:", id);

  const confirmed = window.confirm(
    "Are you sure you want to delete this notification?"
  );

  if (!confirmed) return;

  try {
    setError("");
    setSuccess("");

    await notificationService.deleteNotification(id);

    console.log("DELETE API SUCCEEDED");

    const deletedNotification = notifications.find(
      (notification) => notification.id === id
    );

    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id)
    );

    if (deletedNotification && !deletedNotification.read) {
      setUnreadCount((previous) => Math.max(0, previous - 1));
    }

    setSuccess("Notification deleted successfully.");

    console.log("SUCCESS STATE SET");
  } catch (err) {
    console.error("DELETE FAILED:", err);

    setError(
      err.response?.data?.message ||
        "Unable to delete notification."
    );
  }
};



  const formatDate = (dateValue) => {
    if (!dateValue) return "—";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleString();
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div>
          <h1>Notification Center</h1>
          <p>Stay updated with your factory maintenance activities.</p>
        </div>

        <div className="notifications-header-actions">
          <div className="unread-summary">
            <span className="unread-summary-label">Unread</span>
            <span className="unread-summary-count">{unreadCount}</span>
          </div>

          <button
            type="button"
            className="notification-refresh-button"
            onClick={loadNotifications}
            disabled={loading}
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="notification-alert notification-alert-error">
          {error}
        </div>
      )}

      <div
  className="notification-alert notification-alert-success"
  style={{ display: success ? "block" : "none" }}
>
  {success}
</div>

      <div className="notifications-toolbar">
        <div>
          <h2>All Notifications</h2>
          <p>
            {notifications.length} notification
            {notifications.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          type="button"
          className="mark-all-read-button"
          onClick={handleMarkAllAsRead}
          disabled={loading || unreadCount === 0}
        >
          ✓ Mark all as read
        </button>
      </div>

      {loading ? (
        <div className="notifications-state">
          <div className="notification-spinner" />
          <p>Loading notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="notifications-empty">
          <div className="notifications-empty-icon">🔔</div>
          <h3>No notifications yet</h3>
          <p>
            When notifications are available, they will appear here.
          </p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <article
              key={notification.id}
              className={`notification-card ${
                notification.read ? "notification-read" : "notification-unread"
              }`}
            >
              <div
                className={`notification-type-icon notification-type-${(
                  notification.type || "INFO"
                ).toLowerCase()}`}
              >
                {notification.type === "ERROR"
                  ? "⚠"
                  : notification.type === "WARNING"
                  ? "⚡"
                  : notification.type === "SUCCESS"
                  ? "✓"
                  : "ℹ"}
              </div>

              <div className="notification-content">
                <div className="notification-title-row">
                  <h3>{notification.title}</h3>

                  {!notification.read && (
                    <span className="notification-unread-badge">
                      New
                    </span>
                  )}
                </div>

                <p className="notification-message">
                  {notification.message}
                </p>

                <div className="notification-metadata">
                  <span className="notification-type-label">
                    {notification.type || "INFO"}
                  </span>
                  <span>{formatDate(notification.createdAt)}</span>
                </div>
              </div>

              <div className="notification-actions">
                {!notification.read && (
                  <button
                    type="button"
                    className="notification-read-button"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    ✓ Mark read
                  </button>
                )}

                <button
                  type="button"
                  className="notification-delete-button"
                  onClick={() => handleDelete(notification.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
