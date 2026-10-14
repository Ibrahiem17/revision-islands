/**
 * The user's own Excalidraw diagrams for System Design, shown exactly as drawn (unaltered image files in
 * public/system-design-notes/). Registered by key; content/system-design/index.js uses them via `diagram: "<key>"`.
 */
const img = (file, alt) => () =>
  `<a class="my-note-img" href="/system-design-notes/${file}" target="_blank" rel="noopener" title="Open full size">` +
  `<img src="/system-design-notes/${file}" loading="lazy" decoding="async" alt="${alt.replace(/"/g, "&quot;")}"></a>`;

export default {
  myImgSessions: img("sessions-shared-store.png",
    "Broken: each server remembers sessions on its own, so with three servers behind a load balancer user 55 is logged out two times out of three. Fixed: servers keep nothing and one shared Redis session store holds the sessions, so any server can serve any request."),
  myImgCache: img("cache-miss-hit.png",
    "First request is a cache miss, the slow path: user, app server, empty Redis cache, then the database, and the app saves a copy into the cache. Every request after is a cache hit, the fast path: the cache already has the data, the database is never touched, and the answer comes back in about one millisecond."),
  myImgSql: img("sql-database.png",
    "SQL database, also called relational. An online shop with a users table and an orders table linked by user id 55. A glossary explains table, row, column, primary key, foreign key, join and schema."),
  myImgNosql: img("nosql-database.png",
    "NoSQL database, document style. Everything about user Ali sits in one document with his orders inside, so no join is needed and there is no fixed schema. Below: pick SQL when being wrong is unacceptable, pick NoSQL when being slow is unacceptable."),
  myImgReplication: img("replication.png",
    "Replication: several machines holding the same data. App servers send writes only to the leader, the leader copies to read-only followers, and all reads go to the followers. A glossary explains write, read, leader, follower, replication lag and failover."),
  myImgSharding: img("sharding.png",
    "Sharding: each machine holds a different slice of the data. Shard 1 has user ids 1 to 1000, shard 2 has 1001 to 2000, shard 3 has 2001 to 3000, and the app server looks up user 1500 on shard 2. The danger is a hot shard when the split is uneven. A glossary explains shard, shard key and cost."),
  myImgQueue: img("message-queue.svg",
    "Without a queue, the user waits for every job: Ali clicks Sign Up and the app server resizes the photo, sends the welcome email, updates the search index and makes the invoice, so he stares at a spinner for 10 seconds, and if the email service is down the whole signup fails. With a queue, the app only saves the account and writes the jobs on a to-do list, the reply comes back in 0.2 seconds, and separate workers do the jobs in the background. If the email service is down only that one job waits."),
  myImgQueueTrap: img("queue-trap.svg",
    "The trap: the same job can run twice. Worker A takes the send welcome email job and sends the email, then crashes before telling the queue it finished. The queue thinks it failed and Worker B sends it again, so Ali gets two welcome emails. The fix is to make every job idempotent: give each job an id, check whether it was already done, skip it if so, and otherwise do it and record that it is finished. A glossary explains retry, dead letter queue, at-least-once and idempotent."),
};
