$(document).ready(function () {

  $("#button").click(function () {

    // prendo il valore dell'input
    var inputText = $("#input").val().toLowerCase();

    // chiamata ajax
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: "27fe9c05fc3ad1a6ce2b0f9a54f8a026",
        query: inputText
      },
      success: function (apiUrl) {

        for (var i = 0; i < apiUrl.results.length; i++) {

          // imposto le variabili dei dati da stampare in pagina
          var title = apiUrl.results[i].title;
          var originalTitle = apiUrl.results[i].original_title;
          var language = apiUrl.results[i].original_language;
          var vote = apiUrl.results[i].vote_average;

          // variabili hb
          var source = document.getElementById("film-temp").innerHTML;
          var template = Handlebars.compile(source);
          var context = {
            filmTitle: "Titolo: " + title,
            originalTitle: "Titolo originale: " + originalTitle,
            language: "Lingua:" + language,
            vote: "Voto: " + vote
          };
          var html = template(context);

          $(".cont-list").append(html);

          var output = $(".cont-list");

          if (originalTitle.includes(inputText)) {
            output.append(html);
          }

        }
      },
      error: alert("Ricerca non valida")
    })

  })

})