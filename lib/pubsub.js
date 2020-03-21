const { PubSub } = require('@google-cloud/pubsub')

const client = new PubSub()

/**
 * Publish message to specified topic.
 * returns a Promise of messageId
 */
exports.publishMessage = function (topic, data) {
  const buffer = Buffer.from(JSON.stringify(data))
  return client.topic(topic).publish(buffer)
}
