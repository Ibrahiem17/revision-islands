// Tower A roof dialogue (Skyline Bar).

// ---- Tower A roof dialogue: { intro, lines:[string | {t, if:{...}, once?}] } per person key (generated from dialogue_roofA.js) ----
export var ROOF_DIALOGUE_A = {
  "dex": {
    "intro": "Welcome to the Skyline Bar! I'm Dex. Sit anywhere, order anything, and never ask what's in the Kernel Panic.",
    "lines": [
      "Tonight's special: the Rollback. It tastes like yesterday, before everything broke.",
      "I only shake my drinks. Stirring is for people who don't mind a queue.",
      "Ice, lime, gin, and a small prayer. That's basically my whole deployment strategy.",
      "The Kernel Panic has three ingredients and a warning label. The label is mostly decorative.",
      "A good bartender is like good monitoring. You only notice when something's about to spill.",
      "That neon sign cost more than my first car. It says two words. Worth every watt.",
      "People tell bartenders everything. I'm basically an on-call therapist with a garnish tray.",
      "See the couple by the wall? Been there since sunset. I stopped charging them for the view.",
      "Priya sends me her old coffee beans for my espresso martini. Her secret is safe. I only pour.",
      "Rule one of this bar: no talking about work. Rule two: everybody talks about work by midnight.",
      "Somebody asked for a whisky neat and a pipeline plain. I gave them both a lemon wedge and a look.",
      "I can smell a bad idea from across the roof. Usually it's Oli, holding a bottle and a plan.",
      "The stars are free, the view is free, and the peanuts are free. The peanuts are mostly shells.",
      "Between us, the top shelf is very expensive water. But the bottles do sparkle nicely.",
      "I once made a drink so blue it filed a support ticket. Never again. Well. Maybe on Friday.",
      "If it rains, I'll still be serving. Umbrellas cost extra. Drinks with umbrellas are free.",
      "Lena's flirting with Theo, and I'm the only witness. I take notes. I sell nothing. Mostly.",
      {
        "t": "Working late, {hero}? Perfect. The night crowd always tips in stories.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}! That's a house-special kind of level. Pick a drink, hero. It's on the shaker.",
        "if": {
          "minLevel": 8
        }
      },
      {
        "t": "{bosses} bosses down and you still made it to my roof? Fine, the first round is on me, {hero}.",
        "if": {
          "bosses": 3
        }
      },
      {
        "t": "A {streak}-day streak? You're more regular than my regulars. Have some olives.",
        "if": {
          "streak": 3
        }
      },
      {
        "t": "Byte, huh? The smug one. I like smug. Smug tips well, and it pours its own ice.",
        "if": {
          "hero": "byte"
        }
      },
      {
        "t": "Careful with {coins} coins on this roof, {hero}. My cocktails have a way of finding a wallet.",
        "if": {
          "coins": 400
        }
      }
    ]
  },
  "mara": {
    "intro": "Oh! Hello! Mmph, sorry. We were just admiring the skyline. Very closely. Very, very closely.",
    "lines": [
      "Jonas says the view is beautiful. I looked, and he was looking at me. Cheesy, but I'll allow it.",
      "We met at a hackathon. He fixed my build and I broke his heart. Then he fixed that too.",
      "I know we should stop kissing, but the moon is watching. It would be rude to leave halfway.",
      "Please don't tell the bartender we're still here. We paid for one drink four hours ago.",
      "Do you ever get that feeling when the whole city goes quiet? That's the feeling. I'm holding onto it.",
      "Jonas writes me commit messages on sticky notes. 'Fix: missed you.' I keep every one.",
      "Yes, we're being dramatic. But you only get one first rooftop kiss. Two, if you're persistent.",
      "Everything is better with a skyline behind it. Even Mondays. Especially Mondays.",
      "He's terrible at parallel parking and wonderful at everything that matters. Don't tell him the first bit.",
      "Stargazing is easy when you're not looking at the stars. Shh. It's a secret.",
      "I'm blushing so hard that the neon sign is jealous.",
      "We came up for one quick look at the lights. That was a good hour and a half ago.",
      "If a couple kisses on a roof and nobody deploys anything, did it really happen? Yes. Yes it did.",
      "My favourite part of this tower is the lift. Twelve seconds of nothing but his hand in mine.",
      "I asked him what he was thinking. He said 'nothing'. Best answer anyone has ever given me.",
      "A kiss is like a good rollback: quick, comforting, and everything is safe again.",
      "Don't mind us. We're professionals. Well. Amateurs with tremendous enthusiasm.",
      {
        "t": "It's the middle of the night and the sky is showing off. So are we, {hero}.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Nova! Aw, you have such an honest face. You'd make a wonderful witness at a wedding.",
        "if": {
          "hero": "nova"
        }
      },
      {
        "t": "{bosses} bosses? Jonas, did you hear? An actual hero. Try not to be jealous, darling.",
        "if": {
          "bosses": 5
        }
      },
      {
        "t": "Level {level}, and you're still climbing towers to visit lovebirds. That's dedication.",
        "if": {
          "minLevel": 6
        }
      },
      {
        "t": "A {streak}-day streak! Jonas and I have a kiss streak. We stopped counting. Then we lost count.",
        "if": {
          "streak": 2
        }
      },
      {
        "t": "Careful with those {coins} coins. Jonas spent all of ours on tonight's cocktails.",
        "if": {
          "coins": 100
        }
      }
    ]
  },
  "jonas": {
    "intro": "Ah! Hi. Yes. Hello. We're testing the parapet. For structural romance. It holds up fine.",
    "lines": [
      "I planned this evening for two weeks. Then Mara laughed at my first joke and the rest was a bonus.",
      "I'm supposed to be an engineer. Right now I'm an idiot with a very happy heart.",
      "The wall is exactly sixty centimetres thick. I measured, twice, while she was watching the stars.",
      "I proposed a toast to the sunset. Mara said the sunset left an hour ago. We toasted anyway.",
      "Never bring a laptop to a rooftop date. I brought two and forgot both. Best decision ever.",
      "I wrote a script that sends her a heart at nine each night. It's the only thing of mine that never times out.",
      "Somebody told me never to fall for a colleague. So I fell for a hackathon rival. Take that, advice.",
      "Her kiss is like an instant merge. No conflicts, no review, just approved.",
      "The lift ride up was eleven floors of me practising a speech. I remembered none of it.",
      "I'd say something profound now, but my brain has been replaced by fireworks.",
      "If you see a shooting star, make a wish. I already used mine in the lift on the way up.",
      "My mum says the moon is only a big rock. Mum has clearly never seen Mara in the moonlight.",
      "A confession: I'm afraid of heights. I'm up here anyway. That's how serious this is.",
      "She says I'm terrible at small talk. I've been practising. So far it has mostly been kissing.",
      "I keep a tiny spare ring in my jacket for emergencies. Don't tell her. Also, we're in no hurry.",
      "Please stand a little to the left. Mara is blocking your view. Actually, she's blocking mine. Perfect.",
      "Kissing and DevOps are alike: both work better with small, frequent, consistent releases.",
      {
        "t": "It's late, and I still don't want to leave. {hero}, that's how you know it's serious.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Byte! Confident as ever. Teach me some of that. I say 'um' in front of Mara's parents.",
        "if": {
          "hero": "byte"
        }
      },
      {
        "t": "{bosses} bosses, {hero}? And I panic over a wedding toast. Please share your courage.",
        "if": {
          "bosses": 4
        }
      },
      {
        "t": "Level {level}. A proper senior. If you ever design a romantic pipeline, send me the YAML.",
        "if": {
          "minLevel": 10
        }
      },
      {
        "t": "Tower B has a quiet garden terrace, I hear. A calmer roof for a calmer kiss. We might visit.",
        "if": {
          "visited": "roofB"
        }
      }
    ]
  },
  "lena": {
    "intro": "Well, hello there. I'm Lena. Don't mind Theo, he's mid-wink. He's been mid-wink for ten minutes.",
    "lines": [
      "Flirting is just polite debugging. You poke, you prod, you see if anything lights up.",
      "Theo thinks he's smooth. I think he's a very nice puddle in a good shirt.",
      "I asked the bartender for something strong and something sweet. He pointed at Theo. Cheeky.",
      "My rule for rooftops: never trust a man who says 'nice view' while looking at your earrings.",
      "Cocktail number three is when I become honest. Cocktail number four is when I become poetry.",
      "I like a person who laughs at his own jokes. Theo can't. But he laughs at mine, which is better.",
      "Two straws, one glass. A classic for a reason. Or a health hazard. Either way, romantic.",
      "You can tell a lot from a drink order. Theo orders blue. Blue is a lot of drama.",
      "If he asks for my number, I'll say it's in the cloud. He'll have to authenticate first.",
      "Winking is my second language. My first is sarcasm. My third is 'another round, please'.",
      "The moon is being nosy tonight. It hasn't looked away from our table once.",
      "Dex, another round! And put a cherry on Theo's. He's had a difficult evening. He was outclassed.",
      "Don't look at me like that. It was one gentle compliment, a toast and a very short dance.",
      "My last date wanted to talk about deployments. Theo wants to talk about me. Guess who wins.",
      "Every good night has one dangerous idea. Mine is staying until they turn off the neon.",
      "They say love is a leap of faith. I say it's a rooftop with a very sturdy railing.",
      "Sparkle is not a personality. But on a Saturday, up here, it makes a decent wardrobe.",
      {
        "t": "It's night and I'm on a roof with a cocktail. {hero}, this is what winning feels like.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Sage! You look far too calm for a rooftop. Have a drink and loosen that collar clip.",
        "if": {
          "hero": "sage"
        }
      },
      {
        "t": "{bosses} bosses defeated? Oh my. Theo, take notes. That's how you impress somebody.",
        "if": {
          "bosses": 6
        }
      },
      {
        "t": "Level {level}? A hero with prospects. Fancy a cocktail? A mocktail, obviously. I'm not a monster.",
        "if": {
          "minLevel": 4
        }
      },
      {
        "t": "{coins} coins in your pocket, {hero}? Careful. I might flirt with your wallet.",
        "if": {
          "coins": 500
        }
      }
    ]
  },
  "theo": {
    "intro": "Ciao! I'm Theo. The sunglasses? They're for the neon. It's very bright. It's not because I'm nervous.",
    "lines": [
      "Lena laughed at my joke. It's the first time anyone has laughed on purpose. I'm framing the moment.",
      "I wear sunglasses at night for confidence. Lena says they make me look like a polite raccoon.",
      "I'm trying a smooth line: 'Are you a cloud server? Because I feel like you scale.' Pray for me.",
      "She winked. I winked back. Now we've winked for so long it's practically a contract.",
      "My grandmother says love is like pasta: it takes patience, salt and someone worth feeding.",
      "The blue cocktail tastes like a swimming pool wearing a tuxedo. I love it.",
      "I asked Lena to dance. She said 'ask again after the third drink'. I'm on the second. Wish me stamina.",
      "Never let a bartender give you advice. Dex told me to 'be myself'. Look how well that's going.",
      "There's a tiny star that keeps flickering over there. Either it's nervous, or it's watching us.",
      "I practised my compliments in the mirror. In the mirror I was more confident. And taller.",
      "You're a hero, right? Any advice for heroes who freeze when somebody pretty says hello?",
      "This roof should have a rule: no work talk. Lena and I just discussed a rollback. I blame the moon.",
      "I asked for a cocktail with an umbrella. Dex handed me an actual umbrella. I still love it.",
      "Lena says she likes a man with confidence. I told her I have plenty. She asked to see it. I coughed.",
      "I'm not saying it's love. I'm saying my heart just did a full reboot. Twice. With a splash screen.",
      "They say don't drink and flirt. I say flirting is the only thing stopping me from drinking too much.",
      "Whatever you do, don't order what Oli is having. It comes with a story and two regrets.",
      {
        "t": "A rooftop at night with Lena and a cocktail? {hero}, my life just hit its final boss. In a good way.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Byte, my friend! Teach me the smirk. Lena keeps laughing when I try mine.",
        "if": {
          "hero": "byte"
        }
      },
      {
        "t": "Two bosses already? Nice. I'm still working on the boss of small talk.",
        "if": {
          "bosses": 2
        }
      },
      {
        "t": "A {streak}-day streak? Can I borrow some of that discipline? I keep forgetting to reply to Lena's texts.",
        "if": {
          "streak": 4
        }
      },
      {
        "t": "Level {level}! You're basically royalty. May I offer you a drink and a very nervous handshake?",
        "if": {
          "minLevel": 12
        }
      }
    ]
  },
  "astrid": {
    "intro": "Shh, look! There, just above the moon. That's Jupiter, not a plane. I'm Astrid. Do you like stars?",
    "lines": [
      "Some of this starlight left before the first pipeline ever ran. It's still deploying to your eyes.",
      "That bright one is Vega. One of the brightest stars in the sky, and it isn't even showing off.",
      "The Moon drifts about four centimetres further away every year. Slow release, sturdy roadmap.",
      "Orion is easy to spot. Three stars in a row for the belt. Three commits in a row for a clean feature.",
      "Every star up there is a sun. The universe basically runs an infinite number of tiny data centres.",
      "Astronomers measure distance in light years. Engineers measure it in 'hops to production'.",
      "The North Star hardly moves. That's why sailors trusted it. Everyone needs one reliable reference.",
      "Space isn't quiet because it's empty. It's quiet because there's no air to carry sound.",
      "I lug this telescope everywhere. Once up a mountain. Never again. The lift is my new hero.",
      "Shooting stars are tiny bits of dust burning up. Romantic, and also how most of my side projects end.",
      "That faint smudge is the Milky Way. You can't see it properly from the city. The neon is rude.",
      "A day on Venus is longer than a year on Venus. Ask Kofi to explain. He'll draw it on a napkin.",
      "Kofi swears that constellation is a whale. I see a pretzel. We've agreed to disagree.",
      "The Moon is tidally locked. It always shows us the same face. Like a very committed mascot.",
      "Look through the eyepiece. Gently. That jagged edge is where the moon's day meets its night.",
      "Stars twinkle because of Earth's air, not because of the stars. It's basically network jitter for light.",
      "The oldest light I've ever seen came from a galaxy far away. A very long deploy. No rollbacks.",
      {
        "t": "It's a clear night and you're outside, {hero}. That's already better than most astronomers manage.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Sage, you have the calm of someone who watches stars. Come. The eyepiece is free.",
        "if": {
          "hero": "sage"
        }
      },
      {
        "t": "Level {level}? Impressive. You're climbing almost as fast as the space station orbits.",
        "if": {
          "minLevel": 5
        }
      },
      {
        "t": "{bosses} bosses down. Even a supernova only explodes once. You do it every day.",
        "if": {
          "bosses": 3
        }
      },
      {
        "t": "Tower B's roof is quieter. Less neon, better stars. I go there when I want silence.",
        "if": {
          "visited": "roofB"
        }
      }
    ]
  },
  "kofi": {
    "intro": "There! Do you see it? The Moon is a giant cheese wheel! I'm Kofi. Astrid says it's rock. Astrid is no fun.",
    "lines": [
      "I point at things and she names them. Perfect system. She's the API, I'm the enthusiastic frontend.",
      "That constellation is clearly a whale. Astrid says it's Cetus. Same thing, different logo.",
      "I read that the Sun is a star. So every morning we get the local star for free. Wow.",
      "Look up long enough and your neck complains, but your brain relaxes. Fair trade.",
      "I wanted to be an astronaut. Then I read about the training. Now I'm a professional pointer.",
      "Every star is somebody's favourite. Even the faint ones. Especially the faint ones. They try so hard.",
      "My gran said the stars are the eyes of everyone who loves us. I wave at them sometimes.",
      "That one, right there. No, further left. Your other left. Perfect. It's a satellite.",
      "Mars is red because of rust. The whole planet is a very dramatic old bicycle.",
      "The Moon is my favourite. It never gets tired. Even on Mondays it shows up on time.",
      "My dream superpower: pointing at stars and having them wave back. It's a modest wish.",
      "A sunset is the sky doing a deployment. The stars are the logs. Endless, beautiful logs.",
      "I brought a flask of hot cocoa. Astrid drank half. She said it was 'for science'. Uh-huh.",
      "Do you think anyone on another planet is looking back? I hope they're pointing too. That'd be nice.",
      "We came to stargaze. We stayed for the music, the lights and cocktails with tiny umbrellas.",
      "That blinking light is an aeroplane. That blinking light is a star. That one is Oli waving. Hard to tell.",
      "I once saw a shooting star and wished for a sandwich. It came true. Best night ever.",
      {
        "t": "Night sky, {hero}! The only place where 'looking at the ceiling' counts as a hobby.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Nova! Your ponytail is a comet's tail. Never cut it. It matches the sky.",
        "if": {
          "hero": "nova"
        }
      },
      {
        "t": "{bosses} bosses! You're like a comet: bright, fast and slightly dangerous to stand next to.",
        "if": {
          "bosses": 4
        }
      },
      {
        "t": "{streak} days in a row? The Sun shows up every day too. You two should hang out.",
        "if": {
          "streak": 5
        }
      },
      {
        "t": "{coins} coins? Enough for a very small star. Or a very large pretzel. Choose wisely.",
        "if": {
          "coins": 300
        }
      }
    ]
  },
  "ravi": {
    "intro": "Oi, hero! Sit! No wait, there's no room. Stand, then. I'm Ravi. That's Noor and Ben. We were mid-laugh.",
    "lines": [
      "Ben just told a joke about a load balancer. It was so bad it timed out on the punchline.",
      "Noor's cocktail is ninety per cent ice, ten per cent optimism. She calls it rustic.",
      "My phone says I have three unread alerts. I told it to page somebody who cares. It paged Ben.",
      "The secret to a good night: bad jokes, great friends and no laptops. We have exactly one of those.",
      "We did a pub quiz last week. Team name: 'Git Happens'. We lost by one point and gained a hangover.",
      "My best story is about a Friday deploy. Nobody believes it. I've framed the incident report.",
      "I don't drink much, but tonight it's a beer and a bad idea. The bad idea is karaoke.",
      "Ben says he can play the piano. Noor says he can play 'Chopsticks'. The truth lies somewhere between.",
      "Every rooftop needs a sofa. Every sofa needs three friends. Every friend needs a snack. Where are the snacks?",
      "I once fixed a production outage in my pyjamas. Dinosaur pyjamas. Nobody knew. Until now.",
      "I laugh like a broken laptop fan. Everyone says it's endearing. Everyone is lying, but kindly.",
      "Noor keeps saying 'one more round'. We're on round seven. Round seven has a cherry.",
      "The sofa's so comfy I've decided to live here. My rent is one bowl of nuts a week.",
      "Life is about balance: one drink for me, one for the sofa, none for my calendar.",
      "Can we talk about how good this view is? No? Fine. Ben, tell the load balancer joke again.",
      "They call me the life of the party. Mostly because I'm the only one still awake at ten.",
      "If you find a lost lanyard, it's mine. If you find lost dignity, also mine. Thanks.",
      {
        "t": "It's night, we're on a sofa, and the drinks are cold. {hero}, that's a solved problem.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Byte! Smug as ever. Come, tell Ben how to be smug. He's been practising in the mirror.",
        "if": {
          "hero": "byte"
        }
      },
      {
        "t": "{bosses} bosses? Noor, Ben, listen up! We're next to a legend. Somebody buy them a mocktail!",
        "if": {
          "bosses": 3
        }
      },
      {
        "t": "{streak} days in a row? I can't even keep a plant alive for that long. Respect, {hero}.",
        "if": {
          "streak": 3
        }
      },
      {
        "t": "Level {level}? I'm still on level one of adulting. Any tips? Preferably cheap ones.",
        "if": {
          "minLevel": 7
        }
      }
    ]
  },
  "noor": {
    "intro": "Hi. I'm Noor. Ravi is loud, Ben is quiet, and I'm the one who knows where the exit is. Nice to meet you.",
    "lines": [
      "Ravi thinks he's hilarious. I think he's a very well-meaning smoke alarm.",
      "The trick to a good night out: sit near the drinks, away from the speakers, and never volunteer for karaoke.",
      "I work in incident response. My idea of a fun Friday is when nothing goes wrong. I'm having a lovely time.",
      "This is a Sunset Spritz. Orange, cold, and it has fewer bugs than any release I've ever shipped.",
      "Ben looks like he's listening. He's actually calculating the tab. He does it every time.",
      "I love this roof. The skyline looks like a dashboard where everything is green. And beautiful.",
      "Fun fact: I've never lost an argument on this sofa. Nobody has ever tried.",
      "When Ravi laughs, the whole roof feels tremors. I've stopped checking the parapet.",
      "Small talk is like a health check: quick, shallow and mostly there to confirm we're all still alive.",
      "I don't have a favourite star. I have a favourite bartender. He garnishes my drinks with sarcasm.",
      "Life hack: sit on the sofa long enough and somebody brings snacks. It's called scheduled hospitality.",
      "There's a couple by the wall who haven't stopped kissing. Sweet. Distracting. Mostly sweet.",
      "Somebody asked what I'd wish for on a shooting star. Quiet on-call weeks. Very modest.",
      "I laughed so hard earlier that my drink went up my nose. Nobody saw. Ravi did. Ravi always does.",
      "Ben's cap is older than his phone. His phone is older than his car. His car is a bicycle.",
      "Sometimes all you need is a rooftop, three friends and the emotional support of a cocktail umbrella.",
      "I'd tell you a secret, but Ravi would repeat it and Ben would confirm it. That's our gossip pipeline.",
      {
        "t": "Nice night for it, {hero}. The city looks calmer when it's dark. Like a server after hours.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Nova! Sit. You look like you've seen more than three bugs today. Cheers.",
        "if": {
          "hero": "nova"
        }
      },
      {
        "t": "Two bosses? Not bad. I've defeated two bosses too. Both had the title 'Manager'.",
        "if": {
          "bosses": 2
        }
      },
      {
        "t": "A {streak}-day streak? That's more commitment than my gym membership. Well done, {hero}.",
        "if": {
          "streak": 7
        }
      },
      {
        "t": "{coins} coins? Ravi would already have spent half of them. And blamed Ben.",
        "if": {
          "coins": 250
        }
      }
    ]
  },
  "ben": {
    "intro": "Oh. Hi. I'm Ben. I don't say much. When I do, Ravi laughs and Noor rolls her eyes. It's a good system.",
    "lines": [
      "I'm drinking something warm from a mug. Cocktail. Cocoa. A mystery. I trust the bartender.",
      "They laugh at my jokes because they're afraid I'll explain them.",
      "I've worn this cap for six years. It's technically vintage. Noor says it's a health hazard.",
      "My hobby is cycling. You go a long way, get sweaty, and end up at a very good pastry shop.",
      "I like the rooftop at night. Nobody asks me anything. Even the stars just glow and leave me alone.",
      "When the lift is slow, I take the stairs. Five flights. Then I sit here for an hour to recover.",
      "Ravi says I'm a man of few words. Right now it's roughly eleven. Twelve. Thirteen.",
      "I once watched a whole meeting on mute and nodded at the right moments. I got promoted.",
      "The sofa has exactly three cushions. We've claimed them by right of arrival.",
      "I've been told I have a poker face. It's just my face. It doesn't do anything else.",
      "If you squint, the lit windows down there look like tiny status lights. All green. Mostly.",
      "Noor is the smart one, Ravi is the loud one, and I'm the one who remembers where we parked.",
      "I'm not shy. I'm conserving energy. Like a laptop on eco mode.",
      "Want a joke about a server that never went down? Me neither. That server is imaginary.",
      "I tried karaoke here once. Dex turned the speakers off mid-song. He said technical issue. It was mercy.",
      "This mug says 'World's Okayest Engineer'. Accurate. Humble. Warm.",
      "Every building should have a rooftop. Everybody deserves a place to look up and say nothing.",
      {
        "t": "Ah, night. My favourite shift. Nobody expects me to talk at night, {hero}. It's a pleasure.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Sage. You and I are the same, I think. Quiet, cool, slightly tired. Cheers.",
        "if": {
          "hero": "sage"
        }
      },
      {
        "t": "{bosses} bosses. That's about {bosses} more than I've met in person. Impressive, {hero}.",
        "if": {
          "bosses": 5
        }
      },
      {
        "t": "Level {level}. I still can't level up my chair. It came with one setting: 'slouch'.",
        "if": {
          "minLevel": 9
        }
      },
      {
        "t": "{streak} days without a break? I'd sleep for {streak} days after that. Respect.",
        "if": {
          "streak": 6
        }
      }
    ]
  },
  "oli": {
    "intro": "Hic! Oh, hello! I'm Oli. I'm not drunk. I'm just emotionally lubricated. Hic. Sorry.",
    "lines": [
      "Evening, city! Yes, you, with your lights! You look absolutely lovely tonight.",
      "I'd like to raise a toast to that tall building. It's very tall. Hic. Good job, building.",
      "I've been talking to the skyline for an hour. Best listener I've ever had. Zero interruptions.",
      "I love you, moon. I said it. Out loud. Don't tell my ex. Or the moon.",
      "Ooh, that one's moving! Star or plane or Kofi's hand? Hic. I'm not sure of anything.",
      "I once tried to deploy on a Friday. In a suit. At a wedding. It's a long story. It has a swan in it.",
      "You look like someone who'd enjoy a very long story. Have a seat. Or a bench. Or a parapet.",
      "The bartender says I'm cut off. I say I'm just leaning. It's a lifestyle choice.",
      "I'm only leaning on this wall because it's holding me up. Emotionally. Also physically.",
      "Everything is fine. Everything is beautiful. Everything is slightly spinning. Cosmic disco, hic.",
      "Did you know that if you stare at a light long enough, it stares back? Science. I read it on a napkin.",
      "I'm not sad. I'm sentimental. There's a difference. I think. Probably. Hic.",
      "My tie's gone missing. Oh wait, I'm wearing it. Relief! Where did I put my knees?",
      "The lift is my favourite thing here. Up, down, up, down. It knows exactly where it's going. I envy it.",
      "Three rules for rooftop parties: don't lean too far, don't sing too loud, don't propose to the moon.",
      "I dropped my phone from a roof once. Not this one. I'm not that reckless. I'm very reckless. Hic.",
      "It's not a bottle, it's a personal lighthouse. It guides me home. Well, towards more lighthouses.",
      {
        "t": "It's night! Hic! The best time to talk to buildings, {hero}. They're less busy.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Nova! Hic! You have such a nice ponytail. I'd salute it, but I'd miss.",
        "if": {
          "hero": "nova"
        }
      },
      {
        "t": "{bosses} boss?! Hic! You're a legend! I'd shake your hand, but I'd probably shake the wrong one.",
        "if": {
          "bosses": 1
        }
      },
      {
        "t": "Level {level}? Brilliant! I'm level... hic... what's the level for 'standing upright'?",
        "if": {
          "minLevel": 3
        }
      },
      {
        "t": "{coins} coins? Hic! Buy me a water. A big one. With ice. And a tiny umbrella.",
        "if": {
          "coins": 150
        }
      }
    ]
  },
  "sam": {
    "intro": "Shh, this is the good part of the song. I'm Sam. That's Ivy. Dance with us? Well. Near us. Slowly.",
    "lines": [
      "Slow dancing has no bugs. Only feelings. And the occasional stepped-on toe.",
      "This is a jazz ballad from a decade I wasn't born in. It sounds like a very kind rain.",
      "Ivy and I dance every Friday. It's our standing meeting. Best agenda in the company.",
      "You don't need to know the steps. You only need to know who you're holding.",
      "I'm wearing a bow tie because Ivy said it looks like a small, friendly butterfly. So it stays.",
      "I've tried disco. I've tried tango. But the slow sway is the only style that never crashes.",
      "You can hear the city from up here: distant traffic, distant laughter. Somehow it works as a drum.",
      "My favourite instrument is the metronome. It never complains. It never solos.",
      "When the music fades, I keep dancing. Ivy says it's romantic. My feet say it's overtime.",
      "Ivy's hair smells like rain and jasmine. I'll deny saying that. Then I'll say it again.",
      "The trick to dancing is looking like you've decided nothing. The trick to love is the same.",
      "I asked the speakers for a slower song. They said nothing. They played a slower song.",
      "People say romance is dead. Clearly they haven't visited the dance floor on the roof of Tower A.",
      "If you ask nicely, we'll teach you a step. It's called the 'one, two, three, look at her'.",
      "We come here every week. The moon has started to recognise us.",
      "Every song has a bridge. Every couple has one too. Ours has fairy lights.",
      "The lights change colour with every beat. It's like dancing inside a very polite rainbow.",
      {
        "t": "Late-night dancing, {hero}? Best time. The floor is empty and the music is honest.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Sage, you'd be a natural at slow dancing. Calm feet, steady heart. Give it a go.",
        "if": {
          "hero": "sage"
        }
      },
      {
        "t": "{bosses} bosses down? Then you've earned a dance. Ivy, do we have a spare song?",
        "if": {
          "bosses": 3
        }
      },
      {
        "t": "A {streak}-day streak. Ivy and I have a dance streak: two hundred Fridays and counting.",
        "if": {
          "streak": 2
        }
      },
      {
        "t": "Level {level}, {hero}? That's a serious rank. You'd lead a very elegant waltz.",
        "if": {
          "minLevel": 15
        }
      }
    ]
  },
  "ivy": {
    "intro": "Oh! Hi! Sorry, I'm Ivy. I'm slow-dancing, so I can't wave. Consider this a very slow wave.",
    "lines": [
      "Sam steps on my toes every third beat. It's his signature move. We call it the Ortega Shuffle.",
      "I love how the dance floor turns pink, then blue, then gold. It's like a friendly weather forecast.",
      "He hums off-key in my ear. It's the most beautiful sound I've ever heard. Don't tell the neighbours.",
      "We started dancing in a lift. On a random floor. When the doors opened, everyone clapped.",
      "Slow dancing is meditation with a hug. My therapist would approve. She's probably at the bar.",
      "I don't need fireworks. Just a quiet song and someone who holds my hand like it's important.",
      "The moon looks tonight like a coin somebody tossed for luck. I think it landed heads.",
      "I can't stop smiling. My cheeks hurt. It's the best pain. I'll ask Dex for an ice pack. Much later.",
      "If we're the last ones on the roof, promise me you'll turn the neon off gently. It's had a long night.",
      "My friends say we're 'sickeningly sweet'. I say thanks. I put it on my business card.",
      "You should try slow dancing. It's like walking, but with more meaning and slightly worse balance.",
      "The best thing about this dance floor: nobody cares if you're good. They only care that you're there.",
      "When the song ends, Sam always says 'one more'. Then it's twelve more. I love it.",
      "I once danced in the rain with a newspaper umbrella. It fell apart. So did I, laughing.",
      "I asked Sam what he wanted for our anniversary. He said a nap. The romance is unstoppable.",
      "He says I dance like a butterfly. I say I dance like a person who owns three left shoes.",
      "This roof is ridiculous. Ridiculous in the best way. Like a birthday cake designed by a committee of stars.",
      {
        "t": "Night-time and a slow song, {hero}. If that's not a perfect combination, I'll eat the disco ball.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Nova! Your ponytail swings like a metronome. You have natural rhythm. Come dance!",
        "if": {
          "hero": "nova"
        }
      },
      {
        "t": "{bosses} bosses?! A real hero, on our dance floor. Sam, adjust your bow tie!",
        "if": {
          "bosses": 4
        }
      },
      {
        "t": "A {streak}-day streak, {hero}? That's a lot of showing up. Sam and I would applaud, but our hands are busy.",
        "if": {
          "streak": 4
        }
      },
      {
        "t": "Level {level}? A newcomer! Welcome to the best rooftop in town. The dance floor is open to everyone.",
        "if": {
          "maxLevel": 3
        }
      }
    ]
  },
  "yara": {
    "intro": "Ah, a visitor. Come, sit for a moment. I'm Yara. I've been counting stars. I lost count around the third.",
    "lines": [
      "I used to think the sky was far away. Now I think it's simply the largest room in the house.",
      "Wine is like time. Give it a little patience, and it becomes something worth remembering.",
      "I've climbed a great many stairs in my life. Tonight I took the lift. Age, it turns out, has perks.",
      "Everyone rushes up here for the view. Nobody notices the real view is the silence between songs.",
      "When I was young, I deployed at midnight. Now I sip wine at midnight. Both are acts of faith.",
      "Look at those lights. Each window is somebody's evening. A tiny universe, nicely framed.",
      "If you're worried about tomorrow, look up. The stars have been worried for billions of years and still shine.",
      "There's a strange comfort in knowing that the moon has seen everything and told no one.",
      "I raised three children, four cats and a Kubernetes cluster. The cluster was the loudest.",
      "A good rooftop is a cathedral with no ceiling. You pray by looking. You confess by sighing.",
      "Youth is a race. Age is a bench. I prefer the bench. The view is superior.",
      "Ask yourself: what would you do tonight if no one were counting? Then go and do that.",
      "The couple by the wall remind me of a summer long ago. It smelled of jasmine and diesel.",
      "One glass of red is enough. The second is for the stories. The third is for the stars.",
      "I can't tell you the meaning of life. But it usually involves a chair, a view and a friend.",
      "Don't let anyone say late is too late. The stars come out late, and they're the best of us.",
      "You have restless shoulders, dear. Sit. The tower isn't going anywhere. Neither is the sky.",
      {
        "t": "Night is when the sky finally tells the truth, {hero}. Stay a while and listen.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Sage. A calm soul. You and the stars have a lot in common. Sit. Sip. Say nothing.",
        "if": {
          "hero": "sage"
        }
      },
      {
        "t": "Level {level}. An old hand, then. You will remember this evening long after the stairs are forgotten.",
        "if": {
          "minLevel": 20
        }
      },
      {
        "t": "{bosses} bosses, and here you are, sitting with an old woman and her wine. I like you already.",
        "if": {
          "bosses": 7
        }
      },
      {
        "t": "{streak} days in a row. Discipline is a quiet kind of love, {hero}. Keep it up.",
        "if": {
          "streak": 9
        }
      },
      {
        "t": "A beginner, and already on the roof? Good. Look up first, worry later.",
        "if": {
          "maxLevel": 4
        }
      }
    ]
  }
};

