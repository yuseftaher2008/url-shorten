const form = document.getElementById('shorten-form');
const input = document.getElementById('url-input');
const shortenBtn = document.getElementById('shorten-btn');
const resultSection = document.getElementById('result-section');
const resultUrl = document.getElementById('result-url');
const copyBtn = document.getElementById('copy-btn');
const copyLabel = document.getElementById('copy-label');
const errorSection = document.getElementById('error-section');
const errorText = document.getElementById('error-text');

function showError(message) {
  errorText.textContent = message;
  errorSection.hidden = false;
  resultSection.hidden = true;
}

function hideError() {
  errorSection.hidden = true;
}

function showResult(shortUrl) {
  resultUrl.textContent = shortUrl;
  resultSection.hidden = false;
  hideError();
}

function setLoading(loading) {
  shortenBtn.disabled = loading;
  shortenBtn.classList.toggle('is-loading', loading);
}

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const raw = input.value.trim();

  if (!raw) {
    showError('Enter a URL to shorten.');
    input.focus();
    return;
  }

  const url = raw.startsWith('http') ? raw : `https://${raw}`;

  if (!isValidUrl(url)) {
    showError('That doesn\'t look like a valid URL. Include https://');
    input.focus();
    return;
  }

  hideError();
  setLoading(true);

  try {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    if (!res.ok) {
      showError(data.message || 'Something went wrong. Try again.');
      return;
    }

    showResult(data.shortUrl);
  } catch (err) {
    showError('Could not reach the server. Is it running?');
  } finally {
    setLoading(false);
  }
});

copyBtn.addEventListener('click', async () => {
  const url = resultUrl.textContent;
  if (!url) return;

  try {
    await navigator.clipboard.writeText(url);
    copyLabel.textContent = 'Copied';
    copyBtn.classList.add('is-copied');
    setTimeout(() => {
      copyLabel.textContent = 'Copy';
      copyBtn.classList.remove('is-copied');
    }, 2000);
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    copyLabel.textContent = 'Copied';
    copyBtn.classList.add('is-copied');
    setTimeout(() => {
      copyLabel.textContent = 'Copy';
      copyBtn.classList.remove('is-copied');
    }, 2000);
  }
});

// Auto-focus input on load
input.focus();
