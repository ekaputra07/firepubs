const functions = require('firebase-functions')
const pubsub = require('./pubsub')

function makeMessage (snap, context, isUpdate) {
  if (isUpdate) {
    return {
      timestamp: context.timestamp,
      before: snap.before.data(),
      after: snap.after.data()
    }
  }
  return {
    timestamp: context.timestamp,
    data: snap.data()
  }
}

// listen for onWrite event
exports.onWrite = (document, pubsubTopic, pubsubMsgAttrs) => {
  return functions.firestore.document(document).onWrite((snap, context) => {
    if (snap.before.exists) {
      if (snap.after.exists) {
        console.log('-- updated')
        // -- update
        const msg = makeMessage(snap, context, true)
        return pubsub.publishMessage(pubsubTopic, msg, pubsubMsgAttrs)
      } else {
        console.log('-- deleted')
        // -- delete
        const msg = makeMessage(snap, context)
        return pubsub.publishMessage(pubsubTopic, msg, pubsubMsgAttrs)
      }
    } else {
      console.log('-- create')
      // -- create
      if (snap.after.exists) {
        const msg = makeMessage(snap, context)
        return pubsub.publishMessage(pubsubTopic, msg, pubsubMsgAttrs)
      }
    }
    return Promise.resolve()
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
