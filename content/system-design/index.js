export default {
  title: "System Design",
  icon: "🏗️",
  sections: [
    {
      title: "Topic 1 — Scaling and the load balancer",
      items: [
        {
          type: "concept",
          id: "sd-topic1",
          title: "Topic 1 in full: scaling and the load balancer",
          body: [
          "## The problem",
          "You launch your app. One server: your code plus a database, running on one machine. It works for 100 users.",
          "Now 10,000 users show up. The server slows down, then starts refusing connections. You have exactly two options.",
          "## Option A — vertical scaling",
          "Buy a **bigger machine**. More RAM, more CPU. Takes ten minutes, zero code changes.",
          "It fails for two reasons: there is a biggest machine you can buy, and price rises much faster than power (a machine with 2× the CPU costs way more than 2× the money). And critically — you **still have one machine**. It reboots, your whole product is down.",
          "## Option B — horizontal scaling",
          "Buy five normal machines and run your code on all five.",
          "Cheaper per unit of power, no ceiling, and if one dies the other four keep serving. This is what **every real system** does. But it creates a new question: when a user types your URL, which of the five machines do they reach?",
          "That's the **load balancer**.",
          "## What a load balancer actually does",
          "It's a single machine sitting in front of your servers. All traffic hits it, and it forwards each request to one of the servers behind it. The user only ever knows about the load balancer's address. It does three jobs.",
          "**1. Picks a server.** Common strategies:",
          "- **Round robin** — server 1, 2, 3, 1, 2, 3. Dead simple, the default.",
          "- **Least connections** — send it to whichever server is currently handling the fewest requests. Better when some requests are slow and some are fast.",
          "- **IP hash** — the same user's IP always lands on the same server. Sounds clever; it's usually a crutch, and the trap below explains why.",
          "**2. Health checks.** Every few seconds it pings each server: \"are you alive?\" If a server stops replying, the load balancer stops sending it traffic — automatically, within seconds. This is why horizontal scaling gives you **reliability**. Without health checks, the LB happily forwards a third of your users to a dead machine.",
          "**3. Terminates HTTPS.** The encryption work is done once at the load balancer, so your app servers do plain HTTP internally. Small thing, saves real CPU.",
          "## How it's used in the real world",
          "You almost never build one. You use:",
          "- **Nginx or HAProxy** — software you run yourself, very common",
          "- **AWS ALB, Google Cloud Load Balancer, Cloudflare** — managed, you click a button",
          "Also worth knowing the two types, because it gets asked:",
          "- **Layer 4** — routes based on IP and port only. Doesn't look inside the request. Very fast.",
          "- **Layer 7** — reads the actual HTTP request, so it can route by URL path (/api/* to one group, /images/* to another). Slightly slower, far more useful. **Modern default.**",
          "## The trap: stateless servers",
          "This is the part that trips up beginners, and it's the whole reason interviewers ask about load balancers.",
          "Say a user logs in. Server 2 handles it and stores \"user 55 is logged in\" in its own memory. Next request, round robin sends them to server 3 — which has never heard of user 55. They get logged out. **Randomly.** About 80% of the time with 5 servers.",
          "The lazy fix is **sticky sessions** (IP hash): pin each user to one server forever. It works, but now that server holds something nobody else has — so if it dies, those users lose their session, and you can't balance traffic evenly anymore. You've thrown away the two things you scaled horizontally to get.",
          "The real fix: **servers store nothing.** Session data goes in a shared place — Redis, or a signed token the client carries. Now every server can serve every request, and any server dying costs you nothing.",
          "@@diagram",
          "## Same bug, different data: profile pictures",
          "A user uploads a profile picture. Your code saves it to /uploads/user55.jpg on the server's own hard drive. With one server, perfect. Now you add a second server behind a load balancer.",
          "**What breaks:** the upload goes to whichever server the load balancer picked — say server 1. The file now sits on server 1's disk. On the next page load, the load balancer sends the user to server 2. Server 2 looks for /uploads/user55.jpg, doesn't have it, and shows a broken image. Reload and it works (server 1), reload again and it's broken (server 2).",
          "It's the exact same bug as the session problem. Different data, same cause: **one server is holding something the others don't have.**",
          "**How to fix it:** the file goes to **blob storage** — S3, or Cloudflare R2, or Google Cloud Storage. The server uploads it there and saves only the link in the database. Now every server can fetch it, and a server dying costs you nothing.",
          "> The pattern to take from Topic 1: anything an app server keeps on its own disk or in its own memory will break the moment there's a second server. **Sessions → Redis. Files → blob storage. Nothing local.**",
          "## Interview question",
          "> \"You have one server and it's struggling under load. Walk me through how you'd scale it.\"",
          "This is a warm-up question in almost every system design interview. It's testing whether you jump straight to buzzwords or **reason in order**. A good answer sounds like this:",
          "> \"First I'd want to know what's struggling — CPU, memory, disk, or the database — because the fix is different for each. Let's assume it's CPU on the app server.",
          "> The quick win is **vertical scaling**: move to a bigger instance. That buys time with no code changes, and for a small product it's often the correct answer. But it has a hard ceiling and it leaves me with a single point of failure.",
          "> So the real answer is **horizontal scaling**: run the app on several servers behind a load balancer, health-checking each one so dead servers get pulled out automatically.",
          "> The prerequisite is that the app servers are **stateless**. If any request handler is keeping session data or uploaded files in local memory or on local disk, adding servers will cause random logouts and missing files. So sessions go to Redis or into a signed token, and uploads go to blob storage.",
          "> One thing worth flagging: this scales the app tier, not the database. All five servers still hit one database, so I've often just moved the bottleneck. Read replicas and caching would be the next step.\"",
          "**Why that answer scores well:** you asked a clarifying question, you named the cheap option before the fancy one, you caught the stateless prerequisite unprompted, and you finished by pointing at the next bottleneck. That last move — **attacking your own design** — is the single strongest signal you can send.",
          "## Check yourself",
          "Say this back in your own words: why can't an app server keep anything in its own memory or on its own disk?",
          "## Key takeaway",
          "- Ek server kaafi nahi hota — traffic barhe to bara machine khareedne ke bajaye zyada machines lagao, isko **horizontal scaling** kehte hain.",
          "- **Load balancer** saamne khara hota hai aur har request ko kisi ek server ko bhej deta hai, aur jo server mar jaye usko khud hi hata deta hai.",
          "- Sabse bara rule: app server apni memory ya apni disk mein kuch bhi save na kare — warna doosra server aate hi sab toot jata hai.",
          "- **Session Redis mein rakho, files blob storage mein** — phir koi bhi server koi bhi request handle kar sakta hai."
],
          diagram: "myImgSessions",
          diagramCaption: "My own diagram: broken sessions vs one shared Redis store."
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
