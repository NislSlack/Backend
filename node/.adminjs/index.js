const AdminJS = require('adminjs');
const { buildAuthenticatedRouter } = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const { sequelize } = require('../models');

AdminJS.registerAdapter(AdminJSSequelize);

const admin = new AdminJS({
  databases: [sequelize],
});

admin.watch();

const adminRouter = buildAuthenticatedRouter(
  admin,
  {
    cookieName: 'adminBro',
    cookiePassword: 'adminBro',
    authenticate: async (email, password) => {
      if ('admin' === password && 'admin' === email) {
        return { email: 'admin', password: 'admin' };
      }
      return null;
    },
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
  }
);

module.exports = { admin, adminRouter };
