let jeuEnCours = false;
let debutJeu = 0;
let afficherResultat = false;
const result = $(".temps");

const tabContainerLight = $(".lightRace").find(".light");
let numLight = 0;
$(document).ready(function () {
  $("main").on("click", function (event) {
    if (jeuEnCours) arretJeu();
    else {
      tabContainerLight.removeClass("on");
      tabContainerLight.removeClass("go");
      tabContainerLight.slice(2, 4).addClass("on");
      numLight = 6;
      afficherResultat = false;
      lancerJeu();
      result.text("00.000");
    }
  });
});

let timerRedLight;
let timerJeu;
let compteur = 0.0;
function lancerJeu() {
  console.log("jeu lancé");

  jeuEnCours = true;

  let TempJeu = Math.floor(Math.random() * (7501 - 5500)) + 5500; //genere un nombre de milisecondes pour le jeu
  console.log(TempJeu);

  timerJeu = setTimeout(function () {
    clearTimeout(timerRedLight);
    $.each(tabContainerLight, function (light) {
      let $light = $(tabContainerLight[light]);
      console.log($light);
      if ($light.hasClass("on")) $light.removeClass("on");
      else $light.addClass("go");
    });
    afficherResultat = true;
    debutJeu = performance.now();
  }, TempJeu);
  timerRedLight = setInterval(function () {
    tabContainerLight.slice(numLight, numLight + 2).addClass("on");
    numLight += 4;
  }, 1000);
}

function arretJeu() {
  jeuEnCours = false;
  clearTimeout(timerRedLight);
  clearTimeout(timerJeu);
  let tempsEcoule = performance.now() - debutJeu;
  compteur = tempsEcoule / 1000; // Convertit le temps en secondes
  if (afficherResultat) {
    result.text(`0${compteur.toFixed(3)}`);
    tryBest();
  } else {
    result.text("Jump Start!");
  }

  result.removeClass("transition");
  setTimeout(function () {
    result.addClass("transition");
  }, 100);

  console.log("jeufini");
}

function tryBest() {
  let time = parseFloat($(".bestTime").text());
  console.log(time);
  let resultTime = parseFloat(result.text());
  time = time === 0 ? resultTime : time;

  resultTime < time
    ? $(".bestTime").text(`0${parseFloat(resultTime).toFixed(3)}`)
    : $(".bestTime").text(`0${parseFloat(time).toFixed(3)}`);
}


