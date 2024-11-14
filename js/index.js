//VARIABLES

const houses = [
    {inputId: 'inputGryffondor', buttonId: 'addGryffondor', scoreId: 'scoreGryffondor'},
    {inputId: 'inputSerpentard', buttonId: 'addSerpentard',  scoreId: 'scoreSerpentard'},
    {inputId: 'inputPoufsouffle', buttonId: 'addPoufsouffle',  scoreId: 'scorePoufsouffle'},
    {inputId: 'inputSerdaigle', buttonId: 'addSerdaigle',  scoreId: 'scoreSerdaigle'}
]

let plus = document.querySelector('.logoPlus');
let scores = document.querySelector('.score');

let scoresInMemory = {
    Gryffondor: 0,
    Serpentard:  0,
    Poufsouffle: 0,
    Serdaigle: 0
}

//FONCTIONS

function addScore(inputId, buttonId, scoreId){

    let inputElement = document.getElementById(inputId);

    let scoreElement = document.getElementById(scoreId);

    let newScore = parseInt(inputElement.value);

    if(isNaN(newScore) || newScore < 0){
        alert("Entre un NOMBRE, Harry !")
        return
    }

    let houseName = inputId.replace('input', '');

    scoresInMemory[houseName] += newScore;
    scoreElement.textContent = scoresInMemory[houseName];
    inputElement.value = "";
    
    ordreClassement(); //Appel de la fonction pour organiser le classement par score.
}

function ordreClassement(){
    let houseList = document.getElementById('houseList');
    let houseItem = Array.from(houseList.children);

    houseItem.sort((a, b) => {
        let scoreA = parseInt(a.querySelector('p').textContent)
        let scoreB = parseInt(b.querySelector('p').textContent)
        return scoreB - scoreA; 
    })

    houseItem.forEach(item =>{
        item.classList.add('moving')
    })
    houseItem.forEach(item =>{
        houseList.appendChild(item)
    
    });
}

//APPEL DES FONCTIONS

houses.forEach(house => {
    document.getElementById(house.buttonId).addEventListener('click',() => {
        addScore(house.inputId, house.buttonId, house.scoreId.replace('input', ''))
    });
});
