/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

/////////////////////////////////////////////////
/*
      
TODO:

known bugs: 
  load appends to uncleared list!

 */
////////////////////////////////////////////////////

const DEBUG = {
  _2D_display: true,
  FPS: true,
  SETTING: true,
  BUTTONS: false,
  VERBOSE: false,
  LOAD: false,
  clearEnemies() {
    ENEMY_RC.clearAll();
  },
  toLastRoom() {
    let map = MAP[GAME.level].DUNGEON;
    let last = map.findRoom("Gold");
    let target = map.findSpace(last.area);
    PLAYER.pos = Grid.toCenter(target);
  }
};

class Key {
  constructor(color, spriteClass) {
    this.category = "Key";
    this.type = "Key";
    this.color = color;
    this.spriteClass = spriteClass;
  }
}
class Status {
  constructor(type, spriteClass) {
    this.type = type;
    this.spriteClass = spriteClass;
  }
}
class Scroll {
  constructor(type) {
    this.type = type;
    this.id = this.type;
    this.sprite = SPRITE["SCR_" + type];
    this.class = "Scroll";
    this.saveDefinition = ['class', 'type'];
  }
  action() {
    let T;
    let map = MAP[GAME.level].DUNGEON;
    switch (this.type) {
      case "Light":
        HERO.improveVision();
        const visionTimerId = "visionTimer";
        if (ENGINE.TIMERS.exists(visionTimerId)) {
          T = ENGINE.TIMERS.access(visionTimerId);
          T.extend(INI.LAMP_PERSISTENCE);
        } else {
          T = new CountDown(visionTimerId, INI.LAMP_PERSISTENCE, HERO.extinguishLamp);
          let status = new Status("Light", "Lantern");
          HERO.inventory.status.push(status);
          TITLE.keys();
        }
        break;
      case "Invisibility":
        HERO.startInvisibility();
        const invisibilityTimerId = "invisibilityTimer";
        if (ENGINE.TIMERS.exists(invisibilityTimerId)) {
          T = ENGINE.TIMERS.access(invisibilityTimerId);
          T.extend(INI.INVISIBILITY_TIME);
        } else {
          T = new CountDown(invisibilityTimerId, INI.INVISIBILITY_TIME, HERO.cancelInvisibility);
          let status = new Status("Invisibility", "Invisible");
          HERO.inventory.status.push(status);
          TITLE.keys();
        }
        break;
      case "Map":
        let pointers = map.map_pointers;
        let origin;
        if (pointers.length > 0) {
          origin = pointers.shift();
        } else {
          origin = new Grid(RND(map.minX, map.maxX), RND(map.minY, map.maxY));
        }
        MINIMAP.reveal(origin, INI.MM_reveal_radius);
        break;
      case "DrainMana":
        for (let enemy of ENEMY_RC.POOL) {
          if (enemy === null) continue;
          if (enemy.distance === null) continue;
          if (enemy.distance <= INI.SCROLL_RANGE) {
            enemy.mana = 0;
          }
        }
        HERO.mana = 0;
        TITLE.status();
        break;
      case "Cripple":
        for (let enemy of ENEMY_RC.POOL) {
          if (enemy === null) continue;
          if (enemy.distance === null) continue;
          if (enemy.distance <= INI.SCROLL_RANGE) {
            enemy.moveSpeed = INI.CRIPPLE_SPEED;
          }
        }
        break;
      case "BoostWeapon":
        Scroll.boost("attack");
        break;
      case "BoostArmor":
        Scroll.boost("defense");
        break;
      case "DestroyArmor":
        for (let enemy of ENEMY_RC.POOL) {
          if (enemy === null) continue;
          if (enemy.distance === null) continue;
          if (enemy.distance <= INI.SCROLL_RANGE) {
            let factor = RND(25, 50) / 100;
            enemy.defense -= Math.ceil(enemy.defense * factor);
          }
        }
        break;
      case "DestroyWeapon":
        for (let enemy of ENEMY_RC.POOL) {
          if (enemy === null) continue;
          if (enemy.distance === null) continue;
          if (enemy.distance <= INI.SCROLL_RANGE) {
            let factor = RND(25, 50) / 100;
            enemy.attack -= Math.ceil(enemy.attack * factor);
          }
        }
        break;
      case "Petrify":
        for (let enemy of ENEMY_RC.POOL) {
          if (enemy === null) continue;
          if (enemy.distance === null) continue;
          if (enemy.distance <= INI.SCROLL_RANGE) {
            enemy.petrify();
          }
        }
        break;
      case "MagicBoost":
        Scroll.boost("magic");
        break;
      case "TeleportTemple":
        let temple = map.findRoom("temple");
        let target = map.findMiddleSpaceUnreserved(temple.area);
        PLAYER.pos = Grid.toCenter(target);
        break;
      case "Luck":
        HERO.lucky();
        const luckyTimerId = "luckyTimer";
        if (ENGINE.TIMERS.exists(luckyTimerId)) {
          T = ENGINE.TIMERS.access(luckyTimerId);
          T.extend(INI.LUCKY_TIME);
        } else {
          T = new CountDown(luckyTimerId, INI.LUCKY_TIME, HERO.cancelLuck);
          let status = new Status("Luck", "Clover");
          HERO.inventory.status.push(status);
          TITLE.keys();
        }
        break;
      case "HalfLife":
        for (let enemy of ENEMY_RC.POOL) {
          if (enemy === null) continue;
          if (enemy.distance === null) continue;
          if (enemy.distance <= INI.SCROLL_RANGE) {
            enemy.health = Math.max(1, Math.floor(enemy.health / 2));
          }
        }
        break;
      default:
        console.error("ERROR scroll action", this);
        break;
    }
    AUDIO.UseScroll.play();
  }
  display() {
    ENGINE.clearLayer("info");
    ENGINE.draw("info", 7, 7, this.sprite);
    GAME.infoTimer();
  }
  static boost(type) {
    let T;
    HERO.incStat(type);
    const TimerId = `${type}_timer`;
    if (ENGINE.TIMERS.exists(TimerId)) {
      T = ENGINE.TIMERS.access(TimerId);
      T.reset();
    } else {
      T = new CountDown(
        TimerId,
        INI.BOOST_TIME,
        HERO.resetStat.bind(null, type)
      );
    }
  }
}
class CommonItem {
  constructor(grid, type, value = 0) {
    this.type = "CommonItem";
    this.distance = null;
    this.vectorToPlayer = null;
    this.parent = FLOOR_OBJECT_WIDE;
    for (const prop in type) {
      this[prop] = type[prop];
    }
    if (!this.inventorySprite) {
      this.inventorySprite = this.class;
    }
    this.base = 1;
    if (grid instanceof Grid) {
      grid = Grid.toCenter(grid);
    }
    this.moveState = new _3D_MoveState(grid, NOWAY);
    this.actor = new _3D_ACTOR(this.class, this);
    this.visible = false;
    this.id = null;
    this.value = value;
  }
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
  interact() {
    if (this.id !== null) {
      this.parent.remove(this.id);
      this.parent.reIndexRequired = true;
    }
    switch (this.category) {
      case "key":
        let key = new Key(this.color, this.inventorySprite);
        this.display();
        HERO.inventory.key.push(key);
        delete this.parent.map.keys[this.color];
        TITLE.keys();
        AUDIO.Keys.play();
        break;
      case "potion":
        this.display();
        HERO.inventory.potion[this.color]++;
        TITLE.potion();
        AUDIO.Potion.play();
        break;
      case "scroll":
        let type = weightedRnd(SCROLL_TYPE);
        if (GAME.level === INI.FINAL_LEVEL && type === 'TeleportTemple') {
          type = 'HalfLife';
        }
        let scroll = new Scroll(type);
        scroll.display();
        HERO.inventory.scroll.add(scroll);
        TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
        TITLE.scrolls();
        AUDIO.Scroll.play();
        break;
      case "gold":
        TURN.display(this.value, "#AB8D3F");
        GAME.gold += this.value;
        TITLE.gold();
        AUDIO.Pick.play();
        break;
      case "status":
        HERO.incStatus(this.status);
        this.display();
        AUDIO.PowerUp.play();
        break;
      case "skill":
        HERO.raiseStat(this.which);
        this.display();
        AUDIO.LevelUp.play();
        break;
      default:
        throw "picking up category error";
    }
  }
  display() {
    ENGINE.clearLayer("info");
    ENGINE.draw("info", 7, 7, SPRITE[this.inventorySprite]);
    GAME.infoTimer();
  }
}
class FloorContainer {
  constructor(grid, dir, type) {
    this.type = "FloorContainer";
    this.distance = null;
    this.vectorToPlayer = null;
    this.parent = FLOOR_OBJECT_WIDE;
    for (const prop in type) {
      this[prop] = type[prop];
    }
    this.base = 1;
    this.closed = true;
    this.moveState = new _3D_MoveState(grid, dir);
    this.actor = new _3D_ACTOR(this.class, this);
    this.visible = false;
  }
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
  interact() {
    if (this.closed) {
      this.open();
      AUDIO.OpenChest.play();
    }
  }
  open() {
    this.closed = false;
    this.actor.changeClass(this.classOpen);
    let choices = {
      RedPotion: 100,
      BluePotion: 100,
      Scroll: 100,
      GoldBar: 50,
      SwordSkill: 10,
      ShieldSkill: 10,
      MagicSkill: 10,
      HealthStatus: 20,
      ManaStatus: 20
    };
    let type = weightedRnd(choices);
    let value;
    if (type === "GoldBar") {
      value = 250;
    } else {
      value = 0;
    }
    let item = new CommonItem(new Grid(0, 0), COMMON_ITEM_TYPE[type], value);
    item.interact();
  }
  close() {
    this.closed = true;
    this.actor.changeClass(this.classClosed);
  }
}
class DecalMaster {
  constructor(grid, dir, type) {
    this.distance = null;
    this.parent = DECAL;
    this.grid = grid;
    this.facingDir = dir;
    this.floorGrid = this.grid.add(this.facingDir);
    this.sprite = null;
    for (const prop in type) {
      this[prop] = type[prop];
    }
    this.visible = false;
  }
  calcDrawPosition(type) {
    this.width = SPRITE[this.sprite].width / 2;
    this.facePosition = this.parent.calcPosition(type.position);
    [this.drawPosition, this.leftDraw, this.rightDraw] = DECAL.drawPosition(this);
  }
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
  getImageData() {
    let img = SPRITE[this.sprite];
    return ENGINE.getImgData(img);
  }
}
class Decal extends DecalMaster {
  constructor(grid, dir, type) {
    super(grid, dir, type);
    this.type = "Decal";
    this.interactive = false;
    this.sprite = type.spriteSource.chooseRandom();
    this.calcDrawPosition(type);
  }
}
class Shrine extends DecalMaster {
  constructor(grid, dir, type) {
    super(grid, dir, type);
    this.type = "Shrine";
    this.calcDrawPosition(type);
  }
  interact() {
    if (GAME.gold >= 1000) {
      this.interactive = false;
      GAME.gold -= 1000;
      AUDIO.LevelUp.play();
      HERO[this.skill]++;
      HERO[`reference_${this.skill}`]++;
      HERO.restore();
      TITLE.stats();
      TITLE.status();
      TITLE.gold();
    } else {
      AUDIO.MagicFail.play();
    }
  }
}
class Gate extends DecalMaster {
  constructor(grid, dir, type) {
    super(grid, dir, type);
    this.type = "Gate";
    this.calcDrawPosition(type);
  }
  interact() {
    let unlocked = false;
    if (this.locked) {
      const checkKey = (key, value) =>
        HERO.inventory.key.some((o) => o[key] === value);
      if (checkKey("color", this.color)) {
        unlocked = true;
        HERO.inventory.key = HERO.inventory.key.filter(
          (el) => el.color !== this.color
        );
        TITLE.keys();
      }
    } else {
      unlocked = true;
    }
    if (unlocked) {
      this.parent.map.GA.openDoor(this.grid);
      let pairID;

      if (this.id % 2 == 0) {
        pairID = this.id - 2;
      } else pairID = this.id;

      let prev = this.parent.POOL[pairID].masterId;
      if (prev === this.masterId) {
        this.parent.remove(this.parent.POOL[pairID].id);
      }

      CHANGING_ANIMATION.add(new LiftingGate(this));
      this.parent.remove(this.id);
      AUDIO.OpenGate.play();
      delete this.parent.map.lockedRooms[this.color];

      if (DEBUG._2D_display) {
        ENGINE.BLOCKGRID.draw(MAP[GAME.level].DUNGEON);
      }
    } else {
      AUDIO.ClosedDoor.play();
    }
  }
}
class Staircase {
  constructor(grid, dir, type) {
    this.type = "Staircase";
    this.distance = null;
    this.parent = DECAL;
    this.grid = grid;
    this.facingDir = dir;
    this.floorGrid = this.grid.add(this.facingDir);
    for (const prop in type) {
      this[prop] = type[prop];
    }
    this.width = SPRITE[this.sprite].width / 2;
    this.facePosition = this.parent.calcPosition(type.position);
    [this.drawPosition, this.leftDraw, this.rightDraw] = DECAL.drawPosition(this);
    this.visible = false;
  }
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
  getImageData() {
    let img = SPRITE[this.sprite];
    return ENGINE.getImgData(img);
  }
  interact() {
    const WP = ["exit", null, "entrance"];
    let nextWaypoint = WP[this.direction + 1];
    GAME.useStaircase(GAME.level + this.direction, nextWaypoint);
  }
}
class Monster {
  constructor(grid, dir, type) {
    this.type = "Monster";
    this.distance = null;
    this.vectorToPlayer = null;
    this.guardPosition = null;
    this.parent = ENEMY_RC;
    this.dirStack = [];
    this.final_boss = false;
    for (const prop in type) {
      this[prop] = type[prop];
    }
    this.fullHealth = this.health;
    this.moveState = new _3D_MoveState(Grid.toCenter(grid), dir);
    this.actor = new _3D_ACTOR(this.class, this);
    this.visible = false;
    this.setR();
    this.canAttack = true;
    this.canShoot = false;
    if (this.magic > 0) {
      this.mana = this.mana * Missile.calcMana(this.magic);
    }
    this.petrified = false;
    this.behaviour = new Behaviour(...this.behaviourArguments);
  }
  draw() {
    ENGINE.VECTOR2D.drawBlock(this);
  }
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
  hasStack() {
    return this.dirStack.length > 0;
  }
  makeMove() {
    this.moveState.next(this.dirStack.shift());
  }
  setR() {
    this.r =
      (this.actor.frontWidth + this.actor.sideWidth) /
      2 /
      ENGINE.INI.GRIDPIX /
      2;
  }
  circleCollision(point) {
    let distance = this.moveState.pos.EuclidianDistance(point);
    return distance < this.r;
  }
  shoot() {
    this.canShoot = false;
    this.caster = false;
    let source = this.moveState.pos.translate(this.moveState.realDir, this.r);
    let target = PLAYER.pos.translate(PLAYER.dir, 0.1);
    let dir = source.direction(target);
    this.mana -= Missile.calcMana(this.magic);
    let MFB = new Missile(source, dir, MISSILE_TYPE.Fireball, this.magic, this.id);
    MISSILE.add(MFB);
    setTimeout(this.resetShooting.bind(this), INI.MONSTER_SHOOT_TIMEOUT);
  }
  resetShooting() {
    this.caster = true;
  }
  performAttack() {
    if (!this.canAttack || HERO.dead) return;
    this.canAttack = false;
    AUDIO[this.attackSound].play();
    let damage = TURN.damage(this, HERO);
    let luckAddiction = Math.min(1, (damage * 0.1) >>> 0);
    damage -= luckAddiction * HERO.luck;
    if (damage <= 0) {
      damage = "MISSED";
      TURN.display(damage, "red");
    } else {
      TURN.display(damage, "red");
      HERO.incExp(damage, "defense");
      HERO.applyDamage(damage);
    }
    setTimeout(this.resetAttack.bind(this), INI.MONSTER_ATTACK_TIMEOUT);
  }
  resetAttack() {
    if (!this) return;
    this.canAttack = true;
  }
  hitByMissile(missile) {
    let damage = Math.max(missile.calcDamage(this.magic), 1);
    let exp = Math.min(this.health, damage);
    this.health -= damage;
    let dead = false;
    if (this.health <= 0) dead = true;
    let type = "SmallShortExplosion";

    if (dead) {
      exp += this.xp;
      type = "LongExplosion";
      ENEMY_RC.remove(this.id);
      this.dropInventory();
    }

    let explosion = new Destruction(missile.moveState.pos, missile.base, DESTRUCTION_TYPE[type]);

    DESTRUCTION_ANIMATION.add(explosion);
    MISSILE.remove(missile.id);
    AUDIO.Explosion.volume = RAYCAST.volume(missile.distance);
    AUDIO.Explosion.play();
    HERO.incExp(exp, "magic");
  }
  setDistanceFromNodeMap(nodemap) {
    let gridPosition = Grid.toClass(this.moveState.pos);
    let distance = nodemap[gridPosition.x][gridPosition.y].distance;
    if (distance < Infinity) {
      this.distance = distance;
    } else this.distance = null;
  }
  weak() {
    let ratio = this.health / this.fullHealth;
    return ratio <= 0.2;
  }
  petrify() {
    if (this.final_boss) return;
    if (this.petrified) return;
    this.petrified = true;
    this.attack = 0;
    this.defense = 0;
    this.magic = 0;
    this.health = 1;
    this.mana = 0;
    this.xp = 1;
    this.base = 1;
    this.inventory = null;
    const petrified_class = "Petrified_" + this.class;
    if (!ASSET[petrified_class]) {
      ASSET.convertToGrayScale(this.class, petrified_class);
    }
    this.actor.changeClass(petrified_class);
  }
  dropInventory() {
    if (this.inventory) {
      let item = new CommonItem(this.moveState.pos, COMMON_ITEM_TYPE[this.inventory], this.inventoryValue);
      FLOOR_OBJECT_WIDE.add(item);
    }
  }
}
class Missile {
  constructor(grid, dir, type, magic, casterId = 0) {
    this.casterId = casterId;
    this.type = "Missile";
    this.distance = null;
    this.vectorToPlayer = null;
    this.parent = MISSILE;
    for (const prop in type) {
      this[prop] = type[prop];
    }
    this.base = 0;
    this.moveState = new _3D_MoveState(grid, dir);
    this.moveState.start();
    this.actor = new _3D_ACTOR(this.class, this);
    this.visible = false;
    this.setR();
    this.power = this.calcPower(magic);
  }
  static calcMana(magic) {
    return (magic ** 1.15) | 0;
  }
  draw() {
    ENGINE.VECTOR2D.drawBlock(this);
  }
  setR() {
    let sum = 0;
    for (const img of this.actor.asset.linear) {
      sum += img.width;
      sum += img.height;
    }
    this.r = sum / (2 * this.actor.asset.linear.length) / ENGINE.INI.GRIDPIX / 2;
  }
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
  calcPower(magic) {
    return 2 * magic + RND(-2, 2);
  }
  calcDamage(magic) {
    let part1 = (magic / 2) | 0;
    let part2 = magic - part1;
    let damage = this.power - part1 - RND(0, part2);
    return damage;
  }
}
class Destruction {
  constructor(grid, base, type) {
    this.type = "Destruction";
    this.distance = null;
    this.vectorToPlayer = null;
    this.parent = DESTRUCTION_ANIMATION;
    for (const prop in type) {
      this[prop] = type[prop];
    }
    this.base = 0;
    this.moveState = new _3D_MoveState(grid, NOWAY);
    this.actor = new _3D_ACTOR(this.class, this);
    this.visible = false;
  }
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
}
class LiftingGate {
  constructor(instance) {
    this.type = "LiftingGate";
    this.class = instance.sprite;
    this.distance = null;
    this.vectorToPlayer = null;
    this.parent = CHANGING_ANIMATION;
    this.base = 0;
    this.moveState = new _3D_MoveState(instance.drawPosition, NOWAY);
    this.actor = new Flat_ACTOR(this.class, this);
    this.visible = false;
    this.liftSpeed = (2 * RAYCAST.INI.BLOCK_SIZE) / 1000; //128 pixels per second
    this.sprite = SPRITE[this.class];
    this.height = SPRITE[this.class].height;
    this.top = 0;
    this.drawPosition = instance.drawPosition;
    this.leftDraw = instance.leftDraw;
    this.rightDraw = instance.rightDraw;
    this.facingDir = instance.facingDir;
    this.facePosition = new FP_Grid(0.5, 0.5);
    this.grid = instance.grid;
  }
  lift(lapsedTime) {
    this.top += lapsedTime * this.liftSpeed;
  }
  change(lapsedTime) {
    this.top += lapsedTime * this.liftSpeed;
  }
  complete() {
    return this.top >= this.height;
  }
  getImageData() {
    let top = Math.min(Math.round(this.top), this.height - 1);
    return ENGINE.getImgData(this.sprite, 0, top);
  }
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
}

