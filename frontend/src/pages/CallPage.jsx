import { Mic, MicOff, Video, VideoOff, PhoneOff, Users } from "lucide-react";
import { useState } from "react";

const CallPage = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="h-screen bg-neutral flex flex-col">
      {/* Video Area */}
      <div className="flex-1 relative p-4 flex items-center justify-center">
        {/* Remote User Video (Main) */}
        <div className="w-full h-full max-w-5xl bg-black rounded-2xl overflow-hidden relative shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
            alt="Remote User" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute bottom-4 left-4 text-white bg-black/50 px-3 py-1 rounded-lg">
            Alice Johnson
          </div>
        </div>

        {/* Local User Video (PiP) */}
        <div className="absolute bottom-8 right-8 w-48 h-36 bg-gray-800 rounded-xl overflow-hidden border-2 border-base-100 shadow-xl">
          <div className="w-full h-full flex items-center justify-center bg-neutral-focus text-neutral-content">
            {isVideoOff ? <div className="text-sm">Camera Off</div> : (
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" alt="Me" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="h-20 bg-base-100 flex items-center justify-center gap-6 shadow-lg z-10">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`btn btn-circle btn-lg ${isMuted ? "btn-error" : "btn-ghost bg-base-200"}`}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        
        <button className="btn btn-circle btn-error btn-lg px-8 w-auto">
          <PhoneOff className="w-8 h-8" />
        </button>

        <button 
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`btn btn-circle btn-lg ${isVideoOff ? "btn-error" : "btn-ghost bg-base-200"}`}
        >
          {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default CallPage;