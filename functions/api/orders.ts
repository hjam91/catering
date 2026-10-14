interface Env {
  BREVO_API_KEY?: string;
  BREVO_SENDER_EMAIL?: string;
  BREVO_SENDER_NAME?: string;
  BREVO_NOTIFICATION_EMAIL?: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const order = await context.request.json() as any;

    const apiKey = context.env.BREVO_API_KEY;
    const senderEmail = context.env.BREVO_SENDER_EMAIL || 'orders@umberscatering.com';
    const senderName = context.env.BREVO_SENDER_NAME || 'Umbers Food Catering Service';
    const notificationEmail = context.env.BREVO_NOTIFICATION_EMAIL || senderEmail;

    if (!apiKey) {
      // Return order accepted but note that Brevo key is not configured in Cloudflare environment
      return new Response(JSON.stringify({
        success: true,
        orderId: order?.id,
        emailSent: false,
        warning: 'BREVO_API_KEY environment variable is not configured in Cloudflare Pages.'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 1. Send confirmation email to Customer
    const customerPayload = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: order.customer.email, name: order.customer.fullName }],
      subject: `Order Received (${order.id}) - Umbers Food Catering Service`,
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 12px;">
          <div style="background: #C2410C; color: white; padding: 16px; border-radius: 8px; text-align: center;">
            <h1 style="margin: 0; font-size: 20px;">Umbers Food Catering Service</h1>
            <p style="margin: 4px 0 0; font-size: 13px;">100% Zabiha Halal • Brooklyn, NY</p>
          </div>
          <div style="padding: 20px 0;">
            <p>Assalamu Alaikum / Hello <strong>${order.customer.fullName}</strong>,</p>
            <p>We received your catering request <strong>#${order.id}</strong> for <strong>${order.eventDetails.guestCount} guests</strong> on <strong>${order.eventDetails.date}</strong> in Brooklyn.</p>
            <p><strong>Delivery Address:</strong> ${order.eventDetails.address}, ${order.eventDetails.city}, NY ${order.eventDetails.postalCode}</p>
            <p><strong>Estimated Total:</strong> $${order.pricing?.total?.toFixed(2) || '0.00'}</p>
            <div style="background: #FFF7ED; border-left: 4px solid #EA580C; padding: 12px; margin: 16px 0;">
              Chef Umber will review your date and reach out at <strong>${order.customer.phone}</strong> to confirm your custom spice level and timing.
            </div>
          </div>
          <div style="font-size: 11px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 10px;">
            Umbers Food Catering Service • (555) 728-6772 • Exclusively Serving Brooklyn, NY
          </div>
        </div>
      `,
    };

    // 2. Send alert email to Kitchen
    const kitchenPayload = {
      sender: { name: 'Umbers Catering System', email: senderEmail },
      to: [{ email: notificationEmail, name: 'Chef Umber Kitchen Prep' }],
      subject: `🔔 NEW ORDER ${order.id}: ${order.customer.fullName} (${order.eventDetails.guestCount} guests on ${order.eventDetails.date})`,
      htmlContent: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #C2410C;">🔔 New Booking: ${order.id}</h2>
          <p><strong>Customer:</strong> ${order.customer.fullName} (<a href="tel:${order.customer.phone}">${order.customer.phone}</a>)</p>
          <p><strong>Email:</strong> ${order.customer.email}</p>
          <p><strong>Date & Time:</strong> ${order.eventDetails.date} at ${order.eventDetails.time}</p>
          <p><strong>Guests:</strong> ${order.eventDetails.guestCount} (Max 50)</p>
          <p><strong>Address:</strong> ${order.eventDetails.address}, ${order.eventDetails.city}, NY ${order.eventDetails.postalCode}</p>
          <p><strong>Occasion:</strong> ${order.eventDetails.eventType}</p>
          <p><strong>Total:</strong> $${order.pricing?.total?.toFixed(2)}</p>
          ${order.customer.specialRequests ? `<p><strong>Notes:</strong> ${order.customer.specialRequests}</p>` : ''}
        </div>
      `,
    };

    // Dispatch to Brevo REST API
    const [custRes, kitRes] = await Promise.allSettled([
      fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey.trim(),
          'content-type': 'application/json',
        },
        body: JSON.stringify(customerPayload),
      }),
      fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey.trim(),
          'content-type': 'application/json',
        },
        body: JSON.stringify(kitchenPayload),
      }),
    ]);

    return new Response(JSON.stringify({
      success: true,
      orderId: order.id,
      emailSent: custRes.status === 'fulfilled' && (custRes.value as any).ok,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message || 'Failed to process order'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const onRequestGet = async () => {
  return new Response(JSON.stringify({
    success: true,
    service: 'Umbers Food Catering Service API',
    provider: 'Brevo Transactional Email Provider',
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
