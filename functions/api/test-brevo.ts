interface Env {
  BREVO_API_KEY?: string;
  BREVO_SENDER_EMAIL?: string;
  BREVO_SENDER_NAME?: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const body = await context.request.json() as any;
    const apiKey = body.apiKey || context.env.BREVO_API_KEY;
    const senderEmail = body.senderEmail || context.env.BREVO_SENDER_EMAIL || 'orders@umberscatering.com';
    const senderName = body.senderName || context.env.BREVO_SENDER_NAME || 'Umbers Food Catering Service';
    const recipientEmail = body.recipientEmail;

    if (!apiKey) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Brevo API key is not configured.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!recipientEmail) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Recipient email is required for testing.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey.trim(),
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: recipientEmail }],
        subject: '🧪 Brevo Test Email — Umbers Food Catering Service',
        htmlContent: `
          <div style="font-family: sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #C2410C;">✅ Brevo Email Provider Connected!</h2>
            <p>Your Cloudflare Pages Function successfully communicated with the Brevo Transactional Email API.</p>
            <p style="font-size: 13px; color: #555;">
              <strong>Sender:</strong> ${senderEmail} (${senderName})<br>
              <strong>Recipient:</strong> ${recipientEmail}<br>
              <strong>Status:</strong> Active & Ready for Orders
            </p>
          </div>
        `,
      }),
    });

    const data = await response.json() as any;

    if (!response.ok) {
      return new Response(JSON.stringify({
        success: false,
        error: data.message || `Brevo returned HTTP ${response.status}`,
        details: data,
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      messageId: data.messageId,
      message: 'Test email successfully dispatched via Brevo!',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message || 'Internal error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
