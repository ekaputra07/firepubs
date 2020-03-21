const admin = require('firebase-admin')
const firepubs = require('firepubs')

admin.initializeApp()

exports.firepubsDemo = firepubs.FirestoreOnWrite(
  '/env/eka/firepubs/{docId}',
  'firepubs',
  { attr: 'exampleAttr' }
)
