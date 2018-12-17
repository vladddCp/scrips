var roomBuilder = {
    /** @param {Room} room **/
    
    run: function(room) {
        if (Game.spawns['Spawn1']) {
			creep.memory.harvesting = false;
			creep.say('🔄 harvest');
        }
    }
};

module.exports = roomBuilder;