$(document).ready(function() {
  const statsDiv = document.getElementById('stats');
  const buttonDiv = document.getElementById('buttons');

  const cats = [
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
  ];
  (selectCat())
  for (let i = 0; i < cats.length; i++) {
    const buttons = document.createElement('ul');
    const catItem = document.createElement('li');
    catItem.textContent = cats[i].name;
    catItem.id = i;
    catItem.onclick = function() {
      selectCat(this.id);
    };
    buttons.appendChild(catItem);
    buttonDiv.appendChild(buttons);
  }
  function replyClick(ele) {
    const cat = document.getElementById(ele);
    cats[ele].clicks = cats[ele].clicks + 1;
    document.getElementById(`clicks${ele}`).innerHTML =
      'Clicks: ' + cats[ele].clicks;
  }
  function selectCat(ele) {
    if (ele === undefined) { ele = 0}
    statsDiv.innerHTML = '';
    const cat = document.getElementById(ele);
    const catDiv = document.createElement('div');
    catDiv.className = 'cat';
    const catName = document.createElement('div');
    catName.className = 'name';
    catName.innerHTML = 'Name: ' + cats[ele].name;
    catName.id = `name${ele}`;
    catDiv.appendChild(catName);
    const catPic = document.createElement('img');
    catPic.className = 'picture';
    catPic.src = cats[ele].image;
    catPic.id = ele;
    catPic.onclick = function() {
      replyClick(this.id);
    };
    catDiv.appendChild(catPic);
    const catClicks = document.createElement('div');
    catClicks.className = 'clicks';
    catClicks.innerHTML = 'Clicks: ' + cats[ele].clicks;
    catClicks.id = `clicks${ele}`;
    catDiv.appendChild(catClicks);
    statsDiv.appendChild(catDiv);
  }
});
