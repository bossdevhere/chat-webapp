import { useState } from "react";
import { Camera, Loader2 } from "lucide-react";

const OnboardingPage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedImg(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    // Simulate API call
    setTimeout(() => setIsUpdatingProfile(false), 2000);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
          <p className="text-base-content/60 mb-8">Add a profile picture to get started.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-base-200 overflow-hidden bg-base-300">
                  {selectedImg ? (
                    <img src={selectedImg} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-base-content/30">
                      <Camera className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-primary hover:bg-primary-focus p-2 rounded-full cursor-pointer transition-colors shadow-lg"
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <p className="text-sm text-base-content/60">
                Click the camera icon to upload a photo
              </p>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isUpdatingProfile}>
              {isUpdatingProfile ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Complete Setup"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;