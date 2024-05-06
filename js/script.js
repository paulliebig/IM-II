const cocktailTitle = document.querySelector('#cocktailTitle');
const recipeDetails = document.querySelector('#recipeDetails');

// Zugriff auf die Wetterdaten und das Dropdown-Menü
const weatherDataDiv = document.querySelector('#weatherData');
const citySelect = document.querySelector('#citySelect');

// Event-Listener für die Dropdown-Auswahl
citySelect.addEventListener('change', function () {
    const selectedUrl = this.value;
    updateWeather(selectedUrl);
});

// Standardmäßig die Wetterdaten der ersten Stadt abrufen
updateWeather(citySelect.value);

async function updateWeather(url) {
    let weatherData = await fetchData(url);

    // Extrahiere die Wetterdaten
    let currentWeather = weatherData.current; // Je nach API-Pfad anpassen
    let temperature = currentWeather.temperature_2m || 0;
    let rain = currentWeather.rain || 0; // Niederschlag in mm
    let snowfall = currentWeather.snowfall || 0; // Schneefall in mm
    let cloudCover = currentWeather.cloud_cover || 0; // Wolkenbedeckung in %

    // Passendes Wetter-Icon auswählen
    let weatherIcon = '';
    let selectedCocktail = {};

    if (snowfall !== 0 && rain === 0) {
        weatherIcon = 'img/wi-snow.svg';
        selectedCocktail = getRandomItem(snowyCocktails);
    } else if (rain !== 0) {
        weatherIcon = 'img/wi-rain.svg';
        selectedCocktail = getRandomItem(rainyCocktails);
    } else if (cloudCover > 30) {
        weatherIcon = 'img/wi-cloudy.svg';
        selectedCocktail = getRandomItem(cloudyCocktails);
    } else if (rain === 0 && snowfall === 0 && cloudCover <= 30) {
        weatherIcon = 'img/wi-day-sunny.svg';
        selectedCocktail = getRandomItem(sunnyCocktails);
    }

    // Ausgabe des Wetterberichts mit passendem Icon
    weatherDataDiv.innerHTML = `
        <div style="display: flex; align-items: center;">
            <img src="${weatherIcon}" alt="Wetter-Icon" style="width: 160px; height: 160px;">
            <div style="margin-left: 20px;">
                <p>Temperatur: ${temperature}°C</p>
                <p>Regen: ${rain} mm</p>
                <p>Schneefall: ${snowfall} mm</p>
                <p>Wolkenbedeckung: ${cloudCover}%</p>
            </div>
        </div>
    `;

    // Passenden Cocktail anzeigen
    cocktailTitle.textContent = selectedCocktail.name;
    recipeDetails.innerHTML = `
        <p><strong>Beschreibung:</strong> ${selectedCocktail.description}</p>
        <p><strong>Rezept:</strong><br>${selectedCocktail.recipe}</p>
    `;

    let cocktailBlock = document.querySelector('#cocktailBlock');
    cocktailBlock.style.backgroundImage = `url('${selectedCocktail.image}')`;
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Cocktail-Listen für die verschiedenen Wetterkategorien

const sunnyCocktails = [
    {
        name: "Piña Colada",
        description: "Ein tropischer, cremiger Cocktail, der die süßen Aromen von Ananas und Kokos vereint.",
        recipe: "60 ml weißer Rum<br>90 ml Ananassaft<br>30 ml Kokoscreme<br>Eiswürfel<br>Alle Zutaten im Mixer mischen, in ein Glas gießen und mit Ananas und Kirsche garnieren.",
        image: "img/PinaColada.jpg"
    },
    {
        name: "Daiquiri",
        description: "Ein klassischer, erfrischender Rum-Cocktail mit einem lebhaften Hauch von Limette.",
        recipe: "60 ml Rum<br>30 ml Limettensaft<br>15 ml Zuckersirup<br>Alle Zutaten mit Eis shaken, in ein gekühltes Glas abseihen.",
        image: "img/Daiquiri.jpg"
    },
    {
        name: "Margarita",
        description: "Ein mexikanischer Favorit, der Tequila und Limette kombiniert.",
        recipe: "60 ml Tequila<br>30 ml Cointreau<br>30 ml Limettensaft<br>Mit Eis shaken, auf Eis in ein Glas abseihen, vorher den Glasrand mit Salz bestreuen.",
        image: "img/Margarita.jpg"
    },
    {
        name: "Mai Tai",
        description: "Ein exotischer Cocktail mit einer Kombination aus Rum und Mandelsirup.",
        recipe: "30 ml weißer Rum<br>30 ml dunkler Rum<br>15 ml Orange Curaçao<br>15 ml Mandelsirup<br>10 ml Limettensaft<br>Alle Zutaten mit Eis shaken, in ein Glas mit Eis abseihen, mit Minze garnieren.",
        image: "img/MaiTai.jpg"
    },
    {
        name: "Mojito",
        description: "Der erfrischende kubanische Cocktail mit Minze und Limette.",
        recipe: "60 ml Rum<br>30 ml Limettensaft<br>15 ml Zuckersirup<br>Minzblätter und Sodawasser<br>Minzblätter zerstoßen, Rum, Limettensaft und Zuckersirup dazugeben, mit Sodawasser auffüllen.",
        image: "img/Mojito.jpg"
    }
];

const rainyCocktails = [
    {
        name: "Dark 'n' Stormy",
        description: "Ein würziger Cocktail, der mit dunklem Rum und Ginger Beer perfekt harmoniert.",
        recipe: "60 ml dunkler Rum<br>120 ml Ginger Beer<br>15 ml Limettensaft<br>Im Glas mit Eis mischen, mit Limette garnieren.",
        image: "img/DarknStormy.jpg"
    },
    {
        name: "Hot Toddy",
        description: "Ein Heißgetränk mit Whiskey, Honig und Zitrone.",
        recipe: "60 ml Whiskey<br>1 EL Honig<br>15 ml Zitronensaft<br>Heißes Wasser<br>Whiskey, Honig und Zitronensaft in einer Tasse mischen, mit heißem Wasser auffüllen.",
        image: "img/HotToddy.jpg"
    },
    {
        name: "Irish Coffee",
        description: "Ein heißer Drink mit Whiskey und Kaffee, gekrönt mit Sahne.",
        recipe: "40 ml Irish Whiskey<br>1 EL brauner Zucker<br>Frisch gebrühter Kaffee<br>Schlagsahne<br>Whiskey und Zucker in einem Glas mischen, mit Kaffee auffüllen, Schlagsahne darauf geben.",
        image: "img/IrishCoffee.jpg"
    },
    {
        name: "Amaretto Sour",
        description: "Ein süß-saurer Cocktail, dessen nussiger Amaretto-Geschmack durch Zitronensaft ergänzt wird.",
        recipe: "45 ml Amaretto<br>30 ml Zitronensaft<br>15 ml Zuckersirup<br>Mit Eis shaken, in ein Glas abseihen, mit Kirsche garnieren.",
        image: "img/AmarettoSour.jpg"
    },
    {
        name: "Rusty Nail",
        description: "Ein reichhaltiger Cocktail, der die Kräuternote des Drambuie mit Scotch verbindet.",
        recipe: "45 ml Scotch Whisky<br>25 ml Drambuie<br>Im Glas mit Eis rühren, mit einer Zitronenschale garnieren.",
        image: "img/RustyNail.jpg"
    }
];

const snowyCocktails = [
    {
        name: "Hot Buttered Rum",
        description: "Ein wärmender, buttriger Cocktail mit Rum und Gewürzen.",
        recipe: "60 ml Rum<br>1 EL Butter<br>1 EL brauner Zucker<br>1 Prise Muskat und Zimt<br>Mit heißem Wasser in einer Tasse mischen.",
        image: "img/HotButteredRum.jpg"
    },
    {
        name: "Mulled Wine (Glühwein)",
        description: "Ein traditioneller, gewürzter Heißwein mit Zimt, Nelken und Zitrus.",
        recipe: "1 Flasche Rotwein<br>1 Zimtstange<br>2 Nelken<br>1 Orange<br>Rotwein mit den Gewürzen und Orangenstücken erhitzen (nicht kochen) und ziehen lassen.",
        image: "img/MulledWine.jpg"
    },
    {
        name: "Eggnog",
        description: "Ein cremiger, festlicher Cocktail mit Eiern, Bourbon und Sahne.",
        recipe: "60 ml Bourbon<br>1 Ei<br>30 ml Sahne<br>15 ml Zuckersirup<br>Mit Eis shaken, in ein Glas abseihen, Muskat darüber streuen.",
        image: "img/Eggnog.jpg"
    },
    {
        name: "Tom & Jerry",
        description: "Ein schaumiger Cocktail, der heiße Milch mit Gewürzen und Rum kombiniert.",
        recipe: "1 Eiweiß<br>1 Eigelb<br>1 EL Puderzucker<br>60 ml heiße Milch<br>30 ml Rum<br>Eiweiß und Eigelb mit Zucker schlagen, in einer Tasse mit Milch und Rum mischen.",
        image: "img/TomJerry.jpg"
    },
    {
        name: "Irish Coffee",
        description: "Ein heißer Drink mit Whiskey und Kaffee, gekrönt mit Sahne.",
        recipe: "40 ml Irish Whiskey<br>1 EL brauner Zucker<br>Frisch gebrühter Kaffee<br>Schlagsahne<br>Whiskey und Zucker in einem Glas mischen, mit Kaffee auffüllen, Schlagsahne darauf geben.",
        image: "img/IrishCoffee.jpg"
    }
];

const cloudyCocktails = [
    {
        name: "Moscow Mule",
        description: "Ein würziger Vodka-Cocktail mit Ginger Beer.",
        recipe: "60 ml Vodka<br>120 ml Ginger Beer<br>15 ml Limettensaft<br>In einem Kupferbecher oder Glas mit Eis mischen, mit Limette garnieren.",
        image: "img/MoscowMule.jpg"
    },
    {
        name: "Cosmopolitan",
        description: "Ein fruchtiger, pinker Cocktail mit Vodka und Cranberrysaft.",
        recipe: "45 ml Vodka<br>15 ml Triple Sec<br>30 ml Cranberrysaft<br>10 ml Limettensaft<br>Alles mit Eis shaken, in ein Glas abseihen, mit einer Orangenschale garnieren.",
        image: "img/Cosmopolitan.jpg"
    },
    {
        name: "Negroni",
        description: "Ein bittersüßer Cocktail mit Gin, Campari und Wermut.",
        recipe: "30 ml Gin<br>30 ml Campari<br>30 ml roter Wermut<br>Alles mit Eis rühren, in ein Glas abseihen, mit einer Orangenscheibe garnieren.",
        image: "img/Negroni.jpg"
    },
    {
        name: "Whiskey Sour",
        description: "Ein perfekt ausgewogener Drink mit Whiskey, Zitrone und Zucker.",
        recipe: "60 ml Whiskey<br>30 ml Zitronensaft<br>15 ml Zuckersirup<br>Mit Eis shaken, in ein Glas abseihen, mit einer Kirsche garnieren.",
        image: "img/WhiskeySour.jpg"
    },
    {
        name: "Old Fashioned",
        description: "Ein einfacher, aber raffinierter Cocktail mit Whiskey und Angostura Bitter.",
        recipe: "60 ml Bourbon oder Rye Whiskey<br>1 Stück Würfelzucker<br>2 Spritzer Angostura Bitter<br>Würfelzucker mit Bitter und Wasser zerstoßen, Whiskey und Eis dazugeben, rühren.",
        image: "img/OldFashioned.jpg"
    }
];

async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
