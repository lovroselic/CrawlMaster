const DECAL_PAINTINGS = [
  "1942_200", "1942_201", "1943_200", "AA100", "AMC2", "AMC3", "ActecChallenge2", "AirWolf200", "AirWolf201", "AirWolf31", "AlienKong", "AlleyKat", "AmberMoon200", "AmberStar200", "AmberStar201", "AmberStar202",
  "AmberStar203", "Amiga", "AntAttack2", "AntAttack200", "AntAttack4", "AppleLisa", "Apshai10", "ArabianNights1", "Arena2", "Arena200", "Arena201", "Arnie200", "Arnie201", "Arnie202", "ArticShipwreck2", "ArticShipwreck7",
  "AtariFalcon", "AtariST", "Athanor200", "Athanor201", "AticAtac110", "AticAtac111", "AticAtac112", "AticAtac113", "AticAtac114", "AticAtac115", "AticAtac116", "AticAtac117", "AticAtac130", "AticAtac131", "AticAtac140", "AticAtac200",
  "AticAtac201", "AticAtac202", "AticAtac203", "AticAtac204", "AticAtac205", "AticAtac206", "AztecChallenge100", "AztecChallenge101", "AztecChallenge110", "AztecChallenge111", "AztecChallenge112", "AztecChallenge130", "BC10", "BC103", "BC11",
  "BC90", "BackToFuture200", "BackToFuture201", "BackToNature1", "Bagitman11", "Bagitman90", "Barbarian100", "Barbarian110", "Barbarian111", "Barbarian112", "Barbarian13", "Barbarian130", "Barbarian131", "Barbarian3", "BattleChopper",
  "BattleThroughTime2", "BeachHead100", "BeachHeadReplace", "Belwothe", "BetrayedAlliance", "BeyondForbiddenForest110", "BeyondForbiddenForest111", "BeyondForbiddenForest2", "Biggles2", "Blackwyche110", "Blackwyche2", "BladeRunner",
  "BladeRunner7", "BlueMax11", "BlueMax20", "BoogaBoo11", "BoogaBoo4", "BoogaBoo41", "BoogaBoo90", "Breakout200", "BrianBloodaxe11", "BrianBloodaxe20", "BrianBloodaxe70", "BrianBloodaxe71", "BrideOfFrankenstein", "BrideOfFrankenstein200",
  "BruceLee200", "C64", "C64_hard", "CBM_VIC20", "CCC1", "CamelotWarriors", "Captive199", "Captive200", "Captive201", "CastleHaunt", "CastleHaunt200", "CastleOFTerror11", "CastleOfTerror3", "CastleOfTerror4", "CastleOfTerror91",
  "CastleWolfenstein21", "Cauldron10", "Cauldron8", "Cavelon11", "Cavelon13", "Cavelon4", "Choplifter11", "Choplifter12", "ChuckieEgg1", "ChuckieEgg2", "CodenameIceman2", "CodenameIceman3", "CodenameIceman98", "Commando100",
  "Commando200", "Commando201", "CongoBongo2", "CrawlMaster110", "CrawlMaster111", "CrawlMaster112", "CrawlMaster113", "CrawlMaster114", "CrawlMaster115", "CrawlMaster130", "CrawlMaster131", "CrawlMaster132", "CrawlMaster133",
  "CrawlMaster2", "CrystalCastles2", "CrystalCastles200", "CrystalCastles90", "CrystalsOfZong10", "Cuthbert20", "Cuthbert70", "Cuthbert90", "CyberPunk200", "CyberPunk201", "DM100", "DM103", "DM104", "DM105", "DM106", "DM107", "DM90",
  "Daggerfall3", "Daggerfall4", "Decathlon200", "Defender110", "DefenderOfTheCrown", "DefenderOfTheCrown100", "DefenderOfTheCrown110", "DigDug2", "DonkeyKong100", "DonkeyKong200", "DonkeyKong99", "DotHunter", "DragonSkulle110",
  "Drelbs2", "Drelbs3", "DungeonMaster100", "DungeonMaster200", "DungeonMaster201", "DungeonMaster202", "DungeonMaster203", "DungeonMaster204", "DungeonMaster205", "DungeonMaster206", "DungeonMaster70", "DungeonMaster91",
  "DungeonMaster92", "DungeonMaster96", "DungeonMaster97", "DynaBlaster60", "EOB11", "ESB", "Elite", "Elite100", "Elite201", "ElvenWarrior1", "Elvira1", "Elvira2", "Elvira3", "EnigmaForce2", "EricTheViking10", "EveryoneIsAWally2",
  "EveryoneIsAWally70", "EveryoneIsAWally71", "EyeOfTheBeholder100", "EyeOfTheBeholder101", "EyeOfTheBeholder110", "EyeOfTheBeholder111", "EyeOfTheBeholder112", "EyeOfTheBeholder130", "EyeOfTheBeholder140", "EyeOfTheBeholder70",
  "EyeOfTheBeholder90", "F1-1", "F2", "F4", "F50", "FF100", "FF101", "FF5", "FalconPatrol7", "FalconPatrol70", "FalconPatrol71", "FalconPatrol72", "FalconPatrol8", "FalconPatrol9", "FalconPatrol99", "FireAnt2", "FireAnt21", "FireAnt60",
  "FireAnt70", "ForbiddenForest110", "ForbiddenForest90", "ForbiddenForest91", "ForbiddenForest99", "ForgottenForest1", "FortApocalypse", "FortApocalypse41", "FranticFreddie3", "Fred100", "Fred101", "Fred102", "Fred110", "Fred111",
  "Fred112", "Fred113", "Fred130", "Fred21", "Friday70", "Frogger110", "Frogger111", "Frogger112", "Frogger2", "GIJoe70", "GIJoe71", "GI_Joe2", "Galaga70", "Galaga71", "Galaxians10", "GatewayToApshai11", "GatewayToApshai110", "GatewayToApshai130",
  "GatewayToApshai140", "Gauntlet", "Geos", "GhostFace1", "GhostFace2", "GhostFace3", "GhostFace4", "Ghostbusters200", "Ghostbusters201", "Gods2", "Gods60", "Gods70", "Gods99", "GoldenAxe2", "Goonies5", "Goonies70", "Goonies88", "Goonies90",
  "Grog1", "HalfLife 89", "HalfLife11", "HalfLife12", "HalfLife13", "HalfLife14", "HalfLife50", "HalfLife60", "HalfLife70", "HalfLife71", "HalfLife72", "HalfLife88", "HalfLife91", "HeadOverHeels3", "HeavyOnTheMagick60", "Hero100", "Hero103",
  "Hero104", "Hero50", "Hero51", "Hero52", "Hero60", "Hero70", "Hero71", "Hero72", "Hero80", "Hero81", "Hero82", "HeroQuest50", "HeroesOfKarn80", "Hobbit101", "HoraceSki2", "HunchBack10", "HunchBack70", "HunchBack71", "HungryHorace11", "HungryHorace12",
  "IK2", "IK200", "IM13", "Iceman70", "Imhotep2", "Imhotep60", "ImpossibleMission11", "ImpossibleMission130", "ImpossibleMission140", "ImpossibleMission90", "ImpossibleMsission110", "ImpossibleMsission111", "ImpossibleMsission112",
  "ImpossibleMsission113", "Infiltrator60", "Infiltrator70", "Infiltrator71", "Invaders2", "Invasion", "Ishar11", "Ishar13", "Ishar14", "Ishar15", "Ishar70", "Ishar71", "Ishar72", "Ishar80", "Ishar98", "Ishar99", "JSW10", "JSW110", "JSW111",
  "JSW112", "JSW113", "Jawbreaker", "JetPac50", "JetPac70", "JetSetWilly11", "JetSetWilly60", "JetSetWilly88", "JetSetWilly89", "Jetpac3", "Jumpman3", "Jumpman70", "JungleHunt12", "JungleHunt2", "JungleHunt50", "JungleHunt89", "JungleStory60",
  "JupiterLander70", "JupiterLander99", "KL10", "KL102", "KQ100", "KQ101", "KQ102", "Kangaroo50", "Kangaroo60", "Karateka200", "Karn1", "Killerwat50", "Killerwat51", "Killerwat60", "KingsQuest50", "KingsQuest51", "KingsQuest52", "KingsQuest53",
  "KingsQuest60", "KnightLore110", "KnightLore111", "KnightLore31", "KokotoniWilf2", "KokotoniWilf60", "KokotoniWilf70", "LCP", "LSL100", "LSL101", "LSL102", "LSL103", "LSL31", "LSL_Eve2", "LadyTut10", "LadyTut102", "LadyTut60", "LaraCroft1",
  "LaraCroft102", "LaraCroft123", "LaraCroft2", "LaraCroft21", "LastNinja10", "LastNinja110", "LastNinja111", "LastNinja130", "LastNinja131", "LastNinja140", "LeisureSuitLarry200", "LeisureSuitLarry201", "LeisureSuitLarry300", "LeisureSuitLarry50",
  "LeisureSuitLarry60", "LeisureSuitLarry61", "LeisureSuitLarry70", "LeisureSuitLarry71", "LeisureSuitLarry72", "LeisureSuitLarry73", "LeisureSuitLarry74", "LeisureSuitLarry75", "LeisureSuitLarry76", "LeisureSuitLarry77", "LeisureSuitLarry88",
  "LeisureSuitLarry89", "LeisureSuitLarry90", "LeisureSuitLarry91", "LeisureSuitLarry93", "LeisureSuitLarry94", "LodeRunner10", "LodeRunner11", "ManiacMansion11", "ManicMiner11", "ManicMiner12", "ManicMiner14", "ManicMiner50", "ManicMiner51",
  "ManicMiner52", "ManicMiner60", "ManicMiner61", "ManicMiner62", "ManicMiner63", "ManicMiner64", "MassEffect1", "MassEffect2", "MatchPoint2", "Maze", "Miner2049_1", "Miner3", "Miner70", "Miranda1", "MissileCommand", "MonkeyIsland100",
  "MonkeyIsland101", "MonkeyIsland102", "MonkeyIsland110", "MonkeyIsland111", "MonkeyIsland112", "MonkeyIsland140", "MonkeyIsland141", "MonkeyIsland142", "MonkeyIsland143", "Montezuma200", "Montezumas revenge2", "MontezumasRevenge90", "MontyMole100"
  , "MontyMole110", "MontyMole111", "MontyMole112", "MontyMole50", "MontyMole51", "MontyMole52", "MontyMole99", "MoonBuggy", "MoonZX", "Morrowind100", "Morrowind130", "Morrowind140", "Movie", "MrRobot11", "MrRobot60", "MrRobot70", "Nebulus2",
  "Nebulus50", "Nebulus90", "Neptunes daughters", "OReillyMine50", "ORileysMine2", "ORileysMine60", "Oblivion100", "Oblivion110", "Oblivion140", "Oblivion141", "OilWell50", "OilWell51", "OlympicSkier", "OlympicSkier6", "OperationWolf50", "PQ3",
  "PWE", "Pacman200", "Pacman201", "Paperboy2", "Paperboy50", "Paratroopers2", "Paratroopers3", "PharaohCurse11", "PharaohCurse110", "PharaohCurse111", "PharaohCurse112", "PharaohCurse130", "PharaohCurse140", "Pipeline50", "Pipeline51", "Pipeline88",
  "Pirates200", "Pitfall100", "Pitfall2-100", "Pitfall23", "Pitfall27", "Pitfall50", "Pitfall60", "Pitfall70", "Pitfall71", "Pitfall72", "Pitfall73", "Pitfall88", "Pitfall89", "Pitfall90", "Pitfall91", "Pitfall96", "Pitstop200", "Pitstop3", "Platoon50",
  "Pooyan3", "Popeye2", "Portal130", "Portal131", "Portal132", "Portal140", "Predator50", "Prince4", "Prince41", "Prince50", "Prince51", "PrinceMac", "Pssst", "PurpleHeart", "Pyjamarama11", "Pyjamarama50", "Pyjamarama70", "RMC50", "RadarRatRace10",
  "RadarRatRace20", "Rambo11", "Rambo3", "RedWarrior1", "ReturnToCastleWolfenstein11", "ReturnToCastleWolfenstein12", "ReturnToCastleWolfenstein13", "ReturnToCastleWolfenstein14", "RickDangerous11", "RickDangerous50", "RickDangerous51",
  "RickDangerous60", "RickDangerous70", "RiverRaid2", "RiverRaid70", "RobinHood3", "RobinOfTheWood4", "RobinOfTheWood50", "RobinOfTheWood88", "RobinToTheRescue1", "RobinToTheRescue89", "RobinsonsRequiem1", "SP111", "SP4", "SP60", "SP62",
  "SP63", "SP64", "SP65", "SP66", "SP67", "SP68", "SP69", "SP70", "SP71", "ST2", "SVS100", "SVS1001", "SVS101", "SVS1011", "SVS102", "SVS103", "SVS110", "SVS111", "SVS112", "SVS130", "SVS131", "SVS132", "SabreWulf11", "SabreWulf50", "SabreWulf87",
  "SabreWulf89", "SabreWulf99", "SammyLightfoot2", "SammyLightfoot4", "SasbreWulf60", "Scarab200", "Scramble10", "Scramble23", "Scramble60", "Scramble7", "ScubaDive60", "SeaWolf60", "SeaWolf88", "Sentinel2", "Sentinel50", "Serpentine50",
  "SexOlympics1", "SexOlympics2", "Shamus4", "Shamus60", "Shamus91", "Silkworm200", "SirFred4", "SirFred60", "SirFred61", "SirFred62", "SirFred70", "SirFred88", "Ski23", "Ski64", "SkoolDaze50", "SkoolDaze60", "SkoolDaze61", "Skullkeep",
  "Skyrim3", "Skyrim9", "SkyrimElf", "Soccer3", "Soccer99", "Sorcery31", "Sorcery70", "Sorcery88", "Sp61", "SpaceQuest10", "SpaceQuest103", "SpaceQuest200", "SpectrumGame1", "Spelunker70", "SpikesPeak1", "SpyHunter200", "SpyVsSpy41",
  "SumerGames60", "SuperDogfight3", "SwordOfFargoal200", "SwordOfFargoal201", "TempleOfApshai70", "TempleOfApshai89", "TheHobbit13", "TheHobbit14", "TheHobbit15", "TheHobbit16", "TheHobbit70", "TheHobbit71", "TheHobbit72", "TheHobbit73",
  "TheHobbit88", "TheHobbit89", "TheHobbit99", "TimeTunnel50", "TimeTunnel60", "TimeTunnel70", "TombRaider100", "TombRaider101", "TombRaider102", "TombRaider103", "TombRaider104", "TombRaider105", "TombRaider106", "TombRaider107",
  "TombRaider108", "TombRaider109", "TombRaider110", "TombRaider111", "TombRaider112", "TombRaider113", "TombRaider130", "TombRaider95", "TombRaider96", "TombRaider97", "TombRaider98", "TombRaider99", "Tombraider140", "Tombraider141",
  "Tornado1", "Tornado88", "Trashman2", "Triss", "TurboEsprit200", "Tutamkham50", "Tutanham11", "Tutanham12", "Tutankham102", "Tutankham104", "Tutankham105", "Tutankhamun88", "UW10", "UW27", "Ultima11", "Ultima50", "Ultima70", "Ultima89",
  "Underwurlde100", "Underwurlde110", "Underwurlde111", "Underwurlde130", "Underwurlde131", "Underwurlde140", "Underwurlde141", "Unknown3", "Unknown30", "Uridium2", "VIC20-2", "Valhalla2", "Valhalla88", "Vixen3", "Vixen50", "Vixen51", "Vixen70",
  "Vixen79", "Vixen89", "WOW10", "WOW104", "Wadca", "Wally88", "Wally99", "WhoDaresWins1", "WhoDaresWins10", "WhoDaresWins50", "WhoDaresWins70", "WhoDaresWins71", "WhoDaresWins88", "WinterGames10", "WinterGames11", "WinterGames79", "Witcher100",
  "Witcher101", "Witcher102", "Witcher103", "Witcher110", "Witcher111", "Witcher112", "Witcher113", "Witcher130", "Witcher47", "WizardOfWor89", "Wolf10", "Wolfenstein31", "Wolfenstein50", "Wolfenstein70", "Yennefer", "Yennefer21", "Yeppelin70",
  "ZX Spectrum", "ZX81-89", "Zak50", "Zak51", "ZakMcKraken89", "Zaxxon3", "Zaxxon70", "Zaxxon89", "Zeppelin4", "Zeppelin50", "Zeppelin88", "Zeppelin89", "ZimSalaBim2", "ZimSalaBim200", "ZimSalaBim201"
];
//console.log("DECAL_PAINTINGS", DECAL_PAINTINGS.sort());

