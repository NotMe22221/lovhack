import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Certificate template configuration
const TEMPLATE_CONFIG = {
  // Position for participant name (center of where "participant" text is)
  nameX: 650,  // Center X position
  nameY: 400,  // Y position for name
  fontSize: 72,
  fontFamily: "Dancing Script, cursive",
  textColor: "#2c3e50",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get authenticated user from Supabase JWT (automatically validated by verify_jwt = true)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get user from the already-validated JWT token
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);

    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Invalid authentication" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check admin role (additional authorization layer)
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const { recipientName, recipientEmail, certificateType } = await req.json();

    // Comprehensive input validation
    const validCertificateTypes = [
      'participant', 'winner_1', 'winner_2', 'winner_3', 'winner_4',
      'winner_5', 'winner_6', 'winner_7', 'winner_8', 'winner_9', 'winner_10'
    ];

    // Validate recipientName
    if (!recipientName || typeof recipientName !== 'string' || 
        recipientName.trim().length === 0 || recipientName.length > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid recipient name: must be 1-100 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate recipientEmail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!recipientEmail || typeof recipientEmail !== 'string' ||
        !emailRegex.test(recipientEmail) || recipientEmail.length > 255) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate certificateType
    if (!validCertificateTypes.includes(certificateType)) {
      return new Response(
        JSON.stringify({ error: "Invalid certificate type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Trim and normalize inputs
    const trimmedName = recipientName.trim();
    const trimmedEmail = recipientEmail.trim().toLowerCase();

    // Check for duplicate certificate
    const { data: existingCert } = await supabase
      .from("certificates")
      .select("id")
      .eq("recipient_email", trimmedEmail)
      .eq("certificate_type", certificateType)
      .maybeSingle();

    if (existingCert) {
      return new Response(
        JSON.stringify({ error: `A ${certificateType} certificate already exists for this email` }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate unique certificate ID (UUID v4)
    const certificateId = crypto.randomUUID();
    const verificationUrl = `https://lovhack.dev/certificate/${certificateId}`;

    // Generate certificate image with participant name using SVG overlay
    const certificateImageUrl = await generateCertificateImage(
      supabase,
      trimmedName,
      certificateId,
      verificationUrl
    );

    // Store certificate in database
    const { data: certificate, error: insertError } = await supabase
      .from("certificates")
      .insert({
        certificate_id: certificateId,
        recipient_name: trimmedName,
        recipient_email: trimmedEmail,
        certificate_type: certificateType,
        hackathon_name: "LovHack 2026",
        issuer_name: "LovHack Team",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting certificate:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create certificate record" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Certificate created successfully:", {
      certificateId,
      recipientName: trimmedName,
      certificateType,
      imageUrl: certificateImageUrl,
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        certificate: {
          id: certificate.id,
          certificateId: certificateId,
          recipientName: trimmedName,
          recipientEmail: trimmedEmail,
          certificateType: certificateType,
          verificationUrl: verificationUrl,
          imageUrl: certificateImageUrl,
          issuedAt: certificate.issued_at,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    // Log full details server-side for debugging
    console.error("Error in generate-certificate function:", error);
    
    // Return generic error to client (never expose internal error details)
    return new Response(
      JSON.stringify({ 
        error: "An unexpected error occurred. Please try again or contact support if the issue persists." 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function generateCertificateImage(
  supabase: any,
  recipientName: string,
  certificateId: string,
  verificationUrl: string
): Promise<string> {
  // Create an SVG overlay with the recipient name positioned over the template
  // The template image will be embedded and the name overlaid on top
  
  const templateWidth = 1300;
  const templateHeight = 919;
  
  // Create SVG with the name positioned in the correct location
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${templateWidth}" height="${templateHeight}" viewBox="0 0 ${templateWidth} ${templateHeight}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&amp;display=swap');
      .name-text {
        font-family: 'Dancing Script', cursive;
        font-size: 72px;
        font-weight: 700;
        fill: #8B4513;
        text-anchor: middle;
      }
      .verification-text {
        font-family: Arial, sans-serif;
        font-size: 14px;
        fill: #666666;
        text-anchor: middle;
      }
    </style>
  </defs>
  
  <!-- Participant name - positioned where "participant" placeholder is -->
  <text x="${templateWidth / 2}" y="430" class="name-text">${escapeXml(recipientName)}</text>
  
  <!-- Verification URL at the bottom -->
  <text x="${templateWidth / 2}" y="880" class="verification-text">${escapeXml(verificationUrl)}</text>
</svg>`;

  // Convert SVG to bytes
  const svgBytes = new TextEncoder().encode(svgContent);
  
  // Upload the SVG overlay to storage
  const overlayPath = `overlays/${certificateId}.svg`;
  const { error: uploadError } = await supabase.storage
    .from("certificates")
    .upload(overlayPath, svgBytes, {
      contentType: "image/svg+xml",
      upsert: true,
    });

  if (uploadError) {
    console.error("Error uploading certificate overlay:", uploadError);
    throw new Error("Failed to generate certificate image");
  }

  // Get public URL for the overlay
  const { data: urlData } = supabase.storage
    .from("certificates")
    .getPublicUrl(overlayPath);

  return urlData.publicUrl;
}

// Helper function to escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
