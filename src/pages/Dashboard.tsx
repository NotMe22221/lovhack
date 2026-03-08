import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { User, FolderOpen, Award, MessageSquare, Key, FileText } from "lucide-react";
import { useState } from "react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "My Projects", icon: FolderOpen },
  { id: "contributions", label: "Contributions", icon: Award },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "credits", label: "API Credits", icon: Key },
  { id: "certificates", label: "Certificates", icon: FileText },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 shrink-0">
            <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Profile</h2>
                <p className="text-muted-foreground">
                  Signed in as <span className="text-foreground font-medium">{user?.email}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Profile editing will be available in the next update.
                </p>
              </div>
            )}
            {activeTab === "projects" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">My Projects</h2>
                <p className="text-muted-foreground">You haven't submitted any projects yet.</p>
                <Button asChild className="mt-4 rounded-xl">
                  <a href="/submit">Submit a Project</a>
                </Button>
              </div>
            )}
            {activeTab === "contributions" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Contributions</h2>
                <p className="text-muted-foreground">No team contributions yet.</p>
              </div>
            )}
            {activeTab === "messages" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Messages</h2>
                <p className="text-muted-foreground">No messages yet.</p>
              </div>
            )}
            {activeTab === "credits" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">API Credits</h2>
                <p className="text-muted-foreground">No sponsor credits available right now.</p>
              </div>
            )}
            {activeTab === "certificates" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Certificates</h2>
                <p className="text-muted-foreground">Your certificates will appear here after a hackathon ends.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
