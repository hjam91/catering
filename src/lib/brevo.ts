/**
 * Brevo (formerly Sendinblue) Transactional Email Provider
 * API: https://api.brevo.com/v3/smtp/email
 */

import { CateringOrder } from '@/types/catering';

export interface BrevoConfig {
  apiKey: string;
  senderEmail: string;
  senderName: string;
  notificationEmail?: string;
}

const LOCAL_STORAGE_KEY = 'umbers_brevo_config';

/**
 * Get Brevo configuration from environment variables or browser storage
 */
export function getBrevoConfig(): BrevoConfig {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved Brevo config:', e);
      }
    }
  }

  return {
    apiKey: process.env.NEXT_PUBLIC_BREVO_API_KEY || process.env.BREVO_API_KEY || '',
    senderEmail: process.env.NEXT_PUBLIC_BREVO_SENDER_EMAIL || process.env.BREVO_SENDER_EMAIL || 'orders@umberscatering.com',
    senderName: process.env.NEXT_PUBLIC_BREVO_SENDER_NAME || process.env.BREVO_SENDER_NAME || 'Umbers Food Catering Service',
    notificationEmail: process.env.NEXT_PUBLIC_BREVO_NOTIFY_EMAIL || process.env.BREVO_NOTIFICATION_EMAIL || '',
  };
}

/**
 * Save Brevo configuration to browser local storage (for admin settings)
 */
export function saveBrevoConfig(config: BrevoConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  }
}

/**
 * Low-level API call to Brevo SMTP email endpoint
 */
export async function sendBrevoEmail({
  apiKey,
  sender,
  to,
  subject,
  htmlContent,
  replyTo,
}: {
  apiKey: string;
  sender: { email: string; name: string };
  to: Array<{ email: string; name?: string }>;
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!apiKey) {
    return { success: false, error: 'Brevo API key is not configured.' };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey.trim(),
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender,
        to,
        replyTo: replyTo || sender,
        subject,
        htmlContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errMsg = data.message || `Brevo API returned status ${response.status}`;
      console.error('Brevo API Error:', data);
      return { success: false, error: errMsg };
    }

    return { success: true, messageId: data.messageId };
  } catch (err: any) {
    console.error('Brevo network error:', err);
    return { success: false, error: err.message || 'Network request failed' };
  }
}

/**
 * Generate Customer Order Confirmation Email HTML
 */
