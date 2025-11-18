const fs = require('fs-extra');
const path = require('path');
const { WORD_DIR, HTML_DIR, IMAGES_DIR, XML_DIR } = require('./config');
const { convertDocxToHtml, extractTitle, extractTitleAfterText } = require('./docxProcessor');
const { generateImageHtml } = require('./imageHandler');
const { generateHtml, saveHtmlFile } = require('./htmlGenerator');
const { updateXml } = require('./xmlUpdater');
const { extractDateFromText } = require('./utils');

(async () => {
    try {
        // Get the latest DOCX file
        const docxFiles = fs.readdirSync(WORD_DIR)
            .map(f => path.join(WORD_DIR, f))
            .sort((a, b) => fs.statSync(a).ctime - fs.statSync(b).ctime);

        const docxPath = docxFiles[docxFiles.length - 1];
        const htmlContent = await convertDocxToHtml(docxPath);

        // Extract title from first non-empty paragraph
        const {title,titleIndex} = extractTitle(htmlContent);

        // Extract date from content
        const date = extractDateFromText(htmlContent);
        
        const { titleAfterHtml, remainingBlocks, dateParagraph } = extractTitleAfterText(htmlContent,titleIndex);
        // Generate image HTML
        const imageHtml = generateImageHtml(title, IMAGES_DIR);

        // Generate final HTML
        const finalHtml = generateHtml( title, date, titleAfterHtml, dateParagraph, remainingBlocks, imageHtml );

        // Save HTML file
        const htmlFilePath = saveHtmlFile(finalHtml, title, HTML_DIR);
        console.log('HTML generated at:', htmlFilePath);

        // Update XML
        await updateXml(XML_DIR, {
            date,
            title,
            summary: htmlContent,
            image: imageHtml,
            url: htmlFilePath
        });
        console.log('XML updated successfully');

    } catch (err) {
        console.error('Error:', err);
    }
})();
