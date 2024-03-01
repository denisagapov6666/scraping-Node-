const cron = require('node-cron');
const {CourierClient} = require('@trycourier/courier');
const courier = new CourierClient({ authorizationToken: "dk_prod_VVQ43JZJQA45V8H2Y2QX3VN2V2MT"});

const getProductInfo = require('../utils/prestige/getProductInfo');
const getUrls = require('../utils/prestige/getUrls');

const ProductModel = require('../models/prestige/ProductModel');
const URLModel = require('../models/prestige/URLModel');

const prestigeCronJob = ()=> cron.schedule('*/1 * * * *', () => {
  console.log('Running a task every 5 minutes');
  const scrapping = async () => {
    const removed = await getUrls();
    await getProductInfo();
    const urlmodels = await URLModel.find({ new: true });
    const products = await ProductModel
        .find({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
    const newProducts = products.length;
    let alertMessage;
    if( removed === 0 && newProducts === 0 ){
        alertMessage = "There isn't new or removed product.";
    }else if(newProducts > 0 || removed === 0 ){
        alertMessage = `${newProducts} product(s) is(are) added and there isn't removed product`;
    }else if(newProducts === 0 || removed > 0 ){
        alertMessage = `${removed} product(s) is(are) removed and there isn't new product`;
    }else{
        alertMessage = `${newProducts} product(s) is(are) added and ${removed} product(s) is(are) removed`;
    }
    courier.send({
        message: {
            to: {
                email: "nicolas.edwards0822@gmail.com",
            },
            content: {
                title: "Product Update",
                body: "Dear {{name}},\n\n" + alertMessage + "\n\nBest regards,\nYour Company",
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
  }
  scrapping();
});

module.exports = {
    prestigeCronJob
}