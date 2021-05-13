export class helpers { 

    static addInfo(message) {
        let consoleBox = document.getElementById('console');
        consoleBox.innerHTML += message + '<br>';
    }

    static addInhabitan(payload) {        
        let li = document.createElement('li');
        li.innerHTML = `Name : ${payload.name}<br>Gender : ${payload.gender}<br>Weight : ${payload.weight}<br>Height : ${payload.height}`;
        document.getElementById('list-of-inhabitants').appendChild(li); 
        this.addInfo(`Born new Frog - name : ${payload.name}`); 
    }
    static randomProperty(obj) {
        var keys = Object.keys(obj);
        return obj[keys[ keys.length * Math.random() << 0]];
    }
    
    static isClose( pos1, pos2 ) {
        let diff_Y = Math.abs(pos1.y - pos2.y);
        let diff_X = Math.abs(pos1.x - pos2.x);

        if(diff_X < 2 && diff_Y < 2)
            return true;
        else return false;
    }
}