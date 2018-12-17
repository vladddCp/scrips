var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
//CREEP FIND

var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
var totalCreeps  = _.filter(Game.creeps);

//CREEP SPAWN
if(harvesters.length < 2) {
    var newName = spawnSmallCreep("harvester");        
}

if(builders.length < 2 && harvesters.length >= 2) {
    var newName = spawnSmallCreep("builder");        
}

if(upgraders.length < 2 && harvesters.length >= 2) {
    var newName = spawnSmallCreep("upgrader");        
}

if(totalCreeps.length >= 6 && harvesters.length < 5){
    var newName = spawnMediumCreep("harvester");
}

if(totalCreeps.length >= 6 && builders.length < 5){
    var newName = spawnMediumCreep("harvester");
}

if(totalCreeps.length >= 6 && upgraders.length < 5){
    var newName = spawnMediumCreep("harvester");
}

if(Game.spawns['Spawn1'].spawning) { 
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        Game.spawns['Spawn1'].pos.x + 1, 
        Game.spawns['Spawn1'].pos.y, 
        {align: 'left', opacity: 0.8});
}

//CREEPS TASK
    for(var name in Game.creeps) {
        runCreeps(name);
    }

    //TOWER 
    var tower = Game.getObjectById('38a0ee36ff830224b5afcd46');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    //CLEAR MEMORY
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

}

function runCreeps(name) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
    }
    if (creep.memory.role == 'builder') {
        roleBuilder.run(creep);
    }
}


function spawnSmallCreep(role) {
    var newName = role + Game.time;
    console.log('Spawning new builder: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: role } });
    return newName;
}

function spawnMediumCreep(role) {
    var newName = role + Game.time;
    console.log('Spawning new builder: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: role } });
    return newName;
}