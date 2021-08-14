//Assets for CrawlMaster
/*jshint -W097 */
"use strict";

console.log("%cAssets for CrawlMaster ready.", "color: orange");

var LoadTextures = [
  { srcName: "StoneFloor3_128.jpg", name: "StoneFloor3" },
  { srcName: "DungeonWall128.jpg", name: "DungeonWall" },
  { srcName: "DungeonWall2_128.jpg", name: "DungeonWall2" },
  { srcName: "DungeonWall3_128.jpg", name: "DungeonWall3" },
  { srcName: "GreenDungeonWall128.jpg", name: "GreenDungeonWall" },
  { srcName: "StoneFloor128.jpg", name: "StoneFloor" },
  { srcName: "Pavement1_128.jpg", name: "Pavement" },
  { srcName: "Pavement128.jpg", name: "Pavement2" },
  { srcName: "TlakFloor3_128.jpg", name: "TlakFloor3" },
  { srcName: "RockFloor.jpg", name: "RockFloor" },
  { srcName: "DungeonFloor128.jpg", name: "DungeonFloor" },
  { srcName: "MorgueFloor.jpg", name: "MorgueFloor" },
  { srcName: "BrickWall3_128.jpg", name: "BrickWall3" },
  { srcName: "ThatchFloor128.jpg", name: "ThatchFloor" },
  { srcName: "OldWall128.jpg", name: "OldWall" },
  { srcName: "RockWall128.jpg", name: "RockWall" },
  { srcName: "GreyDungeonFloor128.jpg", name: "GreyDungeonFloor" },
  { srcName: "BlockCeiling128.jpg", name: "BlockCeiling" },
  { srcName: "CastleWall.jpg", name: "CastleWall" },
  { srcName: "StoneWall2_128.jpg", name: "StoneWall2" },
  { srcName: "BrickWall2_128.jpg", name: "BrickWall2" },
  { srcName: "BrickWall3_128.jpg", name: "BrickWall3" },
  { srcName: "BlackBrickWall128.jpg", name: "BlackBrickWall" },
  { srcName: "BrokenRuin128.jpg", name: "BrokenRuin" },
  { srcName: "DirtFloor.jpg", name: "DirtFloor" },
  { srcName: "RockCeiling.jpg", name: "RockCeiling" },
  { srcName: "TiledFloor5.jpg", name: "TiledFloor" },
  { srcName: "Rough1.jpg", name: "Rough" },
  { srcName: "Wall6.jpg", name: "DungeonWall4" },
  { srcName: "Tile1.jpg", name: "Tile" },
];
var LoadSprites = [
  { srcName: "CM_title.png", name: "Title" },
  { srcName: "Sword12.png", name: "SwordSkill" },
  { srcName: "Magic16.png", name: "MagicSkill" },
  { srcName: "shield16.png", name: "ShieldSkill" },
  { srcName: "Heart16.png", name: "Health" },
  { srcName: "MagicOrb16.png", name: "Mana" },
  { srcName: "Magic24.png", name: "MagicSkill24" },
  { srcName: "shield24.png", name: "ShieldSkill24" },
  { srcName: "Heart24.png", name: "Health24" },
  { srcName: "MagicOrb24.png", name: "Mana24" },
  { srcName: "GoldBar24_2.png", name: "GoldBar2" },
  { srcName: "GoldCoins24.png", name: "GoldCoins" },
  { srcName: "MagicShrine.png", name: "MagicShrine" },
  { srcName: "DefenseShrine.png", name: "DefenseShrine" },
  { srcName: "AttackShrine.png", name: "AttackShrine" },
  { srcName: "Sword180.png", name: "SwordPOV" },
  { srcName: "Invisible24.png", name: "Invisible" },
  { srcName: "Clover24.png", name: "Clover" },
  { srcName: "Lantern24.png", name: "Lantern" },
  //{ srcName: "lantern.png", name: "LanternBig" },
  { srcName: "Scroll24.png", name: "ClosedScroll" },
  { srcName: "BluePotion16.png", name: "BluePotion" },
  { srcName: "RedPotion16.png", name: "RedPotion" },
  { srcName: "bluePotion24.png", name: "BluePotion24" },
  { srcName: "RedPotion24.png", name: "RedPotion24" },
  { srcName: "divLineB_200.png", name: "LineBottom" },
  { srcName: "divLineT_200.png", name: "LineTop" },
  { srcName: "UpStairs3.png", name: "UpStairs" },
  { srcName: "DownStairs2.png", name: "DownStairs" },
  { srcName: "EntranceGate.png", name: "EntranceGate" },
  { srcName: "WoodenDoorGoldKeyhole.png", name: "WoodenDoorGoldKeyhole" },
  { srcName: "WoodenGateSilverKeyhole.png", name: "WoodenGateSilverKeyhole" },
  { srcName: "WoodenGateRedKeyhole.png", name: "WoodenGateRedKeyhole" },
  { srcName: "WoodenDoor.png", name: "WoodenDoor" },
  { srcName: "WoodenDoor64.png", name: "WoodenDoor64" },
  { srcName: "RedKeySmall.png", name: "RedKey" },
  { srcName: "GoldKeySmall.png", name: "GoldKey" },
  { srcName: "SilverKeySmall.png", name: "SilverKey" },
  { srcName: "RedKey.png", name: "RedKeyBig" },
  { srcName: "GoldKey.png", name: "GoldKeyBig" },
  { srcName: "SilverKey.png", name: "SilverKeyBig" },
  { srcName: "LSgrb.png", name: "Crest" },
  { srcName: "SVS7.png", name: "SVS1" },
  { srcName: "SVS6.png", name: "SVS2" },
  { srcName: "SVS4.png", name: "SVS3" },
  { srcName: "SpyVsSpyPicture.png", name: "SVS4" },
  { srcName: "DM8.png", name: "DM1" },
  { srcName: "DM7.png", name: "DM2" },
  { srcName: "DM5.png", name: "DM3" },
  { srcName: "DM3.png", name: "DM4" },
  { srcName: "DungeonMasterPicture3.png", name: "DM5" },
  { srcName: "DungeonMasterPicture2.png", name: "DM6" },
  { srcName: "DungeonMasterPicture.png", name: "DM7" },
  { srcName: "TR8.png", name: "TR1" },
  { srcName: "TR4.png", name: "TR2" },
  { srcName: "TR3.png", name: "TR3" },
  { srcName: "TR2.png", name: "TR2" },
  { srcName: "TR1.png", name: "TR1" },
  { srcName: "CH1.png", name: "CH1" },
  { srcName: "UU.png", name: "UU" },
  { srcName: "Wow3.png", name: "WOW3" },
  { srcName: "WizardOfWor.png", name: "WOW1" },
  { srcName: "AA9.png", name: "AA9" },
  { srcName: "AA8.png", name: "AA8" },
  { srcName: "AA7.png", name: "AA7" },
  { srcName: "AA5.png", name: "AA5" },
  { srcName: "AA4.png", name: "AA4" },
  { srcName: "AA3.png", name: "AA3" },
  { srcName: "AA2.png", name: "AA2" },
  { srcName: "AticAtacPicture.png", name: "AA1" },
  { srcName: "Hero2.png", name: "Hero2" },
  { srcName: "HERO3.png", name: "Hero3" },
  { srcName: "HeroPicture.png", name: "Hero1" },
  { srcName: "Bagitman.png", name: "Bagitman" },
  { srcName: "AMC.png", name: "AMC" },
  { srcName: "Horace.png", name: "Horace" },
  { srcName: "Horace2.png", name: "Horace2" },
  { srcName: "Walls.png", name: "Walls" },
  { srcName: "Hunch.png", name: "Hunchback" },
  { srcName: "Amber.png", name: "Amberstar" },
  { srcName: "Soc.png", name: "Soccer" },
  { srcName: "LSL7.png", name: "LSL7" },
  { srcName: "LSL6.png", name: "LSL6" },
  { srcName: "LSL4.png", name: "LSL4" },
  { srcName: "LSL3.png", name: "LSL3" },
  { srcName: "LSL2.png", name: "LSL2" },
  { srcName: "LSL1.png", name: "LSL1" },
  { srcName: "Vixen2.png", name: "Vixen2" },
  { srcName: "vixen.png", name: "Vixen1" },
  { srcName: "Prince2.png", name: "Prince2" },
  { srcName: "Prince.png", name: "Prince1" },
  { srcName: "Ultima2.png", name: "Ultima2" },
  { srcName: "Ultima1.png", name: "Ultima1" },
  { srcName: "Arena.png", name: "Arena" },
  { srcName: "Robin.png", name: "Robin" },
  { srcName: "Falcon.png", name: "Falcon" },
  { srcName: "EOB4.png", name: "EOB4" },
  { srcName: "EOB3.png", name: "EOB3" },
  { srcName: "EOB2.png", name: "EOB2" },
  { srcName: "EOB1.png", name: "EOB1" },
  { srcName: "HOB5.png", name: "HOB5" },
  { srcName: "HOB4.png", name: "HOB4" },
  { srcName: "HOB2.png", name: "HOB2" },
  { srcName: "TheHobbitPicture.png", name: "HOB1" },
  { srcName: "Maniac.png", name: "Maniac" },
  { srcName: "Kara.png", name: "Karateka" },
  { srcName: "Eric.png", name: "Eric" },
  { srcName: "ST.png", name: "ST" },
  { srcName: "C64.png", name: "C64" },
  { srcName: "JSW2.png", name: "JSW2" },
  { srcName: "IM.png", name: "IM" },
  { srcName: "moon.png", name: "Moon" },
  { srcName: "monkey.png", name: "MonkeyIsland" },
  { srcName: "winter.png", name: "Winter" },
  { srcName: "manic.png", name: "ManicMiner" },
  { srcName: "Castle.png", name: "Castle" },
  { srcName: "Valhalla.png", name: "Valhalla" },
  { srcName: "Fred2.png", name: "Fred2" },
  { srcName: "fred.png", name: "Fred1" },
  { srcName: "Miner.png", name: "Miner" },
  { srcName: "Sorcery3.png", name: "Sorcery3" },
  { srcName: "cavelon.png", name: "Cavelon" },
  { srcName: "penta.png", name: "Penta" },
  { srcName: "blue.png", name: "BlueMax" },
  { srcName: "trash.png", name: "trash" },
  { srcName: "sabre2.png", name: "sabre2" },
  { srcName: "ski.png", name: "ski" },
  { srcName: "zx1.png", name: "zx1" },
  { srcName: "Tut2.png", name: "Tut2" },
  { srcName: "SW2.png", name: "SW2" },
  { srcName: "LTUT.png", name: "LTUT" },
  { srcName: "RRR.png", name: "RRR" },
  { srcName: "FF4.png", name: "FF4" },
  { srcName: "FF2.png", name: "FF2" },
  { srcName: "ForbiddenForest.png", name: "FF1" },
  { srcName: "Phara.png", name: "Phara" },
  { srcName: "Invaders.png", name: "Invaders" },
  { srcName: "Pitfall.png", name: "Pitfall" },
  { srcName: "Aztec.png", name: "Aztec" },
  { srcName: "Pitfall2.png", name: "Pitfall2" },
  { srcName: "Pitfall3.png", name: "Pitfall3" },
  { srcName: "DK.png", name: "DK" },
  { srcName: "PAC2.png", name: "PAC2" },
  { srcName: "galaxian.png", name: "galaxian" },
  { srcName: "Tut.png", name: "Tut" },
  { srcName: "Apshai.png", name: "Apshai" },
  { srcName: "Under.png", name: "Under" },
  { srcName: "Dig.png", name: "DigDug" },
  { srcName: "Lode.png", name: "Lode" },
  { srcName: "JSW.png", name: "JSW" },
  { srcName: "Frogger.png", name: "Frogger" },
  { srcName: "Knightlore.png", name: "Knightlore" },
  { srcName: "Galaga1.png", name: "Galaga1" },
  { srcName: "BoogaBoo3.png", name: "BoogaBoo3" },
  { srcName: "BoogaBoo1.png", name: "BoogaBoo1" },
  { srcName: "ArcticShipwreck.png", name: "ArcticShipwreck" },
  { srcName: "BC1.png", name: "BC1" },
  { srcName: "Jupiter_Lander.png", name: "Jupiter_Lander" },
  { srcName: "CrystalCastles.png", name: "CrystalCastles" },
  { srcName: "SVS11.png", name: "SVS11" },
  { srcName: "SVS10.png", name: "SVS10" },
  { srcName: "ZimSalaBim.png", name: "ZimSalaBim" },
  { srcName: "Barbarian1.png", name: "Barbarian1" },
  { srcName: "BeachHead.png", name: "BeachHead" },
  { srcName: "BFF.png", name: "BFF" },
  { srcName: "Paratroopers.png", name: "Paratroopers" },
  { srcName: "CastleTerror.png", name: "CastleTerror" },
  { srcName: "OMine.png", name: "OMine" },
  { srcName: "MrRobot.png", name: "MrRobot" },
  { srcName: "Impossible_Mission4.png", name: "Impossible_Mission4" },
  { srcName: "Drelbs.png", name: "Drelbs" },
  { srcName: "FalconPatrol2.png", name: "FalconPatrol2" },
  { srcName: "Wolf1.png", name: "Wolf1" },
  { srcName: "Wolf2.png", name: "Wolf2" },
  { srcName: "Zaxxon.png", name: "Zaxxon" },
  { srcName: "HL1.png", name: "HL1" },
  { srcName: "HL2.png", name: "HL2" },
  { srcName: "DK2.png", name: "DK2" },
  { srcName: "Pitfall4.png", name: "Pitfall4" },
  { srcName: "Jumpman.png", name: "Jumpman" },
  { srcName: "Pitstop.png", name: "Pitstop" },
  { srcName: "Montezuma.png", name: "Montezuma" },
  { srcName: "Pipeline.png", name: "Pipeline" },
  { srcName: "DM13.png", name: "DM13" },
  { srcName: "Goonies.png", name: "Goonies" },
  { srcName: "HOB11.png", name: "HOB11" },
  { srcName: "Sorcery2.png", name: "Sorcery2" },
  { srcName: "Commando2.png", name: "Commando2" },
  { srcName: "SOF.png", name: "SOF" },
  { srcName: "WDW.png", name: "WDW" },
  { srcName: "Zak.png", name: "Zak" },
  { srcName: "TheSentinel.png", name: "TheSentinel" },
  { srcName: "DM12.png", name: "DM12" },
  { srcName: "Cuthbert1.png", name: "Cuthbert1" },
  { srcName: "RickDangerous.png", name: "RickDangerous" },
  { srcName: "Killerwat.png", name: "Killerwat" },
  { srcName: "DM11.png", name: "DM11" },
  { srcName: "DDID2.png", name: "DDID2" },
  { srcName: "Gods.png", name: "Gods" },
  { srcName: "JetPac.png", name: "JetPac" },
  { srcName: "JumpmanJr.png", name: "JumpmanJr" },
  { srcName: "CyberPunk1.png", name: "CyberPunk1" },
  { srcName: "KQ1.png", name: "KQ1" },
  { srcName: "Wally.png", name: "Wally" },
  { srcName: "JSW3.png", name: "JSW3" },
  { srcName: "Choplifter.png", name: "Choplifter" },
  { srcName: "Barbarian5.png", name: "Barbarian5" },
  { srcName: "HoraceSki.png", name: "HoraceSki" },
  { srcName: "Iceman.png", name: "Iceman" },
  { srcName: "CSB1.png", name: "CSB1" },
  { srcName: "WOW2.png", name: "WOW2" },
  { srcName: "SQ1.png", name: "SQ1" },
  { srcName: "Galaxian3.png", name: "Galaxian3" },
  { srcName: "CW3.png", name: "CW3" },
  { srcName: "CW2.png", name: "CW2" },
  { srcName: "CW1.png", name: "CW1" },
  { srcName: "Web2.png", name: "Web2" },
  { srcName: "Web1.png", name: "Web1" },
  { srcName: "SkeletonOnTheWall.png", name: "SkeletonOnTheWall" },
  { srcName: "Torch.png", name: "Torch" },
  { srcName: "Web4.png", name: "Web4" },
  { srcName: "CW6.png", name: "CW6" },
  { srcName: "HL4.png", name: "HL4" },
  { srcName: "CW5.png", name: "CW5" },
  { srcName: "SW4.png", name: "SW4" },
  { srcName: "LastNinja1.png", name: "LastNinja1" },
  { srcName: "FA3.png", name: "FA3" },
  { srcName: "FA2.png", name: "FA2" },
  { srcName: "FireAnt.png", name: "FireAnt" },
  { srcName: "TR10.png", name: "TR10" },
  { srcName: "Portal1.png", name: "Portal1" },
  { srcName: "Cavelon3.png", name: "Cavelon3" },
  { srcName: "LSL20.png", name: "LSL20" },
  { srcName: "HL3.png", name: "HL3" },
  { srcName: "Pooyan.png", name: "Pooyan" },
  { srcName: "Kangaroo.png", name: "Kangaroo.png" },
  { srcName: "Invisibility.png", name: "SCR_Invisibility" },
  { srcName: "DestroyArmor.png", name: "SCR_DestroyArmor" },
  { srcName: "DestroyWeapon.png", name: "SCR_DestroyWeapon" },
  { srcName: "BoostArmor.png", name: "SCR_BoostArmor" },
  { srcName: "BoostWeapon.png", name: "SCR_BoostWeapon" },
  { srcName: "Map.png", name: "SCR_Map" },
  { srcName: "TeleportTemple.png", name: "SCR_TeleportTemple" },
  { srcName: "scroll32.png", name: "Scroll" },
  { srcName: "HalfLife.png", name: "SCR_HalfLife" },
  { srcName: "Cripple.png", name: "SCR_Cripple" },
  { srcName: "Light.png", name: "SCR_Light" },
  { srcName: "MagicBoost.png", name: "SCR_MagicBoost" },
  { srcName: "Luck.png", name: "SCR_Luck" },
  { srcName: "DrainMana.png", name: "SCR_DrainMana" },
  { srcName: "Petrify.png", name: "SCR_Petrify" },
  { srcName: "Blackwyche.png", name: "Blackwyche" },
  { srcName: "Zong.png", name: "Zong" },
  { srcName: "GreenBeret.png", name: "GreenBeret" },
  { srcName: "WG3.png", name: "WG3" },
  { srcName: "HL5.png", name: "HL5" },
  { srcName: "VIC20.png", name: "VIC20" },
  { srcName: "Hero10.png", name: "Hero10" },
  { srcName: "Nebulus.png", name: "Nebulus" },
  { srcName: "Scramble4.png", name: "Scramble4" },
  { srcName: "Ghostbusters.png", name: "Ghostbusters" },
  { srcName: "FranticFreddie.png", name: "FranticFreddie" },
  { srcName: "Oblivion2.png", name: "Oblivion2" },
  { srcName: "Scramble3.png", name: "Scramble3" },
  { srcName: "OperationWolf2.png", name: "OperationWolf2" },
  { srcName: "OperationWolf.png", name: "OperationWolf" },
  { srcName: "Imhotep.png", name: "Imhotep" },
  { srcName: "Scramble2.png", name: "Scramble2" },
  { srcName: "UU2.png", name: "UU2" },
  { srcName: "WG2.png", name: "WG2" },
  { srcName: "CW10.png", name: "CW10" },
  { srcName: "BlueMax3.png", name: "BlueMax3" },
  { srcName: "BlueMax2.png", name: "BlueMax2" },
  { srcName: "Oblivion.png", name: "Oblivion" },
  { srcName: "Skyrim.png", name: "Skyrim" },
  { srcName: "IK1.png", name: "IK1" },
  { srcName: "Web6.png", name: "Web6" },
  { srcName: "Web5.png", name: "Web5" },
  { srcName: "LS.png", name: "LS" },
  { srcName: "Ivy2.png", name: "Ivy2" },
  { srcName: "Ivy1.png", name: "Ivy1" },
  { srcName: "PrayingSkeleton.png", name: "PrayingSkeleton" },
  { srcName: "Skull4.png", name: "Skull4" },
  { srcName: "Skull3.png", name: "Skull3" },
  { srcName: "Skull2.png", name: "Skull2" },
  { srcName: "Skull1.png", name: "Skull1" },
  { srcName: "skeletonDance.png", name: "skeletonDance" },
  { srcName: "Crack5.png", name: "Crack5" },
  { srcName: "Crack4.png", name: "Crack4" },
  { srcName: "Crack3.png", name: "Crack3" },
  { srcName: "HangingSkeleton.png", name: "HangingSkeleton" },
  { srcName: "WG4.png", name: "WG4" },
  { srcName: "BlueMax4.png", name: "BlueMax4" },
  { srcName: "Witcher5.png", name: "Witcher5" },
  { srcName: "LSL9.png", name: "LSL9" },
  { srcName: "Shamus1.png", name: "Shamus1" },
  { srcName: "PharaohCurse3.png", name: "PharaohCurse3" },
  { srcName: "Witcher4.png", name: "Witcher4" },
  { srcName: "Witcher3.png", name: "Witcher3" },
  { srcName: "TempleOfApshai.png", name: "TempleOfApshai" },
  { srcName: "Witcher2.png", name: "Witcher2" },
  { srcName: "KnightLore2.png", name: "KnightLore2" },
  { srcName: "Witcher1.png", name: "Witcher1" },
  { srcName: "Spelunker.png", name: "Spelunker" },
  { srcName: "ShamusCase2.png", name: "ShamusCase2" },
  { srcName: "Ishar2.png", name: "Ishar2" },
  { srcName: "Ishar1.png", name: "Ishar1" },
  { srcName: "Jungle1.png", name: "Jungle1" },
  { srcName: "Pitfall5.png", name: "Pitfall5" },
  { srcName: "PharaohCurse2.png", name: "PharaohCurse2" },
  { srcName: "Frontier.png", name: "Frontier" },
  { srcName: "LSL8.png", name: "LSL8" },
  { srcName: "SP2.png", name: "SP2" },
  { srcName: "SP1.png", name: "SP1" },
  { srcName: "EveLSL.png", name: "EveLSL" },
  { srcName: "DragonAndSword.png", name: "DragonAndSword" },
  { srcName: "Candles1.png", name: "Candles1" },
  { srcName: "SVS24.png", name: "SVS24" },
  { srcName: "SVS23.png", name: "SVS23" },
  { srcName: "KQ10.png", name: "KQ10" },
  { srcName: "Shamus20.png", name: "Shamus20" },
  { srcName: "Pitfall21.png", name: "Pitfall21" },
  { srcName: "Apshai6.png", name: "Apshai6" },
  { srcName: "Apshai5.png", name: "Apshai5" },
  { srcName: "MontyMole.png", name: "MontyMole" },
  { srcName: "PacClose.png", name: "PacClose" },
  { srcName: "PacGhost.png", name: "PacGhost" },
  { srcName: "Pitfall20.png", name: "Pitfall20" },
  { srcName: "SVS22.png", name: "SVS22" },
  { srcName: "SVS21.png", name: "SVS21" },
  { srcName: "Apshai4.png", name: "Apshai4" },
  { srcName: "Apshai3.png", name: "Apshai3" },
  { srcName: "Paperboy.png", name: "Paperboy" },
  { srcName: "JungleStory.png", name: "JungleStory" },
  { srcName: "RobinOfTheWood2.png", name: "RobinOfTheWood2" },
  { srcName: "Pyjamarama.png", name: "Pyjamarama" },
  { srcName: "SammyLightfoot.png", name: "SammyLightfoot" },
  { srcName: "ThePawn.png", name: "ThePawn" },
  { srcName: "KokotoniWilf.png", name: "KokotoniWilf" },
  { srcName: "Cauldron1.png", name: "Cauldron1" },
  { srcName: "Zeppelin2.png", name: "Zeppelin2" },
  { srcName: "TimeTunnel.png", name: "TimeTunnel" },
  { srcName: "SP3.png", name: "SP3" },
  { srcName: "AC2.png", name: "AC2" },
  { srcName: "SpiderWeb7.png", name: "SpiderWeb7" },
  { srcName: "KnightStatue2.png", name: "KnightStatue2" },
  { srcName: "WallSkell128_1.png", name: "WallSkell" },
  { srcName: "Crack7.png", name: "Crack7" },
  { srcName: "Crack6.png", name: "Crack6" },
  { srcName: "KnightStatue.png", name: "KnightStatue" },
  { srcName: "Hero30.png", name: "Hero30" },
  { srcName: "SVS30.png", name: "SVS30" },
  { srcName: "AirWolf.png", name: "AirWolf" },
  { srcName: "AA41.png", name: "AA41" },
  { srcName: "AA40.png", name: "AA40" },
  { srcName: "SeaWolf.png", name: "SeaWolf" },
  { srcName: "GIJoe10.png", name: "GIJoe10" },
  { srcName: "CompassRose.png", name: "CompassRose" }
];
var LoadSequences = [
  { srcName: "SHIP_exp", name: "BigExplosion", type: "png", count: 8 },
  { srcName: "ALIEN_exp", name: "ShortExplosion", type: "png", count: 6 }
];
var LoadSheetSequences = [
  { srcName: "Explosion64.png", count: 24, name: "Explosion" },
  { srcName: "Explosion4_64.png", count: 32, name: "Explosion4" },
  { srcName: "SmallFireball64.png", count: 24, name: "Fireball" },
  {
    srcName: "SmallShortExplosion64.png",
    count: 6,
    name: "SmallShortExplosion"
  },
  { srcName: "Smoke2.png", count: 12, name: "Smoke" }
];
var LoadSheets = [];
var ExtendSheetTag = [];
var LoadPacks = [
  { srcName: "Wizard64.png", count: 4, name: "Wizard" },
  { srcName: "Skeleton64.png", count: 9, name: "Skeleton" },
  { srcName: "GreenSnake64.png", count: 4, name: "GreenSnake" },
  { srcName: "LittleGreenSnake64.png", count: 4, name: "LittleGreenSnake" },
  { srcName: "Bat64.png", count: 3, name: "Bat" },
  { srcName: "Hellrat64.png", count: 8, name: "HellRat" },
  { srcName: "Skelegoat64.png", count: 3, name: "Skelegoat" },
  { srcName: "ChestOpen.png", count: 1, name: "ChestOpen" },
  { srcName: "ChestClosed.png", count: 1, name: "ChestClosed" },
  { srcName: "LittleSkelly64.png", count: 3, name: "LittleSkelly" },
  { srcName: "Fox64.png", count: 4, name: "Fox" },
  { srcName: "Skeletona64.png", count: 4, name: "Skeletona" },
  { srcName: "Sorceress64.png", count: 6, name: "Sorceress" },
  { srcName: "SmallEvilBat.png", count: 4, name: "SmallEvilBat" },
  { srcName: "Aunt.png", count: 9, name: "Aunt" },
  { srcName: "Spider64.png", count: 6, name: "Spider" },
  { srcName: "SkeletoneMajor.png", count: 4, name: "SkeletonMajor" },
  { srcName: "LittleOrc64.png", count: 3, name: "LittleOrc" },
  { srcName: "Fairy64.png", count: 3, name: "Fairy" },
  { srcName: "BlackGhost.png", count: 4, name: "BlackGhost" },
  { srcName: "RedBat.png", count: 3, name: "RedBat" },
  { srcName: "Badger64.png", count: 3, name: "Badger" },
  { srcName: "Scary64.png", count: 4, name: "Scary" },
  { srcName: "ZombieGirl64.png", count: 4, name: "ZombieGirl" },
  { srcName: "Flamy64.png", count: 4, name: "Flamy" },
  
  { srcName: "Croc64.png", count: 5, name: "Croc" },
  { srcName: "Knight64.png", count: 4, name: "Knight" },
  { srcName: "Scorpion64.png", count: 6, name: "Scorpion" },
  { srcName: "WhiteWolf64.png", count: 4, name: "WhiteWolf" },
  { srcName: "Black Wolf64.png", count: 3, name: "BlackWolf" },
  { srcName: "BlueDevil64.png", count: 4, name: "BlueDevil" },
  { srcName: "GreenZombie64.png", count: 3, name: "GreenZombie" },
  { srcName: "GreenSkelly64.png", count: 3, name: "GreenSkelly" },
  { srcName: "GreenPuffer64.png", count: 4, name: "GreenPuffer" },
  { srcName: "SmallDragon64.png", count: 3, name: "SmallDragon64" },
  { srcName: "BlackDragon64.png", count: 3, name: "BlackDragon" },
  
  
];
var LoadRotated = [];
var LoadExtWasm = [];
var LoadAudio = [
  { srcName: "ClosedDoor.mp3", name: "ClosedDoor" },
  { srcName: "Keys.mp3", name: "Keys" },
  { srcName: "OpenGate.mp3", name: "OpenGate" },
  { srcName: "Swallow.mp3", name: "Swallow" },
  { srcName: "Chest.mp3", name: "Boink" }, //not used
  { srcName: "Explosion1.mp3", name: "Explosion" },
  { srcName: "death.mp3", name: "Death" },
  { srcName: "UseScroll.mp3", name: "UseScroll" },
  { srcName: "Scroll.mp3", name: "Scroll" },
  { srcName: "Potion.mp3", name: "Potion" },
  { srcName: "Chirp.mp3", name: "Chirp" },
  { srcName: "Failed magic.mp3", name: "MagicFail" },
  { srcName: "Cast.mp3", name: "MagicCast" },
  { srcName: "Power up.mp3", name: "PowerUp" },
  { srcName: "Level up.mp3", name: "LevelUp" },
  { srcName: "Pick up gold.mp3", name: "Pick" },
  { srcName: "Evil laughter.mp3", name: "EvilLaughter" },
  { srcName: "OpenChest.mp3", name: "OpenChest" },
  { srcName: "SwordHit.mp3", name: "SwordHit" },
  { srcName: "SwordMiss2.mp3", name: "SwordMiss" },
  { srcName: "MonsterDeath.mp3", name: "MonsterDeath" },
  { srcName: "MonsterAttack1.mp3", name: "MonsterAttack1" },
  { srcName: "MonsterAttack2.mp3", name: "MonsterAttack2" },
  { srcName: "SnakeAttack.mp3", name: "SnakeAttack" },
  { srcName: "MonsterHurt.mp3", name: "MonsterHurt" },
  { srcName: "MonsterHurt2.mp3", name: "MonsterHurt2" },
  { srcName: "BatAttack.mp3", name: "BatAttack" },
  { srcName: "Laughing Skull.mp3", name: "Title" },
  { srcName: "Ow.mp3", name: "Ow" },
  { srcName: "MonsterHurt3.mp3", name: "MonsterHurt3" },
  { srcName: "PainSqueek.mp3", name: "PainSqueek" },
  { srcName: "DeathPain1.mp3", name: "DeathPain1" },
  { srcName: "Scream.mp3", name: "Scream" },
  { srcName: "HumanAttack1.mp3", name: "HumanAttack1" }
];
var LoadFonts = [{ srcName: "DeepDown.ttf", name: "DeepDown" }];