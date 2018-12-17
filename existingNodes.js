var existingNodes = (function (creep) {
    var instance; 

    /** @param {Creep} creep **/
    function loadSpawns(creep) {
        var spawnX = Game.spawns['Spawn1'].pos.x;
        var spawnY = Game.spawns['Spawn1'].pos.y;

        var sourcesInRoom = creep.room.find(FIND_SOURCES);
        var myMap = new Map();

        for (i = 0; i < sourcesInRoom.length; ++i) {
            var energySource = sourcesInRoom[i];
            var xBase = spawnX - energySource.pos.x;
            var yBase = spawnY - energySource.pos.y;
            var d = Math.sqrt((xBase * xBase) + (yBase * yBase));
            myMap.set(d, energySource);
        }
            
        return Array.from(myMap.values());
    }
 
    return {
        getInstance: function (creep) {
            if (!instance) {
                instance = loadSpawns(creep);
            }
            return instance;
        }
    };
})();
 
module.exports = existingNodes;
