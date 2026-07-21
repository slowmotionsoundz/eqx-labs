const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const nodemailer = require("nodemailer");

initializeApp();
const db = getFirestore();

// Gmail App Password stored as Firebase secret
const GMAIL_APP_PASSWORD = defineSecret("GMAIL_APP_PASSWORD");
const GMAIL_USER = "eqlabseu@gmail.com";


const PRICING_CONFIG = {
  currency: "SEK",
  tax_logic: "SE_VAT_25",
  services: {
    "eqx-hourly-base": { name: "Standard Session Block (Per Hour)", price: 500 },
    "eqx-pkg-4": { name: "4-Hour Time Bank", price: 1800 },
    "eqx-pkg-8": { name: "8-Hour Time Bank", price: 3500 },
    "eqx-dev-web": { name: "Custom Web Deployment", price: 15000 },
    "eqx-dev-app": { name: "Mobile App MVP Build", price: 45000 },
    "eqx-strat-pm": { name: "Project Management Retainer (Monthly)", price: 8000 },
    "eqx-dj-set": { name: "Professional DJ Services (4 Hours)", price: 5000 },
    "eqx-rent-dry": { name: "Facility Dry Hire (No Engineer, 6 Hours)", price: 2000 },
    "eqx-edu-workshop": { name: "City Schools Tech Workshop (Per Day)", price: 6000 },
    "eqx-sport-stream": { name: "Youth Sports Live Stream (Per Game)", price: 3500 },
    "eqx-sport-highlight": { name: "Player Highlight Reel (Cinematic)", price: 2500 }
  }
};

// Auto-create Contact & Draft Project when Lead becomes Qualified
exports.onLeadStatusChanged = onDocumentWritten("leads/{leadId}", async (event) => {
  if (!event.data.after.exists) return; // Deleted

  const newValue = event.data.after.data();
  const previousValue = event.data.before ? event.data.before.data() : null;

  // If status changed to 'qualified'
  if (newValue.status === 'qualified' && (!previousValue || previousValue.status !== 'qualified')) {
    console.log(`Lead ${event.params.leadId} became qualified. Auto-creating Contact & Project.`);
    
    // Auto-create Contact
    const contactRef = db.collection('contacts').doc();
    await contactRef.set({
      name: `${newValue.firstName} ${newValue.lastName}`,
      email: newValue.email,
      phone: newValue.phone,
      interest: newValue.interest || 'Unknown',
      address: newValue.location || 'Unknown',
      linkedLeadId: event.params.leadId,
      createdAt: new Date().toISOString()
    });

    // Auto-create Draft Project
    const projectRef = db.collection('projects').doc();
    await projectRef.set({
      title: `${newValue.lastName} Implementation`,
      client: `${newValue.firstName} ${newValue.lastName}`,
      clientName: `${newValue.firstName} ${newValue.lastName}`,
      contactId: contactRef.id,
      category: 'general-ops',
      stage: 'kickoff',
      status: 'draft',
      createdAt: new Date().toISOString()
    });
  }
});

// Auto-create Draft Quote when Project is created/updated with a service payload
exports.onProjectScoping = onDocumentWritten("projects/{projectId}", async (event) => {
  if (!event.data.after.exists) return;

  const newValue = event.data.after.data();
  const previousValue = event.data.before ? event.data.before.data() : null;

  // Trigger if 'requestedServiceId' is added or changed
  if (newValue.requestedServiceId && (!previousValue || previousValue.requestedServiceId !== newValue.requestedServiceId)) {
    console.log(`Generating Quote for Project ${event.params.projectId}`);
    
    const service = PRICING_CONFIG.services[newValue.requestedServiceId];
    if (!service) return;

    let qty = newValue.requestedQty || 1;
    let discount = 0;

    // Apply volume discounts
    if (newValue.requestedServiceId === "eqx-edu-workshop" && qty >= 3) {
      discount = 0.15; // 15% off
    } else if (newValue.requestedServiceId === "eqx-sport-stream" && qty >= 4) {
      discount = 0.20; // 20% off
    }

    const subtotal = service.price * qty;
    const discountAmount = subtotal * discount;
    const finalAmount = subtotal - discountAmount;

    // Add VAT 25%
    const taxAmount = finalAmount * 0.25;
    const totalAmount = finalAmount + taxAmount;

    const financialRef = db.collection('financials').doc();
    await financialRef.set({
      type: "Quote",
      projectTitle: newValue.title,
      projectId: event.params.projectId,
      amount: totalAmount,
      subtotal: subtotal,
      tax: taxAmount,
      discount: discountAmount,
      status: "quote",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
      createdAt: new Date().toISOString()
    });
  }
});

