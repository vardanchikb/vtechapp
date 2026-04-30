const form = document.getElementById('contact-form');
if (form) {
	const result = document.getElementById('form-result');
	const btn = form.querySelector('button[type="submit"]');
	const originalText = btn?.textContent ?? 'Send message';

	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
		if (result) { result.className = 'form-result'; result.textContent = ''; }

		try {
			// Primary: Resend via Pages Function
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: new FormData(form),
			});

			const contentType = res.headers.get('content-type') ?? '';
			if (!contentType.includes('application/json')) {
				throw new Error('Server error — please email us directly at contact@vtech-app.com');
			}

			const data = await res.json();

			if (data.ok) {
				if (result) {
					result.className = 'form-result form-result--ok';
					result.textContent = 'Message sent — thanks for reaching out.';
				}
				form.reset();
				if (btn) { btn.disabled = false; btn.textContent = originalText; }
			} else {
				throw new Error(data.error ?? 'Submission failed.');
			}
		} catch (err) {
			if (result) {
				result.className = 'form-result form-result--err';
				result.textContent =
					err instanceof Error ? err.message : 'Something went wrong. Please try again.';
			}
			if (btn) { btn.disabled = false; btn.textContent = originalText; }
		}
	});
}
