const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const divisioRoute = require('./divisio.route');
const classisRoute = require('./classis.route');
const ordoRoute = require('./ordo.route');
const familiaRoute = require('./familia.route');
const genusRoute = require('./genus.route');
const speciesRoute = require('./specices.route');
const plantRoute = require('./plant.route');
const imageRoute = require('./image.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/divisio',
    route: divisioRoute,
  },
  {
    path: '/classis',
    route: classisRoute,
  },
  {
    path: '/ordo',
    route: ordoRoute,
  },
  {
    path: '/familia',
    route: familiaRoute,
  },
  {
    path: '/genus',
    route: genusRoute,
  },
  {
    path: '/species',
    route: speciesRoute,
  },
  {
    path: '/plant',
    route: plantRoute,
  },
  {
    path: '/image',
    route: imageRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
