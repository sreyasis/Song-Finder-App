const songContainer = document.getElementById('songs');
var term = "";

function updateTerm() {
  term = document.getElementById('searchInput').value;

  if (!term || term === '') {
    alert('please enter a search term')
  } else {
    // This will remove all the children of songs if they exist 
    // Without this, a new search will append onto the last search
    while (songs.firstChild) {
      songs.removeChild(songs.firstChild);
    }

    var url = `https://itunes.apple.com/search?&media=music&term=${term}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        var artists = data.results;
        return artists.map(function (result) {
          var article = document.createElement('article'),
            img = document.createElement('img'),
            artist = document.createElement('p');
          song = document.createElement('p');
          audio = document.createElement('audio');
          audioSource = document.createElement('source');

          artist.innerHTML = result.artistName;
          song.innerHTML = result.trackName;
          img.src = result.artworkUrl100;
          audioSource.src = result.previewUrl;
          // add this to make the player appear:
          audio.setAttribute('controls', '');

          article.appendChild(img);
          article.appendChild(artist);
          article.appendChild(song);
          article.appendChild(audio);
          audio.appendChild(audioSource);
          songContainer.appendChild(article);
        })
      })
      .catch(function (error) {
        console.log('Request failed:', error);
      });
  }
}

document.addEventListener('play', function (event) {
  var audio = document.getElementsByTagName('audio');
  for (var i = 0; i < audio.length; i++) {
    if (audio[i] != event.target) {
      audio[i].pause();
    }
  }
}, true);
