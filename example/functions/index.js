const admin = require('firebase-admin')
const firesub = require('firesub')

admin.initializeApp()

/**
 * Below are example on how to publish Firestore events to PubSub
 * Depends on what events you want to listen you could publish them to separate
 * topic or to the same topic.
 * You could also specify custom PubSub message attributes.
 */

// -- FirestoreOnWrite will publish event when document created, updated and deleted
exports.firestoreOnWrite = firesub.FirestoreOnWrite(
  '/my/document/{docId}',
  'topic-on-write'
)

// -- or use FirestoreOnWrite, FirestoreOnUpdate or FirestoreOnDelete separately
exports.firestoreOnCreate = firesub.FirestoreOnCreate(
  '/my/document/{docId}',
  'topic-on-create'
)

exports.firestoreOnUpdate = firesub.FirestoreOnUpdate(
  '/my/document/{docId}',
  'topic-common',
  { event: 'update' } // custom pubsub message attribute.
)

exports.firestoreOnDelete = firesub.FirestoreOnDelete(
  '/my/document/{docId}',
  'topic-common',
  { event: 'delete' }
)
