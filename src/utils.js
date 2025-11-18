const { parse, format } = require('date-fns');

function extractDateFromText(text) {
    const patterns = [
        /\b\d{1,2}(st|nd|rd|th)?\s\w+\s\d{4}\b/,
        /\b\w+\s\d{1,2}(st|nd|rd|th)?\s\d{4}\b/,
        /\b\d{4}\s\w+\s\d{1,2}(st|nd|rd|th)?\b/
    ];

    for (let i = 0; i < patterns.length; i++) {
        const match = text.match(patterns[i]);
        if (match) return match[0];
    }
    return 'Unknown Date';
}

function formatDate(dateString) {
    const cleaned = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');
    try {
        const date = parse(cleaned, 'd MMMM yyyy', new Date());
        return format(date, 'MMMM dd yyyy');
    } catch {
        return dateString;
    }
}

function cleanFileName(title) {
    return title.toLowerCase()
        .replace(/toyota kirloskar motor/g, 'tkm')
        .replace(/[.,'"_/ :;]/g, '-')
        .replace(/^-+|-+$/g, '');
}

module.exports = { extractDateFromText, formatDate, cleanFileName };
