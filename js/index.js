//VARIABLES

const houses = [
    { inputId: 'inputGryffondor', buttonId: 'addGryffondor', scoreId: 'scoreGryffondor' },
    { inputId: 'inputSerpentard', buttonId: 'addSerpentard', scoreId: 'scoreSerpentard' },
    { inputId: 'inputPoufsouffle', buttonId: 'addPoufsouffle', scoreId: 'scorePoufsouffle' },
    { inputId: 'inputSerdaigle', buttonId: 'addSerdaigle', scoreId: 'scoreSerdaigle' }
]

let scoresInMemory = {
    Gryffondor: parseInt(localStorage.getItem('Gryffondor')) || 0,
    Serpentard: parseInt(localStorage.getItem('Serpentard')) || 0,
    Poufsouffle: parseInt(localStorage.getItem('Poufsouffle')) || 0,
    Serdaigle: parseInt(localStorage.getItem('Serdaigle')) || 0
}

updateScores();

//FONCTIONS

function addScore(inputId, scoreId) {

    const houseName = inputId.replace('input', '');
    let inputElement = document.getElementById(inputId);
    let scoreElement = document.getElementById(scoreId);

    let newScore = parseInt(inputElement.value);

    if (isNaN(newScore) || newScore < 0) {
        alert("Entre un NOMBRE, Harry !")
        return
    }

    scoresInMemory[houseName] += newScore;
    scoreElement.textContent = scoresInMemory[houseName];
    inputElement.value = "";

    localStorage.setItem(houseName, scoresInMemory[houseName]);

    ordreClassement(); //Appel de la fonction pour organiser le classement par score.
}

function ordreClassement() {
    let houseList = document.getElementById('houseList');
    let houseItem = Array.from(houseList.children);

    houseItem.sort((a, b) => {
        let scoreA = parseInt(a.querySelector('p').textContent)
        let scoreB = parseInt(b.querySelector('p').textContent)
        return scoreB - scoreA;
    })

    houseItem.forEach(item => {
        houseList.appendChild(item)

    });
}

function updateScores() {
    houses.forEach(house => {
        const scoreElement = document.getElementById(house.scoreId);
        houseName = house.inputId.replace('input', '');
        scoreElement.textContent = scoresInMemory[houseName];
        ordreClassement();
    });
}

//APPEL DES FONCTIONS

houses.forEach(house => {
    const button = document.getElementById(house.buttonId);
    button.addEventListener('click', () => {
        addScore(house.inputId, house.scoreId);
    });
});

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {

        scoresInMemory = {
            Gryffondor: 0,
            Serpentard: 0,
            Poufsouffle: 0,
            Serdaigle: 0
        }

        localStorage.setItem('Gryffondor', 0)
        localStorage.setItem('Serpentard', 0)
        localStorage.setItem('Poufsouffle', 0)
        localStorage.setItem('Serdaigle', 0)
    }
    ordreClassement();

})

