// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
const playbtn = document.querySelector('#playbtn');

playbtn.addEventListener('click', startGame);

function startGame(){
    const maingrid = document.querySelector('#main-grid');
    const level = parseInt(document.querySelector('#user-level').value);
    const usermessage = document.getElementById('user-message');
    console.log(level);

    //Reset
    maingrid.innerHTML = '';
    maingrid.className = '';
    usermessage.innerHTML = '';
    usermessage.className = '';

    let maxRangeNumber;
    let squarelevel;
    //Ad ogni livello assegno un range massimo
    switch(level){
        case 1:
        maxRangeNumber = 100;
        squarelevel = 'easy';
        break;
        case 2:
        maxRangeNumber = 81;
        squarelevel = 'hard';
        break;
        case 3:
        maxRangeNumber = 49;
        squarelevel = 'crazy';
        break;
    
    }

    const bombs = generateBombs (16 , 1 , maxRangeNumber);
    console.log(bombs);

    const maxtry =  maxRangeNumber - 16;

    const numberok = [];

    grid();

    //Funzione che popola main grid
    function grid(){
        maingrid.classList.add(squarelevel);
        for(let i = 1; i <= maxRangeNumber; i++){
            const cell = document.createElement('div');
            cell.innerHTML = `<span>${i}</span>`;
            cell.classList.add('square');
            cell.addEventListener('click',cellclick);
            maingrid.append(cell);
        }
    }
   
    
    function cellclick(){
        const userNumber =parseInt(this.querySelector('span').innerHTML);
            if(bombs.includes(userNumber)){
                this.classList.add('red');
                this.style.pointerEvents = 'none';
                end ('lost', numberok);
            }
            else{
                if(!numberok.includes(userNumber)){
                    numberok.push(userNumber);
                    this.classList.add('blue');
                    this.style.pointerEvents = 'none';
                  }
                  if(numberok.length === maxtry){
                    end('won', numberok);
                    game = false;
                   }
            }
       
       
        function end(endresult, numberok){

            if(endresult === 'won'){
                usermessage.innerHTML = 'Hai Vinto :)'
            }
            else{
                usermessage.innerHTML = `Hai Perso :( Mi dispiace, ritenta. Il numero di tentativi azzeccati è : ${numberok.length}`;
            }
            
            //Rendo non cliccabili le celle dopo che ho perso
            const allsquares = document.querySelectorAll('.square');
            
            for(let i = 0; i < allsquares.length; i++){
                const thisSquare = allsquares[i];

                //Non cliccabile
                thisSquare.style.pointerEvents = 'none';

                //Per vedere tutte le celle rosse
                const thisSquareNumber = parseInt(thisSquare.querySelector('span').innerHTML);

                if(bombs.includes(thisSquareNumber)){
                    thisSquare.classList.add('red');
                }
            }
        }
        
    }

   

}

// FUNZIONI UTILI
function generateBombs(numberElements,rangeMin,rangeMax){
    const randomarray = [];

    while(randomarray.length < numberElements){
        const random = getRndInteger(rangeMin,rangeMax)
        if(!randomarray.includes(random) ){
            randomarray.push(random);
        }
    }
    return randomarray;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
