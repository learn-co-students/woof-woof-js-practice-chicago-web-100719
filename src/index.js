const url = 'http://localhost:3000/'
const pupsURL = url + 'pups'

function main(){
  document.addEventListener('DOMContentLoaded', function(){
    fetchDogs()
    filterBtnListener()
  })
}

function fetchDogs(){
  fetch(pupsURL)
  .then(resp => resp.json())
  .then(dogs => renderDogs(dogs))
}

function renderDogs(dogs){
  const dogBar = document.getElementById('dog-bar')
  dogBar.innerHTML = ""
  dogs.forEach(dog => renderDog(dog))
}

function renderDog(dog){
  const dogBar = document.getElementById('dog-bar')
  const span = document.createElement('span')
  span.id = `dog-${dog.id}`
  span.dataset.id = dog.id
  span.innerText = dog.name
  dogBar.appendChild(span)

  span.addEventListener('click', function(){
    showDogInfo(dog)
  })
}

function showDogInfo(dog){
  const dogInfo = document.getElementById('dog-info')
  dogInfo.innerHTML = `<img src="${dog.image}"><h2>${dog.name}</h2>`
  const dogBtn = document.createElement('button')
  if (dog.isGoodDog === true){
    dogBtn.innerText = 'Good Dog!'
  }
  else {
    dogBtn.innerText = 'Bad Dog!'
  }
  dogInfo.appendChild(dogBtn)
  dogBtn.addEventListener('click', function(){
    toggleDogBtn(dog)
  })
}

function toggleDogBtn(dog){
  let dogVal
  if (dog.isGoodDog === true){
    dogVal = false
  }
  else if (dog.isGoodDog === false){
    dogVal = true
  }

  reqObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: dogVal
    })
  }
  fetch(pupsURL + `/${dog.id}`, reqObj)
  .then(resp => resp.json())
  .then(dog => {
    showDogInfo(dog)
    filterDogs()
  })
}

function filterBtnListener(){
  const filterBtn = document.getElementById('good-dog-filter')
  filterBtn.addEventListener('click', function(){
    if (filterBtn.innerText === 'Filter good dogs: OFF'){
      filterBtn.innerText = 'Filter good dogs: ON'
    }
    else if(filterBtn.innerText === 'Filter good dogs: ON'){
      filterBtn.innerText = 'Filter good dogs: OFF'
    }
    filterDogs()
  })
}

function filterDogs(){
  const filterBtn = document.getElementById('good-dog-filter')
  fetch(pupsURL)
  .then(resp => resp.json())
  .then(dogs => {
    if (filterBtn.innerText === 'Filter good dogs: ON'){
      const goodDogs = dogs.filter(dog => dog.isGoodDog === true)
      renderDogs(goodDogs)
    }
    else{
      renderDogs(dogs)
    }
  })
}

main()