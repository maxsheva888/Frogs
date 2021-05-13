import { OptionsForReproduce } from './options.js';
import { helpers } from './helpers.js';

export class Inhabitan {
    
    type = 'Inhabitan';    
    moveAction = 'move';

    constructor (_o) {        
        this.gender = _o.gender;
        this.name = _o.name;
    }
    
    move(pos){
        return this[this.moveAction](pos);
    }
    
    reproduce(Father = false) {

        let canReproduce = true;

        if( this.gender != OptionsForReproduce[this.type].gender)canReproduce = false;
        if( OptionsForReproduce[this.type].needFather ) {
            if( ! Father ){
                canReproduce = false;
                helpers.addInfo(`${this.type} ${this.name} need a father`);
            } else {
                if( ! helpers.isClose(this.position,Father.position) ){
                    canReproduce = false;
                    helpers.addInfo(`${this.type} ${this.name} & ${Father.type} ${Father.name} are very far`);
                }
            }
        }
        

        return canReproduce;
    }

    set position(pos) {
        this.currentPosisiton = pos;
    }

    get position() {
        return this.currentPosisiton;
    }
}
