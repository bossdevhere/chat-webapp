import { MessageSquare, Users, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl font-bold">Connect Instantly</h1>
            <p className="py-6 text-base-content/70">
              Experience real-time communication with a beautiful, modern interface. 
              Join our community and start chatting today.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signup" className="btn btn-primary">Get Started</Link>
              <Link to="/login" className="btn btn-outline">Login</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="p-3 rounded-lg bg-secondary/10 text-secondary mb-2">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="card-title">Real-time Messaging</h2>
              <p className="text-sm text-base-content/60">Instant delivery and read receipts for seamless conversations.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="p-3 rounded-lg bg-accent/10 text-accent mb-2">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="card-title">Group Chats</h2>
              <p className="text-sm text-base-content/60">Create rooms and stay connected with your favorite communities.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="p-3 rounded-lg bg-primary/10 text-primary mb-2">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="card-title">Secure & Private</h2>
              <p className="text-sm text-base-content/60">Your privacy is our priority with end-to-end encryption.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-100 text-base-content rounded">
        <div>
          <p>Copyright © 2024 - All right reserved by ChatApp Inc</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
