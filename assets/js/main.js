$(document).ready(function () {

  // al click del bottone
  $("#button").click(function () {

    // chiamata film e serie
    callFilm();
    callSerie();

    // ripulisce l'input
    $("#input").val(""); // .val("") per gli input

    // ripulisce il contenuto
    $(".cont-list").html(""); // .html("") per i contenitori (div, span ...)

  })

})




// funzione per richiamare i film
function callFilm() {

  // prendo il valore dell'input
  var inputText = $("#input").val().toLowerCase();

  if (inputText.length == 0) {
    alert('Ricerca non valida!');
    return; // esce dalla funzione, non procede con il resto del codice
  }

  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {
      api_key: "27fe9c05fc3ad1a6ce2b0f9a54f8a026",
      query: inputText,
      language: "it - IT"
    },
    success: function (apiUrl) {

      for (var i = 0; i < apiUrl.results.length; i++) {

        // variabile per i risultati
        var res = apiUrl.results[i];

        // converto il valore del voto da /10 a /5
        res.vote_average = parseInt((parseInt(res.vote_average)) / 2);

        // variabili hb
        var source = $("#film-temp").html();
        var template = Handlebars.compile(source);
        var context = {
          filmTitle: res.title,
          originalTitle: res.original_title,
          flag: insFlag(res.original_language),
          stars: insStars(res.vote_average - 1)
        };
        var html = template(context);

        // converto il valore del voto da /10 a /5
        res.vote_average = parseInt((parseInt(res.vote_average)) / 2);

        // aggiungo il contenuto in pagina
        $(".cont-list").append(html);

      }
    },
    error: function () {
      alert("Ricerca non valida");
    }
  });

};





// funzione per richiamare le serie
function callSerie() {

  // prendo il valore dell'input
  var inputText = $("#input").val().toLowerCase();

  if (inputText.length == 0) {
    alert('Ricerca non valida!');
    return; // esce dalla funzione, non procede con il resto del codice
  }

  $.ajax({
    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data: {
      api_key: "27fe9c05fc3ad1a6ce2b0f9a54f8a026",
      query: inputText,
      language: "it - IT"
    },
    success: function (apiUrl) {

      for (var i = 0; i < apiUrl.results.length; i++) {

        // variabile per i risultati
        var res = apiUrl.results[i];

        // variabili hb
        var source = $("#serie-temp").html();
        var template = Handlebars.compile(source);
        var context = {
          serieTitle: res.name,
          originalTitle: res.original_name,
          flag: insFlag(res.original_language),
          stars: insStars(res.vote_average - 1)
        };
        var html = template(context);

        // converto il valore del voto da /10 a /5
        res.vote_average = parseInt((parseInt(res.vote_average)) / 2);

        // aggiungo il contenuto in pagina
        $(".cont-list2").append(html);

      }
    },
    error: function () {
      alert("Ricerca non valida");
    }
  })

}




// funzione per inserire le bandiere al posto della lingua
function insFlag(lang) {
  var flag;
  if (lang == "it") {
    flag = "<img src='assets/img/it.png'";
  } else if (lang == "de") {
    flag = "<img src='assets/img/de.png'";
  } else if (lang == "es") {
    flag = "<img src='assets/img/es.png'";
  } else if (lang == "fr") {
    flag = "<img src='assets/img/fr.png'";
  } else if (lang == "ru") {
    flag = "<img src='assets/img/ru.png'";
  } else if (lang == "en") {
    flag = "<img src='assets/img/usa.png'";
  } else {
    flag = "<img src='assets/img/world.png'";
  }
  return flag
};





// funzione per inserire le stelle al posto del voto
function insStars(vote) {
  var stars = "";
  for (var i = 0; i < 5; i++) {
    if (i <= vote) {
      stars += "<i class='fas fa-star'></i>";
    } else {
      stars += "<i class='far fa-star'></i>";
    }
  }
  return stars
};