export const sendWelcomeEmail = async ({ email, name, username }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    throw new Error("RESEND_API_KEY and EMAIL_FROM must be configured to send welcome emails");
  }

  const greetingName = name || username || "there";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(10000),
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Thanks for joining Tap For Visit!",
      text: [
        `Hi ${greetingName},`,
        "",
        "Thank you for registering with Tap For Visit! We're glad you're here.",
        `Your username is ${username}.`,
        "",
        "Get started by visiting https://tapforvisit.vercel.app.",
        "",
        "The Tap For Visit team",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${details}`);
  }
};
