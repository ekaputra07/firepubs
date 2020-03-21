const gcloud = require('@google-cloud/pubsub')
jest.mock('@google-cloud/pubsub')

let topic, publish

beforeAll(() => {
  jest.resetAllMocks()

  topic = jest.fn()
  publish = jest.fn()
})

test('pubsub topic publish error', async () => {
  const obj = {
    topic: topic.mockReturnThis(),
    publish: publish.mockRejectedValueOnce('publish-error')
  }
  gcloud.PubSub.mockImplementationOnce(() => obj)

  const data = { id: 'document-id' }
  const attr = { attr: 'attr' }
  try {
    await require('./pubsub').publishMessage('topic', data, attr)
  } catch (err) {
    expect(err).toBe('publish-error')
  }
  expect(topic).toHaveBeenCalledWith('topic')
  expect(publish).toHaveBeenCalledWith(Buffer.from(JSON.stringify(data)), attr)
})

test('pubsub topic publish success', async () => {
  const obj = {
    topic: topic.mockReturnThis(),
    publish: publish.mockResolvedValueOnce('message-id')
  }
  gcloud.PubSub.mockImplementationOnce(() => obj)

  const data = { id: 'document-id' }
  const attr = { attr: 'attr' }
  const msgId = await require('./pubsub').publishMessage('topic', data, attr)

  expect(msgId).toBe('message-id')
  expect(topic).toHaveBeenCalledWith('topic')
  expect(publish).toHaveBeenCalledWith(Buffer.from(JSON.stringify(data)), attr)
})
