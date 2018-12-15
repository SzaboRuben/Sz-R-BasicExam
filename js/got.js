function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  putUserDatasInOrder(userDatas);
  var filteredData = removeDeadFromData(userDatas);
  displayDivMain(filteredData);
  displaySearchField(filteredData);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function putUserDatasInOrder(userDatas) {
  userDatas.sort(function unnamed(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    return -1;
  });
}

function removeDeadFromData(userDatas) {
  var filteredUserDatas = [];
  for (var i = 0; i < userDatas.length; i += 1) {
    if (!userDatas[i].dead) {
      filteredUserDatas.push(userDatas[i]);
    }
  }
  console.log(filteredUserDatas);
  return filteredUserDatas;
}

function displayDivMain(userDatas) {
  var divMain = document.getElementById('div_main');
  for (var i = 0; i < userDatas.length; i += 1) {
    var div = document.createElement('div');
    div.className = ('div__pic');
    div.innerHTML = `<img src="${userDatas[i].portrait}"> <br> <p>${userDatas[i].name} <p>`;
    divMain.appendChild(div);
    addListener(div, i, userDatas);
  }
}

function addListener(div, i, userDatas) {
  div.addEventListener('click', function noname() {
    searchResultTwo(userDatas[i]);
  });
}

function searchResultTwo(character) {
  var searchresult = document.getElementById('searchresult');
  var picture = document.createElement('div');
  searchresult.innerHTML = '';

  if (!character.house) {
    picture.innerHTML =
      `
    <img class="searchresult__pic" src="${character.picture}">
    <div class="searchresult__charname">${character.name} </div>
    <div class="searchresult__house"></div>
    <div class="searchresult__bio">${character.bio}<div>
    `;
  } else if (searchresult.innerHTML === '' && character.picture) {
    picture.innerHTML =
      `
    <img class="searchresult__pic" src="${character.picture}">
    <div class="searchresult__charname">${character.name} </div>
    <div class="searchresult__house"> <img src="/assets/houses/${character.house}.png" ></div>
    <div class="searchresult__bio">${character.bio}<div>
    `;
  } else {
    picture.innerHTML =
      `
    <div class="searchresult__pic"> No picrute for this character</div>
    <div class="searchresult__charname">${character.name} </div>
    <div class="searchresult__house"> <img src="/assets/houses/${character.house}.png" ></div>
    <div class="searchresult__bio">${character.bio}<div>
    `;
  }
  searchresult.appendChild(picture);
}

function displaySearchField(filteredData) {
  var searchfield = document.getElementById('searchfield');
  var searchButton = document.createElement('input');
  searchButton.type = ('button');
  searchButton.value = ('search');
  searchButton.className = ('searchButton');
  var searchInput = document.createElement('input');
  searchInput.type = ('text');
  searchInput.placeholder = ('Search for a character');
  searchfield.appendChild(searchButton);
  searchfield.appendChild(searchInput);
  buttonEventListener(searchButton, searchInput, filteredData);
}

function buttonEventListener(searchButton, searchInput, filteredData) {
  searchButton.addEventListener('click', function unnamed() {
    var name = searchInput.value.toLowerCase();
    searchResultOne(filteredData, name);
  });
}


function searchResultOne(filteredData, searchedCharacter) {
  var searchresult = document.getElementById('searchresult');
  var picture = document.createElement('div');
  console.log(searchedCharacter);

  for (var i = 0; i < filteredData.length; i += 1) {
    if (filteredData[i].name.toLowerCase() !== searchedCharacter) {
      picture.innerHTML = '„Character not found”';
    } else {
      break;
    }
  }
  searchresult.innerHTML = '';

  if (!filteredData[i].house) {
    picture.innerHTML =
      `
    <img class="searchresult__pic" src="${filteredData[i].picture}">
    <div class="searchresult__charname">${filteredData[i].name} </div>
    <div class="searchresult__house"></div>
    <div class="searchresult__bio">${filteredData[i].bio}<div>
    `;
  } else if (searchresult.innerHTML === '' && filteredData[i].picture) {
    picture.innerHTML =
      `
    <img class="searchresult__pic" src="${filteredData[i].picture}">
    <div class="searchresult__charname">${searchedCharacter} </div>
    <div class="searchresult__house"> <img src="/assets/houses/${filteredData[i].house}.png" ></div>
    <div class="searchresult__bio">${filteredData[i].bio}<div>
    `;
  } else {
    picture.innerHTML =
      `
    <div class="searchresult__pic"> No picrute for this character</div>
    <div class="searchresult__charname">${searchedCharacter} </div>
    <div class="searchresult__house"> <img src="/assets/houses/${filteredData[i].house}.png" ></div>
    <div class="searchresult__bio">${filteredData[i].bio}<div>
    `;
  }
  searchresult.appendChild(picture);
}
