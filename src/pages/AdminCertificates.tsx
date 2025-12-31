import { useState, useEffect } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GlassCard from "@/components/GlassCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import { toast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Award,
  Copy,
  Download,
  LogOut,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const certificateSchema = z.object({
  recipientName: z.string().trim().min(1, "Name is required").max(100),
  recipientEmail: z.string().trim().email("Invalid email address").max(255),
  certificateType: z.string().min(1, "Certificate type is required"),
});

interface Certificate {
  id: string;
  certificate_id: string;
  recipient_name: string;
  recipient_email: string;
  certificate_type: string;
  issued_at: string;
}

const certificateTypeLabels: Record<string, string> = {
  participant: "Participant",
  winner_1: "1st Place Winner",
  winner_2: "2nd Place Winner",
  winner_3: "3rd Place Winner",
  winner_4: "4th Place Winner",
  winner_5: "5th Place Winner",
  winner_6: "6th Place Winner",
  winner_7: "7th Place Winner",
  winner_8: "8th Place Winner",
  winner_9: "9th Place Winner",
  winner_10: "10th Place Winner",
};

const AdminCertificates = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [certificateType, setCertificateType] = useState("participant");
  const [isGenerating, setIsGenerating] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchCertificates = async () => {
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching certificates:", error);
      toast({
        title: "Error",
        description: "Failed to load certificates",
        variant: "destructive",
      });
    } else {
      setCertificates(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Validate inputs
    const result = certificateSchema.safeParse({
      recipientName,
      recipientEmail,
      certificateType,
    });

    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      setIsGenerating(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-certificate",
        {
          body: {
            recipientName: recipientName.trim(),
            recipientEmail: recipientEmail.trim(),
            certificateType,
          },
        }
      );

      if (error) {
        throw error;
      }

      if (data?.error) {
        toast({
          title: "Generation Failed",
          description: data.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Certificate Generated!",
          description: `Certificate created for ${recipientName}`,
        });

        // Reset form
        setRecipientName("");
        setRecipientEmail("");
        setCertificateType("participant");

        // Refresh list
        fetchCertificates();
      }
    } catch (error: any) {
      console.error("Error generating certificate:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate certificate",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyVerificationUrl = (certificateId: string) => {
    const url = `${window.location.origin}/certificate/${certificateId}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: "Verification URL copied to clipboard",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.recipient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.recipient_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-12">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-10 h-10 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Certificate Generator
              </h1>
            </div>
            <p className="text-muted-foreground">
              Generate and manage LovHack 2026 certificates
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Generate Form */}
            <GlassCard hover={false}>
              <div className="flex items-center gap-2 mb-6">
                <Plus className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Generate Certificate
                </h2>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Recipient Name</Label>
                  <Input
                    id="recipientName"
                    placeholder="John Doe"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipientEmail">Recipient Email</Label>
                  <Input
                    id="recipientEmail"
                    type="email"
                    placeholder="john@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificateType">Certificate Type</Label>
                  <Select
                    value={certificateType}
                    onValueChange={setCertificateType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="participant">Participant</SelectItem>
                      <SelectItem value="winner_1">1st Place Winner</SelectItem>
                      <SelectItem value="winner_2">2nd Place Winner</SelectItem>
                      <SelectItem value="winner_3">3rd Place Winner</SelectItem>
                      <SelectItem value="winner_4">4th Place Winner</SelectItem>
                      <SelectItem value="winner_5">5th Place Winner</SelectItem>
                      <SelectItem value="winner_6">6th Place Winner</SelectItem>
                      <SelectItem value="winner_7">7th Place Winner</SelectItem>
                      <SelectItem value="winner_8">8th Place Winner</SelectItem>
                      <SelectItem value="winner_9">9th Place Winner</SelectItem>
                      <SelectItem value="winner_10">10th Place Winner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full glass-button-primary"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4 mr-2" />
                      Generate Certificate
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>

            {/* Certificates List */}
            <GlassCard hover={false}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Generated Certificates
                </h2>
                <span className="text-sm text-muted-foreground">
                  {certificates.length} total
                </span>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* List */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                  </div>
                ) : filteredCertificates.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    {searchQuery
                      ? "No certificates found"
                      : "No certificates generated yet"}
                  </div>
                ) : (
                  filteredCertificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-xl bg-secondary/50 border border-border"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">
                            {cert.recipient_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {cert.recipient_email}
                          </p>
                          <p className="text-xs text-primary">
                            {certificateTypeLabels[cert.certificate_type] ||
                              cert.certificate_type}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyVerificationUrl(cert.certificate_id)}
                            title="Copy verification URL"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Issued:{" "}
                        {new Date(cert.issued_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCertificates;
