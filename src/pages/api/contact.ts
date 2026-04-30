import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
	const env = (locals as Record<string, any>).runtime?.env ?? {};

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
	const apiKey = (env.RESEND_API_KEY ?? '') as string;
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
	let resendRes: Response;
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
};
