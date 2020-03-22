const functions = require('firebase-functions')
const pubsub = require('./pubsub')

/**
 * This event is sent when a new object is created (or an existing object is overwritten,
 * and a new generation of that object is created) in the bucket.
 */
exports.onFinalize = (bucket, pubsubTopic, pubsubMsgAttrs) => {
  return functions.storage
    .bucket(bucket)
    .object()
    .onFinalize((file, context) => {
      return pubsub.publishMessage(
        pubsubTopic,
        { file: file, context: context },
        pubsubMsgAttrs
      )
    })
}

/**
 * This event is sent when an object is permanently deleted.
 * Depending on the object versioning setting for a bucket this means:
 * - For versioning buckets, this is only sent when a version is permanently deleted (but not when an object is archived).
 * - For non-versioning buckets, this is sent when an object is deleted or overwritten.
 */
exports.onDelete = (bucket, pubsubTopic, pubsubMsgAttrs) => {
  return functions.storage
    .bucket(bucket)
    .object()
    .onDelete((file, context) => {
      return pubsub.publishMessage(
        pubsubTopic,
        { file: file, context: context },
        pubsubMsgAttrs
      )
    })
}

/**
 * This event is sent when a live version of an object is archived or deleted.
 * This event is only sent for versioning buckets.
 */
exports.onArchive = (bucket, pubsubTopic, pubsubMsgAttrs) => {
  return functions.storage
    .bucket(bucket)
    .object()
    .onArchive((file, context) => {
      return pubsub.publishMessage(
        pubsubTopic,
        { file: file, context: context },
        pubsubMsgAttrs
      )
    })
}

/**
 * This event is sent when the metadata of an existing object changes.
 */
exports.onMetadataUpdate = (bucket, pubsubTopic, pubsubMsgAttrs) => {
  return functions.storage
    .bucket(bucket)
    .object()
    .onMetadataUpdate((file, context) => {
      return pubsub.publishMessage(
        pubsubTopic,
        { file: file, context: context },
        pubsubMsgAttrs
      )
    })
}
