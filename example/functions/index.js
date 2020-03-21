const admin = require('firebase-admin')
const firesub = require('firesub')

admin.initializeApp()

exports.firesubDemo = firesub.FirestoreOnDelete(
  '/env/eka/firesub/{docId}',
  'firesub'
)
