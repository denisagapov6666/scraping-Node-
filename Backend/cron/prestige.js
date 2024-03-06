const cron = require('node-cron');
const {CourierClient} = require('@trycourier/courier');
const courier = new CourierClient({ authorizationToken: "dk_prod_VVQ43JZJQA45V8H2Y2QX3VN2V2MT"});

const getProductInfo = require('../utils/prestige/getProductInfo');
const getUrls = require('../utils/prestige/getUrls');

const ProductModel = require('../models/prestige/ProductModel');
const URLModel = require('../models/prestige/URLModel');
const historyModel = require("../models/prestige/history")
const RequestModel = require("../models/RequestModel");

const prestigeCronJob = ()=> cron.schedule('12 0 * * 6', async () => {
  const isScraping = await RequestModel.findOne({ state: true });
  if (isScraping) {
    console.log( 'Another user or process is currently scraping. Please wait.');
  }else{
      const scrapping = async () => {
          const removed = await getUrls();
          if(removed.isadded>0){
              await getProductInfo();
            }
            if(removed.isadded>0||removed.isremoved>0){
              await RequestModel.findOneAndUpdate({ url: "/start_scraping" }, { state: true });
              await new historyModel({history:"#"}).save();
              const urlmodels = await URLModel.find({ new: true });
              const products = await ProductModel
              .find({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
              const newProducts = products.length;
              let alertMessage;
              if(newProducts > 0 || removed === 0 ){
                    alertMessage = `${newProducts} product(s) is(are) added and there isn't removed product in Prestige Page`;
                }else if(newProducts === 0 || removed > 0 ){
                    alertMessage = `${removed.removed} product(s) is(are) removed and there isn't new product in Prestige Page`;
                }else{
                    alertMessage = `${newProducts} product(s) is(are) added and ${removed.removed} product(s) is(are) removed in Prestige Page`;
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
        }
        scrapping();

  }
});

module.exports = {
    prestigeCronJob
}