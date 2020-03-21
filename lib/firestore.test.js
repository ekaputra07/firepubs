const pubsub = require('./pubsub')
const firestore = require('./firestore')

jest.mock('./pubsub')

let before, after, beforeData, afterData, context, attr

beforeAll(() => {
  jest.resetAllMocks()

  attr = { attr: 'test-attr' }
  context = { timestamp: '2020-01-01 00:00:00 UTC' }
  beforeData = jest.fn()
  afterData = jest.fn()
  before = {
    id: 'docId',
    data: beforeData
  }
  after = {
    id: 'docId',
    data: afterData
  }
})

test('onWrite:created should work as expected', async () => {
  beforeData.mockReturnValue(null)
  afterData.mockReturnValue({ name: 'test-after' })
  pubsub.publishMessage = jest.fn().mockResolvedValueOnce(true)

  const snap = {
    before: before,
    after: after
  }
  const func = firestore.onWrite('/cols/{doc}', 'topic', attr)

  const result = await func.run(snap, context)
  expect(result).toBeTruthy()
  expect(pubsub.publishMessage).toHaveBeenCalledTimes(1)
  expect(pubsub.publishMessage).toHaveBeenCalledWith(
    'topic',
    {
      before: null,
      after: { name: 'test-after' },
      id: 'docId',
      timestamp: '2020-01-01 00:00:00 UTC'
    },
    attr
  )
})

test('onWrite:updated should work as expected', async () => {
  beforeData.mockReturnValue({ name: 'test-before' })
  afterData.mockReturnValue({ name: 'test-after' })
  pubsub.publishMessage = jest.fn().mockResolvedValueOnce(true)

  const snap = {
    before: before,
    after: after
  }
  const func = firestore.onWrite('/cols/{doc}', 'topic', attr)

  const result = await func.run(snap, context)
  expect(result).toBeTruthy()
  expect(pubsub.publishMessage).toHaveBeenCalledTimes(1)
  expect(pubsub.publishMessage).toHaveBeenCalledWith(
    'topic',
    {
      before: { name: 'test-before' },
      after: { name: 'test-after' },
      id: 'docId',
      timestamp: '2020-01-01 00:00:00 UTC'
    },
    attr
  )
})

test('onWrite:deleted should work as expected', async () => {
  beforeData.mockReturnValue({ name: 'test-before' })
  afterData.mockReturnValue(null)
  pubsub.publishMessage = jest.fn().mockResolvedValueOnce(true)

  const snap = {
    before: before,
    after: after
  }
  const func = firestore.onWrite('/cols/{doc}', 'topic', attr)

  const result = await func.run(snap, context)
  expect(result).toBeTruthy()
  expect(pubsub.publishMessage).toHaveBeenCalledTimes(1)
  expect(pubsub.publishMessage).toHaveBeenCalledWith(
    'topic',
    {
      before: { name: 'test-before' },
      after: null,
      id: 'docId',
      timestamp: '2020-01-01 00:00:00 UTC'
    },
    attr
  )
})

test('onCreate should work as expected', async () => {
  afterData.mockReturnValue({ name: 'test-after' })
  pubsub.publishMessage = jest.fn().mockResolvedValueOnce(true)

  const func = firestore.onCreate('/cols/{doc}', 'topic', attr)

  const result = await func.run(after, context)
  expect(result).toBeTruthy()
  expect(pubsub.publishMessage).toHaveBeenCalledTimes(1)
  expect(pubsub.publishMessage).toHaveBeenCalledWith(
    'topic',
    {
      data: { name: 'test-after' },
      id: 'docId',
      timestamp: '2020-01-01 00:00:00 UTC'
    },
    attr
  )
})

test('onUpdate should work as expected', async () => {
  afterData.mockReturnValue({ name: 'test-after' })
  pubsub.publishMessage = jest.fn().mockResolvedValueOnce(true)
  const snap = {
    before: before,
    after: after
  }
  const func = firestore.onUpdate('/cols/{doc}', 'topic', attr)

  const result = await func.run(snap, context)
  expect(result).toBeTruthy()
  expect(pubsub.publishMessage).toHaveBeenCalledTimes(1)
  expect(pubsub.publishMessage).toHaveBeenCalledWith(
    'topic',
    {
      before: { name: 'test-before' },
      after: { name: 'test-after' },
      id: 'docId',
      timestamp: '2020-01-01 00:00:00 UTC'
    },
    attr
  )
})

test('onDelete should work as expected', async () => {
  beforeData.mockReturnValue({ name: 'test-before' })
  pubsub.publishMessage = jest.fn().mockResolvedValueOnce(true)

  const func = firestore.onDelete('/cols/{doc}', 'topic', attr)

  const result = await func.run(before, context)
  expect(result).toBeTruthy()
  expect(pubsub.publishMessage).toHaveBeenCalledTimes(1)
  expect(pubsub.publishMessage).toHaveBeenCalledWith(
    'topic',
    {
      data: { name: 'test-before' },
      id: 'docId',
      timestamp: '2020-01-01 00:00:00 UTC'
    },
    attr
  )
})
