//1997185777116500

const key = 1997185777116500;

const url = `https://www.superheroapi.com/api.php/${key}/search/`;

let form = document.getElementById('form-control');

// Events
form.addEventListener("keyup", (e) => {
    const search = e.target.value;
    let val = form.value;
    console.log("Searching for: ", search);
    if(search.length < 3) {
        document.getElementById('cards').innerHTML = "Please add more than 3 characters";
    } else {
        setTimeout(getData(search), 1000);
    }
});

// Getting data
function getData(val) {
    let new_url = url + val;
    fetch(new_url)
    .then((res) => {
        //console.log(res);
        return res.json();
    })
    .then((data) => {
        //console.log(data["results"]);
        let result = data["results"];
        rendering(result); 
    });
}

// Rendering the result
function rendering(result) {
    var results = document.getElementById('cards');
    results.remove();
    let container = document.getElementById('container');
    var results = document.createElement('div');
    results.id = "cards";
    results.className = "cards";
    container.appendChild(results);
    result.forEach((ele) => {
        //console.log(ele.name);
        results.appendChild(getCard(ele));
        //console.log(results);
    });
} 

// getting cards
function getCard(ele) {
    let cards = document.createElement('div');
    cards.classList = "h-100";
    cards.classList = "card";
    cards.style.width = "20rem";

    //console.log(ele);

    cards.innerHTML = `
        <img src=${JSON.stringify(ele["image"].url)} class="card-img" alt=".." />
        <div class="card-body">
            <h5 class="card-title">${ele["name"]}</h5>
            <ul class="card-text">
                <li>Full Name: <span> ${JSON.stringify(ele["biography"]["full-name"])}</span></li>
                <li>Birth Place: <span> ${JSON.stringify(ele["biography"]["place-of-birth"])}</span></li>
                <li>Powerstats: <span> ${JSON.stringify(
                Math.round(
                    (JSON.parse(ele["powerstats"]["intelligence"]) +
                    JSON.parse(ele["powerstats"]["strength"]) +
                    JSON.parse(ele["powerstats"]["speed"]) +
                    JSON.parse(ele["powerstats"]["durability"]) +
                    JSON.parse(ele["powerstats"]["power"]) +
                    JSON.parse(ele["powerstats"]["combat"])) / 6
                ))}</span></li>
                <li>First Appearance: <span>${JSON.stringify(ele["biography"]["first-appearance"])}</span></li>
            </ul>
            <button onclick={favClick()} class="btn btn-dark" >Add To Favourites</button>
        </div>
    `;
    return cards;
}
