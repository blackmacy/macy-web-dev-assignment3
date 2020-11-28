const express = require('express');
const router = express.Router();
const { getAllUrl, insertUrl, findUrl } = require('../db/url.model');

router.get('/:urlCode', async function (req, res) {
    try {
        const { urlCode } = req.params;
        let url = await findUrl({urlCode});

        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).send('Error redirecting url');
        }
    } catch (err) {
        res.status(500).send('server error');
    }
})

module.exports = router;