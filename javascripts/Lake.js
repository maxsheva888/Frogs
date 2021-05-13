import { helpers } from './helpers.js'

export class Lake {
 
    #fields = null;
    InhabitanCount = 0;

    constructor(Inhabitans) { 
        this.#fields = this.buidMap();

        Inhabitans.map( inhabitan => {
            this.addInhabitan('0_0', inhabitan); 
            helpers.addInhabitan(inhabitan);
        });

        this.drawInhabitans();
    }

    buidMap(){
        let _fields = [];
        document.querySelectorAll('#lake tbody td').forEach((element, key) => {
            if( _fields[Math.floor((key) / 10)] == undefined )
                _fields.push([]);
            element.dataset.id = Math.floor((key) / 10) + '_' +  ((key % 10) + 1);
            _fields[Math.floor((key) / 10)].push({ field: element, type : null});                 
        });
        return _fields;
    }
 
    moveInhabitan(inhabitan, curent_pos){
        
        let payload = inhabitan.move(curent_pos);
 
        switch (payload.direction) {
            case 'north':  
                payload.newPosition = { y : payload.position.y - payload.length, x : payload.position.x }; 
                break;
            case 'northEast':   
                payload.newPosition = { y : payload.position.y - payload.length, x : payload.position.x + payload.length }; 
                break;
            case 'east':  
                payload.newPosition = { y : payload.position.y, x : payload.position.x + payload.length }; 
                break;
            case 'southEast':  
                payload.newPosition = { y : payload.position.y + payload.length, x : payload.position.x + payload.length }; 
                break;
            case 'south':   
                payload.newPosition = { y : payload.position.y + payload.length, x : payload.position.x }; 
                break;
            case 'southWest': 
                payload.newPosition = { y : payload.position.y + payload.length, x : payload.position.x - payload.length}; 
                break;
            case 'west':
                payload.newPosition = { y : payload.position.y, x : payload.position.x - payload.length}; 
                break;
            case 'northWest':   
                payload.newPosition = { y : payload.position.y - payload.length, x : payload.position.x - payload.length }; 
                break; 
        } 
        this.addInhabitan(payload.newPosition, inhabitan);
        this.getField(payload.position).type = null;
        helpers.addInfo(`${inhabitan.type} ${inhabitan.name} ${inhabitan.moveAction} to ${payload.direction} [${inhabitan.position.y}|${inhabitan.position.x}]`);

    }

    addInhabitan(pos, inhabitan) {
        if( this.getField(pos).type !== null){              
            pos = this.findFirstFreeField(this.getPos(pos));
            if(pos !== false){
                this.getField(pos).type = inhabitan;
            } else return false;
        } else {
            this.getField(pos).type = inhabitan;
        }
        inhabitan.position = pos;

        return true;
    }

    drawInhabitans() { 
        this.InhabitanCount = 0;
        for(let Y in this.#fields){
            for(let X in this.#fields[Y]){
                if(this.#fields[Y][X].type != null){
                    this.#fields[Y][X].field.firstElementChild.className = this.#fields[Y][X].type.getClasses();
                    this.InhabitanCount++;
                } else {
                    this.#fields[Y][X].field.firstElementChild.className = "";
                }
            }
        }
    }

    getField(pos){
        let obj = this.getPos(pos);
        if(this.#fields[obj.y][obj.x] == undefined)
            return {type:false};
        return this.#fields[obj.y][obj.x];
    }

    findFirstFreeField(pos) {
        
        if( pos.x - 1 >= 0 && this.getField({y : pos.y, x : pos.x - 1 }).type == null )
            return {y : pos.y, x : pos.x - 1 }        
        if( pos.x + 1 <= 9 && this.getField({y : pos.y, x : pos.x + 1 }).type == null )
            return {y : pos.y, x : pos.x + 1 }
        if( pos.y - 1 >= 0 && this.getField({y : pos.y - 1, x : pos.x }).type == null )
            return {y : pos.y - 1, x : pos.x }
        if( pos.y + 1 <= 9 && this.getField({y : pos.y + 1, x : pos.x }).type == null )
            return {y : pos.y + 1, x : pos.x }

        if( (pos.y - 1 >= 0 && pos.x - 1 >= 0) &&  this.getField({y : pos.y - 1, x : pos.x  - 1}).type == null )
            return {y : pos.y - 1, x : pos.x - 1}
        if( (pos.y - 1 >= 0 && pos.x + 1 <= 9) &&  this.getField({y : pos.y - 1, x : pos.x  + 1}).type == null )
            return {y : pos.y - 1, x : pos.x + 1}
        if( (pos.y + 1 <= 9 && pos.x - 1 >= 0) &&  this.getField({y : pos.y + 1, x : pos.x  - 1}).type == null )
            return {y : pos.y + 1, x : pos.x - 1}
        if( (pos.y + 1 <= 9 && pos.x + 1 <= 9) &&  this.getField({y : pos.y + 1, x : pos.x  + 1}).type == null )
            return {y : pos.y + 1, x : pos.x + 1}
        
        return false;

    }

    getAllInhabitans(field = false) {
        let inhabitans = [];
        for(let Y in this.#fields){
            for(let X in this.#fields[Y]){
                if(this.#fields[Y][X].type != null){
                    if(field)
                        inhabitans.push({ pos: { y : +Y, x : +X }, inhabitan: this.#fields[Y][X] });
                    else 
                        inhabitans.push({ pos: { y : +Y, x : +X }, inhabitan: this.#fields[Y][X].type});
                }
            }
        }
        return inhabitans;

    }

    getPos(pos) {
        
        let obj = [0,0];
        if(typeof pos == 'string'){
            obj = pos.split('_');
            obj[1] -=1;
        } else {
            obj[0] = pos.y;
            obj[1] = pos.x;
        }
        return { y : +obj[0], x : obj[1]}
    }

    clearChecks() {
        for(let Y in this.#fields){
            for(let X in this.#fields[Y]){
                if( this.#fields[Y][X].field.firstElementChild.firstElementChild.checked )
                    this.#fields[Y][X].field.firstElementChild.firstElementChild.checked = false;
            }
        }
    }

}