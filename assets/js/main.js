$(document).ready(function () {

  // al click del bottone
  $("#button").click(function () {

    // ripulisce il contenuto
    $(".cont-list").html(""); // .html("") per i contenitori (div, span ...)

    // mostra i no mi dei container
    $(".content").css("height", "auto");

    //mostra i pulsanti
    $(".btn").show();

    // aggiunge il nome ai container
    $(".title").show();

    // chiamate film e serie
    callFilm();
    callSerie();

    // controls(frameWidth, scollWidth);

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

    var poster = "";
    if (res.poster_path) {
      poster = '<img src="https://image.tmdb.org/t/p/' + 'w342' + res.poster_path + '">'
    } else {
      poster = '<img src="assets/img/not.jpg">'
    }

    // riempie il template
    var context = {
      poster: poster,
      title: title,
      originalTitle: origTitle,
      flag: insFlag(res.original_language),
      stars: insStars(res.vote_average - 1),
      overview: res.overview
    };
    var html = template(context);

    // aggiungo il contenuto in pagina
    if (type == "film") {
      $(".film-list").append(html);
    } else {
      $(".serie-list").append(html);
    }

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



// // slider
// var currentSliderCount = 0;
// var videoCount = $(".list").children().length;
// var showCount = 3;
// var sliderCount = videoCount / showCount;
// var scollWidth = 0;
// var win = $(window);
// var windowWidth = win.width();
// var frameWidth = win.width() - 80;

// function controls(frameWidth, scollWidth) {
//   var prev = $(".prev");
//   var next = $(".next");

//   next.on("click", function () {
//     scollWidth = scollWidth + frameWidth;
//     $('.list').animate({
//       left: -scollWidth
//     }, 300, function () {
//       if (currentSliderCount >= sliderCount - 1) {
//         $(".list").css("left", 0);
//         currentSliderCount = 0;
//         scollWidth = 0;
//       } else {
//         currentSliderCount++;
//       }
//     });
//   });
//   prev.on("click", function () {
//     scollWidth = scollWidth - frameWidth;
//     $('.list').animate({
//       left: +scollWidth
//     }, 300, function () {
//       currentSliderCount--;
//     });
//   });
// };