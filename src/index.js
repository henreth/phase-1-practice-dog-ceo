document.addEventListener('DOMContentLoaded', ()=>{
    fetchDogs(imgURL,renderDogs); //1
    fetchDogs(breedURL,renderBreeds); //2
    filterDogs(); //4
})

/// CHALLENGE 1; 
const imgURL = 'https://dog.ceo/api/breeds/image/random/4'
function fetchDogs(url,func){
    return fetch(url)
    .then( resp => resp.json())
    .then( json => func(json))
}

const renderDogs = (dogs) => {
    const dogList = document.getElementById('dog-image-container');
    dogs.message.forEach(dog=> {
        const dogImg = document.createElement('img');
        dogImg.src=dog;
        dogList.appendChild(dogImg);
    })
}

/// CHALLENGE 2:

const breedURL = 'https://dog.ceo/api/breeds/list/all'

const renderBreeds = (dogs) => {
    const breedList = document.getElementById('dog-breeds');
    const breeds = Object.keys(dogs.message);
    breeds.forEach(breed=> {
        if (dogs.message[breed].length===0) {
            const dogBreed = document.createElement('li');
            dogBreed.className='dog'
            dogBreed.textContent=breed;
            dogBreed.id=breed
                // CHALLENGE 3: CHANGING COLOR OF BREED UPON CLICK
                dogBreed.active=false
                dogBreed.addEventListener('click',()=>{
                    console.log(dogBreed.textContent[0])
                    if (dogBreed.active===true){
                        dogBreed.style.color='black';
                        dogBreed.active=!dogBreed.active;
                    } else if (dogBreed.active===false){
                        dogBreed.style.color='purple';
                        dogBreed.active=!dogBreed.active;
                    }
                    
                })
            breedList.appendChild(dogBreed);
        } else {
            dogs.message[breed].forEach(newBreed=> {
                const dogBreed = document.createElement('li');
                dogBreed.className='dog'
                dogBreed.textContent=`${newBreed} ${breed}`;
                dogBreed.id=`${newBreed} ${breed}`;
                // CHALLENGE 3: CHANGING COLOR OF BREED UPON CLICK
                dogBreed.active=false
                dogBreed.addEventListener('click',()=>{
                    if (dogBreed.active===true){
                        dogBreed.style.color='black';
                        dogBreed.active=!dogBreed.active;
                    } else if (dogBreed.active===false){
                        dogBreed.style.color='orange';
                        dogBreed.active=!dogBreed.active;
                    }
                    
                })
                breedList.appendChild(dogBreed);    
            })

        }

    })
}

/// CHALLENGE 4:

const filterDogs = () => {
    const form = document.getElementById('breed-dropdown');
    form.addEventListener('change', (event)=> {
        selectBreeds(event.target.value)
        // selectBreedsStartingWith(event.target.value);
    })
}

function selectBreeds(char) {
    const breeds = document.getElementsByClassName('dog')
    for (breed of breeds){
        const name = breed.textContent;
        if (!name.startsWith(char)){
            breed.style.visibility='hidden'
        } else if (name.startsWith(char)){
            breed.style.visibility='visible';

        }
    }
}