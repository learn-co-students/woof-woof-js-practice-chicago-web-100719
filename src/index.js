let filter = false;

function fetchPups(filter = false) {
    fetch('http://localhost:3000/pups/')
    .then(resp => resp.json())
    .then(pups => barPups(pups, filter))
}

function barPups(pups, filter) {
    const bar = document.getElementById('dog-bar');
    bar.innerHTML = '';
    pups.forEach (pup => barPup(pup, filter));
}
//
function barPup(pup, filter) {
    // creating dog span if filter is off or if the dog is good
    if (filter === false || pup.isGoodDog === true) {
        const bar = document.getElementById('dog-bar');
        const pupSpan = document.createElement('span');
        pupSpan.innerText = pup.name;
        pupSpan.addEventListener('click', function() {
            renderPupDetails(pup);
        });
        bar.append(pupSpan);
    }
    
}

function renderPupDetails(pup) {
    // create dog detail elements and shove into div 
    const detailDiv = document.getElementById('dog-info');
    const dogDetails = `
    <img src='${pup.image}'>
    <h2>${pup.name}</h2>
    <button data-id='${pup.id}'>${goodOrBad(pup)}</button>
    `;
    detailDiv.innerHTML = dogDetails;
    const goodBtn = detailDiv.querySelector('button');
    // console.log(goodBtn);
    goodBtn.addEventListener('click', function(event) {
        changeGood(pup);
    });
}

function goodOrBad(pup) {
    if (pup.isGoodDog) {
        return 'Good Dog!';
    } else {
        return 'Bad Dog!';
    }
}

function changeGood(pup) {
    let goodObj = {};
    
    if (pup.isGoodDog) {
        goodObj = { 'isGoodDog': false }
    } else {
        goodObj = { 'isGoodDog': true }
    }

    const reqObj = {
        method: 'PATCH',
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify(goodObj)
    }

    fetch(`http://localhost:3000/pups/` + pup.id, reqObj)
    .then(resp => resp.json())
    .then(dog => renderPupDetails(dog))
}

function filterPups() {
    // grab filter button and add event listener
    // check filter status and change
    // render dog bar appropriately
    const filterBtn = document.getElementById('good-dog-filter');
    filterBtn.addEventListener('click', function(event) {
        filter = !filter;
        if (filter) {
            filterBtn.innerText = 'Filter good dogs: On'
        } else {
            filterBtn.innerText = 'Filter good dogs: OFF'
        }
        fetchPups(filter);
    });
}

function main() {
    document.addEventListener('DOMContentLoaded', function(event) {
        fetchPups();
        filterPups();
    })
}

main();