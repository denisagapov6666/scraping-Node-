const URLModel = require("../models/urls");
const ProductModel = require("../models/products")
module.exports = async () => {
    const newprestige = await URLModel.find({ site: "prestige", new: true })
    const newprestigeAmount = await ProductModel
        .countDocuments({ url: { $in: newprestige.map(urlmodel => urlmodel._id) } })
    const deletedprestige = await URLModel.find({ site: "prestige", deleted: true })
    const deletedprestigeAmount = await ProductModel
        .countDocuments({ url: { $in: deletedprestige.map(urlmodel => urlmodel._id) } })
    const newcouristanAmount = await URLModel.countDocuments({ site: "couristan", new: true })
    const deletedcouristanAmount = await URLModel.countDocuments({ site: "couristan", deleted: true })
    const newkayaAmount = await URLModel.countDocuments({ site: "kaya", new: true })
    const deletedkayaAmount = await URLModel.countDocuments({ site: "kaya", deleted: true })
    const newfibreAmount = await URLModel.countDocuments({ site: "fibre", new: true })
    const deletedfibreAmount = await URLModel.countDocuments({ site: "fibre", deleted: true })
    const newbloomsburgAmount = await URLModel.countDocuments({ site: "bloomsburg", new: true })
    const deletedbloomsburgAmount = await URLModel.countDocuments({ site: "bloomsburg", deleted: true })
    const newharcourtAmount = await URLModel.countDocuments({ site: "harcourt", new: true })
    const deletedharcourtAmount = await URLModel.countDocuments({ site: "harcourt", deleted: true })
    const newnourisonAmount = await URLModel.countDocuments({ site: "nourison", new: true })
    const deletednourisonAmount = await URLModel.countDocuments({ site: "nourison", deleted: true })
    const newkaleenAmount = await URLModel.countDocuments({ site: "kaleen", new: true })
    const deletedkaleenAmount = await URLModel.countDocuments({ site: "kaleen", deleted: true })
    const newfabricaAmount = await URLModel.countDocuments({ site: "fabrica", new: true })
    const deletedfabricaAmount = await URLModel.countDocuments({ site: "fabrica", deleted: true })
    const newdixieAmount = await URLModel.countDocuments({ site: "dixie", new: true })
    const deleteddixieAmount = await URLModel.countDocuments({ site: "dixie", deleted: true })
    const newmaslandAmount = await URLModel.countDocuments({ site: "masland", new: true })
    const deletedmaslandAmount = await URLModel.countDocuments({ site: "masland", deleted: true })
    const newandersontuftexAmount = await URLModel.countDocuments({ site: "andersontuftex", new: true })
    const deletedandersontuftexAmount = await URLModel.countDocuments({ site: "andersontuftex", deleted: true })
    const newwicandersAmount = await URLModel.countDocuments({ site: "wicanders", new: true })
    const deletedwicandersAmount = await URLModel.countDocuments({ site: "wicanders", deleted: true })
    const newshawfloorsAmount = await URLModel.countDocuments({ site: "shawfloors", new: true })
    const deletedshawfloorsAmount = await URLModel.countDocuments({ site: "shawfloors", deleted: true })
    const newhardwoodAmount = await URLModel.countDocuments({ site: "hardwood", new: true })
    const deletedhardwoodAmount = await URLModel.countDocuments({ site: "hardwood", deleted: true })
    const newadorraAmount = await URLModel.countDocuments({ site: "adorra", new: true })
    const deletedadorraAmount = await URLModel.countDocuments({ site: "adorra", deleted: true })

    const newrebel = await URLModel.find({ site: "rebel", new: true })
    const newrebelAmount = await ProductModel
        .countDocuments({ url: { $in: newrebel.map(urlmodel => urlmodel._id) } })
    const deletedrebel = await URLModel.find({ site: "rebel", deleted: true })
    const deletedrebelAmount = await ProductModel
        .countDocuments({ url: { $in: deletedrebel.map(urlmodel => urlmodel._id) } })
    return {
        newprestigeAmount, deletedprestigeAmount,
        newcouristanAmount, deletedcouristanAmount,
        newkayaAmount, deletedkayaAmount,
        newfibreAmount, deletedfibreAmount,
        newbloomsburgAmount, deletedbloomsburgAmount,
        newharcourtAmount, deletedharcourtAmount,
        newnourisonAmount, deletednourisonAmount,
        newkaleenAmount, deletedkaleenAmount,
        newfabricaAmount, deletedfabricaAmount,
        newdixieAmount, deleteddixieAmount,
        newmaslandAmount, deletedmaslandAmount,
        newandersontuftexAmount, deletedandersontuftexAmount,
        newwicandersAmount, deletedwicandersAmount,
        newshawfloorsAmount, deletedshawfloorsAmount,
        newhardwoodAmount, deletedhardwoodAmount,
        newadorraAmount, deletedadorraAmount,
        newrebelAmount,deletedrebelAmount,
    }

}