const INI = {
  MAXINT: 96,
  MININT: 10,
  MAXGOLD: 99,
  MIN_BIAS: 1,
  MAX_GRID: 64,
  MIN_GRID: 8,
  MAXW: 794,
  MAXH: 1123,
  MAXWP: 595,
  MAXHP: 824,
  SPACE_X: 768,
  SPACE_Y: 1024,
  GRIDSIZE: 64,
  SCREEN_WIDTH: 480,
  SCREEN_HEIGHT: 360,
  TEX_SIZE: 128,
  TITLE_HEIGHT: 80,
  BOTTOM_HEIGHT: 48,
  MIMIMAP_HEIGHT: 200,
  MIMIMAP_WIDTH: 200,
  INFO_TIMER_ID: "info",
  INFO_TIMER: 3,
  LAMP_PERSISTENCE: 99,
  INVISIBILITY_TIME: 60,
  LUCKY_TIME: 60,
  INI_BASE_EXP_FONT: 100,
  LEVEL_FACTOR: 1.5,
  POTION_INC: 0.4,
  HEALTH_INC: 4,
  MANA_INC: 5,
  MONSTER_ATTACK_TIMEOUT: 2000,
  MONSTER_SHOOT_TIMEOUT: 4000,
  HERO_SHOOT_TIMEOUT: 2000,
  SCROLL_RANGE: 3,
  CRIPPLE_SPEED: 0.5,
  BOOST_TIME: 59,
  MM_reveal_radius: 4,
  FINAL_LEVEL: 10,
};
const PRG = {
  VERSION: "1.07.01",
  NAME: "Crawl Master",
  YEAR: "2021",
  SG: "CrawlMaster",
  CSS: "color: #239AFF;",
  INIT() {
    console.log(`${PRG.NAME} ${PRG.VERSION} by Lovro Selic, (c) LaughingSkull ${PRG.YEAR} on ${navigator.userAgent}`);
    $("#title").html(PRG.NAME);
    $("#version").html(`${PRG.NAME} V${PRG.VERSION} <span style='font-size:14px'>&copy</span> LaughingSkull ${PRG.YEAR}`);
    $("input#toggleAbout").val("About " + PRG.NAME);
    $("#about fieldset legend").append(" " + PRG.NAME + " ");

    ENGINE.autostart = true;
    ENGINE.start = PRG.start;
    ENGINE.readyCall = GAME.setup;
    ENGINE.setSpriteSheetSize(64);
    ENGINE.init();
  },
  setup() {
    console.log("PRG.setup");

    $("#engine_version").html(ENGINE.VERSION);
    $("#grid_version").html(GRID.VERSION);
    $("#maze_version").html(DUNGEON.VERSION);
    $("#raycast_version").html(RAYCAST.VERSION);
    $("#ai_version").html(AI.VERSION);
    $("#lib_version").html(LIB.VERSION);
    $("#iam_version").html(IndexArrayManagers.VERSION);


    $("#toggleHelp").click(function () {
      $("#help").toggle(400);
    });
    $("#toggleAbout").click(function () {
      $("#about").toggle(400);
    });
    $("#toggleVersion").click(function () {
      $("#debug").toggle(400);
    });

  },
  start() {
    console.log(PRG.NAME + " started.");
    $(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
    $(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
    $(ENGINE.topCanvas).css("cursor", "");

    $("#startGame").addClass("hidden");
    $(document).keypress(function (event) {
      if (event.which === 32 || event.which === 13) {
        event.preventDefault();
      }
    });
    TITLE.startTitle();
  }
};
const HERO = {
  construct() {
    this.resetVision();
    this.visible();
    this.unlucky();
    this.dead = false;
    this.maxHealth = 15;
    this.maxMana = 3 * Missile.calcMana(5);
    this.restore();
    this.defense = 5;
    this.reference_defense = this.defense;
    this.attack = 5;
    this.reference_attack = this.attack;
    this.magic = 5;
    this.reference_magic = this.magic;
    this.attackExp = 0;
    this.defenseExp = 0;
    this.magicExp = 0;
    this.attackExpGoal = INI.INI_BASE_EXP_FONT;
    this.defenseExpGoal = INI.INI_BASE_EXP_FONT;
    this.magicExpGoal = INI.INI_BASE_EXP_FONT;
    this.canShoot = true;
    const propsToSave = ["health", "maxHealth", "mana", "maxMana", "defense", "reference_defense", "attack",
      "reference_attack", "magic", "attackExp", "defenseExp", "magicExp", "attackExpGoal", "defenseExpGoal", "magicExpGoal",
      "inventory.potion.red", "inventory.potion.blue"];
    this.attributesForSaveGame = [];
    for (const P of propsToSave) {
      this.attributesForSaveGame.push(`HERO.${P}`);
    }
    PLAYER.hitByMissile = HERO.hitByMissile;
  },
  depth2() {
    GAME.level = 2;
    GAME.upperLimit = GAME.level;
    GAME.gold = 91;
    this.maxHealth = 27;
    this.maxMana = 35;
    this.health = 18;
    this.mana = 4;
    this.defense = 6;
    this.reference_defense = this.defense;
    this.attack = 9;
    this.reference_attack = this.attack;
    this.magic = 9;
    this.reference_magic = this.magic;
    this.attackExp = 43;
    this.defenseExp = 30;
    this.magicExp = 165;
    this.attackExpGoal = 225;
    this.defenseExpGoal = 100;
    this.magicExpGoal = 225;
    this.inventory.potion.red = 3;
    let scrolls = ["DrainMana", "DrainMana", "Luck", "Map", "Map", "BoostArmor"];
    for (let scr of scrolls) {
      let scroll = new Scroll(scr);
      HERO.inventory.scroll.add(scroll);
    }
    TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
    TITLE.scrolls();
  },
  depth3() {
    GAME.level = 3;
    GAME.upperLimit = GAME.level;
    GAME.gold = 587;
    this.maxHealth = 47;
    this.maxMana = 50;
    this.health = 46;
    this.mana = 16;
    this.defense = 9;
    this.reference_defense = this.defense;
    this.attack = 12;
    this.reference_attack = this.attack;
    this.magic = 12;
    this.reference_magic = this.magic;
    this.attackExp = 474;
    this.defenseExp = 77;
    this.magicExp = 276;
    this.attackExpGoal = 507;
    this.defenseExpGoal = 150;
    this.magicExpGoal = 338;
    this.inventory.potion.red = 0;
    this.inventory.potion.blue = 0;
    let scrolls = [];
    for (let scr of scrolls) {
      let scroll = new Scroll(scr);
      HERO.inventory.scroll.add(scroll);
    }
    TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
    TITLE.scrolls();
  },
  depth4() {
    GAME.level = 4;
    GAME.upperLimit = GAME.level;
    GAME.gold = 440;
    this.maxHealth = 63;
    this.maxMana = 55;
    this.health = 49;
    this.mana = 11;
    this.defense = 13;
    this.reference_defense = this.defense;
    this.attack = 16;
    this.reference_attack = this.attack;
    this.magic = 16;
    this.reference_magic = this.magic;
    this.attackExp = 1102;
    this.defenseExp = 13;
    this.magicExp = 444;
    this.attackExpGoal = 1142;
    this.defenseExpGoal = 225;
    this.magicExpGoal = 507;
    this.inventory.potion.red = 7;
    this.inventory.potion.blue = 0;
    let scrolls = ['Petrify'];
    for (let scr of scrolls) {
      let scroll = new Scroll(scr);
      HERO.inventory.scroll.add(scroll);
    }
    TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
    TITLE.scrolls();
  },
  depth5() {
    GAME.level = 5;
    GAME.upperLimit = GAME.level;
    GAME.gold = 312;

    this.health = 79;
    this.mana = 44;
    this.defense = 16;
    this.reference_defense = this.defense;
    this.attack = 21;
    this.reference_attack = this.attack;
    this.magic = 20;
    this.reference_magic = this.magic;
    this.maxHealth = 79;
    this.maxMana = 3 * Missile.calcMana(this.magic);
    this.attackExp = 124;
    this.defenseExp = 18;
    this.magicExp = 140;
    this.attackExpGoal = 2570;
    this.defenseExpGoal = 338;
    this.magicExpGoal = 1142;
    this.inventory.potion.red = 4;
    this.inventory.potion.blue = 0;
    let scrolls = ['Petrify'];
    for (let scr of scrolls) {
      let scroll = new Scroll(scr);
      HERO.inventory.scroll.add(scroll);
    }
    TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
    TITLE.scrolls();
  },
  depth6() {
    GAME.level = 6;
    GAME.upperLimit = GAME.level;
    GAME.gold = 647;

    this.health = 87;
    this.mana = 36;
    this.defense = 20;
    this.reference_defense = this.defense;
    this.attack = 22;
    this.reference_attack = this.attack;
    this.magic = 23;
    this.reference_magic = this.magic;
    this.maxHealth = 91;
    this.maxMana = 108;
    this.attackExp = 2350;
    this.defenseExp = 2;
    this.magicExp = 417;
    this.attackExpGoal = 2570;
    this.defenseExpGoal = 507;
    this.magicExpGoal = 1713;
    this.inventory.potion.red = 2;
    this.inventory.potion.blue = 1;
    let scrolls = ['Petrify', 'MagicBoost', 'MagicBoost', 'MagicBoost', 'BoostArmor', 'DestroyWeapon', 'BoostWeapon'];
    for (let scr of scrolls) {
      let scroll = new Scroll(scr);
      HERO.inventory.scroll.add(scroll);
    }
    TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
    TITLE.scrolls();
  },
  depth7() {
    GAME.level = 7;
    GAME.upperLimit = GAME.level;
    GAME.gold = 136;

    this.health = 71;
    this.mana = 39;
    this.defense = 24;
    this.reference_defense = this.defense;
    this.attack = 26;
    this.reference_attack = this.attack;
    this.magic = 26;
    this.reference_magic = this.magic;
    this.maxHealth = 99;
    this.maxMana = 123;
    this.attackExp = 2786;
    this.defenseExp = 195;
    this.magicExp = 551;
    this.attackExpGoal = 3855;
    this.defenseExpGoal = 507;
    this.magicExpGoal = 2570;
    this.inventory.potion.red = 5;
    this.inventory.potion.blue = 0;
    let scrolls = ['Petrify', 'MagicBoost', 'MagicBoost', 'MagicBoost', 'BoostArmor', 'DestroyWeapon', 'BoostWeapon', 'DestroyArmor'];
    for (let scr of scrolls) {
      let scroll = new Scroll(scr);
      HERO.inventory.scroll.add(scroll);
    }
    TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
    TITLE.scrolls();
  },
  depth8() {
    GAME.level = 8;
    GAME.upperLimit = GAME.level;
    GAME.gold = 640;

    this.health = 82;
    this.mana = 56;
    this.defense = 27;
    this.reference_defense = this.defense;
    this.attack = 30;
    this.reference_attack = this.attack;
    this.magic = 29;
    this.reference_magic = this.magic;
    this.maxHealth = 107;
    this.maxMana = 138;
    this.attackExp = 1656;
    this.defenseExp = 426;
    this.magicExp = 941;
    this.attackExpGoal = 5783;
    this.defenseExpGoal = 507;
    this.magicExpGoal = 3855;
    this.inventory.potion.red = 6;
    this.inventory.potion.blue = 0;
    let scrolls = ['MagicBoost', 'MagicBoost', 'BoostArmor', 'BoostArmor', 'BoostArmor', 'DestroyWeapon', 'DestroyWeapon',
      'BoostWeapon', 'DestroyArmor', 'DestroyArmor', 'DestroyArmor', 'Cripple', 'HalfLife'];
    for (let scr of scrolls) {
      let scroll = new Scroll(scr);
      HERO.inventory.scroll.add(scroll);
    }
    TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
    TITLE.scrolls();
  },
  depth9() {
    GAME.level = 9;
    GAME.upperLimit = GAME.level;
    GAME.gold = 89;

    this.health = 115;
    this.mana = 148;
    this.defense = 37;
    this.reference_defense = this.defense;
    this.attack = 34;
    this.reference_attack = this.attack;
    this.magic = 33;
    this.reference_magic = this.magic;
    this.maxHealth = 115;
    this.maxMana = 148;
    this.attackExp = 923;
    this.defenseExp = 165;
    this.magicExp = 101;
    this.attackExpGoal = 8675;
    this.defenseExpGoal = 761;
    this.magicExpGoal = 5783;
    this.inventory.potion.red = 5;
    this.inventory.potion.blue = 2;
    let scrolls = ['MagicBoost', 'MagicBoost', 'BoostArmor', 'BoostArmor', 'BoostArmor', 'DestroyWeapon', 'DestroyWeapon',
      'BoostWeapon', 'BoostWeapon', 'DestroyArmor', 'Cripple', 'Cripple', 'Cripple', 'HalfLife', 'Invisibility'];
    for (let scr of scrolls) {
      let scroll = new Scroll(scr);
      HERO.inventory.scroll.add(scroll);
    }
    TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
    TITLE.scrolls();
  },
  depth10() {
    GAME.level = 10;
    GAME.upperLimit = GAME.level;
    GAME.gold = 66;

    this.health = 119;
    this.defense = 39;
    this.reference_defense = this.defense;
    this.attack = 41;
    this.reference_attack = this.attack;
    this.magic = 35;
    this.reference_magic = this.magic;
    this.maxHealth = 119;
    this.maxMana = 3 * Missile.calcMana(this.magic);
    this.mana = this.maxMana;
    this.attackExp = 7069;
    this.defenseExp = 366;
    this.magicExp = 4990;
    this.attackExpGoal = 8675;
    this.defenseExpGoal = 761;
    this.magicExpGoal = 5783;
    this.inventory.potion.red = 8;
    this.inventory.potion.blue = 0;
    let scrolls = ['MagicBoost', 'MagicBoost', 'BoostArmor', 'BoostArmor', 'BoostArmor', 'BoostArmor', 'DestroyWeapon', 'DestroyWeapon', 'DestroyWeapon',
      'BoostWeapon', 'BoostWeapon', 'DestroyArmor', 'Cripple', 'Cripple', 'Cripple', 'HalfLife', 'Invisibility', 'Invisibility', 'DrainMana'];

    for (let scr of scrolls) {
      let scroll = new Scroll(scr);
      HERO.inventory.scroll.add(scroll);
    }
    TITLE.stack.scrollIndex = Math.max(TITLE.stack.scrollIndex, 0);
    TITLE.scrolls();
  },
  raiseStat(which) {
    this[which]++;
    this[`reference_${which}`]++;
    TITLE.stats();
  },
  incStat(which) {
    let factor = RND(1, 3) / 10 + 1;
    HERO[which] = Math.ceil(HERO[which] * factor);
    TITLE.stats();
  },
  resetStat(which) {
    HERO[which] = HERO[`reference_${which}`];
    TITLE.stats();
  },
  restore() {
    this.health = this.maxHealth;
    this.mana = this.maxMana;
  },
  lucky() {
    HERO.luck = 1;
  },
  unlucky() {
    HERO.luck = 0;
  },
  cancelLuck() {
    HERO.removeStatus("Luck");
    HERO.unlucky();
    TITLE.keys();
  },
  visible() {
    HERO.invisible = false;
  },
  removeStatus(status) {
    for (let i = HERO.inventory.status.length - 1; i >= 0; i--) {
      if (HERO.inventory.status[i].type === status) {
        HERO.inventory.status.splice(i, 1);
        break;
      }
    }
  },
  cancelInvisibility() {
    HERO.removeStatus("Invisibility");
    HERO.visible();
    TITLE.keys();
  },
  startInvisibility() {
    HERO.invisible = true;
  },
  resetVision() {
    this.vision = 1;
  },
  improveVision() {
    this.vision = 2;
  },
  extinguishLamp() {
    HERO.removeStatus("Light");
    HERO.resetVision();
    TITLE.keys();
  },
  inventory: {
    key: [],
    status: [],
    potion: {
      red: 0,
      blue: 0
    },
    scroll: new Inventory()
  },
  usePotion(type) {
    let Type = type.capitalize();
    let max = `max${Type}`;
    if (HERO[type] === HERO[max]) {
      return;
    }
    const color = { health: "red", mana: "blue" };
    if (HERO.inventory.potion[color[type]] > 0) {
      HERO.inventory.potion[color[type]]--;
      let add = Math.round(INI.POTION_INC * HERO[max]);
      HERO[type] += add;
      HERO[type] = Math.min(HERO[type], HERO[max]);
      TITLE.potion();
      AUDIO.Swallow.play();
      TITLE.status();
    }
  },
  incStatus(type) {
    let Type = type.capitalize();
    let max = `max${Type}`;
    if (type === 'mana') {
      this[max] = Math.max(this[max], 3 * Missile.calcMana(this.reference_magic));
    }
    this[max] += INI[`${type.toUpperCase()}_INC`];
    this[type] = this[max];
    TITLE.status();
  },
  incExp(value, type) {
    this[`${type}Exp`] += value;
    if (this[`${type}Exp`] >= this[`${type}ExpGoal`]) {
      AUDIO.LevelUp.play();
      this[`${type}Exp`] -= this[`${type}ExpGoal`];
      this[type]++;
      this[`reference_${type}`]++;
      this[`${type}ExpGoal`] = this.nextLevel(this[`${type}ExpGoal`]);
      switch (type) {
        case "attack":
        case "defense":
          this.incStatus("health");
          break;
        case "magic":
          this.incStatus("mana");
          break;
        default:
          throw "exp type error";
      }
      TITLE.status();
    }
    TITLE.stats();
  },
  nextLevel(value) {
    return Math.round(value * INI.LEVEL_FACTOR);
  },
  die() {
    console.log(`%cHERO DEAD!`, "font-size: 20px; color: red");
    this.dead = true;
    GAME.over();
  },
  hitByMissile(missile) {
    let damage = Math.max(missile.calcDamage(HERO.magic), 1) - HERO.luck;
    let exp = Math.max((damage ** 0.9) | 0, 1);
    HERO.applyDamage(damage);
    let type = "SmallShortExplosion";
    if (this.dead) type = "LongExplosion";
    let explosion = new Destruction(missile.moveState.pos, missile.base, DESTRUCTION_TYPE[type]);
    DESTRUCTION_ANIMATION.add(explosion);
    MISSILE.remove(missile.id);
    AUDIO.Explosion.volume = RAYCAST.volume(missile.distance);
    AUDIO.Explosion.play();
    HERO.incExp(exp, "magic");
  },
  applyDamage(damage) {
    HERO.health -= damage;
    HERO.health = Math.max(HERO.health, 0);
    TITLE.status();
    if (HERO.health <= 0) {
      HERO.die();
    }
  }
};
const SWORD = {
  init(picture, layer) {
    this.picture = picture;
    this.layer = layer;
    this.moving = false;
    this.max = new Grid(INI.SCREEN_WIDTH / 2, INI.SCREEN_HEIGHT / 2);
    this.base = this.calcBasePosition();
    this.now = this.base;
    this.drawn = false;
    this.moving = false;
    this.direction = null;
    this.speed = 1.4;
    this.length = 0.5;
  },
  calcBasePosition() {
    const observable = 20;
    let delta = this.picture.height - observable;
    return this.max.add(new Vector(delta, delta));
  },
  draw() {
    if (!this.moving && this.drawn) return;
    ENGINE.clearContext(this.layer);
    this.drawn = true;
    let CTX = this.layer;
    CTX.drawImage(this.picture, this.now.x, this.now.y);
  },
  startMoving() {
    this.moving = true;
    this.direction = -1;
  },
  stopMoving() {
    this.moving = false;
    this.direction = null;
  },
  stab() {
    if (this.moving) return;
    this.startMoving();
  },
  hit() {
    let refPoint = PLAYER.pos.translate(PLAYER.dir, this.length);
    let refGrid = Grid.toClass(refPoint);
    let enemies = RAYCAST.MAP.enemyIA.unroll(refGrid);

    if (enemies.length > 1) {
      let temp = [];
      for (let e of enemies) {
        temp.push(ENEMY_RC.POOL[e - 1]);
      }
      temp.sortByPropAsc("distance");
      enemies = [];
      for (let T of temp) {
        enemies.push(T.id);
      }
    }

    for (let e of enemies) {
      let enemy = ENEMY_RC.POOL[e - 1];
      let hit = ENGINE.lineIntersectsCircle(PLAYER.pos, refPoint, enemy.moveState.pos, enemy.r);
      if (hit) {
        return enemy;
      }
    }
    return null;
  },
  miss() {
    AUDIO.SwordMiss.play();
  },
  manage(time) {
    if (!this.moving) return;
    this.drawn = false;
    let move = this.direction * this.speed * time;
    let change = new FP_Vector(move, move);
    this.now = this.now.add(change);
    if (this.now.x < this.max.x) {
      this.now = this.max;
      this.direction = 1;
      let hit = this.hit();
      if (hit) {
        let damage = TURN.damage(HERO, hit);
        let luckAddiction = Math.min(1, (damage * 0.1) >>> 0);
        damage += HERO.luck * luckAddiction;
        let dead = false;
        if (damage <= 0) {
          damage = "MISSED";
          TURN.display(damage);
          this.miss();
        } else {
          TURN.display(damage);
          AUDIO.SwordHit.play();
          HERO.incExp(Math.min(damage, hit.health), "attack");
          hit.health -= damage;
          if (hit.health <= 0) dead = true;
          AUDIO[hit.hurtSound].play();
        }
        if (dead) {
          HERO.incExp(hit.xp, "attack");
          let explosion = new Destruction(hit.moveState.pos, hit.base, DESTRUCTION_TYPE.Smoke);
          DESTRUCTION_ANIMATION.add(explosion);
          ENEMY_RC.remove(hit.id);
          AUDIO.MonsterDeath.play();
          hit.dropInventory();
        }
      } else {
        this.miss();
      }
    }
    if (this.now.x > this.base.x) {
      this.now = this.base;
      this.stopMoving();
    }
  }
};
const GAME = {
  clearInfo() {
    ENGINE.clearLayer("info");
  },
  infoTimer() {
    let T;
    if (ENGINE.TIMERS.exists(INI.INFO_TIMER_ID)) {
      T = ENGINE.TIMERS.access(INI.INFO_TIMER_ID);
      T.set(INI.INFO_TIMER);
    } else {
      T = new CountDown(INI.INFO_TIMER_ID, INI.INFO_TIMER, GAME.clearInfo);
    }
  },
  applyTextures() {
    ENGINE.RAYCAST_DRAW.configure(
      $("#floortexture")[0].value,
      $("#ceilingtexture")[0].value,
      $("#walltexture")[0].value
    );
    if (!ENGINE.GAME.running) {
      GAME.frameDraw();
    }
  },
  start() {
    if (AUDIO.Title) {
      AUDIO.Title.pause();
      AUDIO.Title.currentTime = 0;
    }
    $(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
    $(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
    $(ENGINE.topCanvas).css("cursor", "");

    let GameRD = new RenderData("DeepDown", 35, "#FFF", "text", "#BBB", 2, 2, 2);
    ENGINE.TEXT.setRD(GameRD);
    ENGINE.GAME.start();
    MINIMAP.setOffset(TITLE.stack.minimapX, TITLE.stack.minimapY);
    $("#pause").prop("disabled", false);
    $("#pause").off();
    GAME.paused = false;
    ENGINE.watchVisibility(GAME.lostFocus);
    GAME.prepareForRestart();
    GAME.completed = false;
    GAME.level = 1;
    GAME.upperLimit = GAME.level;
    GAME.gold = 0;
    SPAWN.init();
    SWORD.init(SPRITE.SwordPOV, LAYER.sword);

    ENGINE.VECTOR2D.configure("player");
    RAYCAST.initialize(INI.SCREEN_WIDTH, INI.SCREEN_HEIGHT, INI.TEX_SIZE);
    AI.immobileWander = false;
    AI.initialize(PLAYER);
    RAY_MOUSE.initialize("WINDOW");
    GAME.fps = new FPS_short_term_measurement(300);
    HERO.construct();

    //SAVE GAME
    SAVE_GAME.pointers = [...HERO.attributesForSaveGame, 'GAME.level', 'GAME.gold'];
    SAVE_GAME.lists = ["HERO.inventory.scroll"];
    SAVE_GAME.timers = ["Main"];
    //end SAVE GAME
    GAME.time = new Timer("Main");

    if (GAME.fromCheckpoint) {
      console.log(`%c ... Loading from checkpoint ...`, GAME.CSS);
      HERO.inventory.scroll.clear();
      SAVE_GAME.load();
      GAME.upperLimit = GAME.level;
      GAME.fromCheckpoint = false;
    }

    if (DEBUG.LOAD) {
      console.log("########################");
      console.log("FORCE LOAD FROM DEBUG!!");
      console.log("########################");
      HERO.inventory.scroll.clear();
      HERO.depth10();
      //HERO.depth9();
    }

    GAME.newGrid();
    GAME.newDungeon();
    TITLE.all();
    GAME.resume();
  },
  checkpoint() {
    GAME.fromCheckpoint = true;
    GAME.start();
  },
  discardMaps() {
    for (const level in MAP) {
      MAP[level].DUNGEON = null;
    }
  },
  prepareForRestart() {
    console.log("preparing game for start or safe restart ...");
    ENGINE.TIMERS.clear();
    GAME.discardMaps();
  },
  paintCoord() {
    ENGINE.clearLayer("coord");
    let map = MAP[GAME.level].DUNGEON;
    for (let x = 0; x < map.width; x++) {
      for (let y = 0; y < map.height; y++) {
        let grid = new Grid(x, y);
        if (!map.GA.check(grid, MAPDICT.WALL)) {
          let point = GRID.gridToCoord(grid);
          let text = `${x},${y}`;
          GRID.paintText(point, text, "coord", "#BBB");
        }
      }
    }
  },
  clickPause() {
    if (HERO.dead) return;
    $("#pause").trigger("click");
    ENGINE.GAME.keymap[ENGINE.KEY.map.F4] = false;
  },
  lostFocus() {
    if (GAME.paused || HERO.dead) return;
    GAME.clickPause();
  },
  pause() {
    if (HERO.dead) return;
    console.log("%cGAME paused.", PRG.CSS);
    $("#pause").prop("value", "Resume Game [F4]");
    $("#pause").off("click", GAME.pause);
    $("#pause").on("click", GAME.resume);
    ENGINE.GAME.ANIMATION.next(
      ENGINE.KEY.waitFor.bind(null, GAME.clickPause, "F4")
    );
    ENGINE.TEXT.centeredText(
      "Game Paused",
      INI.SCREEN_WIDTH,
      INI.SCREEN_HEIGHT / 2
    );
    GAME.paused = true;
    ENGINE.TIMERS.stop();
  },
  resume() {
    console.log("%cGAME resumed.", PRG.CSS);
    $("#pause").prop("value", "Pause Game [F4]");
    $("#pause").off("click", GAME.resume);
    $("#pause").on("click", GAME.pause);
    ENGINE.clearLayer("text");
    ENGINE.TIMERS.start();
    ENGINE.GAME.ANIMATION.resetTimer();
    ENGINE.GAME.ANIMATION.next(GAME.run);
    GAME.paused = false;
  },
  newGrid() {
    ENGINE.INI.GRIDPIX = INI.GRIDSIZE;
    ENGINE.gameHEIGHT = MAP[GAME.level].height * ENGINE.INI.GRIDPIX;
    ENGINE.gameWIDTH = MAP[GAME.level].width * ENGINE.INI.GRIDPIX;
  },
  blockGrid() {
    ENGINE.resizeBOX("ROOM");
    $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
    ENGINE.BLOCKGRID.configure("pacgrid", "#FFF", "#000");
    ENGINE.BLOCKGRID.draw(MAP[GAME.level].DUNGEON);
  },
  render() {
    GAME.blockGrid();
  },
  drawPlayer() {
    ENGINE.clearLayer(ENGINE.VECTOR2D.layerString);
    ENGINE.VECTOR2D.draw();
  },
  drawKeys() {
    let map = MAP[GAME.level].DUNGEON;
    for (let key in map.keys) {
      let grid = map.keys[key];
      let spriteName = key + "Key";
      ENGINE.spriteToGrid(
        ENGINE.VECTOR2D.layerString,
        grid,
        SPRITE[spriteName]
      );
    }
  },
  frameDraw(lapsedTime) {
    if (DEBUG._2D_display) {
      GAME.drawPlayer();
      GAME.drawKeys();
      ENEMY_RC.draw();
      MISSILE.draw();
    }

    MINIMAP.draw();
    ENGINE.RAYCAST_DRAW.draw("view"); //destroys enemyIA
    TITLE.time();
    TITLE.compassNeedle();
    SWORD.draw();

    if (DEBUG.FPS) {
      GAME.FPS(lapsedTime);
    }
  },
  FPS(lapsedTime) {
    let CTX = LAYER.FPS;
    CTX.fillStyle = "white";
    ENGINE.clearLayer("FPS");
    let fps = 1000 / lapsedTime || 0;
    GAME.fps.update(fps);
    CTX.fillText(GAME.fps.getFps(), 5, 10);
  },
  respond() {
    var map = ENGINE.GAME.keymap;
    if (map[ENGINE.KEY.map.F4]) {
      $("#pause").trigger("click");
      ENGINE.TIMERS.display();
      ENGINE.GAME.keymap[ENGINE.KEY.map.F4] = false;
    }
    if (map[ENGINE.KEY.map.F9]) {
      if (!DEBUG.BUTTONS) return;
      DEBUG.clearEnemies();
    }
    if (map[ENGINE.KEY.map.F8]) {
      if (!DEBUG.BUTTONS) return;
      DEBUG.toLastRoom();
    }
    if (map[ENGINE.KEY.map.left]) {
      TITLE.stack.scrollIndex--;
      TITLE.stack.scrollIndex = Math.max(0, TITLE.stack.scrollIndex);
      TITLE.scrolls();
      ENGINE.GAME.keymap[ENGINE.KEY.map.left] = false;
      return;
    }
    if (map[ENGINE.KEY.map.right]) {
      TITLE.stack.scrollIndex++;
      TITLE.stack.scrollIndex = Math.min(
        HERO.inventory.scroll.size() - 1,
        TITLE.stack.scrollIndex
      );
      TITLE.scrolls();
      ENGINE.GAME.keymap[ENGINE.KEY.map.right] = false;
      return;
    }
    if (map[ENGINE.KEY.map.enter]) {
      if (HERO.inventory.scroll.size() === 0) {
        return;
      }
      let scroll = HERO.inventory.scroll.remove(TITLE.stack.scrollIndex);
      scroll.action();
      TITLE.scrolls();
      ENGINE.GAME.keymap[ENGINE.KEY.map.enter] = false;
    }
    if (map[ENGINE.KEY.map.H]) {
      if (GAME.completed) return;
      HERO.usePotion("health");
      ENGINE.GAME.keymap[ENGINE.KEY.map.H] = false; //NO repeat
    }
    if (map[ENGINE.KEY.map.M]) {
      if (GAME.completed) return;
      HERO.usePotion("mana");
      ENGINE.GAME.keymap[ENGINE.KEY.map.M] = false; //NO repeat
    }
    if (map[ENGINE.KEY.map.space]) {
      SWORD.stab();
      ENGINE.GAME.keymap[ENGINE.KEY.map.space] = false; //NO repeat
    }
    if (map[ENGINE.KEY.map.ctrl]) {
      let cost = Missile.calcMana(HERO.reference_magic);
      if (cost > HERO.mana) {
        AUDIO.MagicFail.play();
        return;
      }
      if (!HERO.canShoot) return;
      HERO.canShoot = false;
      HERO.mana -= cost;
      let exp = (HERO.magic / 5) | 0;
      HERO.incExp(exp, "magic");
      TITLE.status();
      let FB = new Missile(
        PLAYER.pos.translate(PLAYER.dir, PLAYER.r),
        PLAYER.dir,
        MISSILE_TYPE.Fireball,
        HERO.magic + HERO.luck
      );
      MISSILE.add(FB);
      ENGINE.GAME.keymap[ENGINE.KEY.map.ctrl] = false; //NO repeat
      setTimeout(() => (HERO.canShoot = true), INI.HERO_SHOOT_TIMEOUT);
      return;
    }
  },
  run(lapsedTime) {
    if (ENGINE.GAME.stopAnimation) return;
    let map = MAP[GAME.level].DUNGEON;
    //must be before to set indexArray
    ENEMY_RC.manage(lapsedTime, map, [HERO.invisible, HERO.dead]);
    PLAYER.respond(lapsedTime);
    GAME.respond();
    MINIMAP.unveil(PLAYER.pos, HERO.vision);
    MISSILE.manage(lapsedTime, map);
    DESTRUCTION_ANIMATION.manage(lapsedTime, map);
    CHANGING_ANIMATION.manage(lapsedTime, map);
    ENGINE.TIMERS.update();
    SWORD.manage(lapsedTime);
    GAME.frameDraw(lapsedTime);
    //needs to repopulate IndexArray after Raycaster draws!!
    FLOOR_OBJECT_WIDE.manage();

    let checkMouse = RAY_MOUSE.click();
    if (checkMouse) {
      let objects, obj;
      switch (checkMouse.surface) {
        case "floor":
          objects = RAY_MOUSE.checkFloor(checkMouse.position);
          if (objects.length === 0) break;
          obj = objects[0];
          obj.interact();
          break;
        case "wall":
          objects = RAY_MOUSE.checkWall(checkMouse.position);
          if (objects.length === 0) break;
          let rightObject = null;
          for (const obj of objects) {
            if (!obj.parent.playerBehindPlane(obj)) {
              rightObject = obj;
              break;
            }
          }

          rightObject.interact();
          break;
      }
    }
  },
  setlevelTextures(level) {
    ENGINE.RAYCAST_DRAW.configure(
      MAP[level].floor,
      MAP[level].ceil,
      MAP[level].wall
    );
  },
  useStaircase(newLevel, waypoint) {
    ROM.storeMaps(MAP[GAME.level].DUNGEON);
    GAME.level = newLevel;
    if (GAME.level === GAME.WIN_LEVEL) return GAME.won();
    if (MAP[GAME.level].DUNGEON === null) {
      GAME.newDungeon(waypoint);
      SAVE_GAME.save();
      TURN.display("GAME SAVED", "#FFF");
    } else {
      GAME.setlevelTextures(GAME.level);
      ROM.refreshMaps(MAP[GAME.level].DUNGEON);
      GAME.linkMaps();
      PLAYER.initialize(
        Grid.toCenter(MAP[GAME.level].DUNGEON[waypoint]),
        FP_Vector.toClass(MAP[GAME.level].DUNGEON[`${waypoint}Vector`])
      );

      if (DEBUG._2D_display) {
        GAME.render();
        GRID.grid();
        GAME.paintCoord();
      }
    }
  },
  linkMaps() {
    let map = MAP[GAME.level].DUNGEON;
    RAYCAST.setMap(map);
    ENEMY_RC.linkMap(map);
    MISSILE.linkMap(map);
    DECAL.init(map);
    FLOOR_OBJECT_WIDE.init(map);
    MINIMAP.init(map, INI.MIMIMAP_WIDTH, INI.MIMIMAP_HEIGHT);
  },
  won() {
    console.log("GAME WON");
    ENGINE.TIMERS.stop();
    ENGINE.GAME.ANIMATION.resetTimer();
    TITLE.music();
    TITLE.setEndingCreditsScroll();
    $("#pause").prop("disabled", true);
    $("#pause").off();
    ENGINE.GAME.ANIMATION.next(GAME.inBetween);
  },
  inBetween() {
    const layersToClear = ["view", "sword", "FPS", "info"];
    layersToClear.forEach(item => ENGINE.layersToClear.add(item));
    ENGINE.clearLayerStack();
    ENGINE.GAME.ANIMATION.next(GAME.wonRun);
  },
  wonRun(lapsedTime) {
    if (ENGINE.GAME.stopAnimation) return;
    if (ENGINE.GAME.keymap[ENGINE.KEY.map.enter]) {
      ENGINE.GAME.ANIMATION.waitThen(TITLE.startTitle);
    }
    GAME.endingCreditText.process(lapsedTime);
    GAME.wonFrameDraw();
  },
  wonFrameDraw() {
    GAME.endingCreditText.draw();
  },
  newDungeon(waypoint = "entrance") {
    GAME.setlevelTextures(GAME.level);
    let randomDungeon;
    if (GAME.level < INI.FINAL_LEVEL) {
      randomDungeon = DUNGEON.create(MAP[GAME.level].width, MAP[GAME.level].height);
    } else if (GAME.level === INI.FINAL_LEVEL) {
      console.log("newDungeon: CREATE FINAL LEVEL");
      randomDungeon = ARENA.create(MAP[GAME.level].width, MAP[GAME.level].height);
    }

    MAP[GAME.level].DUNGEON = randomDungeon;
    console.log("creating random dungeon", MAP[GAME.level].DUNGEON);

    ROM.linkMap(MAP[GAME.level].DUNGEON);
    GAME.configDungeon(waypoint);
    MAP[GAME.level].DUNGEON.GA.massSet(MAPDICT.FOG);
    GAME.linkMaps();

    if (DEBUG._2D_display) {
      GAME.render();
      GRID.grid();
      GAME.paintCoord();
    }
  },
  resizeGrid() {
    if (isNaN(parseInt($("#gridsize").val(), 10))) {
      $("#gridsize").val(INI.GRIDSIZE);
    }

    if ($("#gridsize").val() < INI.MIN_GRID) $("#gridsize").val(INI.MIN_GRID);
    if ($("#gridsize").val() > INI.MAX_GRID) $("#gridsize").val(INI.MAX_GRID);
    if ($("#gridsize").val() % 8 !== 0) {
      $("#gridsize").val(Math.floor($("#gridsize").val() / 8) * 8);
    }
    ENGINE.INI.GRIDPIX = parseInt($("#gridsize").val(), 10);
    RAYCAST.INI.BLOCK_SIZE = ENGINE.INI.GRIDPIX;
    ENGINE.gameHEIGHT = MAP.level.height * ENGINE.INI.GRIDPIX;
    ENGINE.gameWIDTH = MAP.level.width * ENGINE.INI.GRIDPIX;
    GAME.render();
  },
  setup() {
    console.log("GAME SETUP started");
    MAZE.connectSome = true;
    MAZE.leaveDeadEnds = 4;
    MAZE.connectDeadEnds = false;
    MAZE.polishDeadEnds = true;
    MAZE.addConnections = false;
    MAZE.targetDensity = 0.6;
    MAZE.bias = 2;
    MAZE.useBias = true;
    DUNGEON.MIN_ROOM = 4;
    DUNGEON.MAX_ROOM = 6;
    DUNGEON.MIN_PADDING = 2;
    DUNGEON.ITERATIONS = 4;
    DUNGEON.CONFIGURE = false;
    DUNGEON.setLockLevel(3);

    $("#buttons").prepend("<input type='button' id='startGame' value='Start Game'>");

    $("#startGame").prop("disabled", true);
    $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);

    ENGINE.addBOX(
      "TITLE",
      INI.SCREEN_WIDTH * 2,
      INI.TITLE_HEIGHT,
      ["title", "compassRose", "compassNeedle"],
      null
    );
    ENGINE.addBOX(
      "LSIDE",
      INI.SCREEN_WIDTH / 2,
      INI.SCREEN_HEIGHT,
      ["Lside_background", "potion", "time", "statusBars", "stat", "gold"],
      "side"
    );
    ENGINE.addBOX(
      "WINDOW",
      INI.SCREEN_WIDTH,
      INI.SCREEN_HEIGHT,
      ["black", "view", "sword", "FPS", "info", "text", "mouse"],
      "side"
    );
    ENGINE.addBOX(
      "RSIDE",
      INI.SCREEN_WIDTH / 2,
      INI.SCREEN_HEIGHT,
      ["Rside_background", "keys", "minimap", "scrolls"],
      "fside"
    );
    ENGINE.addBOX(
      "BOTTOM",
      INI.SCREEN_WIDTH * 2,
      INI.BOTTOM_HEIGHT,
      ["bottom_background", "bottom_text"],
      null
    );

    if (DEBUG._2D_display) {
      ENGINE.addBOX(
        "ROOM",
        ENGINE.gameWIDTH,
        ENGINE.gameHEIGHT,
        ["pacgrid", "grid", "coord", "player"],
        null
      );
    }


    ENGINE.TEXT.RD = new RenderData("DeepDown", 50, "#FFF", "text", "#333", 2, 2, 2);
    FORM.set("WINDOW", "mouse");
    GAME.WIN_LEVEL = INI.FINAL_LEVEL + 1;
  },
  configDungeon(waypoint = "entrance") {
    if (MAP[GAME.level].DUNGEON.type === "DUNGEON") {
      SPAWN.spawn(MAP[GAME.level].DUNGEON, GAME.level, GAME.upperLimit);
    } else {
      console.log("..spawning for arena");
      SPAWN.arena(MAP[GAME.level].DUNGEON, GAME.level, GAME.upperLimit);
    }

    PLAYER.initialize(
      Grid.toCenter(MAP[GAME.level].DUNGEON[waypoint]),
      FP_Vector.toClass(MAP[GAME.level].DUNGEON[`${waypoint}Vector`])
    );
  },
  runTitle() {
    if (ENGINE.GAME.stopAnimation) return;
    GAME.movingText.process();
    GAME.titleFrameDraw();
  },
  titleFrameDraw() {
    GAME.movingText.draw();
  },
  over() {
    console.log("GAME OVER");
    AUDIO.Scream.play();
    ENGINE.TEXT.centeredText("Rest In Peace", INI.SCREEN_WIDTH, INI.SCREEN_HEIGHT / 2);
    ENGINE.TEXT.centeredText("(ENTER)", INI.SCREEN_WIDTH, INI.SCREEN_HEIGHT / 2 + ENGINE.TEXT.RD.fs * 1.2);
    ENGINE.TIMERS.stop();
    ENGINE.GAME.ANIMATION.resetTimer();
    ENGINE.GAME.ANIMATION.next(GAME.gameOverRun);
    ENGINE.clearLayer("sword");
  },
  gameOverRun(lapsedTime) {
    if (ENGINE.GAME.stopAnimation) return;
    if (ENGINE.GAME.keymap[ENGINE.KEY.map.enter]) {
      ENGINE.GAME.ANIMATION.waitThen(TITLE.startTitle);
    }
    let map = MAP[GAME.level].DUNGEON;
    ENEMY_RC.manage(lapsedTime, map, [HERO.invisible, HERO.dead]);
    GAME.gameOverFrameDraw(lapsedTime);
  },
  gameOverFrameDraw(lapsedTime) {
    if (DEBUG._2D_display) {
      GAME.drawPlayer();
      GAME.drawKeys();
      ENEMY_RC.draw();
      MISSILE.draw();
    }

    ENGINE.RAYCAST_DRAW.drawFilter("view", [FILTER.DarkShift], [{ shift: 2 }]); //destroys enemyIA

    if (DEBUG.FPS) {
      GAME.FPS(lapsedTime);
    }
  }
};
const TITLE = {
  stack: {
    delta2: 48,
    delta3: 48, //48
    keyDelta: 56,
    minimapX: 20,
    minimapY: 144,
    p1: null,
    p2: null,
    PY: null,
    scrollIndex: 0,
    scrollInRow: 3,
    scrollDelta: 72,
    statusY: null,
    YL4: 180,
    YL5: 280
  },
  all() {
    TITLE.main();
    TITLE.scrolls();
  },
  background() {
    TITLE.clearAllLayers();
    TITLE.blackBackground();

    let CTX = LAYER.bottom_background;
    CTX.textAlign = "center";
    var x = INI.SCREEN_WIDTH;
    var y = INI.BOTTOM_HEIGHT / 2;
    CTX.font = "10px Consolas";
    CTX.fillStyle = "green";
    CTX.shadowOffsetX = 2;
    CTX.shadowOffsetY = 2;
    CTX.shadowBlur = 5;
    CTX.shadowColor = "#040";
    CTX.fillText("Version " + PRG.VERSION + " by Lovro Selič", x, y);

    //lines
    x = ((INI.SCREEN_WIDTH / 2 - SPRITE.LineTop.width) / 2) | 0;
    y = 0;
    ENGINE.draw("Lside_background", x, y, SPRITE.LineTop);
    ENGINE.draw("Rside_background", x, y, SPRITE.LineTop);

    //2nd tier
    y += TITLE.stack.delta2;
    ENGINE.draw("Lside_background", x, y, SPRITE.LineBottom);
    ENGINE.draw("Rside_background", x, y, SPRITE.LineBottom);
    TITLE.stack.SY = (y + TITLE.stack.delta3 / 2) | 0;

    //3rd tier left
    y += TITLE.stack.delta3;
    ENGINE.draw("Lside_background", x, y, SPRITE.LineTop);
    TITLE.stack.statusY = y + SPRITE.LineTop.height;

    //4rd tier left
    ENGINE.draw("Lside_background", x, TITLE.stack.YL4, SPRITE.LineBottom);

    //5rd tier left
    ENGINE.draw("Lside_background", x, TITLE.stack.YL5, SPRITE.LineTop);

    //potion background
    let delta = 80;
    y -= TITLE.stack.delta3 / 2 - 6;
    TITLE.stack.PY = (y + SPRITE.RedPotion24.height / 4) | 0;
    let xS = ENGINE.spreadAroundCenter(2, INI.SCREEN_WIDTH / 4, delta);
    let x1 = xS.shift();
    TITLE.stack.p1 = x1 + SPRITE.RedPotion24.width + 6;
    ENGINE.spriteDraw("Lside_background", x1, y, SPRITE.RedPotion24);
    let x2 = xS.shift();
    TITLE.stack.p2 = x2 + SPRITE.BluePotion24.width + 6;
    ENGINE.spriteDraw("Lside_background", x2, y, SPRITE.BluePotion24);

    //final lines
    y = (INI.SCREEN_HEIGHT - SPRITE.LineBottom.height) | 0;

    ENGINE.draw("Lside_background", x, y, SPRITE.LineBottom);
    ENGINE.draw("Rside_background", x, y, SPRITE.LineBottom);

    y -= 224;
    ENGINE.draw("Rside_background", x, y, SPRITE.LineTop);

    //compassRose
    CTX = LAYER.compassRose;
    x = (3 * INI.SCREEN_WIDTH / 2 + INI.SCREEN_WIDTH / 4) | 0;
    y = (INI.TITLE_HEIGHT / 2) | 0;
    ENGINE.spriteDraw("compassRose", x, y, SPRITE.CompassRose);
    TITLE.stack.compassX = x;
    TITLE.stack.compassY = y;

    //initial draws
    this.potion();
    this.status();
    this.stats();
    this.gold();
    this.compassNeedle();
  },
  compassNeedle() {
    ENGINE.clearLayer("compassNeedle");
    let CTX = LAYER.compassNeedle;
    CTX.strokeStyle = "#F00";
    let [x, y] = [TITLE.stack.compassX, TITLE.stack.compassY];
    CTX.beginPath();
    CTX.moveTo(x, y);
    let end = new Point(x, y).translate(PLAYER.dir, (SPRITE.CompassRose.width / 2 * 0.8) | 0);
    CTX.lineTo(end.x, end.y);
    CTX.stroke();
  },
  firstTitle() {
    let CTX = LAYER.black;
    var fs = 60;
    CTX.font = fs + "px DeepDown";
    CTX.textAlign = "center";
    var txt = CTX.measureText(PRG.NAME);
    var x = INI.SCREEN_WIDTH / 2;
    var y = fs + 10;
    var gx = x - txt.width / 2;
    var gy = y - fs;
    var grad = CTX.createLinearGradient(gx, gy + 10, gx, gy + fs);
    this.drawTitleText(CTX, grad, x, y);
  },
  title() {
    let CTX = LAYER.title;
    var fs = 42;
    CTX.font = fs + "px DeepDown";
    CTX.textAlign = "center";
    var txt = CTX.measureText(PRG.NAME);
    var x = INI.SCREEN_WIDTH;
    var y = fs + 10;
    var gx = x - txt.width / 2;
    var gy = y - fs;
    var grad = CTX.createLinearGradient(gx, gy + 10, gx, gy + fs);
    this.drawTitleText(CTX, grad, x, y);
  },
  drawTitleText(CTX, grad, x, y) {
    grad.addColorStop("0", "#EEE8AA");
    grad.addColorStop("0.1", "#FAFAD2");
    grad.addColorStop("0.2", "#FFFFCC");
    grad.addColorStop("0.3", "#FFFF99");
    grad.addColorStop("0.4", "#FFFF66");
    grad.addColorStop("0.5", "#FFFF00");
    grad.addColorStop("0.6", "#FFD700");
    grad.addColorStop("0.7", "#DAA520");
    grad.addColorStop("0.8", "#D4AF37");
    grad.addColorStop("0.9", "#CFB53B");
    grad.addColorStop("1", "#C5B358");
    CTX.fillStyle = grad;
    CTX.shadowColor = "#D4AF37";
    CTX.shadowOffsetX = 2;
    CTX.shadowOffsetY = 2;
    CTX.shadowBlur = 2;
    CTX.fillText(PRG.NAME, x, y);
  },
  main() {
    this.background();
    this.title();
  },
  keys() {
    ENGINE.clearLayer("keys");
    let y = (SPRITE.LineTop.height / 2 + TITLE.stack.delta2 / 2) | 0;
    let list = [...HERO.inventory.key, ...HERO.inventory.status];
    let NUM = list.length;
    let spread = ENGINE.spreadAroundCenter(
      NUM,
      INI.SCREEN_WIDTH / 4,
      TITLE.stack.keyDelta
    );
    for (const item of list) {
      let x = spread.shift();
      ENGINE.spriteDraw("keys", x, y, SPRITE[item.spriteClass]);
    }
  },
  potion() {
    ENGINE.clearLayer("potion");
    let CTX = LAYER.potion;
    CTX.fillStyle = "#AAA";
    CTX.shadowColor = "#666";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 1;
    let fs = 16;
    CTX.font = fs + "px Times";
    CTX.fillText(HERO.inventory.potion.red, TITLE.stack.p1, TITLE.stack.PY);
    CTX.fillText(HERO.inventory.potion.blue, TITLE.stack.p2, TITLE.stack.PY);
  },
  scrolls() {
    let INV = HERO.inventory.scroll;
    ENGINE.clearLayer("scrolls");
    let CTX = LAYER.scrolls;

    TITLE.stack.scrollIndex = Math.min(TITLE.stack.scrollIndex, INV.size() - 1);
    let scrollSpread = ENGINE.spreadAroundCenter(
      TITLE.stack.scrollInRow,
      ((INI.SCREEN_WIDTH / 4) | 0) - 16,
      TITLE.stack.scrollDelta
    );

    let LN = INV.size();
    let startIndex = Math.min((TITLE.stack.scrollIndex - TITLE.stack.scrollInRow / 2) | 0, LN - TITLE.stack.scrollInRow);
    startIndex = Math.max(0, startIndex);
    let max = startIndex + Math.min(TITLE.stack.scrollInRow, LN);
    let y = TITLE.stack.SY;
    for (let q = startIndex; q < max; q++) {
      let scroll = INV.list[q];
      let x = scrollSpread.shift();

      if (q === TITLE.stack.scrollIndex) {
        CTX.globalAlpha = 1;
      } else {
        CTX.globalAlpha = 0.75;
      }

      ENGINE.draw("scrolls", x, y, scroll.object.sprite);

      CTX.font = "10px Consolas";
      CTX.fillStyle = "#FFF";
      CTX.fillText(scroll.count.toString().padStart(2, "0"), x + 32, y + 18 + 4);

      if (q === TITLE.stack.scrollIndex) {
        CTX.strokeStyle = "#FFF";
        CTX.globalAlpha = 0.5;
        CTX.lineWidth = "1";
        CTX.beginPath();
        CTX.rect(x - 14, y - 3, 60, 44);
        CTX.closePath();
        CTX.stroke();
      }
    }
  },
  time() {
    let fs = 14;
    let y = ((TITLE.stack.delta2 + SPRITE.LineTop.height) / 2 + fs / 4) | 0;
    let x = ((INI.SCREEN_WIDTH / 2 - SPRITE.LineTop.width) / 2) | 0;
    var CTX = LAYER.time;
    ENGINE.clearLayer("time");
    CTX.font = fs + "px Consolas";
    CTX.fillStyle = "#0D0";
    CTX.fillText(`Depth: ${GAME.level.toString().padStart(2, "0")}`, x, y);
    let time = `Time: ${GAME.time.timeString()}`;
    let timeMeasure = CTX.measureText(time);
    x = (INI.SCREEN_WIDTH / 2 - x - timeMeasure.width) | 0;
    CTX.fillText(time, x, y);
  },
  statBar(x, y, value, max, color) {
    var CTX = LAYER.stat;
    CTX.save();
    ENGINE.resetShadow(CTX);
    let h = 12;
    let w = 120;
    ENGINE.statusBar(CTX, x, y, w, h, value, max, color);
    CTX.restore();
  },
  attackBar(x, y) {
    TITLE.statBar(x, y, HERO.attackExp, HERO.attackExpGoal, "#FF8C00");
  },
  defenseBar(x, y) {
    TITLE.statBar(x, y, HERO.defenseExp, HERO.defenseExpGoal, "#666600");
  },
  magicBar(x, y) {
    TITLE.statBar(x, y, HERO.magicExp, HERO.magicExpGoal, "#800080");
  },
  statusBar(x, y, value, max, color) {
    var CTX = LAYER.statusBars;
    CTX.save();
    ENGINE.resetShadow(CTX);
    let h = 16;
    let w = 142;
    ENGINE.statusBar(CTX, x, y, w, h, value, max, color);
    CTX.restore();
  },
  healthBar(x, y) {
    TITLE.statusBar(x, y, HERO.health, HERO.maxHealth, "#F00");
  },
  manaBar(x, y) {
    TITLE.statusBar(x, y, HERO.mana, HERO.maxMana, "#00F");
  },
  status() {
    ENGINE.clearLayer("statusBars");
    let fs = 16;
    var CTX = LAYER.statusBars;
    CTX.font = fs + "px Times";
    CTX.fillStyle = "#AAA";
    CTX.shadowColor = "#666";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 1;
    let y = TITLE.stack.statusY;
    let x = ((INI.SCREEN_WIDTH / 2 - SPRITE.LineTop.width) / 2) | 0;

    var bx, by;
    y += fs * 1.5;
    CTX.fillText("Health:", x, y);
    inc();
    TITLE.healthBar(bx, by);

    y += fs * 1.5;
    CTX.fillText("Mana:", x, y);
    inc();
    TITLE.manaBar(bx, by);
    y += 1 * fs;

    function inc() {
      const pad = 3;
      bx = x + 58;
      by = y - fs + pad;
    }
  },
  stats() {
    ENGINE.clearLayer("stat");
    let y = TITLE.stack.YL4 + SPRITE.LineTop.height + 16;
    let x = ((INI.SCREEN_WIDTH / 2 - SPRITE.LineTop.width) / 2) | 0;
    let fs = 12;
    var CTX = LAYER.stat;
    CTX.font = fs + "px Consolas";
    CTX.fillStyle = "#AAA";
    CTX.shadowColor = "#666";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 1;

    const padX = 80;
    var bx, by;
    y += fs * 1.0;
    CTX.fillText(`Attack: `, x, y);
    CTX.save();
    if (HERO.attack > HERO.reference_attack) {
      CTX.fillStyle = "#0E0";
    }
    CTX.fillText(HERO.attack.toString().padStart(2, "0"), padX, y);
    CTX.restore();
    inc();
    TITLE.attackBar(bx, by);

    y += fs * 1.5;
    CTX.fillText(`Defense: `, x, y);
    CTX.save();
    if (HERO.defense > HERO.reference_defense) {
      CTX.fillStyle = "#0E0";
    }
    CTX.fillText(HERO.defense.toString().padStart(2, "0"), padX, y);
    CTX.restore();
    inc();
    TITLE.defenseBar(bx, by);

    y += fs * 1.5;
    CTX.fillText(`Magic: `, x, y);
    CTX.save();
    if (HERO.magic > HERO.reference_magic) {
      CTX.fillStyle = "#0E0";
    }
    CTX.fillText(HERO.magic.toString().padStart(2, "0"), padX, y);
    CTX.restore();
    inc();
    TITLE.magicBar(bx, by);

    function inc() {
      const pad = 3;
      bx = 100;
      by = y - fs + pad;
    }
  },
  gold() {
    ENGINE.clearLayer("gold");
    let y = TITLE.stack.YL5 + SPRITE.LineTop.height + 30;
    let x = ((INI.SCREEN_WIDTH / 2 - SPRITE.LineTop.width) / 2) | 0;
    let fs = 18;
    var CTX = LAYER.gold;
    CTX.font = fs + "px Consolas";
    CTX.fillStyle = "#AB8D3F";
    CTX.shadowColor = "#6E5A28";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 1;
    CTX.fillText(`Gold: `, x, y);
    CTX.fillText(`${GAME.gold.toString().padStart(6, "0")}`, 100, y);
  },
  clearAllLayers() {
    ENGINE.layersToClear = new Set(["title", "Lside_background", "potion", "time", "statusBars", "stat", "gold",
      "view", "sword", "FPS", "info", "text", "mouse", "Rside_background", "keys", "minimap", "scrolls",
      "bottom_background", "bottom_text", "black", "compassRose", "compassNeedle"]);
    ENGINE.clearLayerStack();
  },
  blackBackground() {
    ENGINE.fillLayer("black", "#000");
    ENGINE.fillLayer("Lside_background", "#000");
    ENGINE.fillLayer("Rside_background", "#000");
    let CTX = LAYER.title;
    CTX.fillStyle = "#000";
    CTX.roundRect(0, 0, INI.SCREEN_WIDTH * 2, INI.TITLE_HEIGHT, { upperLeft: 20, upperRight: 20, lowerLeft: 0, lowerRight: 0 }, true, true);
    CTX = LAYER.bottom_background;
    CTX.fillStyle = "#000";
    CTX.roundRect(0, 0, INI.SCREEN_WIDTH * 2, INI.BOTTOM_HEIGHT, { upperLeft: 0, upperRight: 0, lowerLeft: 20, lowerRight: 20 }, true, true);
  },
  startTitle() {
    $("#pause").prop("disabled", true);
    TITLE.clearAllLayers();
    TITLE.blackBackground();
    ENGINE.topCanvas = ENGINE.getCanvasName("WINDOW");
    TITLE.firstTitle();
    let y = 104;
    let fs = 25;
    let NameRD = new RenderData("DeepDown", fs, "#C0C0C0", "black", "#A9A9A9", 2, 2, 2);
    ENGINE.TEXT.setRD(NameRD);
    ENGINE.TEXT.centeredText("by", INI.SCREEN_WIDTH, y);
    y += fs * 1.2;
    ENGINE.TEXT.centeredText("Lovro Selic", INI.SCREEN_WIDTH, y);
    y += fs * 1.2;
    ENGINE.resetShadow(LAYER.black);
    let x = ((INI.SCREEN_WIDTH - SPRITE.Title.width) / 2) | 0;
    ENGINE.draw("black", x, y, SPRITE.Title);

    TITLE.drawButtons();
    TITLE.setTitleScroll();
    ENGINE.GAME.start();
    ENGINE.GAME.ANIMATION.next(GAME.runTitle);
  },
  drawButtons() {
    FORM.BUTTON.POOL.clear();
    if (AUDIO.Title) AUDIO.Title.play();
    let x = 48;
    let y = 360 - 3 * 24;
    let w = 100;
    let h = 18;
    let startBA = new Area(x, y, w, h);
    let buttonColors = new ColorInfo("#F00", "#A00", "#222", "#666", 10);
    let checkpointColors = new ColorInfo("#F0F", "#A0A", "#222", "#666", 10);
    let musicColors = new ColorInfo("#0E0", "#090", "#222", "#666", 10);
    FORM.BUTTON.POOL.push(new Button("Start new game", startBA, buttonColors, GAME.start));

    const sg = localStorage.getItem(PRG.SG);
    if (sg) {
      y += 1.5 * h;
      let resumeBA = new Area(x, y, w, h);
      FORM.BUTTON.POOL.push(new Button("Resume", resumeBA, checkpointColors, GAME.checkpoint));
    }

    y += 1.5 * h;
    let music = new Area(x, y, w, h);
    FORM.BUTTON.POOL.push(new Button("Play title music", music, musicColors, TITLE.music));
    FORM.BUTTON.draw();
    $(ENGINE.topCanvas).on(
      "mousemove",
      { layer: ENGINE.topCanvas },
      ENGINE.mouseOver
    );
    $(ENGINE.topCanvas).on(
      "click",
      { layer: ENGINE.topCanvas },
      ENGINE.mouseClick
    );
  },
  music() {
    AUDIO.Title.play();
  },
  generateTitleText() {
    let text = `${PRG.NAME} ${PRG.VERSION
      }, a game by Lovro Selic, ${"\u00A9"} LaughingSkull ${PRG.YEAR
      }.  Music: Laughing Skull written and performed by LaughingSkull, ${"\u00A9"} 2006 Lovro Selic. `;
    text +=
      "     ENGINE, MAZE, GRID, AI, RAYCASTER, SAVE GAME and GAME code by Lovro Selic using JavaScript. ";
    text = text.split("").join(String.fromCharCode(8202));
    return text;
  },
  setTitleScroll() {
    const text = this.generateTitleText();
    const RD = new RenderData("DeepDown", 20, "#DAA520", "bottom_text");
    const SQ = new RectArea(0, 0, LAYER.bottom_text.canvas.width, LAYER.bottom_text.canvas.height);
    GAME.movingText = new MovingText(text, 2, RD, SQ);
  },
  generateEndingCredits() {
    const text = `Congratulations!
    You have completed CrawlMaster
    in ${GAME.time.timeString()}.
    You certainly had fun.
    You may think this ending is rather
    anticlimactic ...
    sure ...
    but what would you prefer?
    picking gold, without noticing that it's over?
    like in 'Deep Down ...'?
    There comes a time a project has to end.
    Somehow.
    
    CREDITS:
    all libraries and game code: Lovro Selic,
    written in JavaScript,
    except of course,  JQUERY: John Resig et al.
    Graphics taken from (hopefully) free resources
    or drawn with PiskelApp.
    Supplementary tools written in 
    JavaScript or Python.
      
    Music: Laughing Skull 
    written and performed by LaughingSkull, 
    ${"\u00A9"} 2006 Lovro Selic.

    thanks for sticking 'till the end.\n`;
    return text;

  },
  setEndingCreditsScroll() {
    console.group("endingCredits");
    const text = this.generateEndingCredits();
    const RD = new RenderData("DeepDown", 20, "#DAA520", "text");
    GAME.endingCreditText = new VerticalScrollingText(text, 1, RD);
    console.groupEnd("endingCredits");
  }

};
const TURN = {
  damage(attacker, defender) {
    if (attacker.attack === 0) return 0;
    let delta = attacker.attack - defender.defense;
    let damage = RND(Math.min(-1, (delta / 2) | 0), Math.max(delta, 1));
    return damage;
  },
  magicDamage(attacker, defender) {
    if (attacker.magic === 0) return 0;
  },
  display(value, color = "#0F0") {
    ENGINE.clearLayer("info");
    let CTX = LAYER.info;
    let fs = 16;
    CTX.font = fs + "px Times";
    CTX.shadowColor = "#666";
    CTX.shadowOffsetX = 1;
    CTX.shadowOffsetY = 1;
    CTX.shadowBlur = 0;
    CTX.fillStyle = color;
    CTX.textAlign = "center";
    CTX.fillText(value, INI.SCREEN_WIDTH / 2, INI.SCREEN_HEIGHT / 2);
    GAME.infoTimer();
  }
};

// -- main --
$(function () {
  PRG.INIT();
  PRG.setup();
  ENGINE.LOAD.preload();
  SAVE_GAME.setKey(PRG.SG);
});