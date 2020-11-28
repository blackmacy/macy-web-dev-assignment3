const mongoose = require('mongoose');

const UrlSchema = require('./url.schema').UrlSchema

const UrlModel = mongoose.model('URl', UrlSchema);

function insertUrl(url) {
    return UrlModel.create(url);
}

function getAllUrl() {
    return UrlModel.find().exec();
}

function findUrl(url) {
    return UrlModel.findOne(url);
}

function deleteUrl(url) {
    return UrlModel.deleteOne(url);
}

function updateUrl(url, updateParams) {
    return UrlModel.updateOne(url, updateParams);
}

module.exports = {
    insertUrl, 
    getAllUrl,
    findUrl, 
    deleteUrl,
    updateUrl,
}