export function generateCustomerConfirmationHtml(order: CateringOrder): string {
  const itemsRows = order.selectedItems.length > 0
    ? order.selectedItems.map(item => `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #eee; font-size: 13px; color: #333;">
            <strong>${item.name}</strong>
            <span style="font-size: 11px; color: #777; display: block;">${item.pricingType === 'per_person' ? 'Per Person' : 'Per Tray'}</span>
          </td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #eee; font-size: 13px; text-align: center; color: #555;">${item.quantity}</td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #eee; font-size: 13px; text-align: right; font-weight: bold; color: #222;">$${item.total.toFixed(2)}</td>
        </tr>
      `).join('')
    : '';

  const addonsRows = order.addons.length > 0
    ? order.addons.map(addon => `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #eee; font-size: 13px; color: #333;">
            <strong>${addon.name}</strong>
          </td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #eee; font-size: 13px; text-align: center; color: #555;">${addon.quantity}</td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #eee; font-size: 13px; text-align: right; font-weight: bold; color: #222;">$${addon.total.toFixed(2)}</td>
        </tr>
      `).join('')
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Catering Order Confirmation</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F6F2; margin: 0; padding: 20px 10px; color: #292524;">
      <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #E7E5E4;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #EA580C 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
          <div style="display: inline-block; background: rgba(0,0,0,0.2); padding: 4px 12px; border-radius: 20px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin-bottom: 10px; color: #FED7AA;">
            100% Zabiha Halal • Brooklyn, NY
          </div>
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">UMBERS Food Catering Service</h1>
          <p style="margin: 6px 0 0; font-size: 14px; color: #FFEDD5;">We have received your Brooklyn catering request!</p>
        </div>

        <div style="padding: 28px 24px;">
          
          <!-- Order ID & Status Pill -->
          <div style="background-color: #FFF7ED; border: 1px solid #FFEDD5; border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: center;">
            <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9A3412; font-weight: bold;">Order Reference</div>
            <div style="font-size: 26px; font-weight: 900; color: #C2410C; margin: 4px 0;">${order.id}</div>
            <div style="font-size: 12px; color: #78350F;">Status: <strong>Order Submitted • Under Review</strong></div>
          </div>

          <!-- Greeting -->
          <p style="font-size: 15px; line-height: 1.6; color: #44403C; margin-top: 0;">
            Assalamu Alaikum / Hello <strong>${order.customer.fullName}</strong>,<br>
            Thank you for booking with Umbers Food Catering Service. Chef Umber personally prepares every degh, karahi, and roast for gatherings up to 50 guests across Brooklyn.
          </p>

          <!-- Gathering Details Box -->
          <div style="background: #F5F5F4; border-radius: 12px; padding: 18px; margin: 20px 0;">
            <h3 style="margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #292524;">Gathering Logistics</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 4px 0; color: #78716C; width: 40%;"><strong>Event Date:</strong></td>
                <td style="padding: 4px 0; color: #1C1917; font-weight: bold;">${order.eventDetails.date}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #78716C;"><strong>Delivery Time:</strong></td>
                <td style="padding: 4px 0; color: #1C1917; font-weight: bold;">${order.eventDetails.time}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #78716C;"><strong>Guest Count:</strong></td>
                <td style="padding: 4px 0; color: #1C1917; font-weight: bold;">${order.eventDetails.guestCount} Guests</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #78716C;"><strong>Occasion:</strong></td>
                <td style="padding: 4px 0; color: #1C1917;">${order.eventDetails.eventType}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #78716C;"><strong>Delivery Location:</strong></td>
                <td style="padding: 4px 0; color: #1C1917; font-weight: bold;">
                  ${order.eventDetails.address}, ${order.eventDetails.city}, NY ${order.eventDetails.postalCode}
                </td>
              </tr>
            </table>
          </div>

          <!-- Menu Summary -->
          <h3 style="margin: 24px 0 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #292524;">Menu Selection</h3>
          <table style="width: 100%; border-collapse: collapse; background: #ffffff; border: 1px solid #E7E5E4; border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background: #F5F5F4; text-align: left; font-size: 12px; color: #57534E;">
                <th style="padding: 10px 14px; font-weight: 600;">Item</th>
                <th style="padding: 10px 14px; font-weight: 600; text-align: center;">Qty</th>
                <th style="padding: 10px 14px; font-weight: 600; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${order.selectedPackage ? `
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #eee; font-size: 13px; color: #333;">
                    <strong>${order.selectedPackage.name}</strong>
                    <span style="font-size: 11px; color: #777; display: block;">Full Package Spread ($${order.selectedPackage.pricePerPerson}/guest)</span>
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #eee; font-size: 13px; text-align: center; color: #555;">${order.selectedPackage.guestCount}</td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #eee; font-size: 13px; text-align: right; font-weight: bold; color: #222;">$${order.selectedPackage.total.toFixed(2)}</td>
                </tr>
              ` : ''}
              ${itemsRows}
              ${addonsRows}
            </tbody>
          </table>

          <!-- Price Tally -->
          <div style="margin-top: 16px; padding: 14px; background: #FAFAF9; border-radius: 8px; border: 1px solid #E7E5E4;">
            <table style="width: 100%; font-size: 13px; color: #44403C;">
              <tr>
                <td style="padding: 3px 0;">Subtotal:</td>
                <td style="text-align: right; font-weight: 600;">$${order.pricing.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 3px 0;">Brooklyn Delivery & Warm Chafers:</td>
                <td style="text-align: right; font-weight: 600;">$${order.pricing.deliveryFee.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 3px 0;">Service & Equipment Setup:</td>
                <td style="text-align: right; font-weight: 600;">$${order.pricing.serviceFee.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 3px 0;">Estimated Sales Tax:</td>
                <td style="text-align: right; font-weight: 600;">$${order.pricing.estimatedTax.toFixed(2)}</td>
              </tr>
              <tr style="border-top: 2px solid #E7E5E4; font-size: 16px; color: #1C1917;">
                <td style="padding: 10px 0 0; font-weight: 800;">Estimated Total:</td>
                <td style="padding: 10px 0 0; text-align: right; font-weight: 800; color: #C2410C;">$${order.pricing.total.toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <!-- Notes & Special Requests -->
          ${order.customer.dietaryNotes || order.customer.specialRequests ? `
            <div style="margin-top: 18px; padding: 12px; background: #FEF3C7; border-left: 4px solid #D97706; border-radius: 4px; font-size: 12px; color: #78350F;">
              <strong>Special Instructions / Notes:</strong><br>
              ${order.customer.dietaryNotes ? `Dietary: ${order.customer.dietaryNotes}<br>` : ''}
              ${order.customer.specialRequests ? `Notes: ${order.customer.specialRequests}` : ''}
            </div>
          ` : ''}

          <!-- Next Steps Banner -->
          <div style="margin-top: 24px; padding: 16px; background: #ECFDF5; border-radius: 12px; border: 1px solid #A7F3D0; font-size: 13px; color: #065F46;">
            <strong>✨ What Happens Next?</strong><br>
            Chef Umber will review your date availability and selections. We will contact you at <strong>${order.customer.phone}</strong> or by reply email within 24 hours to confirm your custom spice level, delivery window, and final details.
          </div>

          <!-- Contact Bar -->
          <div style="margin-top: 24px; text-align: center; font-size: 13px; color: #78716C;">
            Need to adjust something? Call or text our Brooklyn kitchen directly:<br>
            <strong style="color: #1C1917; font-size: 15px;">📞 (555) 728-6772</strong>
          </div>

        </div>

        <!-- Footer -->
        <div style="background: #292524; color: #A8A29E; padding: 20px 24px; text-align: center; font-size: 11px;">
          <p style="margin: 0 0 6px;">
            <strong>UMBERS Food Catering Service</strong> • Exclusively Serving Brooklyn, NY
          </p>
          <p style="margin: 0; color: #78716C;">
            100% Hand-Slaughtered Zabiha Halal • Maximum 50 Guests • Minimum 1 Week Notice
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
}

/**
 * Generate Kitchen / Staff Alert Email HTML
 */
export function generateKitchenAlertHtml(order: CateringOrder): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: sans-serif; background: #f4f4f4; padding: 20px; color: #222;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; border: 2px solid #C2410C; overflow: hidden;">
        <div style="background: #C2410C; color: #fff; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">🔔 NEW BROOKLYN CATERING ORDER</h2>
          <div style="font-size: 18px; font-weight: bold; margin-top: 6px;">Ref: ${order.id}</div>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 14px;">A new catering request was just placed online.</p>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 15px 0;">
            <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold; width: 35%;">Customer:</td><td style="padding: 6px;">${order.customer.fullName}</td></tr>
            <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold;">Phone:</td><td style="padding: 6px;"><a href="tel:${order.customer.phone}">${order.customer.phone}</a></td></tr>
            <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold;">Email:</td><td style="padding: 6px;">${order.customer.email}</td></tr>
            <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold;">Event Date:</td><td style="padding: 6px; color: #C2410C; font-weight: bold;">${order.eventDetails.date} (${order.eventDetails.time})</td></tr>
            <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold;">Guest Count:</td><td style="padding: 6px; font-weight: bold;">${order.eventDetails.guestCount} Guests</td></tr>
            <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold;">Delivery Address:</td><td style="padding: 6px; font-weight: bold;">${order.eventDetails.address}, ${order.eventDetails.city}, NY ${order.eventDetails.postalCode}</td></tr>
            <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold;">Occasion:</td><td style="padding: 6px;">${order.eventDetails.eventType}</td></tr>
            <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px; font-weight: bold;">Estimated Total:</td><td style="padding: 6px; font-weight: bold; color: #C2410C; font-size: 16px;">$${order.pricing.total.toFixed(2)}</td></tr>
          </table>

          ${order.selectedPackage ? `
            <div style="background: #FFF7ED; border: 1px solid #FFEDD5; padding: 12px; border-radius: 6px; margin: 12px 0;">
              <strong>Selected Package:</strong> ${order.selectedPackage.name} (${order.selectedPackage.guestCount} guests)
            </div>
          ` : ''}

          ${order.customer.specialRequests || order.customer.dietaryNotes ? `
            <div style="background: #FEF3C7; border-left: 4px solid #D97706; padding: 10px; margin: 12px 0; font-size: 13px;">
              <strong>Customer Notes / Requests:</strong><br>
              ${order.customer.dietaryNotes || ''}<br>
              ${order.customer.specialRequests || ''}
            </div>
          ` : ''}

          <div style="text-align: center; margin-top: 20px;">
            <a href="tel:${order.customer.phone}" style="display: inline-block; background: #C2410C; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
              Call Customer (${order.customer.phone})
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * High-level helper: Send both customer confirmation and kitchen alert
 */
export async function sendOrderEmailsWithBrevo(
  order: CateringOrder,
  customConfig?: Partial<BrevoConfig>
): Promise<{ customerSent: boolean; kitchenSent: boolean; errors: string[] }> {
  const config = { ...getBrevoConfig(), ...customConfig };
  const errors: string[] = [];

  if (!config.apiKey) {
    return {
      customerSent: false,
      kitchenSent: false,
      errors: ['Brevo API Key is missing. Set BREVO_API_KEY or configure in Staff Portal.']
    };
  }

  let customerSent = false;
  let kitchenSent = false;

  // 1. Send confirmation to the customer
  try {
    const customerRes = await sendBrevoEmail({
      apiKey: config.apiKey,
      sender: {
        email: config.senderEmail,
        name: config.senderName,
      },
      to: [
        {
          email: order.customer.email,
          name: order.customer.fullName,
        },
      ],
      subject: `Order Received (${order.id}) - Umbers Food Catering Service`,
      htmlContent: generateCustomerConfirmationHtml(order),
      replyTo: {
        email: config.senderEmail,
        name: config.senderName,
      },
    });

    if (customerRes.success) {
      customerSent = true;
    } else {
      errors.push(`Customer email failed: ${customerRes.error}`);
    }
  } catch (err: any) {
    errors.push(`Customer email exception: ${err.message}`);
  }

  // 2. Send notification to the kitchen/chef
  const notifyEmail = config.notificationEmail || config.senderEmail;
  if (notifyEmail) {
    try {
      const kitchenRes = await sendBrevoEmail({
        apiKey: config.apiKey,
        sender: {
          email: config.senderEmail,
          name: 'Umbers Catering System',
        },
        to: [
          {
            email: notifyEmail,
            name: 'Chef Umber Kitchen Prep',
          },
        ],
        subject: `🔔 NEW ORDER ${order.id}: ${order.customer.fullName} (${order.eventDetails.guestCount} guests on ${order.eventDetails.date})`,
        htmlContent: generateKitchenAlertHtml(order),
      });

      if (kitchenRes.success) {
        kitchenSent = true;
      } else {
        errors.push(`Kitchen notification failed: ${kitchenRes.error}`);
      }
    } catch (err: any) {
      errors.push(`Kitchen notification exception: ${err.message}`);
    }
  }

  return { customerSent, kitchenSent, errors };
}

/**
 * Send a test email to verify credentials
 */
export async function testBrevoEmail(
  recipientEmail: string,
  config?: Partial<BrevoConfig>
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const current = { ...getBrevoConfig(), ...config };

  if (!current.apiKey) {
    return { success: false, error: 'Brevo API key is required.' };
  }
  if (!current.senderEmail) {
    return { success: false, error: 'Sender email is required.' };
  }

  return sendBrevoEmail({
    apiKey: current.apiKey,
    sender: {
      email: current.senderEmail,
      name: current.senderName || 'Umbers Food Catering Service',
    },
    to: [{ email: recipientEmail }],
    subject: '🧪 Brevo Email Connection Test — Umbers Food Catering Service',
    htmlContent: `
      <div style="font-family: sans-serif; padding: 20px; color: #222; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #C2410C;">✅ Brevo Email Provider Connected!</h2>
        <p>This is a test notification confirming that Brevo transactional email delivery is configured properly for <strong>Umbers Food Catering Service</strong>.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
        <p style="font-size: 12px; color: #666;">
          <strong>Sender:</strong> ${current.senderEmail} (${current.senderName})<br>
          <strong>Delivered to:</strong> ${recipientEmail}<br>
          <strong>Timestamp:</strong> ${new Date().toISOString()}
        </p>
      </div>
    `,
  });
}
