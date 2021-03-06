const { bot } = require('../../../../dialogs')()
const configs = require('../../../../../configs')
const errors = require('../../../../errors')
const log = require('../../../../log')
const menuService = require('../../../../services/menu-service')
const userService = require('../../../../services/user-service')

module.exports = async (req, res, next) => {
  try {
    // TODO: This should not be hardcoded!
    const todayMenu = await menuService
      .getToday(configs.general.defaults.location)
    if (!todayMenu) {
      return next(new errors.NotFoundError('No Menu Found for Today'))
    }

    // TODO: You should be asking yourself: what if pru-bot has 1,000,000 users?
    // The answer is: yes, you thought right, this doesn't scale. Actually, it should
    // be put on a queue (but no time for this right now)
    const users = await userService.getAll()
    users.forEach(user => {
      if (!user.subscribed) return

      bot.beginDialog(user.address, '/menus/today')
    })

    res.send(201)

    return next()
  } catch (err) {
    log.error({ err }, 'Error on users-notifyall-controller')
    return next(err)
  }
}
