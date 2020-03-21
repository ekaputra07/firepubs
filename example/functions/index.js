const admin = require('firebase-admin')
const firepubs = require('firepubs')

admin.initializeApp()

exports.firepubsDemo = firepubs.FirestoreOnDelete(
  '/env/eka/firepubs/{docId}',
  'firepubs'
)
