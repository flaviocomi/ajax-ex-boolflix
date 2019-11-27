$(document).ready(function () {

  // al click del bottone
  $("#button").click(function () {

    // ripulisce il contenuto
    $(".cont-list").html(""); // .html("") per i contenitori (div, span ...)

    // chiamate film e serie
    callFilm();
    callSerie();

  })

})






// funzione di chiamata film
function callFilm() {

  // prendo il valore dell'input
  var inputText = $("#input").val().toLowerCase();

  // chiamata ajax film
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",

    data: {
      api_key: "27fe9c05fc3ad1a6ce2b0f9a54f8a026",
      query: inputText,
      language: "it-IT"
    },

    success: function (apiUrl) {

      // variabile per i risultati
      var list = apiUrl.results;

      // inserisce i dati in pagina
      insData("film", list);

      // se l'input è vuoto dà un errore
      if (inputText.length == 0) {
        alert('Ricerca non valida!');
        return; // esce dalla funzione, non procede con il resto del codice
      } else {
        // ripulisce l'input
        $("#input").val(""); // .val("") per gli input
      }

    },

    error: function () {
      alert("Ricerca non valida");
    }

  });

}



// funzione di chiamata serie
function callSerie() {

  // prendo il valore dell'input
  var inputText = $("#input").val().toLowerCase();

  // chiamata ajax serie
  $.ajax({
    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",

    data: {
      api_key: "27fe9c05fc3ad1a6ce2b0f9a54f8a026",
      query: inputText,
      language: "it-IT"
    },

    success: function (apiUrl) {

      // variabile per i risultati
      var list = apiUrl.results;

      // inserisce i dati in pagina
      insData("serie", list);

      // se l'input è vuoto dà un errore
      if (inputText.length == 0) {
        alert('Ricerca non valida!');
        return; // esce dalla funzione, non procede con il resto del codice
      } else {
        // ripulisce l'input
        $("#input").val(""); // .val("") per gli input
      }

    },

    error: function () {
      alert("Ricerca non valida");
    }

  })

}



// funzione che inserisce i dati in pagina
function insData(type, list) {

  // imposta il template
  var source = $("#temp").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < list.length; i++) {

    // variabile per i risultati
    var res = list[i];

    // differenzia film e serie
    var title, origTitle;
    if (type == "film") {
      title = res.title;
      origTitle = res.original_title;
    } else {
      title = res.name;
      origTitle = res.original_name;
    }

    // converte il valore del voto da /10 a /5
    res.vote_average = Math.floor(res.vote_average / 2);

    // riempie il template
    var context = {
      poster: '<img src="https://image.tmdb.org/t/p/' + 'w185' + res.poster_path + '">',
      type: type,
      title: title,
      originalTitle: origTitle,
      flag: insFlag(res.original_language),
      stars: insStars(res.vote_average - 1)
    };
    var html = template(context);

    // aggiungo il contenuto in pagina
    $(".cont-list").append(html);

  }

}




// funzione per inserire le bandiere al posto della lingua
function insFlag(lang) {

  var flag = [
    "it",
    "de",
    "es",
    "fr",
    "ru",
    "en"
  ];

  if (flag.includes(lang)) {
    return "<img src='assets/img/" + lang + ".png'>";
  }

  return "";

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