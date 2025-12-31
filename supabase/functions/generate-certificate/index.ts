import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

    // Get auth header for user verification
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify user and check admin role
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);

    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Invalid authentication" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check admin role
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
    });

    // Return success response
    // NOTE: PDF generation with template overlay will be implemented when templates are uploaded
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
