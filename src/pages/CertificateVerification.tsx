import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GlassCard from "@/components/GlassCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import { CheckCircle, XCircle, Heart, ArrowLeft, Shield, Calendar, User, Award, Building, Hash } from "lucide-react";

interface Certificate {
  id: string;
  certificate_id: string;
  recipient_name: string;
  recipient_email: string;
  certificate_type: string;
  hackathon_name: string;
  issuer_name: string;
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

const CertificateVerification = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!certificateId) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("certificate_id", certificateId)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setCertificate(data);
      }
      setIsLoading(false);
    };

    fetchCertificate();
  }, [certificateId]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 pb-12">
          {isLoading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          ) : notFound ? (
            <GlassCard className="w-full max-w-md text-center" hover={false}>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-destructive" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Certificate Not Found
              </h1>
              <p className="text-muted-foreground mb-6">
                The certificate ID provided is invalid or does not exist in our records.
              </p>
              <p className="text-sm text-muted-foreground">
                If you believe this is an error, please contact the LovHack team.
              </p>
            </GlassCard>
          ) : (
            <GlassCard className="w-full max-w-lg" hover={false}>
              {/* Logo */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Heart className="w-8 h-8 text-primary fill-primary" />
                <span className="text-2xl font-bold text-foreground">LovHack</span>
              </div>

              {/* Valid Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-green-600">VALID CERTIFICATE</span>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                  <User className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Recipient</p>
                    <p className="font-medium text-foreground">{certificate?.recipient_name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                  <Award className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Certificate Type</p>
                    <p className="font-medium text-foreground">
                      {certificateTypeLabels[certificate?.certificate_type || ""] || certificate?.certificate_type}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                  <Building className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Event</p>
                    <p className="font-medium text-foreground">{certificate?.hackathon_name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Issued By</p>
                    <p className="font-medium text-foreground">{certificate?.issuer_name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Issue Date</p>
                    <p className="font-medium text-foreground">
                      {certificate?.issued_at
                        ? new Date(certificate.issued_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                  <Hash className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Certificate ID</p>
                    <p className="font-mono text-sm text-foreground break-all">
                      {certificate?.certificate_id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verification Message */}
              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground">
                  This certificate has been verified against official LovHack records.
                </p>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateVerification;
