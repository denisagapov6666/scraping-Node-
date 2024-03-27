const axios = require('axios');

const mainGetProducts = require("../MainGetProducts");


const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
        const collectionParser = url.split("=");
        const collection = collectionParser[collectionParser.length - 1];
        const tileTypeParser = url.split("/");
        const tileType = tileTypeParser[3] === "waterprooflvp" ? "LVP" : "Hardwood";
        const colorUrl = tileTypeParser[4];
        
        const response = await axios.post("https://www.provenzafloors.com/api/ProductApi/getDetailInfoUsingCollection", {
            attributeType: "",
            attributeQuery: "",
            tileType,
            manufacturer: "",
            collection
        });
        
        response.data.forEach(item => {
            if (item.colorUrl === "/" + tileType + "/" + colorUrl) {
                console.log(item);
                
                const color = item.color;
                const brandName = item.brandName;
                console.log(color, brandName);
                
                const tileDetail = item.tileDetail; // Corrected property name
                
                const productSku = tileDetail.sku;
                const productDescription = tileDetail.description;
                const width = tileDetail.width;
                const height = tileDetail.length; // Corrected property name
                const thickness = tileDetail.thickness;
                const style = tileDetail.style;
                const construction = tileDetail.construction;
                const finish = tileDetail.finish;
                const coverage = tileDetail.coverage;
                const imageUrls = [];
                const images = item.alternates
                images.forEach(img =>{
                    imageUrls.push(img.detail)
                })
                const props = {
                    category:"carpet",
                    brandName,
                    productName:color,
                    productSku,
                    productDescription,
                    collection,
                    style,
                    width,
                    height,
                    construction,
                    finish,
                    coverage,
                    color,
                    thickness,
                    imageUrls,
                    site:"hardwood"
                };
                
                resolve(props);
            }
        });
    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})


module.exports = async () => {
    const site = "hardwood";
    await mainGetProducts.mainGetProducts(site, scrapeData);
}