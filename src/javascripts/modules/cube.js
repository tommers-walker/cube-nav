import 'gsap';
import 'gsap/ThrowPropsPlugin';
import 'gsap/Draggable';

const rotationSnap = 90;
const cube = document.querySelector('#cube');
const cubeFaces = Array.from(document.querySelectorAll('.js-cube-face'));
const currentSection = document.querySelector('#current-section');

const cubeAnim = {
  init() {
    Draggable.create('.js-proxy', {
      trigger: document.body,
      throwProps: true,
      dragClickables: true,
      lockAxis: true,
      snap: function(endValue) {
        //this function gets called when the mouse/finger is released and it plots where rotation should normally end and we can alter that value and return a new one instead. This gives us an easy way to apply custom snapping behavior with any logic we want. In this case, just make sure the end value snaps to 90-degree increments but only when the "snap" checkbox is selected.
        return Math.round(endValue / rotationSnap) * rotationSnap;
      },
      onDrag: function() {
        // TweenLite.set(cube, {rotationX:-this.y})
        TweenLite.set(cube, {rotationY:this.x})
      },
      onThrowUpdate: function() {
        // TweenLite.set(cube, {rotationX:-this.y})
        TweenLite.set(cube, {rotationY:this.x})
      },
      onThrowComplete: function() {
        // const remainder = Math.abs(this.x % 360);
        let selector = (this.x % 360 / 90) * -1;

        if (selector < 0) {
          selector = cubeFaces.length + selector;
        }

        const section = cubeFaces[selector];
        const text = section.getAttribute('href').substr(1);
        currentSection.innerHTML = text;
      }
    });
  }
}

export { cubeAnim }
