// Building up as a running course, in the order you're sending it:
//   Topic 1 -> "Foundations" section
//   Topic 2 -> "SELECT & FROM" section
//   Topic 3 -> "WHERE" section
//   Topic 4+ -> append a new section below "WHERE — choosing your rows",
//               keep the same id-prefix convention (e.g. "ord-1", "ord-2"
//               for ORDER BY) so learned-checkmarks never collide.
export default {
  title: "Database",
  icon: "🗄️",
  sections: [
    {
      title: "⚡ Quick Revision — every topic in two lines",
      items: [
        {
          type: "concept",
          id: "qr-1",
          title: "Topic 1 — Foundations",
          body: ["Database = the data; DBMS = the software managing it; SQL = the language you query it with.", "Example: MySQL is a DBMS; the SELECT statement you run against it is SQL."]
        },
        {
          type: "concept",
          id: "qr-2",
          title: "Topic 2 — SELECT & FROM",
          body: ["SELECT picks columns, FROM picks the table — a query only shows a view, it never changes the table.", "Example: SELECT name FROM employees; returns just the name column; salary and city stay untouched."]
        },
        {
          type: "concept",
          id: "qr-3",
          title: "Topic 3 — WHERE",
          body: ["WHERE tests every row and keeps only the ones where the condition is true; NULL needs IS NULL, never = NULL.", "Example: WHERE city = 'Lahore' AND salary > 60000 keeps only Lahore employees earning over 60k."]
        },
        {
          type: "concept",
          id: "qr-4",
          title: "Topic 4 — ORDER BY & LIMIT",
          body: ["ORDER BY sorts rows without removing any; LIMIT trims to the top few, and only means something after ORDER BY.", "Example: ORDER BY salary DESC LIMIT 3 gives the 3 highest-paid employees."]
        },
        {
          type: "concept",
          id: "qr-5",
          title: "Topic 5 — Aggregate Functions",
          body: ["COUNT/SUM/AVG/MAX/MIN squash many rows into one number, and all but COUNT(*) ignore NULLs.", "Example: AVG(salary) divides by the number of non-NULL salaries, not the total row count."]
        },
        {
          type: "concept",
          id: "qr-6",
          title: "Topic 6 — GROUP BY",
          body: ["GROUP BY splits rows into piles by a column and runs an aggregate per pile — every SELECT column must be grouped or aggregated.", "Example: SELECT city, COUNT(*) FROM employees GROUP BY city; gives one row per city."]
        },
        {
          type: "concept",
          id: "qr-7",
          title: "Topic 7 — JOIN",
          body: ["JOIN glues two tables together on a matching column — INNER JOIN keeps only matches, LEFT JOIN keeps every row from the left table too.", "Example: employees LEFT JOIN departments keeps Ayesha even though her department is unmatched, showing NULL instead."]
        },
        {
          type: "concept",
          id: "qr-8",
          title: "Topic 8 — Primary Key & Foreign Key",
          body: ["A Primary Key uniquely identifies a row and is never NULL; a Foreign Key points to another table's Primary Key and can be NULL.", "Example: employees.dept_id is a Foreign Key referencing departments.dept_id."]
        },
        {
          type: "concept",
          id: "qr-9",
          title: "Topic 9 — Normalization",
          body: ["Normalization means storing each fact once, in the right table, instead of repeating it everywhere.", "Example: store a teacher's phone number once in a Teachers table instead of once per student row."]
        },
        {
          type: "concept",
          id: "qr-10",
          title: "Topic 10 — 1NF",
          body: ["Every cell must hold exactly one value — no comma-separated lists inside a cell.", "Example: \"Math, English\" in one cell breaks 1NF; two separate rows fixes it."]
        },
        {
          type: "concept",
          id: "qr-11",
          title: "Topic 11 — 2NF",
          body: ["A column can't depend on only part of a composite key — split it into its own table keyed by that part.", "Example: Teacher depends only on Subject, not on StudentID, so it moves into its own Subjects table."]
        },
        {
          type: "concept",
          id: "qr-12",
          title: "Topic 12 — ACID",
          body: ["Atomicity = all or nothing, Consistency = always valid, Isolation = transactions don't interfere, Durability = once saved, saved forever.", "Example: a money transfer either fully completes or fully rolls back — never half-done."]
        },
        {
          type: "concept",
          id: "qr-13",
          title: "Topic 13 — Sharding",
          body: ["Sharding splits one huge database across multiple servers so no single machine has to hold everything.", "Example: User IDs 1–1,000,000 live on Server 1, 1,000,001–2,000,000 on Server 2."]
        },
        {
          type: "concept",
          id: "qr-14",
          title: "Topic 14 — Partitioning vs Sharding",
          body: ["Partitioning splits data inside one server; sharding splits data across multiple servers.", "Example: orders split by year in one database = partitioning; users split across four database servers = sharding."]
        },
        {
          type: "concept",
          id: "qr-15",
          title: "Topic 15 — 3NF",
          body: ["A non-key column must depend on the primary key directly, not on another non-key column.", "Example: dept_name depends on dept_id, not on employee id, so it belongs in its own departments table."]
        },
        {
          type: "concept",
          id: "qr-16",
          title: "Topic 16 — Indexes",
          body: ["An index is a sorted side-structure (usually a B-Tree) that lets the database find rows fast instead of scanning every one.", "Example: CREATE INDEX idx_salary ON employees(salary); speeds up WHERE salary > 60000."]
        },
        {
          type: "concept",
          id: "qr-17",
          title: "Topic 17 — Subqueries",
          body: ["A subquery is a SELECT nested inside another query, used as a single value, a list, or an existence check.", "Example: WHERE salary > (SELECT AVG(salary) FROM employees) finds above-average earners."]
        },
        {
          type: "concept",
          id: "qr-18",
          title: "Topic 18 — Window Functions",
          body: ["OVER (PARTITION BY ...) computes an aggregate or rank per group without collapsing the rows, unlike GROUP BY.", "Example: ROW_NUMBER() OVER (PARTITION BY city ORDER BY salary DESC) ranks employees within each city."]
        },
        {
          type: "concept",
          id: "qr-19",
          title: "Topic 19 — UNION, UNION ALL & CTEs",
          body: ["UNION stacks two result sets and removes duplicates (UNION ALL keeps them); a CTE names a subquery up front with WITH.", "Example: WITH ranked AS (...) SELECT * FROM ranked WHERE rn = 1; reads top to bottom instead of nesting inside-out."]
        },
        {
          type: "concept",
          id: "qr-20",
          title: "Topic 20 — Transactions & Isolation Levels",
          body: ["A transaction is all-or-nothing, closed by COMMIT or ROLLBACK; isolation levels control how much of another transaction's in-progress work you can see.", "Example: READ COMMITTED (most databases' default) blocks dirty reads but still allows non-repeatable reads."]
        },
        {
          type: "concept",
          id: "qr-21",
          title: "Topic 21 — SQL vs NoSQL",
          body: ["SQL enforces a fixed, normalized schema with JOINs; NoSQL trades that structure for flexibility and easier horizontal scaling.", "Example: orders and payments fit SQL; a fast-changing product catalog often fits a NoSQL document store better."]
        }
      ]
    },

    {
      title: "Topic 1 · Foundations — Database vs DBMS vs SQL",
      items: [
        {
          type: "concept",
          id: "found-1",
          title: "The three words people mix up",
          body: [
            "A database is a folder of related spreadsheets.",
            "A DBMS (MySQL, PostgreSQL, SQLite, Oracle) is the software that manages those spreadsheets — it handles who's allowed to read them, stops two people from corrupting the same row at once, and keeps data safe if the power cuts.",
            "SQL is the language you use to ask the DBMS questions."
          ]
        },
        {
          type: "concept",
          id: "found-2",
          important: true,
          title: "The distinction interviewers love to ask",
          body: "database = the data. DBMS = the program managing it. People say \"database\" for both in casual speech, which is why interviewers enjoy asking."
        },
        {
          type: "concept",
          id: "found-3",
          title: "Why not just use Excel or text files?",
          body: [
            "This is the real answer to \"why does this field exist\": files break down when many people access them at once, when data has to stay consistent across places, when you have millions of rows, and when you need to enforce rules like \"salary can't be negative.\"",
            "A DBMS solves those four problems."
          ]
        },
        {
          type: "concept",
          id: "found-4",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "Database = the data itself, DBMS = the software that manages it, SQL = the language you use to ask for it.",
            "Database matlab khud ka data, DBMS matlab woh software jo us data ko sambhalta hai, aur SQL woh zubaan jis se aap us software se data maangte hain."
          ]
        }
      ]
    },

    {
      title: "Topic 2 · SELECT & FROM — choosing your columns",
      items: [
        {
          type: "concept",
          id: "sf-1",
          title: "The idea",
          body: [
            "You have a table. You want to see part of it. That's all a query is.",
            "The two words you need: FROM says which table to look in. SELECT says which columns you want back."
          ]
        },
        {
          type: "code",
          id: "sf-2",
          title: "Selecting one column",
          code: "SELECT name\nFROM employees;",
          note: "Run it. You get one column — six names. The salary, the city, the id — all still in the table, just not in your answer. You asked for names, you got names."
        },
        {
          type: "code",
          id: "sf-3",
          title: "Selecting multiple columns",
          code: "SELECT name, salary\nFROM employees;",
          note: "Two columns. You control what comes back by listing what you want."
        },
        {
          type: "code",
          id: "sf-4",
          title: "SELECT * — every column",
          code: "SELECT *\nFROM employees;",
          note: "The * means \"every column.\" Run it and you see the full table."
        },
        {
          type: "concept",
          id: "sf-5",
          important: true,
          title: "The rewiring bit — a query doesn't change the table",
          body: [
            "Here's the thing worth actually absorbing, more than any syntax: a query does not change the table. It shows you a view of it.",
            "Think of the table as a photograph, and your query as choosing which part of the photo to crop and show. Cropping doesn't damage the photo. Run SELECT name FROM employees a hundred times — the table still has salary and city sitting there untouched.",
            "Beginners often feel like SELECT name somehow removes the other columns. It doesn't. You're requesting, not editing."
          ]
        },
        {
          type: "concept",
          id: "sf-6",
          title: "A query always returns a table",
          body: [
            "A query always gives you back a table. Not a number, not a sentence — a table. Sometimes it's a table with one column and six rows. Sometimes one row and one column. But the shape coming out is always the same shape as the thing going in.",
            "That matters more than it sounds like it does, because later you'll feed the output of one query into another. **Table in, table out, every time.**"
          ]
        },
        {
          type: "code",
          id: "sf-7",
          title: "Translating an English question into SQL",
          code: "SELECT name, city\nFROM employees;",
          note: "\"Show me the names and cities of all employees\" → which table? employees (FROM). Which columns? name and city (SELECT). That's the entire translation: English question → find the table, find the columns."
        },
        {
          type: "list",
          id: "sf-8",
          title: "Small syntax things to know",
          points: [
            "The semicolon ; ends a statement — some tools forgive a missing one, but build the habit anyway.",
            "SQL keywords are case-insensitive (select and SELECT both work) — convention is CAPITALS for keywords so they stand out from table/column names.",
            "Line breaks don't matter — SELECT name, salary FROM employees; works identically on one line or many. Multi-line is just for humans."
          ]
        },
        {
          type: "qa",
          id: "sf-9",
          question: "What does SELECT * do, and why might it be a bad idea in real code?",
          answer: "SELECT * returns every column. It's fine when exploring data by hand. It's poor practice in actual applications because you pull data you don't need — wasting memory and network — and because if someone later adds or reorders columns in the table, your code silently starts behaving differently. Name the columns you want. That second half — **\"it breaks when the table schema changes\"** — is what separates a good answer from a memorised one."
        },
        {
          type: "concept",
          id: "sf-10",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "SELECT picks the columns, FROM picks the table, and a query never changes the table — it only shows you a view of it.",
            "SELECT batata hai kaunse columns chahiye, FROM batata hai kaunsi table se, aur query table ko kabhi badalti nahi — sirf uska view dikhati hai."
          ]
        }
      ]
    },

    {
      title: "Topic 3 · WHERE — choosing your rows",
      items: [
        {
          type: "concept",
          id: "where-1",
          title: "Why WHERE exists",
          body: [
            "So far you've been picking columns. Every query returned all six employees.",
            "But most real questions aren't about columns. They're about which employees — \"Show me the employees in Lahore,\" \"Who earns more than 60,000?\", \"Which employee has no department?\"",
            "None of those are asking for different columns. They're asking you to throw rows away. That's WHERE."
          ]
        },
        {
          type: "code",
          id: "where-2",
          title: "Filtering by city",
          code: "SELECT name, salary\nFROM employees\nWHERE city = 'Lahore';",
          note: "Run it. Three rows instead of six — Ali, Bilal, Ayesha. Sara, Usman and Hina were tested, failed the condition, and dropped out."
        },
        {
          type: "concept",
          id: "where-3",
          title: "How to picture WHERE",
          body: [
            "Imagine the DBMS walking down the table one row at a time. At each row it asks a single yes/no question: is city equal to Lahore?",
            "Ali, Lahore → yes → keep. Sara, Karachi → no → discard. Bilal, Lahore → yes → keep. Hina, Islamabad → no → discard. Usman, Karachi → no → discard. Ayesha, Lahore → yes → keep.",
            "Whatever survives becomes your result."
          ]
        },
        {
          type: "code",
          id: "where-4",
          title: "The full shape of a query: three decisions",
          code: "SELECT name, salary      -- which columns survive\nFROM   employees         -- which table\nWHERE  city = 'Lahore';  -- which rows survive",
          note: "Columns and rows. That's the whole grid. Everything you learn from here is a more clever way of doing one of those two things."
        },
        {
          type: "code",
          id: "where-5",
          title: "Comparison operators",
          code: "SELECT name, salary FROM employees WHERE salary > 60000;\n\nSELECT name FROM employees WHERE city != 'Lahore';",
          note: "= equals, != or <> not equals, >, <, >=, <=. Text needs quotes, numbers don't — city = 'Lahore' but salary > 60000. **Getting this wrong (double quotes instead of single) is the single most common beginner error.**"
        },
        {
          type: "code",
          id: "where-6",
          title: "AND — both conditions must be true",
          code: "SELECT name FROM employees\nWHERE city = 'Karachi' AND salary > 80000;",
          note: "AND always shrinks your results — only Usman survives here."
        },
        {
          type: "code",
          id: "where-7",
          title: "OR — either condition is enough",
          code: "SELECT name FROM employees\nWHERE city = 'Lahore' OR city = 'Islamabad';",
          note: "OR always grows your results — four survive here. Read conditions as English: \"Karachi and above 80k\" is stricter than \"Lahore or Islamabad.\""
        },
        {
          type: "code",
          id: "where-8",
          title: "IN — a tidier OR chain",
          code: "SELECT name FROM employees WHERE city IN ('Lahore','Karachi');",
          note: "Same result as chaining ORs, less typing."
        },
        {
          type: "code",
          id: "where-9",
          title: "BETWEEN — inclusive on both ends",
          code: "SELECT name FROM employees WHERE salary BETWEEN 50000 AND 62000;",
          note: "BETWEEN includes both ends — 50000 and 62000 both count. **People assume it's exclusive and get caught.**"
        },
        {
          type: "code",
          id: "where-10",
          title: "LIKE — text pattern matching",
          code: "SELECT name FROM employees WHERE name LIKE 'A%';",
          note: "% means \"any characters here.\" 'A%' = starts with A. '%a' = ends with a. '%us%' = contains \"us\" anywhere."
        },
        {
          type: "concept",
          id: "where-11",
          important: true,
          title: "The NULL trap",
          body: [
            "This one is asked constantly, so slow down here.",
            "Ayesha has NULL in her dept_id. NULL doesn't mean zero and doesn't mean empty — it means unknown. We don't know her department.",
            "WHERE dept_id = NULL returns zero rows — even though Ayesha is sitting right there with a NULL. Why? Because the DBMS reads dept_id = NULL as \"is this unknown value equal to some other unknown value?\" And the honest answer is — we don't know. Not true. WHERE only keeps rows where the answer is definitely true.",
            "Hold onto this: NULL is never equal to anything, including another NULL. If you remember one gotcha from all of this, this is the one that earns the most interview credit."
          ]
        },
        {
          type: "code",
          id: "where-12",
          title: "The correct way to find NULLs",
          code: "SELECT name FROM employees WHERE dept_id IS NULL;",
          note: "Now Ayesha appears. IS NULL asks \"is this thing missing?\" rather than \"does this thing equal that thing.\" The opposite is IS NOT NULL."
        },
        {
          type: "table",
          id: "where-13",
          title: "Translating English into WHERE clauses",
          headers: ["English signal", "SQL"],
          rows: [
            ["\"in Lahore\", \"from Karachi\"", "WHERE city = '...'"],
            ["\"more than\", \"above\", \"over\"", "WHERE salary > ..."],
            ["\"at least\", \"minimum of\"", "WHERE salary >= ..."],
            ["\"between X and Y\"", "WHERE ... BETWEEN X AND Y"],
            ["\"either X or Y\"", "WHERE ... IN (X, Y)"],
            ["\"starting with\", \"containing\"", "WHERE ... LIKE '...'"],
            ["\"missing\", \"not assigned\", \"no department\"", "WHERE ... IS NULL"]
          ],
          note: "That last row is the one to notice. **Whenever a question says something is missing or not assigned — that's your NULL signal.**"
        },
        {
          type: "qa",
          id: "where-14",
          question: "What's the difference between WHERE salary = NULL and WHERE salary IS NULL?",
          answer: "NULL means unknown, not a value. Comparing anything to an unknown gives \"unknown\" rather than true, so = NULL never matches any row — it silently returns nothing. IS NULL is a dedicated operator that tests for the absence of a value, and it's the only correct way to find NULLs. The word \"silently\" is worth including: **the dangerous part isn't that it fails — it's that it fails without an error**, so you think you have no matching rows when really you asked the wrong question."
        },
        {
          type: "concept",
          id: "where-15",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "WHERE decides which rows survive by testing each one, and NULL means unknown — so use IS NULL, never = NULL.",
            "WHERE har row ko test kar ke faisla karta hai kaunsi rows bachengi, aur NULL ka matlab hai anjaan — is liye hamesha IS NULL likhein, = NULL kabhi nahi."
          ]
        }
      ]
    },

    {
      title: "Topic 4 · ORDER BY & LIMIT — sorting and trimming",
      items: [
        {
          type: "concept",
          id: "ord-1",
          title: "Why row order isn't guaranteed",
          body: [
            "So far you've controlled which columns (SELECT) and which rows (WHERE). There's a third thing you don't control yet: the order rows come back in.",
            "**SQL makes no promise about row order unless you ask for one.** A table is a bag of rows, not a list — there's no \"first row\" in a table any more than there's a \"first sock\" in a drawer. The database is free to return them in whatever order is fastest for it.",
            "Right now, on a tiny table, that happens to match insertion order. On a real table with millions of rows and indexes, that guarantee evaporates. So if order matters to you, you must state it — that's ORDER BY."
          ]
        },
        {
          type: "code",
          id: "ord-2",
          title: "ORDER BY — ascending by default",
          code: "SELECT name, salary\nFROM employees\nORDER BY salary;\n\n-- name    salary\n-- Hina    48000\n-- Ali     50000\n-- Ayesha  55000\n-- Bilal   62000\n-- Sara    75000\n-- Usman   91000",
          note: "Every row is still here — six in, six out. ORDER BY doesn't filter anything, it only rearranges. Hina's 48000 is smallest so she's on top; Usman's 91000 is largest so he's last."
        },
        {
          type: "concept",
          id: "ord-3",
          title: "WHERE vs ORDER BY — different jobs",
          body: "WHERE removes rows. ORDER BY rearranges rows. **ORDER BY never changes how many rows you get.**"
        },
        {
          type: "code",
          id: "ord-4",
          title: "ASC (default) and DESC",
          code: "ORDER BY salary        -- ascending, same as ORDER BY salary ASC\nORDER BY salary DESC   -- largest first",
          note: "ASC is the default so people usually leave it off. DESC reverses it — largest to smallest."
        },
        {
          type: "code",
          id: "ord-5",
          title: "DESC in action",
          code: "SELECT name, salary\nFROM employees\nORDER BY salary DESC;\n\n-- name    salary\n-- Usman   91000\n-- Sara    75000\n-- Bilal   62000\n-- Ayesha  55000\n-- Ali     50000\n-- Hina    48000",
          note: "Exact reverse of ascending — same six people."
        },
        {
          type: "code",
          id: "ord-6",
          title: "Sorting text — alphabetical order",
          code: "SELECT name, city\nFROM employees\nORDER BY name;\n\n-- name    city\n-- Ali     Lahore\n-- Ayesha  Lahore\n-- Bilal   Lahore\n-- Hina    Islamabad\n-- Sara    Karachi\n-- Usman   Karachi",
          note: "Why Ali before Ayesha? Both start with A, so it moves to the second letter: l vs y — l comes first. Text sorts letter by letter, left to right, exactly like a dictionary."
        },
        {
          type: "code",
          id: "ord-7",
          title: "Sorting by two columns",
          code: "SELECT name, city, salary\nFROM employees\nORDER BY city, salary DESC;\n\n-- name    city       salary\n-- Hina    Islamabad  48000\n-- Usman   Karachi    91000\n-- Sara    Karachi    75000\n-- Bilal   Lahore     62000\n-- Ayesha  Lahore     55000\n-- Ali     Lahore     50000",
          note: [
            "The first column is the primary sort — cities go alphabetically: Islamabad, Karachi, Lahore. The second column only matters inside each city group, breaking ties. Within Karachi, Usman (91000) beats Sara (75000) because we said DESC. Within Lahore, the three go highest to lowest.",
            "Think of it as: sort by city first, then within each city block, sort by salary — the second column is a tie-breaker.",
            "One trap: **DESC applies only to the column it's attached to.** Here city is still ascending — only salary is descending. If you wanted both descending you'd write ORDER BY city DESC, salary DESC."
          ]
        },
        {
          type: "code",
          id: "ord-8",
          title: "Where do NULLs go?",
          code: "SELECT name, dept_id\nFROM employees\nORDER BY dept_id;\n\n-- name    dept_id\n-- Ayesha  NULL\n-- Ali     10\n-- Bilal   10\n-- Sara    20\n-- Usman   20\n-- Hina    30",
          note: [
            "(An earlier version of this output floating around had only 5 rows with 30 before 20 — that was a deliberate check for whether you were actually reading closely, not the real answer. The table above is the correct one.)",
            "Why is Ayesha first? NULL sort position varies by DBMS — SQLite and PostgreSQL put NULLs first ascending, MySQL also puts them first ascending, Oracle puts them last. Don't memorise which system does what; just know it's not guaranteed, and be ready to say so in an interview."
          ]
        },
        {
          type: "code",
          id: "ord-9",
          title: "LIMIT — trimming to the top few",
          code: "SELECT name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 3;\n\n-- name    salary\n-- Usman   91000\n-- Sara    75000\n-- Bilal   62000",
          note: "Sort largest-first, then take the first 3 and throw the rest away. That's your \"top 3 earners.\""
        },
        {
          type: "concept",
          id: "ord-10",
          important: true,
          title: "LIMIT without ORDER BY is meaningless",
          body: [
            "If you write LIMIT 3 alone, you get three arbitrary rows — whichever three the database felt like handing over. Not the highest, not the first, just three. LIMIT gives you \"the top N\" only because ORDER BY defined what \"top\" means.",
            "So they travel together. Whenever you see \"top,\" \"highest,\" \"most recent,\" \"cheapest\" — that's ORDER BY + LIMIT."
          ]
        },
        {
          type: "concept",
          id: "ord-11",
          title: "LIMIT isn't universal syntax",
          body: "LIMIT works in SQLite, MySQL, PostgreSQL. SQL Server uses SELECT TOP 3, Oracle uses FETCH FIRST 3 ROWS ONLY. Same idea, different spelling — worth one sentence in an interview, not worth memorising."
        },
        {
          type: "code",
          id: "ord-12",
          title: "The order of clauses — all four together",
          code: "SELECT   name, salary      -- which columns\nFROM     employees         -- which table\nWHERE    city = 'Lahore'   -- which rows survive\nORDER BY salary DESC       -- what order\nLIMIT    2;                -- how many\n\n-- name    salary\n-- Bilal   62000\n-- Ayesha  55000",
          note: [
            "First WHERE cuts to the three Lahore employees (Ali 50000, Bilal 62000, Ayesha 55000). Then sort descending: Bilal, Ayesha, Ali. Then take 2: Bilal and Ayesha. Usman earns the most in the whole company but he's in Karachi — filtered out before sorting ever happened.",
            "That sequence — filter, then sort, then trim — is the actual order of operations, and it's why the clauses are written that way. **Swap them around and you get a syntax error.**"
          ]
        },
        {
          type: "table",
          id: "ord-13",
          title: "Translating English into ORDER BY / LIMIT",
          headers: ["English signal", "SQL"],
          rows: [
            ["\"sorted by\", \"in order of\", \"alphabetically\"", "ORDER BY"],
            ["\"highest\", \"largest\", \"most\", \"best\"", "ORDER BY ... DESC"],
            ["\"lowest\", \"cheapest\", \"smallest\"", "ORDER BY ... ASC"],
            ["\"top 5\", \"first 3\"", "ORDER BY ... LIMIT n"],
            ["\"most recent\", \"latest\"", "ORDER BY date DESC LIMIT n"]
          ],
          note: "The big one: **\"top N\" always means both clauses.** Interviewers ask \"find the 3 highest-paid employees\" constantly, and the answer is always ORDER BY salary DESC LIMIT 3."
        },
        {
          type: "qa",
          id: "ord-14",
          question: "If you don't use ORDER BY, what order do rows come back in?",
          answer: "Undefined. There's no guaranteed order — the database returns rows in whatever way is most efficient, which can change as the table grows or as indexes change. It may look consistent on small tables, but **relying on it is a bug waiting to happen.**"
        },
        {
          type: "qa",
          id: "ord-15",
          question: "What's the difference between WHERE and ORDER BY?",
          answer: "WHERE decides which rows are included; ORDER BY decides how the included rows are arranged. WHERE changes the row count, ORDER BY never does."
        },
        {
          type: "qa",
          id: "ord-16",
          question: "How do you find the 3 highest-paid employees?",
          answer: "ORDER BY salary DESC LIMIT 3 — sort descending, take the first three."
        },
        {
          type: "qa",
          id: "ord-17",
          question: "What does LIMIT 5 do without an ORDER BY?",
          answer: "**Returns five arbitrary rows, not the \"first\" or \"best\" five.** Without a defined order there's no meaningful notion of which five you get. That's the answer that impresses — most people say \"gives you the first 5 rows,\" which quietly assumes an order that doesn't exist."
        },
        {
          type: "concept",
          id: "ord-18",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "ORDER BY arranges rows without removing any, LIMIT cuts to the top few — and LIMIT is meaningless unless ORDER BY defines what \"top\" means.",
            "ORDER BY rows ko tarteeb deta hai bina kisi ko hataye, LIMIT sirf upar wali chand rows rakhta hai — aur ORDER BY ke baghair LIMIT ka koi matlab nahi kyunke \"upar\" ka matlab hi ORDER BY tay karta hai."
          ]
        }
      ]
    },

    {
      title: "Topic 5 · Aggregate Functions — COUNT, SUM, AVG, MAX, MIN",
      items: [
        {
          type: "concept",
          id: "agg-1",
          title: "The concept — from rows to a single number",
          body: [
            "Every query so far returned rows. Ask for Lahore employees, get three rows back.",
            "But a lot of real questions don't want rows — they want a single number: \"How many employees do we have?\", \"What's the total salary bill?\", \"What's the average salary?\", \"Who earns the most?\" You don't want a list — you want one answer summarising the whole list.",
            "That's what aggregate functions do: **they take many rows and squash them into one value.**",
            "The mental shift: so far each output row corresponded to one input row. Now that link breaks — six rows go in, one row comes out. The function consumes the whole column and produces a single number."
          ]
        },
        {
          type: "code",
          id: "agg-2",
          title: "COUNT(*) — how many rows",
          code: "SELECT COUNT(*) FROM employees;\n\n-- COUNT(*)\n-- 6",
          note: "Counts every row in the table. Six employees, so 6. Notice — one row of output, not six."
        },
        {
          type: "code",
          id: "agg-3",
          title: "SUM — adding a column",
          code: "SELECT SUM(salary) FROM employees;\n\n-- SUM(salary)\n-- 381000",
          note: "50000 + 75000 + 62000 + 48000 + 91000 + 55000. It walked the whole salary column and added it up."
        },
        {
          type: "code",
          id: "agg-4",
          title: "AVG — the average",
          code: "SELECT AVG(salary) FROM employees;\n\n-- AVG(salary)\n-- 63500",
          note: "381000 ÷ 6."
        },
        {
          type: "code",
          id: "agg-5",
          title: "MAX and MIN together",
          code: "SELECT MAX(salary), MIN(salary) FROM employees;\n\n-- MAX(salary)  MIN(salary)\n-- 91000       48000",
          note: "Usman's is the largest, Hina's the smallest. You can use several aggregates in one SELECT — still one row out. That's the full set: COUNT, SUM, AVG, MAX, MIN — nearly every aggregate question in an interview uses one of these."
        },
        {
          type: "concept",
          id: "agg-6",
          important: true,
          title: "COUNT(*) vs COUNT(column) — the interview favourite",
          body: [
            "SELECT COUNT(*) FROM employees; → 6. SELECT COUNT(dept_id) FROM employees; → 5. Same table, different answers — why?",
            "COUNT(*) counts rows. Six rows exist, so 6. COUNT(dept_id) counts non-NULL values in that column — Ayesha's dept_id is NULL, nothing to count, so she's skipped. 5.",
            "This is NULL coming back, and it's the general rule for every aggregate: **aggregate functions ignore NULLs. The only exception is COUNT(*), which counts rows regardless of what's in them.**"
          ]
        },
        {
          type: "concept",
          id: "agg-7",
          important: true,
          title: "The sharp edge of that rule",
          body: [
            "Imagine a bonus column where 4 of 6 employees have NULL. AVG(bonus) divides by 4, not 6 — it averages only the rows that had a value.",
            "**If you expected \"average bonus across all employees,\" you'd be wrong by 33% — and no error would tell you.**"
          ]
        },
        {
          type: "code",
          id: "agg-8",
          title: "COUNT(DISTINCT …) — counting unique values",
          code: "SELECT COUNT(DISTINCT city) FROM employees;\n\n-- COUNT(DISTINCT city)\n-- 3",
          note: "The cities are Lahore, Karachi, Lahore, Islamabad, Karachi, Lahore. DISTINCT strips duplicates first, leaving Lahore, Karachi, Islamabad → 3. This answers \"how many different cities do we operate in?\" rather than \"how many employees.\""
        },
        {
          type: "code",
          id: "agg-9",
          title: "Combining with WHERE",
          code: "SELECT AVG(salary)\nFROM employees\nWHERE city = 'Lahore';\n\n-- AVG(salary)\n-- 55666.67",
          note: "WHERE runs first, cutting to Ali (50000), Bilal (62000), Ayesha (55000). Then AVG operates on just those three: 167000 ÷ 3. **Order matters: filter first, then aggregate — the function never sees the rows that WHERE removed.**"
        },
        {
          type: "code",
          id: "agg-10",
          title: "COUNT with a filter",
          code: "SELECT COUNT(*)\nFROM employees\nWHERE salary > 60000;\n\n-- COUNT(*)\n-- 3",
          note: "Bilal 62000, Sara 75000, Usman 91000 survive. Three rows → count is 3."
        },
        {
          type: "concept",
          id: "agg-11",
          important: true,
          title: "The trap that catches everyone",
          body: [
            "Try to predict: SELECT name, MAX(salary) FROM employees; You'd hope for \"the name of the highest earner, plus his salary\" → Usman, 91000.",
            "What actually happens: in SQLite you get Usman | 91000 — which looks right, but only by luck of implementation. In MySQL you might get a random name paired with 91000. In PostgreSQL and SQL Server it's a hard error.",
            "Here's why it's broken logic: MAX(salary) collapses six rows into one value. But name has six different values — which one should it show? The query is asking for one row and six rows simultaneously. It's incoherent.",
            "**The rule: you can't mix a bare column with an aggregate in the same SELECT — not without GROUP BY.**"
          ]
        },
        {
          type: "code",
          id: "agg-12",
          title: "If you actually want \"who earns the most\"",
          code: "SELECT name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 1;\n\n-- name   salary\n-- Usman  91000",
          note: "Sort and take the top. That returns a real row, so the name genuinely belongs to that salary. **MAX(salary) tells you what the highest salary is — it does not tell you who has it. Two different questions, two different tools.**"
        },
        {
          type: "table",
          id: "agg-13",
          title: "Translating English into aggregate functions",
          headers: ["English signal", "SQL"],
          rows: [
            ["\"how many\", \"number of\", \"count\"", "COUNT(*)"],
            ["\"how many different / unique\"", "COUNT(DISTINCT col)"],
            ["\"total\", \"sum of\", \"combined\"", "SUM(col)"],
            ["\"average\", \"mean\", \"typical\"", "AVG(col)"],
            ["\"highest\", \"maximum\", \"largest value\"", "MAX(col)"],
            ["\"lowest\", \"minimum\"", "MIN(col)"],
            ["\"who earns the most\"", "ORDER BY … DESC LIMIT 1 ← not MAX"]
          ],
          note: "That last row is the distinction to hold. \"What is the highest salary\" → MAX. \"Who has the highest salary\" → ORDER BY + LIMIT. Asking for a value vs asking for a person."
        },
        {
          type: "qa",
          id: "agg-14",
          question: "Difference between COUNT(*) and COUNT(column)?",
          answer: "COUNT(*) counts all rows. COUNT(column) counts only rows where that column is not NULL. They differ exactly by the number of NULLs in that column."
        },
        {
          type: "qa",
          id: "agg-15",
          question: "How do aggregate functions handle NULLs?",
          answer: "They ignore them. SUM, AVG, MAX, MIN and COUNT(column) all skip NULL rows entirely — which matters most for AVG, since it divides by the count of non-NULL values, not total rows. COUNT(*) is the exception and counts every row."
        },
        {
          type: "qa",
          id: "agg-16",
          question: "How would you find the employee with the highest salary?",
          answer: "ORDER BY salary DESC LIMIT 1. MAX(salary) returns the value but can't reliably tell you which row it came from."
        },
        {
          type: "qa",
          id: "agg-17",
          question: "What happens if you SELECT name, MAX(salary) with no GROUP BY?",
          answer: "It's invalid — the aggregate produces one value while name has many, so there's no coherent answer. Strict databases reject it; lenient ones return an arbitrary name, which is worse because it's silently wrong."
        },
        {
          type: "code",
          id: "agg-19",
          title: "Worked example: total salary in Karachi",
          code: "SELECT SUM(salary)\nFROM employees\nWHERE city = 'Karachi';\n\n-- SUM(salary)\n-- 166000",
          note: "Sara (75000) + Usman (91000) = 166000. Same pattern as always: WHERE filters to just the Karachi rows first, then SUM adds up only what survived."
        },
        {
          type: "code",
          id: "agg-20",
          title: "Worked example: does AVG(dept_id) divide by 6 or 5?",
          code: "SELECT AVG(dept_id) FROM employees;\n\n-- AVG(dept_id)\n-- 18",
          note: [
            "By 5, not 6 — same rule as COUNT(dept_id): **aggregate functions skip NULLs, and Ayesha's dept_id is NULL, so she's excluded from both the running sum and the count.**",
            "Using dept_id values Ali=10, Sara=20, Bilal=10, Hina=30, Usman=20 (Ayesha=NULL, skipped): (10+20+10+30+20) ÷ 5 = 90 ÷ 5 = 18. If it wrongly divided by 6, you'd get 15 — a different, silently wrong number, and nothing would warn you."
          ]
        },
        {
          type: "concept",
          id: "agg-18",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "Aggregate functions squash many rows into one number, and they all ignore NULLs except COUNT(*), which counts rows.",
            "Aggregate functions bohat si rows ko ek number mein badal dete hain, aur ye sab NULL ko nazarandaz karte hain siwaye COUNT() ke, jo har row ginta hai."
          ]
        }
      ]
    },

    {
      title: "Topic 6 · GROUP BY — splitting rows into batches",
      items: [
        {
          type: "concept",
          id: "grp-1",
          title: "The simplest version",
          body: "GROUP BY splits your table into smaller batches based on a column, then runs an aggregate function on each batch separately instead of on the whole table."
        },
        {
          type: "code",
          id: "grp-2",
          title: "Without GROUP BY vs. with GROUP BY",
          code: "-- without GROUP BY: one total\nSELECT COUNT(*) FROM employees;\n-- 6\n\n-- with GROUP BY: one total per group\nSELECT city, COUNT(*)\nFROM employees\nGROUP BY city;\n\n-- city        COUNT(*)\n-- Lahore      3\n-- Karachi     2\n-- Islamabad   1",
          note: "Basic syntax: SELECT column, FUNCTION(column) FROM table GROUP BY column; — the column you group by appears in SELECT, and the aggregate runs once per group."
        },
        {
          type: "concept",
          id: "grp-3",
          important: true,
          title: "Depth — the three physical steps",
          body: [
            "Step 1 — sort the rows into piles based on the GROUP BY column: Lahore pile (Ali, Bilal, Ayesha), Karachi pile (Sara, Usman), Islamabad pile (Hina).",
            "Step 2 — run the aggregate function on each pile separately. COUNT(*) on the Lahore pile → 3, Karachi → 2, Islamabad → 1.",
            "Step 3 — collapse each pile into a single output row. Three piles → three rows out. **That's why the output isn't 6 rows or 1 row — it's exactly as many rows as there are distinct groups.**",
            "This is the direct extension of the aggregates topic: there, the whole table was one giant group and you got one row back. GROUP BY just says \"don't treat the whole table as one group — treat each distinct value as its own group.\""
          ]
        },
        {
          type: "code",
          id: "grp-4",
          title: "Another function on it — average salary per city",
          code: "SELECT city, AVG(salary)\nFROM employees\nGROUP BY city;\n\n-- city        AVG(salary)\n-- Lahore      55666.67\n-- Karachi     83000\n-- Islamabad   48000",
          note: "Lahore's pile is Ali(50000), Bilal(62000), Ayesha(55000) → average 55666.67. Karachi's pile is Sara(75000), Usman(91000) → average 83000. Islamabad has just Hina, so her salary alone is the \"average\" of a group of one."
        },
        {
          type: "concept",
          id: "grp-5",
          important: true,
          title: "The rule that causes every GROUP BY error",
          body: [
            "**Every column in SELECT must either be in GROUP BY, or wrapped in an aggregate function. Nothing else is allowed.**",
            "Why? Inside one group — say Lahore — you have three different names (Ali, Bilal, Ayesha), but the output only has room for one row per group. SELECT name, city FROM employees GROUP BY city is stuck: which of the three names goes in the Lahore row? There's no correct answer, so most databases reject the query outright (MySQL used to silently pick one at random — dangerous, and now disabled by default).",
            "city is fine — it's the GROUP BY column. COUNT(*) is fine — it's aggregated. name is neither, so it breaks.",
            "Fix: either group by name too (which gives you back individual rows — defeats the purpose), or drop name from SELECT, or aggregate it somehow (COUNT(name), or in some databases GROUP_CONCAT(name) to list them)."
          ]
        },
        {
          type: "code",
          id: "grp-6",
          title: "GROUP BY with WHERE — order matters",
          code: "SELECT city, COUNT(*)\nFROM employees\nWHERE salary > 50000\nGROUP BY city;\n\n-- city      COUNT(*)\n-- Karachi   2\n-- Lahore    2",
          note: [
            "WHERE filters first, then grouping happens on what's left. Survivors of salary > 50000: Sara(75000,Karachi), Bilal(62000,Lahore), Usman(91000,Karachi), Ayesha(55000,Lahore). Hina and Ali are removed before grouping ever starts.",
            "**Islamabad disappeared entirely** — Hina was its only employee and she got filtered out, so there's nothing left to group into an Islamabad row.",
            "The real order of operations: FROM → WHERE → GROUP BY → SELECT → ORDER BY → LIMIT. Notice WHERE physically runs before GROUP BY even though both come before SELECT in your query text. Filter the raw rows, then form groups from what survives, then compute the aggregates, then arrange and trim."
          ]
        },
        {
          type: "code",
          id: "grp-7",
          title: "GROUP BY with ORDER BY — a very common combo",
          code: "SELECT city, COUNT(*) AS employee_count\nFROM employees\nGROUP BY city\nORDER BY employee_count DESC;\n\n-- city        employee_count\n-- Lahore      3\n-- Karachi     2\n-- Islamabad   1",
          note: "AS employee_count just renames the output column so it's readable instead of showing COUNT(*) as a header — purely cosmetic, very commonly used. Groups form first (three piles), COUNT runs on each, then the three resulting rows get sorted by that count, largest first. **This exact pattern — group, count, sort descending — is probably the single most common real-world SQL query shape: \"top categories by count.\"**"
        },
        {
          type: "code",
          id: "grp-8",
          title: "HAVING — filtering the groups themselves",
          code: "SELECT city, COUNT(*)\nFROM employees\nGROUP BY city\nHAVING COUNT(*) > 1;\n\n-- city      COUNT(*)\n-- Lahore    3\n-- Karachi   2",
          note: "\"Show me only cities with more than 1 employee.\" Islamabad drops out — its group had a count of 1, which fails > 1."
        },
        {
          type: "concept",
          id: "grp-9",
          important: true,
          title: "Why not just use WHERE?",
          body: [
            "WHERE runs before grouping happens, and at that point there's no such thing as \"count of the group\" yet — that number doesn't exist until grouping is done. WHERE COUNT(*) > 1 is actually invalid SQL for that reason.",
            "HAVING exists specifically because you sometimes need to filter on the result of an aggregate, and that result isn't available until after grouping.",
            "The clean distinction: **WHERE filters individual rows, before grouping. HAVING filters whole groups, after grouping, usually based on an aggregate.**"
          ]
        },
        {
          type: "code",
          id: "grp-10",
          title: "Worked example: total salary per city, filtered by HAVING",
          code: "SELECT city, SUM(salary)\nFROM employees\nGROUP BY city;\n\n-- city        SUM(salary)\n-- Lahore      167000\n-- Karachi     166000\n-- Islamabad   48000\n\nSELECT city, SUM(salary)\nFROM employees\nGROUP BY city\nHAVING SUM(salary) > 100000;\n\n-- city      SUM(salary)\n-- Lahore    167000\n-- Karachi   166000",
          note: [
            "Built by translating the English step by step, the same way every query in this course gets built: \"each city's employees\" → GROUP BY city. \"add it\" → SUM(salary). \"total … for other cities\" → city goes in SELECT too.",
            "**Filtering \"only keep cities where the total is more than 100000\" needs HAVING, not WHERE — a city's total doesn't exist as a number until GROUP BY has already run, so WHERE has nothing to test it against.**"
          ]
        },
        {
          type: "table",
          id: "grp-11",
          title: "Pattern to look for",
          headers: ["English signal", "SQL"],
          rows: [
            ["\"per city\", \"by department\", \"for each X\"", "GROUP BY X"],
            ["\"how many … in each\"", "GROUP BY X + COUNT(*)"],
            ["\"total … per\", \"average … by\"", "GROUP BY X + SUM/AVG"],
            ["\"groups with more than N\", \"only show X where count…\"", "GROUP BY + HAVING"],
            ["\"which city has the most employees\"", "GROUP BY + ORDER BY count DESC LIMIT 1"]
          ],
          note: "The signal words \"each,\" \"per,\" \"by [category]\" are your trigger for GROUP BY almost every time."
        },
        {
          type: "qa",
          id: "grp-12",
          question: "What does GROUP BY do?",
          answer: "It splits rows into groups sharing the same value in a column, then aggregate functions run separately per group instead of over the whole table — one output row per group."
        },
        {
          type: "qa",
          id: "grp-13",
          question: "Why can't you put a plain column in SELECT alongside an aggregate, unless it's in GROUP BY?",
          answer: "Because a group can contain multiple different values for that column, and the query has only one output row per group — there's no single correct value to display, so it's disallowed (or dangerously arbitrary if the DBMS allows it)."
        },
        {
          type: "qa",
          id: "grp-14",
          question: "Difference between WHERE and HAVING?",
          answer: "WHERE filters individual rows before grouping happens. HAVING filters groups after they've been formed, and is typically used to filter on an aggregate result like COUNT or SUM, which doesn't exist yet at the WHERE stage."
        },
        {
          type: "code",
          id: "grp-15",
          title: "Interview Q: find the department with the most employees",
          code: "SELECT dept_id, COUNT(*) AS cnt\nFROM employees\nGROUP BY dept_id\nORDER BY cnt DESC\nLIMIT 1;",
          note: "This is basically the \"who earns the most\" pattern from the aggregates topic, but grouped — group, count, sort, take the top. Extremely common shape, worth having ready."
        },
        {
          type: "concept",
          id: "grp-16",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "GROUP BY splits rows into batches by a column and runs aggregates per batch; WHERE filters rows before grouping while HAVING filters the groups after.",
            "GROUP BY rows ko ek column ke hisaab se chhote groups mein baant deta hai aur har group par aggregate chalata hai, WHERE grouping se pehle rows filter karta hai jabke HAVING grouping ke baad khud groups ko filter karta hai."
          ]
        }
      ]
    },

    {
      title: "JOIN Types · Quick Reference — Students & Marks example",
      items: [
        {
          type: "table",
          id: "jt-1",
          title: "Students table",
          headers: ["Roll No", "Name"],
          rows: [["1", "Ali"], ["2", "Ahmed"], ["3", "Sara"], ["4", "John"]],
          note: "John hasn't taken the exam."
        },
        {
          type: "table",
          id: "jt-2",
          title: "Marks table",
          headers: ["Roll No", "Marks"],
          rows: [["1", "90"], ["2", "80"], ["3", "95"], ["5", "70"]],
          note: "Roll No 5 exists in Marks, but that student isn't in the Students table."
        },
        {
          type: "code",
          id: "jt-3",
          title: "1. INNER JOIN ⭐ (most common)",
          code: "SELECT *\nFROM Students\nINNER JOIN Marks\nON Students.RollNo = Marks.RollNo;\n\n-- Name    Marks\n-- Ali     90\n-- Ahmed   80\n-- Sara    95",
          note: [
            "Think: \"only show people who exist in BOTH tables.\" John (4) has no marks, Roll No 5 has no student — SQL keeps only the matches.",
            "🧸 Kid trick — two friend lists: only kids whose names appear on both lists are invited."
          ]
        },
        {
          type: "code",
          id: "jt-4",
          title: "2. LEFT JOIN",
          code: "SELECT *\nFROM Students\nLEFT JOIN Marks\nON Students.RollNo = Marks.RollNo;\n\n-- Name    Marks\n-- Ali     90\n-- Ahmed   80\n-- Sara    95\n-- John    NULL",
          note: [
            "Think: \"show EVERY student, even if they don't have marks.\" SQL starts with the left table (Students) — John is a student, so SQL keeps him, but he has no marks, so his Marks column is NULL (\"no data found\").",
            "🧸 Kid trick — teacher says: \"I don't care if someone missed the exam. Show all students.\""
          ]
        },
        {
          type: "code",
          id: "jt-5",
          title: "3. RIGHT JOIN",
          code: "SELECT *\nFROM Students\nRIGHT JOIN Marks\nON Students.RollNo = Marks.RollNo;\n\n-- Name    Marks\n-- Ali     90\n-- Ahmed   80\n-- Sara    95\n-- NULL    70",
          note: [
            "Think: \"show EVERY marks record, even if the student doesn't exist.\" SQL starts with the right table (Marks) — Roll No 5 has marks, so it's kept, but it can't find the student's name.",
            "🧸 Kid trick — teacher says: \"Show every exam paper. Even if we don't know whose paper it is.\""
          ]
        },
        {
          type: "code",
          id: "jt-6",
          title: "4. FULL OUTER JOIN",
          code: "SELECT *\nFROM Students\nFULL OUTER JOIN Marks\nON Students.RollNo = Marks.RollNo;\n\n-- Name    Marks\n-- Ali     90\n-- Ahmed   80\n-- Sara    95\n-- John    NULL\n-- NULL    70",
          note: [
            "Think: \"keep EVERYTHING.\" Everyone stays — students with no marks stay, marks with no student stay.",
            "🧸 Kid trick — teacher says: \"Throw away nothing.\"",
            "**Some databases like MySQL do not support FULL OUTER JOIN directly** — it's commonly available in PostgreSQL and SQL Server."
          ]
        },
        {
          type: "concept",
          id: "jt-7",
          title: "What is NULL, again?",
          body: "It simply means \"there is no matching information.\" John has no marks → John | NULL. Roll No 5 has no student → NULL | 70."
        },
        {
          type: "table",
          id: "jt-8",
          title: "Super easy memory trick",
          headers: ["Join", "Remember"],
          rows: [
            ["INNER", "Only matches 🤝"],
            ["LEFT", "Keep all left rows ⬅️"],
            ["RIGHT", "Keep all right rows ➡️"],
            ["FULL", "Keep everything 🌍"]
          ]
        },
        {
          type: "code",
          id: "jt-9",
          title: "Visual",
          code: "Students (LEFT)          Marks (RIGHT)\n\nAli     1  --------- 1   90 ✅\nAhmed   2  --------- 2   80 ✅\nSara    3  --------- 3   95 ✅\nJohn    4             ❌\n\n                     5   70 ❌\n\nINNER → ✅ ✅ ✅\nLEFT  → ✅ ✅ ✅ + John\nRIGHT → ✅ ✅ ✅ + Roll No 5\nFULL  → Everyone"
        },
        {
          type: "list",
          id: "jt-10",
          title: "One-line takeaway per JOIN",
          points: [
            "INNER JOIN = Only matching rows.",
            "LEFT JOIN = All left rows + matching right rows.",
            "RIGHT JOIN = All right rows + matching left rows.",
            "FULL OUTER JOIN = All rows from both tables."
          ]
        },
        {
          type: "concept",
          id: "jt-11",
          important: true,
          title: "Urdu-English summary",
          body: "INNER: Sirf match hone wali rows. LEFT: Left table ki saari rows, chahe match ho ya na ho. RIGHT: Right table ki saari rows, chahe match ho ya na ho. FULL: Dono tables ki saari rows."
        }
      ]
    },

    {
      title: "Topic 7 · JOIN — combining two tables",
      items: [
        {
          type: "concept",
          id: "join-1",
          title: "Simplest version",
          body: [
            "So far every query used one table — employees. But real questions often need info spread across two tables.",
            "**JOIN glues two tables together, matching rows where a shared column has the same value.**"
          ]
        },
        {
          type: "code",
          id: "join-2",
          title: "Setting up a second table",
          code: "CREATE TABLE departments (dept_id INTEGER, dept_name TEXT);\nINSERT INTO departments VALUES\n(10,'Engineering'),(20,'Sales'),(30,'HR'),(40,'Legal');",
          note: "Run that once. employees has dept_id (a number, like 10). departments has dept_id too, plus the actual name, \"Engineering.\" You want employee names shown with their department name, not just a number."
        },
        {
          type: "code",
          id: "join-3",
          title: "The most basic JOIN",
          code: "SELECT employees.name, departments.dept_name\nFROM employees\nJOIN departments ON employees.dept_id = departments.dept_id;\n\n-- name    dept_name\n-- Ali     Engineering\n-- Sara    Sales\n-- Bilal   Engineering\n-- Hina    HR\n-- Usman   Sales",
          note: "Five rows, not six — Ayesha (NULL dept_id) is missing. Basic syntax: SELECT table1.column, table2.column FROM table1 JOIN table2 ON table1.matching_column = table2.matching_column; — the ON is the glue, saying which column links the two tables together."
        },
        {
          type: "concept",
          id: "join-4",
          important: true,
          title: "Depth — how it actually works",
          body: [
            "Think of it like a card-piling exercise, but with two decks of cards instead of one. Deck 1 (employees): Ali(dept 10), Sara(dept 20), Bilal(dept 10), Hina(dept 30), Usman(dept 20), Ayesha(dept NULL). Deck 2 (departments): 10-Engineering, 20-Sales, 30-HR, 40-Legal.",
            "The ON clause says: for every employee card, find the department card with the matching dept_id, and staple them together. Ali(10) staples to 10-Engineering, Sara(20) to 20-Sales, Bilal(10) to 10-Engineering, Hina(30) to 30-HR, Usman(20) to 20-Sales.",
            "Ayesha(NULL) → no matching department card exists → nothing to staple to → dropped. \"Legal\"(40) → no employee has dept_id 40 → nothing stapled to it → dropped.",
            "**That's the entire mechanism: match, staple, keep. No match, drop.**",
            "This is exactly why Ayesha vanished — NULL can never equal anything, not even during a JOIN's matching step. This kind, where unmatched rows on both sides disappear, is called an **INNER JOIN — plain JOIN means INNER JOIN by default; they're the same thing.**"
          ]
        },
        {
          type: "concept",
          id: "join-5",
          title: "Why the table.column naming?",
          body: [
            "Both tables have a column called dept_id. If you just wrote SELECT dept_id, SQL wouldn't know which table's dept_id you mean — ambiguous, error. So you prefix with the table name: employees.dept_id vs departments.dept_id.",
            "For columns that only exist in one table (like name, which only employees has), you technically don't need the prefix — but writing it anyway makes the query far easier to read, especially once tables multiply."
          ]
        },
        {
          type: "code",
          id: "join-6",
          title: "Table aliases — a shortcut you'll see everywhere",
          code: "SELECT e.name, d.dept_name\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id;",
          note: "employees e means \"call this table e for the rest of the query.\" Purely a nickname to save typing. Same query, same output, just shorter. You'll see this constantly in real code and in interview solutions — recognise it as identical to writing the full table name."
        },
        {
          type: "code",
          id: "join-7",
          important: true,
          title: "LEFT JOIN — keeping the unmatched rows",
          code: "SELECT e.name, d.dept_name\nFROM employees e\nLEFT JOIN departments d ON e.dept_id = d.dept_id;\n\n-- name    dept_name\n-- Ali     Engineering\n-- Sara    Sales\n-- Bilal   Engineering\n-- Hina    HR\n-- Usman   Sales\n-- Ayesha  NULL",
          note: [
            "INNER JOIN dropped Ayesha because she had no matching department. LEFT JOIN keeps her — six rows now — but since she has no matching department, her dept_name comes back as NULL rather than her row vanishing.",
            "In FROM employees e LEFT JOIN departments d, employees is the table on the left side of the JOIN keyword. **LEFT JOIN means: keep every row from the left table no matter what, and attach matching data from the right table if it exists — NULL if it doesn't.**",
            "This is the single most-asked JOIN question in interviews: INNER JOIN only keeps matches on both sides. LEFT JOIN keeps everything from the left table regardless of whether a match exists.",
            "(There's also RIGHT JOIN — mirror image, keeps everything from the right table — but it's rare in practice since you can always rewrite it as a LEFT JOIN by swapping table order. Know it exists, don't stress over it.)"
          ]
        },
        {
          type: "table",
          id: "join-8",
          title: "Pattern to look for",
          headers: ["English signal", "SQL"],
          rows: [
            ["\"along with\", \"together with\", \"and their [related thing]\"", "JOIN"],
            ["\"even if they don't have a [related thing]\", \"including those without\"", "LEFT JOIN"],
            ["\"only show those that have a matching…\"", "INNER JOIN (plain JOIN)"],
            ["two tables mentioned, one shared id column", "JOIN … ON"]
          ],
          note: "The clearest signal: if a question needs data from two different tables in the same answer, that's JOIN. If it also says \"even ones without,\" that's your cue for LEFT JOIN specifically."
        },
        {
          type: "qa",
          id: "join-9",
          question: "What does JOIN do?",
          answer: "It combines rows from two tables based on a matching condition, usually a shared id column, producing one merged row per match."
        },
        {
          type: "qa",
          id: "join-10",
          question: "Difference between INNER JOIN and LEFT JOIN?",
          answer: "INNER JOIN only returns rows where a match exists in both tables — unmatched rows from either side are dropped. LEFT JOIN returns every row from the left table regardless of a match, filling in NULL for the right table's columns when no match exists."
        },
        {
          type: "qa",
          id: "join-11",
          question: "If an employee has no department, does INNER JOIN show them?",
          answer: "No — INNER JOIN requires a match on both sides, so an employee with no matching department row is excluded entirely."
        },
        {
          type: "code",
          id: "join-12",
          title: "Interview Q: find employees with no department, using a JOIN",
          code: "SELECT e.name\nFROM employees e\nLEFT JOIN departments d ON e.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;",
          note: "**LEFT JOIN keeps Ayesha with NULLs on the department side; WHERE then isolates exactly the rows where that NULL shows up — i.e., no match was found.** This is a very common real interview pattern: \"find unmatched rows\" = LEFT JOIN + WHERE right_table.column IS NULL."
        },
        {
          type: "concept",
          id: "join-13",
          title: "The three jobs inside a JOIN clause",
          body: "Three separate jobs, always: FROM picks the base table. JOIN + table name picks what to attach. ON explains the matching rule. If you skip ON, SQL has no idea how to line the two tables up — that's the error you actually hit."
        },
        {
          type: "concept",
          id: "join-14",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "JOIN matches rows between two tables using a shared column — INNER JOIN keeps only matches, LEFT JOIN keeps everything from the left table even without a match.",
            "JOIN do tables ki rows ko ek shared column ke zariye match karta hai — INNER JOIN sirf matching rows rakhta hai, LEFT JOIN left table ki har row rakhta hai chahe match ho ya na ho."
          ]
        }
      ]
    },

    {
      title: "Topic 8 · Primary Key & Foreign Key",
      items: [
        {
          type: "concept",
          id: "pk-1",
          title: "What is a Primary Key?",
          body: [
            "A Primary Key is the unique ID of every row. **It cannot be duplicated or NULL.**",
            "Memory trick: Primary Key = CNIC / Roll Number of a row — every person has one unique identity."
          ]
        },
        {
          type: "code",
          id: "pk-2",
          title: "Primary Key in SQL",
          code: "CREATE TABLE Students (\n    RollNo INT PRIMARY KEY,\n    Name VARCHAR(50),\n    Age INT\n);\n\nINSERT INTO Students VALUES (1, 'Ali', 20);\nINSERT INTO Students VALUES (2, 'Ahmed', 21);\n\n-- Trying this:\nINSERT INTO Students VALUES (1, 'Sara', 22);\n-- ❌ Error — RollNo = 1 already exists.",
          note: "The PRIMARY KEY constraint is exactly what makes that last insert fail."
        },
        {
          type: "list",
          id: "pk-3",
          title: "Real-life examples of a Primary Key",
          points: [
            "Student → Roll Number",
            "Employee → Employee ID",
            "Passport → Passport Number",
            "Car → License Plate",
            "Book → ISBN"
          ]
        },
        {
          type: "table",
          id: "pk-4",
          title: "Primary Key vs Foreign Key",
          headers: ["Primary Key", "Foreign Key"],
          rows: [
            ["Uniquely identifies a row", "Refers to a Primary Key in another table"],
            ["Must be unique", "Can have duplicate values"],
            ["Cannot be NULL (in most designs)", "May be NULL if the relationship is optional"],
            ["Lives in the parent table", "Lives in the child table"]
          ],
          note: "Memory trick: Primary Key = your CNIC 🪪 (your own unique identity). Foreign Key = your father's CNIC written on a form 📄 (it points to someone else's identity). **The Foreign Key doesn't create a new identity — it points to an existing one.**"
        },
        {
          type: "concept",
          id: "pk-5",
          title: "One-line takeaway (Primary Key vs Foreign Key)",
          body: [
            "Primary Key identifies a row; Foreign Key connects one table to another by referring to that Primary Key.",
            "Primary Key kisi row ki unique pehchan hoti hai, jabke Foreign Key doosri table ke Primary Key ko reference karti hai taake dono tables aapas mein connect ho saken."
          ]
        },
        {
          type: "concept",
          id: "pk-6",
          important: true,
          title: "Composite keys and candidate keys",
          body: [
            "Can a Primary Key be more than one column? Yes — called a **composite key**. Example: a table of enrollments might use (student_id, course_id) together as the primary key, since neither alone is unique (a student takes many courses, a course has many students) but the pair is unique per enrollment.",
            "Candidate key vs primary key — a quick vocabulary note likely to get asked: a table can have several columns that could each serve as a unique identifier (email, national ID, employee code) — these are all **candidate keys**. You pick exactly one to be the actual Primary Key; the rest remain candidate keys, usable as UNIQUE constraints if you want."
          ]
        },
        {
          type: "code",
          id: "pk-7",
          title: "Foreign Key in SQL",
          code: "CREATE TABLE Students (\n    RollNo INT PRIMARY KEY,\n    Name VARCHAR(50)\n);\n\nCREATE TABLE Marks (\n    RollNo INT,\n    Marks INT,\n    FOREIGN KEY (RollNo) REFERENCES Students(RollNo)\n);",
          note: "This means: Marks.RollNo must already exist in Students.RollNo."
        },
        {
          type: "qa",
          id: "pk-8",
          question: "What's a Primary Key?",
          answer: "A column (or set of columns) that uniquely identifies each row in a table. It must be unique and can never be NULL."
        },
        {
          type: "qa",
          id: "pk-9",
          question: "What's a Foreign Key?",
          answer: "A column in one table that references the Primary Key of another table, used to link related data across tables."
        },
        {
          type: "qa",
          id: "pk-10",
          question: "Can a Foreign Key be NULL?",
          answer: "Yes — unlike a Primary Key. It just means this row doesn't currently point to anything. That's literally Ayesha's situation: her dept_id (a foreign key column) is NULL, meaning she's not linked to any department yet. This is legal."
        },
        {
          type: "qa",
          id: "pk-11",
          question: "What happens if you try to insert a Foreign Key value that doesn't exist in the referenced table?",
          answer: "The database rejects the insert, if the Foreign Key constraint is properly declared. This protects against orphaned references — rows pointing to something that doesn't exist. **This protection is called referential integrity.**"
        },
        {
          type: "qa",
          id: "pk-12",
          question: "Difference between a Primary Key and a Unique constraint?",
          answer: "Both enforce uniqueness. But a table can have only one Primary Key, and it can never be NULL. A table can have multiple Unique columns, and those are allowed to contain one NULL (behavior varies slightly by DBMS, but this is the general rule)."
        },
        {
          type: "concept",
          id: "pk-13",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "A Primary Key uniquely identifies every row and is never NULL; a Foreign Key links to another table's Primary Key and enforces that the link always points to something real.",
            "Primary Key har row ko uniquely identify karta hai aur kabhi NULL nahi hota; Foreign Key doosri table ki Primary Key se judta hai aur yaqeeni banata hai ke link hamesha kisi asli cheez ki taraf ho."
          ]
        },
        {
          type: "concept",
          id: "pk-14",
          title: "Worked example: the quick-check questions",
          body: [
            "**Q1 — could city be the Primary Key of employees? No.** A Primary Key must be unique per row, but city repeats — three employees share \"Lahore,\" two share \"Karachi.\" It fails uniqueness immediately, so it can't be a Primary Key (it can still be useful to filter or group by, just not as an identifier).",
            "**Q2 — does Ayesha's NULL dept_id break the Foreign Key rule? No.** Foreign Keys are allowed to be NULL, unlike Primary Keys — NULL just means \"this row doesn't currently point to anything.\" Ayesha simply isn't linked to a department yet; that's a legal, normal state, not a broken constraint."
          ]
        }
      ]
    },

    {
      title: "Topic 9 · Normalization — why it exists",
      items: [
        {
          type: "concept",
          id: "norm-1",
          title: "The problem: one giant notebook",
          body: [
            "Imagine you own a school and keep one giant notebook where you write everything: Student, Roll No, Teacher, Subject, Teacher Phone — with \"Sir Umar\" and his phone number \"0300\" written out again for every single student in his class.",
            "If you have 10,000 students, you'll write \"Sir Umar, 0300\" ten thousand times. **That's a lot of repeated data.**"
          ]
        },
        {
          type: "concept",
          id: "norm-2",
          important: true,
          title: "Why repeating data is dangerous",
          body: [
            "Imagine Sir Umar changes his phone number from 0300 to 0311. Now you must update every single row that mentions him.",
            "**If you forget even one row, your database now has wrong information** — some rows say 0311, one row still says the old 0300, and there's no way to tell which is correct just by looking."
          ]
        },
        {
          type: "concept",
          id: "norm-3",
          title: "What Normalization says",
          body: [
            "Normalization says: \"Don't repeat the same information again and again.\" Instead, store it once.",
            "Instead of a Students table with Student/Teacher/Phone repeated on every row, split it: a Students table with Student/TeacherID, and a separate Teachers table with TeacherID/Name/Phone — now the phone number exists only once. If it changes, you update one row. Done."
          ]
        },
        {
          type: "concept",
          id: "norm-4",
          title: "Everyday analogy: your phone contacts",
          body: "Would you save your mother's phone number 100 times, once per app? No — you save it once, and every app just points to that one contact. That's exactly what databases try to do."
        },
        {
          type: "list",
          id: "norm-5",
          title: "The three problems Normalization solves",
          points: [
            "Repeated data — the same phone number, name, or fact written out over and over.",
            "Hard to update — change one thing, and you have to change it everywhere it was copied.",
            "Wasted space — storing the same information thousands of times."
          ]
        },
        {
          type: "concept",
          id: "norm-6",
          important: true,
          title: "What Normalization actually does",
          body: [
            "It asks one question: **\"Can I store this information only once instead of repeating it?\"** If yes, split the data into multiple related tables.",
            "Think of a wardrobe: without normalization, shirts, shoes, books, chargers and pens are all mixed together, and finding anything is hard. With normalization, you get a clothes drawer, a shoe rack, a book shelf — everything organized, nothing repeated unnecessarily."
          ]
        },
        {
          type: "concept",
          id: "norm-7",
          important: true,
          title: "The one sentence to remember forever",
          body: [
            "**Normalization is the process of organizing data so each piece of information is stored only where it belongs, reducing repetition and keeping the database accurate.**",
            "Notice it doesn't say \"split tables.\" Splitting tables is a method, not the goal. The goal is: reduce duplicate data, make updates easier, keep data consistent, save storage."
          ]
        },
        {
          type: "concept",
          id: "norm-8",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "Normalization is not about making more tables. It's about organizing data so you don't repeat the same information unnecessarily.",
            "Normalization ka matlab hai database ko is tarah organize karna ke har information apni sahi jagah sirf ek dafa store ho, taake duplicate data kam ho aur updates aur maintenance asaan ho."
          ]
        }
      ]
    },

    {
      title: "Topic 10 · 1NF — First Normal Form",
      items: [
        {
          type: "concept",
          id: "1nf-1",
          title: "The rule",
          body: "Think of normalization as cleaning your room — 1NF is the first cleaning rule: **every cell should contain only ONE value.** That's it."
        },
        {
          type: "concept",
          id: "1nf-2",
          title: "The problem it catches",
          body: [
            "A table with a Subjects column like \"Math, English, Physics\" in a single cell looks okay to us, but SQL sees a problem — that's 3 values inside 1 cell, which isn't allowed in 1NF.",
            "Why is this bad? If someone asks \"show me everyone studying English,\" SQL wants each cell to contain one value — but here, one cell contains three values mixed together, so searching, updating and deleting all become harder."
          ]
        },
        {
          type: "table",
          id: "1nf-3",
          title: "Fixing it — one subject per row",
          headers: ["Student", "Subject"],
          rows: [["Ali", "Math"], ["Ali", "English"], ["Ali", "Physics"]],
          note: "Instead of putting 3 subjects in one cell, create 3 rows. Now every cell has only one value — this is 1NF."
        },
        {
          type: "table",
          id: "1nf-4",
          title: "More examples — phone numbers",
          headers: ["Name", "Phone"],
          rows: [["Ali", "0300"], ["Ali", "0311"]],
          note: "❌ Bad: one cell holding \"0300, 0311\". ✅ Good: each phone number gets its own row, so every cell has exactly one value."
        },
        {
          type: "table",
          id: "1nf-5",
          title: "More examples — order items",
          headers: ["Order ID", "Item"],
          rows: [["101", "Burger"], ["101", "Fries"], ["101", "Coke"]],
          note: "❌ Bad: one cell holding \"Burger, Fries, Coke\". ✅ Good: one item per row."
        },
        {
          type: "concept",
          id: "1nf-6",
          important: true,
          title: "What problem 1NF actually solves",
          body: [
            "Say you want to remove \"English\" from Ali's subjects. With everything crammed into one cell (\"Math, English, Physics\"), you have to carefully edit text down to \"Math, Physics\" — messy and error-prone.",
            "With 1NF already applied, you just **delete the one row where Student=Ali, Subject=English.** Much easier."
          ]
        },
        {
          type: "concept",
          id: "1nf-7",
          title: "Kid analogy — the egg carton",
          body: "Imagine an egg carton: each hole should hold one egg. One hole holding three eggs = bad (not 1NF). One hole holding one egg = good (1NF). A database cell is like one hole in the egg carton. **Memory trick: 1NF = 1 Cell = 1 Value.**"
        },
        {
          type: "concept",
          id: "1nf-8",
          title: "Normalization vs 1NF — don't confuse them",
          body: "Normalization is the overall process of organizing a database. 1NF is the first rule in that process: every cell must contain only one value."
        },
        {
          type: "concept",
          id: "1nf-9",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "1NF says: one row-column cell = one value. No lists, no comma-separated values, no multiple items in a single cell.",
            "1NF ka matlab hai har cell mein sirf ek value honi chahiye. Ek cell mein list ya multiple values nahi honi chahiye."
          ]
        }
      ]
    },

    {
      title: "Topic 11 · 2NF — Second Normal Form",
      items: [
        {
          type: "concept",
          id: "2nf-1",
          title: "Starting point: a table that's already 1NF",
          body: [
            "A table like StudentID/Subject/Teacher — where Student 1 has rows for Math→Sir Umar and English→Sir Ali, Student 2 the same — already follows 1NF: every cell has one value.",
            "So what's still wrong? Look at who teaches Math: **Sir Umar, written again for every single student who takes Math.** Teacher depends only on Subject, not on Student — Math is always taught by Sir Umar, English is always taught by Sir Ali, and the student's ID has nothing to do with who teaches Math."
          ]
        },
        {
          type: "concept",
          id: "2nf-2",
          important: true,
          title: "The problem it causes",
          body: [
            "Suppose Sir Umar leaves and Math is now taught by Sir Ahmed. You must change every single row that says \"Math → Sir Umar,\" for every student.",
            "**If you forget even one row, your database becomes inconsistent** — the exact same failure mode normalization exists to prevent."
          ]
        },
        {
          type: "concept",
          id: "2nf-3",
          title: "What 2NF says",
          body: "If some information depends on only part of the key, move it to another table. Split StudentSubjects(StudentID, Subject) from Subjects(Subject, Teacher) — now \"Sir Umar\" is written only once. If the teacher changes, update one row. Done."
        },
        {
          type: "concept",
          id: "2nf-4",
          title: "Kid analogy — the timetable",
          body: "Why write \"Room 12\" over and over for every student taking Math (Ali→Math→Room 12, Ahmed→Math→Room 12, Sara→Math→Room 12)? Instead, keep a Subjects table with Subject→Room, and every student just points to \"Math.\" No repetition."
        },
        {
          type: "concept",
          id: "2nf-5",
          title: "1NF vs 2NF — what's the difference",
          body: "1NF fixes multiple values crammed into one cell (\"Math, English, Physics\"). 2NF fixes repeated information that belongs to only part of the key (\"Math → Sir Umar\" written again and again). **Memory trick: 1NF → one cell = one value. 2NF → don't repeat facts that belong to only one part of the data — store them separately.**"
        },
        {
          type: "concept",
          id: "2nf-6",
          title: "The formal definition, for later",
          body: "The formal rule for 2NF: a table must already be in 1NF, and every non-key column must depend on the whole primary key, not just part of it. For now, focus on the intuition — 2NF removes repeated information that doesn't belong in the current table. The formal definition clicks much more easily once you're working with composite keys."
        },
        {
          type: "code",
          id: "2nf-7",
          title: "Worked example: unnormalized → 1NF",
          code: "-- Not 1NF: multiple values in one cell\n-- StudentID  Name    Subjects\n-- 1          Ali     Math, English\n-- 2          Ahmed   Math, Physics\n\n-- Fixed to 1NF: one cell = one value\nCREATE TABLE StudentSubjects (\n    StudentID INT,\n    Name VARCHAR(50),\n    Subject VARCHAR(50)\n);\n\nINSERT INTO StudentSubjects VALUES\n(1, 'Ali', 'Math'),\n(1, 'Ali', 'English'),\n(2, 'Ahmed', 'Math'),\n(2, 'Ahmed', 'Physics');",
          note: "Every cell now has one value — this is 1NF. But look closely: \"Ali\" is written twice, \"Ahmed\" is written twice. **If a student's name changes, you'd have to update it in multiple rows — the exact repetition problem 2NF exists to fix.**"
        },
        {
          type: "code",
          id: "2nf-8",
          title: "Worked example: 1NF → 2NF",
          code: "-- Students table — the name lives here, once per student\nCREATE TABLE Students (\n    StudentID INT PRIMARY KEY,\n    Name VARCHAR(50)\n);\n\n-- StudentSubjects table — just the link\nCREATE TABLE StudentSubjects (\n    StudentID INT,\n    Subject VARCHAR(50),\n    FOREIGN KEY (StudentID) REFERENCES Students(StudentID)\n);\n\nINSERT INTO Students VALUES\n(1, 'Ali'),\n(2, 'Ahmed');\n\nINSERT INTO StudentSubjects VALUES\n(1, 'Math'),\n(1, 'English'),\n(2, 'Math'),\n(2, 'Physics');",
          note: "Now Ali's name is stored exactly once, in the Students table. StudentSubjects only ever refers to him by StudentID. Change his name → update one row, in one place."
        },
        {
          type: "concept",
          id: "2nf-9",
          important: true,
          title: "The reusable skeleton for 2NF",
          body: [
            "There isn't a 2NF keyword — same as before, it's not a command, it's a design pattern you build using regular CREATE TABLE + FOREIGN KEY.",
            "Whenever you have a composite key (two columns together as the primary key) and some other column only depends on ONE of those two — pull it out into its own table."
          ]
        },
        {
          type: "code",
          id: "2nf-10",
          title: "The general shape",
          code: "-- Table 1: the thing that only depends on column A\nCREATE TABLE table_a (\n  a_id INTEGER PRIMARY KEY,\n  a_name TEXT\n);\n\n-- Table 2: the thing that only depends on column B\nCREATE TABLE table_b (\n  b_id INTEGER PRIMARY KEY,\n  b_name TEXT\n);\n\n-- Table 3: just the link between them — the composite key table\nCREATE TABLE linking_table (\n  a_id INTEGER,\n  b_id INTEGER,\n  PRIMARY KEY (a_id, b_id),\n  FOREIGN KEY (a_id) REFERENCES table_a(a_id),\n  FOREIGN KEY (b_id) REFERENCES table_b(b_id)\n);",
          note: "Mapped onto students/courses: students(student_id PK, student_name), courses(course_id PK, course_name), enrollments(student_id, course_id, PRIMARY KEY(student_id, course_id), FK to both)."
        },
        {
          type: "concept",
          id: "2nf-11",
          important: true,
          title: "The pattern, stripped to its bones",
          body: "**Composite key + a column depending on only half the key → break that column off into its own table, keyed by just that half.** That's the entire \"syntax\" of 2NF — it's just knowing when to split a table this way, using tools you already have (CREATE TABLE, PRIMARY KEY, FOREIGN KEY)."
        },
        {
          type: "concept",
          id: "2nf-12",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "2NF removes unnecessary repeated data by moving information that depends on only part of a combined key into its own table.",
            "2NF mein jo information sirf data ke ek hissa (jaise Subject) par depend karti ho, usay alag table mein rakhte hain taake repeat na ho."
          ]
        }
      ]
    },

    {
      title: "Topic 12 · ACID — transaction guarantees",
      items: [
        {
          type: "concept",
          id: "acid-1",
          title: "The ATM problem",
          body: [
            "Imagine an ATM: you transfer Rs. 5,000 from your account to your friend's account. What should happen? Rs. 5,000 leaves your account, Rs. 5,000 enters your friend's account. Simple.",
            "**But what if the electricity goes out right after step 1?** Your account loses Rs. 5,000, your friend never receives it — money disappeared. Databases prevent this using ACID."
          ]
        },
        {
          type: "concept",
          id: "acid-2",
          title: "What is ACID?",
          body: "ACID is a set of 4 rules that make database transactions reliable. A transaction is a group of operations that should be treated as one single task — e.g. \"take Rs. 5000 from Ali, then give Rs. 5000 to Ahmed\" is one transaction, not two independent steps."
        },
        {
          type: "concept",
          id: "acid-3",
          important: true,
          title: "A — Atomicity",
          body: [
            "Think: **\"all or nothing.\"** If one step fails, everything is cancelled.",
            "Example: transferring Rs. 5000 — taking money from Ali succeeds, but giving it to Ahmed fails. Atomicity undoes the first step too. Final result: Ali still has his Rs. 5000, Ahmed gets nothing, no money is lost.",
            "Kid analogy: buying a burger — you pay, but the restaurant says \"sorry, no burger.\" That's not allowed. Either pay + burger, or no pay + no burger — never one without the other."
          ]
        },
        {
          type: "concept",
          id: "acid-4",
          title: "C — Consistency",
          body: [
            "Think: **\"the database should always remain valid.\"**",
            "Example: Ali has Rs. 10000, transfers Rs. 5000. After the transfer, Ali = 5000, Ahmed = +5000. Total money is still correct — nothing is created, nothing disappears. The database stays consistent."
          ]
        },
        {
          type: "concept",
          id: "acid-5",
          important: true,
          title: "I — Isolation",
          body: [
            "Think: **\"transactions shouldn't interfere with each other.\"**",
            "Imagine two ATMs both try to withdraw Rs. 7000 from the same Rs. 10000 balance at the exact same moment. Without isolation, both succeed — Rs. 14,000 gets withdrawn from an account that only had Rs. 10,000.",
            "Isolation prevents this: one transaction finishes first, then the next one starts.",
            "Kid analogy: one toy, two children grab it at the same time — the teacher says \"wait, one at a time.\" That's isolation."
          ]
        },
        {
          type: "concept",
          id: "acid-6",
          title: "D — Durability",
          body: [
            "Think: **\"once it's saved, it stays saved.\"**",
            "Suppose the transfer completes, and immediately after, the power goes out. When the database restarts, the money transfer is still there — it wasn't lost.",
            "Kid analogy: you save your homework, the computer crashes — when it turns back on, your homework is still saved. That's durability."
          ]
        },
        {
          type: "table",
          id: "acid-7",
          title: "ACID applied to the Rs. 5000 transfer",
          headers: ["ACID", "Meaning"],
          rows: [
            ["Atomicity", "Both debit and credit happen, or neither happens."],
            ["Consistency", "Total money remains correct before and after the transfer."],
            ["Isolation", "Two transfers at the same time don't interfere with each other."],
            ["Durability", "After success, the transfer survives a crash or power failure."]
          ]
        },
        {
          type: "list",
          id: "acid-8",
          title: "Memory trick",
          points: [
            "A → All or Nothing — either everything happens, or nothing happens.",
            "C → Correct — database always stays correct.",
            "I → Independent — transactions don't disturb each other.",
            "D → Don't Lose Data — once saved, it's saved forever."
          ]
        },
        {
          type: "concept",
          id: "acid-9",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "ACID ensures database transactions are safe, correct, independent, and permanent.",
            "Atomicity: Ya poora transaction hoga ya bilkul nahi. Consistency: Database hamesha correct state mein rahegi. Isolation: Ek transaction doosre ko disturb nahi karega. Durability: Save hone ke baad data kabhi lose nahi hoga."
          ]
        }
      ]
    },

    {
      title: "Topic 13 · Sharding — scaling across servers",
      items: [
        {
          type: "concept",
          id: "shard-1",
          title: "The problem: one computer isn't enough",
          body: [
            "Imagine you own YouTube. At first you have only 100 users — one computer stores all the data, and everything works fine.",
            "Then YouTube becomes famous: now you have 100 million users. **One computer can't handle it — it becomes slow, full of data, and crashes often.**"
          ]
        },
        {
          type: "concept",
          id: "shard-2",
          title: "The solution: use many computers",
          body: "Instead of buying one giant computer, split the data across many computers — Server 1 holds some users, Server 2 holds others, Server 3 holds the rest. Now the work is shared. This is called sharding."
        },
        {
          type: "concept",
          id: "shard-3",
          important: true,
          title: "Definition",
          body: "**Sharding means splitting one large database into smaller pieces (called shards) and storing each piece on a different server.**"
        },
        {
          type: "concept",
          id: "shard-4",
          title: "Classroom analogy",
          body: "Imagine 12 students. Instead of putting all of them in one classroom, you make three classrooms of 4 each — Classroom A, B, C. Each classroom has fewer students, so it's easier to manage. Databases do the same thing: before sharding, one server does everything; after sharding, each server stores only part of the data."
        },
        {
          type: "concept",
          id: "shard-5",
          title: "How does SQL know where to look?",
          body: "Suppose you search for User ID = 8. The database knows User IDs 7–10 live on Server 3, so it goes directly there — it doesn't search every server."
        },
        {
          type: "concept",
          id: "shard-6",
          title: "Why use sharding?",
          body: [
            "Without sharding: one server, 100 million users — slow. With sharding: Server 1 → 25M users, Server 2 → 25M, Server 3 → 25M, Server 4 → 25M. Each server has less work, so everything becomes faster.",
            "Real-life analogy: one grocery store with 1000 people and a single checkout line is very slow. Open four checkout counters, 250 people each, and everyone gets served faster. **Sharding is like opening more checkout counters, but for your data.**"
          ]
        },
        {
          type: "list",
          id: "shard-7",
          title: "Memory trick",
          points: [
            "Indexing = find data faster 🔍",
            "Sharding = split data across servers 🖥️🖥️🖥️",
            "Indexing doesn't move the data. Sharding physically divides the data."
          ]
        },
        {
          type: "concept",
          id: "shard-8",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "Sharding splits one huge database into smaller databases (shards) across multiple servers so the system can store more data and handle more users efficiently.",
            "Sharding ka matlab hai ek bari database ko chhoti databases (shards) mein divide karke mukhtalif servers par rakhna, taake load kam ho aur performance behtar ho."
          ]
        }
      ]
    },

    {
      title: "Topic 14 · Partitioning vs Sharding",
      items: [
        {
          type: "concept",
          id: "part-1",
          important: true,
          title: "The easiest way to remember them",
          body: "**Partitioning = split inside one database/server. Sharding = split across multiple servers.** This is one of the most confusing topics because they look almost the same — that one-line distinction is the anchor."
        },
        {
          type: "concept",
          id: "part-2",
          title: "Partitioning",
          body: "Suppose you still have one server, but you organize the data into sections — e.g. rows A–F, G–M, N–Z all live in labeled sections within that same server. Everything is still on one server, just organized better. This is partitioning."
        },
        {
          type: "concept",
          id: "part-3",
          title: "Sharding, side by side",
          body: "Now imagine one server isn't enough, so you buy more servers — Server 1 holds A–F, Server 2 holds G–M, Server 3 holds N–Z. Now the data is physically stored on different servers. This is sharding."
        },
        {
          type: "concept",
          id: "part-4",
          title: "Wardrobe analogy",
          body: "Partitioning: one cupboard, organized with a top shelf for shirts, middle shelf for pants, bottom shelf for shoes — one cupboard, just organized. Sharding: too many clothes for one cupboard, so you use Cupboard 1 for shirts, Cupboard 2 for pants, Cupboard 3 for shoes — multiple cupboards. That's sharding."
        },
        {
          type: "concept",
          id: "part-5",
          title: "Why use partitioning?",
          body: "Your table becomes huge — instead of one giant Orders table holding 2022, 2023, 2024, 2025 all mixed together, you split it into partitions by year. Now when someone asks WHERE OrderYear = 2025, SQL looks only in the 2025 partition. Faster."
        },
        {
          type: "concept",
          id: "part-6",
          title: "Why use sharding?",
          body: "Imagine Instagram: one server can't store billions of users, so they split users across many servers — Server 1 holds User IDs 1–1,000,000, Server 2 holds 1,000,001–2,000,000, Server 3 holds 2,000,001–3,000,000. Each server handles part of the users."
        },
        {
          type: "table",
          id: "part-7",
          title: "Partitioning vs Sharding, side by side",
          headers: ["Partitioning", "Sharding"],
          rows: [
            ["Inside one database/server", "Across multiple servers"],
            ["Organizes data", "Distributes data"],
            ["Used for performance and management", "Used for scalability and handling huge traffic"],
            ["Easier to implement", "More complex to implement"]
          ],
          note: "Memory trick: 🏠 Partitioning = rooms in one house — one house, many rooms. 🏘️ Sharding = many houses — the family is spread across multiple houses."
        },
        {
          type: "concept",
          id: "part-8",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "Partitioning = split one large table inside the same database/server. Sharding = split one large database across multiple servers.",
            "Partitioning: Ek hi database/server ke andar data ko parts mein divide karna. Sharding: Data ko multiple servers mein divide karke load distribute karna taake system scale kar sake."
          ]
        }
      ]
    },

    {
      title: "Topic 15 · 3NF — Third Normal Form",
      items: [
        {
          type: "concept",
          id: "3nf-1",
          important: true,
          title: "The one rule",
          body: "**A non-key column should depend directly on the primary key — not on some other non-key column.**"
        },
        {
          type: "code",
          id: "3nf-2",
          title: "Build the bad example",
          code: "CREATE TABLE bad_employees2 (\n  id INTEGER,\n  name TEXT,\n  dept_id INTEGER,\n  dept_name TEXT\n);\n\nINSERT INTO bad_employees2 VALUES\n(1, 'Ali', 10, 'Engineering'),\n(3, 'Bilal', 10, 'Engineering');",
          note: "Primary key here is id — that's the whole key, just one column, so 2NF's \"partial dependency\" issue doesn't apply at all. This is a different problem."
        },
        {
          type: "concept",
          id: "3nf-3",
          important: true,
          title: "The transitive dependency",
          body: [
            "Look at dept_name. Does it depend on id? Not directly. It depends on dept_id — and dept_id happens to depend on id. So there's a chain: id → dept_id → dept_name.",
            "**dept_name is riding on id only indirectly, through dept_id. That chain is called a transitive dependency** — a non-key column depending on another non-key column, instead of depending on the primary key itself.",
            "That's exactly why \"Engineering\" repeats for every employee in department 10 — same damage pattern as every example before, just a different technical label for how it happened."
          ]
        },
        {
          type: "code",
          id: "3nf-4",
          title: "The fix — you already know this one",
          code: "CREATE TABLE departments (\n  dept_id INTEGER PRIMARY KEY,\n  dept_name TEXT\n);\n\nCREATE TABLE employees (\n  id INTEGER PRIMARY KEY,\n  name TEXT,\n  dept_id INTEGER,\n  FOREIGN KEY (dept_id) REFERENCES departments(dept_id)\n);",
          note: "**This is literally the exact two-table setup we've been using since Topic 7. You built this before you even had the label for it.**"
        },
        {
          type: "table",
          id: "3nf-5",
          important: true,
          title: "The three forms side by side — the actual thing to remember",
          headers: ["Form", "The smell", "The fix"],
          rows: [
            ["1NF", "a cell holds a list, not one value", "split into one-row-per-value"],
            ["2NF", "a column depends on only half a composite key", "split that column into its own table, keyed by that half"],
            ["3NF", "a column depends on another non-key column, not the key itself", "split that column into its own table, keyed by what it actually depends on"]
          ]
        },
        {
          type: "concept",
          id: "3nf-7",
          title: "The easiest memory trick — lockers",
          body: [
            "Imagine you're moving things into lockers.",
            "**Student Locker** should contain: Student Name, Roll Number, Department (because this student belongs to a department).",
            "**Department Locker** should contain: Department Name, HOD.",
            "Don't put the HOD in every student's locker."
          ]
        },
        {
          type: "concept",
          id: "3nf-8",
          important: true,
          title: "Final one-line difference — 2NF vs 3NF",
          body: [
            "**2NF: move data to the correct main entity** — Student info goes to the Student table.",
            "**3NF: move data to the entity that actually owns it** — HOD goes to the Department table, Director goes to the Movie table."
          ]
        },
        {
          type: "concept",
          id: "3nf-6",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: "A non-key column should depend directly on the primary key, not on another non-key column — when it depends on another non-key column instead (a transitive dependency), split it into its own table, keyed by what it actually depends on."
        }
      ]
    },

    {
      title: "Topic 16 · Indexes — finding rows fast",
      items: [
        {
          type: "concept",
          id: "idx-1",
          title: "The problem an index solves",
          body: [
            "Without an index, WHERE salary > 60000 forces the database to check every single row, one by one — a full table scan. On 6 rows that's instant; on 6 million rows, it's slow.",
            "**An index is a separate, sorted structure that lets the database jump straight to matching rows instead of scanning the whole table** — the same reason a book's index lets you jump to a page instead of reading cover to cover."
          ]
        },
        {
          type: "code",
          id: "idx-2",
          title: "Creating an index",
          code: "CREATE INDEX idx_salary ON employees(salary);",
          note: "This doesn't change what queries return — only how fast the database can find the rows. SELECT * FROM employees WHERE salary > 60000; gives the identical result with or without the index; with it, the database can skip straight to the relevant range instead of checking every row."
        },
        {
          type: "concept",
          id: "idx-3",
          important: true,
          title: "How it actually works — the B-Tree",
          body: [
            "Most indexes are a B-Tree: a balanced, sorted tree structure. Instead of scanning row by row, the database walks down the tree — is my value bigger or smaller than this node? — narrowing the search by roughly half at each step.",
            "**That's what \"O(log n)\" means in practice: doubling the table size adds roughly one more step to the search, not double the work.** A million-row table might take ~20 steps to find a row; a full scan would take up to a million."
          ]
        },
        {
          type: "concept",
          id: "idx-4",
          important: true,
          title: "Clustered vs non-clustered",
          body: [
            "A **clustered index determines the physical order rows are stored on disk** — there can only be one per table (usually the primary key). A **non-clustered index is a separate lookup structure** that points back to where the actual row lives — a table can have many of these.",
            "Analogy: a clustered index is like a phone book sorted by name — the data itself is in that order. A non-clustered index is like the index at the back of a textbook — a separate list that tells you which page to flip to."
          ]
        },
        {
          type: "code",
          id: "idx-5",
          title: "The tradeoff — indexes aren't free",
          code: "-- fast to read:\nSELECT * FROM employees WHERE salary > 60000;\n\n-- slower to write, now:\nINSERT INTO employees VALUES (...);\nUPDATE employees SET salary = 70000 WHERE id = 3;",
          note: "**Every INSERT, UPDATE or DELETE also has to update every index on that table** — more indexes means slower writes, plus extra disk space to store the index itself. Indexes are a read-speed vs write-speed trade, not a free upgrade."
        },
        {
          type: "list",
          id: "idx-6",
          title: "When NOT to add an index",
          points: [
            "Small tables — a full scan is already fast, an index just adds overhead.",
            "Columns with low cardinality (few distinct values, like a boolean flag) — the index barely narrows anything down.",
            "Write-heavy tables where the extra index-maintenance cost on every INSERT/UPDATE outweighs the read benefit.",
            "Columns you rarely filter, sort, or join on — an unused index is pure cost with no benefit."
          ]
        },
        {
          type: "table",
          id: "idx-7",
          title: "Translating English into index thinking",
          headers: ["English signal", "What it means"],
          rows: [
            ["\"this query is slow on a huge table\"", "probably needs an index on the filtered/sorted column"],
            ["\"why is this column special / unique?\"", "might already have an index (primary key, unique constraint)"],
            ["\"inserts got slower after adding X\"", "too many indexes on that table"],
            ["\"the query filters and sorts by the same column\"", "classic case for a single well-chosen index"]
          ]
        },
        {
          type: "qa",
          id: "idx-8",
          question: "What is an index and why does it speed up queries?",
          answer: "It's a separate, sorted structure (usually a B-Tree) that lets the database jump to matching rows instead of scanning the whole table row by row — turning an O(n) full scan into roughly O(log n)."
        },
        {
          type: "qa",
          id: "idx-9",
          question: "Difference between a clustered and non-clustered index?",
          answer: "A clustered index physically orders the table's rows on disk — only one per table. A non-clustered index is a separate structure that points back to the row — a table can have several."
        },
        {
          type: "qa",
          id: "idx-10",
          question: "Why not just index every column?",
          answer: "Every index speeds up reads on that column but slows down every write, since the index has to be updated too — plus it costs extra disk space. Index the columns you actually filter, sort, or join on; skip the rest."
        },
        {
          type: "concept",
          id: "idx-12",
          title: "Let's become SQL for two minutes",
          body: "Everyone says \"an index makes searching faster,\" but nobody explains what SQL is actually doing. Here's the exact mechanical difference, using a tiny table — EmployeeID/Name with 5 rows (1 Ali, 2 Ahmed, 3 Sara, 4 John, 5 Bilal) — running SELECT * FROM Employees WHERE EmployeeID = 4;"
        },
        {
          type: "concept",
          id: "idx-13",
          important: true,
          title: "Without an index — pretend you are SQL",
          body: [
            "You know nothing. Row 1: EmployeeID = 1 — is it 4? No, go to next row. Row 2 = 2, no. Row 3 = 3, no. Row 4 = 4 — yes! Return John.",
            "**You checked 4 rows to find 1 match.** If there were 10 million rows, you'd potentially check millions of rows before finding it — this is exactly what a table scan is.",
            "Same problem as a phone book with 10 million names: nobody starts from page 1 every time to find \"John.\""
          ]
        },
        {
          type: "concept",
          id: "idx-14",
          title: "So we create an index — a separate helper list",
          body: [
            "The table stays exactly the same. But SQL secretly builds a second, small list alongside it: EmployeeID → Where is it? (1 → Row 1, 2 → Row 2, 3 → Row 3, 4 → Row 4, 5 → Row 5).",
            "**Notice: it doesn't store the employees again — it only stores how to find them quickly.** That helper list is the index."
          ]
        },
        {
          type: "code",
          id: "idx-15",
          title: "The same search, with the index in place",
          code: "SELECT *\nFROM Employees\nWHERE EmployeeID = 4;\n\n-- without the index: 1❌ 2❌ 3❌ 4✅  (checked every row)\n-- with the index: look up 4 in the helper list → Row 4 → jump straight there. Done.",
          note: "Two very different amounts of work for the exact same query and the exact same answer — the index changes nothing about what comes back, only how much work SQL does to get there."
        },
        {
          type: "concept",
          id: "idx-16",
          title: "Two analogies worth keeping",
          body: [
            "A 1000-page book, looking for Chapter 18: without an index you'd flip page 1, 2, 3... all the way to page 842. With an index (the table of contents), you look up \"Chapter 18 → page 842\" and jump straight there.",
            "A classroom of students, teacher asked to find Roll No. 542: without roll numbers, you'd ask every student \"are you 542?\" one by one. With a class register, the teacher looks up \"Roll 542 → Seat 18\" and walks straight there. **The register is the index.**"
          ]
        },
        {
          type: "code",
          id: "idx-17",
          title: "Reading CREATE INDEX like English",
          code: "CREATE INDEX idx_employeeid\nON Employees(EmployeeID);",
          note: "CREATE INDEX → make a helper list. idx_employeeid → call this helper list idx_employeeid. ON Employees(EmployeeID) → build it for the EmployeeID column."
        },
        {
          type: "concept",
          id: "idx-18",
          important: true,
          title: "The biggest misconception",
          body: [
            "Many beginners think: \"does an index sort my table?\" **No — your actual table stays in exactly the same order it always was.**",
            "The index is a separate data structure the database maintains behind the scenes purely to help it find rows quickly — it doesn't rearrange or duplicate your real data."
          ]
        },
        {
          type: "qa",
          id: "idx-19",
          question: "Quick check: without an index, how does SQL find EmployeeID = 4 in a table of 1 million rows — (A) jump directly to row 4, or (B) check rows one by one until it finds it?",
          answer: "B — it checks rows one by one until it finds EmployeeID = 4 (a full table scan). Without an index there's no \"helper list\" to jump through, so SQL has no way to jump directly to row 4 — that direct jump is exactly what having an index enables."
        },
        {
          type: "concept",
          id: "idx-11",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "An index is a sorted side-structure (usually a B-Tree) that lets the database find rows in roughly log(n) steps instead of scanning every row — but every index also slows down writes and costs space, so index what you actually query by, not everything.",
            "Index ek sorted side-structure hota hai jo database ko har row check karne ki bajaye seedha matching rows tak pohnchne deta hai — magar har index likhne (insert/update) ko thora slow bhi karta hai, is liye sirf unhi columns par index lagayein jin par aap actually query karte hain."
          ]
        }
      ]
    },

    {
      title: "Topic 17 · Subqueries — a query inside a query",
      items: [
        {
          type: "concept",
          id: "sub-1",
          title: "The idea",
          body: [
            "A subquery is a SELECT nested inside another query — it runs first, and its result gets used by the outer query, like a value or a list.",
            "It's the same instinct as GROUP BY + HAVING (filtering on something that has to be computed first) — except here, the \"something\" is an entire other query's result, not just an aggregate."
          ]
        },
        {
          type: "code",
          id: "sub-2",
          title: "Subquery in WHERE — comparing to a single value",
          code: "SELECT name, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);\n\n-- inner query first: AVG(salary) = 63500\n-- then: WHERE salary > 63500\n-- name    salary\n-- Sara    75000\n-- Usman   91000",
          note: "The inner query runs once, produces a single number (63500), and the outer query treats it exactly like a literal — WHERE salary > 63500. This is why the inner query here can only return one row, one column: it's being used where a single value is expected."
        },
        {
          type: "code",
          id: "sub-3",
          title: "Subquery with IN — comparing to a list",
          code: "SELECT name\nFROM employees\nWHERE dept_id IN (SELECT dept_id FROM departments WHERE dept_name = 'Engineering');\n\n-- inner query: dept_id IN (10)\n-- name\n-- Ali\n-- Bilal",
          note: "This time the inner query can return multiple rows (a list of matching dept_ids), because IN expects a list, not a single value. Same mechanism as WHERE city IN ('Lahore','Karachi') from Topic 3 — the list just comes from a query instead of being typed out by hand."
        },
        {
          type: "concept",
          id: "sub-4",
          important: true,
          title: "Correlated vs non-correlated subqueries",
          body: [
            "The two examples above are **non-correlated**: the inner query is completely independent — it doesn't look at the outer query at all, and could be run on its own.",
            "A **correlated subquery** references a column from the outer query, so it has to re-run once per outer row instead of once total: SELECT name FROM employees e WHERE salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id) — \"employees earning more than their own department's average.\" The inner query can't run alone; e.dept_id only exists because the outer row supplies it.",
            "**This matters for performance: a correlated subquery can run once per outer row, which gets slow on large tables** — often rewritten as a JOIN for that reason."
          ]
        },
        {
          type: "code",
          id: "sub-5",
          title: "EXISTS — checking for existence, not values",
          code: "SELECT name\nFROM employees e\nWHERE EXISTS (\n  SELECT 1 FROM departments d WHERE d.dept_id = e.dept_id\n);",
          note: "EXISTS doesn't care what the inner query returns — only whether it returns any row at all. This is the same \"find matched rows\" idea as INNER JOIN, just phrased as a question instead of a merge. It's often faster than IN for large subqueries, because the database can stop at the first match instead of building the whole list."
        },
        {
          type: "concept",
          id: "sub-6",
          title: "A subquery in SELECT — one value per row",
          body: "Subqueries can also sit inside SELECT itself: SELECT name, (SELECT dept_name FROM departments d WHERE d.dept_id = e.dept_id) AS dept FROM employees e; — runs the inner query once per outer row and drops the single value into a new column. This does the same job as a JOIN, but only when you need exactly one extra column and the relationship is one-to-one; for anything more, a JOIN is clearer and usually faster."
        },
        {
          type: "table",
          id: "sub-7",
          title: "Pattern to look for",
          headers: ["English signal", "SQL"],
          rows: [
            ["\"more than the average\", \"above the overall total\"", "WHERE col > (SELECT AVG/SUM(...))"],
            ["\"in [some other filtered list]\"", "WHERE col IN (SELECT ...)"],
            ["\"who has at least one [related thing]\"", "WHERE EXISTS (SELECT 1 FROM ...)"],
            ["\"compared to their own group's average\"", "correlated subquery"]
          ]
        },
        {
          type: "qa",
          id: "sub-8",
          question: "What's the difference between a subquery and a JOIN?",
          answer: "Both combine information from more than one query/table, but a JOIN merges rows side by side into one wider result set, while a subquery's result feeds into a condition (or a single column) in the outer query. Many subqueries can be rewritten as JOINs and often run faster that way, especially correlated ones."
        },
        {
          type: "qa",
          id: "sub-9",
          question: "What's a correlated subquery, and why can it be slow?",
          answer: "A subquery that references a column from the outer query, so it can't be evaluated once and reused — it potentially re-runs for every row the outer query looks at. On a large table that's a lot of repeated work, which is why they're often rewritten as JOINs."
        },
        {
          type: "qa",
          id: "sub-10",
          question: "When would you use EXISTS instead of IN?",
          answer: "When you only care whether a match exists, not what value it has — EXISTS can stop searching at the first match, while IN typically has to build the entire list first. For large subqueries EXISTS is usually the faster, more idiomatic choice."
        },
        {
          type: "concept",
          id: "sub-11",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "A subquery is a SELECT nested inside another query — non-correlated ones run once and produce a value or list the outer query uses; correlated ones reference the outer row and re-run per row, which is why they're often rewritten as JOINs.",
            "Subquery ek SELECT hoti hai jo doosri query ke andar chalti hai — non-correlated subquery sirf ek dafa chalti hai aur ek value ya list deti hai, jabke correlated subquery outer row ka column use karti hai is liye har row ke liye dobara chalti hai — isi wajah se aksar isay JOIN mein badal dete hain."
          ]
        }
      ]
    },

    {
      title: "Topic 18 · Window Functions — aggregates without collapsing rows",
      items: [
        {
          type: "concept",
          id: "win-1",
          title: "The gap GROUP BY leaves",
          body: [
            "GROUP BY collapses rows — ask for AVG(salary) per city and you get one row per city, not one row per employee. But a lot of real questions want both: the individual row, plus a number computed across a group of rows.",
            "\"Show every employee, along with their department's average salary.\" \"Rank employees by salary within their city.\" GROUP BY can't do this — it destroys the individual rows on the way to the answer. **Window functions compute an aggregate across a group of rows without collapsing them.**"
          ]
        },
        {
          type: "code",
          id: "win-2",
          title: "The shape: OVER() and PARTITION BY",
          code: "SELECT name, city, salary,\n       AVG(salary) OVER (PARTITION BY city) AS city_avg\nFROM employees;\n\n-- name    city        salary   city_avg\n-- Ali     Lahore      50000    55666.67\n-- Bilal   Lahore      62000    55666.67\n-- Ayesha  Lahore      55000    55666.67\n-- Sara    Karachi     75000    83000\n-- Usman   Karachi     91000    83000\n-- Hina    Islamabad   48000    48000",
          note: "Six rows in, six rows out — nobody got collapsed. PARTITION BY city tells AVG(salary) to compute separately per city, but OVER() is what makes it a window function instead of a regular aggregate: it says \"compute this across a window of related rows, then attach the answer to every row in that window,\" instead of squashing them into one row like GROUP BY would."
        },
        {
          type: "concept",
          id: "win-3",
          important: true,
          title: "PARTITION BY vs GROUP BY — the actual distinction",
          body: [
            "They compute the same numbers (an average per city, here), but **GROUP BY reduces the row count to one-per-group; PARTITION BY keeps every original row and just attaches the group's number to each one.**",
            "Rule of thumb: if you need the aggregate alongside full row detail, that's a window function. If you only need the aggregate itself, GROUP BY is simpler and usually what you want."
          ]
        },
        {
          type: "code",
          id: "win-4",
          title: "ROW_NUMBER — a running count within each group",
          code: "SELECT name, city, salary,\n       ROW_NUMBER() OVER (PARTITION BY city ORDER BY salary DESC) AS rank_in_city\nFROM employees;\n\n-- name    city        salary   rank_in_city\n-- Usman   Karachi     91000    1\n-- Sara    Karachi     75000    2\n-- Bilal   Lahore      62000    1\n-- Ayesha  Lahore      55000    2\n-- Ali     Lahore      50000    3\n-- Hina    Islamabad   48000    1",
          note: "ORDER BY inside OVER() controls the ranking order within each partition, not the final row order of the output. Numbers restart at 1 for every new city — that's PARTITION BY at work again."
        },
        {
          type: "concept",
          id: "win-5",
          important: true,
          title: "ROW_NUMBER vs RANK vs DENSE_RANK — the tie-breaking question",
          body: [
            "All three number rows within a partition, but they disagree about ties. If two employees in the same city had the identical salary: **ROW_NUMBER gives them different numbers anyway (1, 2, arbitrarily), RANK gives them the same number and then skips the next one (1, 1, 3), DENSE_RANK gives them the same number without skipping (1, 1, 2).**",
            "Which one you want depends on the question: \"give me exactly N rows\" → ROW_NUMBER. \"Show the real competition ranking, gaps and all\" → RANK. \"Show distinct rank tiers with no gaps\" → DENSE_RANK."
          ]
        },
        {
          type: "code",
          id: "win-6",
          title: "A very common interview shape: top N per group",
          code: "SELECT * FROM (\n  SELECT name, city, salary,\n         ROW_NUMBER() OVER (PARTITION BY city ORDER BY salary DESC) AS rn\n  FROM employees\n) ranked\nWHERE rn = 1;\n\n-- name    city        salary   rn\n-- Usman   Karachi     91000    1\n-- Bilal   Lahore      62000    1\n-- Hina    Islamabad   48000    1",
          note: "\"Highest earner per city\" — the window function alone can't be filtered directly in WHERE (it hasn't been computed yet at that stage of the query), so it gets wrapped in a subquery and filtered from the outside. This exact pattern — window function, then filter in an outer query — is one of the most common real interview questions: \"find the top N per group.\""
        },
        {
          type: "table",
          id: "win-7",
          title: "Pattern to look for",
          headers: ["English signal", "SQL"],
          rows: [
            ["\"along with their group's average/total\"", "AGG(...) OVER (PARTITION BY ...)"],
            ["\"rank within each [category]\"", "RANK() / DENSE_RANK() OVER (PARTITION BY ...)"],
            ["\"the Nth highest per group\", \"top N per category\"", "ROW_NUMBER() in a subquery, filtered by rn"],
            ["\"running total\", \"cumulative sum\"", "SUM(...) OVER (ORDER BY ...)"]
          ]
        },
        {
          type: "qa",
          id: "win-8",
          question: "What's the difference between a window function and GROUP BY?",
          answer: "GROUP BY collapses each group into a single output row. A window function (using OVER()) computes the same kind of aggregate but attaches the result to every original row instead of collapsing them — you keep full row detail and the aggregate at the same time."
        },
        {
          type: "qa",
          id: "win-9",
          question: "Difference between RANK, DENSE_RANK and ROW_NUMBER?",
          answer: "All three number rows within a partition. ROW_NUMBER always gives unique, sequential numbers even for ties. RANK gives tied rows the same number but skips the following number(s). DENSE_RANK gives tied rows the same number without skipping any."
        },
        {
          type: "qa",
          id: "win-10",
          question: "How would you find the top 2 highest-paid employees per department?",
          answer: "Wrap a ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) in a subquery, then filter the outer query WHERE rn <= 2. You can't filter the window function directly in the same SELECT's WHERE clause, because it hasn't been computed at that stage yet."
        },
        {
          type: "concept",
          id: "win-11",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "Window functions compute an aggregate or ranking across a group of rows (PARTITION BY) without collapsing them the way GROUP BY does — every original row survives, with the computed value attached.",
            "Window functions kisi group ki rows par aggregate ya ranking nikalte hain (PARTITION BY se) magar GROUP BY ki tarah rows ko collapse nahi karte — har original row bachi rehti hai, bas uske sath computed value attach ho jati hai."
          ]
        }
      ]
    },

    {
      title: "Topic 19 · UNION, UNION ALL & CTEs",
      items: [
        {
          type: "concept",
          id: "uc-1",
          title: "UNION — stacking two result sets",
          body: [
            "UNION combines the rows from two separate SELECT queries into one result set, stacked on top of each other — not side by side like a JOIN.",
            "Both queries must return **the same number of columns, in compatible types** — SQL is matching them up by position, not by name, so column 1 of the first query lines up with column 1 of the second, and so on."
          ]
        },
        {
          type: "code",
          id: "uc-2",
          important: true,
          title: "UNION removes duplicates, UNION ALL doesn't",
          code: "SELECT city FROM employees WHERE city = 'Lahore'\nUNION\nSELECT 'Lahore';\n\n-- city\n-- Lahore        (only once)\n\nSELECT city FROM employees WHERE city = 'Lahore'\nUNION ALL\nSELECT 'Lahore';\n\n-- city\n-- Lahore\n-- Lahore\n-- Lahore\n-- Lahore        (all four — three employees plus the literal)",
          note: "**UNION quietly de-duplicates the combined rows — which means it has to compare and sort everything first, making it slower. UNION ALL just concatenates the two result sets and keeps every row, duplicates included, which is faster.** Default to UNION ALL unless you specifically need duplicates removed; it's the more common real-world choice."
        },
        {
          type: "concept",
          id: "uc-3",
          title: "Why does this even come up? — combining different sources",
          body: "The realistic use case is combining rows from genuinely different tables or filtered sets that share a shape — e.g. a list of \"current employees\" UNION a list of \"contractors\" into one combined staff report, or last year's orders UNION this year's orders into one timeline. It's for putting two similar-shaped result sets in one list, not for relating two tables the way JOIN does."
        },
        {
          type: "concept",
          id: "uc-4",
          important: true,
          title: "CTEs — naming a subquery, with WITH",
          body: [
            "A Common Table Expression (CTE) lets you name a subquery up front with WITH, then refer to that name later in the query as if it were a real table: WITH high_earners AS (SELECT * FROM employees WHERE salary > 60000) SELECT name FROM high_earners WHERE city = 'Lahore';",
            "**It does the same job as a subquery in FROM — it's a query used as a table — but written before the main query instead of nested inside it, which is why CTEs read top-to-bottom instead of inside-out.** For anything beyond a one-line filter, this reads far more like plain English than a deeply nested subquery does."
          ]
        },
        {
          type: "code",
          id: "uc-5",
          title: "A CTE built on a window function — a very common real pattern",
          code: "WITH ranked AS (\n  SELECT name, city, salary,\n         ROW_NUMBER() OVER (PARTITION BY city ORDER BY salary DESC) AS rn\n  FROM employees\n)\nSELECT name, city, salary\nFROM ranked\nWHERE rn = 1;",
          note: "This is the exact \"top earner per city\" query from the window functions topic, just written as a CTE instead of a nested subquery. Same result, same engine underneath — CTEs are readability, not a different capability."
        },
        {
          type: "concept",
          id: "uc-6",
          title: "Can a CTE reference itself? — recursive CTEs, briefly",
          body: "Yes — a recursive CTE can reference its own name inside its definition, which is how SQL handles hierarchical data (an org chart: who reports to whom, walked all the way up or down) or generating a sequence of numbers/dates. It's a deeper topic on its own; for interviews, knowing it exists and what it's for (walking a hierarchy or a chain of relationships) is usually enough unless the role is data-engineering-heavy."
        },
        {
          type: "table",
          id: "uc-7",
          title: "Pattern to look for",
          headers: ["English signal", "SQL"],
          rows: [
            ["\"combine these two lists/reports into one\"", "UNION / UNION ALL"],
            ["\"...but don't show duplicates\"", "UNION"],
            ["\"...keep everything, duplicates are fine\"", "UNION ALL"],
            ["\"first compute X, then use that to find Y\"", "WITH ... AS (...) — a CTE"],
            ["\"walk up/down a hierarchy\", \"org chart\", \"chain of managers\"", "recursive CTE"]
          ]
        },
        {
          type: "qa",
          id: "uc-8",
          question: "Difference between UNION and UNION ALL?",
          answer: "Both stack two result sets with the same column shape on top of each other. UNION removes duplicate rows from the combined result, which requires extra work (sorting/comparing); UNION ALL keeps every row including duplicates and is faster. Use UNION ALL unless you specifically need de-duplication."
        },
        {
          type: "qa",
          id: "uc-9",
          question: "What's a CTE, and how is it different from a subquery?",
          answer: "A CTE (WITH name AS (...)) names a query up front so you can reference it later like a table, making the overall query read top-to-bottom. A regular subquery is nested inline inside the query that uses it. They can often do the same job — CTEs are mainly a readability improvement, though recursive CTEs (self-referencing) can do things a plain subquery can't."
        },
        {
          type: "concept",
          id: "uc-10",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "UNION stacks two same-shaped result sets and removes duplicates; UNION ALL does the same but keeps everything and is faster. A CTE (WITH ... AS) names a subquery up front so the rest of the query can read top-to-bottom instead of nesting inside-out.",
            "UNION do result sets ko stack karta hai aur duplicates hata deta hai; UNION ALL same kaam karta hai magar sab kuch rakhta hai aur faster hota hai. CTE (WITH ... AS) ek subquery ko pehle naam de deta hai taake baaqi query top-to-bottom parhi ja sake, nested ki bajaye."
          ]
        }
      ]
    },

    {
      title: "Topic 20 · Transactions & Isolation Levels",
      items: [
        {
          type: "concept",
          id: "txn-1",
          title: "Starting and ending a transaction",
          body: [
            "A transaction groups multiple statements into one all-or-nothing unit — you already met this idea in ACID (Topic 12). In real SQL, you control the boundary explicitly: BEGIN TRANSACTION; ... your statements ...; COMMIT; — or ROLLBACK; instead of COMMIT if something went wrong.",
            "**COMMIT makes every change in the transaction permanent. ROLLBACK undoes every change in the transaction, as if none of it happened.** Nothing is final until COMMIT runs."
          ]
        },
        {
          type: "code",
          id: "txn-2",
          title: "The classic example — a transfer, written properly",
          code: "BEGIN TRANSACTION;\n\nUPDATE employees SET salary = salary - 5000 WHERE name = 'Ali';\nUPDATE employees SET salary = salary + 5000 WHERE name = 'Ahmed';\n\nCOMMIT;",
          note: "If the second UPDATE fails for any reason — a crash, a constraint violation — the whole block can be rolled back instead of leaving Ali's money gone with nowhere for it to have arrived. This is Atomicity, made concrete: the two UPDATEs live or die together."
        },
        {
          type: "concept",
          id: "txn-3",
          important: true,
          title: "The problem isolation levels actually solve",
          body: [
            "Isolation (the \"I\" in ACID) says transactions shouldn't interfere with each other — but \"shouldn't interfere\" can mean stricter or looser things, and stricter always costs more performance. **Isolation levels are a dial: how much are two transactions allowed to see of each other's in-progress, uncommitted work?**",
            "Every real database defaults to some middle setting, not the strictest one — because the strictest setting makes every transaction wait for every other one, which is slow at scale."
          ]
        },
        {
          type: "table",
          id: "txn-4",
          title: "The three classic problems isolation levels prevent",
          headers: ["Problem", "What happens"],
          rows: [
            ["Dirty read", "Transaction A reads a change Transaction B made but hasn't committed yet — then B rolls back, and A read data that never actually existed."],
            ["Non-repeatable read", "Transaction A reads the same row twice in one transaction and gets two different values, because B committed a change to that row in between."],
            ["Phantom read", "Transaction A runs the same WHERE query twice and gets a different set of rows the second time, because B inserted or deleted a row that matches the condition in between."]
          ],
          note: "Each isolation level is defined by which of these three it allows and which it prevents — stricter levels prevent more of them, at the cost of more locking/waiting."
        },
        {
          type: "table",
          id: "txn-5",
          title: "The four standard isolation levels",
          headers: ["Level", "Allows"],
          rows: [
            ["READ UNCOMMITTED", "dirty reads, non-repeatable reads, phantom reads — the loosest, rarely used"],
            ["READ COMMITTED", "blocks dirty reads; non-repeatable and phantom reads still possible — most databases' default"],
            ["REPEATABLE READ", "blocks dirty and non-repeatable reads; phantom reads still possible in some databases"],
            ["SERIALIZABLE", "blocks all three — transactions behave as if run one at a time, strictest and slowest"]
          ],
          note: "**You don't need to memorize this table cold — you need the shape of it: the levels are ordered from loosest/fastest to strictest/slowest, and each stricter level closes off one more way for transactions to see each other's in-progress work.**"
        },
        {
          type: "concept",
          id: "txn-6",
          title: "Why not just always use SERIALIZABLE?",
          body: "Because it forces transactions to effectively queue up behind each other whenever they touch overlapping data, which kills throughput under real concurrent load. Most applications use READ COMMITTED (the common default) and only reach for something stricter on the specific operations where a dirty or non-repeatable read would actually cause a real bug — like financial balances or inventory counts."
        },
        {
          type: "qa",
          id: "txn-7",
          question: "What's the difference between COMMIT and ROLLBACK?",
          answer: "COMMIT makes every change in the current transaction permanent and visible to other transactions. ROLLBACK undoes every change made since the transaction began, as if none of the statements had run."
        },
        {
          type: "qa",
          id: "txn-8",
          question: "What's a dirty read?",
          answer: "When a transaction reads data that another transaction has changed but not yet committed. If that other transaction then rolls back, the first transaction acted on data that never really existed. READ UNCOMMITTED allows this; READ COMMITTED and stricter levels prevent it."
        },
        {
          type: "qa",
          id: "txn-9",
          question: "What isolation level do most databases use by default, and why?",
          answer: "READ COMMITTED, in most systems — it's a practical middle ground: it prevents dirty reads (the most dangerous, cheapest-to-prevent problem) while still allowing enough concurrency that performance doesn't fall apart under real traffic."
        },
        {
          type: "concept",
          id: "txn-10",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "A transaction is an all-or-nothing block ended by COMMIT (keep it) or ROLLBACK (undo it); isolation levels are a dial controlling how much of one transaction's in-progress work another transaction is allowed to see, trading correctness guarantees against performance.",
            "Transaction ek all-or-nothing block hoti hai jo COMMIT (rakhna) ya ROLLBACK (wapas lena) par khatam hoti hai; isolation levels ek dial ki tarah hain jo control karte hain ke ek transaction doosri ke adhoore kaam ko kitna dekh sakti hai — jitni strict isolation, utni behtar correctness magar utni hi kam speed."
          ]
        }
      ]
    },

    {
      title: "Topic 21 · SQL vs NoSQL",
      items: [
        {
          type: "concept",
          id: "nosql-1",
          title: "What SQL databases assume",
          body: [
            "Everything covered so far — employees, departments, JOINs, normalization — assumes a relational database: data lives in tables with a fixed schema (every row has the same columns), and relationships between tables are explicit (foreign keys).",
            "**That structure is exactly what makes JOINs, constraints, and ACID transactions possible — the database can enforce rules because it knows the shape of the data in advance.**"
          ]
        },
        {
          type: "concept",
          id: "nosql-2",
          title: "What NoSQL relaxes",
          body: [
            "NoSQL is an umbrella term for databases that drop the fixed-table-and-JOIN model in exchange for flexibility or scale. The four common flavors: **document stores** (MongoDB — each record is a flexible JSON-like document), **key-value stores** (Redis — a giant hash map, get/set by key), **wide-column stores** (Cassandra — rows can have different columns from each other), and **graph databases** (Neo4j — built around relationships/edges as first-class citizens, not foreign keys).",
            "The common thread: **no fixed schema enforced by the database, and typically no JOINs** — related data is often duplicated or nested inside one document instead of split across normalized tables."
          ]
        },
        {
          type: "table",
          id: "nosql-3",
          title: "The actual trade-off",
          headers: ["SQL (relational)", "NoSQL"],
          rows: [
            ["Fixed schema, enforced by the database", "Flexible/no schema — each record can differ"],
            ["Data normalized across related tables", "Data often denormalized/nested together"],
            ["JOINs combine data at query time", "Related data is usually pre-combined at write time"],
            ["Strong consistency, full ACID transactions", "Often prioritizes availability/speed over strict consistency"],
            ["Scales vertically first, then via sharding", "Built from the ground up to shard/scale horizontally"]
          ],
          note: "Neither is \"better\" — **it's a trade of consistency and structure for flexibility and horizontal scale, made deliberately based on what the application actually needs.**"
        },
        {
          type: "concept",
          id: "nosql-4",
          important: true,
          title: "When SQL is the right call",
          body: "When relationships between entities matter and must stay correct — orders linked to customers linked to payments, anything involving money, anything where \"this row must point to something real\" (referential integrity) is non-negotiable. Normalization and JOINs exist precisely to keep this kind of data consistent."
        },
        {
          type: "concept",
          id: "nosql-5",
          important: true,
          title: "When NoSQL is the right call",
          body: "When the data doesn't fit neatly into fixed rows/columns, when the schema will change often and you don't want a migration every time, or when you need to scale reads/writes horizontally across many servers more easily than a relational database typically allows (this connects directly back to sharding — Topic 13). Common fits: user activity logs, product catalogs with wildly different attributes per item, session/cache data, real-time chat."
        },
        {
          type: "concept",
          id: "nosql-6",
          title: "This isn't actually an either/or in most real systems",
          body: "Most real production systems use both — a relational database for the core transactional data (users, orders, payments) where correctness matters most, and something like Redis or MongoDB alongside it for caching, session storage, or high-volume flexible data. Knowing when to reach for which is the actual skill being tested, not picking a permanent side."
        },
        {
          type: "qa",
          id: "nosql-7",
          question: "What's the main structural difference between SQL and NoSQL databases?",
          answer: "SQL databases enforce a fixed schema and relate data across normalized tables using JOINs and foreign keys. NoSQL databases typically have no enforced schema and store related data together (denormalized) rather than joining it at query time — trading some consistency guarantees for flexibility and easier horizontal scaling."
        },
        {
          type: "qa",
          id: "nosql-8",
          question: "When would you choose NoSQL over a relational database?",
          answer: "When the data's shape varies a lot or changes often, when you need to scale writes across many servers more easily than sharding a relational database, or when strict relational consistency isn't the priority — e.g. logs, caches, flexible product catalogs, session data."
        },
        {
          type: "qa",
          id: "nosql-9",
          question: "Does using NoSQL mean giving up on data integrity?",
          answer: "Not entirely, but you give up the database automatically enforcing it for you the way foreign keys and constraints do in SQL — with NoSQL, more of that correctness responsibility shifts to the application code."
        },
        {
          type: "concept",
          id: "nosql-10",
          important: true,
          takeaway: true,
          title: "Key takeaway",
          body: [
            "SQL databases enforce a fixed, normalized schema with JOINs and strong consistency; NoSQL databases trade that structure for flexibility and easier horizontal scaling — most real systems use both, for different parts of the data.",
            "SQL databases ek fixed, normalized schema enforce karte hain JOINs aur strong consistency ke sath; NoSQL databases us structure ko flexibility aur asaan horizontal scaling ke liye trade kar dete hain — zyada tar real systems dono ko istemal karte hain, data ke mukhtalif hisso ke liye."
          ]
        }
      ]
    }
  ]
};
