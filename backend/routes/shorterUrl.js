const express = require('express');
const { getAllUrl, insertUrl, findUrl, deleteUrl, updateUrl } = require('../db/url.model');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const dns = require('dns');
const { UrlSchema } = require('../db/url.schema');
const { generate } = require('shortid');
const { url } = require('inspector');

router.get('/', function(req, res) {
    const urlCode = req.query.urlCode;

    if (urlCode) {
        return findUrl({urlCode})
            .then(function(response) {
                res.status(200).send(response);
            }, function(error) {
                res.status(404).send('Error getting Url');
            });
    } else {
        return getAllUrl()
        .then(function(response) {
            res.status(200).send(response);
        }, function(error) {
            res.status(404).send('Error getting Url');
        });
    }
})

router.post('/', async function(req, res) {
    const { longUrl, urlCode } = req.body;
    const baseUrl = 'http://' + req.headers.host;
    let generatedCode = null;

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }
  
    if (validUrl.isUri(longUrl)) {
        if (!urlCode) {
            generatedCode = shortid.generate();
        } else {
            let isCodeExist = await findUrl({urlCode});

            if (isCodeExist) {
                return res.status(401).json('This Ending Code Is Existed');
            } else {
                generatedCode = urlCode;
            }
        }
        const shortUrl = baseUrl + '/' + 'api/' + 'shorterUrl/' + generatedCode;
        let url = await findUrl({longUrl});

        if (url) {
            res.send(url)
        } else {
            const url = {
                urlCode :generatedCode,
                longUrl,
                shortUrl
            }
            insertUrl(url)
            .then(function (response) {
                console.log('Insert successfully');
                return res.status(200).send(response);
            }, function (error) {
                return res.status(500).send("Issue adding url");
            })
        }

    } else {
        return res.status(401).send('Invalid url');
    }

})

router.put('/:urlCode', async function(req, res) {
    const urlCode = String(req.params.urlCode);
    const urlRequest = req.body;

    // Can only edit the destination url, but not the url code
    return updateUrl({urlCode}, {$set: { longUrl: urlRequest.longUrl }})
        .then(function(response) {
            res.status(200).send(response);
        }, function(error) {
            console.log(urlRequest.longUrl)
            res.status(404).send('Error editing Url');
        });

})

router.delete('/:urlCode', function(req, res) {
    const urlCode = String(req.params.urlCode);
    
    return deleteUrl({urlCode})
        .then(function(response) {
            res.status(200).send(response);
        }, function(error) {
            res.status(404).send('Error deleting Url');
        });
})

module.exports = router;