const { google } = require('googleapis');
// Path to the service account key you will generate
const SERVICE_ACCOUNT_FILE = './service-account.json';
const CALENDAR_ID = 'slowmotion767@gmail.com';

async function getCalendarAuth() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
  });
  return auth.getClient();
}

exports.onBookingCreated = onDocumentWritten("bookings/{bookingId}", async (event) => {
  if (!event.data.after.exists) return;
  const newValue = event.data.after.data();
  const previousValue = event.data.before ? event.data.before.data() : null;

  // Only run on creation
  if (previousValue) return;

  console.log(`Syncing booking ${event.params.bookingId} to Google Calendar`);

  try {
    const authClient = await getCalendarAuth();
    const calendar = google.calendar({ version: 'v3', auth: authClient });

    // The frontend sends date as an integer (e.g. 15 for June 15)
    const bookingDate = newValue.date; 
    const year = 2026;
    const month = 5; // 0-indexed, so 5 is June
    
    // Creating a start and end time. Assuming default starts at 10 AM.
    const startTime = new Date(year, month, bookingDate, 10, 0, 0);
    const endTime = new Date(year, month, bookingDate, 10 + (newValue.duration || 2), 0, 0);

    const eventToInsert = {
      summary: `[${newValue.type}] ${newValue.leadName}`,
      location: newValue.room,
      description: newValue.notes,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'Europe/Stockholm',
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Europe/Stockholm',
      },
    };

    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: eventToInsert,
    });
    console.log(`Event created: ${response.data.htmlLink}`);
  } catch (error) {
    console.error('Error syncing booking to calendar:', error);
  }
});

exports.onTaskCreated = onDocumentWritten("tasks/{taskId}", async (event) => {
  if (!event.data.after.exists) return;
  const newValue = event.data.after.data();
  const previousValue = event.data.before ? event.data.before.data() : null;

  if (previousValue) return;

  console.log(`Syncing task ${event.params.taskId} to Google Calendar`);

  try {
    const authClient = await getCalendarAuth();
    const calendar = google.calendar({ version: 'v3', auth: authClient });

    // Format: 'June 16'
    let day = 15;
    if (newValue.dueDate && newValue.dueDate.includes('June')) {
       day = parseInt(newValue.dueDate.replace('June ', '')) || 15;
    }

    const year = 2026;
    
    // All day event format: YYYY-MM-DD
    const dateStr = `${year}-06-${day.toString().padStart(2, '0')}`;
    const nextDateStr = `${year}-06-${(day+1).toString().padStart(2, '0')}`;

    const eventToInsert = {
      summary: `[To-Do] ${newValue.title} - ${newValue.assignedTo}`,
      start: {
        date: dateStr,
        timeZone: 'Europe/Stockholm',
      },
      end: {
        date: nextDateStr,
        timeZone: 'Europe/Stockholm',
      },
    };

    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: eventToInsert,
    });
    console.log(`Task Event created: ${response.data.htmlLink}`);
  } catch (error) {
    console.error('Error syncing task to calendar:', error);
  }
});

