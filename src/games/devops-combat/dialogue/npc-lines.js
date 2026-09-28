// City NPC dialogue pools (consumed by the dialogue engine in main.js).

  // Content data: per-NPC intro + extra plain lines + conditional (reactive) lines.
  // The 8 original topic-tip lines of each NPC stay in NPC_ROSTER above; the
  // merge step below turns everything into npc.dialogue = { intro, lines }.
export var NPC_DIALOGUE_DATA = {
    priya: {
      intro: "Oh, a new face! I'm Priya, I run the cafe. Sit, breathe, and ask me anything about Git. The first question is on the house.",
      more: [
        "Between you and me, the flat white is easy. Getting Zoe's order right on a Monday is the real challenge.",
        "I name every coffee order after a git command. Mine is a hotfix: strong, fast, and slightly panicked.",
        "Sofia keeps sending over croissants to test. I'm a professional, so I test them thoroughly. Every single one.",
        "The Library next door is so quiet I can hear my milk steamer apologise for itself.",
        "Kenji sits by the window with his headphones on for hours. I think he's actually just hiding from his own merge conflicts.",
        "Ever tried to draw a branch graph on a napkin? Mine looks like a very confused octopus.",
        "Regulars are my favourite part. I know Marcus is coming when I hear someone panting at the door.",
        "Steam, grind, tamp, pour. Funny how every job turns out to be a small pipeline if you squint.",
        "Someone left a lovely note on my tip jar: 'git blame me for the good coffee.' I laughed for a full minute.",
        "I hear the New City has two enormous towers now. I'd love to open a tiny cafe up in one of them.",
        "Chidi zooms past my window a dozen times a day. Either he's very busy or very lost. Possibly both."
      ],
      cond: [
        { t: "Working late, {hero}? Let me make you something warm. The night shift crowd is my favourite.", if: { night: true } },
        { t: "{bosses} bosses down, {hero}! The whole cafe was talking about it over breakfast. You're basically famous.", if: { bosses: 3 } },
        { t: "Level {level}! I'd say the drinks are on me, but honestly the drinks are always on me. Well done, though.", if: { minLevel: 5 } },
        { t: "A {streak}-day streak? That's more consistent than my morning rush. I'm genuinely impressed.", if: { streak: 3 } },
        { t: "Someone said there's a party up on the tower roof! Do they have an espresso machine up there? Asking for professional reasons.", if: { visited: 'roofA' } },
        { t: "Nova, right? I love the ponytail. You look like someone who writes very tidy commit messages.", if: { hero: 'nova' } }
      ]
    },
    zoe: {
      intro: "Oh. Hi. I'm Zoe. I'm on my break, technically, which means I'm not supposed to talk about pipelines. Ask me about pipelines.",
      more: [
        "My lanyard says 'Senior Something.' Nobody has told me what the something is. I've stopped asking.",
        "Fourteen meetings today. Four could have been an email. Two could have been a shrug.",
        "Priya's coffee is the only reason I still believe in mornings. Barely.",
        "I used to love Fridays. Then I learned about Friday deploys. Now I just love Saturdays.",
        "Yuki says the Library is the quietest place in town. I say it's the only place my phone can't find me.",
        "Every office has a printer that hates someone. Ours has chosen me. We're in a long, ongoing feud.",
        "My desk plant is doing better than my inbox. That's not a high bar, but it's a bar.",
        "Walt says he retired from incident response. I say nobody retires from it, they just stop getting paged.",
        "My idea of relaxing is watching a pipeline go green. Sad? Maybe. Satisfying? Absolutely.",
        "Someone put a sticker on the office fridge: 'It works on my machine.' I wanted to frame it.",
        "The Bank has a queue. The cafe has a queue. The whole town is one big pipeline, honestly."
      ],
      cond: [
        { t: "It's night and you're still out here? Fine, respect. Fellow member of the 'one more thing' club.", if: { night: true } },
        { t: "{bosses} bosses? Okay, that's real progress. I'll tell my manager you're the reason I got a good review. Kidding. Mostly.", if: { bosses: 4 } },
        { t: "Level {level}, huh. You're moving fast. I'm still working on level 'finish this ticket.'", if: { minLevel: 6 } },
        { t: "{streak} days in a row. Do you even sleep? Also, teach me your ways.", if: { streak: 4 } },
        { t: "A party on the tower roof? Of course. The one time I get invited somewhere, I'm on a deadline.", if: { visited: 'roofA' } },
        { t: "Oh, it's Byte. Confident, a little smug, very productive. I'll allow it.", if: { hero: 'byte' } }
      ]
    },
    kenji: {
      intro: "Whoa, hi! Sorry, headphones. I'm Kenji, I'm studying containers and honestly I can't stop talking about them. Wanna hear something cool?",
      more: [
        "I'm building a tiny app just to put it in a container. The app is a hello-world. The container is the whole point.",
        "My headphones are playing lo-fi beats at exactly the tempo of a build progress bar. It's weirdly calming.",
        "The Armory sells swords, but a container image is the real starter weapon. Small, sharp, and it ships anywhere.",
        "Priya says I've been in her cafe for six hours. In my defense, the wifi and the vibes were both excellent.",
        "Yuki lent me a book on security. I read the first page and immediately added a non-root user to my Dockerfile.",
        "My first Docker image was two gigabytes. Multi-stage builds taught me shame. Then they taught me better.",
        "Everyone says 'it works on my machine.' With containers, it's 'it works in my image,' which is way more convincing.",
        "I named my test container 'bob' and now I feel bad every time I delete it. Rest in peace, bob.",
        "Marcus jogs past and yells 'Hup hup!' Every time. I've started answering 'Push pull!' He doesn't get it.",
        "Someone told me there's a whole New City out east with two towers. Imagine the container fleet they run.",
        "I dream in Dockerfiles now. Last night I forgot a COPY line and woke up in a cold sweat."
      ],
      cond: [
        { t: "It's dark out and I'm still here, still building. Docker doesn't sleep, so neither do I. Send snacks.", if: { night: true } },
        { t: "{bosses} bosses?! You're like a rolling release. Always shipping something new!", if: { bosses: 3 } },
        { t: "Level {level} already? Your progress is so fast, it would make a great cached layer.", if: { minLevel: 5 } },
        { t: "Ha, Nova! You'd be great with containers. Earnest, tidy, and never afraid to try 'docker run' one more time.", if: { hero: 'nova' } },
        { t: "Wait, there's a party on the tower roof?! Do they need a container guy? I bring my own headphones.", if: { visited: 'roofB' } },
        { t: "You've got {coins} coins? Spend a few on an upgrade. Even a little image gets better with a good base.", if: { coins: 300 } }
      ]
    },
    yuki: {
      intro: "Welcome. I am Yuki, the librarian. Please keep your voice low and your curiosity high. Today, we are reading about security.",
      more: [
        "Every book here has a story. Some of them have a due date. The due date is usually the more suspenseful part.",
        "I shelve books by topic, then by author, then by mood. Nobody knows about the mood shelf. Please keep it secret.",
        "Priya's cafe smells of coffee. The Library smells of paper. I know which one I'd choose for a rainy afternoon.",
        "Kenji borrowed my security book and returned it with sticky notes on every page. Very thorough. Slightly sticky.",
        "The best way to remember something is to explain it aloud. Preferably in a whisper.",
        "A quiet reading room is a form of access control, really. Only the calm may enter.",
        "Marcus once jogged into the Library by mistake. He apologised in a whisper so polite I nearly forgave the sweat.",
        "There is a small map tucked inside the Trophy Hall guidebook. I have studied it more than I will admit.",
        "Tea is best with a chapter of a book. Coffee is best with a deadline. I have made my choice.",
        "Lily asked me if books ever get tired. I told her they only rest between readers. She seemed satisfied.",
        "Old Tom likes to tell me the ending of stories before I read them. I have politely stopped him thirty-one times."
      ],
      cond: [
        { t: "The Library closes soon, yet you walk in the dark. Be careful, {hero}. Even peaceful streets are worth watching.", if: { night: true } },
        { t: "{bosses} bosses have fallen to you. A remarkable chapter. I have set aside a small shelf for your progress.", if: { bosses: 3 } },
        { t: "Level {level}. Knowledge compounds, {hero}, the same way interest does at the Bank.", if: { minLevel: 5 } },
        { t: "{streak} days of study in a row. I find this deeply admirable. Consistency is the quiet superpower.", if: { streak: 3 } },
        { t: "I heard laughter from the tower roof. I do not usually approve of noise, but I hope it was joyful.", if: { visited: 'roofA' } },
        { t: "Sage. Calm and unbothered. We would get along very well in the reading room.", if: { hero: 'sage' } }
      ]
    },
    sofia: {
      intro: "Hello, hello! I'm Sofia, the pastry chef! Everything I bake is a config file in disguise. Hungry, or just curious? Both is fine!",
      more: [
        "A good croissant has about eighty layers, and every one of them is hand-folded. That's a nested config if I ever saw one!",
        "I test each recipe three times before it goes in the window. That's my pipeline, and it tastes delicious.",
        "Priya swears my almond cake is the reason people come to her cafe. I swear it's her coffee. We're both right.",
        "Oh, the smell of butter at five in the morning! It's better than any alarm clock.",
        "Ravi keeps trying to trade me a samosa for a cinnamon roll. It's the best negotiation in town, and I always accept.",
        "Once I mixed up salt and sugar. The cake looked perfect. That, my friend, was my first production incident.",
        "Whisk, fold, rest, bake. If a step is missing, the cake tells on you. Config files are the same!",
        "The General Store keeps selling me tiny decorations. I've got a shelf of sugar flowers and zero regrets.",
        "Big Sam ordered forty muffins for his crew and asked for a 'load balanced' box. Somehow I understood him.",
        "Marcus asked for a low-carb pastry. I gave him a very small pastry. He didn't see the joke, but he ate it.",
        "Nana Ilse sends me herbs from her garden. My rosemary bread is famous now. Fame has never smelled so good."
      ],
      cond: [
        { t: "Oh, it's late, and you're hungry? Stay, stay! I always bake a few extra for the night owls.", if: { night: true } },
        { t: "{bosses} bosses! That deserves cake. I'm baking you a small celebration one. Don't tell Priya, she'll want a slice.", if: { bosses: 3 } },
        { t: "Level {level}! Every level is like another layer in a croissant. Beautiful, flaky, and a bit buttery!", if: { minLevel: 5 } },
        { t: "{streak} days in a row! That's a streak I'd frame in the bakery window, right next to my best loaf.", if: { streak: 3 } },
        { t: "A roof party?! Please tell me there's dessert. I'll bring a tray. Actually, I'll bring three.", if: { visited: 'roofA' } },
        { t: "Ooh, Nova! You look like someone who'd love my strawberry tart. Sweet, bright, and a little bit fancy.", if: { hero: 'nova' } }
      ]
    },
    marcus: {
      intro: "Hey! Marcus! Don't mind the sweat, it's just my cardio settings. Keep up if you can, I'll teach you Linux while we jog!",
      more: [
        "I run the loop around town before sunrise. Same route, every day, and the terminal is exactly like that. Repetition builds power.",
        "Stretching first, sprinting second. It's the same with scripts: set up the environment before you run anything wild.",
        "Priya makes me a green smoothie after every run. I pretend to love it. She pretends not to know.",
        "My headband isn't a fashion statement. It's sweat management. Also, it looks great.",
        "Ernie stands by the Training Grounds like a rock. I once tried to jog past him with a straight face. Failed.",
        "The Training Grounds are my second home. Well, my first home is the terminal, but they're neighbours.",
        "Big Sam lifts serious weights. I lift serious commands. Both need a spotter, though: mine is `man`.",
        "Kenji said my jogging pace looks like a steady cron job. I've decided that's a compliment.",
        "Rest days matter, my friend. Even servers need a reboot sometimes.",
        "Rumour has it there's a forest path running out east. I'm planning a trail run. Bring water.",
        "I keep a little notebook of my best shell one-liners. It's fatter than my running log. No regrets."
      ],
      cond: [
        { t: "A night run and a night hero, huh? Perfect. Fewer crowds, cooler air, and the terminal looks better in the dark.", if: { night: true } },
        { t: "{bosses} bosses down! That's some serious cardio for the brain, champ!", if: { bosses: 3 } },
        { t: "Level {level}! Look at that progress! You're training like a pro, and I'm proud of you.", if: { minLevel: 5 } },
        { t: "{streak} days in a row! That's the sort of consistency I preach. Daily practice beats heroic bursts.", if: { streak: 3 } },
        { t: "A party on the tower roof? Sounds like a stair workout with a snack table at the top. Count me in!", if: { visited: 'roofA' } },
        { t: "Byte! Confident, quick, and sharp. You'd make a great sprinter. Or a great sysadmin. Same energy.", if: { hero: 'byte' } }
      ]
    },
    bigsam: {
      intro: "Hm. New face. Name's Big Sam, site engineer. I keep the cloud standing up. Ask me something. I'll give you a straight answer.",
      more: [
        "Twenty years of pipes, cables, and servers. The cloud's just somebody else's pipes, and they still spring leaks.",
        "Don't let the cap fool you, I'm good with people. Mostly. Okay, I'm good with people who bring coffee.",
        "Priya makes my coffee strong enough to hold up a beam. That's the best compliment I know.",
        "I check every gauge twice and every alert three times. Sleep is for people whose services never page them.",
        "Ernie and I share a nod every morning. That's our entire friendship, and it's a solid one.",
        "Chidi rode past with a delivery and shouted a latency number at me. I didn't understand, but I nodded like I did.",
        "The Bank has a very sturdy vault. Best-designed redundancy in town. I might steal the idea. Legally.",
        "I keep a hard hat on the shelf. A real one. Because in tech, you never know when something's about to drop.",
        "Big machines are simple. Big systems are simple. It's the small things that leak, and they leak at 3 AM.",
        "Word is the New City towers have their own generator floor. I'd pay good money to see that room.",
        "Sofia sent me a box of muffins with a note that said 'load balanced.' Best thing I've ever been sent."
      ],
      cond: [
        { t: "Late shift, eh? Good. Night's when the real engineers work. Watch your metrics, {hero}.", if: { night: true } },
        { t: "{bosses} bosses. Not bad. In my day, we'd have called that a solid week of on-call.", if: { bosses: 3 } },
        { t: "Level {level}. You're building something sturdy. I can tell. Keep the foundation sound.", if: { minLevel: 5 } },
        { t: "{streak} days straight. Consistent. That's what I look for in a colleague, and a load balancer.", if: { streak: 3 } },
        { t: "Roof party? Hm. Somebody should check the guard rails. I'll bring a hard hat. And a cake.", if: { visited: 'roofA' } },
        { t: "You've got {coins} coins in your pocket. Smart. A little buffer is good engineering.", if: { coins: 500 } }
      ]
    },
    chidi: {
      intro: "Hey hey! Chidi! Delivery cyclist, part-time tinkerer, full-time dashboard fan! I measure everything. Even this conversation!",
      more: [
        "I put a tiny sensor on my bike. It tells me my speed, my heart rate, and how many times Marcus has waved at me.",
        "Every delivery is a distributed system. Restaurant, rider, customer: three services, one very hungry user.",
        "I'm tinkering with a bell that also pings a dashboard. It's ridiculous, and I can't stop ringing it.",
        "Priya's coffee order takes four minutes on average. I've plotted it. She doesn't know.",
        "Ravi's food cart has the best latency in town. Ask, receive, eat. Under ninety seconds!",
        "I once mapped every shortcut in town. Then a road closed and my entire route table exploded. Good learning day.",
        "My bike chain squeaks at exactly 440 hertz. I've decided it's an A. My bike is in tune.",
        "Big Sam says I go too fast. I say I'm just a very optimised request.",
        "Kenji stops me for tips on lo-fi playlists. I tell him: cache, cache, cache. He nods like it's about music.",
        "The forest path is where I test my bike. The gravel makes wonderful noise data.",
        "If the New City ever needs a rider, I'm ready. Two towers means at least four floors of hungry people."
      ],
      cond: [
        { t: "Night rides are the best. Fewer requests, cleaner data, and the town glows like a dashboard.", if: { night: true } },
        { t: "{bosses} bosses! That's a peak on my graph! I'm adding a green line just for you.", if: { bosses: 3 } },
        { t: "Level {level}! Your progress chart is going up and to the right. That's the good direction!", if: { minLevel: 5 } },
        { t: "{streak} days in a row! That's not a spike, that's a trend. I love trends!", if: { streak: 3 } },
        { t: "There's a party on the tower roof?! I have to measure the crowd. And the snacks. Mostly the snacks.", if: { visited: 'roofB' } },
        { t: "Nova! High energy, bright eyes. You'd look great in my delivery jacket. Green, like a healthy status page!", if: { hero: 'nova' } }
      ]
    },
    ernie: {
      intro: "Name's Ernie. I stand here. It's the job. You want to pass, you talk to me first. Ask about networks. That's the toll.",
      more: [
        "I've been standing here since noon. My feet have opinions. I've told them to stay professional.",
        "People say I look intimidating. I say I look well-configured.",
        "The earpiece is mostly for show. Nobody's called me in eight months. I like it that way.",
        "Marcus jogs past four times an hour. I've stopped counting. I have not stopped noticing.",
        "Sofia once handed me a cupcake. I said no. Then I said yes. Then I said nothing. It was excellent.",
        "A locked door is a promise. An open door with a guard is a conversation. I prefer conversation. Mostly.",
        "Lily asked why I never smile. I said it's a firewall. She said 'a friendly one?' I let it slide.",
        "Nobody ever compliments the bouncer. Except Priya. She gave me a free refill once. I'll remember that forever.",
        "The Training Grounds are safe with me around. The pigeons are another story. I'm watching them.",
        "I don't chase trouble. I just make it very inconvenient to try.",
        "My hobby is birdwatching. Yes. Really. Don't make it weird."
      ],
      cond: [
        { t: "Night shift. My favourite. Quiet streets, sharp ears. You should be careful out here, {hero}.", if: { night: true } },
        { t: "{bosses} bosses. Impressive. I've let far less accomplished people through this gate.", if: { bosses: 3 } },
        { t: "Level {level}. I'll allow it. You've got the look of someone who reads the logs.", if: { minLevel: 5 } },
        { t: "{streak} days straight. Reliable. I like reliable. It's why I'm still standing here.", if: { streak: 3 } },
        { t: "A party on the tower roof. Sounds like a security nightmare. I'd be there in a heartbeat. Off duty. Maybe.", if: { visited: 'roofA' } },
        { t: "Byte. You walk like you know where you're going. Suspicious. Also, respectable.", if: { hero: 'byte' } }
      ]
    },
    nanailse: {
      intro: "Well, hello there, dear! I'm Nana Ilse, and this is my garden. Sit a moment. I've got advice for you, and it's mostly free.",
      more: [
        "Good plants and good careers both need patience, sunshine, and a little bit of pruning now and then.",
        "The tomatoes are coming along beautifully this year. The slugs are also coming along beautifully. I'm negotiating.",
        "I've been gardening since before half this town was built. The roses know me better than my neighbours do.",
        "Sofia sends me buttery pastries and I send her herbs. It's an old-fashioned barter, and it works beautifully.",
        "In my day, we wrote our resumes by hand. Then we walked them across town. Your generation has it easy, dear.",
        "Lily helps me water the flowers. Half goes on the flowers, the other half on her dog. Everybody's happy.",
        "Walt and Old Tom sit on those benches and argue about the good old days. I bring them tea. They stop arguing. It's very effective.",
        "A garden teaches you to be kind to slow things. Careers do too. Nobody sprouts overnight, sweetheart.",
        "I keep seed packets in my apron pockets, just in case. You never know when a bare patch will need a friend.",
        "Ana brings me the neighbourhood gossip along with her dogs. I brew the tea. It's an arrangement.",
        "Someone told me about the New City's two towers. Grand, I'm sure. But I do hope they've got a proper garden."
      ],
      cond: [
        { t: "It's late, dear! The flowers are asleep and you should be too. Well, a bit of moonlight never hurt anyone.", if: { night: true } },
        { t: "{bosses} bosses! Goodness, you've been busy. Come, sit. I'll get you a cup of tea and a slice of pride.", if: { bosses: 3 } },
        { t: "Level {level}! Like watching a seedling become a tree. I'm so proud, dear.", if: { minLevel: 5 } },
        { t: "{streak} days of showing up. That's how you grow anything worth having, dear.", if: { streak: 3 } },
        { t: "A party on the tower roof, they say! In my day we called that a picnic. Do take a shawl, it's windy up there.", if: { visited: 'roofA' } },
        { t: "Sage, isn't it? What a lovely name for a gardener's friend. Calm and useful, just like the herb.", if: { hero: 'sage' } }
      ]
    },
    walt: {
      intro: "Hmph. Sit down or move along, kid. Name's Walt. Retired engineer. I've got a lifetime of outages to tell you about. Ready?",
      more: [
        "Back in my day, a server had a name, a personality, and a bad temper. Now they're numbers on a dashboard. Progress.",
        "I've spent more nights in server rooms than in my own bed. The chairs were worse. The coffee was terrible. I miss it.",
        "Old Tom over there thinks he tells better stories. He doesn't. His endings never land.",
        "Nana Ilse brings us tea. I'd never say it out loud, but it's the highlight of my week.",
        "Kids these days have dashboards, alerts, and fancy pipelines. We had a pager and a prayer.",
        "I once fixed a server outage with a paperclip and a lot of shouting. Don't ask. Don't try it.",
        "Retirement is fine. Nobody pages me. The pigeons are the only ones who bother me, and they don't even have an SLA.",
        "Zoe walks by and sighs. I know that sigh. That's the sound of a good engineer in a bad meeting.",
        "Big Sam keeps things running. Good man. Doesn't talk much. My kind of colleague.",
        "The bench is comfortable. That's all you can ask of a retirement plan.",
        "I hear there's a new city out east. Two towers. Sounds like a very tall outage waiting to happen. Don't tell them I said that."
      ],
      cond: [
        { t: "Night, and you're out wandering? Hmph. Reminds me of my old pager days. Get some sleep, kid.", if: { night: true } },
        { t: "{bosses} bosses? Not bad, kid. I fought bigger ones with worse tools. But not by much.", if: { bosses: 3 } },
        { t: "Level {level}. Hmph. Fine. You're doing better than I did at that age. Don't let it go to your head.", if: { minLevel: 5 } },
        { t: "{streak} days without missing one. That's how you build good habits, kid. Same as maintaining a server.", if: { streak: 3 } },
        { t: "A party on a roof? In my day, we'd have called that a fire drill. Enjoy it, though.", if: { visited: 'roofA' } },
        { t: "You've saved {coins} coins? Hmph. Sensible. Always keep a reserve. Outages are expensive.", if: { coins: 400 } }
      ]
    },
    oldtom: {
      intro: "Ahh, a fresh listener! Sit, sit! They call me Old Tom. Now, where was I? Oh yes, bash. Let me tell you a story that begins with a shebang...",
      more: [
        "I once wrote a script so long it needed its own table of contents. I've never been prouder. Or more confused.",
        "Walt tells outage stories. I tell script stories. Between us, we've covered every way a computer can go wrong.",
        "There was a Tuesday, back when I worked nights, when a single missing quote deleted a whole folder. That's how I learned to quote.",
        "The trick to a good story is timing. And the trick to a good script is also timing. And also quotes.",
        "I named my first script 'do_stuff.sh.' Twenty years later, I still don't know what it does. It still runs.",
        "The regular on this bench is me, in case you were wondering. I've been here since before the paint dried.",
        "Nana Ilse's tea is a treat. It's also the reason I forget half my stories. Very relaxing.",
        "Ana walks by with the dogs and I always say hello to them first. The dogs are better listeners than most people.",
        "You know, a good bash loop is like a good song. You just keep going until someone stops you.",
        "Once, a colleague asked me to explain a script. I said, 'Give me a moment.' That was 2009. I'm nearly ready.",
        "Lily asked why I always wear the cap. I said it holds my best ideas in. She believed me, bless her."
      ],
      cond: [
        { t: "Night-time storytelling is the best kind! Pull up a bit of bench, {hero}. Mind the crickets, they're heckling.", if: { night: true } },
        { t: "{bosses} bosses? Oh, that reminds me of a story. Or was it a script? Well, either way, congratulations!", if: { bosses: 3 } },
        { t: "Level {level}! Why, that's a bigger number than my first script had lines. And mine had many.", if: { minLevel: 5 } },
        { t: "{streak} days running, eh? Like a good cron job. Set it, forget it, keep showing up.", if: { streak: 3 } },
        { t: "A party on the tower roof! Now that reminds me of a rooftop story. But it's long. Do you have an hour? Two?", if: { visited: 'roofA' } },
        { t: "Byte! Now there's a name I'd put in a shebang. Sharp, snappy, and ready to run.", if: { hero: 'byte' } }
      ]
    },
    ana: {
      intro: "Hi there! I'm Ana, and these are my walking buddies! Say hi! I could talk about Terraform all day, and the dogs never complain!",
      more: [
        "I walk seven dogs a day. Each has a different personality, a different pace, and a different opinion about squirrels.",
        "Every dog is like a resource. You have to name them clearly, or you'll lose track by lunchtime.",
        "Nana Ilse always gives the dogs a biscuit. They now believe her garden is a five-star restaurant.",
        "Lily and her dog wave at me every day. Her dog is the most polite one in town. Hers, not mine.",
        "Ravi's cart smells amazing. I try not to look. The dogs do not try at all.",
        "The forest path is my favourite route. Lots of sniffing, lots of sunshine, minimal barking. Mostly.",
        "I keep a list of every dog's favourite park bench. It's basically a state file for happy walks.",
        "Sunny days are the best. Even the grumpiest dog wags a little in the sunshine.",
        "Walt and Old Tom are both very good with dogs. They just pretend they aren't.",
        "Terraform plans your infrastructure. I plan my walks. Both go wrong if a squirrel appears.",
        "Someday I'd like to walk dogs in the New City. Imagine the views from those towers! And the elevators!"
      ],
      cond: [
        { t: "A night walk is nice, but the dogs are all asleep. So it's just us. Isn't that peaceful?", if: { night: true } },
        { t: "{bosses} bosses! That's amazing! The dogs are wagging for you, I promise!", if: { bosses: 3 } },
        { t: "Level {level}! You're growing so fast! It's like watching a puppy become a very capable dog!", if: { minLevel: 5 } },
        { t: "{streak} days in a row! That's dedication. Just like walking the dogs, rain or shine!", if: { streak: 3 } },
        { t: "A party on the tower roof?! Can I bring the dogs? They're very well behaved. Mostly. Sort of.", if: { visited: 'roofA' } },
        { t: "Nova! The dogs love you already. That ponytail is basically a chew toy from their point of view.", if: { hero: 'nova' } }
      ]
    },
    ravi: {
      intro: "Oh! A customer? Or a friend? Either way, welcome! I'm Ravi, I run this cart. Be careful, I might talk about Kubernetes until the food gets cold.",
      more: [
        "Four burners, one griddle, seven orders. Somehow I keep it all running. It's basically my own tiny cluster.",
        "If a pod crashes, Kubernetes restarts it. If my griddle crashes, I cry for a moment and then restart it.",
        "I'm always worried I've forgotten an ingredient. Then I check. Then I check again. It's a health check, really.",
        "Sofia trades me pastries for samosas. It's the most delicious deployment strategy I've ever seen.",
        "Customers ask what's in the special sauce. I say 'a secret.' It's a Secret. Not a ConfigMap. Get it?",
        "Big Sam orders the spiciest option every time. Then he sweats, nods, and says 'not bad.' Legend.",
        "Chidi rides past and yells, 'Latency!' I yell back, 'Food's coming!' We're both correct.",
        "My cart has a small fan, but what it really needs is auto-scaling. Lunch rush is brutal.",
        "I keep worrying about tomorrow's queue. Then I remember: rolling updates. Take it one customer at a time.",
        "Ana's dogs stare at me like I'm a deity. I've never met more loyal customers. Only one small tip per day, though.",
        "Zoe calls my lunch special 'a mini mercy.' I've had it printed on the menu."
      ],
      cond: [
        { t: "It's late, and I'm still frying! Night customers are my favourite. Everyone's a little more honest after dark.", if: { night: true } },
        { t: "{bosses} bosses?! Oh my, that's incredible! Should I be nervous? I'm a little nervous. Happy nervous!", if: { bosses: 3 } },
        { t: "Level {level}! Oh no, oh wow. Everything's scaling perfectly! No, wait, that's good. Yes. Good!", if: { minLevel: 5 } },
        { t: "{streak} days in a row! That's what I call a healthy pod. Consistently ready, every time.", if: { streak: 3 } },
        { t: "A party on the tower roof?! I'd cater! Oh, but what if the cart doesn't fit in the lift? I should measure. Twice.", if: { visited: 'roofA' } },
        { t: "Sage! So calm. I need that energy. Please, just stand near me for a minute. Free samosa.", if: { hero: 'sage' } }
      ]
    },
    lily: {
      intro: "Hi! I'm Lily! This is my dog. He's the best. Do you know any cool commands? I know 'sit.' That's a command. It counts!",
      more: [
        "My dog can do three tricks. Sit, stay, and 'pretend he didn't hear me.' The last one is the hardest.",
        "Grown-ups say 'it's complicated' when they don't know. I say 'I don't know.' It's so much faster.",
        "Ernie never smiles. I'm running an experiment. So far I've made him twitch once.",
        "Nana Ilse's garden is the best. She lets me water the flowers. Sometimes I water the dog. Whoops.",
        "I asked Yuki if the Library has any books about dogs learning code. She said no. Somebody should write one.",
        "Marcus is really fast. I tried to race him. My dog won. Don't tell Marcus.",
        "Big Sam has the biggest boots I've ever seen. I tried one on. I got lost inside.",
        "I found a really cool stick today. It has three branches. That's basically a git repo, right?",
        "Kenji says containers are like lunchboxes. I love lunchboxes. Now I love containers too.",
        "Old Tom told me a story about a talking script. It went on for an hour. I still don't know how it ended.",
        "Someone said there's a forest path and a New City with towers. Can we go? Please? I'll bring snacks. And the dog."
      ],
      cond: [
        { t: "It's past my bedtime! Shh, don't tell. My dog is asleep on my shoes. Isn't it magic outside at night?", if: { night: true } },
        { t: "{bosses} bosses?! That's so many! You're like a knight! A knight with a laptop!", if: { bosses: 3 } },
        { t: "Level {level}! That's a huge number! I'm only level, um, seven? Years old. Is that a level?", if: { minLevel: 5 } },
        { t: "{streak} days in a row? I haven't even brushed my teeth that many days in a row. Wow!", if: { streak: 3 } },
        { t: "There's a party on the tower roof! Can I come? My dog wants to see the stars. And the cake.", if: { visited: 'roofA' } },
        { t: "Byte! That's such a cool name. It sounds like something my dog might do to a shoe.", if: { hero: 'byte' } }
      ]
    }
  };

