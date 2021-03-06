const dayjs = require('dayjs')

module.exports = {
  age: async ({ dateOfBirth }, args, ctx) => {
    try {
      const timestamp = new Date().getTime()

      return dayjs(timestamp).diff(dateOfBirth, 'year')
    } catch (e) {
      return e
    }
  },

  finalsLeaderboards: async (
    { finalsLeaderboards: ids },
    args,
    { loaders: { finalsLeaderboardLoader } }
  ) => {
    try {
      const leaderboards = await finalsLeaderboardLoader.loadMany(ids)

      return leaderboards
    } catch (e) {
      return e
    }
  },

  qualifiersLeaderboards: async (
    { qualifiersLeaderboards: ids },
    args,
    { loaders: { qualifiersLeaderboardLoader } }
  ) => {
    try {
      const leaderboards = await qualifiersLeaderboardLoader.loadMany(ids)

      return leaderboards
    } catch (e) {
      return e
    }
  },

  scores: async ({ scores: ids }, args, { loaders: { scoreLoader } }) => {
    try {
      const scores = await scoreLoader.loadMany(ids)

      return scores
    } catch (e) {
      return e
    }
  }
}
