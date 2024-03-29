const cron = require('node-cron');
const { CourierClient } = require('@trycourier/courier');
const courier = new CourierClient({ authorizationToken: "dk_prod_VVQ43JZJQA45V8H2Y2QX3VN2V2MT" });
const ProductModel = require('../models/products');
const URLModel = require('../models/urls');
const RequestModel = require("../models/RequestModel");
const cronModal = require("../models/cron");

const CronJob = async (site,schedule,getProductInfo,getUrls) =>{
    const step = await cronModal.findOne({site});
    const cronDate = schedule + " " + step.step
    cron.schedule(cronDate, async () => {
        const isScraping = await RequestModel.findOne({ state: true });
        if (isScraping) {
            console.log('Another user or process is currently scraping. Please wait.');
        } else {
            const scrapping = async () => {
                const removed = await getUrls();
                if (removed.isadded > 0) {
                    await getProductInfo();
                }
                if (removed.isadded > 0 || removed.isremoved > 0) {
                    await RequestModel.findOneAndUpdate({ url: "/start_scraping" }, { state: true });
    
                    const urlmodels = await URLModel.find({site, new: true });
                    const products = await ProductModel
                        .find({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
                    const newProducts = products.length;
                    let alertMessage;
                    if (newProducts > 0 || removed === 0) {
                        alertMessage = `${newProducts} product(s) is(are) added and there isn't removed product in ${site} Page`;
                    } else if (newProducts === 0 || removed > 0) {
                        alertMessage = `${removed.removed} product(s) is(are) removed and there isn't new product in ${site} Page`;
                    } else {
                        alertMessage = `${newProducts} product(s) is(are) added and ${removed.removed} product(s) is(are) removed in ${site} Page`;
                    }
                    courier.send({
                        message: {
                            to: {
                                email: step.to,
                            },
                            content: {
                                title: "Product Update",
                                body: "Dear {{name}},\n\n\n\n" + alertMessage + "\n\nBest regards,\n"+step.from.split("@")[0],
                            },
                            data: {
                                name: step.to.split("@")[0],
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

} 
const CronJob1 = async (site,schedule,getUrls) => {
    const step = await cronModal.findOne({site});
    const cronDate = schedule + " " + step.step

    cron.schedule(cronDate, async () => {
       const isScraping = await RequestModel.findOne({ state: true });
       if (isScraping) {
           console.log('Another user or process is currently scraping. Please wait.');
       } else {
           const scrapping = async () => {
               const removed = await getUrls();
               
               if (removed.isadded > 0 || removed.isremoved > 0) {
                   await RequestModel.findOneAndUpdate({ url: "/start_scraping" }, { state: true });
   
                   const urlmodels = await URLModel.find({site, new: true });
                   const products = await ProductModel
                       .find({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
                   const newProducts = products.length;
                   let alertMessage;
                   if (newProducts > 0 || removed === 0) {
                       alertMessage = `${newProducts} product(s) is(are) added and there isn't removed product in ${site} Page`;
                   } else if (newProducts === 0 || removed > 0) {
                       alertMessage = `${removed.removed} product(s) is(are) removed and there isn't new product in ${site} Page`;
                   } else {
                       alertMessage = `${newProducts} product(s) is(are) added and ${removed.removed} product(s) is(are) removed in ${site} Page`;
                   }
                   courier.send({
                       message: {
                           to: {
                               email: step.to,
                           },
                           content: {
                               title: "Product Update",
                               body: "Dear {{name}},\n\n\n\n" + alertMessage + "\n\nBest regards,\n"+ step.from.split("@")[0],
                           },
                           data: {
                               name: step.to.split("@")[0],
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
}
module.exports = {
    CronJob,
    CronJob1
}