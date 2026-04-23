// src/data/contestants.ts

export interface Contestant {
  id: string;
  name: string;
  season: number;
  placement: string;
  attractionId: string;
}

export const CONTESTANTS: Contestant[] = [

  // ── Season 1 ────────────────────────────────────────────────────────────────
  { id: "kelly-clarkson",      name: "Kelly Clarkson",       season: 1,  placement: "Winner",    attractionId: "K8vZ9175_fV" },
  { id: "justin-guarini",      name: "Justin Guarini",       season: 1,  placement: "Runner-up", attractionId: "" },

  // ── Season 2 ────────────────────────────────────────────────────────────────
  { id: "ruben-studdard",      name: "Ruben Studdard",       season: 2,  placement: "Winner",    attractionId: "K8vZ9175__7" },
  { id: "clay-aiken",          name: "Clay Aiken",           season: 2,  placement: "Runner-up", attractionId: "K8vZ9175_M7" },

  // ── Season 3 ────────────────────────────────────────────────────────────────
  { id: "fantasia",            name: "Fantasia Barrino",     season: 3,  placement: "Winner",    attractionId: "K8vZ917Cgvf" },
  { id: "diana-degarmo",       name: "Diana DeGarmo",        season: 3,  placement: "Runner-up", attractionId: "" },
  { id: "jennifer-hudson",     name: "Jennifer Hudson",      season: 3,  placement: "7th Place", attractionId: "K8vZ917GKqV" },

  // ── Season 4 ────────────────────────────────────────────────────────────────
  { id: "carrie-underwood",    name: "Carrie Underwood",     season: 4,  placement: "Winner",    attractionId: "K8vZ9175U20" },
  { id: "bo-bice",             name: "Bo Bice",              season: 4,  placement: "Runner-up", attractionId: "" },
  { id: "kellie-pickler",      name: "Kellie Pickler",       season: 4,  placement: "6th Place", attractionId: "" },

  // ── Season 5 ────────────────────────────────────────────────────────────────
  { id: "taylor-hicks",        name: "Taylor Hicks",         season: 5,  placement: "Winner",    attractionId: "K8vZ9175Hsf" },
  { id: "katharine-mcphee",    name: "Katharine McPhee",     season: 5,  placement: "Runner-up", attractionId: "K8vZ917fHif" },
  { id: "chris-daughtry",      name: "Chris Daughtry",       season: 5,  placement: "4th Place", attractionId: "K8vZ917GZFf" },
  { id: "bucky-covington",     name: "Bucky Covington",      season: 5,  placement: "8th Place", attractionId: "" },

  // ── Season 6 ────────────────────────────────────────────────────────────────
  { id: "jordin-sparks",       name: "Jordin Sparks",        season: 6,  placement: "Winner",    attractionId: "K8vZ917G7S0" },
  { id: "blake-lewis",         name: "Blake Lewis",          season: 6,  placement: "Runner-up", attractionId: "" },
  { id: "melinda-doolittle",   name: "Melinda Doolittle",    season: 6,  placement: "3rd Place", attractionId: "" },
  { id: "lakisha-jones",       name: "LaKisha Jones",        season: 6,  placement: "4th Place", attractionId: "" },

  // ── Season 7 ────────────────────────────────────────────────────────────────
  { id: "david-cook",          name: "David Cook",           season: 7,  placement: "Winner",    attractionId: "K8vZ917GfwV" },
  { id: "david-archuleta",     name: "David Archuleta",      season: 7,  placement: "Runner-up", attractionId: "K8vZ917GGhf" },
  { id: "brooke-white",        name: "Brooke White",         season: 7,  placement: "5th Place", attractionId: "" },
  { id: "carly-smithson",      name: "Carly Smithson",       season: 7,  placement: "6th Place", attractionId: "" },
  { id: "jason-castro",        name: "Jason Castro",         season: 7,  placement: "4th Place", attractionId: "" },
  // Michael Johns (8th place) passed away in 2014 — excluded

  // ── Season 8 ────────────────────────────────────────────────────────────────
  { id: "kris-allen",          name: "Kris Allen",           season: 8,  placement: "Winner",    attractionId: "K8vZ917Gpd0" },
  { id: "adam-lambert",        name: "Adam Lambert",         season: 8,  placement: "Runner-up", attractionId: "K8vZ917GpdV" },
  { id: "allison-iraheta",     name: "Allison Iraheta",      season: 8,  placement: "4th Place", attractionId: "" },
  { id: "danny-gokey",         name: "Danny Gokey",          season: 8,  placement: "3rd Place", attractionId: "" },
  { id: "matt-giraud",         name: "Matt Giraud",          season: 8,  placement: "5th Place", attractionId: "" },
  // Nikki McKibbin (Season 1, passed away 2020) — excluded

  // ── Season 9 ────────────────────────────────────────────────────────────────
  { id: "lee-dewyze",          name: "Lee DeWyze",           season: 9,  placement: "Winner",    attractionId: "K8vZ917GM_V" },
  { id: "crystal-bowersox",    name: "Crystal Bowersox",     season: 9,  placement: "Runner-up", attractionId: "" },
  { id: "casey-james",         name: "Casey James",          season: 9,  placement: "3rd Place", attractionId: "" },
  { id: "siobhan-magnus",      name: "Siobhan Magnus",       season: 9,  placement: "6th Place", attractionId: "" },

  // ── Season 10 ───────────────────────────────────────────────────────────────
  { id: "scotty-mccreery",     name: "Scotty McCreery",      season: 10, placement: "Winner",    attractionId: "K8vZ91726j0" },
  { id: "lauren-alaina",       name: "Lauren Alaina",        season: 10, placement: "Runner-up", attractionId: "" },
  { id: "haley-reinhart",      name: "Haley Reinhart",       season: 10, placement: "3rd Place", attractionId: "K8vZ9172L50" },
  { id: "james-durbin",        name: "James Durbin",         season: 10, placement: "4th Place", attractionId: "" },
  { id: "casey-abrams",        name: "Casey Abrams",         season: 10, placement: "6th Place", attractionId: "" },

  // ── Season 11 ───────────────────────────────────────────────────────────────
  { id: "phillip-phillips",    name: "Phillip Phillips",     season: 11, placement: "Winner",    attractionId: "K8vZ9178_t7" },
  { id: "jessica-sanchez",     name: "Jessica Sanchez",      season: 11, placement: "Runner-up", attractionId: "K8vZ9178leV" },
  { id: "joshua-ledet",        name: "Joshua Ledet",         season: 11, placement: "3rd Place", attractionId: "" },
  { id: "hollie-cavanagh",     name: "Hollie Cavanagh",      season: 11, placement: "4th Place", attractionId: "" },
  { id: "colton-dixon",        name: "Colton Dixon",         season: 11, placement: "7th Place", attractionId: "" },
  { id: "skylar-laine",        name: "Skylar Laine",         season: 11, placement: "5th Place", attractionId: "" },

  // ── Season 12 ───────────────────────────────────────────────────────────────
  { id: "candice-glover",      name: "Candice Glover",       season: 12, placement: "Winner",    attractionId: "" },
  { id: "kree-harrison",       name: "Kree Harrison",        season: 12, placement: "Runner-up", attractionId: "" },
  { id: "angie-miller",        name: "Angie Miller",         season: 12, placement: "3rd Place", attractionId: "" },
  { id: "amber-holcomb",       name: "Amber Holcomb",        season: 12, placement: "4th Place", attractionId: "" },
  { id: "lazaro-arbos",        name: "Lazaro Arbos",         season: 12, placement: "6th Place", attractionId: "" },

  // ── Season 13 ───────────────────────────────────────────────────────────────
  { id: "caleb-johnson",       name: "Caleb Johnson",        season: 13, placement: "Winner",    attractionId: "K8vZ917KaL0" },
  { id: "jena-irene",          name: "Jena Irene",           season: 13, placement: "Runner-up", attractionId: "" },
  { id: "alex-preston",        name: "Alex Preston",         season: 13, placement: "3rd Place", attractionId: "" },
  { id: "sam-woolf",           name: "Sam Woolf",            season: 13, placement: "4th Place", attractionId: "" },

  // ── Season 14 ───────────────────────────────────────────────────────────────
  { id: "nick-fradiani",       name: "Nick Fradiani",        season: 14, placement: "Winner",    attractionId: "K8vZ917KOG7" },
  { id: "clark-beckham",       name: "Clark Beckham",        season: 14, placement: "Runner-up", attractionId: "" },
  { id: "rayvon-owen",         name: "Rayvon Owen",          season: 14, placement: "3rd Place", attractionId: "" },
  { id: "jax",                 name: "Jax",                  season: 14, placement: "4th Place", attractionId: "" },
  { id: "quentin-alexander",   name: "Quentin Alexander",    season: 14, placement: "5th Place", attractionId: "" },

  // ── Season 15 ───────────────────────────────────────────────────────────────
  { id: "trent-harmon",        name: "Trent Harmon",         season: 15, placement: "Winner",    attractionId: "K8vZ91741Uf" },
  { id: "laporsha-renae",      name: "La'Porsha Renae",      season: 15, placement: "Runner-up", attractionId: "" },
  { id: "dalton-rapattoni",    name: "Dalton Rapattoni",     season: 15, placement: "3rd Place", attractionId: "" },
  { id: "tristan-mcintosh",    name: "Tristan McIntosh",     season: 15, placement: "4th Place", attractionId: "" },

  // ── Season 16 ───────────────────────────────────────────────────────────────
  { id: "maddie-poppe",        name: "Maddie Poppe",         season: 16, placement: "Winner",    attractionId: "K8vZ917bQ60" },
  { id: "caleb-hutchinson",    name: "Caleb Lee Hutchinson", season: 16, placement: "Runner-up", attractionId: "" },
  { id: "gabby-barrett",       name: "Gabby Barrett",        season: 16, placement: "3rd Place", attractionId: "K8vZ9179997" },
  { id: "cade-foehner",        name: "Cade Foehner",         season: 16, placement: "4th Place", attractionId: "" },
  { id: "michael-j-woodard",   name: "Michael J. Woodard",   season: 16, placement: "5th Place", attractionId: "" },
  { id: "laci-kaye-booth",     name: "Laci Kaye Booth",      season: 16, placement: "Top 5",     attractionId: "K8vZ917Q5EV" },

  // ── Season 17 ───────────────────────────────────────────────────────────────
  { id: "laine-hardy",         name: "Laine Hardy",          season: 17, placement: "Winner",    attractionId: "K8vZ917brCf" },
  { id: "alejandro-aranda",    name: "Alejandro Aranda",     season: 17, placement: "Runner-up", attractionId: "" },
  { id: "madison-vandenburg",  name: "Madison VanDenburg",   season: 17, placement: "3rd Place", attractionId: "" },
  { id: "wade-cota",           name: "Wade Cota",            season: 17, placement: "5th Place", attractionId: "" },

  // ── Season 18 ───────────────────────────────────────────────────────────────
  { id: "just-sam",            name: "Just Sam",             season: 18, placement: "Winner",    attractionId: "" },
  { id: "arthur-gunn",         name: "Arthur Gunn",          season: 18, placement: "Runner-up", attractionId: "" },
  { id: "francisco-martin",    name: "Francisco Martin",     season: 18, placement: "3rd Place", attractionId: "" },
  { id: "dillon-james",        name: "Dillon James",         season: 18, placement: "4th Place", attractionId: "" },
  { id: "jonny-west",          name: "Jonny West",           season: 18, placement: "5th Place", attractionId: "" },

  // ── Season 19 ───────────────────────────────────────────────────────────────
  { id: "chayce-beckham",      name: "Chayce Beckham",       season: 19, placement: "Winner",    attractionId: "K8vZ917_bFf" },
  // Willie Spence (Runner-up) passed away in 2022 — excluded
  { id: "grace-kinstler",      name: "Grace Kinstler",       season: 19, placement: "3rd Place", attractionId: "" },
  { id: "casey-bishop",        name: "Casey Bishop",         season: 19, placement: "4th Place", attractionId: "" },
  { id: "benson-boone",        name: "Benson Boone",         season: 19, placement: "Top 24",    attractionId: "" },

  // ── Season 20 ───────────────────────────────────────────────────────────────
  { id: "noah-thompson",       name: "Noah Thompson",        season: 20, placement: "Winner",    attractionId: "K8vZ917QlzV" },
  { id: "huntergirl",          name: "HunterGirl",           season: 20, placement: "Runner-up", attractionId: "" },
  { id: "leah-marlene",        name: "Leah Marlene",         season: 20, placement: "3rd Place", attractionId: "" },
  { id: "fritz-hager",         name: "Fritz Hager",          season: 20, placement: "4th Place", attractionId: "" },
  { id: "nicolina",            name: "Nicolina",             season: 20, placement: "5th Place", attractionId: "" },

  // ── Season 21 ───────────────────────────────────────────────────────────────
  { id: "iam-tongi",           name: "Iam Tongi",            season: 21, placement: "Winner",    attractionId: "K8vZ917hL8f" },
  { id: "megan-danielle",      name: "Megan Danielle",       season: 21, placement: "Runner-up", attractionId: "" },
  { id: "colin-stough",        name: "Colin Stough",         season: 21, placement: "3rd Place", attractionId: "" },
  { id: "zachariah-smith",     name: "Zachariah Smith",      season: 21, placement: "4th Place", attractionId: "" },

  // ── Season 22 ───────────────────────────────────────────────────────────────
  { id: "abi-carter",          name: "Abi Carter",           season: 22, placement: "Winner",    attractionId: "" },
  { id: "will-moseley",        name: "Will Moseley",         season: 22, placement: "Runner-up", attractionId: "" },
  { id: "jack-blocker",        name: "Jack Blocker",         season: 22, placement: "3rd Place", attractionId: "" },
  { id: "triston-harper",      name: "Triston Harper",       season: 22, placement: "4th Place", attractionId: "" },
  { id: "julia-gagnon",        name: "Julia Gagnon",         season: 22, placement: "5th Place", attractionId: "" },

  // ── Season 23 ───────────────────────────────────────────────────────────────
  { id: "jamal-roberts",       name: "Jamal Roberts",        season: 23, placement: "Winner",    attractionId: "" },
];