// ─── Send Booking Confirmation Email via Gmail SMTP ───────────────────────────
exports.sendBookingEmail = onRequest(
  { secrets: [GMAIL_APP_PASSWORD], cors: true },
  async (req, res) => {

    // Handle CORS preflight
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") { res.status(204).send(""); return; }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    const { to, clientName, date, duration, room, isSweden, customNotes } = req.body;

    if (!to || !clientName) {
      res.status(400).json({ error: "Missing required fields: to, clientName" });
      return;
    }

    // Build directions block based on location
    const directionsHtml = isSweden
      ? `<strong>Studio Address:</strong> Gamla Kyrkogatan 21, Landskrona, Sweden, 26131.<br/>Located in the historic town centre. Use street parking on Gamla Kyrkogatan or the nearby public lot. At the entrance, use the intercom to call the engineering desk.`
      : `<strong>Studio Address:</strong> 123 Industrial Rd, Huntsville, AL 35801.<br/>Located in the main industrial tech hub. Free customer parking is available in spots marked EQX. Access the lobby via the front double glass doors.`;

    // Full HTML email (matches the preview template)
    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:24px 0;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#f4f4f8;border-radius:16px;overflow:hidden;max-width:520px;width:100%;">

        <!-- Logo bar -->
        <tr><td style="background:#ffffff;text-align:center;padding:20px 24px 16px;border-bottom:1px solid #e8e8f0;">
          <span style="font-size:22px;font-weight:800;letter-spacing:-0.04em;color:#1a1a2e;">
            EQX<span style="display:inline-block;width:7px;height:7px;background:#FF5733;border-radius:50%;margin-left:1px;vertical-align:middle;"></span>
          </span>
        </td></tr>

        <!-- Hero -->
        <tr><td style="background:#ffffff;text-align:center;padding:30px 32px 24px;">
          <p style="margin:0 0 8px 0;font-size:12px;font-weight:700;color:#FF5733;text-transform:uppercase;letter-spacing:0.06em;">Session Confirmed</p>
          <h1 style="margin:0;font-size:28px;font-weight:800;color:#1a1a2e;line-height:1.2;">Your Studio Session<br/>is Locked In ✓</h1>
        </td></tr>

        <!-- Content card -->
        <tr><td style="padding:0 16px 16px;">
          <table width="100%" cellpadding="20" cellspacing="0" style="background:#ffffff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.05);">
            <tr>
              <td style="vertical-align:top;">
                <h2 style="margin:0 0 8px 0;font-size:15px;font-weight:700;color:#1a1a2e;">EQX Studio Session</h2>
                <p style="margin:0;font-size:13px;color:#555570;line-height:1.6;">
                  Hi <strong style="color:#1a1a2e;">${clientName}</strong>, your upcoming studio session has been confirmed. Our engineering team will be ready for your arrival. We look forward to working with you!
                </p>
              </td>
              <td width="72" style="vertical-align:top;padding-left:0;">
                <div style="width:72px;height:72px;background:linear-gradient(135deg,#FF5733 0%,#FF8D75 100%);border-radius:12px;text-align:center;line-height:72px;">
                  <span style="font-size:28px;">🎙</span>
                </div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- 3-column detail strip -->
        <tr><td style="padding:0 16px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.05);">
            <tr>
              <td width="33%" style="text-align:center;padding:16px 6px;border-right:1px solid #e8e8f0;box-sizing:border-box;">
                <div style="font-size:10px;color:#888899;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:5px;">📅 Date</div>
                <div style="font-size:13px;font-weight:700;color:#1a1a2e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${date}</div>
              </td>
              <td width="33%" style="text-align:center;padding:16px 6px;border-right:1px solid #e8e8f0;box-sizing:border-box;">
                <div style="font-size:10px;color:#888899;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:5px;">⏱ Duration</div>
                <div style="font-size:13px;font-weight:700;color:#1a1a2e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${duration}</div>
              </td>
              <td width="33%" style="text-align:center;padding:16px 6px;box-sizing:border-box;">
                <div style="font-size:10px;color:#888899;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:5px;">🎙 Studio</div>
                <div style="font-size:13px;font-weight:700;color:#FF5733;word-wrap:break-word;line-height:1.2;">${room}</div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Body intro -->
        <tr><td style="padding:4px 32px 12px;">
          <p style="margin:0 0 4px 0;font-size:14px;color:#1a1a2e;font-weight:600;">Hi there,</p>
          <p style="margin:0;font-size:13px;color:#555570;line-height:1.6;">We can't wait to have you in the studio. Everything is being set up for your arrival. Here's what you need to know before you come in:</p>
        </td></tr>

        <!-- Directions box -->
        <tr><td style="padding:0 16px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0fa;border-radius:12px;">
            <tr><td style="padding:18px 20px;">
              <h3 style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#1a1a2e;">📍 Getting to the Studio</h3>
              <p style="margin:0 0 10px 0;font-size:12px;color:#555570;">Use the address below and arrive 10–15 minutes early so our engineers can set up your session properly.</p>
              <div style="background:#ffffff;border:1px solid #ddddef;border-radius:8px;padding:12px;font-size:12px;color:#333350;line-height:1.6;">
                ${directionsHtml}
              </div>
              ${customNotes ? `<div style="margin-top:10px;background:#ffffff;border:1px solid #ddddef;border-radius:8px;padding:12px;font-size:12px;color:#333350;line-height:1.6;"><strong>Additional notes:</strong> ${customNotes}</div>` : ""}
            </td></tr>
          </table>
        </td></tr>

        <!-- Prep checklist -->
        <tr><td style="padding:0 32px 16px;">
          <p style="margin:0 0 8px 0;font-size:13px;color:#555570;line-height:1.6;">Please also keep the following in mind when preparing for your session:</p>
          <ul style="margin:0;padding-left:18px;font-size:12px;color:#555570;line-height:1.8;">
            <li>Bring your raw tracks / project files on a fast USB-C SSD.</li>
            <li>Review any digital asset agreements ahead of time.</li>
            <li>Arrive 10–15 minutes early to align with the engineering staff.</li>
          </ul>
        </td></tr>

        <!-- Sign off -->
        <tr><td style="padding:0 32px 24px;">
          <p style="margin:0 0 2px 0;font-size:12px;color:#555570;">If you need to reschedule or have any questions, simply reply to this email and we'll get back to you as soon as possible.</p>
          <p style="margin:12px 0 0 0;font-size:13px;color:#555570;">Regards,<br/><strong style="color:#1a1a2e;">Team EQX</strong> <span style="color:#FF5733;">⚡</span></p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f0f0fa;border-top:1px solid #e0e0ee;text-align:center;padding:20px 24px;">
          <div style="margin-bottom:14px;">
            <span style="display:inline-block;width:28px;height:28px;background:#1a1a2e;border-radius:50%;line-height:28px;color:#fff;font-size:11px;font-weight:700;margin:0 4px;">f</span>
            <span style="display:inline-block;width:28px;height:28px;background:#1a1a2e;border-radius:50%;line-height:28px;color:#fff;font-size:10px;font-weight:700;margin:0 4px;">ig</span>
            <span style="display:inline-block;width:28px;height:28px;background:#1a1a2e;border-radius:50%;line-height:28px;color:#fff;font-size:11px;font-weight:700;margin:0 4px;">𝕏</span>
            <span style="display:inline-block;width:28px;height:28px;background:#1a1a2e;border-radius:50%;line-height:28px;color:#fff;font-size:11px;margin:0 4px;">▶</span>
          </div>
          <p style="margin:0 0 6px 0;font-size:11px;color:#888899;">EQX operations © 2026</p>
          <p style="margin:0;font-size:10px;color:#aaaacc;">
            <a href="mailto:support@eqx.audio" style="color:#888899;text-decoration:none;">Terms & Conditions</a>
            &nbsp;|&nbsp;
            <a href="mailto:support@eqx.audio" style="color:#888899;text-decoration:none;">Privacy Policy</a>
            &nbsp;|&nbsp;
            <a href="mailto:support@eqx.audio" style="color:#888899;text-decoration:none;">Support</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD.value(),
        },
      });

      await transporter.sendMail({
        from: `"EQX Studio" <${GMAIL_USER}>`,
        to: to,
        subject: `Your EQX Studio Session is Confirmed ✓ — ${date}`,
        html,
      });

      console.log(`Booking confirmation sent to ${to}`);
      res.status(200).json({ success: true, message: `Email sent to ${to}` });
    } catch (err) {
      console.error("Failed to send email:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);
