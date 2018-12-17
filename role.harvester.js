var existingNodes = require('existingNodes');
var roleBuilder = {

	/** @param {Creep} creep **/
	run: function (creep) {

		if (creep.memory.harvesting && creep.carry.energy == 0) {
			creep.memory.harvesting = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
			creep.memory.harvesting = true;
			creep.say('🚧 build');
		}

		if (creep.carry.energy < creep.carryCapacity) {
			var sources = existingNodes.getInstance(creep);
			console.log("1 : " + sources[0] + "2 : " + sources[1]);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
				console.log("sap.")
			}
		}
		else {
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
						structure.energy < structure.energyCapacity;
				}
			});
			if (targets.length > 0) {
				if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
				}
			}
		}
	}
};

module.exports = roleBuilder;