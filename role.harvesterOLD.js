var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep){ 
        var firstNode;
        var secondNode;

        //FARM NEAREST NODE
        if (creep.carry.energy < creep.carryCapacity) {
            var myMap = findClosest2Nodes(creep);
            nodes = Array.from(myMap.values());
            
            if(firstNode == null){
            firstNode = nodes[0];
            }
            
            if(secondNode == null){
            secondNode = nodes[1];
            }
        
            if(creep.harvest(firstNode)) {
                console.log(firstNode.pos.x + "   " + firstNode.pos.y);
                creep.moveTo(firstNode, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else if(Game.spawns['Spawn1'].energy < 300)
        {
            if(creep.build(Game.spawns['Spawn1']== ERR_NOT_IN_RANGE)) {
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            creep.build(Game.spawns['Spawn1']);
            console.log("wtf")
        }
        else {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }  
        }
	}
};

module.exports = roleHarvester;

function findClosest2Nodes(creep) {
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
    return myMap;
}
