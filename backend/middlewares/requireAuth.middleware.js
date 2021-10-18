const logger = require('../services/logger.service')

async function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    const err = new Error("Not authorized! Go back!");
    err.status = 403;
    next(err)
  }
  next()
}

async function requireAdmin(req, res, next) {
  const user = req.session.user
  console.log('2# session', user);
  if (!user.isAdmin) {
    logger.warn(user.fullname + ' Attempt to perform admin action')
    res.status(403).end('Unauthorized Enough..')
    return
  }
  next()
}



// module.exports = requireAuth

module.exports = {
  requireAuth,
  requireAdmin
}

