// Tower B roof dialogue (Starlight Terrace).

// ---- Tower B roof dialogue (Starlight Terrace): same format as ROOF_DIALOGUE_A (generated from dialogue_roofB.js) ----
export var ROOF_DIALOGUE_B = {
  "hugo": {
    "intro": "Oh! Hello. Sorry, we're mid-hug. It's a long one. Forty seconds is the minimum, according to Wren.",
    "lines": [
      "Twenty years married and she still steals the warm side of the hug. I let her. That's the secret.",
      "See those city lights? Every window is somebody's evening. Ours just happens to have a wonderful view.",
      "I'm a plumber by trade. Pressure, flow, keeping things sealed. Marriage works about the same way.",
      "Wren says I hug like a man returning a library book. Slowly, carefully, and a little guilty.",
      "We came up for some fresh air and stayed for the hugging. The cat can wait. The cat will complain.",
      "The best deployments are the boring ones. So is the best marriage. Mostly quiet, sometimes fireworks.",
      "I proposed to Wren on a ferry. She said yes, then asked if the ferry had wifi. It did not.",
      "Sometimes I just stand here and let the wind do the talking. It has better material than I do.",
      "She's far cleverer than me, you know. I carry the umbrella and sound reassuring. It's a system.",
      "Somebody down there just switched a light off. Somebody else switched one on. The town is breathing.",
      "I keep our anniversary in three calendars, two alarms and a sticky note. That's what I call high availability.",
      "The forest path is lovely at dusk. We took the long way, holding hands and going nowhere in particular.",
      "She fell asleep on my shoulder in the lift once. I rode up and down four times so she could finish.",
      "Hugs are underrated infrastructure. Cheap, low latency, and no licence fee.",
      "Whatever you're building, be it code or a shed, leave a bit of room for the wind. Things need to sway.",
      "Wren's cold hands are legendary. They've been on my neck for twenty years. It's how I know I'm alive.",
      "If I could bottle this moment I'd keep it beside the good olive oil. Somewhere I can find it quickly.",
      {
        "t": "It's nearly midnight and we're still up here. Either a good evening, {hero}, or a very stubborn hip.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}! Well done. Whatever you're fixing, come up here and hug someone afterwards.",
        "if": {
          "minLevel": 10
        }
      },
      {
        "t": "{bosses} bosses? You should hug someone after each one. Doctor's orders. Well, plumber's orders.",
        "if": {
          "bosses": 3
        }
      },
      {
        "t": "The neon bar on Tower A? We peeked in. Too loud for a hug this slow. Wren loved the dance floor, though.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "A {streak}-day streak! That's like a very long hug, one day at a time. Keep holding on.",
        "if": {
          "streak": 5
        }
      },
      {
        "t": "Byte! Wren says you look like a lad who'll one day hug something enormous. Perhaps a server rack.",
        "if": {
          "hero": "byte"
        }
      },
      {
        "t": "You're new here, {hero}. Take it slowly. Good things, and good hugs, are best done unhurried.",
        "if": {
          "maxLevel": 4
        }
      }
    ]
  },
  "wren": {
    "intro": "Shh! Give us a minute. Hugo's been saving this hug since Tuesday. I'm Wren. Ask me anything. Slowly.",
    "lines": [
      "He smells of pine soap and toast. Honestly, the best cologne money can't buy. Don't tell him it's free.",
      "I told Hugo I'd stay for one more minute. That was the ninth 'one more minute'. We're doing fine.",
      "People always say marriage is work. Mostly it's just remembering whose turn it is to hold the umbrella.",
      "We come to this roof every anniversary. It's the only place where he stops fixing things and looks up.",
      "Hugo has never once lost an argument he's tried to win. He hasn't tried to win one in twenty years.",
      "Cold nose, warm hug, good view. If I could deploy this every night I'd never write another ticket.",
      "Somebody will fetch us a blanket eventually. Until then his jumper is my blanket, and a good one.",
      "A hug is basically a checksum. You hold on, you feel the heartbeat, you confirm everything is intact.",
      "I teach maths at the school by the harbour. I can prove that hugs beat homework. It's a short proof.",
      "The moon is showing off tonight. Hugo says it's just a rock. I say it's a rock with good timing.",
      "He tried to write me a poem once. It rhymed 'darling' with 'Kubernetes'. I still have it. It's perfect.",
      "You don't need a big gesture, you know. A steady arm around the shoulders is worth a thousand fireworks.",
      "The lights in the town are like a huge dashboard. Everything green. I could look at this dashboard all night.",
      "Twenty years ago he asked to borrow a pen. I never got it back. He's been borrowing it ever since.",
      "The lift stopped on the way up and we just stood there smiling. I checked. The cable was fine. So were we.",
      "I always say hello to the stars. They never answer, but they've stayed up for me every night since 1999.",
      "Long hugs make the world quiet. Try it sometime. Even the wind gives up and goes off to be busy elsewhere.",
      {
        "t": "Midnight, {hero}, and the city's finally quiet. Come back at sunrise. We'll still be here. Different snacks.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}, is it? Then you deserve a hug from a stranger. There. Free, no strings, no subscription.",
        "if": {
          "minLevel": 8
        }
      },
      {
        "t": "You've beaten {bosses} bosses and you're still polite? Hugo, take notes. Take fewer notes, take a hug.",
        "if": {
          "bosses": 4
        }
      },
      {
        "t": "The neon lounge on Tower A is fun, but the music was too loud to hear him breathe. So we came here.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "{streak} days in a row! That's commitment. Hugo and I have a hug streak. It's been running since spring.",
        "if": {
          "streak": 3
        }
      },
      {
        "t": "Nova, love, you look tired. Sit down. Have a sip of something. Then tell us all about it.",
        "if": {
          "hero": "nova"
        }
      }
    ]
  },
  "elio": {
    "intro": "Mmph! Ah. Buonasera. Forgive me. I was in the middle of a very important, very long, very romantic conversation.",
    "lines": [
      "I'm Elio, and I make pasta for a living. I make kisses for love. The second one has better margins.",
      "Sasha tastes like strawberries and mischief. I'd say more, but she is tapping my shoulder. Mmm. Later.",
      "Look at the lights. All those little windows. And here, on this roof, there is only one that matters.",
      "In Italy we say a kiss without a view is a handshake. That's why I bribed the lift operator for this roof.",
      "My nonna always said, 'Elio, kiss slowly, cook slowly, and never rush a ragù.' Sasha loves the ragù.",
      "It is cold up here, so we hold each other. It is warm up here, so we stay. Everything is a good reason.",
      "The string lights are very kind. They make everyone look like a film. Even me, and I burn toast.",
      "Every good recipe needs patience, heat and one perfect ingredient. Tonight the ingredient is Sasha.",
      "We're on our third glass of wine, and my Italian gets quite dramatic. I apologise to the neighbours.",
      "I wrote her a song on the guitar. It has four chords and three verses. She said it was her favourite. Amore!",
      "A romantic tip: never propose in the middle of a busy pipeline. Wait for the quiet part.",
      "We met at the market, arguing over the last aubergine. I gave up. She gave me her number. Better deal.",
      "That star up there, the bright one? I named it Sasha last week. Officially. I filed the paperwork.",
      "Do you know how quiet a rooftop can be? You can hear a heart. Mine is going like a fast pipeline.",
      "The lift ride up took twelve seconds. I used all twelve to hold her hand. Best twelve seconds of the week.",
      "Some people count sheep. I count the kisses between two cups of wine. I lose count every time. It's wonderful.",
      "If you see a shooting star, wish for someone to kiss under it. Or wish for extra cheese. Either works.",
      {
        "t": "A late hour, {hero}, and here we are, happy. The night belongs to people who don't check the clock.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}! Bravo! You climb like a mountain goat. Let me kiss both your cheeks. It's tradition.",
        "if": {
          "minLevel": 6
        }
      },
      {
        "t": "{bosses} bosses defeated! In Italy you'd get a statue. Here you get a compliment and a cold breeze.",
        "if": {
          "bosses": 2
        }
      },
      {
        "t": "You've been to the neon roof on Tower A? Molto rumoroso. Too much bass, not enough basil.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "A {streak}-day streak! Discipline! Like a good sourdough. Feed it every day and it loves you back.",
        "if": {
          "streak": 3
        }
      },
      {
        "t": "Sage, my friend! You have the eyes of a man who has seen a great sunset and stayed for the encore.",
        "if": {
          "hero": "sage"
        }
      }
    ]
  },
  "sasha": {
    "intro": "Oh, hi! Hello! We weren't... well, we were. Yes. Elio has a lot to say, and he says it best by kissing.",
    "lines": [
      "I came up for five minutes. That was eleven kisses ago. I've stopped tracking. The build is still green.",
      "Elio kisses like he cooks. Slowly, with far too much attention to detail. I'm the only taster.",
      "He says he's romantic. I say he just really likes strawberries. Both can be true. Mostly it's the second.",
      "We shared a scarf on the walk up. Then a glass. Then, well, the rest is a very unstructured retrospective.",
      "I work in customer support. All day, complaints. Up here, only wind and one happy heartbeat.",
      "I can't tell what's spinning: the wine, the stars, or my head. I'm not going to debug it tonight.",
      "The moon is looking. Let it look. It's been stuck in orbit for four billion years without so much as a date.",
      "Kissing is like a great code review. Careful, attentive, and someone always ends up blushing.",
      "My best friend says I fall too fast. I say Elio fell at exactly the correct speed. It was terminal velocity.",
      "Have you ever leaned against a parapet and felt like the whole city was applauding? I'm doing that now.",
      "I'm not going to tell you what he whispered. I will say it involved the word 'cheese', and I said yes.",
      "Rule up here: phones stay in pockets. Lovely. My battery is at nine per cent, so is my patience.",
      "The city glitters down there like a night-time server room. So many tiny lights. Every one of them a person.",
      "We had a small argument about who's the better kisser. We're still testing. It's slow, careful science.",
      "I love how the fairy lights make him glow. He says it's the lights. I say it's the wine. We're both wrong.",
      "My mum warned me about handsome cooks. I'm here to report: she was right. She'd love him, though.",
      "When someone's kissing you on a rooftop, time doesn't stop. It just decides to run on a very slow queue.",
      {
        "t": "It's late and I'm not leaving. {hero}, if you see a taxi, tell it we're busy for the next century.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}? You must have a lot of stories. Tell me one, but only if Elio isn't listening. Mmm.",
        "if": {
          "minLevel": 7
        }
      },
      {
        "t": "{bosses} bosses? You could write a book. Just leave out the parts where you were scared. Those are best.",
        "if": {
          "bosses": 3
        }
      },
      {
        "t": "The Skyline Bar next door is loud and glittery. We tried. Our ears begged to come back here.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "A {streak}-day streak! I have a streak of my own. Elio's kisses. It's day forty. No sign of a bug.",
        "if": {
          "streak": 4
        }
      },
      {
        "t": "Byte! Do me a favour. Look away for ten seconds. Then come back and pretend you saw nothing at all.",
        "if": {
          "hero": "byte"
        }
      }
    ]
  },
  "ines": {
    "intro": "Shh. Listen. The night is writing a poem, and I'm only taking dictation. I'm Odalys. Sit if you like. Don't rhyme.",
    "lines": [
      "The city below is a circuit board of small warm decisions. Every window a wish. Every wish on a timer.",
      "A glass of red, a cold hand, the moon leaning on the roof like an old friend who forgot to knock.",
      "I write one line every night. By dawn it's usually the worst line I've ever written. Then it's mine.",
      "Poetry is just logging with better metaphors. 'Error at midnight' becomes 'the moon lost its keys again'.",
      "Stars are the oldest server logs in the universe. Nobody has finished reading them. I'm still on page one.",
      "There's a difference between silence and quiet. Silence is empty. Quiet is full, like this terrace tonight.",
      "The fire sighs, the couples sigh, the wine sighs when it leaves the bottle. Everything up here is a sigh.",
      "The lanterns look like small, patient planets. They orbit no one, but they've all agreed to stay lit.",
      "I once rhymed 'deploy' with 'destroy'. My editor said it was too honest. Poetry is honesty with wine.",
      "Somebody's kissing behind me. I'm not looking. Even a poet knows when to leave a stanza alone.",
      "Every star I see was a message written long ago. I'm just the last person to receive it, and reply late.",
      "Clouds are the sky's drafts. It writes them, hates them, and lets the wind erase them by morning.",
      "I read poems aloud to the city. Nobody claps. That's how I know they're listening.",
      "My glass is half full, my notebook half empty, and the moon is gloriously the right amount of full.",
      "Do you hear that? A very faint guitar from somewhere. That's the sound of a good evening not being rushed.",
      "The forest path glows in the dark if you look at it right. It's just moss and moonlight. Everything is.",
      "Some nights the words come like a gentle rollout. Other nights, like a hotfix at three a.m. Tonight: gentle.",
      {
        "t": "After midnight the poems get shorter and the wine gets longer. Sit, {hero}. I'll read you something brief.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}? Even a hero climbs in verses. First a beginning, then a struggle, then a really long lift ride.",
        "if": {
          "minLevel": 6
        }
      },
      {
        "t": "{bosses} bosses. That's a full sonnet's worth of fighting. Fourteen lines, and each one bitter.",
        "if": {
          "bosses": 5
        }
      },
      {
        "t": "The bar on Tower A was all neon and noise. Lovely, but a poem needs room to breathe. So do I.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "A {streak}-day streak? That's a refrain. The best poems repeat until they mean something new.",
        "if": {
          "streak": 3
        }
      },
      {
        "t": "Sage. A calm name. It tastes like a herb and a quiet afternoon. I'll put you in a stanza, if you'll allow it.",
        "if": {
          "hero": "sage"
        }
      }
    ]
  },
  "boris": {
    "intro": "Ah, a guest! Boris Wolkow, sommelier. Please, sniff first, sip second, judge third. Never judge first.",
    "lines": [
      "This vintage? Notes of dark cherry, damp cellar and the slight regret of a well-loved container.",
      "The first rule of tasting: swirl. It's like a rolling update. Slowly, and with tremendous confidence.",
      "Do not ask for ice. I once saw a man ask for ice in a Burgundy. We do not talk about that man.",
      "I have tasted four thousand wines and I remember every one. The other memories fell out to make room.",
      "A good red is a slow deploy. Give it time to breathe. Rush it and everything spills. Usually on me.",
      "The label says 'oaky'. I say 'tastefully lumberjack'. Take a sip and tell me you don't see the forest.",
      "This white is crisp, cold and a little judgemental. Rather like my last on-call rotation.",
      "One does not 'chug' a Bordeaux. One accompanies it, tenderly, like a nervous cousin at a wedding.",
      "Mirela finds my speeches long. I find her enthusiasm unrefined. We are perfectly matched, obviously.",
      "In my cellar I keep the bottles at fourteen degrees. Like my temper. One tiny spike and everything turns.",
      "A great wine tastes of where it grew. This one tastes of a hillside, a cold morning and mild disappointment.",
      "Cheese goes with everything. Except a bad mood. And, for some reason, cheap merlot. I've stopped asking.",
      "Never trust a wine with a cartoon animal on the label. I trust this one. It has a very serious owl.",
      "The candle is for atmosphere. The wine is for feelings. The cheese is for the sensible part of the evening.",
      "To taste properly you must first close your eyes. Second, stop talking. Third, stop talking. It's very hard.",
      "The trick to wine is confidence. Say 'earthy' firmly enough and no one will ask what it means.",
      "If the cork breaks, we do not panic. We say 'rustic', pour it through a coffee filter, and continue.",
      {
        "t": "It is late, and the tannins are yawning. But a true sommelier never yawns. Only, occasionally, sighs.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}! A palate developed at speed. Let me pour you something bold. Not too bold. You're new to it.",
        "if": {
          "minLevel": 9
        }
      },
      {
        "t": "{bosses} bosses? You have something in common with a well-aged Barolo: stubborn, and worth the wait.",
        "if": {
          "bosses": 6
        }
      },
      {
        "t": "The bar over on Tower A serves cocktails with sparklers. Very festive. Very loud. I wept for the gin.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "A {streak}-day streak! Consistency is the soul of a vineyard. Same soil, same sun, same excellent fuss.",
        "if": {
          "streak": 5
        }
      },
      {
        "t": "Nova! A bright name. Bright, and a touch fizzy, like a good prosecco. Come, taste something with bubbles.",
        "if": {
          "hero": "nova"
        }
      },
      {
        "t": "You have {coins} coins? Then permit me to suggest a rather modest wine and a very tasteful conversation.",
        "if": {
          "coins": 300
        }
      }
    ]
  },
  "mirela": {
    "intro": "Hello, darling! Boris is being Boris, so I'll do the pouring. I'm Mirela. Taste this. Don't tell him it's the cheap one.",
    "lines": [
      "Boris talks ten minutes about a wine, I sip and say 'lovely'. That's our whole marriage. It works.",
      "If it's red, sip it. If it's white, chill it. If it's pink, you're on a rooftop. Enjoy. That's my guide.",
      "Boris thinks he taught me everything about wine. I let him. I actually learned it from his mother.",
      "I like a wine with character. Boris just calls those 'complicated'. I call them 'a good evening'.",
      "Look at the cheese board! Someone left the good brie. Someone will regret it. It's me. I'm the someone.",
      "I once sent a bottle back to the kitchen. Then I realised I was in someone's living room. Still tasted good.",
      "I'm not flirting with the sommelier, I'm just complimenting his tannins. Please do the same.",
      "A glass of wine is a tiny holiday in stem form. Two glasses is a weekend. Three is a really loud opinion.",
      "The fairy lights make everyone twenty years younger. I tell Boris hourly. He pretends not to notice.",
      "My cardigan, my glass, my husband, and the moon. That's all I need. Also a snack. Also, another snack.",
      "Boris named our first wine cask 'Trevor'. We've stayed loyal. Trevor is still ageing gracefully.",
      "The trick to a good tasting is to spit. I never do. Boris says that's why I'm having such a nice time.",
      "Have you tried the little dark chocolate with the blue cheese? It's a bit strange. It's also a bit wonderful.",
      "Boris and I met at a vineyard. He corrected my pronunciation. I corrected his dance. Still learning.",
      "The best sound on a rooftop is a cork popping. It's the sound of 'no more meetings for the night'.",
      "Yes, the wine is expensive. No, I won't tell you how much. My husband is standing right there.",
      "I always sniff the cork. I don't know why. It just makes me feel like a very glamorous detective.",
      {
        "t": "It's the middle of the night, love, and the wine's tasting better. That's the thing about wine. And night.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}! You've earned a proper glass. Let me pour. Boris, stop hovering. I said pour, not grade.",
        "if": {
          "minLevel": 5
        }
      },
      {
        "t": "{bosses} bosses. Bravo! Boris only tackled one, and it was a corkscrew. He's still recovering.",
        "if": {
          "bosses": 3
        }
      },
      {
        "t": "The neon place on Tower A does cocktails with lightning inside. We ordered two. Boris cried a little.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "{streak} days in a row! I have a streak too. Boris hasn't lost an argument with a cheese since Tuesday.",
        "if": {
          "streak": 2
        }
      },
      {
        "t": "Sage, honey, you look like you need a glass and a chair. Take the good chair. Boris will pretend not to mind.",
        "if": {
          "hero": "sage"
        }
      }
    ]
  },
  "nadia": {
    "intro": "Well, hello there. Nadia. That's Petra, next to me, and this is our bottle. It was full when we sat down.",
    "lines": [
      "I'm a paramedic. I'm calm in emergencies. Petra's smile is the only thing that's ever made my pulse jump.",
      "One bottle, two glasses. Petra insists on separate glasses. I insist on sitting very close. Compromise.",
      "The fire crackles, the wine warms, and Petra laughs at my jokes. A statistically improbable night.",
      "She doesn't do small talk. So I asked about her favourite constellation. She talked for an hour. Gold.",
      "I've never seen someone hold a wine glass so gracefully. She treats it like a tiny, fragile star.",
      "People say fire is dangerous. Yes. I'm sitting next to it, and it's only the second most dangerous thing.",
      "Petra lets me pick the wine. I pick the cheapest one with the prettiest label. It's worked for years.",
      "Fireside date rule one: sit where the light catches her face. Rule two: don't stare. I broke two.",
      "The wine's from a vineyard I can't pronounce. It tastes like warm plums and a very confident dinner guest.",
      "I fixed her bike once. That was the first time she smiled at me. I've been leaving my chain loose ever since.",
      "In emergencies I check breathing. On dates I check whether she's laughing. Both count as vital signs.",
      "When the fire pops, Petra jumps and grabs my arm. I've started stoking the fire a lot. For safety, obviously.",
      "I'd like to say I'm smooth, but I've dropped my glass twice. She just refilled it and winked. Best wink ever.",
      "Fire and stars together make you brave. Or it's the wine. Or Petra's laugh. Or all three.",
      "Look at the sky. No, look at Petra. No, look at the sky. Sorry. I'm having a difficult time choosing.",
      "The best part about a rooftop date is nobody's in a hurry. The city sleeps. We whisper. The fire listens.",
      "My grandmother said: never trust a person who won't share their wine. Petra shares everything. I'm in trouble.",
      {
        "t": "It's the middle of the night, and this wine is still half full. That's love, {hero}. Or poor planning.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}! Come, sit with us. The log is big enough for a hero. But only a small one. We like this spot.",
        "if": {
          "minLevel": 7
        }
      },
      {
        "t": "{bosses} bosses? Nothing scares you, then. Come, meet Petra. She might scare you a little. In a good way.",
        "if": {
          "bosses": 4
        }
      },
      {
        "t": "The neon bar on Tower A had a lovely bartender. But no fire. Some evenings need a fire.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "A {streak}-day streak! That's how long it took Petra to say yes to a drink. Persistence. It pays.",
        "if": {
          "streak": 6
        }
      },
      {
        "t": "Nova! You have a good name for a night like this. Bright, warm, and a little bit dangerous.",
        "if": {
          "hero": "nova"
        }
      }
    ]
  },
  "petra": {
    "intro": "Hello. I am Petra. I do not talk much. Nadia talks. I hold the glass, and I nod. It works very well.",
    "lines": [
      "I come from the north, where it is dark for months. Here I sit near a fire and a very warm person. Ideal.",
      "In Sweden we say 'fika' for coffee and cake. Nadia says 'wine' for wine and cheese. New language.",
      "She is loud, brave and terribly kind. I am quiet, careful, a little afraid. Together, one whole person.",
      "The stars here are fewer than in Lapland. But the company is warmer. I am not sure I mind the trade.",
      "I once counted every star I could see. I got to sixty and looked at Nadia instead. It seemed wiser.",
      "I keep my emotions in tidy folders. Nadia keeps opening them. Somehow, none of the files are corrupted.",
      "I work as a translator. Nadia says something charming, and I translate it into 'yes'. It is a short job.",
      "She refills my glass before I ask. I noticed the second time. I have decided to allow it. Permanently.",
      "The fire is warm on my left side. Nadia is warm on my right. I am in a very well-heated sandwich.",
      "I do not believe in love at first sight. I believe in love at the fourth glass, if the company is right.",
      "Sometimes when she laughs, I forget what I was saying. Which is fine. It was probably about spreadsheets.",
      "We took the forest path to get here. She held the lantern. I held her sleeve. We only got a little lost.",
      "You should try the wine. It is red, strong, and quite honest. Like her. Do not tell her I said honest.",
      "Friends said 'take it slow'. I said, 'I am Swedish. Slow is all I know.' Then Nadia laughed. Quicker.",
      "The stars are always still. That is why I trust them. Nadia never is. That is why I trust her more.",
      "I wear a scarf even by the fire. Nadia offered me her hand. I now have both. It is quite efficient.",
      "A good evening needs no plan. Only a bottle, a fire, and someone who remembers how you take your tea.",
      {
        "t": "It is well after midnight, and I am still here, still smiling. Please tell no one. It will ruin my reputation.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}? That is more than my patience. Sit down. Stay a while. Nadia will find you a glass.",
        "if": {
          "minLevel": 6
        }
      },
      {
        "t": "{bosses} bosses. I cannot beat a single spreadsheet. You are a very impressive person. Slightly terrifying.",
        "if": {
          "bosses": 3
        }
      },
      {
        "t": "There is a lively rooftop bar on Tower A? Too many lights. My eyes prefer a fire and one face.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "A {streak}-day streak. We Swedes admire routine. Also cinnamon buns. You have the first. I have the second.",
        "if": {
          "streak": 3
        }
      },
      {
        "t": "Sage. Quiet name. Peaceful. You and I will get along. Do not feel obliged to speak. I certainly will not.",
        "if": {
          "hero": "sage"
        }
      }
    ]
  },
  "gus": {
    "intro": "Ha! Come closer, young one, the fire's better than the cushions. I'm Gus. Ever heard the one about the lift that went sideways?",
    "lines": [
      "Sixty years I've told stories by fires. Every one gets a little bigger. This one is only slightly true.",
      "In my day the whole town was one big forest. The path to this tower was a deer track and a rumour.",
      "I met a bear on the forest path once. He asked directions. I said: 'Past the pond, left at Kubernetes.'",
      "This fire's older than half the people here. It's a very patient fire. It has heard every joke twice.",
      "Father said: 'Gus, a good story needs a fire, a friend and a fib.' I've collected all three.",
      "Back when I was young, we deployed by hand and prayed to the tape drive. The tape drive never listened.",
      "Once I climbed all five hundred stairs of this tower on a wager. It was only forty. It felt like five hundred.",
      "The best listeners are folk who've had a small glass of something warm. Fenn's on his second. Ideal.",
      "A story's like a fire, lad. You feed it slow, you poke it now and then, and you never leave it alone.",
      "I once cooked a whole fish on this pit. A very small fish. My first, and it was proud.",
      "Look at those stars! My grandmother said each one is a candle for someone who's finished their supper.",
      "There's a great story about the moon coming down for tea. It ends badly for the biscuits. I'll tell it later.",
      "I've outlived four pairs of spectacles, two knees and one stubborn horse. All good company.",
      "Everything worth doing takes a quiet evening, a warm seat and someone asking 'and then what happened?'",
      "I've known Walt on his bench and Old Tom on the other one since we were lads. Still arguing about a cat.",
      "The old ferrymen used to say: 'A tale that's true is a tale that's told twice.' So I tell mine every night.",
      "Lost in the woods? Follow the woodsmoke. Nine times in ten it's me. The tenth time, dinner.",
      {
        "t": "Up past midnight? Good for you, {hero}. The best tales only wake up after the clocks go quiet.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}! By my stars, that's a tall tale of its own. Sit. Tell me how you did it, and I'll embroider.",
        "if": {
          "minLevel": 10
        }
      },
      {
        "t": "{bosses} bosses, eh? I fought one dragon in my life. Turned out it was a very angry goose.",
        "if": {
          "bosses": 5
        }
      },
      {
        "t": "The neon roof on Tower A? Heard the music from here. Sounds like the bass drum is trying to leave.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "A {streak}-day streak? Ha! Discipline! Keep it up, and one day you'll have a goose story too.",
        "if": {
          "streak": 7
        }
      },
      {
        "t": "Byte! Come, sit. You've got the look of somebody who's escaped from a story and hasn't found the next.",
        "if": {
          "hero": "byte"
        }
      },
      {
        "t": "Only level {level}? Perfect. The best listeners are the ones with all their adventures ahead of them.",
        "if": {
          "maxLevel": 3
        }
      }
    ]
  },
  "fenn": {
    "intro": "Ha ha ha! Oh, hello! Don't mind me, I'm just heckling Gus. He's on his fifth telling of the goose. I'm Fenn.",
    "lines": [
      "Every time Gus tells the bear story, the bear grows. Tonight it's a small mountain with opinions.",
      "I've heard this one before. It's different every time. That's the genius. No arguing with a moving target.",
      "Gus says he once wrestled a moose. Gus says a lot of things. I keep a list. It's a long list.",
      "This is my favourite spot. Warm fire, cold drink, and an old man who lies beautifully.",
      "I write documentation for a living. Nothing in it is half as entertaining as one of Gus's fibs.",
      "I asked him for the moral of the story. He said, 'always bring a spare sandwich.' Hard to argue.",
      "He swears the fire pit was built by giants. It's from a garden centre. I checked the receipt.",
      "Whenever Gus stops for breath I refill his cup. Best investment I ever made. Free stories, forever.",
      "If you want the truth, ask Nana Ilse in the garden. If you want a good story, ask Gus. Rarely the same person.",
      "I once told Gus a story. He said, 'that's nice, lad, but the goose was bigger.' It was not about a goose.",
      "The trick to listening: nod at the right moments, laugh at the wrong ones. It keeps Gus going.",
      "Priya at the cafe swears his stories improve with coffee. I say with an audience. Or a bench.",
      "I sat by this fire four hours and forgot dinner. Gus said a story would fill me up. It did.",
      "Laughter makes the fire pop. Scientific fact. Well, I said it, and nobody has proved me wrong.",
      "Gus is like a very old pipeline. Slow, clunky, and everyone quietly relies on him. I'd never let him retire.",
      "Never ask Gus what happened next. You'll be here till Thursday. I'm on Tuesday's story right now.",
      "Somebody has to stay awake for the ending. Usually me. Usually a disappointing ending. I love it.",
      {
        "t": "It's dead of night and Gus is still going. {hero}, if I nod off, please prod me gently. Or give me a biscuit.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}! Higher than Gus's stories. Not by much. Come sit. The stump is warm, if slightly suspicious.",
        "if": {
          "minLevel": 8
        }
      },
      {
        "t": "{bosses} bosses? Gus, did you hear that? A real hero. Quick, add it to the goose story.",
        "if": {
          "bosses": 3
        }
      },
      {
        "t": "There's a big party on Tower A? Sounds fun. We're staying. Gus hasn't finished the goose.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "A {streak}-day streak! That's how many nights I've stayed by this fire. I'm not saying I have a problem.",
        "if": {
          "streak": 4
        }
      },
      {
        "t": "Sage! You look like someone who appreciates a fib. Sit down. Gus will fit you into the plot.",
        "if": {
          "hero": "sage"
        }
      }
    ]
  },
  "tariq": {
    "intro": "Shh, look up! There, near the moon, that's Jupiter. I'm Tariq. I brought tea, a blanket and far too many star charts.",
    "lines": [
      "Three stars in a row? Orion's belt. Marisol says it's a very short ironing board. She's not wrong.",
      "Light from that faint one left before the first pyramid. It's still on its way. Like my last pull request.",
      "I work nights in a data centre. Up here I can watch something that runs without me.",
      "Tea, stars and a blanket. Add one good friend and you don't need a single dashboard. Not even a green one.",
      "The Milky Way is right there, if you look away from the lantern. It's faint, like the memory of a good idea.",
      "In this part of the town, the sky is darker than anywhere else. The forest swallows the light. It's beautiful.",
      "Every star is a sun. Every sun has a story. Astronomy is just the longest, best set of release notes.",
      "I log every shooting star I see. Forty-one so far. I've never wished for anything sensible.",
      "Do you know the Moon is drifting away from Earth by a few centimetres every year? Very slow, very polite exit.",
      "The mug's chipped, the tea is lukewarm, and Marisol keeps stealing my biscuit. This is heaven, honestly.",
      "Stargazing teaches patience. You wait, you watch, and something wonderful crosses the sky for four seconds.",
      "Astrid on Tower A has a real telescope. Mine is a pair of binoculars and a lot of optimism.",
      "There's a satellite! See it? Tiny, steady, not blinking. That's somebody's internet. Isn't that lovely?",
      "Kenji once told me that the best time to look up is right after a deploy fails. Two minutes of perspective.",
      "The constellation over there is a bear. Marisol calls it a large dog. We call it 'Bearly Dog'.",
      "On clear nights the sky is a status page. Everything green. Nothing on fire. Well, technically.",
      "Some stars are gone by the time their light arrives. We're basically looking at historic backups.",
      {
        "t": "Late enough that the sky is showing its best stars. {hero}, this is the good stuff. Lie down. Look up.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}? You must have seen some extraordinary things. Tell me one, and I'll tell you a star.",
        "if": {
          "minLevel": 8
        }
      },
      {
        "t": "{bosses} bosses down. In astronomy terms, that's about half a supernova. Impressive, honestly.",
        "if": {
          "bosses": 3
        }
      },
      {
        "t": "The bar on Tower A has a telescope, right? Astrid's? Lovely. Mine has a better view. Mostly of my thumb.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "A {streak}-day streak! I've come up here just as often. The sky never repeats. Try it.",
        "if": {
          "streak": 3
        }
      },
      {
        "t": "Nova! Also a kind of star. An exploding one, mind you. Pull up the blanket, share my tea.",
        "if": {
          "hero": "nova"
        }
      }
    ]
  },
  "lucia": {
    "intro": "Look, look, look! That one there is the Lopsided Teapot, and I found it! I'm Marisol. Lie down, the sky's much bigger sideways.",
    "lines": [
      "That cluster is the Sleepy Hedgehog. That one, the Angry Toaster. I name them faster than Tariq googles.",
      "The official name for those stars is 'Ursa Major'. Mine is 'Big Spoon'. It works better at picnics.",
      "I count shooting stars and make a wish for each. So far I've wished for pasta forty-one times. No regrets.",
      "The blanket's from my grandmother. The tea's from Tariq. The stars are from a truly generous universe.",
      "My best theory is that the stars are just the universe's fairy lights. It throws a party every night.",
      "A plane is a 'slow star'. That's what I tell kids. Tariq says that's not science. It's poetry.",
      "I once fell asleep under the stars and woke up with a hedgehog on my shoulder. We're still friends.",
      "Everything looks smaller from up here. Even my exams. Even my landlord. Even the lift queue.",
      "My favourite thing about a night sky is that it doesn't ask what you've accomplished. It just shines with you.",
      "Point at a star and give it a name. Instantly it's yours. Nobody can argue. I've got seventy-two now.",
      "There's a bright light near the moon! It's either Venus or a very ambitious drone. I'm voting for Venus.",
      "The lanterns and the stars are having a competition. So far it's a draw, but the stars have a longer runway.",
      "I always bring extra socks to rooftops. Cold feet ruin stargazing. Warm feet make you philosophical.",
      "Tariq gets all technical. I get all soppy. Together we're a very well-balanced telescope.",
      "I read that the stars we see are a bit like old photos. It's a big, gorgeous archive of the past.",
      "I've been on this roof since sunset. My back hurts, my neck hurts, my heart is great. Best evening this month.",
      "Some people count sheep to sleep. I count stars until I run out of numbers. It always ends with a smile.",
      {
        "t": "Midnight! The sky's at its very best. {hero}, come and lie down. I'll show you the Cosmic Teapot.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}! You've climbed higher than the Big Spoon. Well, nearly. Come look at the sky with us.",
        "if": {
          "minLevel": 6
        }
      },
      {
        "t": "{bosses} bosses? I'd name a constellation after you. The Brave Snail. It's a compliment. Really.",
        "if": {
          "bosses": 4
        }
      },
      {
        "t": "The bar on Tower A is glittery. We looked at it from here. It looks like a small, loud galaxy.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "A {streak}-day streak! That's how long I've kept a stargazing diary. It has nine pages and four doodles.",
        "if": {
          "streak": 4
        }
      },
      {
        "t": "Byte! You'd make a lovely constellation. The Smirking Fox. Look up. It's over there. Just to the left.",
        "if": {
          "hero": "byte"
        }
      }
    ]
  },
  "kit": {
    "intro": "Mmm? Oh. Hi. I'm Kit. Don't mind me. I'm just lying here, considering the universe and finishing my beer.",
    "lines": [
      "Have you ever noticed that a lounger is just a tiny bed with ambition? I respect that a lot.",
      "I'm on a break from thinking. It's going great. I've thought about nothing for eleven whole minutes.",
      "If a server falls in the forest and nobody's on call, does it make a sound? Asking for me.",
      "Everything's a pipeline if you squint. Stars, clouds, this beer. Input, transform, output, sleep.",
      "The moon's just a big cache. It stores sunlight and serves it at night. Efficient, lazy. I relate.",
      "I only get philosophical after the second beer. It's a strict, deeply unprofessional policy.",
      "Time works differently up here. The clock says ten. My body says it's next Tuesday. I don't argue.",
      "One day I'll start a company that just naps. We'll call it 'Idle Systems'. Nobody will notice for months.",
      "I love how the city's lights blink like a huge dashboard. Everything's green. Nothing's my problem tonight.",
      "The beauty of a hammock, or lounger, is that it forces you to stop. Gravity takes over the meeting.",
      "Sometimes I close my eyes and hear the fire, the guitar, and a distant laugh. That's my favourite playlist.",
      "I once meditated for an hour. Turned out I was asleep. Same result, less effort. Highly recommend.",
      "Somebody's hugging over there, somebody's kissing over there. I'm here for the ambience and crisps.",
      "Be honest: is the moon following us, or are we following the moon? I'll wait. I've got nowhere to be.",
      "You know what nobody says? 'Thank you, rooftop.' So, thank you, rooftop. You've been very supportive.",
      "My biggest regret is not bringing a blanket. My second is not bringing two. I've a tendency to under-plan.",
      "Nothing gets fixed at night. Everything just gets moved to the morning. I've made peace with this.",
      {
        "t": "It's ridiculously late, {hero}, and here I am, horizontal. Somebody wake me at sunrise, or at lunch.",
        "if": {
          "night": true
        }
      },
      {
        "t": "Level {level}? Sounds exhausting. Sit down. Have a sip. The lounger is big enough for a philosopher and a hero.",
        "if": {
          "minLevel": 8
        }
      },
      {
        "t": "{bosses} bosses? Please, don't tell me how. I'll only hear the word 'effort'. I'm on a break.",
        "if": {
          "bosses": 3
        }
      },
      {
        "t": "The bar on Tower A is loud. I went. I left. My eardrums filed a bug report against the bass.",
        "if": {
          "visited": "roofA"
        }
      },
      {
        "t": "A {streak}-day streak? Ah, consistency. I have one of those. It's called napping. Day one thousand.",
        "if": {
          "streak": 3
        }
      },
      {
        "t": "Sage. Ah, a fellow drifter. Take the other end of the lounger. We'll say nothing, together, very loudly.",
        "if": {
          "hero": "sage"
        }
      }
    ]
  }
};

