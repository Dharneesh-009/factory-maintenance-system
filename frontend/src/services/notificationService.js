
import api from "./api";

const notificationService = {
  // Get all notifications for the logged-in user
  getAll: async () => {
    const response = await api.get("/api/notifications");
    return response.data;
  },

  // Get unread notifications
  getUnread: async () => {
    const response = await api.get("/api/notifications/unread");
    return response.data;
  },

  // Get unread notification count
  getUnreadCount: async () => {
    const response = await api.get("/api/notifications/unread/count");
    return response.data.count;
  },

  // Mark one notification as read
  markAsRead: async (id) => {
    const response = await api.put(`/api/notifications/${id}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await api.put("/api/notifications/read-all");
    return response.data;
  },

  // Delete one notification
  deleteNotification: async (id) => {
    await api.delete(`/api/notifications/${id}`);
  },
};

export default notificationService;
