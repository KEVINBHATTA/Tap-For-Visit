const SITE_URL = "https://tapforvisit.sydney";
const SITE_LABEL = "tapforvisit.sydney";
const EMAIL_TIMEOUT_MS = 10000;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const cleanText = (value) => String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").trim();

const featureRow = (number, title, description) => `
  <tr>
    <td style="padding:11px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="42" valign="top">
            <div style="width:30px;height:30px;border-radius:10px;background:#eee8ff;color:#6d28d9;font:bold 13px Arial,Helvetica,sans-serif;line-height:30px;text-align:center;">${number}</div>
          </td>
          <td valign="top" style="font-family:Arial,Helvetica,sans-serif;">
            <div style="color:#201536;font-size:14px;font-weight:700;">${title}</div>
            <div style="color:#716b7e;font-size:13px;line-height:1.5;padding-top:3px;">${description}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;

const buildWelcomeHtml = ({ name, username }) => {
  const safeName = escapeHtml(name || username);
  const safeUsername = escapeHtml(username);
  const safeSiteUrl = escapeHtml(SITE_URL);
  const safeSignInUrl = escapeHtml(`${SITE_URL}/signin`);
  const initials = escapeHtml((name || username).trim().charAt(0).toUpperCase());

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>Welcome to Tap For Visit</title>
</head>
<body style="margin:0;padding:0;background:#f3f0f8;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Your Tap For Visit account is ready. Sign in to finish setting up your profile.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#f3f0f8"
    style="background:#f3f0f8;">
    <tr>
      <td align="center" style="padding:38px 14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">
          <tr>
            <td align="center" style="padding:0 0 18px;font-family:Arial,Helvetica,sans-serif;">
              <span style="color:#24163e;font-size:20px;font-weight:800;letter-spacing:.4px;">
                TAP <span style="color:#7042d2;">FOR</span> VISIT
              </span>
              <div style="padding-top:5px;color:#817a8e;font-size:10px;font-weight:700;letter-spacing:1.8px;">YOUR DIGITAL IDENTITY</div>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="background:#ffffff;border:1px solid #e8e2f0;border-radius:22px;overflow:hidden;box-shadow:0 14px 40px rgba(37,20,63,.10);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td bgcolor="#5425aa" style="padding:34px 32px 38px;background:#5425aa;background-image:linear-gradient(135deg,#6738c7 0%,#45208f 100%);font-family:Arial,Helvetica,sans-serif;">
                    <div style="color:#e8ddff;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">WELCOME ABOARD</div>
                    <h1 style="margin:13px 0 10px;color:#ffffff;font-size:32px;line-height:1.15;font-weight:800;">
                      A better way to<br />make an introduction.
                    </h1>
                    <p style="margin:0;color:#efe9ff;font-size:15px;line-height:1.65;">
                      Hi ${safeName}, your Tap For Visit account is ready. Your details, links and contact info can now live in one place.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 32px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#241a3b"
                      style="background:#241a3b;border:1px solid #382957;border-radius:16px;">
                      <tr>
                        <td width="58" valign="middle" style="padding:17px 0 17px 17px;">
                          <div style="width:44px;height:44px;border-radius:14px;background:#7950d7;color:#ffffff;font:bold 20px Arial,Helvetica,sans-serif;line-height:44px;text-align:center;">${initials}</div>
                        </td>
                        <td valign="middle" style="padding:17px 16px;font-family:Arial,Helvetica,sans-serif;">
                          <div style="color:#bdb2d4;font-size:10px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;">YOUR USERNAME</div>
                          <div style="padding-top:4px;color:#ffffff;font-size:19px;font-weight:700;">@${safeUsername}</div>
                        </td>
                        <td width="76" align="center" valign="middle" style="padding:0 12px 0 0;">
                          <div style="padding:7px 8px;border:1px solid #5b427d;border-radius:20px;color:#d9c9ff;font:bold 9px Arial,Helvetica,sans-serif;letter-spacing:.7px;">ACTIVE</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:24px 32px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" bgcolor="#181321" style="background:#181321;border-radius:12px;">
                          <a href="${safeSignInUrl}" target="_blank"
                            style="display:block;padding:16px 20px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">
                            BUILD YOUR PROFILE &nbsp; &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:12px 32px 28px;font-family:Arial,Helvetica,sans-serif;color:#817a8e;font-size:12px;">
                    Sign in anytime to update your details and links.
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px;"><div style="height:1px;background:#eeeaf3;font-size:0;line-height:0;">&nbsp;</div></td>
                </tr>
                <tr>
                  <td style="padding:26px 32px 6px;font-family:Arial,Helvetica,sans-serif;color:#24163e;font-size:17px;font-weight:800;">
                    Your profile. Your way.
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 20px;font-family:Arial,Helvetica,sans-serif;color:#716b7e;font-size:13px;line-height:1.6;">
                    A single tap can make sharing your information feel effortless.
                  </td>
                </tr>
                ${featureRow("1", "Make it yours", "Add your photo, contact information and the links you want to share.")}
                ${featureRow("2", "Share effortlessly", "Your profile works as a simple link and pairs with your NFC card.")}
                ${featureRow("3", "Stay connected", "Let visitors save your contact details directly to their phone.")}
                <tr>
                  <td style="padding:18px 32px 30px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f5f1fc" style="background:#f5f1fc;border-radius:12px;">
                      <tr>
                        <td style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;color:#55456d;font-size:12px;line-height:1.6;">
                          <strong style="color:#34224e;">Need a hand?</strong> Sign in to continue setting up your profile or visit
                          <a href="${safeSiteUrl}" style="color:#6738c7;text-decoration:none;font-weight:700;">${SITE_LABEL}</a>.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:20px 12px 0;font-family:Arial,Helvetica,sans-serif;color:#817a8e;font-size:11px;line-height:1.8;">
              Made in Nepal with care by the Tap For Visit team<br />
              <a href="${safeSiteUrl}" style="color:#6738c7;text-decoration:none;font-weight:700;">${SITE_LABEL}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const sendWelcomeEmail = async ({ email, name, username } = {}) => {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();

  if (!apiKey || !from) {
    throw new Error("RESEND_API_KEY and EMAIL_FROM must be configured to send welcome emails");
  }

  const recipient = cleanText(email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
    throw new Error("A valid recipient email is required to send a welcome email");
  }

  const cleanUsername = cleanText(username).toLowerCase();
  if (!/^[a-z0-9_.-]{3,30}$/.test(cleanUsername)) {
    throw new Error("A valid username is required to send a welcome email");
  }

  const greetingName = cleanText(name) || cleanUsername;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), EMAIL_TIMEOUT_MS);
  let response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        from,
        to: [recipient],
        subject: "Welcome to Tap For Visit",
        html: buildWelcomeHtml({ name: greetingName, username: cleanUsername }),
        text: [
          "WELCOME TO TAP FOR VISIT",
          "",
          `Hi ${greetingName}, your account is ready.`,
          "",
          "A better way to make an introduction starts here.",
          "",
          `YOUR USERNAME: @${cleanUsername}`,
          "",
          "NEXT STEP: BUILD YOUR PROFILE",
          `Sign in to add your photo, contact details and links: ${SITE_URL}/signin`,
          "",
          "Share your profile with one tap and let people save your contact details.",
          "",
          `TAP FOR VISIT  |  ${SITE_URL}`,
          "",
          "The Tap For Visit team",
        ].join("\n"),
      }),
    });
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error(`Resend request timed out after ${EMAIL_TIMEOUT_MS / 1000} seconds`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const details = (await response.text()).slice(0, 1000);
    throw new Error(`Resend request failed (${response.status}): ${details || "No error details returned"}`);
  }
};
