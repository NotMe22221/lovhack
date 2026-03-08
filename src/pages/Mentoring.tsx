import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Users, Calendar } from "lucide-react";

const Mentoring = () => {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("mentor_profiles")
        .select("*, profiles:user_id(name, avatar_url)")
        .eq("available", true);
      setMentors(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mentoring | LovHack</title>
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Mentor Network
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Mentoring</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with experienced builders who can guide your hackathon journey
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : mentors.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Mentor applications opening soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                  {mentor.photo_url ? (
                    <img src={mentor.photo_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Users className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-foreground">{mentor.profiles?.name || "Mentor"}</h3>
                {mentor.company && <p className="text-sm text-muted-foreground">{mentor.company}</p>}
                {mentor.expertise && <p className="text-xs text-primary mt-1">{mentor.expertise}</p>}
                <Button variant="outline" size="sm" className="mt-4 rounded-xl">
                  <Calendar className="w-3 h-3 mr-1" /> Book Session
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Mentoring;
