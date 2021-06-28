const axios = require('axios');
const Router = require('koa-router');

const storeURL = `${process.env.SHOPIFY_STORE_NAME}.${process.env.SHOPIFY_STORE_URL}`
const APIKEY = process.env.SHOPIFY_API_KEY
const APIPASS = process.env.SHOPIFY_API_SECRET
var router = new Router({
    prefix: '/api'
});

router.get('/', async(ctx, next) => {
    ctx.body = {
        'version': '0.0.1'
    }
});

router.get('/shopify', async(ctx, next) => {
    ctx.body = {
        'storeName' : process.env.SHOPIFY_STORE_NAME,
        'storeUrl' : `https://${storeURL}`
    }
});

router.get('/shopify/products', async(ctx, next) => {
    const config = {
        method: "GET",
        url: `https://${APIKEY}:${APIPASS}@${storeURL}/admin/api/2021-04/products.json`,
        headers: {
            'Content-Type': 'application/json'
        }

    }
    let res = await axios(config)
    ctx.body = [
        res.data.products
    ]
});

router.get('/shopify/products/:productId', async(ctx, next) => {
    const config = {
        method: "GET",
        url: `https://${APIKEY}:${APIPASS}@${storeURL}/admin/api/2021-04/products.json`,
        headers: {
            'Content-Type': 'application/json'
        }

    }
    let p
    let res = await axios(config)
    for (let product in res.data.products) {
        console.log(product)
        if (res.data.products[product]['id'] == ctx.params.productId) {

            p = res.data.products[product]
        }

    }
    console.log(p)
    ctx.body = [
        p
    ]
});


module.exports = router;