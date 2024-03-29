const axios = require('axios');

const mainGetProducts = require("../MainGetProducts");


const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
        const sparser = url.split("/");
        const sNum = sparser[6];
        const collName = sparser[7].replace(/_/g," ");
        const cCode = sparser[8];
        const cName = sparser[9].split("?")[0].replace(/_/g," ");
        const cTypes = url.split("=")[2];
        const pLine = url.split("=")[1].split("&")[0]

        const URL = "https://core.dxpapi.com/api/v1/core/?&q=*&efq=flooring_type%3A(%22Carpet%22)&rows=20&start=0&search_type=keyword&request_type=search&fl=color_code,sku_thumb_images,product_description,sku_thumb_images,sku_swatch_images,installMethod,room,woodType,wood_type,colors,feature,sku_color,look_visual,collection_name,flooring_type,installation_level,swatch_images,thumb_images,room_scene,manufacturer_url,pid,skuid,title,brand,carpet_types,url,thumb_image,color_name,colorGroup,colorVariation,product_line,look,country_origin,style_name,style_number,searchableFlag&account_id=6677&auth_key=gmtnjthiky37113i&domain_key=mohawkflooring&request_id=7637386574986&_br_uid_2=uid%3D7378009071482%3Av%3D15.0%3Ats%3D1711593819485%3Ahc%3D70&url=https://www.mohawkflooring.com/shop/carpet?colorGroup=all&look=all&type=Carpet&page=2&ref_url=https://www.mohawkflooring.com/";
        const data = await axios.get(URL)
        const docs = data.data.response.docs;
        for (let i = 0; i < docs.length; i++) {
            const element = docs[i].variants;
            for (let j = 0; j < element.length; j++) {
                const styleNumber = element[j].style_number[0];
                const collectionName = element[j].collection_name[0];
                const colorCode = element[j].color_code[0];
                const colorName  = element[j].color_name[0];
                const carpetTypes = element[j].carpet_types[0]
                const productLine = element[j].product_line[0].split(" ")[0]
                if(sNum===styleNumber&&collName===collectionName&&cCode===colorCode&&cName===colorName&&cTypes===carpetTypes&&pLine===productLine){
                    const style = element[j].style_name[0];
                    const productDescription = element[j].product_description[0];
                    const feature = element[j].feature.join(",")
                    const installMethod = element[j].installMethod[0];
                    const productSku = element[j].skuid;
                    const origin = element[j].country_origin[0];
                    const imageUrls = [];
                    imageUrls.push(element[j].sku_thumb_images[0],element[j].sku_swatch_images[0])
                    const props = {
                        category:"carpet",
                        brandName:productLine,
                        productSku,
                        collection:collectionName,
                        color:colorName,
                        productDescription,
                        style,
                        origin,
                        imageUrls,
                        feature,
                        installMethod,
                        site:"mohawk"
                    }
                    resolve(props)
                }
            }
            
        }
    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})


module.exports = async () => {
    const site = "mohawk";
    await mainGetProducts.mainGetProducts(site, scrapeData);
}