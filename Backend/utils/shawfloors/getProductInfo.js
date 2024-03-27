const axios = require("axios")
const mainGetProducts = require("../MainGetProducts");
const generateImageUrl = (UniqueId, mid, sid) => {
    const imageLink = [
        `https://img.shawinc.com/s7/is/image/ShawIndustries/?src=ir(ShawIndustriesRender/20210203_BEDROOM_CARPET_SQUARE?res=20&src=is(ShawIndustriesRender/${UniqueId}_MAIN))&fit=crop,0&qlt=60`,
        `https://shawfloors.widen.net/content/${mid}/jpeg/${UniqueId}_main.jpeg?q=60&crop=true`,
        `https://shawfloors.widen.net/content/${sid}/jpeg/${UniqueId}_swatch.jpeg?q=60&crop=true`,
        `https://img.shawinc.com/s7/is/image/ShawIndustries/?src=ir(ShawIndustriesRender/20210203_BABYBEDROOM_CARPET_SQUARE?res=20&src=is(ShawIndustriesRender/${UniqueId}_MAIN))&fit=crop,0&qlt=60`,
        `https://img.shawinc.com/s7/is/image/ShawIndustries/?src=ir(ShawIndustriesRender/20210203_BEDROOM_OVERHEAD_CARPET_SQUARE?res=20&src=is(ShawIndustriesRender/${UniqueId}_MAIN))&fit=crop,0&qlt=60`,
        `https://img.shawinc.com/s7/is/image/ShawIndustries/?src=ir(ShawIndustriesRender/20210203_DININGROOM_TABLE_OVERHEAD_CARPET_SQUARE?res=20&src=is(ShawIndustriesRender/${UniqueId}_MAIN))&fit=crop,0&qlt=60`,
        `https://img.shawinc.com/s7/is/image/ShawIndustries/?src=ir(ShawIndustriesRender/20210203_HALLWAY_BENCH_OVERHEAD_CARPET_SQUARE?res=20&src=is(ShawIndustriesRender/${UniqueId}_MAIN))&fit=crop,0&qlt=60`,
        `https://img.shawinc.com/s7/is/image/ShawIndustries/?src=ir(ShawIndustriesRender/20210203_LIVINGROOM_CARPET_SQUARE?res=20&src=is(ShawIndustriesRender/${UniqueId}_MAIN))&fit=crop,0&qlt=60`
    ];
    return imageLink;
};
const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
        const urlparser = url.split("/")
        const sellingcolorname = urlparser[urlparser.length-1].replace(/-/g," ")
        const style = urlparser[6].replace(/-/g," ").split(" ")
        const sellingstylenbr = style[style.length-1]
        const u = "https://shawfloors.com/api/odata/carpets?$filter=SellingStyleNbr%20eq%20%27"+encodeURIComponent(sellingstylenbr)+"%27%20and%20SellingColorName%20eq%20%27"+encodeURIComponent(sellingcolorname)+"%27%20and%20IsDropped%20eq%20false%20and%20ProductGroupPermanentName%20eq%20%27shawfloors%27&$orderby=ColorSequence&$expand=CustomFieldsStyle,CustomFieldsColor,ImageInfo";

        const response = await axios.get(u);
        const carpets = response.data.value;
        if(carpets.length>0){
            for (const ca of carpets) {
                const productSku = ca.UniqueId;
                const style = `${ca.SellingStyleNbr} ${ca.SellingStyleName}`;
                const productName = `${ca.SellingColorNbr} ${ca.SellingColorName}`;
                const collection = ca.SellingStyleName;
                const color = ca.ColorFamilyDesc;
                const weight = ca.FaceWeight;
                const stainTreatment = ca.StainTreatment;
                const fiberType = ca.FiberBlend;
                const texture = ca.StyleType;
                const width = ca.SizeDesc;
                const backing = ca.Backing;
                const mid = ca.WidenId_Main;
                const sid = ca.WidenId_Swatch;
                const imageUrls = generateImageUrl(productSku, mid, sid);
                const props = {
                    category:'Carpet',
                    brandName: 'Shaw Floors',
                    productSku, productName, 
                    collection, 
                    color, 
                    style, 
                    texture, 
                    fiberType, 
                    width, 
                    backing, 
                    weight, 
                    stainTreatment,
                    imageUrls,
                    site:"shawfloors"
                };
                resolve(props)
            }
        }else{
            resolve(null);
        }

    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})
module.exports = async() => {
    const site = "shawfloors";
    await mainGetProducts.mainGetProducts(site, scrapeData);
}
