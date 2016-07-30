Requirements:

- Offline mode (you should be able to sync after the user got back online, display conflicts)
- Realtime updates (getting status change notifications, remote data update notifications, etc)
- Collaborative editing (?? undecided)
- Cute react integration (redux/mobx/pouchdb/anything)
- Performance. Better with production grade db

Possible top-level solutions:

1. Custom redux-based + some traditional DB for data storage

Data storage: `mongo`/`postgre`.

Realtime notifications and queries: some custom solution with mongo change feed, distinct pubsub for postgre.

Offline mode: also something to invent (update request queue, service worker, whatever).

Problems: too hard to implement.

2. ~~PouchDB on frontend + (CouchDB / PouchDB) on backend~~ Declined

Data storage: `couchdb`.

Realtime notifications and queries: couchdb changes feed, view feed, some websocket lib, etc.

Offline mode: native for pouchdb.

Problems: react integration, auth, collaboration.

**Decision: NO.** CouchDB is not as performant as mongodb, most of it's features will not be widely used, and it's serverless design complicates stuff for us, instead of making everything simpler.

3. ShareDB under the Racer library

Data storage: `mongo`, the only supported thing.

Realtime notifications and queries: native under racer framework.

Offline mode: native for sharedb, but seems to be a bit weird.

Problems: auth, conflict resolution.
