import { Lake } from './Lake.js';
import { Frog } from './Frog.js';
import { Gender, OptionsForReproduce } from './options.js'
import { helpers } from './helpers.js';

 
const _lake = new Lake([
    new Frog( { gender : Gender.male, name : '1st' } ),
    new Frog( { gender : Gender.female, name : '2nd' } )
]);
 

/**
 * Actions Button
 */
let jumnBtn = document.getElementById('jump');
let reproduceBtn = document.getElementById('reproduce');

/**
 * Events declarate
 */
jumnBtn.addEventListener('click', move);
reproduceBtn.addEventListener('click', reproduce);


/**
 * Event functions
 */

function move() {

    let allInhabitans = _lake.getAllInhabitans(true); 

    let count = 0;
    for (let K in allInhabitans) {
        if( allInhabitans[K].inhabitan.field.firstElementChild.firstElementChild.checked){
            count++;
            _lake.moveInhabitan(allInhabitans[K].inhabitan.type, allInhabitans[K].pos);
        }            
    } 
    if(count == 0){
        for (let K in allInhabitans) {
            _lake.moveInhabitan(allInhabitans[K].inhabitan.type, allInhabitans[K].pos);
        } 
    }
    _lake.drawInhabitans();  
    
    _lake.clearChecks(); 
}

function reproduce() {
    let allInhabitans = _lake.getAllInhabitans(true);

    let couple = {};
    allInhabitans.map( i => {
        if( i.inhabitan.field.firstElementChild.firstElementChild.checked ){ 
            if(couple[i.inhabitan.type.type] == undefined)   
                couple[i.inhabitan.type.type] = {};

            couple[i.inhabitan.type.type][i.inhabitan.type.gender] = i.inhabitan.type;
        }            
    });
    
    Object.keys(couple).map( key => { 
        
        let father = OptionsForReproduce[key].gender == Gender.female? Gender.male : Gender.female;

        if(couple[key][OptionsForReproduce[key].gender] !== undefined){
            let payload = couple[key][OptionsForReproduce[key].gender].reproduce(couple[key][father]);
            if(payload){
                let isAdded = _lake.addInhabitan(couple[key][OptionsForReproduce[key].gender].position, payload);
                if(isAdded)
                    helpers.addInhabitan(payload);
                else
                    helpers.addInfo(`NEED PLACE`);
            }
        }

    });

    _lake.clearChecks(); 
    _lake.drawInhabitans();

}

