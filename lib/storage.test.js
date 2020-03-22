const pubsub = require('./pubsub')
const storage = require('./storage')

jest.mock('./pubsub')

let attr, context, file

beforeAll(() => {
  jest.resetAllMocks()

  attr = { attr: 'test-attr' }
  context = { eventId: 'event-id' }
  file = {
    bucket: 'bucket-name',
    name: 'file-name'
  }
})

test('onFinalize should work as expected', async () => {
  pubsub.publishMessage = jest.fn().mockResolvedValueOnce(true)

  const func = storage.onFinalize('bucket-name', 'topic', attr)

  const result = await func.run(file, context)
  expect(result).toBeTruthy()
  expect(pubsub.publishMessage).toHaveBeenCalledTimes(1)
  expect(pubsub.publishMessage).toHaveBeenCalledWith(
    'topic',
    {
      file: file,
      context: context
    },
    attr
  )
})

test('onDelete should work as expected', async () => {
  pubsub.publishMessage = jest.fn().mockResolvedValueOnce(true)

  const func = storage.onDelete('bucket-name', 'topic', attr)

  const result = await func.run(file, context)
  expect(result).toBeTruthy()
  expect(pubsub.publishMessage).toHaveBeenCalledTimes(1)
  expect(pubsub.publishMessage).toHaveBeenCalledWith(
    'topic',
    {
      file: file,
      context: context
    },
    attr
  )
})

test('onArchive should work as expected', async () => {
  pubsub.publishMessage = jest.fn().mockResolvedValueOnce(true)

  const func = storage.onArchive('bucket-name', 'topic', attr)

  const result = await func.run(file, context)
  expect(result).toBeTruthy()
  expect(pubsub.publishMessage).toHaveBeenCalledTimes(1)
  expect(pubsub.publishMessage).toHaveBeenCalledWith(
    'topic',
    {
      file: file,
      context: context
    },
    attr
  )
})

test('onMetadataUpdate should work as expected', async () => {
  pubsub.publishMessage = jest.fn().mockResolvedValueOnce(true)

  const func = storage.onMetadataUpdate('bucket-name', 'topic', attr)

  const result = await func.run(file, context)
  expect(result).toBeTruthy()
  expect(pubsub.publishMessage).toHaveBeenCalledTimes(1)
  expect(pubsub.publishMessage).toHaveBeenCalledWith(
    'topic',
    {
      file: file,
      context: context
    },
    attr
  )
})
