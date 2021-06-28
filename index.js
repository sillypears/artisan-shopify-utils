'use strict';
const { env } = require('process');
require('dotenv').config();

const koa = require('koa')
const path = require('path')
const render = require('koa-ejs')
// const koaRouter = require('koa-router')
// var bodyParser = require('koa-body')
const serve = require('koa-static');
const fs = require('fs')
const Logger = require("koa-logger");
const favicon = require("koa-favicon")


const app = new koa();
app.use(favicon(__dirname + '/public/favicon.ico'));

var rootRouter = require('./routes/root')
var apiRouter = require('./routes/api')

// const router = new koaRouter();

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    // debug: true
})

app.use(Logger())
    .use(rootRouter.routes())
    .use(rootRouter.allowedMethods())
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())
    .use(serve('./public'))

app.listen(process.env.PORT, () => console.log(`running on ${process.env.PORT}`))