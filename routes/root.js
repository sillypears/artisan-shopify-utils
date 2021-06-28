const router = require('koa-router')();
const axios = require('axios');

const apiUrl = `localhost:${process.env.PORT}`

router.get('/', async(ctx, next) => {
    return ctx.render('index', {
        title: "Shopify Helper!",
    });
});

router.get('/products', async(ctx, next) => {
    let shopProducts = await axios({
        method: "GET",
        url: `http://${apiUrl}/api/shopify/products`,
        headers: {
            'Content-Type': 'application/json'
        }

    })
    console.log(shopProducts.data)
    return ctx.render('products', {
        title: "Your Stuff!",
        products: shopProducts.data[0]
    })
})

module.exports = router