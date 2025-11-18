const fs = require('fs-extra');
const path = require('path');
const { parseStringPromise, Builder } = require('xml2js');

async function updateXml(xmlDir, itemData) {
    const xmlFiles = fs.readdirSync(xmlDir)
        .map(f => path.join(xmlDir, f))
        .sort((a, b) => fs.statSync(a).ctime - fs.statSync(b).ctime);

    const xmlPath = xmlFiles[xmlFiles.length - 1];
    const xmlContent = fs.readFileSync(xmlPath, 'utf-8');
    const xmlObj = await parseStringPromise(xmlContent);

    if (!xmlObj.news.item) xmlObj.news.item = [];
    xmlObj.news.item.push({
        date: [itemData.date],
        title: [`<![CDATA[${itemData.title}]]>`],
        summary: [`<![CDATA[${itemData.summary}]]>`],
        image: [itemData.image],
        url: [itemData.url],
        category: ['']
    });

    const builder = new Builder();
    const updatedXml = builder.buildObject(xmlObj);
    fs.writeFileSync(xmlPath, updatedXml, 'utf-8');
}

module.exports = { updateXml };