const DECAL_CRESTS = [
  "Candles1", "Crack20", "Crack21", "Crack3", "Crack4", "DancingSkeletons2", "Ivy1", "Ivy2", "Ivy3", "Ivy4", "KnightStatue", "KnightStatue2", "LS", "PrayingSkeleton10", "Reaper", "SittingSkeleton2", "Skeleton11", "Skeleton12", "Skeleton121",
  "Skeleton20", "Skeleton21", "Skeleton23", "Skull1", "Skull10", "Skull11", "Skull2", "Skull20", "Skull3", "Skull4", "Spider-Web", "WOWc1", "WOWc2", "Web1", "Web2", "Web4", "Web5", "Web6"
];
//console.log("DECAL_CRESTS", DECAL_CRESTS.sort());

//types
const COMMON_ITEM_TYPE = {
  GoldKey: {
    class: "GoldKey",
    inventorySprite: "GoldKeyBig",
    category: "key",
    color: "Gold"
  },
  SilverKey: {
    class: "SilverKey",
    inventorySprite: "SilverKeyBig",
    category: "key",
    color: "Silver"
  },
  RedKey: {
    class: "RedKey",
    inventorySprite: "RedKeyBig",
    category: "key",
    color: "Red"
  },
  RedPotion: {
    class: "RedPotion",
    inventorySprite: "RedPotion24",
    category: "potion",
    color: "red"
  },
  BluePotion: {
    class: "BluePotion",
    inventorySprite: "BluePotion24",
    category: "potion",
    color: "blue"
  },
  Scroll: {
    class: "ClosedScroll",
    category: "scroll"
  },
  GoldCoin: {
    class: "GoldCoins",
    category: "gold"
  },
  GoldBar: {
    class: "GoldBar2",
    category: "gold"
  },
  SwordSkill: {
    class: "SwordSkill",
    category: "skill",
    which: "attack"
    //inventorySprite:
  },
  ShieldSkill: {
    class: "ShieldSkill",
    category: "skill",
    inventorySprite: "ShieldSkill24",
    which: "defense"
  },
  MagicSkill: {
    class: "MagicSkill",
    category: "skill",
    inventorySprite: "MagicSkill24",
    which: "magic"
  },
  HealthStatus: {
    class: "Health",
    category: "status",
    inventorySprite: "Health24",
    status: "health"
  },
  ManaStatus: {
    class: "Mana",
    category: "status",
    inventorySprite: "Mana24",
    status: "mana"
  }
};

const FLOOR_CONTAINER_TYPE = {
  Chest: {
    class: "ChestClosed",
    classClosed: "ChestClosed",
    classOpen: "ChestOpen"
  }
};

