
let data = {
  _value:0.3,

  get value() {

  }
}

Template.body.events({

  'input [ingredient]': function(e) {
    let id = e.target.getAttribute('ingredient');
    console.log(id, e.target.value);
  }
})
