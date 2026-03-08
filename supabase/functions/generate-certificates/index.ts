import { createClient } from 'jsr:@supabase/supabase-js@2';
import { jsPDF } from "npm:jspdf@2.5.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { hackathon_id } = await req.json();

    if (!hackathon_id) {
      throw new Error('hackathon_id is required');
    }

    // Get hackathon details
    const { data: hackathon, error: hackError } = await supabaseClient
      .from('hackathons')
      .select('*')
      .eq('id', hackathon_id)
      .single();

    if (hackError) throw hackError;

    // Get all approved/winner projects for this hackathon with their owners
    const { data: projects, error: projError } = await supabaseClient
      .from('projects')
      .select('id, title, status, user_id, profiles!inner(name, email)')
      .eq('hackathon_id', hackathon_id)
      .in('status', ['approved', 'winner']);

    if (projError) throw projError;

    if (!projects || projects.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No projects found for certificate generation' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results = [];

    for (const project of projects) {
      const profile = (project as any).profiles;
      const recipientName = profile.name || 'Participant';
      const recipientEmail = profile.email;

      // Determine certificate type
      let certificateType: string;
      if (project.status === 'winner') {
        // For now, default to winner_1, can be enhanced to detect rank
        certificateType = 'participant'; // Or 'winner_1' if you want
      } else {
        certificateType = 'participant';
      }

      // Generate unique certificate ID
      const certId = `${hackathon.season}-${recipientName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;

      // Create PDF certificate
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      // Background
      doc.setFillColor(249, 250, 251);
      doc.rect(0, 0, 297, 210, 'F');

      // Border
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(2);
      doc.rect(10, 10, 277, 190);

      // Title
      doc.setFontSize(40);
      doc.setTextColor(59, 130, 246);
      doc.setFont('helvetica', 'bold');
      doc.text('Certificate of Participation', 148.5, 50, { align: 'center' });

      // Subtitle
      doc.setFontSize(16);
      doc.setTextColor(100, 116, 139);
      doc.setFont('helvetica', 'normal');
      doc.text('This is to certify that', 148.5, 70, { align: 'center' });

      // Recipient name
      doc.setFontSize(32);
      doc.setTextColor(30, 41, 59);
      doc.setFont('helvetica', 'bold');
      doc.text(recipientName, 148.5, 90, { align: 'center' });

      // Achievement text
      doc.setFontSize(14);
      doc.setTextColor(100, 116, 139);
      doc.setFont('helvetica', 'normal');
      doc.text(`has successfully participated in ${hackathon.name}`, 148.5, 105, { align: 'center' });
      doc.text(`and contributed to building innovative solutions`, 148.5, 115, { align: 'center' });

      // Project title
      doc.setFontSize(12);
      doc.setFont('helvetica', 'italic');
      doc.text(`Project: ${project.title}`, 148.5, 130, { align: 'center' });

      // Certificate ID
      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.text(`Certificate ID: ${certId}`, 148.5, 170, { align: 'center' });

      // Footer
      doc.setFontSize(12);
      doc.setTextColor(59, 130, 246);
      doc.text('LovHack Team', 148.5, 185, { align: 'center' });

      // Convert to blob
      const pdfBlob = doc.output('blob');
      const pdfBuffer = await pdfBlob.arrayBuffer();

      // Upload to storage
      const fileName = `${certId}.pdf`;
      const { error: uploadError } = await supabaseClient.storage
        .from('certificates')
        .upload(fileName, pdfBuffer, {
          contentType: 'application/pdf',
          upsert: true,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue;
      }

      // Get public URL
      const { data: urlData } = supabaseClient.storage
        .from('certificates')
        .getPublicUrl(fileName);

      // Insert certificate record
      const { error: insertError } = await supabaseClient
        .from('certificates')
        .insert({
          certificate_id: certId,
          certificate_type: certificateType,
          recipient_name: recipientName,
          recipient_email: recipientEmail,
          hackathon_name: hackathon.name,
          issuer_name: 'LovHack Team',
          pdf_url: urlData.publicUrl,
          image_url: null,
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        continue;
      }

      results.push({
        name: recipientName,
        email: recipientEmail,
        certificate_id: certId,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Generated ${results.length} certificates for ${hackathon.name}`,
        certificates: results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
