express = require('express')
path = require('path')
bodyParser = require('body-parser')
mongodb = require('mongodb')
ObjectID = mongodb.ObjectID
CONTACTS_COLLECTION = 'Phones'
app = express()
#Error handler

handleError = (res, reason, message, code) ->
  console.log 'ERROR: ' + reason
  res.status(code or 500).json 'error': message
  return

app.use express.static(__dirname + '/')
app.use bodyParser.urlencoded(extended: true)
app.use bodyParser.json()
# Creating variable that defines Database address and credentials
connectionString = 'Your-MongoDb-credentials-and-address-here'
#Create database variable that can be used later
db = undefined
#Database connection
mongodb.MongoClient.connect connectionString, (err, database) ->
  if err
    console.log err
    process.exit 1
  db = database
  console.log 'Database connection ready'
  # Define it to use 8080 port
  server = app.listen(process.env.PORT or 8080, ->
    port = server.address().port
    console.log 'App now running on port', port
    return
  )
  return
#Route to get phones from Mongo-database
app.get '/phones', (req, res) ->
  db.collection(CONTACTS_COLLECTION).find({}).toArray (err, phones) ->
    if err
      handleError res, err.message, 'Failed to get phones.'
    else
      res.status(200).json phones
      res.sendFile __dirname + '/index.html'
    return
  return

app.post('/phones', (req, res) -> 
  db.collection(CONTACTS_COLLECTION).save(req.body, (err, phones) -> {
    if err
    return console.log(err)
  else
    console.log 'saved to database'
    res.redirect 'back'
  return
return

