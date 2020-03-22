# FireSub
Firesub is a Firebase Functions helper to easily publish Firestore or Storage events to PubSub.

There will be a case where you want handle all of your Firestore or Storage events in a single (monolithic) app instead of handle them separately as collection of microservices (Firebase Functions). Also it will also useful if you want to handle those events outside of GCP environment.

**Firesub will helps you to build the bridge** between the events and the worker that process the events. Allows you to be more flexible to design your system infrastructure and process the event with the language of your choice.

**Note:** Firesub is not a standalone service, it provides you helper functions to make it easily for you to create the _"bridge"_. The bridge it self will be just a normal Firebase Functions but Firesub will helps creating them a breeze.

## Install

```
npm install --save firesub
```

## Quick Start

We'll create a couple of Firebase Functions that will publish an event when:

- A new document created on your Firestore collection
- A file has been uploaded into your Cloud Storage bucket

```
const admin = require('firebase-admin')
const firesub = require('firesub')

admin.initializeApp()

exports.postCreated = firesub.FirestoreOnCreate('/posts/{id}', 'topic_foo')
exports.fileUploaded = firesub.StorageOnFinalize('my-gs-bucket', 'topic_bar')
```

Deploy them:

```
firebase deploy --only functions
```

When all are good you will have two Firebase Functions (`postCreated`, `fileUploaded`) deployed and ready to push events to PubSub topics of your choosing.

_Please note that **all of those PubSub topic must be created first** before you able to publish messages into it._

## Available Events

Currently it's only available for Firestore and Cloud Storage events, but I might add more in the future.

|GCP Products|Events|Description|
|------|------|------|
|Firestore|FirestoreOnWrite|when document `created` or `updated` or `deleted`|
||FirestoreOnCreate|when document `created`|
||FirestoreOnUpdate|when document `updated`|
||FirestoreOnDelete|when document `deleted`|
|Storage|StorageOnFinalize|when a new file is `created` (or an existing object is `overwritten`, and a new generation of that object is created) in the bucket|
||StorageOnArchive|when a live version of an object is `archived` or deleted|
||StorageOnDelete|when a file is permanently `deleted`|
||StorageOnMetadataUpdate|when the `metadata` of an existing object `changes`|

More info about Firestore trigger events [here](https://firebase.google.com/docs/functions/firestore-events) and more about Cloud Storage trigger events [here](https://firebase.google.com/docs/functions/gcp-storage-events)

## Example usage

You could see example project [here](https://github.com/ekaputra07/firesub/tree/master/example/functions)

## Contribution

This is young project, created because I need it for my own project thats why the events that are supported is very limited at this stage. If you would like it to support more events your contribution are welcome.

## License

```
MIT License

Copyright (c) 2020 Eka Putra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
