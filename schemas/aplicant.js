var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Aplicant = new Schema({
  name: {type: String},
  email: {type: String},
  phone: {type: String},
  status: {type: String, default: 'Screening', enum: ['Screening', 'Accepted', 'Rejected']},
  date: {type: Date, default: Date.now},
  resume: {type: String}
})

var model = mongoose.model('Applicant', Aplicant)
module.exports = model
