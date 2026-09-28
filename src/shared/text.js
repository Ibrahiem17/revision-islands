export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// wrap **phrase** in a glowing highlight; runs on already-escaped text (safe from HTML injection)
export function glowInline(escapedText) {
  return escapedText.replace(/\*\*(.+?)\*\*/g, '<strong class="glow-word">$1</strong>');
}

export function richText(str) {
  return glowInline(escapeHtml(str));
}
