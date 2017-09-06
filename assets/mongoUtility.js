var mongoose = require('mongoose')
var Aplicant = require('../schemas/aplicant')
var uri = "your local or mlab url"
exports.connect = function (cb) {
  mongoose.Promise = global.Promise
  mongoose.connect(uri, {useMongoClient: true}, function (err) {
    if (err) {
      // if connecting to mongo fails then quit immediately
      // this should be enhanced for making retries
      console.log(err)
      return process.exit(2)
    }
    return cb()
  })
}

exports.getList = function (collectionName, cb) {
  var model = getModel(collectionName)
  if(!model) // if unknown model should properly write back error

  model.find({}, function (err, docs) {
  	if (err) return cb(err)
  	return cb(null, docs)
  })
}

function getModel (collectionName) {
  switch(collectionName) {
  	case 'Aplicants': return Aplicant
  	default: return
  }
}

exports.save = function (collectionName, doc, cb) {
  var Model = getModel(collectionName)
  var model = new Model(doc)

  model.save(function (err, savedDoc) {
  	if (err) return cb(err)
  	return cb()
  })
}

exports.update = function (collectionName, doc, field, cb) {
  var Model = getModel(collectionName)
  
  model.update({_id: doc._id},  { $set: { field: doc.field }}, { multi: false }, function (err) {
    if (err) return cb(err)
    return cb()
  })
}