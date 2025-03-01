// utils/htmlUtils.js

// Convert HTML to plain text (strip HTML tags)
export const htmlToText = (html) => {
    return html.replace(/<[^>]*>/g, '');
};

// Convert plain text to HTML (basic conversion, you can enhance this)
export const textToHtml = (text) => {
    return text.replace(/\n/g, '<br>'); // Convert newlines to <br> tags
};