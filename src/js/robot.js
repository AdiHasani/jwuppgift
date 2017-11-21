var ah = React.createElement;
var shape
var room = {
    canvas: null,
    context: null
},
var robotObject = {
    x: null,
    y: null,
    direction: null,
    commandInput:null
},

var robot = React.createClass({
    set: function() {
        var x = document.getElementById('setX');
        var y = document.getElementById('setY');
        robotObject.x = +x.value;
        robotObject.y = +y.value;
        robotObject.direction = 'N';
        this.setState({x:robotObject.x, y:robotObject.y, direction:robotObject.direction});
        this.drawRobot();
    },
    start: function() {
        robotObject.commandInput = document.getElementById('command').value.toUpperCase().split('');
        this.setState({finalX: robotObject.x, finalY: robotObject.y, finalD: robotObject.direction})
        window.setInterval(function(){
            this.calalculateNextStep();
            this.drawRobot();
        }.bind(this), 1000);
    },

    getInitialState: function() {
        return {
            x: null,
            y: null,
            direction: null,
            finalX: null,
            finalY: null,
            finalD: null
        }
    },

    calalculateNextStep: function() {
        var letter = robotObject.commandInput[0]
        robotObject.commandInput.shift();
        switch (letter){
            case 'V':
            case 'L':   
                        this.movement('Left');
                        break;
            case 'H':
            case 'R':    
                        this.movement('Right');
                        break;
            case 'G':
            case 'F':   
                        this.movement('Forward');
                        break;
        }
    },

    drawRobot: function() {
        axisX = (robotObject.x) * 39, 
        axisY = (robotObject.y) * 39; 
        var path  = room.context;
        var robotSize = 15;
        room.context.clearRect(0,0,400,400);
        path.beginPath();
        if (shape === 'circle'){
            path.arc(200,200,199, 0, 2 * Math.PI);
            path.stroke();
            path.translate(200,200);
        }
        switch (robotObject.direction) {
            case "N":
                path.moveTo(axisX, axisY - robotSize);
                path.lineTo(axisX - robotSize, axisY);
                path.lineTo(axisX + robotSize, axisY);
                break;
            case "S":
                path.moveTo(axisX, robotAxisY + robotSize);
                path.lineTo(axisX - robotSize, axisY);
                path.lineTo(axisX + robotSize, axisY);
                break;
            case "E":
                path.moveTo(axisX + robotSize, axisY);
                path.lineTo(axisX, axisY - robotSize);
                path.lineTo(axisX, axisY + robotSize);
                break;
            case "W":
                path.moveTo(axisX - robotSize, axisY);
                path.lineTo(axisX, axisY - robotSize);
                path.lineTo(axisX, axisY + robotSize);
                break;
        }
        if (shape === 'circle'){
            path.translate(-200,-200);
        }    
         path.fill();
    },
movement: function(move){
    if(move === 'Left'){
        switch(robotObject.direction){
            case 'N':
                        robotObject.direction = 'W';
                        this.setState({finalD:robotObject.direction});
                        break;
            case 'E':
                        robotObject.direction = 'N';
                        this.setState({finalD:robotObject.direction});
                        break;
            case 'S':
                        robotObject.direction = 'E';
                        this.setState({finalD:robotObject.direction});
                        break; 
            case 'W':
                        robotObject.direction = 'S';
                        this.setState({finalD:robotObject.direction});
                        break;
        }
    } else if (move === 'Right'){
        switch(robotObject.direction){
            case 'N':
                        robotObject.direction = 'E';
                        this.setState({finalD:robotObject.direction});
                        break;
            case 'E':
                        robotObject.direction = 'S';
                        this.setState({finalD:robotObject.direction});
                        break;
            case 'S':
                        robotObject.direction = 'W';
                        this.setState({finalD:robotObject.direction});
                        break; 
            case 'W':
                        robotObject.direction = 'N';
                        this.setState({finalD:robotObject.direction});
                        break;
        }

    } else if (move === 'Forward'){
        switch(robotObject.direction){
            case 'N':
                        robotObject.y = robotObject.y - 1;
                        this.setState({finalY:robotObject.y});
                        break;
            case 'E':
                        robotObject.x = robotObject.x + 1;
                        this.setState({finalX:robotObject.x});
                        break;
            case 'S':
                        robotObject.y = robotObject.y + 1;
                        this.setState({finalY:robotObject.y});
                        break; 
            case 'W':
                        robotObject.x = robotObject.x - 1;
                        this.setState({finalX:robotObject.x});
                        break;
        }

    }
},

    componentDidMount: function() {
        room.canvas = document.getElementById('theRoom');
        room.context = room.canvas.getContext('2d');
            if (shape === 'circle'){
                room.context.beginPath();
                room.context.arc(200,200,199, 0, 2*Math.PI);
                room.context.stroke();
                room.context.fillStyle = '#DB5D4E';
                room.context.fill();
                }
    },

    render: function(){
        shape = this.props.shape;
        
        return ah('div', null,
            ah('div',{id:'room'}),
            ah('canvas',{className:'robot',id:'theRoom', width:400, height:400},null),
            ah('div',  {className: 'position'}, null,
            ah('input', {className: 'setX', placeholder:"set x:", id:"setX"},null),
            ah('input', {className: 'setY', placeholder:"set y:", id:"setY"},null),
            ah('input', {type:'button', value:'Set robot', id:'setbtn', onClick:this.set})),
            ah('div',  {className: 'Commands'}, null,
            ah('input', {placeholder:"Command string", id:"command"},null),
            ah('input', {type:'button', value:'Start', id:'startbtn', onClick:this.start}), null),
            ah('div',{id:'result'},
            ah('p',null, 'Current position: ' + this.state.finalX + ','+ this.state.finalY + ',' + this.state.finalD),
            ah('p',null, 'Start position: ' + this.state.x + ','+ this.state.y + ',' + this.state.direction)))
  }
  })