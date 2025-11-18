const fs = require('fs-extra');
const path = require('path');

function generateImageHtml(title, imagesDir) {
    const dirs = fs.readdirSync(imagesDir)
        .map(d => path.join(imagesDir, d))
        .filter(d => fs.statSync(d).isDirectory())
        .sort((a, b) => fs.statSync(a).ctime - fs.statSync(b).ctime);

    const latestDir = dirs[dirs.length - 1];
    const images = fs.readdirSync(latestDir).filter(f => !/thumb/i.test(f));

    let html = '<figure>';
    images.forEach(img => {
        const imgPath = path.join(latestDir, img).replace(/\\/g, '/');
        html += `<img class="img-responsive" src="${imgPath}" alt="${title}" title="${title}"/><br>`;
    });
    html += `<figcaption>${title}</figcaption></figure><br>`;
    return html;
}

module.exports = { generateImageHtml };
