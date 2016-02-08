'use strict';

// google sheet database: https://sheetsu.com/apis/1c962d9f
// for anyone reading the source code of this, I'm sorry for
// using google sheets as a database, it's a bad idea
// but I'm on astatic site, and I don't want to
// take the time to look shit up
function getHighScores() {
  return new Promise(function (resolve, reject) {
    $.get('https://sheetsu.com/apis/1c962d9f', function (data) {
      if (data.success) {
        resolve(data);
      } else {
        reject('couldn\'t make GET request to database');
      }
    });
  });
}

function postHighScore(name, score) {
  $.post('https://sheetsu.com/apis/1c962d9f', { name: name, score: score });
}
//# sourceMappingURL=db.js.map
