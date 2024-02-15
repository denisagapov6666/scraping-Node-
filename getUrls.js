const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

// array declored

const oldUrls = [];
const newUrls = [];

// file path 

let urls_file = "./urls_data/urls.txt";
let urls_file1 = "./urls_data/urls1.txt";
let newProductUrls_file = "./urls_data/newProductUrls.txt";
let removedProductUrls_file = "./urls_data/removedProductUrls.txt";

//saving data in file function

function saveToFile(file,text) {
    deleteFileContent(file);
    fs.appendFileSync(file, text);
}

// removing data in file

function deleteFileContent(file) {
    fs.writeFileSync(file, '');
}

//old urls reading and array creating

function readFile() {
    const data = fs.readFileSync(urls_file, 'utf8');
    const lines = data.split('\n');
    for (let x of lines) {
        const u = x.replace("\n", "").toLowerCase();
        if(!oldUrls.includes(u)){
            oldUrls.push(u)
        }  
    }
}

// new && removed product url checking and saving

function checkUrl(){
    readFile()
    const removedArray = oldUrls.filter(item => !newUrls.includes(item));
    const newArray = newUrls.filter(item => !oldUrls.includes(item));
    const newProUrls = changeString(newArray)
    const removedProUrls = changeString(removedArray)
    saveToFile(newProductUrls_file, newProUrls);
    saveToFile(removedProductUrls_file, removedProUrls);
}

// changing array into string

function changeString(nrUlrs){
    let text = "";
    if(nrUlrs.length>0){
        for(let url of nrUlrs){
            text += url + "\n";
        }
    }
    return text;
}

// url scraping from homepage

async function fetchBrand() {
    const URL = "https://www.prestigemills.com/products-collection.html";

    try {
        const response = await axios.get(URL);
        const $ = cheerio.load(response.data);
        const links = $(".product-feature .product-link");
        if (links.length > 0) {
            let text = "";
            links.each((index, element) => {
                const url = $(element).attr('href');
                text += url + "\n";
                if(!newUrls.includes(url)){
                    newUrls.push(url)
                }
            });
            checkUrl();
            saveToFile(urls_file1,text);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// scraping function implement

fetchBrand();
