export default {
  title: "System Design",
  icon: "🏗️",
  sections: [
    {
      title: "Topic 1 — Scaling aur Load Balancer",
      items: [
        {
          type: "concept",
          id: "sd-img-1",
          title: "Sessions: broken vs fixed",
          body: "My own diagram, exactly as I drew it. Tap the picture to open it full size.",
          diagram: "myImgSessions",
          diagramCaption: "Servers that remember things on their own log users out. Keep nothing on the servers and share one Redis store."
        }
      ]
    },
    {
      title: "Topic 2 — Caching",
      items: [
        {
          type: "concept",
          id: "sd-img-2",
          title: "Cache miss vs cache hit",
          body: "My own diagram, exactly as I drew it. Tap the picture to open it full size.",
          diagram: "myImgCache",
          diagramCaption: "The first request is slow and fills the cache. Every request after comes straight from the cache."
        }
      ]
    },
    {
      title: "Topic 3 — SQL vs NoSQL",
      items: [
        {
          type: "concept",
          id: "sd-img-3",
          title: "SQL database (relational)",
          body: "My own diagram, exactly as I drew it. Tap the picture to open it full size.",
          diagram: "myImgSql",
          diagramCaption: "Tables linked by ids, with a plain-words glossary."
        },
        {
          type: "concept",
          id: "sd-img-4",
          title: "NoSQL database (document style) and which one to pick",
          body: "My own diagram, exactly as I drew it. Tap the picture to open it full size.",
          diagram: "myImgNosql",
          diagramCaption: "Everything about one user in one document, and when to pick SQL or NoSQL."
        }
      ]
    },
    {
      title: "Topic 4 — Replication and Sharding",
      items: [
        {
          type: "concept",
          id: "sd-img-5",
          title: "Replication: several machines holding the same data",
          body: "My own diagram, exactly as I drew it. Tap the picture to open it full size.",
          diagram: "myImgReplication",
          diagramCaption: "Writes go to the leader, reads go to the followers."
        },
        {
          type: "concept",
          id: "sd-img-6",
          title: "Sharding: each machine holds a different slice",
          body: "My own diagram, exactly as I drew it. Tap the picture to open it full size.",
          diagram: "myImgSharding",
          diagramCaption: "Data is cut into pieces by a shard key. Watch out for a hot shard."
        }
      ]
    },
    {
      title: "Interview Questions",
      items: [
        {
          type: "concept",
          id: "sd-12",
          title: "Interview question — SQL or NoSQL for posts and comments?",
          body: [
            `"We're building a system where users write posts and other users comment on them. Which database would you choose?"`,
            `This question is a **trap**. The trap is answering immediately. The interviewer wants to see if you **ask about scale and requirements first**.`,
            `A good answer:`,
            `"It depends on two things I'd want to know: how much data, and whether anything here needs to be exactly correct.`,
            `At normal scale — say under ten million posts — I'd use **PostgreSQL**, a SQL database. Posts and comments are naturally related data, joins are cheap at that size, and I get transactions for free, which matters for anything like payments or account changes I might add later. Starting with SQL is the **boring, correct default**, and 'we outgrew Postgres' is a nice problem to have.`,
            `If we're at social-network scale — hundreds of millions of posts, feeds read far more often than written — I'd think differently. There, the read pattern is 'give me this post and its comments', and I'd want that to be one lookup rather than a join across sharded machines. A document store like MongoDB or a wide-column store like Cassandra fits that better.`,
            `I'd also point out that it doesn't have to be one or the other. A common real setup is **SQL** for accounts and payments where correctness is critical, plus a **NoSQL** store for the high-volume feed data. Different data, different tool."`,
            `What makes that answer work: you asked about scale, you named the boring default and defended it, you said when you'd switch, and you mentioned using both. Interviewers hear "MongoDB because it's web scale" all day. Hearing "Postgres until it hurts, and here's what hurting looks like" is refreshing and correct.`
          ],
          diagram: "pickDb",
          diagramCaption: "So which one do I pick? Left: SQL is the default when being wrong is unacceptable. Right: NoSQL when being slow is. A common real setup uses both."
        },
        {
          type: "concept",
          id: "sd-20",
          title: "Interview question — database at 100% CPU, what do you do?",
          body: [
            `"Your database is at 100% CPU and users are complaining the site is slow. What do you do?"`,
            `A good answer:`,
            `"First I'd look at **what's actually consuming the CPU**, because the fix depends on the shape of the load. Is it reads or writes, and is it a few slow queries or a flood of fast ones?`,
            `If it's a handful of slow queries, the cheapest fix is almost always a **missing index** — that can take a query from seconds to milliseconds with no architecture change at all.`,
            `If it's a flood of reads for the same data, I'd add a cache in front, using **cache-aside** with Redis. That typically removes 90% or more of the read traffic.`,
            `If reads are still too heavy after that, **read replicas** — copies of the database that serve reads only, while all writes continue to go to the leader. I'd have to handle replication lag: right after someone writes something, their own reads go to the leader for a few seconds so they don't see their change disappear.`,
            `**Sharding** is where I'd go **last**, and only for one of two specific reasons: the data no longer fits on one machine, or write volume has outgrown a single leader. It's the only fix on this list that's genuinely hard to undo, so I'd want to be sure the cheaper three didn't solve it first."`
          ],
          diagram: "sd20Interview",
          diagramCaption: "The decision flow: check the load shape first, then index, cache, replicas, and shard only as a last resort."
        }
      ]
    }
  ]
};
