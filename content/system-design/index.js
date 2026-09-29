export default {
  title: "System Design",
  icon: "🏗️",
  sections: [
    {
      title: "Topic 1 — Scaling aur Load Balancer",
      items: [
        {
          type: "list",
          id: "sd-1",
          title: "Scaling aur Load Balancer — key takeaway",
          points: [
            "Ek server kaafi nahi hota — traffic barhe to bara machine khareedne ke bajaye zyada machines lagao, isko horizontal scaling kehte hain.",
            "Load balancer saamne khara hota hai aur har request ko kisi ek server ko bhej deta hai, aur jo server mar jaye usko khud hi hata deta hai.",
            "Sabse bara rule: app server apni memory ya apni disk mein kuch bhi save na kare — warna doosra server aate hi sab toot jata hai.",
            "Session Redis mein rakho, files blob storage mein — phir koi bhi server koi bhi request handle kar sakta hai."
          ],
          // animated ink diagram, drawn in src/topics/system-design-diagrams.js
          diagram: "scalingSessions",
          diagramCaption: "Left: the session lives inside one server, so the user is logged out 2 times in 3. Right: it lives in shared Redis, so any server works."
        }
      ]
    },
    {
      title: "Topic 2 — Caching",
      items: [
        {
          type: "concept",
          id: "sd-2",
          title: "The problem",
          body: [
            `Your app shows user profiles. Every time someone opens a profile page, your code runs a query against the database.`,
            `Now think about a popular profile — say a celebrity with 100,000 visitors an hour. Your database answers the exact same question 100,000 times and gives the exact same answer every time. The profile hasn't changed in three weeks.`,
            `That's the waste. You're paying for the slowest part of your system to repeat identical work.`
          ],
          diagram: "cacheRepeat",
          diagramCaption: "Left: the database answers the same question 100,000 times. Right: it answers once and the cache serves the repeats."
        },
        {
          type: "table",
          id: "sd-3",
          title: "Here's why the database is the slow part:",
          headers: ["Where the data is", "Rough time to get it"],
          rows: [
            ["Memory (RAM)", "very fast"],
            ["Disk (SSD)", "about 100× slower"],
            ["Another datacenter", "about 100× slower again"]
          ],
          note: `A database keeps data on disk. A cache keeps data in memory. Same data, ~100× faster. That's the whole idea.`,
          diagram: "cacheSpeed",
          diagramCaption: "Each step away from memory costs about 100 times more time."
        },
        {
          type: "list",
          id: "sd-4",
          title: "Three words you need to know, all visible in that picture:",
          points: [
            `Cache hit — the cache had it. Fast.`,
            `Cache miss — the cache didn't have it, so you went to the database. Slow.`,
            `Hit rate — what percentage of requests are hits. A good cache runs at 90–99%. At 95%, your database is doing one-twentieth of the work it used to.`
          ],
          diagram: "cacheMissHit",
          diagramCaption: "Left: the first request misses, goes to the database and leaves a copy in the cache. Right: every request after is a hit and the database is never touched."
        },
        {
          type: "concept",
          id: "sd-5",
          title: "How it's used in the real world",
          body: [
            `Redis is the answer 90% of the time. It's a separate server that holds data in memory. Memcached is the older alternative — simpler, less capable. If an interviewer asks "which cache", say Redis and you're safe.`
          ],
          diagram: "cacheRedis",
          diagramCaption: "Redis is a separate server holding data in memory; Memcached is the older, simpler alternative."
        },
        {
          type: "list",
          id: "sd-6",
          title: "Caching also happens in more places than most beginners realise:",
          points: [
            `Browser cache — your browser keeps images and CSS locally`,
            `CDN — the thing from Topic 1, which is really a cache for files, placed near users`,
            `Application cache — Redis, the one we just drew. This is the one interviews mean.`,
            `Database's own cache — databases keep recently-used pages in memory automatically`
          ],
          diagram: "cacheLayers",
          diagramCaption: "A request is checked against each cache in turn and stops at the first layer that has the answer."
        }
      ]
    },
    {
      title: "Topic 3 — SQL vs NoSQL",
      items: [
        {
          type: "concept",
          id: "sd-7",
          title: "SQL (relational) — the key idea",
          body: [
            `The key idea: data is split up and never repeated. Ali's name is stored in exactly one place. If he changes his name, you edit one row and every order automatically shows the new name.`
          ],
          diagram: "sqlTables",
          diagramCaption: "Left: users and orders are two tables linked by Ali's id, 55. Right: what each word means."
        },
        {
          type: "concept",
          id: "sd-8",
          title: "SQL's superpower: transactions.",
          body: [
            `A transaction means a group of changes that either all happen or none happen. There is no half-way.`,
            `The classic example is a bank transfer. Moving 500 rupees from Ali to Sara is two steps: subtract 500 from Ali, add 500 to Sara. If the power dies between step one and step two, 500 rupees vanish from the world. A transaction makes that impossible — if step two fails, step one is undone automatically.`
          ],
          diagram: "sqlTransfer",
          diagramCaption: "Left: without a transaction the power cut loses the 500. Right: with one, step one is rolled back."
        },
        {
          type: "list",
          id: "sd-9",
          title: "You'll hear the word ACID for the guarantees SQL databases give you. In plain terms:",
          points: [
            `Atomic — all steps happen or none do (the transfer above)`,
            `Consistent — the data never ends up in an illegal state`,
            `Isolated — two people acting at the same time don't corrupt each other`,
            `Durable — once the database says "saved", it survives a power cut`
          ],
          note: `You don't need to recite this. You need to know that SQL gives you these and NoSQL usually gives you less.`,
          diagram: "sqlAcid",
          diagramCaption: "The four ACID guarantees, one tile each."
        },
        {
          type: "concept",
          id: "sd-10",
          title: "Family 2: NoSQL",
          body: [
            `Examples: MongoDB, DynamoDB, Cassandra. "NoSQL" just means "not the table thing." Instead of splitting data across tables, you keep related data together in one blob.`
          ],
          diagram: "nosqlDoc",
          diagramCaption: "Left: Ali and his orders in one document. Right: what changed compared with SQL."
        },
        {
          type: "concept",
          id: "sd-11",
          title: "Why NoSQL exists at all",
          body: [
            `Two real reasons, and knowing them is what makes your answer sound experienced:`,
            `1. Reading is one trip instead of many. In SQL, showing Ali's order history means reading the users table, then the orders table, then stitching them (a join). In NoSQL you read one document and you're done. At Facebook scale, that difference is enormous.`,
            `2. It splits across machines more easily. Remember horizontal scaling from Topic 1 — more machines instead of one big one. Splitting a database across machines is called sharding (I'll cover it properly later; for now: user IDs 1–1000 on machine A, 1001–2000 on machine B). SQL hates this, because a join now has to reach across two machines over the network. NoSQL documents are self-contained, so they split cleanly.`,
            `The cost you pay: duplicated data. Ali's name might be copied into a hundred documents. Change his name and you must find and update all hundred. SQL wouldn't have that problem — but SQL wouldn't scale as easily either. That's the trade.`
          ],
          diagram: "nosqlWhy",
          diagramCaption: "Left: one read instead of a join, and the price of duplicated data. Right: a join crossing two machines, versus self-contained documents."
        },
        {
          type: "concept",
          id: "sd-12",
          title: "Interview question",
          body: [
            `"We're building a system where users write posts and other users comment on them. Which database would you choose?"`,
            `This question is a trap. The trap is answering immediately. The interviewer wants to see if you ask about scale and requirements first.`,
            `A good answer:`,
            `"It depends on two things I'd want to know: how much data, and whether anything here needs to be exactly correct.`,
            `At normal scale — say under ten million posts — I'd use PostgreSQL, a SQL database. Posts and comments are naturally related data, joins are cheap at that size, and I get transactions for free, which matters for anything like payments or account changes I might add later. Starting with SQL is the boring, correct default, and 'we outgrew Postgres' is a nice problem to have.`,
            `If we're at social-network scale — hundreds of millions of posts, feeds read far more often than written — I'd think differently. There, the read pattern is 'give me this post and its comments', and I'd want that to be one lookup rather than a join across sharded machines. A document store like MongoDB or a wide-column store like Cassandra fits that better.`,
            `I'd also point out that it doesn't have to be one or the other. A common real setup is SQL for accounts and payments where correctness is critical, plus a NoSQL store for the high-volume feed data. Different data, different tool."`,
            `What makes that answer work: you asked about scale, you named the boring default and defended it, you said when you'd switch, and you mentioned using both. Interviewers hear "MongoDB because it's web scale" all day. Hearing "Postgres until it hurts, and here's what hurting looks like" is refreshing and correct.`
          ],
          diagram: "pickDb",
          diagramCaption: "So which one do I pick? Left: SQL is the default when being wrong is unacceptable. Right: NoSQL when being slow is. A common real setup uses both."
        },
        {
          type: "list",
          id: "sd-13",
          title: "SQL vs NoSQL — key takeaway",
          points: [
            "SQL matlab data alag alag tables mein tuta hua hota hai aur ek dusre se id ke zariye jura hota hai — koi cheez do jagah save nahi hoti.",
            "SQL ki sabse bari taqat transaction hai: ya poora kaam hota hai ya bilkul nahi hota, isliye paisa, booking aur stock ke liye SQL hi sahi hai.",
            "NoSQL mein sab kuch ek hi document ke andar hota hai, isliye join ki zaroorat nahi parti aur bohot saari machines par asaani se bant jata hai.",
            "Interview mein hamesha pehle scale poocho, phir kaho \"chhote system ke liye SQL default hai, bohot bare scale par NoSQL\" — dono ka saath istemal bhi normal baat hai.",
            "What you got: SQL keeps each fact in exactly one place, split across tables. And SQL gives you transactions — all of the work happens or none of it does.",
            "The bit you didn't know — what you give up with NoSQL: you give up that all-or-nothing guarantee. NoSQL will usually happily do half a job and leave you with a half-finished state. That's why nobody sane stores bank balances in it.",
            "And what you get in return: two things. Reads are one lookup instead of stitching tables together. And the data splits across many machines easily, so there's no size ceiling.",
            "The price of that price: the same fact ends up copied in many places. Ali's name might sit inside a hundred documents. Change it and you have to hunt down all hundred.",
            "So the trade in one line: SQL trades scale for correctness. NoSQL trades correctness for scale."
          ],
          diagram: "sqlNosqlTrade",
          diagramCaption: "The trade in one line: SQL trades scale for correctness, NoSQL trades correctness for scale."
        }
      ]
    },
    {
      title: "Topic 4 — Replication and Sharding",
      items: [
        {
          type: "concept",
          id: "sd-14",
          title: "Replication vs Sharding — the difference, before anything else",
          body: [
            `These two get confused constantly, so here's the difference before anything else:`,
            `Replication = several machines holding the same data. Copies.`,
            `Sharding = several machines each holding a different slice of the data. Splits.`,
            `Two words first, because everything below uses them:`,
            `Write — saving or changing something. Placing an order, editing your profile.`,
            `Read — just looking at something. Opening a page.`,
            `Most apps do far more reads than writes. A typical ratio is 100 reads for every 1 write. That imbalance is what makes replication so useful.`
          ],
          diagram: "sd14Ratio",
          diagramCaption: "Write versus read: a typical app does 100 reads for every 1 write, and that's what makes replication worth it."
        },
        {
          type: "list",
          id: "sd-15",
          title: "Part 1: Replication — right now you have one database machine. Two problems:",
          points: [
            "If it dies, your entire product is down. This is called a single point of failure — one thing whose death kills everything.",
            "Every read and every write hits that one machine, so it runs out of capacity."
          ],
          diagram: "sd15Replication",
          diagramCaption: "Left: no replication — the machine dies, the site is down. Right: a leader takes writes, followers take reads, and if the leader dies a follower is promoted (failover)."
        },
        {
          type: "concept",
          id: "sd-16",
          title: "The catch — replication lag",
          body: [
            `Copying isn't instant. When you save something to the leader, it takes a few milliseconds to reach the followers. In that gap, the follower is serving old data.`,
            `Here's the bug this causes, and it's a real one you've probably experienced:`,
            `Ali writes a comment. The write goes to the leader. The page reloads, the read goes to a follower — which hasn't received the comment yet. Ali's own comment vanishes. He writes it again. Now there are two.`,
            `The fix is a rule called read-your-own-writes: for a short window after someone writes something, send that person's reads to the leader instead of a follower. Everyone else can keep reading from followers. Mention this in an interview and you'll sound like you've shipped something.`,
            `The general name for "the copies briefly disagree, but they catch up" is eventual consistency. Eventually all copies agree; right now they might not.`
          ],
          diagram: "sd16Lag",
          diagramCaption: "Left: the bug — Ali's own comment vanishes because the read hits a lagging follower. Right: the fix — read-your-own-writes, and eventual consistency."
        },
        {
          type: "list",
          id: "sd-17",
          title: "Part 2: Sharding — replication doesn't solve everything. Notice what it can't do:",
          points: [
            "Every machine still holds all the data. If you have 500 GB of users and a machine holds 200 GB, adding followers doesn't help — none of them can hold it.",
            "Every write still goes through one leader. Followers don't take writes. So write capacity is capped forever.",
            "When you hit either wall, you shard.",
            "Sharding — splitting different rows onto different machines. Each machine is called a shard."
          ],
          diagram: "sd17Sharding",
          diagramCaption: "Left: what replication can't do — data too big, writes capped. Right: sharding — the app looks up which shard holds user 1500."
        },
        {
          type: "list",
          id: "sd-18",
          title: "Why sharding is a last resort — three real costs:",
          points: [
            "Joins break. Ali is on shard 2, his orders are on shard 1. Stitching them now means talking to two machines over the network. Slow, and sometimes you just can't.",
            "Changing the split is brutal. Going from 3 shards to 4 means physically moving a huge amount of data while the system is live.",
            "Everything gets harder — backups, monitoring, debugging. Every problem now has three places to hide."
          ],
          diagram: "sd18ShardCosts",
          diagramCaption: "Three real costs of sharding: broken joins, brutal resharding, and everything harder to operate."
        },
        {
          type: "table",
          id: "sd-19",
          title: "This is why the correct order of fixes matters:",
          headers: ["Order", "Fix", "Effort"],
          rows: [
            ["1", "Add an index — a lookup shortcut so the DB stops scanning every row", "minutes"],
            ["2", "Add a cache (Topic 2)", "hours"],
            ["3", "Add read replicas", "a day"],
            ["4", "Shard", "weeks, and permanent complexity"]
          ],
          note: `Walk down that ladder in an interview, in that order, and you'll sound like someone who's actually done it. Jumping straight to "I'd shard it" is the beginner tell.`,
          diagram: "sd19Ladder",
          diagramCaption: "The order of fixes: effort grows a lot at each step, and sharding is last."
        },
        {
          type: "concept",
          id: "sd-20",
          title: "Interview question",
          body: [
            `"Your database is at 100% CPU and users are complaining the site is slow. What do you do?"`,
            `A good answer:`,
            `"First I'd look at what's actually consuming the CPU, because the fix depends on the shape of the load. Is it reads or writes, and is it a few slow queries or a flood of fast ones?`,
            `If it's a handful of slow queries, the cheapest fix is almost always a missing index — that can take a query from seconds to milliseconds with no architecture change at all.`,
            `If it's a flood of reads for the same data, I'd add a cache in front, using cache-aside with Redis. That typically removes 90% or more of the read traffic.`,
            `If reads are still too heavy after that, read replicas — copies of the database that serve reads only, while all writes continue to go to the leader. I'd have to handle replication lag: right after someone writes something, their own reads go to the leader for a few seconds so they don't see their change disappear.`,
            `Sharding is where I'd go last, and only for one of two specific reasons: the data no longer fits on one machine, or write volume has outgrown a single leader. It's the only fix on this list that's genuinely hard to undo, so I'd want to be sure the cheaper three didn't solve it first."`
          ],
          diagram: "sd20Interview",
          diagramCaption: "The decision flow: check the load shape first, then index, cache, replicas, and shard only as a last resort."
        },
        {
          type: "list",
          id: "sd-21",
          title: "Replication aur Sharding — key takeaway",
          points: [
            "Replication ka matlab: ek hi data ki kai copies. Leader par saari writes jati hain, followers sirf reads sambhalte hain aur leader mar jaye to koi follower naya leader ban jata hai.",
            "Copy hone mein thora waqt lagta hai (replication lag), isliye banda apna hi naya comment gayab dekh sakta hai — is liye us bande ki reads thori der ke liye leader se karwao.",
            "Sharding ka matlab: alag alag data alag alag machines par. Har machine ek hissa rakhti hai, jaise user 1 se 1000 pehli machine par.",
            "Tarteeb yaad rakho: pehle index, phir cache, phir read replicas, aur sharding sabse aakhir mein — kyunki sharding wapas undo karna bohot mushkil hai."
          ],
          diagram: "sd21Takeaway",
          diagramCaption: "The four ideas of Topic 4, recapped in one strip."
        },
        {
          type: "code",
          id: "sd-22",
          title: "What is a JOIN?",
          code: `SELECT * FROM users JOIN orders ON users.id = orders.user_id;`,
          note: [
            `Suppose you have two tables.`,
            `Users table: User ID/Name → 1 Ali, 2 Ahmed`,
            `Orders table: Order ID/User ID/Product → 101/1/Laptop, 102/2/Phone`,
            `You ask the database: Show me Ali and his orders. The database combines both tables.`,
            `Result: Name/Product → Ali/Laptop, Ahmed/Phone`,
            `JOIN = combine data from multiple tables.`
          ],
          diagram: "sd22Join",
          diagramCaption: "Users and Orders linked by id 1↔1 and 2↔2, converging into the result: Ali/Laptop, Ahmed/Phone."
        },
        {
          type: "concept",
          id: "sd-23",
          title: "What is an index?",
          body: [
            `Without an index: suppose you have 1 million users. You search for Find user: Ibrahim. The database checks every row, User 1, User 2, ... User 999,999, User 1,000,000 — found. This is called a full table scan. The database checks every row. Very slow.`,
            `With an index: Ibrahim → Row 1,000,000. The database immediately jumps to the correct row. Very fast.`,
            `Think of an index like this: a book without an index — you read the entire book to find "Docker." A book with an index — Docker → Page 247, jump directly to page 247.`
          ],
          diagram: "sd23Index",
          diagramCaption: "Left: without an index, every row is checked one by one. Right: with an index, the database jumps straight to the row — like a book's index jumping to page 247."
        }
      ]
    }
  ]
};
