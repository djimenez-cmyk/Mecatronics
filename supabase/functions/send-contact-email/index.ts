import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

serve(async (req) => {
  // ✅ CORS preflight
  if (req?.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*", // DO NOT CHANGE THIS
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*" // DO NOT CHANGE THIS
      }
    });
  }

  try {
    const { name, email, phone, company, projectType, message, contactPreference } = await req?.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        error: "Missing required fields: name, email, and message are required"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    const RESEND_API_KEY = Deno?.env?.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({
        error: "RESEND_API_KEY not configured"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // Build email HTML content
    const emailHtml = `
      <h2>Nuevo Mensaje de Contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Correo Electrónico:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
      <p><strong>Empresa:</strong> ${company || 'No proporcionada'}</p>
      <p><strong>Tipo de Proyecto:</strong> ${projectType || 'No especificado'}</p>
      <p><strong>Preferencia de Contacto:</strong> ${contactPreference || 'No especificada'}</p>
      <hr>
      <h3>Mensaje:</h3>
      <p>${message}</p>
    `;

    // Send email via Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "omartinez@infoportal-mx.com",
        subject: `Nuevo Contacto: ${projectType || 'Consulta General'} - ${name}`,
        html: emailHtml
      })
    });

    if (!resendResponse?.ok) {
      const errorData = await resendResponse?.json();
      return new Response(JSON.stringify({
        error: "Failed to send email",
        details: errorData
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    const resendData = await resendResponse?.json();

    return new Response(JSON.stringify({
      success: true,
      message: "Email sent successfully",
      emailId: resendData.id
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // DO NOT CHANGE THIS
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // DO NOT CHANGE THIS
      }
    });
  }
});