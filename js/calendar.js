const calendar = document.getElementById("nextMatch");
const gamesList = document.getElementById("calendarConsolini");
const today = new Date();
const days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
const games = [
 {
 date: new Date("2024-01-27"),
 opponent: "RIBERA KNIGHTS"
 },
 {
 date: new Date("2024-02-04"),
 opponent: "A.S.D. INVICTA 93CENTO"
 },
 {
 date: new Date("2024-02-11"),
 opponent: "POL. DIL. IDEAL GELA"
 },
 {
 date: new Date("2024-02-25"),
 opponent: "VIRTUS SOMMATINO"
 },
 {
 date: new Date("2024-03-03"),
 opponent: "RIBERA KNIGHTS"
 },
 {
 date: new Date("2024-03-11"),
 opponent: "A.S.D. INVICTA 93CENTO"
 },
 {
 date: new Date("2024-02-18"),
 opponent: "A.S.D. C.U.S.N."
 }
];

const nextGame = () => {
    let nextGame = null;

    for (let i = 0; i < games.length; i++) {
        if (games[i].date > today) {
            nextGame = games[i];
            break;
        }
    }

    if (nextGame) {
        const daysUntil = Math.ceil((nextGame.date - today) / (1000 * 60 * 60 * 24));
        const formattedDate = `<span class="elementor-heading-title" style="color: #FF9933;">${nextGame.date.getDate()} ${months[nextGame.date.getMonth()]}</span>`;
        const opponentText = `contro ${nextGame.opponent}`;

        if (daysUntil === 1) {
            return `La prossima partita è <span class="elementor-heading-title" style="color: #FF9933;">domani!</span> Arricampati! Giochiamo  contro ${opponentText}`;
        }

        return `La prossima partita è il ${formattedDate} ${opponentText} tra ${daysUntil} giorni.`;
    } else {
        return "Non ci sono partite in programma.";
    }
};


calendar.innerHTML = nextGame();


document.addEventListener('DOMContentLoaded', function () {
  const navMenuBtn = document.getElementById('nav-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  navMenuBtn.addEventListener('click', function () {
    navMenu.style.display = (navMenu.style.display === 'block') ? 'none' : 'block';
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      navMenu.style.display = 'block';
    } else {
      navMenu.style.display = 'none';
    }
  });
});



function generateGamesList() {
    gamesList.innerHTML = "";

    games.forEach(game => {
        const gameItem = document.createElement("h3");
        gameItem.classList.add("elementor-heading-title");

        // Modifica qui per aggiungere il colore FF9933 alla data
        const formattedDate = `<span style="color: #FF9933;">${formatDate(game.date)}</span>`;
        
        gameItem.innerHTML = `${game.opponent} - ${formattedDate}`;
        gamesList.appendChild(gameItem);
    });
}


function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('it-IT', options);
}

generateGamesList();