/**
 * Clean markdown formatting from AI model responses.
 * Removes bold markers (*, **), headings (#), italics (_), backticks,
 * and bullet point markers (-, *, +), while preserving readable text, 
 * line breaks, punctuation, and URLs.
 *
 * @param {string} text - Raw markdown text from the AI model
 * @returns {string} Cleaned plain text suitable for client-facing UI
 */
function cleanAIResponse(text) {
  if (!text) return '';

  return text
    // Remove bullet markers (e.g. "* ", "- ", "+ ") at the start of lines
    .replace(/^\s*[-*+]\s+/gm, '')
    // Remove remaining markdown characters: *, #, _, `
    .replace(/[*#_`]/g, '')
    // Normalize excessive consecutive newlines to at most two
    .replace(/\n{3,}/g, '\n\n')
    // Remove any remaining leading whitespace per line
    .replace(/^[ \t]+/gm, '')
    .trim();
}

export default cleanAIResponse;