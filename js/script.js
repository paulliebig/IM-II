// Zuordnung von URL zu Stadtname für die Anzeige
const cityNames = {
    'https://api.open-meteo.com/v1/forecast?latitude=46.948&longitude=7.447&current=temperature_2m,rain,snowfall,cloud_cover': 'Bern',
    'https://api.open-meteo.com/v1/forecast?latitude=25.79&longitude=-80.13&current=temperature_2m,rain,snowfall,cloud_cover': 'Miami',
    'https://api.open-meteo.com/v1/forecast?latitude=46.80&longitude=-71.21&current=temperature_2m,rain,snowfall,cloud_cover': 'Quebec',
    'https://api.open-meteo.com/v1/forecast?latitude=22.29&longitude=114.15&current=temperature_2m,rain,snowfall,cloud_cover': 'Hongkong',
    'https://api.open-meteo.com/v1/forecast?latitude=-34.65&longitude=-58.39&current=temperature_2m,rain,snowfall,cloud_cover': 'Buenos Aires'
};

// Zugriff auf die Elemente der Seite
const cocktailTitle = document.querySelector('#cocktailTitle');
const recipeDetails = document.querySelector('#recipeDetails');
const weatherDataDiv = document.querySelector('#weatherData');
const weatherIconImg = document.querySelector('#weatherIcon');
const citySelect = document.querySelector('#citySelect');

// Event-Listener für die Dropdown-Auswahl
citySelect.addEventListener('change', function () {
    const selectedUrl = this.value;
    updateWeather(selectedUrl);
});

// Standardmäßig die Wetterdaten der ersten Stadt abrufen
updateWeather(citySelect.value);

// Funktion zum Abrufen und Aktualisieren der Wetterdaten
async function updateWeather(url) {
    let weatherData = await fetchData(url);

    // Extrahiere die Wetterdaten
    let currentWeather = weatherData.current;
    let temperature = currentWeather.temperature_2m || 0;
    let rain = currentWeather.rain || 0; // Niederschlag in mm
    let snowfall = currentWeather.snowfall || 0; // Schneefall in mm
    let cloudCover = currentWeather.cloud_cover || 0; // Wolkenbedeckung in %

    // Passendes Wetter-Icon und Wetterkategorie auswählen
    let weatherIcon = '';
    if (snowfall !== 0 && rain === 0) {
        weatherIcon = 'img/wi-snow.svg';
        currentWeatherCategory = 'snowfall';
    } else if (rain !== 0) {
        weatherIcon = 'img/wi-rain.svg';
        currentWeatherCategory = 'rainy';
    } else if (cloudCover > 30) {
        weatherIcon = 'img/wi-cloudy.svg';
        currentWeatherCategory = 'cloudy';
    } else {
        weatherIcon = 'img/wi-day-sunny.svg';
        currentWeatherCategory = 'sunny';
    }

    // Setze das Wetter-Icon im entsprechenden img-Element
    weatherIconImg.src = weatherIcon;

    // Ausgabe der Wetterdaten
    weatherDataDiv.innerHTML = `
        <h1>Wetter in ${cityNames[url]}</h1>
        <h3>Temperatur: ${temperature}°C</h3>
        <h3>Regen: ${rain} mm</h3>
        <h3>Schneefall: ${snowfall} mm</h3>
        <h3>Wolkenbedeckung: ${cloudCover}%</h3>
    `;

    // Passenden Cocktail anzeigen
    const selectedCocktail = getCocktailByWeather(currentWeatherCategory);
    updateCocktailDisplay(selectedCocktail);
}

