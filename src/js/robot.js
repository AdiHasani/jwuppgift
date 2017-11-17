var ah = React.createElement;

var form = React.createClass({
    set: function(){
        console.log('we are in set.............')
    },
    start: function(){
        console.log('we are in start.............')
    },
    render: function(){
      return ah('div', null,
      ah('input', {placeholder:"set x: max 10", id:"x"},null),
      ah('input', {placeholder:"set y: max 10", id:"y"},null),
      ah('input',{type:'button', value:'Set robot', id:'setbtn', onClick:this.set}),
      ah('input', {placeholder:"command string", id:"command"},null),
      ah('input',{type:'button', value:'Start', id:'startbtn', onClick:this.start}), null)
  }
  })