import { Bell, MessageSquare, UserPlus, Star } from "lucide-react";

const NotificationsPage = () => {
  const notifications = [
    { id: 1, type: "message", content: "Alice sent you a new message", time: "2m ago", read: false },
    { id: 2, type: "follow", content: "Bob started following you", time: "1h ago", read: true },
    { id: 3, type: "like", content: "Charlie liked your photo", time: "3h ago", read: true },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "message": return <MessageSquare className="w-5 h-5 text-primary" />;
      case "follow": return <UserPlus className="w-5 h-5 text-secondary" />;
      case "like": return <Star className="w-5 h-5 text-accent" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-base-200 pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button className="btn btn-ghost btn-sm">Mark all as read</button>
        </div>

        <div className="bg-base-100 rounded-lg shadow-xl overflow-hidden">
          {notifications.length > 0 ? (
            <div className="divide-y divide-base-300">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-4 flex items-center gap-4 hover:bg-base-200 transition-colors ${!notification.read ? "bg-base-200/50" : ""}`}>
                  <div className="p-2 bg-base-200 rounded-full">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{notification.content}</p>
                    <p className="text-xs text-base-content/60">{notification.time}</p>
                  </div>
                  {!notification.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-base-content/60">No notifications yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;