// Cloudflare Pages Function — sends contact form submissions via Resend.
//
// Required setup in Cloudflare Pages dashboard:
//   Settings → Environment variables → Add variable:
//     Name:  RESEND_API_KEY
//     Value: your Resend API key
//     Environment: Production (and Preview if desired)
//
// Required in Resend dashboard (one-time):
//   Domains → Add domain → vtech-app.com
//   Add the DNS records shown (TXT + DKIM) in your Cloudflare DNS panel.
//   Once verified, emails will send from contact@vtech-app.com.

export async function onRequestPost(context) {
	const { request, env } = context;

	// --- Parse ---
	let name = '', email = '', appName = '', feedbackType = '', message = '';
	try {
		const data = await request.formData();
		name         = (data.get('name')           ?? '').toString().trim();
		email        = (data.get('email')          ?? '').toString().trim();
		appName      = (data.get('app-name')       ?? '').toString().trim();
		feedbackType = (data.get('feedback-type')  ?? '').toString().trim();
		message      = (data.get('message')        ?? '').toString().trim();
	} catch {
		return Response.json({ ok: false, error: 'Could not read form data.' }, { status: 400 });
	}

	// --- Validate ---
	if (!name || !email || !message) {
		return Response.json(
			{ ok: false, error: 'Name, email, and message are required.' },
			{ status: 400 },
		);
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return Response.json(
			{ ok: false, error: 'Please enter a valid email address.' },
			{ status: 400 },
		);
	}

	// --- Check key ---
	const apiKey = env.RESEND_API_KEY;
	if (!apiKey) {
		return Response.json(
			{ ok: false, error: 'Email service is not configured.' },
			{ status: 503 },
		);
	}

	// --- Build email ---
	const subject = `[VTech App] ${feedbackType || 'Feedback'}${appName ? ' — ' + appName : ''}`;
	const text = [
		`Name:    ${name}`,
		`Email:   ${email}`,
		`App:     ${appName || 'General / not app-specific'}`,
		`Type:    ${feedbackType || 'General feedback'}`,
		'',
		'Message:',
		message,
	].join('\n');

	// --- Send via Resend ---
	let resendRes;
	try {
		resendRes = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: 'VTech App <contact@vtech-app.com>',
				to: ['contact@vtech-app.com'],
				reply_to: [email],
				subject,
				text,
			}),
		});
	} catch {
		return Response.json(
			{ ok: false, error: 'Could not reach email service. Please try again.' },
			{ status: 502 },
		);
	}

	if (!resendRes.ok) {
		return Response.json(
			{ ok: false, error: 'Failed to send message. Please try again.' },
			{ status: 500 },
		);
	}

	return Response.json({ ok: true });
}
