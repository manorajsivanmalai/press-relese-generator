const mammoth = require('mammoth');
const { extractDateFromText } = require('./utils');
async function convertDocxToHtml(docxPath) {
    const result = await mammoth.convertToHtml({ path: docxPath });
    // Remove empty paragraphs
    return result.value.replace(/<p>&nbsp;<\/p>/g, '');
}


function extractTitle(htmlContent) {
    const blocks = [...htmlContent.matchAll(/<(p|ul|ol|div|table)[^>]*>.*?<\/\1>/gs)].map(m => m[0]);

    for (let i = 0; i < blocks.length; i++) {
        const text = blocks[i].replace(/<[^>]+>/g, '').trim();
        if (text.length > 0) return { title: text, titleIndex: i };
    }
    return { title: 'Untitled', titleIndex: 0 };
}

// Extract all content between title and date paragraph (exclusive)
function extractTitleAfterText(htmlContent, titleIndex) {
    const blocks = [...htmlContent.matchAll(/<(p|ul|ol|div|table)[^>]*>.*?<\/\1>/gs)].map(m => m[0]);
    const dateText = extractDateFromText(htmlContent);

    const dateIndex = blocks.findIndex(block => block.replace(/<[^>]+>/g, '').includes(dateText));
    if (dateIndex === -1) throw new Error("Date not found in HTML content.");

    const titleAfterBlocks = blocks.slice(titleIndex + 1, dateIndex);
    const remainingBlocks = blocks.slice(dateIndex+1);
    return { titleAfterHtml: titleAfterBlocks.join(''), remainingBlocks: remainingBlocks.join(''),dateParagraph:blocks[dateIndex] };
}

module.exports = { convertDocxToHtml, extractTitle ,extractTitleAfterText};
