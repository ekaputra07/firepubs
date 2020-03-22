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
  '/docs/{docId}',
  'firesub_topic'
)

// -- or use FirestoreOnWrite, FirestoreOnUpdate or FirestoreOnDelete separately
exports.firestoreOnCreate = firesub.FirestoreOnCreate(
  '/docs/{docId}',
  'firesub_topic'
)

exports.firestoreOnUpdate = firesub.FirestoreOnUpdate(
  '/docs/{docId}',
  'firesub_topic',
  { event: 'update' } // custom pubsub message attribute.
)

exports.firestoreOnDelete = firesub.FirestoreOnDelete(
  '/docs/{docId}',
  'firesub_topic',
  { event: 'delete' }
)

/**
 * Below are example on how to publish Storage events to PubSub
 */
exports.storageOnFinalize = firesub.StorageOnFinalize(
  'firesub-bucket',
  'firesub_topic',
  { attr: 'attr' }
)

exports.storageOnArchive = firesub.StorageOnArchive(
  'firesub-bucket',
  'firesub_topic',
  { attr: 'attr' }
)

exports.storageOnDelete = firesub.StorageOnDelete(
  'firesub-bucket',
  'firesub_topic',
  { attr: 'attr' }
)

exports.storageOnMetadataUpdate = firesub.StorageOnMetadataUpdate(
  'firesub-bucket',
  'firesub_topic',
  { attr: 'attr' }
)
