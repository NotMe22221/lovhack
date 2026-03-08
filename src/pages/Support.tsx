import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle, Send } from "lucide-react";

const statusColors: Record<string, string> = {
  open: "bg-blue-100 text-blue-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-muted text-muted-foreground",
};

const Support = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<any[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("support_tickets")
      .select("*")
      .order("created_at", { ascending: false });
    setTickets(data || []);
  };

  useEffect(() => {
    fetchTickets();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("support_tickets").insert({
        user_id: user.id,
        subject,
        message,
      });
      if (error) throw error;
      toast({ title: "Ticket created", description: "We'll get back to you soon." });
      setSubject("");
      setMessage("");
      fetchTickets();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Support | LovHack</title></Helmet>
      <Navbar />
      <main className="pt-28 pb-16 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Support</h1>
          <p className="text-muted-foreground">Need help? Submit a ticket and we'll assist you.</p>
        </div>

        {!user ? (
          <p className="text-center text-muted-foreground">Please <a href="/login" className="text-primary underline">sign in</a> to create support tickets.</p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 mb-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder="What do you need help with?" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} placeholder="Describe your issue..." className="rounded-xl" />
              </div>
              <Button type="submit" className="rounded-xl" disabled={loading}>
                <Send className="w-4 h-4 mr-2" />
                {loading ? "Sending..." : "Submit Ticket"}
              </Button>
            </form>

            {tickets.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Your Tickets</h2>
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-card/80 border border-border/50 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-foreground">{ticket.subject}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{ticket.message}</p>
                        {ticket.admin_response && (
                          <div className="mt-3 bg-primary/5 rounded-xl p-3">
                            <p className="text-xs font-medium text-primary mb-1">Response:</p>
                            <p className="text-sm text-foreground">{ticket.admin_response}</p>
                          </div>
                        )}
                      </div>
                      <Badge className={statusColors[ticket.status] || ""}>{ticket.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Support;
