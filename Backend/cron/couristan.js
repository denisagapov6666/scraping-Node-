const cron = require('node-cron');
const {CourierClient} = require('@trycourier/courier');
const courier = new CourierClient({ authorizationToken: "dk_prod_VVQ43JZJQA45V8H2Y2QX3VN2V2MT"});

const getProductInfo = require('../utils/couristan/getProductInfo');
const getUrls = require('../utils/couristan/getUrls');

const ProductModel = require('../models/couristan/ProductModel');
const URLModel = require('../models/couristan/URLModel');
const RequestModel = require("../models/RequestModel");

const couristanCronJob = ()=> cron.schedule('0 0 * * 5', async () => {
  const isScraping = await RequestModel.findOne({ state: true });
  if (isScraping) {
    console.log( 'Another user or process is currently scraping. Please wait.');
  }else{
      await RequestModel.findOneAndUpdate({ url: "/start_scraping" }, { state: true });
      const scrapping = async () => {
          const removed = await getUrls();
          await getProductInfo();
          const urlmodels = await URLModel.find({ new: true });
          const products = await ProductModel
          .find({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
          const newProducts = products.length;
          let alertMessage;
          if( removed === 0 && newProducts === 0 ){
              alertMessage = "There isn't new or removed product in Couristan Page.";
            }else if(newProducts > 0 || removed === 0 ){
                alertMessage = `${newProducts} product(s) is(are) added and there isn't removed product in Couristan Page`;
            }else if(newProducts === 0 || removed > 0 ){
                alertMessage = `${removed} product(s) is(are) removed and there isn't new product in Couristan Page`;
            }else{
                alertMessage = `${newProducts} product(s) is(are) added and ${removed} product(s) is(are) removed in Couristan Page`;
            }
            courier.send({
                message: {
                    to: {
                        email: "nicolas.edwards0822@gmail.com",
                    },
                    content: {
                        title: "Product Update",
                        body: "Dear {{name}},\n\n\n\n" + alertMessage + "\n\nBest regards,\nDenis Agapov",
                    },
                    data: {
                        name: "Client",
                    },
                    routing: {
                        method: "single",
                        channels: ["email"],
                    },
                },
            });
            await RequestModel.findOneAndUpdate({ url: "/start_scraping" }, { state: false });
        }
        scrapping();

  }
});

module.exports = {
    couristanCronJob
}