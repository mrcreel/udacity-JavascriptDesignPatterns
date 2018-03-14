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
  ],
  adminVisible: 'none'
};

const octopus = {
  init: function() {
    // set our current cat to the first one in the list
    model.currentCat = model.cats[0];

    buttonView.init();
    catView.init();
    adminView.init();
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
  incrementClicks: function() {
    model.currentCat.clicks++;
    catView.render();
    adminView.render();
  },
  adminVisible: function() {
    var x = document.getElementById('admin-div');
    if (model.adminVisible === 'none') {
      model.adminVisible = 'block';
    } else {
      model.adminVisible = 'none';
    }
    x.style.display = model.adminVisible;
  },
  submit: function(){
    const cat = model.currentCat;
    console.log(cat, cat.name, cat.image, cat.clicks);
    cat.name = document.getElementById('admin-name').value;
    cat.image = document.getElementById('admin-image').value;
    cat.clicks = document.getElementById('admin-clicks').value;
    catView.render();
    buttonView.render();
    octopus.adminVisible();
  },
};

const buttonView = {
  init: function() {
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
      elem.addEventListener(
        'click',
        (function(catCopy) {
          return function() {
            octopus.setCurrentCat(catCopy);
            adminView.render();
            catView.render();
          };
        })(cat)
      );

      // finally, add the element to the list
      this.catButtons.appendChild(elem);
    }
  }
};
const catView = {
  init: function() {
    this.catDiv = document.getElementById('cat');
    this.catName = document.getElementById('cat-name');
    this.catPic = document.getElementById('cat-pic');
    this.catClicks = document.getElementById('cat-clicks');

    this.catPic.addEventListener('click', function() {
      octopus.incrementClicks();
    });

    this.render();
  },

  render: function() {
    const currentCat = octopus.getCurrentCat();
    this.catName.innerHTML = `Name: ${currentCat.name}`;
    this.catClicks.innerHTML = `Clicks: ${currentCat.clicks}`;
    this.catPic.src = currentCat.image;
  }
};

const adminView = {
  init: function() {
    this.btnAdmin = document.getElementById('btn-admin');
    this.btnCancel = document.getElementById('btn-cancel');
    this.btnSubmit = document.getElementById('btn-submit');

    this.adminDiv = document.getElementById('admin-div');
    this.adminName = document.getElementById('admin-name')
    this.adminImage = document.getElementById('admin-image')
    this.adminClicks = document.getElementById('admin-clicks')

    this.btnAdmin.addEventListener('click', function() {
      octopus.adminVisible();
    });
    this.btnCancel.addEventListener('click', function() {
      octopus.adminVisible();
    });
    this.btnSubmit.addEventListener('click', function() {
      octopus.submit();
    });
    this.render();
  },

  render: function() {
    const currentCat = octopus.getCurrentCat();
    this.adminName.value = currentCat.name;
    this.adminImage.value = currentCat.image;
    this.adminClicks.value = currentCat.clicks;
  },
  submit: function(){
    octopus.submit();
  },
};
octopus.init();
