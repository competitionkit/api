const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'Leaderboard',
  Schema({
    athletes: [mongoose.Schema.Types.ObjectId],
    category: 'String',
    competition: mongoose.Schema.Types.ObjectId,
    gender: 'String',
    workouts: [mongoose.Schema.Types.ObjectId]
  })
)
