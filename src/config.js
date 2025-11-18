const path = require('path');

module.exports = {
    WORD_DIR: path.join(__dirname, '../data/docx'),
    IMAGES_DIR: path.join(__dirname, '../data/images/news/2025'),
    XML_DIR: path.join(__dirname, '../data/xml'),
    HTML_DIR: path.join(__dirname, '../output/html'),
    NETWORK_HTML_DIR: process.env.NETWORK_HTML_DIR || path.join(__dirname, '../network_output/html')
};
