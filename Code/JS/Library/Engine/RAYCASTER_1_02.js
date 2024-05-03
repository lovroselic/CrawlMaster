/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

/////////////////////Raycaster.js///////////////
//                                            //
//        Raycasting engine                   //
//        Raycasting Object Manager (ROM)     //
//    dependencies: Prototype LS, ENGINE      //
////////////////////////////////////////////////

/*
TODO:

*/


/** Raycaster main */
var ROM = {
  staticPools: ["FLOOR_OBJECT_WIDE", "DECAL", "ENEMY_RC"],
  dinamicPools: ["DESTRUCTION_ANIMATION", "CHANGING_ANIMATION", "MISSILE"],
  linkMap(dungeon) {
    for (const stat of [...this.staticPools, ...this.dinamicPools]) {
      dungeon[stat] = {};
      dungeon[stat].POOL = [];
      window[stat].POOL = dungeon[stat].POOL;
    }
  },
  refreshMaps(dungeon) {
    for (const stat of [...this.staticPools, ...this.dinamicPools]) {
      window[stat].POOL = dungeon[stat].POOL;
    }
  },
  storeMaps(dungeon) {
    for (const stat of [...this.staticPools, ...this.dinamicPools]) {
      dungeon[stat].POOL = window[stat].POOL;
    }
  }
};
var CAMERA = {
  FOV: 70,
  dir: null,
  transformX: null,
  transformDepth: null,
  Z: 0.5,
  set(player = PLAYER) {
    CAMERA.dir = player.dir.rotate(Math.radians(90)).scale(Math.tan(Math.radians(CAMERA.FOV) / 2));
    CAMERA.minPerspective = Math.cos(Math.radians((90 + this.FOV) / 2));
  },
  transform(spritePos) {
    let invDet = 1.0 / (CAMERA.dir.x * PLAYER.dir.y - PLAYER.dir.x * CAMERA.dir.y);
    CAMERA.transformX = invDet * (PLAYER.dir.y * spritePos.x - PLAYER.dir.x * spritePos.y);
    CAMERA.transformDepth = invDet * (-CAMERA.dir.y * spritePos.x + CAMERA.dir.x * spritePos.y);
  },
  setZ(z) {
    this.Z = z;
  },
};
var PLAYER = {
  size: 0.5,
  pos: null,
  dir: null,
  rotationResolution: 64,
  moveSpeed: 4.0, // grids/s
  initialize(start, dir) {
    PLAYER.pos = start;
    PLAYER.dir = dir;
    PLAYER.r = this.size / 2;
    CAMERA.set();
  },
  rotate(rotDirection, lapsedTime) {
    let angle = Math.round(lapsedTime / ENGINE.INI.ANIMATION_INTERVAL) * rotDirection * ((2 * Math.PI) / PLAYER.rotationResolution);
    PLAYER.dir = PLAYER.dir.rotate(angle);
    CAMERA.dir = CAMERA.dir.rotate(angle);
  },
  bumpEnemy(nextPos) {
    let checkGrids = RAYCAST.MAP.GA.gridsAroundEntity(nextPos, PLAYER.dir, PLAYER.r);
    let enemies = RAYCAST.MAP.enemyIA.unrollArray(checkGrids);
    if (enemies.size > 0) {
      for (const e of enemies) {
        if (ENEMY_RC.POOL[e - 1].base !== 1) continue;
        let EP_hit = PLAYER.circleCollision(ENEMY_RC.POOL[e - 1], nextPos);
        if (EP_hit) {
          return true;
        }
      }
    }
    return false;
  },
  move(reverse, lapsedTime) {
    let length = (lapsedTime / 1000) * PLAYER.moveSpeed;
    let dir;
    if (reverse) {
      dir = PLAYER.dir.reverse();
    } else {
      dir = PLAYER.dir;
    }
    let nextPos = PLAYER.pos.translate(dir, length);

    //check if staircase
    let bump = PLAYER.usingStaircase(nextPos);
    if (bump !== null) {
      bump.interact();
      return;
    }

    if (this.bumpEnemy(nextPos)) return;

    let check = RAYCAST.MAP.GA.entityNotInWall(nextPos, PLAYER.dir, PLAYER.r);
    if (check) {
      PLAYER.pos = nextPos;
    }
  },
  usingStaircase(nextPos, resolution = 4) {
    let currentGrid = Grid.toClass(this.pos);
    if (RAYCAST.MAP.GA.notStair(currentGrid)) return null;

    let checks = [];
    for (
      let theta = 0;
      theta < 2 * Math.PI;
      theta += (2 * Math.PI) / resolution
    ) {
      checks.push(nextPos.translate(PLAYER.dir.rotate(theta), PLAYER.r));
    }

    for (const point of checks) {
      let futureGrid = Grid.toClass(point);
      if (GRID.same(futureGrid, currentGrid)) {
        continue;
      } else {
        if (RAYCAST.MAP.GA.isWall(futureGrid) && RAYCAST.MAP.GA.isStair(futureGrid)) {
          let IA = RAYCAST.MAP.decalIA;
          let item = DECAL.POOL[IA.unroll(futureGrid)[0] - 1];
          return item;
        }
      }
    }

    return null;
  },
  strafe(rotDirection, lapsedTime) {
    let length = (lapsedTime / 1000) * PLAYER.moveSpeed;
    let dir = PLAYER.dir.rotate((rotDirection * Math.PI) / 2);
    let nextPos = PLAYER.pos.translate(dir, length);
    //check if staircase
    let bump = PLAYER.usingStaircase(nextPos);
    if (bump !== null) {
      bump.interact();
      return;
    }

    if (this.bumpEnemy(nextPos)) return;
    let check = RAYCAST.MAP.GA.entityNotInWall(nextPos, PLAYER.dir, PLAYER.r);
    if (check) {
      PLAYER.pos = nextPos;
    }
  },
  respond(lapsedTime) {
    var map = ENGINE.GAME.keymap;
    if (map[ENGINE.KEY.map.Q]) {
      PLAYER.rotate(-1, lapsedTime);
      return;
    }
    if (map[ENGINE.KEY.map.E]) {
      PLAYER.rotate(1, lapsedTime);
      return;
    }
    if (map[ENGINE.KEY.map.W]) {
      PLAYER.move(false, lapsedTime);
      return;
    }
    if (map[ENGINE.KEY.map.S]) {
      PLAYER.move(true, lapsedTime);
      return;
    }
    if (map[ENGINE.KEY.map.A]) {
      PLAYER.strafe(-1, lapsedTime);
      return;
    }
    if (map[ENGINE.KEY.map.D]) {
      PLAYER.strafe(1, lapsedTime);
      return;
    }
    if (map[ENGINE.KEY.map.LT] || map[ENGINE.KEY.map.LTC]) {
      PLAYER.dir = FP_Vector.toClass(PLAYER.dir.ortoAlign());
      CAMERA.set();
      return;
    }
  },
  circleCollision(entity, nextPos = null) {
    let distance;
    if (nextPos !== null) {
      distance = entity.moveState.pos.EuclidianDistance(nextPos);
    } else {
      distance = entity.moveState.pos.EuclidianDistance(this.pos);
    }

    let touchDistance = entity.r + this.r;
    return distance < touchDistance;
  },
  //proxy references
  hitByMissile: null
};
var RAYCAST = {
  VERSION: "1.02",
  CSS: "color: gold",
  MAP: null,
  spriteSources: [ENEMY_RC, MISSILE, DESTRUCTION_ANIMATION, FLOOR_OBJECT_WIDE, CHANGING_ANIMATION],
  decalSources: [DECAL],
  SCREEN_WIDTH: null,
  SCREEN_HEIGHT: null,
  TEX_SIZE: 64,
  INI: {
    BLOCK_SIZE: 64,
    MAX_DISTANCE: 8,
    MIN_SHADING: 1,
    OVERDRAW_FACTOR: 0.008,
    EXPLOSION_OFFWALL: 0.38,
    WALL_CLICK_DISTANCE: 1.15,
    FLOOR_CLICK_DISTANCE: 1.6,
    NO_SOUND: 8,
    NORMAL_SOUND: 2
  },
  DATA: {
    window: null,
    layer: null,
    Z_BUFFER: null,
    H_BUFFER: null,
    GRID_BUFFER: null,
    BUFFER: null
  },
  initialize(w, h, ts = 64) {
    console.log(`%cRAYCAST initialized.`, RAYCAST.CSS);
    RAYCAST.SCREEN_WIDTH = w;
    RAYCAST.SCREEN_HEIGHT = h;
    RAYCAST.OVERDRAW = Math.ceil(Math.ceil(RAYCAST.INI.OVERDRAW_FACTOR * RAYCAST.SCREEN_HEIGHT) / 2) * 2;
    RAYCAST.TEX_SIZE = ts;
  },
  setMap(map) {
    RAYCAST.MAP = map;
  },
  randomBuffer(BUFFER) {
    for (let i = 0; i < BUFFER.length; i++) {
      BUFFER[i] = RND(0, 255);
    }
    return BUFFER;
  },
  renderView(floorData, ceilingData, wallData) {
    let BUFFER = new Uint8ClampedArray(4 * RAYCAST.SCREEN_WIDTH * RAYCAST.SCREEN_HEIGHT);
    let Z_BUFFER = new Float32Array(RAYCAST.SCREEN_WIDTH);
    let H_BUFFER = new Uint32Array(RAYCAST.SCREEN_WIDTH);
    let GRID_BUFFER = new Array(RAYCAST.SCREEN_WIDTH); //to which grid x belongs
    let VISIBLE_SPRITE_LIST = [];
    let VISIBLE_DECAL_LIST = [];

    //wall casting
    for (let x = 0; x < RAYCAST.SCREEN_WIDTH; x++) {
      let cameraX = (2 * x) / (RAYCAST.SCREEN_WIDTH - 1) - 1;
      let rayDir = PLAYER.dir.add(CAMERA.dir, cameraX);
      let Map = Grid.toClass(PLAYER.pos);
      let deltaDist = new FP_Vector(Math.abs(1 / rayDir.x), Math.abs(1 / rayDir.y));
      let stepX;
      let sideDistX;
      let stepY;
      let sideDistY;

      if (rayDir.x < 0) {
        stepX = -1;
        sideDistX = (PLAYER.pos.x - Map.x) * deltaDist.x;
      } else {
        stepX = 1;
        sideDistX = (Map.x + 1.0 - PLAYER.pos.x) * deltaDist.x;
      }
      if (rayDir.y < 0) {
        stepY = -1;
        sideDistY = (PLAYER.pos.y - Map.y) * deltaDist.y;
      } else {
        stepY = 1;
        sideDistY = (Map.y - PLAYER.pos.y + 1.0) * deltaDist.y;
      }

      let perpWallDist;
      let hit = false;
      let side;
      while (!hit) {
        if (sideDistX < sideDistY) {
          sideDistX += deltaDist.x;
          Map.x += stepX;
          side = 0;
        } else {
          sideDistY += deltaDist.y;
          Map.y += stepY;
          side = 1;
        }

        if (RAYCAST.MAP.GA.check(Map, MAPDICT.WALL)) {
          hit = true;
          break;
        }

        let distance = PLAYER.pos.EuclidianDistance(Map);
        if (distance > RAYCAST.INI.MAX_DISTANCE) {
          break;
        }
      }

      if (side === 0) {
        perpWallDist = (Map.x - PLAYER.pos.x + (1 - stepX) / 2) / rayDir.x;
      } else {
        perpWallDist = (Map.y - PLAYER.pos.y + (1 - stepY) / 2) / rayDir.y;
      }

      let lineHeight = Math.ceil(RAYCAST.SCREEN_HEIGHT / perpWallDist) + RAYCAST.OVERDRAW;

      Z_BUFFER[x] = perpWallDist;
      H_BUFFER[x] = lineHeight;
      GRID_BUFFER[x] = Map;

      let drawStart = Math.max(((RAYCAST.SCREEN_HEIGHT - lineHeight) / 2) | 0, 0);
      let drawEnd = Math.min(RAYCAST.SCREEN_HEIGHT, ((RAYCAST.SCREEN_HEIGHT + lineHeight) / 2) | 0);

      if (hit) {
        let wallX;
        if (side === 0) {
          wallX = PLAYER.pos.y + perpWallDist * rayDir.y;
        } else {
          wallX = PLAYER.pos.x + perpWallDist * rayDir.x;
        }

        wallX -= wallX | 0;

        let texX = (wallX * RAYCAST.TEX_SIZE) & (RAYCAST.TEX_SIZE - 1);
        if (side === 0 && rayDir.x > 0) {
          texX = RAYCAST.TEX_SIZE - texX - 1;
        }
        if (side === 1 && rayDir.y < 0) {
          texX = RAYCAST.TEX_SIZE - texX - 1;
        }

        let step = RAYCAST.TEX_SIZE / lineHeight;
        let texPos = (drawStart + lineHeight / 2 - RAYCAST.SCREEN_HEIGHT / 2) * step;

        let tintAmount = 1.0;
        if (perpWallDist > RAYCAST.INI.MIN_SHADING) {
          tintAmount = (perpWallDist - RAYCAST.INI.MAX_DISTANCE) ** 2 / (RAYCAST.INI.MAX_DISTANCE - RAYCAST.INI.MIN_SHADING) ** 2;
        }

        for (let y = drawStart; y < drawEnd; y++) {
          let texY = texPos & (RAYCAST.TEX_SIZE - 1);
          texPos += step;
          let textureIndex = 4 * texY * RAYCAST.TEX_SIZE + 4 * texX;
          let wallColor = wallData.data.slice(textureIndex, textureIndex + 4);
          RAYCAST.tint(wallColor, tintAmount);
          if (side === 0) RAYCAST.darken(wallColor);
          let bufferIndex = 4 * x + 4 * RAYCAST.SCREEN_WIDTH * y;
          RAYCAST.pasteColor(wallColor, bufferIndex, BUFFER);
        }
      }
    }

    //floor casting
    for (let y = RAYCAST.SCREEN_HEIGHT - 1; y >= RAYCAST.SCREEN_HEIGHT / 2 + 1; y--) {
      let leftRay = PLAYER.dir.sub(CAMERA.dir);
      let rightRay = PLAYER.dir.add(CAMERA.dir);
      let p = y - RAYCAST.SCREEN_HEIGHT / 2;
      let posZ = CAMERA.Z * RAYCAST.SCREEN_HEIGHT;
      let rowDistance = posZ / p;

      if (rowDistance > RAYCAST.INI.MAX_DISTANCE) break;

      let tintAmount = 1.0;
      if (rowDistance > RAYCAST.INI.MIN_SHADING) {
        tintAmount = (rowDistance - RAYCAST.INI.MAX_DISTANCE) ** 2 / (RAYCAST.INI.MAX_DISTANCE - RAYCAST.INI.MIN_SHADING) ** 2;
      }

      let floorStep = new FP_Vector(
        (rowDistance * (rightRay.x - leftRay.x)) / RAYCAST.SCREEN_WIDTH,
        (rowDistance * (rightRay.y - leftRay.y)) / RAYCAST.SCREEN_WIDTH
      );
      let floorPos = PLAYER.pos.translate(leftRay, rowDistance);

      for (let x = 0; x < RAYCAST.SCREEN_WIDTH; x++) {
        let Cell = Grid.toClass(floorPos);

        if (RAYCAST.MAP.GA.check(Cell, MAPDICT.WALL) || rowDistance > Z_BUFFER[x]) {
          floorPos = floorPos.translate(floorStep);
          continue;
        }

        let spritesInCell = RAYCAST.checkSprite(Cell);
        if (spritesInCell.length > 0) {
          VISIBLE_SPRITE_LIST = VISIBLE_SPRITE_LIST.concat(spritesInCell);
        }

        let decalsInCell = RAYCAST.checkDecal(Cell);
        if (decalsInCell.length > 0) {
          VISIBLE_DECAL_LIST = VISIBLE_DECAL_LIST.concat(decalsInCell);
        }

        let tx = (RAYCAST.TEX_SIZE * (floorPos.x - Cell.x)) & (RAYCAST.TEX_SIZE - 1);
        let ty = (RAYCAST.TEX_SIZE * (floorPos.y - Cell.y)) & (RAYCAST.TEX_SIZE - 1);
        let textureIndex = 4 * ty * RAYCAST.TEX_SIZE + 4 * tx;
        let floorColor = floorData.data.slice(textureIndex, textureIndex + 4);
        let ceilingColor = ceilingData.data.slice(textureIndex, textureIndex + 4);

        RAYCAST.tint(floorColor, tintAmount);
        RAYCAST.tint(ceilingColor, tintAmount);
        let bufferIndex = 4 * x + 4 * RAYCAST.SCREEN_WIDTH * y;
        RAYCAST.pasteColor(floorColor, bufferIndex, BUFFER);
        bufferIndex = 4 * x + 4 * RAYCAST.SCREEN_WIDTH * (RAYCAST.SCREEN_HEIGHT - y - 1);
        RAYCAST.pasteColor(ceilingColor, bufferIndex, BUFFER);
        floorPos = floorPos.translate(floorStep);
      }
    }

    let additionalCellsToCheck = [
      Grid.toClass(PLAYER.pos),
      Grid.toClass(PLAYER.pos.add(PLAYER.dir.rotate(Math.PI / 2))),
      Grid.toClass(PLAYER.pos.add(PLAYER.dir.rotate(-Math.PI / 2))),
      Grid.toClass(PLAYER.pos.add(PLAYER.dir.ortoAlign().rotate(Math.PI / 2))),
      Grid.toClass(PLAYER.pos.add(PLAYER.dir.ortoAlign().rotate(-Math.PI / 2)))
    ];

    for (const cell of additionalCellsToCheck) {
      let playerPosCell = RAYCAST.checkSprite(cell);
      if (playerPosCell.length > 0) {
        VISIBLE_SPRITE_LIST = VISIBLE_SPRITE_LIST.concat(playerPosCell);
      }
    }
    VISIBLE_SPRITE_LIST = VISIBLE_SPRITE_LIST.unique();

    for (const cell of additionalCellsToCheck) {
      let playerPosCell = RAYCAST.checkDecal(cell);
      if (playerPosCell.length > 0) {
        VISIBLE_DECAL_LIST = VISIBLE_DECAL_LIST.concat(playerPosCell);
      }
    }
    VISIBLE_DECAL_LIST = VISIBLE_DECAL_LIST.unique();

    //expose
    RAYCAST.DATA.Z_BUFFER = Z_BUFFER;
    RAYCAST.DATA.H_BUFFER = H_BUFFER;
    RAYCAST.DATA.GRID_BUFFER = GRID_BUFFER;
    RAYCAST.DATA.BUFFER = BUFFER;
    //

    //decal casting
    if (VISIBLE_DECAL_LIST.length > 0) {
      for (const decal of VISIBLE_DECAL_LIST) {
        RAYCAST.drawDecal(decal);
      }
    }

    //sprite casting
    if (VISIBLE_SPRITE_LIST.length > 0) {
      let sortedSprites = new NodeQ("distance");
      for (const sprite of VISIBLE_SPRITE_LIST) {
        sprite.distance = sprite.moveState.pos.EuclidianDistance(PLAYER.pos);
        sprite.hide();
        sprite.vectorToPlayer = sprite.moveState.pos.direction(PLAYER.pos);
        sprite.actor.face(sprite.vectorToPlayer);
        sortedSprites.queueSimple(sprite);
      }

      //draw sorted
      while (sortedSprites.size() > 0) {
        const sprite = sortedSprites.destack();
        if (sprite.actor.flat) {
          RAYCAST.drawFlatSprite(sprite);
        } else {
          RAYCAST.drawSprite(sprite);
        }
      }
    }

    const imageData = new ImageData(
      RAYCAST.DATA.BUFFER,
      RAYCAST.SCREEN_WIDTH,
      RAYCAST.SCREEN_HEIGHT
    );

    return imageData;
  },
  checkSprite(grid) {
    let spritesInCell = [];
    for (const source of RAYCAST.spriteSources) {
      let IA = RAYCAST.MAP[source.IA];
      if (IA === undefined) continue;
      if (IA.empty(grid)) continue;
      let items = IA.unroll(grid);
      for (let i of items) {
        let instance = source.POOL[i - 1];
        if (instance === null) continue;
        if (!instance.visible) {
          spritesInCell.push(instance);
          instance.show();
        }
      }
      IA.clear(grid);
    }
    return spritesInCell;
  },
  checkDecal(grid) {
    let decalsInCell = [];
    for (const source of RAYCAST.decalSources) {
      let IA = RAYCAST.MAP[source.IA];
      if (IA === undefined) continue;
      if (IA.empty(grid)) continue;
      let items = IA.unroll(grid);
      for (let i of items) {
        let instance = source.POOL[i - 1];
        if (instance === null) continue;
        if (!instance.visible) {
          if (!DECAL.playerBehindPlane(instance)) {
            decalsInCell.push(instance);
            instance.show();
          }
        }
      }
    }
    return decalsInCell;
  },
  drawSprite(sprite) {
    let spriteRel = sprite.moveState.pos.sub(PLAYER.pos);
    CAMERA.transform(spriteRel);
    let spriteScreenX = Math.floor((RAYCAST.SCREEN_WIDTH / 2) * (1 + CAMERA.transformX / CAMERA.transformDepth));
    let imageData = sprite.actor.getImageData();
    let vScale = imageData.height / RAYCAST.INI.BLOCK_SIZE;
    let wScale = imageData.width / RAYCAST.INI.BLOCK_SIZE;
    let verticalMove = Math.floor((sprite.base * (0.5 * (RAYCAST.INI.BLOCK_SIZE + imageData.height))) / vScale / CAMERA.transformDepth);
    let spriteHeight = Math.abs(((RAYCAST.SCREEN_HEIGHT / CAMERA.transformDepth) * vScale) | 0);
    let drawStartY_abs = Math.floor(-spriteHeight / 2 + RAYCAST.SCREEN_HEIGHT / 2 + verticalMove);
    let drawStartY = Math.max(drawStartY_abs, 0);

    if (drawStartY_abs >= RAYCAST.SCREEN_HEIGHT) {
      return;
    }

    let drawEndY = (spriteHeight / 2 + RAYCAST.SCREEN_HEIGHT / 2 + verticalMove) | 0;
    drawEndY = Math.min(drawEndY, RAYCAST.SCREEN_HEIGHT - 1);

    if (drawEndY < 0) {
      return;
    }

    let spriteWidth = Math.round((RAYCAST.SCREEN_HEIGHT / CAMERA.transformDepth) * wScale);
    let drawStartX_abs = Math.floor(-spriteWidth / 2 + spriteScreenX);
    let drawStartX = Math.max(drawStartX_abs, 0);

    if (drawStartX >= RAYCAST.SCREEN_WIDTH) {
      return;
    }

    let drawEndX = Math.floor(spriteWidth / 2 + spriteScreenX);
    drawEndX = Math.min(drawEndX, RAYCAST.SCREEN_WIDTH - 1);

    if (drawEndX < 0) {
      return;
    }

    for (let stripe = drawStartX; stripe < drawEndX && stripe < RAYCAST.SCREEN_WIDTH; stripe++) {
      if (CAMERA.transformDepth < RAYCAST.DATA.Z_BUFFER[stripe]) {
        let texX = (((stripe - drawStartX_abs) * imageData.width) / spriteWidth) >>> 0;
        for (let y = drawStartY; y < drawEndY && y < RAYCAST.SCREEN_HEIGHT; y++) {
          let deltaY = (y - verticalMove - RAYCAST.SCREEN_HEIGHT / 2 + spriteHeight / 2) >>> 0;
          let texY = ((deltaY * imageData.height) / spriteHeight) >>> 0;
          let textureIndex = 4 * texY * imageData.width + 4 * texX;
          let spriteColor = imageData.data.slice(textureIndex, textureIndex + 4);
          if (spriteColor[3] > 0) {
            let tintAmount = 1.0;
            if (sprite.distance > RAYCAST.INI.MIN_SHADING) {
              tintAmount = (sprite.distance - RAYCAST.INI.MAX_DISTANCE) ** 2 / (RAYCAST.INI.MAX_DISTANCE - RAYCAST.INI.MIN_SHADING) ** 2;
            }
            let bufferIndex = 4 * stripe + 4 * RAYCAST.SCREEN_WIDTH * y;
            RAYCAST.tint(spriteColor, tintAmount);
            RAYCAST.pasteColor(spriteColor, bufferIndex, RAYCAST.DATA.BUFFER);
          }
        }
      }
    }
  },
  drawDecal(decal) {
    decal.distance = decal.drawPosition.EuclidianDistance(PLAYER.pos);
    decal.hide();
    let imageData = decal.getImageData();
    let vScale = imageData.height / RAYCAST.INI.BLOCK_SIZE / 2;
    let leftRel = decal.leftDraw.sub(PLAYER.pos);
    CAMERA.transform(leftRel);
    let drawStartX_abs = Math.floor((RAYCAST.SCREEN_WIDTH / 2) * (1 + CAMERA.transformX / CAMERA.transformDepth));
    let drawStartX = Math.max(drawStartX_abs, 0);
    if (drawStartX >= RAYCAST.SCREEN_WIDTH) {
      return;
    }

    let rightRel = decal.rightDraw.sub(PLAYER.pos);
    CAMERA.transform(rightRel);
    let drawEndX_abs = Math.floor((RAYCAST.SCREEN_WIDTH / 2) * (1 + CAMERA.transformX / CAMERA.transformDepth));
    let drawEndX = Math.min(drawEndX_abs, RAYCAST.SCREEN_WIDTH - 1);
    if (drawEndX < 0) {
      return;
    }

    let decalRel = decal.drawPosition.sub(PLAYER.pos);
    CAMERA.transform(decalRel);

    let verticalMove = Math.floor((RAYCAST.INI.BLOCK_SIZE * (decal.facePosition.y - 0.5)) / vScale / CAMERA.transformDepth);

    for (let stripe = drawStartX; stripe < drawEndX; stripe++) {
      let closeGrid = RAYCAST.DATA.GRID_BUFFER[stripe];
      if (!closeGrid.same(decal.grid)) {
        continue;
      }

      let texX = (((stripe - drawStartX_abs) / (drawEndX_abs - drawStartX_abs)) * imageData.width) | 0;
      let decalHeight = Math.round((RAYCAST.SCREEN_HEIGHT / RAYCAST.DATA.Z_BUFFER[stripe]) * vScale);
      let drawStartY_abs = Math.floor(-decalHeight / 2 + RAYCAST.SCREEN_HEIGHT / 2 + verticalMove);
      let drawStartY = Math.max(drawStartY_abs, 0);
      if (drawStartY_abs >= RAYCAST.SCREEN_HEIGHT) {
        continue;
      }

      let drawEndY = Math.floor(decalHeight / 2 + RAYCAST.SCREEN_HEIGHT / 2 + verticalMove);
      drawEndY = Math.min(drawEndY, RAYCAST.SCREEN_HEIGHT - 1);
      if (drawEndY < 0) {
        continue;
      }

      for (let y = drawStartY; y < drawEndY; y++) {
        let deltaY = (y - verticalMove - RAYCAST.SCREEN_HEIGHT / 2 + decalHeight / 2) >>> 0;
        let texY = ((deltaY * imageData.height) / decalHeight) >>> 0;
        let textureIndex = 4 * texY * imageData.width + 4 * texX;
        let decalColor = imageData.data.slice(textureIndex, textureIndex + 4);

        if (decalColor[3] > 0) {
          let bufferIndex = 4 * stripe + 4 * RAYCAST.SCREEN_WIDTH * y;
          let tintAmount = 1.0;
          if (decal.distance > RAYCAST.INI.MIN_SHADING) {
            tintAmount = (decal.distance - RAYCAST.INI.MAX_DISTANCE) ** 2 / (RAYCAST.INI.MAX_DISTANCE - RAYCAST.INI.MIN_SHADING) ** 2;
          }
          RAYCAST.tint(decalColor, tintAmount);
          RAYCAST.pasteColor(decalColor, bufferIndex, RAYCAST.DATA.BUFFER);
        }
      }
    }
  },
  drawFlatSprite(decal) {
    let initialGrid = FP_Grid.toClass(Grid.toClass(decal.moveState.pos));
    let dim = null;
    for (let d of ["x", "y"]) {
      if (decal.moveState.pos[d] - (decal.moveState.pos[d] | 0) > 0) {
        dim = d;
        break;
      }
    }

    let sign = 1;
    if (decal.facingDir.x === 1) {
      sign = -1;
      initialGrid.y += 1;
    } else if (decal.facingDir.y === -1) {
      sign = -1;
      initialGrid.x += 1;
    }
    let X_reference = initialGrid[dim];
    decal.distance = decal.drawPosition.EuclidianDistance(PLAYER.pos);
    decal.hide();

    let imageData = decal.getImageData();
    let vScale = imageData.height / RAYCAST.INI.BLOCK_SIZE / 2;

    let leftRel = decal.leftDraw.sub(PLAYER.pos);
    CAMERA.transform(leftRel);
    let drawStartX_abs = Math.floor((RAYCAST.SCREEN_WIDTH / 2) * (1 + CAMERA.transformX / CAMERA.transformDepth));
    let drawStartX = Math.max(drawStartX_abs, 0);
    if (drawStartX >= RAYCAST.SCREEN_WIDTH) {
      return;
    }

    let rightRel = decal.rightDraw.sub(PLAYER.pos);
    CAMERA.transform(rightRel);
    let drawEndX_abs = Math.floor((RAYCAST.SCREEN_WIDTH / 2) * (1 + CAMERA.transformX / CAMERA.transformDepth));
    let drawEndX = Math.min(drawEndX_abs, RAYCAST.SCREEN_WIDTH - 1);
    if (drawEndX < 0) {
      return;
    }

    for (let stripe = drawStartX; stripe < drawEndX; stripe++) {
      let offset = (stripe - drawStartX_abs) / (drawEndX_abs - drawStartX_abs);
      let texX = (offset * imageData.width) | 0;
      initialGrid[dim] = X_reference + offset * sign;
      let xRel = initialGrid.sub(PLAYER.pos);
      CAMERA.transform(xRel);

      let verticalMove = Math.floor((RAYCAST.INI.BLOCK_SIZE * (decal.facePosition.y - 0.5)) / vScale / CAMERA.transformDepth);
      let decalHeight = Math.round((RAYCAST.SCREEN_HEIGHT / CAMERA.transformDepth) * vScale);
      let drawStartY_abs = Math.floor(-decalHeight / 2 + RAYCAST.SCREEN_HEIGHT / 2 + verticalMove);
      let drawStartY = Math.max(drawStartY_abs, 0);
      if (drawStartY_abs >= RAYCAST.SCREEN_HEIGHT) {
        continue;
      }

      let drawEndY = Math.floor(decalHeight / 2 + RAYCAST.SCREEN_HEIGHT / 2 + verticalMove);
      drawEndY = Math.min(drawEndY, RAYCAST.SCREEN_HEIGHT - 1);
      if (drawEndY < 0) {
        continue;
      }

      for (let y = drawStartY; y < drawEndY; y++) {
        let deltaY = (y - verticalMove - RAYCAST.SCREEN_HEIGHT / 2 + decalHeight / 2) >>> 0;
        let texY = ((deltaY * imageData.height) / decalHeight) >>> 0;
        let textureIndex = 4 * texY * imageData.width + 4 * texX;
        let decalColor = imageData.data.slice(textureIndex, textureIndex + 4);
        if (decalColor[3] > 0) {
          let bufferIndex = 4 * stripe + 4 * RAYCAST.SCREEN_WIDTH * y;
          let tintAmount = 1.0;
          if (decal.distance > RAYCAST.INI.MIN_SHADING) {
            tintAmount = (decal.distance - RAYCAST.INI.MAX_DISTANCE) ** 2 / (RAYCAST.INI.MAX_DISTANCE - RAYCAST.INI.MIN_SHADING) ** 2;
          }
          RAYCAST.tint(decalColor, tintAmount);
          RAYCAST.pasteColor(decalColor, bufferIndex, RAYCAST.DATA.BUFFER);
        }
      }
    }
  },
  pasteColor(color, index, buffer) {
    for (let i = 0; i < 4; i++) {
      buffer[index + i] = color[i];
    }
  },
  darken(color, amt = 1) {
    for (let i = 0; i < 3; i++) {
      color[i] = color[i] >>> amt;
    }
  },
  tint(color, amt = 1.0) {
    for (let i = 0; i < 3; i++) {
      color[i] = color[i] * amt;
    }
  },
  volume(distance) {
    let ratio = (RAYCAST.INI.NO_SOUND - RAYCAST.INI.NORMAL_SOUND - (distance - RAYCAST.INI.NORMAL_SOUND)) / (RAYCAST.INI.NO_SOUND - RAYCAST.INI.NORMAL_SOUND);
    ratio = Math.min(Math.max(0, ratio), 1);
    return ratio;
  }
};
var RAY_MOUSE = {
  floorSources: [FLOOR_OBJECT_WIDE],
  wallSources: [DECAL],
  initialize(id) {
    RAYCAST.DATA.window = id;
    RAYCAST.DATA.layer = ENGINE.getCanvasName(id);
    ENGINE.topCanvas = RAYCAST.DATA.layer;
    $(RAYCAST.DATA.layer).on(
      "mousemove",
      { layer: RAYCAST.DATA.layer },
      ENGINE.readMouse
    );
  },
  click() {
    if (ENGINE.mouseOverId(RAYCAST.DATA.window)) {
      if (ENGINE.mouseClickId(RAYCAST.DATA.window)) {
        let distance = RAYCAST.DATA.Z_BUFFER[ENGINE.mouseX];
        let height = RAYCAST.DATA.H_BUFFER[ENGINE.mouseX];
        let WallStart = Math.floor((RAYCAST.SCREEN_HEIGHT - height) / 2);
        let WallEnd = Math.ceil(RAYCAST.SCREEN_HEIGHT - WallStart);
        let surface;
        if (ENGINE.mouseY < WallStart) {
          surface = "ceiling";
        } else if (ENGINE.mouseY > WallEnd) {
          surface = "floor";
        } else {
          surface = "wall";
        }

        let rowDistance;
        switch (surface) {
          case "wall":
            if (distance <= RAYCAST.INI.WALL_CLICK_DISTANCE) {
              let ratio = (ENGINE.mouseY - WallStart) / (WallEnd - WallStart);
              let blockHeight = RAYCAST.INI.BLOCK_SIZE - ((RAYCAST.INI.BLOCK_SIZE * ratio) >>> 0);
              return {
                surface: surface,
                blockHeight: blockHeight,
                position: RAYCAST.DATA.GRID_BUFFER[ENGINE.mouseX]
              };
            } else return null;
            break;
          case "ceiling":
            rowDistance = (CAMERA.Z * RAYCAST.SCREEN_HEIGHT) / (RAYCAST.SCREEN_HEIGHT / 2 - ENGINE.mouseY);
            break;
          case "floor":
            rowDistance = (CAMERA.Z * RAYCAST.SCREEN_HEIGHT) / (ENGINE.mouseY - RAYCAST.SCREEN_HEIGHT / 2);
            break;
        }
        if (rowDistance <= RAYCAST.INI.FLOOR_CLICK_DISTANCE) {
          let position = PLAYER.pos.translate(PLAYER.dir, rowDistance);
          let sideDistance = (ENGINE.mouseX - RAYCAST.SCREEN_WIDTH / 2) / (RAYCAST.SCREEN_WIDTH / 2);
          position = position.translate(CAMERA.dir, sideDistance * rowDistance);
          return {
            surface: surface,
            distance: rowDistance,
            position: position
          };
        }
      }
    }
    return null;
  },
  checkFloor(grid) {
    let objects = [];
    let intGrid = Grid.toClass(grid);
    for (const source of RAY_MOUSE.floorSources) {
      let IA = RAYCAST.MAP[source.IA];
      if (IA.empty(intGrid)) continue;
      let items = IA.unroll(intGrid);
      for (let i of items) {
        let instance = source.POOL[i - 1];
        if (instance === null) continue;
        objects.push(instance);
      }
    }
    return objects;
  },
  checkWall(grid) {
    let objects = [];
    let intGrid = Grid.toClass(grid);
    for (const source of RAY_MOUSE.wallSources) {
      let IA = RAYCAST.MAP[source.IA];
      if (IA.empty(intGrid)) continue;
      let items = IA.unroll(intGrid);
      for (let i of items) {
        let instance = source.POOL[i - 1];
        if (instance === null) continue;
        if (!instance.interactive) continue; //should stay!!
        objects.push(instance);
      }
    }
    return objects;
  }
};
//END
console.log(`%cRAYCAST ${RAYCAST.VERSION} loaded.`, RAYCAST.CSS);