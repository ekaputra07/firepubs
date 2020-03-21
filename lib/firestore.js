const functions = require('firebase-functions')
const pubsub = require('./pubsub')

function makeMessage (snap, context, isUpdate) {
  if (isUpdate) {
    return {
      id: snap.after.id,
      timestamp: context.timestamp,
      before: snap.before.data(),
      after: snap.after.data()
    }
  }
  return {
    id: snap.id,
    timestamp: context.timestamp,
    data: snap.data()
  }
}

// listen for onWrite event
exports.onWrite = (document, pubsubTopic, pubsubMsgAttrs) => {
  return functions.firestore.document(document).onWrite((snap, context) => {
    const msg = makeMessage(snap, context, true)
    return pubsub.publishMessage(pubsubTopic, msg, pubsubMsgAttrs)
  })
}

// listen for onCreate event
exports.onCreate = (document, pubsubTopic, pubsubMsgAttrs) => {
  return functions.firestore.document(document).onCreate((snap, context) => {
    const msg = makeMessage(snap, context)
    return pubsub.publishMessage(pubsubTopic, msg, pubsubMsgAttrs)
  })
}

// listen for onUpdate event
exports.onUpdate = (document, pubsubTopic, pubsubMsgAttrs) => {
  return functions.firestore.document(document).onUpdate((snap, context) => {
    const msg = makeMessage(snap, context, true)
    return pubsub.publishMessage(pubsubTopic, msg, pubsubMsgAttrs)
  })
}

// listen for onDelete event
exports.onDelete = (document, pubsubTopic, pubsubMsgAttrs) => {
  return functions.firestore.document(document).onDelete((snap, _) => {
    const msg = makeMessage(snap, context)
    return pubsub.publishMessage(pubsubTopic, msg, pubsubMsgAttrs)
  })
}
