

Template.slider.onCreated(function() {

  this.value = new ReactiveVar(this.data.value || 0);
})
Template.slider.onRendered(function() {
  let slider = this.find('slider');
  let handle = this.find('.handle');
  let mc = new Hammer(handle);

  Object.defineProperty(slider, 'value', {
    get: () => {
      return this.value.get();
    },

    set: (value) => {
      this.value.set(value);
    }
  })

  mc.on('panmove', (e) => {
    let r = slider.getBoundingClientRect();
    this.value.set((e.center.x - r.left)/r.width);
    let ev = new UIEvent('input');
    slider.dispatchEvent(ev);

  })
})

Template.slider.helpers({

  leftValue() {
    let value = Template.instance().value.get();
    if(value < 0)
      return 0;
    if(value > 1)
      return 100;
    //console.log(value);
    return value * 100;
  }
})
