import { useState } from "react";
import { Search, Send, Phone, Video, MoreVertical, Image as ImageIcon } from "lucide-react";

const ChatPage = () => {
  const [messageInput, setMessageInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data
  const users = [
    { id: 1, name: "Alice Johnson", status: "online", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
    { id: 2, name: "Bob Smith", status: "offline", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" },
    { id: 3, name: "Charlie Brown", status: "online", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie" },
  ];

  return (
    <div className="h-screen bg-base-200 flex pt-16 pb-4 px-4 gap-4">
      {/* Sidebar - Users List */}
      <div className="w-80 bg-base-100 rounded-lg shadow-lg flex flex-col">
        <div className="p-4 border-b border-base-300">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-base-content/40" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="input input-bordered w-full pl-10 h-10"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                selectedUser?.id === user.id ? "bg-base-200" : "hover:bg-base-200"
              }`}
            >
              <div className={`avatar ${user.status === "online" ? "online" : "offline"}`}>
                <div className="w-10 rounded-full">
                  <img src={user.avatar} alt={user.name} />
                </div>
              </div>
              <div className="text-left">
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-base-content/60">{user.status}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-base-100 rounded-lg shadow-lg flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-base-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={selectedUser.avatar} alt={selectedUser.name} />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">{selectedUser.name}</h3>
                  <p className="text-xs text-base-content/70">{selectedUser.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn btn-ghost btn-circle btn-sm"><Phone className="w-5 h-5" /></button>
                <button className="btn btn-ghost btn-circle btn-sm"><Video className="w-5 h-5" /></button>
                <button className="btn btn-ghost btn-circle btn-sm"><MoreVertical className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-center text-base-content/40 text-sm my-4">
                Start of conversation with {selectedUser.name}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-base-300">
              <div className="flex items-center gap-2">
                <button className="btn btn-ghost btn-circle btn-sm">
                  <ImageIcon className="w-5 h-5 text-base-content/60" />
                </button>
                <input
                  type="text"
                  className="input input-bordered flex-1"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button className="btn btn-primary btn-circle">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-base-content/40">
            <div className="w-16 h-16 bg-base-200 rounded-2xl flex items-center justify-center mb-4 animate-bounce">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Welcome to ChatApp</h3>
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;