import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GlassCard from "@/components/GlassCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  CheckCircle, 
  XCircle, 
  Heart, 
  ArrowLeft, 
  Download,
  ChevronDown,
  Linkedin,
  Twitter,
} from "lucide-react";

interface Certificate {
  certificate_id: string;
  recipient_name: string;
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
      // Use RPC function for public verification (doesn't expose email)
      const { data, error } = await supabase
        .rpc("verify_certificate", { p_certificate_id: certificateId });

      if (error || !data || data.length === 0) {
        setNotFound(true);
      } else {
        setCertificate(data[0]);
      }
      setIsLoading(false);
    };

    fetchCertificate();
  }, [certificateId]);

  const generateCertificateCanvas = (): Promise<HTMLCanvasElement> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx || !certificate) {
        reject(new Error("Canvas or certificate not available"));
        return;
      }

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw template
        ctx.drawImage(img, 0, 0);
        
        // Add recipient name in the blank area (around 38% from top)
        const nameY = img.height * 0.42;
        const fontSize = Math.min(72, img.width / 12);
        ctx.font = `bold ${fontSize}px 'Dancing Script', cursive, serif`;
        ctx.fillStyle = "#8B4513";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(certificate.recipient_name, canvas.width / 2, nameY);

        // Cover the placeholder text with background, then add real URL
        const urlY = img.height * 0.978;
        const urlFontSize = Math.min(14, img.width / 70);
        const urlText = `Certificate Verification URL : https://lovhack.dev/certificate/${certificate.certificate_id}`;
        
        // Measure text to create proper background
        ctx.font = `${urlFontSize}px Arial, sans-serif`;
        const textWidth = ctx.measureText(urlText).width;
        
        // Draw background rectangle to cover placeholder
        ctx.fillStyle = "#FDF5E6";
        ctx.fillRect(canvas.width / 2 - textWidth / 2 - 20, urlY - urlFontSize - 2, textWidth + 40, urlFontSize * 2 + 4);
        
        // Draw the real URL text
        ctx.fillStyle = "#333333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(urlText, canvas.width / 2, urlY);

        resolve(canvas);
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = "/certificate-template-v2.jpg";
    });
  };

  const handleDownload = async (format: "png" | "jpeg" | "pdf") => {
    if (!certificate) return;

    try {
      const canvas = await generateCertificateCanvas();
      const fileName = `LovHack2026-Certificate-${certificate.recipient_name.replace(/\s+/g, "-")}`;

      if (format === "pdf") {
        const { jsPDF } = await import("jspdf");
        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${fileName}.pdf`);
      } else {
        const link = document.createElement("a");
        link.download = `${fileName}.${format}`;
        link.href = canvas.toDataURL(`image/${format}`, format === "jpeg" ? 0.95 : 1);
        link.click();
      }
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  };

  const shareUrl = certificate 
    ? `https://lovhack.dev/certificate/${certificate.certificate_id}` 
    : "";

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const shareOnTwitter = () => {
    const text = `I participated in LovHack 2026 Hackathon! Check out my certificate:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

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
            <div className="w-full max-w-4xl space-y-6">
              {/* Certificate Display */}
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Template Background */}
                <div className="relative">
                  <img 
                    src="/certificate-template-v2.jpg" 
                    alt="Certificate Template"
                    className="w-full h-auto"
                  />
                  {/* Overlay Name in blank area */}
                  <div 
                    className="absolute left-0 right-0 flex items-center justify-center"
                    style={{ top: "38%" }}
                  >
                    <span 
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center px-4"
                      style={{ 
                        fontFamily: "'Dancing Script', cursive, serif",
                        color: "#8B4513",
                      }}
                    >
                      {certificate?.recipient_name}
                    </span>
                  </div>
                  {/* Overlay Verification URL at the bottom to cover the placeholder */}
                  <div 
                    className="absolute left-0 right-0 flex items-center justify-center"
                    style={{ bottom: "2.2%" }}
                  >
                    <span 
                      className="text-xs sm:text-sm px-8 py-2"
                      style={{ 
                        color: "#333333",
                        fontFamily: "Arial, sans-serif",
                        backgroundColor: "#FDF5E6",
                      }}
                    >
                      Certificate Verification URL : https://lovhack.dev/certificate/{certificate?.certificate_id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Valid Badge */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-semibold text-green-600 text-lg">VERIFIED CERTIFICATE</span>
                </div>
              </div>

              {/* Action Buttons */}
              <GlassCard hover={false} className="!p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="flex-1 gap-2">
                        <Download className="w-4 h-4" />
                        Download Certificate
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleDownload("png")}>
                        Download as PNG
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload("jpeg")}>
                        Download as JPEG
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload("pdf")}>
                        Download as PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button 
                    variant="outline"
                    onClick={shareOnLinkedIn}
                    className="flex-1 gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    Add to LinkedIn
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={shareOnTwitter}
                    className="flex-1 gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    Share on X
                  </Button>
                </div>
              </GlassCard>

              {/* Certificate Details */}
              <GlassCard hover={false}>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Heart className="w-6 h-6 text-primary fill-primary" />
                  <span className="text-xl font-bold text-foreground">Certificate Details</span>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-muted-foreground">Recipient</p>
                    <p className="font-medium text-foreground">{certificate?.recipient_name}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-muted-foreground">Certificate Type</p>
                    <p className="font-medium text-foreground">
                      {certificateTypeLabels[certificate?.certificate_type || ""] || certificate?.certificate_type}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-muted-foreground">Event</p>
                    <p className="font-medium text-foreground">{certificate?.hackathon_name}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-muted-foreground">Issue Date</p>
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

                <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                  <p className="text-muted-foreground text-sm">Certificate ID</p>
                  <p className="font-mono text-xs text-foreground break-all">
                    {certificate?.certificate_id}
                  </p>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateVerification;
