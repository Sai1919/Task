var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoUtil = require('./assets/mongoUtility')

app.use("/", express.static("assets/"))
app.set('views', __dirname + '/assets/views')
app.use(bodyParser.json())
app.get('/', function(req, res){
  res.sendFile('home.html', {root: app.settings.views})
})

app.get('/aplicants', function (req, res) {
  mongoUtil.getList('Aplicants', function (err, docs) {
  	if(err) return res.status(417).send(err)
  	res.status(200).json(docs)
  	return res.end()
  })
})

app.post('/applicant', function (req, res) {
  mongoUtil.save('Aplicants', req.body, function (err) {
  	if (err) return res.status(417).send(err)
  	return res.end()
  })
})

mongoUtil.connect(function () {
  var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
  })
})

app.put('/applicant/:field', function (req, res) {
  mongoUtil.update('Aplicants', req.body, req.params.field, function (err) {
    if (err) return res.status(417).send(err)
    return res.end()
  })
})