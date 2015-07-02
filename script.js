var songList = document.getElementById("song-list");

var songPlayer = document.createElement("audio");
document.body.appendChild(songPlayer);	

var songNumber = document.getElementById("resultNumber");

var attach = function(songs){
	
	if (songNumber.textContent != songs.length){
		songNumber.textContent = songs.length;
	}

	songList.innerHTML = "";
	songs.forEach(function (song){
		var songElem = createSongElement(song);
		songList.appendChild(songElem);
	});
}

var search = function(query){
	superagent
		//.get('http://api.deezer.com/search')
		//.query({q: query})

		//using proxy because of problems with CORS
		.get('http://jsonp.afeld.me?url=http://api.deezer.com/search?q='+ query)

		.end(function(err,res){
			console.log(res.body.data);
			attach(res.body.data);
	});
}

var searchField = document.getElementById("search");

searchField.addEventListener("keydown", function(event){ 
	search(searchField.value);
});

var createSongElement = function(song){
	var songElement = document.createElement("li");
	songElement.setAttribute("class", "collection-item avatar");
	
	var author = document.createElement("span");
	author.setAttribute("class", "title");
	author.textContent= song.artist.name;

	var titleName = document.createElement("p");
	titleName.textContent=song.title;

	var albumCover = document.createElement("img");
	albumCover.setAttribute("class", "circle");
	albumCover.src = song.album.cover;
	albumCover.addEventListener("click", function(event){

		if (songPlayer.src == song.preview){
			 songPlayer.pause();
		}
		else{
			songPlayer.src = song.preview;
			songPlayer.play();
		}
	});

	
	songElement.appendChild(albumCover);
	songElement.appendChild(author);
	songElement.appendChild(titleName);
	return songElement;
}


