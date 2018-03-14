const model = {
  currentCat: null,
  cats: [
    {
      name: 'one',
      image: '/images/cat1.jpg',
      clicks: 0
    },
    {
      name: 'two',
      image: '/images/cat2.jpg',
      clicks: 0
    },
    {
      name: 'three',
      image: '/images/cat3.jpg',
      clicks: 0
    },
    {
      name: 'four',
      image: '/images/cat4.jpg',
      clicks: 0
    },
    {
      name: 'five',
      image: '/images/cat5.jpg',
      clicks: 0
    }
  ]
};

const octopus = {
  init: function() {
    // set our current cat to the first one in the list
    model.currentCat = model.cats[0];

    buttonView.init();
    catView.init();
  },
  getCurrentCat: function() {
    return model.currentCat;
  },
  getAllCats: function() {
    return model.cats;
  },
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },
  incrementClicks: function(){
    model.currentCat.clicks++
    catView.render();
  }
};

const buttonView = {
  init: function(){
    this.catButtons = document.getElementById('buttons');
    this.render();
  },

  render: function() {
    var cat, elem, i;
    // get the cats we'll be rendering from the octopus
    var cats = octopus.getAllCats();

    // empty the cat list
    this.catButtons.innerHTML = '';

    // loop over the cats
    for (i = 0; i < cats.length; i++) {
        // this is the cat we're currently looping over
        cat = cats[i];

        // make a new cat list item and set its text
        elem = document.createElement('li');
        elem.textContent = cat.name;

        // on click, setCurrentCat and render the catView
        // (this uses our closure-in-a-loop trick to connect the value
        //  of the cat variable to the click event function)
        elem.addEventListener('click', (function(catCopy) {
            return function() {
                octopus.setCurrentCat(catCopy);
                catView.render();
            };
        })(cat));

        // finally, add the element to the list
        this.catButtons.appendChild(elem);
    }
}

};
const catView = {
  init: function(){
    this.catDiv = document.getElementById('cat')
    this.catName = document.getElementById('cat-name')
    this.catPic = document.getElementById('cat-pic')
    this.catClicks = document.getElementById('cat-clicks')

    this.catPic.addEventListener('click', function(){
      octopus.incrementClicks();
    })

    this.render();
  },

  render: function(){
    const currentCat = octopus.getCurrentCat();
    this.catName.innerHTML = `Name: ${currentCat.name}`
    this.catClicks.innerHTML = `Clicks: ${currentCat.clicks}`;
    this.catPic.src = currentCat.image;

  },
};

octopus.init();
