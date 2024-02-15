const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const ExcelJS = require('exceljs');

const workbook = new ExcelJS.Workbook();
const urls = fs.readFileSync('./urls_data/urls.txt', 'utf8').split('\n').filter(Boolean);

let count = 0;

function formatString(stri) {
    return stri.replace("\t", '').replace("\n", ' ').replace("  ", '');
}

async function scrapeData(url, worksheet) {
    try {
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);

        const titleRaw = $('div.pdp-content h3').first().text();
        const title = formatString(titleRaw);
        const texture = $('#pdpdata-texture').text();
        const design = $('#pdpdata-design').text();
        const fiber_content = $('#pdpdata-fiber_content').text();
        const construction = $('#pdpdata-construction').text();
        const country_of_origin = $('#pdpdata-country_of_origin').text();
        const repeat_width_length = $('#pdpdata-repeat_width_length').text();
        const roll_width = $('#pdpdata-roll_width').text();
        const repeat_width = $('#pdpdata-repeat_width').text();
        const repeat_length = $('#pdpdata-repeat_length').text();
        const collection = $('.detail-value').first().text();

        const variants = $('div.variant-item a');
        for (let i = 0; i < variants.length; i++) {
            const sku = variants.eq(i).attr('data-api-sku');
            const color = variants.eq(i).attr('data-color-name');
            const api = variants.eq(i).attr('data-api-feature_image');

            console.log(title, sku);

            const imageUrl = api.replace("?$med_thumb$", "_SET?req=set,json,UTF-8");
            const imageRes = await axios.get(imageUrl);
            const imageData = imageRes.data;
            const start_index = imageData.indexOf('(') + 1;
            const end_index = imageData.lastIndexOf(')') - 3;
            const json_data = imageData.substring(start_index, end_index);
            const parsed_data = JSON.parse(json_data);
            const props = [url,"CARPET", "PRESTIGEMILLS", sku, title, collection, color, texture, design, fiber_content, construction, country_of_origin, repeat_width_length, repeat_width, repeat_length, roll_width,url];

            try {
                const images = parsed_data.set.item;
                const width = "642";
                for (let j = 0; j < images.length; j++) {
                    const height = Math.floor((642 * images[j].dy) / images[j].dx);
                    props.push(`https://s7d2.scene7.com/is/image/${images[j].i.n}?wid=${width}&hei=${height}`);
                }
                console.log(props);
                // Writing data to the provided worksheet
                worksheet.addRow(props);
            } catch (error) {
                console.log('Error parsing images:', error);
            }
        }
    } catch (error) {
        console.log('Error fetching URL:', error);
    }
}

async function startScraping() {
    await workbook.xlsx.readFile('output.xlsx');
    const worksheet = workbook.getWorksheet('Sheet1');
    for (let i = 0; i < urls.length; i++) {
        await scrapeData(urls[i], worksheet);
        count++;
        if (count >= 20) {
            console.log('saved', count);
            // Save the workbook after every 20 iterations
            await workbook.xlsx.writeFile('output-new.xlsx');
            count = 0;
        }
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    // Save the workbook after all iterations are completed
    await workbook.xlsx.writeFile('output-new.xlsx');
}

startScraping();
