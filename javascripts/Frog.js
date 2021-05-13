import { Inhabitan } from './Inhabitan.js';
import { Gender, OptionsForReproduce, Directions, Characteristics } from './options.js';
import { helpers } from './helpers.js';

export class Frog extends Inhabitan {


    constructor(_o) {
        super(_o);

        this.height = _o.height!= undefined? _o.height : Characteristics.height[Math.round(Math.random())];
        this.weight = _o.weight!= undefined? _o.weight : Characteristics.weight[Math.round(Math.random())];

        super.moveAction = 'jump';        
        super.type = 'Frog';

    }

    getClasses() {
        return `frog ${this.gender.toLowerCase()}`;
    }

    jump(pos) {

        let length = 3;
        if(this.gender == Gender.female) length -=1; 
        if(this.weight == 'fat') length -=1;  

        let directions = this.getDirections(pos, length);
        
        return {
            length : length, 
            position: pos,
            direction : directions[ Math.floor(Math.random() * directions.length) ] 
        };
    }
    
    reproduce(Father = false) {
        if(!super.reproduce(Father)) return false;

        let childCharacteristics = {
                height : [],
                weight : []
            };

        if( OptionsForReproduce[this.type].needFather && Father ){
            childCharacteristics.height.push(Father.height);
            childCharacteristics.weight.push(Father.weight);
        }
        
        childCharacteristics.height.push(this.height);
        childCharacteristics.weight.push(this.weight);
        
        return new Frog( { 
                gender : helpers.randomProperty(Gender), 
                name : `ch {${this.name}${Father?' & ' + Father.name:''}}`,
                height : childCharacteristics.height[Math.round(Math.random())],
                weight : childCharacteristics.weight[Math.round(Math.random())]
            } );
    }

    getDirections(pos, L){
        let result = [];
        if( (pos.y - L) > 0)
            result.push(Directions.north);
        if( (pos.x + L) < 9)
            result.push(Directions.east);
        if( (pos.y + L) < 5)
            result.push(Directions.south);
        if( (pos.x - L) > 0)
            result.push(Directions.west);

        if( (pos.x + L) < 9 &&  (pos.y - L) > 0)
            result.push(Directions.northEast);
        if( (pos.x - L) > 0 &&  (pos.y - L) > 0)
            result.push(Directions.northWest);
        if( (pos.x + L) < 9 &&  (pos.y + L) < 5)
            result.push(Directions.southEast);
        if( (pos.x - L) > 0 &&  (pos.y + L) < 5)
            result.push(Directions.southWest);

        return result;
    } 

}