// Funktion zum Abrufen der Daten von der API
async function fetchData(url) {
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// Funktion zum zufälligen Auswählen eines Cocktails
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Cocktail-Listen für die verschiedenen Wetterkategorien
const sunnyCocktails = [
    // Cocktail-Objekte für sonniges Wetter
    { name: "Piña Colada", description: "Ein tropischer, cremiger Cocktail, der die süßen Aromen von Ananas und Kokos vereint.", recipe: "60 ml weißer Rum<br>90 ml Ananassaft<br>30 ml Kokoscreme<br>Eiswürfel<br>Alle Zutaten im Mixer mischen, in ein Glas gießen und mit Ananas und Kirsche garnieren.", image: "img/PinaColada.jpg" },
    { name: "Daiquiri", description: "Ein klassischer, erfrischender Rum-Cocktail mit einem lebhaften Hauch von Limette.", recipe: "60 ml Rum<br>30 ml Limettensaft<br>15 ml Zuckersirup<br>Alle Zutaten mit Eis shaken, in ein gekühltes Glas abseihen.", image: "img/Daiquiri.jpg" },
    { name: "Margarita", description: "Ein mexikanischer Favorit, der Tequila und Limette kombiniert.", recipe: "60 ml Tequila<br>30 ml Cointreau<br>30 ml Limettensaft<br>Mit Eis shaken, auf Eis in ein Glas abseihen, vorher den Glasrand mit Salz bestreuen.", image: "img/Margarita.jpg" },
    { name: "Mai Tai", description: "Ein exotischer Cocktail mit einer Kombination aus Rum und Mandelsirup.", recipe: "30 ml weißer Rum<br>30 ml dunkler Rum<br>15 ml Orange Curaçao<br>15 ml Mandelsirup<br>10 ml Limettensaft<br>Alle Zutaten mit Eis shaken, in ein Glas mit Eis abseihen, mit Minze garnieren.", image: "img/MaiTai.jpg" },
    { name: "Mojito", description: "Der erfrischende kubanische Cocktail mit Minze und Limette.", recipe: "60 ml Rum<br>30 ml Limettensaft<br>15 ml Zuckersirup<br>Minzblätter und Sodawasser<br>Minzblätter zerstoßen, Rum, Limettensaft und Zuckersirup dazugeben, mit Sodawasser auffüllen.", image: "img/Mojito.jpg" }
];

const rainyCocktails = [
    // Cocktail-Objekte für regnerisches Wetter
    { name: "Dark 'n' Stormy", description: "Ein würziger Cocktail, der mit dunklem Rum und Ginger Beer perfekt harmoniert.", recipe: "60 ml dunkler Rum<br>120 ml Ginger Beer<br>15 ml Limettensaft<br>Im Glas mit Eis mischen, mit Limette garnieren.", image: "img/DarknStormy.jpg" },
    { name: "Hot Toddy", description: "Ein Heißgetränk mit Whiskey, Honig und Zitrone.", recipe: "60 ml Whiskey<br>1 EL Honig<br>15 ml Zitronensaft<br>Heißes Wasser<br>Whiskey, Honig und Zitronensaft in einer Tasse mischen, mit heißem Wasser auffüllen.", image: "img/HotToddy.jpg" },
    { name: "Irish Coffee", description: "Ein heißer Drink mit Whiskey und Kaffee, gekrönt mit Sahne.", recipe: "40 ml Irish Whiskey<br>1 EL brauner Zucker<br>Frisch gebrühter Kaffee<br>Schlagsahne<br>Whiskey und Zucker in einem Glas mischen, mit Kaffee auffüllen, Schlagsahne darauf geben.", image: "img/IrishCoffee.jpg" },
    { name: "Amaretto Sour", description: "Ein süß-saurer Cocktail, dessen nussiger Amaretto-Geschmack durch Zitronensaft ergänzt wird.", recipe: "45 ml Amaretto<br>30 ml Zitronensaft<br>15 ml Zuckersirup<br>Mit Eis shaken, in ein Glas abseihen, mit Kirsche garnieren.", image: "img/AmarettoSour.jpg" },
    { name: "Rusty Nail", description: "Ein reichhaltiger Cocktail, der die Kräuternote des Drambuie mit Scotch verbindet.", recipe: "45 ml Scotch Whisky<br>25 ml Drambuie<br>Im Glas mit Eis rühren, mit einer Zitronenschale garnieren.", image: "img/RustyNail.jpg" }
];

const snowyCocktails = [
    // Cocktail-Objekte für verschneites Wetter
    { name: "Hot Buttered Rum", description: "Ein wärmender, buttriger Cocktail mit Rum und Gewürzen.", recipe: "60 ml Rum<br>1 EL Butter<br>1 EL brauner Zucker<br>1 Prise Muskat und Zimt<br>Mit heißem Wasser in einer Tasse mischen.", image: "img/HotButteredRum.jpg" },
    { name: "Mulled Wine (Glühwein)", description: "Ein traditioneller, gewürzter Heißwein mit Zimt, Nelken und Zitrus.", recipe: "1 Flasche Rotwein<br>1 Zimtstange<br>2 Nelken<br>1 Orange<br>Rotwein mit den Gewürzen und Orangenstücken erhitzen (nicht kochen) und ziehen lassen.", image: "img/MulledWine.jpg" },
    { name: "Eggnog", description: "Ein cremiger, festlicher Cocktail mit Eiern, Bourbon und Sahne.", recipe: "60 ml Bourbon<br>1 Ei<br>30 ml Sahne<br>15 ml Zuckersirup<br>Mit Eis shaken, in ein Glas abseihen, Muskat darüber streuen.", image: "img/Eggnog.jpg" },
    { name: "Tom & Jerry", description: "Ein schaumiger Cocktail, der heiße Milch mit Gewürzen und Rum kombiniert.", recipe: "1 Eiweiß<br>1 Eigelb<br>1 EL Puderzucker<br>60 ml heiße Milch<br>30 ml Rum<br>Eiweiß und Eigelb mit Zucker schlagen, in einer Tasse mit Milch und Rum mischen.", image: "img/TomJerry.jpg" },
    { name: "Irish Coffee", description: "Ein heißer Drink mit Whiskey und Kaffee, gekrönt mit Sahne.", recipe: "40 ml Irish Whiskey<br>1 EL brauner Zucker<br>Frisch gebrühter Kaffee<br>Schlagsahne<br>Whiskey und Zucker in einem Glas mischen, mit Kaffee auffüllen, Schlagsahne darauf geben.", image: "img/IrishCoffee.jpg" }
];

const cloudyCocktails = [
    // Cocktail-Objekte für bewölktes Wetter
    { name: "Moscow Mule", description: "Ein würziger Vodka-Cocktail mit Ginger Beer.", recipe: "60 ml Vodka<br>120 ml Ginger Beer<br>15 ml Limettensaft<br>In einem Kupferbecher oder Glas mit Eis mischen, mit Limette garnieren.", image: "img/MoscowMule.jpg" },
    { name: "Cosmopolitan", description: "Ein fruchtiger, pinker Cocktail mit Vodka und Cranberrysaft.", recipe: "45 ml Vodka<br>15 ml Triple Sec<br>30 ml Cranberrysaft<br>10 ml Limettensaft<br>Alles mit Eis shaken, in ein Glas abseihen, mit einer Orangenschale garnieren.", image: "img/Cosmopolitan.jpg" },
    { name: "Negroni", description: "Ein bittersüßer Cocktail mit Gin, Campari und Wermut.", recipe: "30 ml Gin<br>30 ml Campari<br>30 ml roter Wermut<br>Alles mit Eis rühren, in ein Glas abseihen, mit einer Orangenscheibe garnieren.", image: "img/Negroni.jpg" },
    { name: "Whiskey Sour", description: "Ein perfekt ausgewogener Drink mit Whiskey, Zitrone und Zucker.", recipe: "60 ml Whiskey<br>30 ml Zitronensaft<br>15 ml Zuckersirup<br>Mit Eis shaken, in ein Glas abseihen, mit einer Kirsche garnieren.", image: "img/WhiskeySour.jpg" },
    { name: "Old Fashioned", description: "Ein einfacher, aber raffinierter Cocktail mit Whiskey und Angostura Bitter.", recipe: "60 ml Bourbon oder Rye Whiskey<br>1 Stück Würfelzucker<br>2 Spritzer Angostura Bitter<br>Würfelzucker mit Bitter und Wasser zerstoßen, Whiskey und Eis dazugeben, rühren.", image: "img/OldFashioned.jpg" }
];

// Funktion zur Auswahl eines Cocktails basierend auf der Wetterkategorie
function getCocktailByWeather(weather) {
    const cocktailCategories = {
        sunny: sunnyCocktails,
        rainy: rainyCocktails,
        cloudy: cloudyCocktails,
        snowfall: snowyCocktails
    };

    const categoryCocktails = cocktailCategories[weather];
    return getRandomItem(categoryCocktails);
}

// Funktion zur Aktualisierung der Cocktail-Anzeige
function updateCocktailDisplay(cocktail) {
    cocktailTitle.textContent = cocktail.name;
    recipeDetails.innerHTML = `
        <p><strong>Beschreibung:<br></strong> ${cocktail.description}</p><br>
        <p><strong>Rezept:</strong><br>${cocktail.recipe}</p>
    `;
    document.querySelector('#cocktailBlock').style.backgroundImage = `url('${cocktail.image}')`;
}

// Event-Listener für den Button zum Ändern des Cocktails
document.getElementById('changeCocktail').addEventListener('click', function() {
    const currentWeather = getCurrentWeather();
    const newCocktail = getCocktailByWeather(currentWeather);
    updateCocktailDisplay(newCocktail);
});

// Globale Variable für die aktuelle Wetterkategorie
let currentWeatherCategory = '';

// Funktion zum Abrufen der aktuellen Wetterkategorie
function getCurrentWeather() {
    return currentWeatherCategory;
}

// Initiale Fade-in-Animation beim Laden der Seite
window.onload = function() {
    document.body.classList.add('fade-in');
};

// Optimierte updateCocktailDisplay Funktion
function updateCocktailDisplay(cocktail) {
    // Entferne alte Klassen und aktualisiere die Inhalte
    cocktailTitle.classList.remove('fade-in', 'hidden');
    recipeDetails.classList.remove('fade-in', 'hidden');
    let cocktailBlock = document.querySelector('#cocktailBlock');
    cocktailBlock.classList.remove('fade-in-background', 'hidden');

    // Setze neue Inhalte und Hintergrundbild
    cocktailTitle.textContent = cocktail.name;
    recipeDetails.innerHTML = `
        <p><strong>Beschreibung:<br></strong> ${cocktail.description}</p><br>
        <p><strong>Rezept:</strong><br>${cocktail.recipe}</p>
    `;
    cocktailBlock.style.backgroundImage = `url('${cocktail.image}')`;

    // Füge Fade-in-Klassen hinzu, um die Animationen zu starten
    setTimeout(() => {
        cocktailTitle.classList.add('fade-in');
        recipeDetails.classList.add('fade-in');
        cocktailBlock.classList.add('fade-in-background');
    }, 10);
}
