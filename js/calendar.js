const calendar = document.getElementById("calendar");
const calendarConsolini = document.getElementById("calendarConsolini");
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
 if (daysUntil == 1) {
  return `La prossima partita è domani! Arricampati! Giochiamo contro contro ${nextGame.opponent}`;
 }
 return `La prossima partita è il ${nextGame.date.getDate()} ${months[nextGame.date.getMonth()]} contro ${nextGame.opponent} tra ${daysUntil} giorni.`;
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



function generateCalendar() {
  calendarConsolini.innerHTML = "";

  // Calendar Header
  const calendarHeader = document.createElement("div");
  calendarHeader.classList.add("calendar-header");
  calendarHeader.textContent = `${months[today.getMonth()]} ${today.getFullYear()}`;
  calendarConsolini.appendChild(calendarHeader);

  // Calendar Days
  const calendarDays = document.createElement("div");
  calendarDays.classList.add("calendar-days");
  days.forEach(day => {
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-cell");
    dayCell.textContent = day;
    calendarDays.appendChild(dayCell);
  });
  calendarConsolini.appendChild(calendarDays);

  // Calendar Cells
  const daysInMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  for (let i = 0; i <= daysInMonth; i++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-cell");

    const gameDate = new Date(today.getFullYear(), today.getMonth(), i);
    dayCell.innerHTML = `<div class="game-date">${i}</div>`;

    const game = games.find(g => g.date.toDateString() === gameDate.toDateString());
    if (game) {
      dayCell.innerHTML += `<div class="game-opponent">${game.opponent}</div>`;
    }

    calendarDays.appendChild(dayCell);
  }
}

generateCalendar();