// this is just a place for my api response ideas
let returnobj;

// routes for characters
// GET /characters (all characters)
// GET /characters/main (set an index for this fauna?)
// GET /characters/recurring
// GET /characters/:id/details
// GET /showInfo

// allow the user to request updates to the database that i will review and approve
// POST /characters/new
// POST /characters/:id/update

// /characters/main

returnobj = [
  {
    id: 1,
    name: "Nick Miller",
    age: 30,
    occupation: "Bartender", // could be an array of occupations
    occupations: ["Bartender", "Writer"],
    image: "",
    type: "main",
  },
];

// /characters/recurring

returnobj = [
  {
    id: 1,
    name: "Coach",
    age: 30,
    image: "",
    seeThem: [
      {
        season: 1,
        episode: 1,
      },
    ],
  },
];

// characters/:id/
// this is basically the /characters/:id/alldata route
returnobj = [
  {
    id: 1,
    name: "Nick Miller",
    age: 30,
    occupation: "Bartender",
    birthPlace: "Chicago",
    likes: "Cookies",
    dislikes: "Lawyers",
    finalQuote: "",
    ethnicity: "White",
    actor: "Jake Johnson",
    // --- quotes could also be an array of quote ids?
    // --- these are 1 to many
    quotes: [
      {
        id: 1,
        quote: "You give me cookie, I give you cookie",
        characterId: 1,
        characterName: "Nick Miller",
        episode: "4",
        season: "4",
        episodeName: "",
      },
    ],
    // --- friends will just be an array of character ids
    // --- these are many to many?
    friends: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
];

// /showInfo or just home route

returnobj = {
  name: "New girl",
  seasons: 7,
  episodes: 148,
  characters: [], // array of character ids or just names even
  plot: "",
  location: "Los Angeles",
  creator: "Elizabeth Meriwether",
  writers: ["Elizabeth Meriwether", "David Guarascio", "Meredith Scardino"],
  genre: "Comedy",
  rottenTomatoes: [
    {
      season: 1,
      tomatoMeter: 87,
      audienceScore: 86,
    },
  ],
  network: "Fox",
  firstAired: "September 20, 2011",
  lastAired: "May 14, 2018",
  whereToWatch: "Netflix",
  openingTheme: "",
  episodeRunTime: "21-24 minutes",
};

// resources
// https://www.scarymommy.com/new-girl-quotes
// https://github.com/zahwah-codes/newgirl-api