const MONSTER = {
  SlowSkeletonTest: {
    class: "Skeleton",
    moveSpeed: 2.0,
    SPRITE_FPS: 25,
    base: 1,
    attack: 6,
    defense: 2,
    health: 7,
    magic: 0,
    xp: 5,
    attackSound: "MonsterAttack2",
    hurtSound: "MonsterHurt",
    behaviourArguments: [],
    inventory: "SwordSkill",
    inventoryValue: 0
  },
  SlowSkeleton: {
    class: "Skeleton",
    moveSpeed: 2.0,
    SPRITE_FPS: 25,
    base: 1,
    attack: 6,
    defense: 2,
    health: 7,
    magic: 0,
    xp: 5,
    attackSound: "MonsterAttack2",
    hurtSound: "MonsterHurt",
    behaviourArguments: [],
    inventory: "GoldCoin",
    inventoryValue: 10
  },
  LittleSkelly: {
    class: "LittleSkelly",
    moveSpeed: 2.0,
    SPRITE_FPS: 25,
    base: 1,
    attack: 9,
    defense: 4,
    health: 10,
    magic: 0,
    xp: 15,
    attackSound: "MonsterAttack1",
    hurtSound: "MonsterHurt3",
    behaviourArguments: [9, ["wanderer"], 5, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 12
  },
  GreenSnake: {
    class: "GreenSnake",
    moveSpeed: 1.0,
    SPRITE_FPS: 20,
    base: 1,
    attack: 3,
    defense: 2,
    magic: 0,
    health: 4,
    xp: 4,
    attackSound: "SnakeAttack",
    hurtSound: "MonsterHurt2",
    behaviourArguments: [4, ["wanderer"], 2, ["hunt"]],
  },
  LittleGreenSnake: {
    class: "LittleGreenSnake",
    moveSpeed: 3.0,
    SPRITE_FPS: 30,
    base: 1,
    attack: 1,
    defense: 0,
    magic: 0,
    health: 2,
    xp: 2,
    attackSound: "SnakeAttack",
    hurtSound: "MonsterHurt2",
    behaviourArguments: [2, ["wanderer"], 1, ["hunt"]],
  },
  Bat: {
    class: "Bat",
    moveSpeed: 3.0,
    SPRITE_FPS: 30,
    base: -0.25,
    attack: 0,
    defense: 0,
    magic: 0,
    health: 1,
    xp: 1,
    attackSound: "BatAttack",
    hurtSound: "BatAttack",
    behaviourArguments: [Infinity, ["wanderer"], -1],
  },
  HellRat: {
    class: "HellRat",
    moveSpeed: 2.0,
    SPRITE_FPS: 30,
    base: 1,
    attack: 7,
    defense: 3,
    magic: 0,
    health: 8,
    xp: 7,
    attackSound: "MonsterAttack1",
    hurtSound: "MonsterHurt",
    behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
    inventory: "GoldCoin",
    inventoryValue: 15
  },
  Skelegoat: {
    class: "Skelegoat",
    moveSpeed: 2.0,
    SPRITE_FPS: 30,
    base: 1,
    attack: 5,
    defense: 2,
    magic: 4,
    health: 10,
    xp: 20,
    attackSound: "MonsterAttack2",
    hurtSound: "MonsterHurt2",
    mana: 3,
    caster: true,
    shootDistance: 4,
    stalkDistance: 5,
    behaviourArguments: [7, ["wanderer"], 5, ["shoot"]],
    inventory: "GoldCoin",
    inventoryValue: 25
  },
  Wizard_BossL1: {
    class: "Wizard",
    moveSpeed: 2.0,
    SPRITE_FPS: 30,
    base: 1,
    attack: 10,
    defense: 5,
    magic: 10,
    health: 25,
    xp: 100,
    attackSound: "HumanAttack1",
    hurtSound: "Ow",
    mana: 5,
    caster: true,
    shootDistance: 5,
    stalkDistance: 3,
    inventory: "MagicSkill",
    inventoryValue: 0,
    behaviourArguments: [Infinity, ["goto", "circler"], 5, ["shoot"]],
  },
  Wizard: {
    class: "Wizard",
    moveSpeed: 2.0,
    SPRITE_FPS: 30,
    base: 1,
    attack: 10,
    defense: 5,
    magic: 10,
    health: 25,
    xp: 25,
    attackSound: "HumanAttack1",
    hurtSound: "Ow",
    mana: 3,
    caster: true,
    shootDistance: 6,
    stalkDistance: 3,
    inventory: "GoldCoin",
    inventoryValue: 50,
    behaviourArguments: [8, ["wanderer"], 6, ["shoot"]],
  },
  Fox: {
    class: "Fox",
    moveSpeed: 3.5,
    SPRITE_FPS: 30,
    base: 1,
    attack: 10,
    defense: 0,
    magic: 0,
    health: 20,
    xp: 20,
    attackSound: "MonsterAttack1",
    hurtSound: "PainSqueek",
    behaviourArguments: [5, ["wanderer"], 4, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 10
  },
  Skeletona: {
    class: "Skeletona",
    moveSpeed: 1.8,
    SPRITE_FPS: 25,
    base: 1,
    attack: 12,
    defense: 8,
    health: 20,
    magic: 0,
    xp: 25,
    attackSound: "MonsterAttack2",
    hurtSound: "MonsterHurt3",
    behaviourArguments: [6, ["wanderer"], 3, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 30
  },
  Sorceress_BossL2: {
    class: "Sorceress",
    moveSpeed: 1.5,
    SPRITE_FPS: 30,
    base: 1,
    attack: 15,
    defense: 10,
    magic: 14,
    health: 35,
    xp: 150,
    attackSound: "HumanAttack1",
    hurtSound: "Ow",
    mana: 5,
    caster: true,
    shootDistance: 5,
    stalkDistance: 3,
    inventory: "MagicSkill",
    inventoryValue: 0,
    behaviourArguments: [Infinity, ["goto", "circler"], 5, ["shoot"]],
  },
  SmallEvilBat: {
    class: "SmallEvilBat",
    moveSpeed: 3.1,
    SPRITE_FPS: 30,
    base: -0.20,
    attack: 13,
    defense: 6,
    magic: 0,
    health: 15,
    xp: 15,
    attackSound: "BatAttack",
    hurtSound: "BatAttack",
    behaviourArguments: [Infinity, ["wanderer"], -1],
  },
  Sorceress: {
    class: "Sorceress",
    moveSpeed: 1.5,
    SPRITE_FPS: 30,
    base: 1,
    attack: 15,
    defense: 10,
    magic: 14,
    health: 35,
    xp: 50,
    attackSound: "HumanAttack1",
    hurtSound: "Ow",
    mana: 5,
    caster: true,
    shootDistance: 5,
    stalkDistance: 3,
    inventory: "GoldCoin",
    inventoryValue: 50,
    behaviourArguments: [7, ["wanderer"], 5, ["shoot"]],
  },
  Aunt: {
    class: "Aunt",
    moveSpeed: 1.8,
    SPRITE_FPS: 30,
    base: 1,
    attack: 13,
    defense: 10,
    magic: 0,
    health: 25,
    xp: 25,
    attackSound: "HumanAttack1",
    hurtSound: "Ow",
    inventory: "GoldCoin",
    inventoryValue: 20,
    behaviourArguments: [6, ["wanderer"], 4, ["follower"]],
  },
  Spider: {
    class: "Spider",
    moveSpeed: 2.5,
    SPRITE_FPS: 25,
    base: 1,
    attack: 20,
    defense: 10,
    magic: 5,
    health: 20,
    xp: 30,
    attackSound: "MonsterAttack2",
    hurtSound: "PainSqueek",
    behaviourArguments: [15, ["wanderer"], 4, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 20
  },
  SkeletonMajor: {
    class: "SkeletonMajor",
    moveSpeed: 2.2,
    SPRITE_FPS: 25,
    base: 1,
    attack: 18,
    defense: 14,
    health: 25,
    magic: 0,
    xp: 33,
    attackSound: "MonsterAttack2",
    hurtSound: "MonsterHurt3",
    behaviourArguments: [8, ["wanderer"], 4, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 30
  },
  LittleOrc: {
    class: "LittleOrc",
    moveSpeed: 2.4,
    SPRITE_FPS: 25,
    base: 1,
    attack: 20,
    defense: 15,
    health: 25,
    magic: 0,
    xp: 40,
    attackSound: "MonsterAttack2",
    hurtSound: "MonsterHurt2",
    behaviourArguments: [8, ["wanderer"], 3, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 35
  },
  RoomFairy: {
    class: "Fairy",
    moveSpeed: 2.0,
    SPRITE_FPS: 30,
    base: 1,
    attack: 15,
    defense: 10,
    magic: 20,
    health: 40,
    xp: 60,
    attackSound: "HumanAttack1",
    hurtSound: "Ow",
    mana: 3,
    caster: true,
    shootDistance: 5,
    stalkDistance: 4,
    inventory: "GoldCoin",
    inventoryValue: 50,
    behaviourArguments: [10, ["goto", "circler"], 5, ["shoot"]],
  },
  BlackGhost_BossL4: {
    class: "BlackGhost",
    moveSpeed: 1.5,
    SPRITE_FPS: 30,
    base: 1,
    attack: 25,
    defense: 18,
    magic: 25,
    health: 40,
    xp: 250,
    attackSound: "MonsterAttack1",
    hurtSound: "DeathPain1",
    mana: 4,
    caster: true,
    shootDistance: 5,
    stalkDistance: 3,
    inventory: "ShieldSkill",
    inventoryValue: 0,
    behaviourArguments: [Infinity, ["goto", "circler"], 5, ["shoot"]],
  },
  RoomBlackGhost: {
    class: "BlackGhost",
    moveSpeed: 1.5,
    SPRITE_FPS: 30,
    base: 1,
    attack: 25,
    defense: 18,
    magic: 25,
    health: 40,
    xp: 250,
    attackSound: "MonsterAttack1",
    hurtSound: "DeathPain1",
    mana: 4,
    caster: true,
    shootDistance: 5,
    stalkDistance: 3,
    inventory: "ShieldSkill",
    inventoryValue: 0,
    behaviourArguments: [10, ["goto", "circler"], 5, ["shoot"]],
  },
  BlackGhost: {
    class: "BlackGhost",
    moveSpeed: 1.5,
    SPRITE_FPS: 30,
    base: 1,
    attack: 25,
    defense: 18,
    magic: 25,
    health: 40,
    xp: 150,
    attackSound: "MonsterAttack1",
    hurtSound: "DeathPain1",
    mana: 4,
    caster: true,
    shootDistance: 5,
    stalkDistance: 3,
    inventory: "ShieldSkill",
    inventoryValue: 0,
    behaviourArguments: [10, ["wanderer"], 5, ["shoot"]],
  },
  Fairy: {
    class: "Fairy",
    moveSpeed: 2.0,
    SPRITE_FPS: 30,
    base: 1,
    attack: 15,
    defense: 10,
    magic: 20,
    health: 40,
    xp: 60,
    attackSound: "HumanAttack1",
    hurtSound: "Ow",
    mana: 3,
    caster: true,
    shootDistance: 4,
    stalkDistance: 5,
    inventory: "GoldCoin",
    inventoryValue: 50,
    behaviourArguments: [8, ["wanderer"], 4, ["shoot"]],
  },
  RedBat: {
    class: "RedBat",
    moveSpeed: 3.2,
    SPRITE_FPS: 30,
    base: -0.20,
    attack: 18,
    defense: 10,
    magic: 0,
    health: 25,
    xp: 20,
    attackSound: "BatAttack",
    hurtSound: "BatAttack",
    behaviourArguments: [Infinity, ["wanderer"], -1],
  },
  Badger: {
    class: "Badger",
    moveSpeed: 2.8,
    SPRITE_FPS: 25,
    base: 1,
    attack: 23,
    defense: 16,
    magic: 5,
    health: 30,
    xp: 42,
    attackSound: "MonsterAttack2",
    hurtSound: "PainSqueek",
    behaviourArguments: [15, ["wanderer"], 4, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 25
  },
  Scary: {
    class: "Scary",
    moveSpeed: 2.5,
    SPRITE_FPS: 30,
    base: 1,
    attack: 21,
    defense: 15,
    magic: 20,
    health: 35,
    xp: 65,
    attackSound: "MonsterAttack1",
    hurtSound: "Ow",
    mana: 3,
    caster: true,
    shootDistance: 4,
    stalkDistance: 5,
    inventory: "GoldCoin",
    inventoryValue: 45,
    behaviourArguments: [7, ["wanderer"], 4, ["shoot"]],
  },
  ZombieGirl: {
    class: "ZombieGirl",
    moveSpeed: 2.4,
    SPRITE_FPS: 25,
    base: 1,
    attack: 22,
    defense: 17,
    health: 30,
    magic: 0,
    xp: 45,
    attackSound: "MonsterAttack2",
    hurtSound: "MonsterHurt3",
    behaviourArguments: [7, ["wanderer"], 4, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 40
  },
  Flamy_BossL5: {
    class: "Flamy",
    moveSpeed: 1.6,
    SPRITE_FPS: 30,
    base: 1,
    attack: 30,
    defense: 22,
    magic: 30,
    health: 50,
    xp: 300,
    attackSound: "MonsterAttack2",
    hurtSound: "DeathPain1",
    mana: 5,
    caster: true,
    shootDistance: 5,
    stalkDistance: 4,
    inventory: "ManaStatus",
    inventoryValue: 0,
    behaviourArguments: [Infinity, ["goto", "circler"], 5, ["shoot"]],
  },
  RoomFlamy: {
    class: "Flamy",
    moveSpeed: 1.6,
    SPRITE_FPS: 30,
    base: 1,
    attack: 30,
    defense: 22,
    magic: 30,
    health: 50,
    xp: 300,
    attackSound: "MonsterAttack2",
    hurtSound: "DeathPain1",
    mana: 5,
    caster: true,
    shootDistance: 5,
    stalkDistance: 4,
    inventory: "ManaStatus",
    inventoryValue: 0,
    behaviourArguments: [10, ["goto", "circler"], 5, ["shoot"]],
  },
  Flamy: {
    class: "Flamy",
    moveSpeed: 1.6,
    SPRITE_FPS: 30,
    base: 1,
    attack: 30,
    defense: 22,
    magic: 30,
    health: 50,
    xp: 300,
    attackSound: "MonsterAttack2",
    hurtSound: "DeathPain1",
    mana: 5,
    caster: true,
    shootDistance: 5,
    stalkDistance: 4,
    inventory: "Scroll",
    inventoryValue: 0,
    behaviourArguments: [10, ["advancer"], 5, ["shoot"]],
  },
  WhiteWolf: {
    class: "WhiteWolf",
    moveSpeed: 2.6,
    SPRITE_FPS: 25,
    base: 1,
    attack: 25,
    defense: 18,
    magic: 7,
    health: 30,
    xp: 50,
    attackSound: "MonsterAttack2",
    hurtSound: "PainSqueek",
    behaviourArguments: [9, ["wanderer"], 4, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 30
  },
  SkeletonGeneral: {
    class: "SkeletonGeneral",
    moveSpeed: 2.5,
    SPRITE_FPS: 25,
    base: 1,
    attack: 26,
    defense: 20,
    health: 30,
    magic: 0,
    xp: 50,
    attackSound: "MonsterAttack2",
    hurtSound: "MonsterHurt3",
    behaviourArguments: [9, ["wanderer"], 4, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 40
  },
  ShabbySkeleton_BossL6: {
    class: "ShabbySkeleton",
    moveSpeed: 2.5,
    SPRITE_FPS: 25,
    base: 1,
    attack: 32,
    defense: 25,
    health: 50,
    magic: 10,
    xp: 400,
    attackSound: "MonsterAttack1",
    hurtSound: "MonsterHurt2",
    behaviourArguments: [9, ["goto", "circler"], 5, ["hunt"]],
    inventory: "SwordSkill",
    inventoryValue: 0
  },
  ShabbySkeleton: {
    class: "ShabbySkeleton",
    moveSpeed: 2.5,
    SPRITE_FPS: 25,
    base: 1,
    attack: 32,
    defense: 25,
    health: 50,
    magic: 10,
    xp: 100,
    attackSound: "MonsterAttack1",
    hurtSound: "MonsterHurt2",
    behaviourArguments: [9, ["wanderer"], 5, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 100
  },
  BlackWolf: {
    class: "BlackWolf",
    moveSpeed: 2.8,
    SPRITE_FPS: 25,
    base: 1,
    attack: 26,
    defense: 17,
    magic: 7,
    health: 40,
    xp: 75,
    attackSound: "MonsterAttack2",
    hurtSound: "PainSqueek",
    behaviourArguments: [10, ["wanderer"], 5, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 50
  },
  GreenSkelly: {
    class: "GreenSkelly",
    moveSpeed: 2.7,
    SPRITE_FPS: 25,
    base: 1,
    attack: 24,
    defense: 22,
    health: 30,
    magic: 0,
    xp: 75,
    attackSound: "MonsterAttack2",
    hurtSound: "MonsterHurt3",
    behaviourArguments: [8, ["wanderer"], 4, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 50
  },
  Scorpion: {
    class: "Scorpion",
    moveSpeed: 2.1,
    SPRITE_FPS: 25,
    base: 1,
    attack: 28,
    defense: 20,
    magic: 10,
    health: 45,
    xp: 80,
    attackSound: "MonsterAttack2",
    hurtSound: "MonsterHurt2",
    behaviourArguments: [5, ["wanderer"], 3, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 50
  },
  GreenZombie: {
    class: "GreenZombie",
    moveSpeed: 2.5,
    SPRITE_FPS: 25,
    base: 1,
    attack: 30,
    defense: 24,
    magic: 0,
    health: 50,
    xp: 100,
    attackSound: "MonsterAttack1",
    hurtSound: "MonsterHurt2",
    behaviourArguments: [8, ["wanderer"], 5, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 60
  },
  ArmoredSkelly: {
    class: "ArmoredSkelly",
    moveSpeed: 2.5,
    SPRITE_FPS: 25,
    base: 1,
    attack: 33,
    defense: 28,
    magic: 0,
    health: 55,
    xp: 120,
    attackSound: "MonsterAttack2",
    hurtSound: "MonsterHurt",
    behaviourArguments: [8, ["wanderer"], 6, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 70
  },
  SmallDragon: {
    class: "SmallDragon",
    moveSpeed: 3.5,
    SPRITE_FPS: 30,
    base: 0,
    attack: 27,
    defense: 22,
    magic: 22,
    health: 50,
    xp: 100,
    attackSound: "MonsterAttack2",
    hurtSound: "PainSqueek",
    mana: 5,
    caster: true,
    shootDistance: 5,
    stalkDistance: 3,
    inventory: "BluePotion",
    inventoryValue: 0,
    behaviourArguments: [10, ["advancer"], 5, ["shoot"]],
  },
  Croc: {
    class: "Croc",
    moveSpeed: 2.4,
    SPRITE_FPS: 25,
    base: 1,
    attack: 29,
    defense: 23,
    magic: 5,
    health: 50,
    xp: 100,
    attackSound: "MonsterAttack2",
    hurtSound: "MonsterHurt2",
    behaviourArguments: [5, ["wanderer"], 3, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 50
  },
  BlueDevil_BossL7: {
    class: "BlueDevil",
    moveSpeed: 1.9,
    SPRITE_FPS: 30,
    base: 1,
    attack: 32,
    defense: 25,
    magic: 35,
    health: 60,
    xp: 450,
    attackSound: "MonsterAttack2",
    hurtSound: "DeathPain1",
    mana: 4,
    caster: true,
    shootDistance: 6,
    stalkDistance: 4,
    inventory: "SwordSkill",
    inventoryValue: 0,
    behaviourArguments: [Infinity, ["goto", "circler"], 6, ["shoot"]],
  },
  RoomBlueDevil: {
    class: "BlueDevil",
    moveSpeed: 1.9,
    SPRITE_FPS: 30,
    base: 1,
    attack: 32,
    defense: 25,
    magic: 35,
    health: 60,
    xp: 400,
    attackSound: "MonsterAttack2",
    hurtSound: "DeathPain1",
    mana: 4,
    caster: true,
    shootDistance: 6,
    stalkDistance: 4,
    inventory: "SwordSkill",
    inventoryValue: 0,
    behaviourArguments: [10, ["goto", "circler"], 6, ["shoot"]],
  },
  BlueDevil: {
    class: "BlueDevil",
    moveSpeed: 1.9,
    SPRITE_FPS: 30,
    base: 1,
    attack: 32,
    defense: 25,
    magic: 35,
    health: 60,
    xp: 500,
    attackSound: "MonsterAttack2",
    hurtSound: "DeathPain1",
    mana: 4,
    caster: true,
    shootDistance: 6,
    stalkDistance: 4,
    inventory: "SwordSkill",
    inventoryValue: 0,
    behaviourArguments: [10, ["wanderer"], 6, ["shoot"]],
  },
  Hudobec: {
    class: "Hudobec",
    moveSpeed: 2.5,
    SPRITE_FPS: 25,
    base: 1,
    attack: 35,
    defense: 30,
    health: 50,
    magic: 10,
    xp: 125,
    attackSound: "MonsterAttack1",
    hurtSound: "MonsterHurt2",
    behaviourArguments: [8, ["wanderer"], 4, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 80
  },
  Ninja: {
    class: "Ninja",
    moveSpeed: 3.0,
    SPRITE_FPS: 30,
    base: 1,
    attack: 40,
    defense: 10,
    magic: 0,
    health: 60,
    xp: 100,
    attackSound: "HumanAttack1",
    hurtSound: "Ow",
    inventory: "GoldCoin",
    inventoryValue: 20,
    behaviourArguments: [16, ["wanderer"], 8, ["follower"]],
  },
  RedDevil_BossL8: {
    class: "RedDevil",
    moveSpeed: 2.1,
    SPRITE_FPS: 30,
    base: 1,
    attack: 36,
    defense: 30,
    magic: 40,
    health: 70,
    xp: 500,
    attackSound: "MonsterAttack2",
    hurtSound: "DeathPain1",
    mana: 4,
    caster: true,
    shootDistance: 6,
    stalkDistance: 4,
    inventory: "MagicSkill",
    inventoryValue: 0,
    behaviourArguments: [Infinity, ["goto", "circler"], 6, ["shoot"]],
  },
  RoomRedDevil: {
    class: "RedDevil",
    moveSpeed: 2.1,
    SPRITE_FPS: 30,
    base: 1,
    attack: 36,
    defense: 30,
    magic: 40,
    health: 70,
    xp: 400,
    attackSound: "MonsterAttack2",
    hurtSound: "DeathPain1",
    mana: 4,
    caster: true,
    shootDistance: 6,
    stalkDistance: 4,
    inventory: "MagicSkill",
    inventoryValue: 0,
    behaviourArguments: [9, ["goto", "circler"], 6, ["shoot"]],
  },
  RedDevil: {
    class: "RedDevil",
    moveSpeed: 2.1,
    SPRITE_FPS: 30,
    base: 1,
    attack: 36,
    defense: 30,
    magic: 40,
    health: 70,
    xp: 300,
    attackSound: "MonsterAttack2",
    hurtSound: "DeathPain1",
    mana: 4,
    caster: true,
    shootDistance: 6,
    stalkDistance: 4,
    inventory: "GoldCoin",
    inventoryValue: 100,
    behaviourArguments: [9, ["wanderer"], 6, ["shoot"]],
  },
  GreenPuffer: {
    class: "GreenPuffer",
    moveSpeed: 2.3,
    SPRITE_FPS: 25,
    base: 1,
    attack: 40,
    defense: 32,
    health: 60,
    magic: 10,
    xp: 140,
    attackSound: "MonsterAttack1",
    hurtSound: "MonsterHurt2",
    behaviourArguments: [8, ["wanderer"], 4, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 100
  },
  Knight: {
    class: "Knight",
    moveSpeed: 2.2,
    SPRITE_FPS: 30,
    base: 1,
    attack: 44,
    defense: 35,
    magic: 0,
    health: 60,
    xp: 150,
    attackSound: "HumanAttack1",
    hurtSound: "Ow",
    inventory: "GoldCoin",
    inventoryValue: 100,
    behaviourArguments: [6, ["wanderer"], 4, ["follower"]],
  },
  SmallSkelly: {
    class: "SmallSkelly",
    moveSpeed: 2.5,
    SPRITE_FPS: 25,
    base: 1,
    attack: 42,
    defense: 33,
    magic: 0,
    health: 55,
    xp: 130,
    attackSound: "MonsterAttack2",
    hurtSound: "MonsterHurt",
    behaviourArguments: [8, ["wanderer"], 6, ["hunt"]],
    inventory: "GoldCoin",
    inventoryValue: 70
  },
  RedBull_BossL9: {
    class: "RedBull",
    moveSpeed: 2.3,
    SPRITE_FPS: 30,
    base: 1,
    attack: 50,
    defense: 40,
    magic: 45,
    health: 80,
    xp: 1000,
    attackSound: "MonsterAttack2",
    hurtSound: "DeathPain1",
    mana: 4,
    caster: true,
    shootDistance: 6,
    stalkDistance: 4,
    inventory: "SwordSkill",
    inventoryValue: 0,
    behaviourArguments: [Infinity, ["goto", "circler"], 6, ["shoot"]],
  },
  RoomRedBull: {
    class: "RedBull",
    moveSpeed: 2.3,
    SPRITE_FPS: 30,
    base: 1,
    attack: 50,
    defense: 40,
    magic: 45,
    health: 80,
    xp: 500,
    attackSound: "MonsterAttack2",
    hurtSound: "DeathPain1",
    mana: 4,
    caster: true,
    shootDistance: 6,
    stalkDistance: 4,
    inventory: "SwordSkill",
    inventoryValue: 0,
    behaviourArguments: [4, ["goto", "circler"], 6, ["shoot"]],
  },
  RedBull: {
    class: "RedBull",
    moveSpeed: 2.3,
    SPRITE_FPS: 30,
    base: 1,
    attack: 50,
    defense: 40,
    magic: 45,
    health: 80,
    xp: 250,
    attackSound: "MonsterAttack2",
    hurtSound: "DeathPain1",
    mana: 4,
    caster: true,
    shootDistance: 6,
    stalkDistance: 4,
    inventory: "RedPotion",
    inventoryValue: 0,
    behaviourArguments: [10, ["wanderer"], 6, ["shoot"]],
  },
  Dragon: {
    class: "BlackDragon",
    moveSpeed: 3.0,
    SPRITE_FPS: 30,
    final_boss: true,
    base: 1,
    attack: 100,
    defense: 80,
    magic: 100,
    health: 100,
    xp: 5000,
    attackSound: "MonsterAttack1",
    hurtSound: "PainSqueek",
    mana: 10,
    caster: true,
    shootDistance: 8,
    stalkDistance: 6,
    inventory: "GoldKey",
    inventoryValue: 0,
    behaviourArguments: [Infinity, ["wanderer"], 8, ["shoot"]],
  },
  Death1: {
    class: "Death1",
    moveSpeed: 2.5,
    SPRITE_FPS: 25,
    base: 1,
    attack: 48,
    defense: 40,
    health: 50,
    magic: 10,
    xp: 250,
    attackSound: "MonsterAttack1",
    hurtSound: "MonsterHurt2",
    behaviourArguments: [8, ["wanderer"], 4, ["follower"]],
    inventory: "GoldCoin",
    inventoryValue: 250
  },
  Death2: {
    class: "Death2",
    moveSpeed: 2.5,
    SPRITE_FPS: 25,
    base: 1,
    attack: 46,
    defense: 38,
    health: 50,
    magic: 10,
    xp: 200,
    attackSound: "MonsterAttack1",
    hurtSound: "MonsterHurt2",
    behaviourArguments: [8, ["wanderer"], 4, ["advancer"]],
    inventory: "GoldCoin",
    inventoryValue: 200
  },
  Walker: {
    class: "Walker",
    moveSpeed: 2.0,
    SPRITE_FPS: 50,
    base: 1,
    attack: 75,
    defense: 0,
    magic: 100,
    health: 100,
    xp: 400,
    attackSound: "MonsterAttack1",
    hurtSound: "MonsterHurt",
    behaviourArguments: [10, ["wanderer"], 8, ["advancer"]],
    inventory: "Scroll",
    inventoryValue: 0
  },
  Cutie: {
    class: "Cutie",
    moveSpeed: 2.2,
    SPRITE_FPS: 30,
    base: 1,
    attack: 50,
    defense: 50,
    magic: 0,
    health: 60,
    xp: 300,
    attackSound: "HumanAttack1",
    hurtSound: "Ow",
    inventory: "BluePotion",
    inventoryValue: 0,
    behaviourArguments: [6, ["wanderer"], 4, ["follower"]],
  },
};

const MISSILE_TYPE = {
  Fireball: {
    class: "Fireball",
    moveSpeed: 10.0,
    SPRITE_FPS: 30,
    base: 0
  }
};

const DECAL_TYPE = {
  Painting: {
    spriteSource: DECAL_PAINTINGS,
    position: ["top", "center"]
  },
  Crest: {
    spriteSource: DECAL_CRESTS,
    position: ["center", "center"]
  }
};

const SHRINE_TYPE = {
  AttackShrine: {
    sprite: "AttackShrine",
    position: ["center", "center"],
    interactive: true,
    skill: "attack"
  },
  DefenseShrine: {
    sprite: "DefenseShrine",
    position: ["center", "center"],
    interactive: true,
    skill: "defense"
  },
  MagicShrine: {
    sprite: "MagicShrine",
    position: ["center", "center"],
    interactive: true,
    skill: "magic"
  }
};

const GATE_TYPE = {
  WoodenGate: {
    sprite: "WoodenDoor",
    position: ["center", "center"],
    interactive: true,
    locked: false,
    color: null
  },
  SilverGate: {
    sprite: "WoodenGateSilverKeyhole",
    position: ["center", "center"],
    interactive: true,
    locked: true,
    color: "Silver"
  },
  GoldGate: {
    sprite: "WoodenDoorGoldKeyhole",
    position: ["center", "center"],
    interactive: true,
    locked: true,
    color: "Gold"
  },
  RedGate: {
    sprite: "WoodenGateRedKeyhole",
    position: ["center", "center"],
    interactive: true,
    locked: true,
    color: "Red"
  }
};

const STAIRCASE_TYPE = {
  UP: {
    sprite: "UpStairs",
    position: ["center", "center"],
    interactive: true,
    direction: -1
  },
  DOWN: {
    sprite: "DownStairs",
    position: ["center", "center"],
    interactive: true,
    direction: 1
  },
  GATE: {
    sprite: "EntranceGate",
    position: ["center", "center"],
    interactive: false,
    direction: 0
  }
};

const DECAL_TYPES_COLLECTION = [DECAL_TYPE.Painting, DECAL_TYPE.Crest];

const DESTRUCTION_TYPE = {
  Explosion: {
    class: "Explosion",
    SPRITE_FPS: 60
  },
  LongExplosion: {
    class: "Explosion4",
    SPRITE_FPS: 60
  },
  SmallShortExplosion: {
    class: "SmallShortExplosion",
    SPRITE_FPS: 40
  },
  BigExplosion: {
    class: "BigExplosion",
    SPRITE_FPS: 60
  },
  ShortExplosion: {
    class: "ShortExplosion",
    SPRITE_FPS: 60
  },
  Smoke: {
    class: "Smoke",
    SPRITE_FPS: 60
  }
};

const SCROLL_TYPE = {
  Light: 130,
  Invisibility: 100,
  Map: 100,
  DrainMana: 90,
  Cripple: 90,
  BoostWeapon: 100,
  BoostArmor: 100,
  DestroyArmor: 80,
  DestroyWeapon: 80,
  Petrify: 20,
  MagicBoost: 100,
  TeleportTemple: 100,
  Luck: 100,
  HalfLife: 50
};

const MAP = {
  1: {
    width: 37,
    height: 37,
    floor: "RockFloor",
    ceil: "MorgueFloor",
    wall: "CastleWall"
  },
  2: {
    width: 37,
    height: 37,
    floor: "GreyDungeonFloor",
    ceil: "ThatchFloor",
    wall: "DungeonWall"
  },
  3: {
    width: 37,
    height: 37,
    floor: "TlakFloor3",
    ceil: "RockCeiling",
    wall: "DungeonWall2"
  },
  4: {
    width: 37,
    height: 37,
    floor: "Pavement2",
    ceil: "MorgueFloor",
    wall: "DungeonWall3"
  },
  5: {
    width: 37,
    height: 37,
    floor: "TiledFloor",
    ceil: "Rough",
    wall: "DungeonWall4"
  },
  6: {
    width: 37,
    height: 37,
    floor: "GreyDungeonFloor",
    ceil: "RockCeiling",
    wall: "CastleWall"
  },
  7: {
    width: 37,
    height: 37,
    floor: "Tile",
    ceil: "ThatchFloor",
    wall: "BlackBrickWall"
  },
  8: {
    width: 37,
    height: 37,
    floor: "RockWall",
    ceil: "Pavement2",
    wall: "BrickWall2"
  },
  9: {
    width: 37,
    height: 37,
    floor: "TlakFloor3",
    ceil: "ThatchFloor",
    wall: "StoneFloor"
  },
  10: {
    width: 37,
    height: 37,
    floor: "GreyDungeonFloor",
    ceil: "RockWall",
    wall: "StoneFloor3"
  }
};

const MOSTER_LAYOUT = {
  1: {
    start: {
      N: 1,
      monster: { LittleGreenSnake: 1 }
    },
    corridor: {
      N: 25,
      monster: {
        Bat: 2,
        LittleGreenSnake: 1,
        GreenSnake: 3,
        SlowSkeleton: 3,
        HellRat: 3,
        Skelegoat: 1.5
      }
    },
    common: {
      N: 2,
      monster: {
        Bat: 1,
        GreenSnake: 2,
        SlowSkeleton: 3,
        HellRat: 2,
        Skelegoat: 1
      }
    },
    Gold: {
      N: 2,
      monster: { Skelegoat: 2, HellRat: 1 },
      boss: { Wizard_BossL1: 1 }
    },
    Silver: {
      N: 2,
      monster: { HellRat: 2, SlowSkeleton: 1, Skelegoat: 1 },
      boss: { Skelegoat: 1 }
    },
    firstKey: {
      N: 2,
      monster: { HellRat: 2, GreenSnake: 2, SlowSkeleton: 3 },
      boss: { Skelegoat: 1 }
    },
    Red: {
      N: 2,
      monster: { HellRat: 2, GreenSnake: 2, Skelegoat: 1 },
      boss: { Skelegoat: 1 }
    },
    temple: {
      N: 1,
      monster: { Bat: 1, HellRat: 2 }
    }
  },
  2: {
    start: {
      N: 1,
      monster: { SlowSkeleton: 1 },
      //monster: { Fox: 1 },
      //monster: { LittleSkelly: 1 },
      //monster: { Skeletona: 1 },
      //monster: { Sorceress_BossL2: 1 },
    },
    corridor: {
      N: 25,
      monster: {
        LittleSkelly: 2,
        SlowSkeleton: 1,
        HellRat: 1,
        Skelegoat: 2,
        Wizard: 0.5,
        Fox: 1,
        Skeletona: 0.2
      }
    },
    common: {
      N: 2,
      monster: {
        LittleSkelly: 2,
        SlowSkeleton: 1,
        HellRat: 1,
        Skelegoat: 3,
        Wizard: 1,
        Fox: 1,
        Skeletona: 0.5
      }
    },
    Gold: {
      N: 2,
      monster: { Skelegoat: 1, LittleSkelly: 1, Fox: 1, Skeletona: 4 },
      boss: { Sorceress_BossL2: 1 }
    },
    Silver: {
      N: 2,
      monster: { LittleSkelly: 1, Skelegoat: 1, Fox: 1, Skeletona: 3 },
      boss: { Wizard: 1 }
    },
    firstKey: {
      N: 2,
      monster: { LittleSkelly: 2, Fox: 2, Skeletona: 1 },
      boss: { Skelegoat: 1 }
    },
    Red: {
      N: 2,
      monster: { LittleSkelly: 1, Skelegoat: 1, Fox: 1, Skeletona: 1 },
      boss: { Wizard: 1 }
    },
    temple: {
      N: 1,
      monster: { HellRat: 1 }
    }
  },
  3: {
    start: {
      N: 1,
      monster: { Bat: 1 },
      //monster: { Fox: 1 },
      //monster: { LittleSkelly: 1 },
      //monster: { Skeletona: 1 },
      //monster: { Aunt: 1 },
    },
    corridor: {
      N: 25,
      monster: {
        LittleSkelly: 2,
        Skelegoat: 2,
        Wizard: 1,
        Fox: 1,
        Skeletona: 2,
        SmallEvilBat: 1,
        Aunt: 0.3,
      }
    },
    common: {
      N: 2,
      monster: {
        LittleSkelly: 1,
        Skelegoat: 1,
        Wizard: 2,
        Fox: 1,
        Skeletona: 2,
        SmallEvilBat: 1,
        Aunt: 1,
      }
    },
    Gold: {
      N: 2,
      monster: { LittleSkelly: 1, Fox: 1, Skeletona: 3, Sorceress: 2, Aunt: 1 },
      boss: { Sorceress_BossL2: 1 }
    },
    Silver: {
      N: 2,
      monster: { LittleSkelly: 1, Skelegoat: 1, Fox: 1, Skeletona: 3, Aunt: 2 },
      boss: { Sorceress: 1 }
    },
    firstKey: {
      N: 2,
      monster: { LittleSkelly: 1, Fox: 2, Skeletona: 1, Aunt: 1 },
      boss: { Wizard: 1 }
    },
    Red: {
      N: 2,
      monster: { LittleSkelly: 1, Skelegoat: 1, Fox: 1, Skeletona: 1, SmallEvilBat: 1, Aunt: 1 },
      boss: { Wizard: 1, Sorceress: 2 }
    },
    temple: {
      N: 1,
      monster: { SmallEvilBat: 1 }
    }
  },
  4: {
    start: {
      N: 1,
      monster: { SmallEvilBat: 1 },
      //monster: { Spider: 1 },
      //monster: { SkeletonMajor: 1 },
      //monster: { LittleOrc: 1 },
      //monster: { BlackGhost_BossL4: 1 },
      //monster: { RoomFairy: 1 },
    },
    corridor: {
      N: 25,
      monster: {
        Wizard: 1,
        SmallEvilBat: 1,
        Aunt: 1,
        Spider: 1,
        SkeletonMajor: 1,
        LittleOrc: 0.2
      }
    },
    common: {
      N: 2,
      monster: {
        Wizard: 1,
        Aunt: 1,
        Spider: 1,
        SkeletonMajor: 1,
        LittleOrc: 0.5
      }
    },
    Gold: {
      N: 2,
      monster: { Sorceress: 1, Aunt: 1, Spider: 1, SkeletonMajor: 1, LittleOrc: 1, RoomFairy: 1 },
      boss: { BlackGhost_BossL4: 1 }
    },
    Silver: {
      N: 2,
      monster: { Aunt: 1, Spider: 1, SkeletonMajor: 1, LittleOrc: 1, RoomFairy: 1 },
      boss: { RoomFairy: 1 }
    },
    firstKey: {
      N: 2,
      monster: { Aunt: 1, Spider: 1, SkeletonMajor: 2, LittleOrc: 1 },
      boss: { Sorceress: 1 }
    },
    Red: {
      N: 2,
      monster: { Aunt: 2, Spider: 1, SkeletonMajor: 2, LittleOrc: 1 },
      boss: { Sorceress: 1, LittleOrc: 1 }
    },
    temple: {
      N: 1,
      monster: { SmallEvilBat: 1 }
    }
  },
  5: {
    start: {
      N: 1,
      monster: { RedBat: 1 },
      //monster: { SlowSkeletonTest: 1 },
    },
    corridor: {
      N: 25,
      monster: {
        Spider: 1,
        SkeletonMajor: 1,
        LittleOrc: 1,
        RedBat: 1,
        Badger: 2,
        Sorceress: 1,
      }
    },
    common: {
      N: 2,
      monster: {
        Spider: 1,
        SkeletonMajor: 2,
        LittleOrc: 1,
        RedBat: 1.5,
        Badger: 2,
        Sorceress: 1,
        Scary: 0.5,
        ZombieGirl: 0.2,
        Fairy: 0.5
      }
    },
    Gold: {
      N: 2,
      monster: { LittleOrc: 1, RoomFairy: 1, RoomBlackGhost: 1, Scary: 2, ZombieGirl: 2 },
      boss: { Flamy_BossL5: 1 }
    },
    Silver: {
      N: 2,
      monster: { SkeletonMajor: 0.5, LittleOrc: 1, RoomFairy: 1, Badger: 0.5, Scary: 1, ZombieGirl: 1 },
      boss: { RoomBlackGhost: 1 }
    },
    firstKey: {
      N: 2,
      monster: { Spider: 1, SkeletonMajor: 2, LittleOrc: 3, Badger: 1, Scary: 0.5, ZombieGirl: 0.5, Fairy: 0.5 },
      boss: { Sorceress: 1, Scary: 2, Fairy: 1 }
    },
    Red: {
      N: 2,
      monster: { SkeletonMajor: 2, LittleOrc: 1, ZombieGirl: 1, Fairy: 1 },
      boss: { LittleOrc: 1, Scary: 2, Fairy: 1 }
    },
    temple: {
      N: 1,
      monster: { RedBat: 1 }
    }
  },
  6: {
    start: {
      N: 1,
      monster: { RedBat: 1, SkeletonMajor: 1 },
      //monster: { GreenSkelly: 1 },
      //monster: { SkeletonMajor: 1 },
      //monster: { LittleOrc: 1 },
      //monster: { BlackGhost_BossL4: 1 },
      //monster: { RoomFairy: 1 },
    },
    corridor: {
      N: 25,
      monster: {
        Spider: 0.5,
        LittleOrc: 0.5,
        RedBat: 1,
        Badger: 1,
        Sorceress: 0.5,
        Scary: 0.7,
        ZombieGirl: 1,
        WhiteWolf: 1,
        Fairy: 1,
      }
    },
    common: {
      N: 2,
      monster: {
        Badger: 1,
        Sorceress: 0.5,
        Scary: 0.9,
        ZombieGirl: 1,
        WhiteWolf: 1,
        SkeletonGeneral: 0.4,
        Fairy: 1,
        BlackWolf: 1,
        GreenSkelly: 0.5
      }
    },
    Gold: {
      N: 2,
      monster: { RoomFairy: 1, RoomBlackGhost: 1, SkeletonGeneral: 1, GreenSkelly: 1 },
      boss: { ShabbySkeleton_BossL6: 1 }
    },
    Silver: {
      N: 2,
      monster: { RoomFairy: 1, Scary: 1, ZombieGirl: 1, SkeletonGeneral: 1, BlackWolf: 1, GreenSkelly: 1 },
      boss: { RoomBlackGhost: 1 }
    },
    Red: {
      N: 2,
      monster: { ZombieGirl: 1, Badger: 1, WhiteWolf: 1, SkeletonGeneral: 1, BlackWolf: 1, GreenSkelly: 1 },
      boss: { Scary: 1.1, SkeletonGeneral: 1, Fairy: 1, }
    },
    firstKey: {
      N: 2,
      monster: { Badger: 1, Scary: 1, ZombieGirl: 1, SkeletonMajor: 1, WhiteWolf: 1, Fairy: 1, BlackWolf: 1, GreenSkelly: 1 },
      boss: { Scary: 1, Fairy: 1.1, }
    },
    temple: {
      N: 1,
      monster: { SkeletonMajor: 1, Badger: 1 }
    }
  },
  7: {
    start: {
      N: 1,
      monster: { ZombieGirl: 1 },
      //monster: { Flamy: 1 },
    },
    corridor: {
      N: 25,
      monster: {
        Scary: 1,
        ZombieGirl: 1,
        WhiteWolf: 1,
        BlackWolf: 1,
        Fairy: 1,
        SkeletonGeneral: 1,
        GreenSkelly: 1,
        Scorpion: 1,

      }
    },
    common: {
      N: 2,
      monster: {
        Scary: 0.8,
        SkeletonGeneral: 1,
        Fairy: 0.6,
        BlackWolf: 1,
        GreenSkelly: 1,
        Scorpion: 1,
        SmallDragon: 0.3,
        GreenZombie: 0.4,
        Croc: 0.3
      }
    },
    Gold: {
      N: 2,
      monster: { ShabbySkeleton: 1, BlackGhost: 1, GreenZombie: 1, Flamy: 1, SmallDragon: 1 },
      boss: { BlueDevil_BossL7: 1 }
    },
    Silver: {
      N: 2,
      monster: { SkeletonGeneral: 1, BlackGhost: 1, Scorpion: 1, GreenZombie: 1, Flamy: 1, SmallDragon: 1, ShabbySkeleton: 1, Croc: 1 },
      boss: { ShabbySkeleton: 1 }
    },
    Red: {
      N: 2,
      monster: { SkeletonGeneral: 1, BlackGhost: 1, Scorpion: 1, GreenZombie: 1, Flamy: 1, SmallDragon: 1, Croc: 1 },
      boss: { RoomFlamy: 1 }
    },
    firstKey: {
      N: 2,
      monster: { SkeletonGeneral: 1, Scorpion: 1, GreenZombie: 1, Croc: 1 },
      boss: { BlackGhost: 1 }
    },
    temple: {
      N: 1,
      monster: { SkeletonGeneral: 1 }
    }
  },
  8: {
    start: {
      N: 1,
      monster: { GreenSkelly: 1 },
      //monster: { RedDevil_BossL8: 1 },
      //monster: { Hudobec: 1 },
    },
    corridor: {
      N: 25,
      monster: {
        SkeletonGeneral: 0.5,
        GreenSkelly: 0.5,
        Scorpion: 1.1,
        Scary: 1,
        Fairy: 1,
        BlackGhost: 0.6,
        Flamy: 0.4,
        Croc: 1,
        SmallDragon: 1,
        Ninja: 0.5,
        ArmoredSkelly: 0.5,
        Hudobec: 0.2,

      }
    },
    common: {
      N: 2,
      monster: {
        Scorpion: 1.1,
        SmallDragon: 1,
        GreenZombie: 0.8,
        Croc: 1,
        BlackGhost: 1,
        Flamy: 1,
        ArmoredSkelly: 1,
        Hudobec: 0.8,
        Ninja: 0.7,
        ShabbySkeleton: 0.8
      }
    },
    Gold: {
      N: 2,
      monster: { ShabbySkeleton: 1, BlackGhost: 0.5, GreenZombie: 1, Flamy: 1, SmallDragon: 1.2, ArmoredSkelly: 1.3, Hudobec: 1.2, Ninja: 1.3 },
      boss: { RedDevil_BossL8: 1 }
    },
    Silver: {
      N: 2,
      monster: { BlackGhost: 1, Scorpion: 0.8, GreenZombie: 1, Flamy: 1, SmallDragon: 1.1, ShabbySkeleton: 1, Croc: 0.6, ArmoredSkelly: 1.1, Hudobec: 1, Ninja: 1 },
      boss: { RoomBlueDevil: 1 }
    },
    Red: {
      N: 2,
      monster: { SkeletonGeneral: 1, BlackGhost: 1, Scorpion: 1, GreenZombie: 1, Flamy: 1, SmallDragon: 1, Croc: 0.8, ShabbySkeleton: 1, ArmoredSkelly: 1, Hudobec: 0.8, Ninja: 0.9 },
      boss: { ShabbySkeleton: 1 }
    },
    firstKey: {
      N: 2,
      monster: { Scorpion: 1, GreenZombie: 1, Croc: 1, BlackGhost: 1, ShabbySkeleton: 1, ArmoredSkelly: 1, Hudobec: 0.7, Ninja: 0.8 },
      boss: { SmallDragon: 1 }
    },
    temple: {
      N: 1,
      monster: { SkeletonGeneral: 1 }
    }
  },
  9: {
    start: {
      N: 1,
      monster: { Hudobec: 1, ArmoredSkelly: 1 },
      //monster: {SmallSkelly: 1}
    },
    corridor: {
      N: 25,
      monster: {
        Flamy: 1,
        SmallDragon: 1,
        Ninja: 1,
        GreenPuffer: 0.5,
        ArmoredSkelly: 1,
        Knight: 0.1,
        SmallSkelly: 0.8
      }
    },
    common: {
      N: 2,
      monster: {
        SmallDragon: 1,
        Flamy: 1,
        Ninja: 1,
        BlueDevil: 1,
        GreenPuffer: 1,
        ArmoredSkelly: 0.5,
        Knight: 0.5,
        SmallSkelly: 1
      }
    },
    Gold: {
      N: 2,
      monster: { SmallDragon: 1.2, Ninja: 1.3, BlueDevil: 1, RedDevil: 1, GreenPuffer: 1, Knight: 1.2, SmallSkelly: 1.3 },
      boss: { RedBull_BossL9: 1 }
    },
    Silver: {
      N: 2,
      monster: { Flamy: 1, SmallDragon: 1.1, Ninja: 1, BlueDevil: 1, RedDevil: 1, GreenPuffer: 1, Knight: 1.1, SmallSkelly: 1.2 },
      boss: { Knight: 1 }
    },
    Red: {
      N: 2,
      monster: { Flamy: 1, SmallDragon: 1, Ninja: 0.9, BlueDevil: 1, GreenPuffer: 1, Knight: 1, SmallSkelly: 1 },
      boss: { SmallSkelly: 1 }
    },
    firstKey: {
      N: 2,
      monster: { Ninja: 0.8, GreenPuffer: 1, Knight: 0.4, SmallSkelly: 0.8 },
      boss: { RoomBlueDevil: 1 }
    },
    temple: {
      N: 1,
      monster: { Hudobec: 1, ArmoredSkelly: 1, }
    }
  },
  10: {
    corridor: {
      N: 18,
      monster: {
        RedBull: 1,
        Knight: 1,
        Death1: 1,
        Death2: 1,
        Cutie: 1,
        Walker: 1,
      }
    },
    boss: {
      Dragon: 1,
    }
  },
};

const SPAWN = {
  INI: {
    health_potions_per_level: 6,
    mana_potions_per_level: 7,
    scrolls_per_level: 6,
    monster_on_corridors: 25,
    gold_per_level: 6
  },
  init() {
    for (const item in COMMON_ITEM_TYPE) {
      let sprite = COMMON_ITEM_TYPE[item].class;
      ASSET[sprite] = new LiveSPRITE("1D", [SPRITE[sprite]]);
    }
  },
  stairs(map, level, upperLimit) {
    map.entranceVector = map.deadEndDirection(map.entrance);
    let upGrid = map.entrance.add(map.entranceVector.mirror());
    let stairsUp;
    if (level > upperLimit) {
      stairsUp = new Staircase(upGrid, map.entranceVector, STAIRCASE_TYPE.UP);
      map.GA.addStair(upGrid);
    } else {
      stairsUp = new Staircase(upGrid, map.entranceVector, STAIRCASE_TYPE.GATE);
    }
    map.GA.reserve(upGrid); //new, check
    DECAL.add(stairsUp);

    map.exitVector = map.deadEndDirection(map.exit);
    let downGrid = map.exit.add(map.exitVector.mirror());
    let stairsDown = new Staircase(downGrid, map.exitVector, STAIRCASE_TYPE.DOWN);
    map.GA.addStair(downGrid);
    map.GA.reserve(downGrid); //new, check
    DECAL.add(stairsDown);
  },
  shrines(map) {
    const SHRINES = [
      SHRINE_TYPE.AttackShrine,
      SHRINE_TYPE.DefenseShrine,
      SHRINE_TYPE.MagicShrine
    ];
    for (const [index, shrine] of map.shrines.entries()) {
      let DE_Dir = map.deadEndDirection(shrine);
      let wallGrid = shrine.add(DE_Dir.mirror());
      map.GA.reserve(wallGrid);
      let shr = new Shrine(wallGrid, DE_Dir, SHRINES[index]);
      DECAL.add(shr);
    }
  },
  mapPointers(map) {
    map.map_pointers = [
      map.shrines.chooseRandom(),
      map.keys.Red,
      map.keys.Silver,
      map.keys.Gold
    ];
  },
  dungeonObjects(map, level, upperLimit) {
    this.stairs(map, level, upperLimit);

    //keys and gates
    let gateCounter = 0;
    for (let key in map.keys) {
      let grid = map.keys[key];
      let item = new CommonItem(grid, COMMON_ITEM_TYPE[key + "Key"]);
      FLOOR_OBJECT_WIDE.add(item);
    }
    for (let gate in map.lockedRooms) {
      gateCounter++;
      let gateName = `${gate}Gate`;
      let door = map.lockedRooms[gate].door[0];
      for (const dir of ENGINE.directions) {
        let grid = door.add(dir);
        if (map.GA.isEmpty(grid)) {
          let gateInstance = new Gate(door, dir, GATE_TYPE[gateName]);
          gateInstance.masterId = gateCounter;
          DECAL.add(gateInstance);
        }
      }
    }

    //close all doors of common rooms
    const ignore = ["Silver", "Gold", "Red"];
    for (let R of map.rooms) {
      if (ignore.includes(R.type)) continue;
      for (let D of R.door) {
        map.GA.closeDoor(D);
        gateCounter++;
        for (const dir of ENGINE.directions) {
          let grid = D.add(dir);
          if (map.GA.isEmpty(grid)) {
            let gateInstance = new Gate(D, dir, GATE_TYPE.WoodenGate);
            gateInstance.masterId = gateCounter;
            DECAL.add(gateInstance);
          }
        }
      }
    }

    this.shrines(map);
    this.mapPointers(map);
  },
  arena(map, level, upperLimit) {
    let t0 = performance.now();
    //dungeon objects
    this.stairs(map, level, upperLimit);

    //lock golden gate
    let gateCounter = 0;
    for (let gate in map.lockedRooms) {
      gateCounter++;
      let gateName = `${gate}Gate`;
      let door = map.lockedRooms[gate].door[0];
      for (const dir of ENGINE.directions) {
        let grid = door.add(dir);
        if (map.GA.isEmpty(grid)) {
          let gateInstance = new Gate(door, dir, GATE_TYPE[gateName]);
          gateInstance.masterId = gateCounter;
          DECAL.add(gateInstance);
        }
      }
    }

    //shrines
    this.shrines(map);

    //decals
    let N = (map.width * map.height * (1 - parseFloat(map.density)) * 0.75) | 0;
    let corrDecalGrids = map.poolOfCorridorDecalGrids(N);
    let type = { Painting: 20, Crest: 1.5 };
    for (let grid of corrDecalGrids) {
      DECAL.add(new Decal(grid.grid, grid.dir, DECAL_TYPE[weightedRnd(type)]));
    }
    this.arenaItems(map);
    this.arena_monsters(map, level);
    map.map_pointers = [...map.shrines];
    console.log(
      `%cLevel ${GAME.level} spawned in ${performance.now() - t0} ms`,
      "color: orange"
    );
  },
  spawn(map, level, upperLimit) {
    console.log("spawning level...", level);
    let t0 = performance.now();
    this.dungeonObjects(map, level, upperLimit);
    this.monsters(map, level);
    this.decals(map);
    this.containers(map);
    this.items(map);
    console.log(
      `%cLevel ${GAME.level} spawned in ${performance.now() - t0} ms`,
      "color: orange"
    );
  },
  arena_monsters(map, level) {
    let corrGrids = map.poolOfCorridorGrids(MOSTER_LAYOUT[level].corridor.N);
    for (let grid of corrGrids) {
      let type = weightedRnd(MOSTER_LAYOUT[level].corridor.monster);
      let enemy = new Monster(
        grid,
        map.GA.getDirectionsIfNot(grid, MAPDICT.WALL).chooseRandom(),
        MONSTER[type]
      );
      ENEMY_RC.add(enemy);
    }
    //boss
    let boss = MOSTER_LAYOUT[level].boss;
    let N = Object.keys(boss).length;
    corrGrids = map.poolOfCorridorGrids(N);
    for (let [index, monster] of Object.keys(boss).entries()) {
      let grid = corrGrids[index];
      let enemy = new Monster(
        grid,
        map.GA.getDirectionsIfNot(grid, MAPDICT.WALL).chooseRandom(),
        MONSTER[monster]
      );
      ENEMY_RC.add(enemy);
    }

    //analysis
    if (DEBUG.VERBOSE) ENEMY_RC.analyze();
  },
  monsters(map, level) {
    let corrGrids = map.poolOfCorridorGrids(MOSTER_LAYOUT[level].corridor.N);
    for (let grid of corrGrids) {
      let type = weightedRnd(MOSTER_LAYOUT[level].corridor.monster);
      let enemy = new Monster(
        grid,
        map.GA.getDirectionsIfNot(grid, MAPDICT.WALL).chooseRandom(),
        MONSTER[type]
      );
      ENEMY_RC.add(enemy);
    }
    for (let R of map.rooms) {
      let N = MOSTER_LAYOUT[level][R.type].N;
      for (let i = 0; i < N; i++) {
        let space = map.findSpace(R.area);
        let type = weightedRnd(MOSTER_LAYOUT[level][R.type].monster);
        let enemy = new Monster(
          space,
          map.GA.getDirectionsIfNot(space, MAPDICT.WALL).chooseRandom(),
          MONSTER[type]
        );
        let guardPosition = map.findMiddleSpaceUnreserved(R.area);
        enemy.guardPosition = guardPosition;
        ENEMY_RC.add(enemy);
      }
      //boss
      let boss = MOSTER_LAYOUT[level][R.type].boss;
      if (boss) {
        let space = map.findSpace(R.area);
        let type = weightedRnd(MOSTER_LAYOUT[level][R.type].boss);
        let enemy = new Monster(
          space,
          map.GA.getDirectionsIfNot(space, MAPDICT.WALL).chooseRandom(),
          MONSTER[type]
        );
        let guardPosition = map.findMiddleSpaceUnreserved(R.area);
        enemy.guardPosition = guardPosition;
        ENEMY_RC.add(enemy);
      }
    }

    //analysis
    if (DEBUG.VERBOSE) ENEMY_RC.analyze();
  },
  decals(map) {
    for (const room of map.rooms) {
      const t = 0.25 * room.squareSize + 0.4;
      let N = RND(
        Math.max((t >>> 0) - 1, 1, (room.squareSize / 8) >>> 0),
        Math.round(t + 0.75)
      );
      let wallGrids = map.roomWallGrids(room);
      while (N > 0 && wallGrids.length > 0) {
        let grid = wallGrids.removeRandom();
        map.GA.reserve(grid); //room wall grid reservation
        let type = { Painting: 20, Crest: 1 };
        DECAL.add(
          new Decal(grid.grid, grid.dir, DECAL_TYPE[weightedRnd(type)])
        );
        N--;
      }
    }
    let N = (map.width * map.height * parseFloat(map.density) * 0.13) | 0;
    let corrDecalGrids = map.poolOfCorridorDecalGrids(N);
    for (let grid of corrDecalGrids) {
      DECAL.add(new Decal(grid.grid, grid.dir, DECAL_TYPE.Crest));
    }
  },
  containers(map) {
    for (const room of map.rooms) {
      let corner = map.roomCornerGrids(room);
      let position = Grid.toCenter(corner.grid).translate(
        Vector.sumVectors(corner.dir.clone()),
        0.25
      );
      let faceDir = Vector.sumVectors(corner.dir)
        .ortoSplit()
        .filter((el) => !el.isNull())
        .chooseRandom()
        .mirror();
      let container = new FloorContainer(
        position,
        faceDir,
        FLOOR_CONTAINER_TYPE.Chest
      );
      FLOOR_OBJECT_WIDE.add(container);
    }
  },
  arenaItems(map) {
    //mana potions
    let corridorPool = map.poolOfCorridorGrids(SPAWN.INI.mana_potions_per_level);
    for (const grid of corridorPool) {
      let BluePotion = new CommonItem(grid, COMMON_ITEM_TYPE.BluePotion);
      FLOOR_OBJECT_WIDE.add(BluePotion);
    }
    //health potions
    corridorPool = map.poolOfCorridorGrids(SPAWN.INI.health_potions_per_level);
    for (const grid of corridorPool) {
      let RedPotion = new CommonItem(grid, COMMON_ITEM_TYPE.RedPotion);
      FLOOR_OBJECT_WIDE.add(RedPotion);
    }
    //scrolls
    corridorPool = map.poolOfCorridorGrids(SPAWN.INI.scrolls_per_level);
    for (const grid of corridorPool) {
      let Scroll = new CommonItem(grid, COMMON_ITEM_TYPE.Scroll);
      FLOOR_OBJECT_WIDE.add(Scroll);
    }
    //gold, COMMON_ITEM_TYPE.Gold
    corridorPool = map.poolOfCorridorGrids(SPAWN.INI.gold_per_level);
    for (const grid of corridorPool) {
      let Gold = new CommonItem(grid, COMMON_ITEM_TYPE.GoldBar, RND(75, 125));
      FLOOR_OBJECT_WIDE.add(Gold);
    }
    //skills and h/m
    const total = 5;
    let skillsAndStats = [
      COMMON_ITEM_TYPE.HealthStatus,
      COMMON_ITEM_TYPE.ManaStatus,
      COMMON_ITEM_TYPE.MagicSkill,
      COMMON_ITEM_TYPE.ShieldSkill,
      COMMON_ITEM_TYPE.SwordSkill
    ];
    corridorPool = map.poolOfCorridorGrids(total);
    for (let i = 0; i < total; i++) {
      let item = new CommonItem(corridorPool[i], skillsAndStats[i], 0);
      FLOOR_OBJECT_WIDE.add(item);
    }

  },
  items(map) {

    //health potions
    let roomPool = map.poolOfRoomGrids(SPAWN.INI.health_potions_per_level);
    for (const grid of roomPool) {
      let RedPotion = new CommonItem(grid, COMMON_ITEM_TYPE.RedPotion);
      FLOOR_OBJECT_WIDE.add(RedPotion);
    }
    //mana potions
    let corridorPool = map.poolOfCorridorGrids(
      SPAWN.INI.mana_potions_per_level
    );
    for (const grid of corridorPool) {
      let BluePotion = new CommonItem(grid, COMMON_ITEM_TYPE.BluePotion);
      FLOOR_OBJECT_WIDE.add(BluePotion);
    }
    //scrolls
    let anyPool = map.poolOfGrids(SPAWN.INI.scrolls_per_level);
    for (const grid of anyPool) {
      let Scroll = new CommonItem(grid, COMMON_ITEM_TYPE.Scroll);
      FLOOR_OBJECT_WIDE.add(Scroll);
    }
    //gold, COMMON_ITEM_TYPE.Gold
    anyPool = map.poolOfGrids(SPAWN.INI.gold_per_level);
    for (const grid of anyPool) {
      let Gold = new CommonItem(grid, COMMON_ITEM_TYPE.GoldCoin, RND(10, 50));
      FLOOR_OBJECT_WIDE.add(Gold);
    }

    anyPool = map.poolOfGrids(SPAWN.INI.gold_per_level);
    for (const grid of anyPool) {
      let Gold = new CommonItem(grid, COMMON_ITEM_TYPE.GoldBar, RND(50, 100));
      FLOOR_OBJECT_WIDE.add(Gold);
    }

    //skills and h/m
    const total = 5;
    let skillsAndStats = [
      COMMON_ITEM_TYPE.HealthStatus,
      COMMON_ITEM_TYPE.ManaStatus,
      COMMON_ITEM_TYPE.MagicSkill,
      COMMON_ITEM_TYPE.ShieldSkill,
      COMMON_ITEM_TYPE.SwordSkill
    ];
    let DE = map.freeDeadEnds(total);
    let remain = total - DE.length;
    if (remain > 0) {
      let addFromRoom = map.poolOfRoomGrids(remain);
      DE = DE.concat(addFromRoom);
    }
    for (let [index, grid] of DE.entries()) {
      let item = new CommonItem(grid, skillsAndStats[index], 0);
      FLOOR_OBJECT_WIDE.add(item);
    }
  }
};
console.log("%cMAP for CrawlMaster loaded.", "color: #888");