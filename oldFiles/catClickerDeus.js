$(document).ready(function () {
  const container = document.getElementById('container')
  const cats = [
    {
      name: 'one',
      image: '/images/cat1.jpg',
      clicks: 0
  },
    {
      name: 'two',
      image:'/images/cat2.jpg',
      clicks: 0
    },
  ]
  for(let i = 0; i < cats.length; i++){
    const catDiv = document.createElement('div')
    catDiv.className = 'cat'
    const catName = document.createElement('div')
    catName.className = 'name'
    catName.innerHTML = 'Name: ' + cats[i].name
    catName.id = `name${i}`
    catDiv.appendChild(catName)
    const catPic = document.createElement('img')
    catPic.className = 'picture'
    catPic.src = cats[i].image
    catPic.id = i
    catPic.onclick = function(){replyClick(this.id)}
    catDiv.appendChild(catPic)
    const catClicks = document.createElement('div')
    catClicks.className = 'clicks'
    catClicks.innerHTML = 'Clicks: ' + cats[i].clicks
    catClicks.id = `clicks${i}`
    catDiv.appendChild(catClicks)
    container.appendChild(catDiv)
  }
function replyClick(ele){
  const cat = document.getElementById(ele)
  cats[ele].clicks = cats[ele].clicks + 1
  document.getElementById(`clicks${ele}`).innerHTML = 'Clicks: ' + cats[ele].clicks
}
})