const firestore = require('./firestore')
const storage = require('./storage')

module.exports = {
  // Firestore
  FirestoreOnWrite: firestore.onWrite,
  FirestoreOnCreate: firestore.onCreate,
  FirestoreOnUpdate: firestore.onUpdate,
  FirestoreOnDelete: firestore.onDelete,
  // Storage
  StorageOnFinalize: storage.onFinalize,
  StorageOnArchive: storage.onArchive,
  StorageOnDelete: storage.onDelete,
  StorageOnMetadataUpdate: storage.onMetadataUpdate
}
