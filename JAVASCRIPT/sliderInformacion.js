const slider = document.querySelector('#sliderInformacion');
let sliderSection = document.querySelectorAll('.info');
let sliderSectionLast = sliderSection[sliderSection.length - 1];

const btnL = document.querySelector('#izquierdo');
const btnd = document.querySelector('#derecho');
const navItems = document.querySelectorAll('.h3nav li'); // Get all navigation items

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function Li_si(index) {
  navItems.forEach(function(item, i) {
    item.classList.remove('active'); // Remove active class from all items
  });
  navItems[index].classList.add('active'); // Add active class to the clicked item
}

// Li_no function is no longer needed as styling is handled in Li_si

function Next() {
  let sliderSectionFirst = document.querySelectorAll('.info')[0];
  slider.style.marginLeft = '-200%'; // Move slider container to show next slide
  slider.style.transition = 'all .5s'; // Apply transition effect

  setTimeout(function() {
    slider.style.transition = 'none'; // Remove transition after animation
    slider.insertAdjacentElement('beforeend', sliderSectionFirst); // Move first slide to the end
    slider.style.marginLeft = '-100%'; // Adjust margin to show current slide
    const currentIndex = (sliderSection.length - 2) % sliderSection.length; // Calculate current slide index
    Li_si(currentIndex); // Highlight navigation item for the current slide
  }, 500);
}

function Prev() {
  let sliderSection = document.querySelectorAll('.info');
  sliderSectionLast = sliderSection[sliderSection.length - 1];
  slider.style.marginLeft = '0'; // Move slider container to show previous slide
  slider.style.transition = 'all .5s'; // Apply transition effect

  setTimeout(function() {
    slider.style.transition = 'none'; // Remove transition after animation
    slider.insertAdjacentElement('afterbegin', sliderSectionLast); // Move last slide to the beginning
    slider.style.marginLeft = '-100%'; // Adjust margin to show current slide
    const currentIndex = sliderSection.length % sliderSection.length; // Calculate current slide index
    Li_si(currentIndex); // Highlight navigation item for the current slide
  }, 500);
}

btnd.addEventListener('click', function(){
  Next();
});

btnL.addEventListener('click', function(){
  Prev();
});

// Navigation click handling (uncommented)
navItems.forEach(function(item, i) {
  item.addEventListener('click', function() {
    const newIndex = i; // Get clicked navigation item index
    let sliderSectionFirst = document.querySelectorAll('.info')[0];
    let currentMargin = parseFloat(slider.style.marginLeft.replace("%", "")); // Get current slider margin

    const distance = Math.abs(currentMargin) / 100; // Calculate distance to move based on current margin
    const direction = currentMargin < 0 ? 1 : -1; // Determine move direction (next or previous)

    let moveCount = Math.abs(newIndex - (sliderSection.length - 1)); // Calculate number of slides to move

    slider.style.transition = 'all 0.5s'; // Apply transition effect

    for (let j = 0; j < moveCount; j++) {
      slider.style.marginLeft = `${currentMargin + (distance * direction * 100)}%`; // Move slider based on direction and distance
      currentMargin += (distance * direction * 100);
    }

    setTimeout(function() {
      slider.style.transition = 'none'; // Remove transition after animation
      slider.style.marginLeft = '-100%'; // Adjust margin to show current slide
      Li_si(newIndex); // Highlight navigation item for the clicked item
    }, 500);
  });
});
