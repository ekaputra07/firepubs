const firestore = require('./firestore')

module.exports = {
  FirestoreOnWrite: firestore.onWrite,
  FirestoreOnCreate: firestore.onCreate,
  FirestoreOnUpdate: firestore.onUpdate,
  FirestoreOnDelete: firestore.onDelete
}
