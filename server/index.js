import '@babel/polyfill'

const compression = require('compression')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session)
const cookiesMiddleware = require('universal-cookie-express');

const authHelper = require('../helpers/auth')
const logHelper = require('../helpers/log')

const config = require('config')

const { getUser } = require('../services')

import path from 'path';
import fs from 'fs';
import React from 'react';
import { matchRoutes } from 'react-router-config';
import renderer from '../src/helpers/renderer';
import renderer_client from '../src/helpers/renderer_client';
import createStore from '../src/store/createStore';
import { SET_BASE_URL, SET_TOKEN, SET_ROLES_MENU, FETCH_USER_PROFILE } from '../src/actions';
import Routes from '../src/Routes';

const PORT = process.env.PORT || 3006;
const app = express();

// compress all responses
app.use(compression())

// hide powered by express
app.disable('x-powered-by');

app.set('trust proxy', 1) // trust first proxy

const url = config.get('db').url // กำหนด url สำหรับ MongoDB Server
const dbName = config.get('db').dbName
let mongodb_url = "";

if (process.env.NODE_ENV == 'production') {
    mongodb_url = `mongodb://${config.get('db').dbUser}:${config.get('db').dbPass}@${config.get('db').dbHostClient}/${dbName}`
}
else mongodb_url = `${url}/${dbName}`

// mongodb_url = `${url}/${dbName}`

mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const storeDB = new MongoDBStore({
    uri: mongodb_url,
    databaseName: dbName,
    collection: '2ndsession'
}, function (error) {
    if (error) {
        console.log('Not connect to MongoDB')
    }
})

app.use(express.json())
app.use(cookieParser())
app.use(session({ key: 'user_sid', secret: config.get('session').secret, resave: true, saveUninitialized: true, store: storeDB }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.static('fonts'));
app.use(passport.initialize())
app.use(passport.session())

// Import passports
require('../config/passport');
require('./routes')(app)

const { public_menus, private_menus } = require('../helpers/menu')

app.get('*', async (req, res) => {
    if (req.path.indexOf('/css/') > -1
        || req.path.indexOf('/fonts/') > -1
        || req.path.indexOf('/vendors/') > -1) return res.status(200).send()

    let store = createStore();

    if (!req.session.user && !req.cookies.user_sid) {
        if (req.path.indexOf('/user') > -1) return res.redirect('/logout')
    }

    if (req.session.user && req.cookies.user_sid) {
        let _user = req.session.user

        let user = await getUser(_user._id)

        //start check is admin
        if (!user.is_admin) return res.redirect('/logout')
        //end check is admin

        const token = user.token;

        delete user.token;
        delete user.salt
        delete user.hash
        delete user.refreshToken
        delete user.verifyCode
        delete user.createdAt
        delete user.updatedAt
        store.dispatch({ type: FETCH_USER_PROFILE, payload: user })
        store.dispatch({ type: SET_TOKEN, payload: token })
        store.dispatch({ type: SET_ROLES_MENU, payload: private_menus })
    }
    else {
        store.dispatch({ type: SET_ROLES_MENU, payload: public_menus })
    }

    const base_url = config.get('baseUrl')
    store.dispatch({ type: SET_BASE_URL, payload: base_url })

    const query = req.query

    const routes = matchRoutes(Routes, req.path);

    const promises = routes.map(
        ({ route, match }) => {
            return route.loadData ? route.loadData(store, match, query) : null
        }).map(promise => {
            if (promise) {
                return new Promise((resolve, reject) => {
                    promise.then(resolve).catch(resolve)
                })
            }
        });

    // Wait for all the loadData functions, if they are resolved, send the rendered html to browser.
    Promise.all(promises).then(() => {
        const context = {};
        let content = ""

        if (req.path.indexOf('/external/') > -1
            || req.path.indexOf('/external/') > -1) content = renderer_client(req, store, context);
        else content = renderer(req, store, context);

        res.statusCode = 200;

        if (context.notFound) {
            res.statusCode = 404;
        }

        if (context.url) {
            return res.redirect(301, context.url);
        }

        res.send(content);
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});