var memoryUtils = require('memory_utils');
var utils = require('utils');

function tryMassAttack(creep) {
  if (!creep.getActiveBodyparts(RANGED_ATTACK)) {
    return ERR_NO_BODYPART;
  }

  var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
  if(targets.length >= 2) {
    return creep.rangedMassAttack();
  }
}

module.exports = function (creep) {
  if (memoryUtils.isEnemyInRoom) {
    tryMassAttack(creep);

    var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
      filter: enemy => enemy.owner.username !== 'Source Keeper'
    });

    if(target) {
      if(creep.attack(target) == ERR_NOT_IN_RANGE) {
        if (creep.moveTo(target) !== OK) {
          creep.rangedAttack(target);
        }
      }
    }

    return;
  }

  const avgGuardLoc = memoryUtils.getAvgGuardPosition();
  if (avgGuardLoc) {
    const position = new RoomPosition(avgGuardLoc.x, avgGuardLoc.y, creep.room.name);
    creep.moveTo(position);
  }
};
