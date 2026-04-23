// src/data/contestants.ts

export interface Contestant {
  id: string;
  name: string;
  season: number;
  placement: string;
  ticketmasterKeyword: string;
  attractionId: string; // no ? — required, use empty string "" if unknown
}

export const CONTESTANTS: Contestant[] = [
  { id: "kelly-clarkson",   name: "Kelly Clarkson",   season: 1,  placement: "Winner",    ticketmasterKeyword: "Kelly Clarkson",   attractionId: "K8vZ9175_fV"},
  { id: "ruben-studdard",   name: "Ruben Studdard",   season: 2,  placement: "Winner",    ticketmasterKeyword: "Ruben Studdard",   attractionId: "K8vZ9175__7"},
  { id: "fantasia",         name: "Fantasia Barrino", season: 3,  placement: "Winner",    ticketmasterKeyword: "Fantasia",         attractionId: "K8vZ917Cgvf"},
  { id: "carrie-underwood", name: "Carrie Underwood", season: 4,  placement: "Winner",    ticketmasterKeyword: "Carrie Underwood", attractionId: "K8vZ9175U20"},
  { id: "taylor-hicks",     name: "Taylor Hicks",     season: 5,  placement: "Winner",    ticketmasterKeyword: "Taylor Hicks",     attractionId: "K8vZ9175Hsf"},
  { id: "jordin-sparks",    name: "Jordin Sparks",    season: 6,  placement: "Winner",    ticketmasterKeyword: "Jordin Sparks",    attractionId: "K8vZ917G7S0"},
  { id: "david-cook",       name: "David Cook",       season: 7,  placement: "Winner",    ticketmasterKeyword: "David Cook",       attractionId: "K8vZ917GfwV"},
  { id: "kris-allen",       name: "Kris Allen",       season: 8,  placement: "Winner",    ticketmasterKeyword: "Kris Allen",       attractionId: "K8vZ917Gpd0"},
  { id: "lee-dewyze",       name: "Lee DeWyze",       season: 9,  placement: "Winner",    ticketmasterKeyword: "Lee DeWyze",       attractionId: "K8vZ917GM_V"},
  { id: "scotty-mccreery",  name: "Scotty McCreery",  season: 10, placement: "Winner",    ticketmasterKeyword: "Scotty McCreery",  attractionId: "K8vZ91726j0"},
  { id: "phillip-phillips", name: "Phillip Phillips", season: 11, placement: "Winner",    ticketmasterKeyword: "Phillip Phillips", attractionId: "K8vZ9178_t7"},
  { id: "candice-glover",   name: "Candice Glover",   season: 12, placement: "Winner",    ticketmasterKeyword: "Candice Glover",   attractionId: "" },
  { id: "caleb-johnson",    name: "Caleb Johnson",    season: 13, placement: "Winner",    ticketmasterKeyword: "Caleb Johnson",    attractionId: "K8vZ917KaL0"},
  { id: "nick-fradiani",    name: "Nick Fradiani",    season: 14, placement: "Winner",    ticketmasterKeyword: "Nick Fradiani",    attractionId: "K8vZ917KOG7"},
  { id: "trent-harmon",     name: "Trent Harmon",     season: 15, placement: "Winner",    ticketmasterKeyword: "Trent Harmon",     attractionId: "K8vZ91741Uf"},
  { id: "maddie-poppe",     name: "Maddie Poppe",     season: 16, placement: "Winner",    ticketmasterKeyword: "Maddie Poppe",     attractionId: "K8vZ917bQ60"},
  { id: "laine-hardy",      name: "Laine Hardy",      season: 17, placement: "Winner",    ticketmasterKeyword: "Laine Hardy",      attractionId: "K8vZ917brCf"},
  { id: "just-sam",         name: "Just Sam",         season: 18, placement: "Winner",    ticketmasterKeyword: "Just Sam",         attractionId: "" },
  { id: "chayce-beckham",   name: "Chayce Beckham",   season: 19, placement: "Winner",    ticketmasterKeyword: "Chayce Beckham",   attractionId: "K8vZ917_bFf"},
  { id: "noah-thompson",    name: "Noah Thompson",    season: 20, placement: "Winner",    ticketmasterKeyword: "Noah Thompson",    attractionId: "K8vZ917QlzV"},
  { id: "iam-tongi",        name: "Iam Tongi",        season: 21, placement: "Winner",    ticketmasterKeyword: "Iam Tongi",        attractionId: "K8vZ917hL8f"},
  { id: "clay-aiken",       name: "Clay Aiken",       season: 2,  placement: "Runner-up", ticketmasterKeyword: "Clay Aiken",       attractionId: "K8vZ9175_M7"},
  { id: "jennifer-hudson",  name: "Jennifer Hudson",  season: 3,  placement: "Top 10",    ticketmasterKeyword: "Jennifer Hudson",  attractionId: "K8vZ917GKqV"},
  { id: "adam-lambert",     name: "Adam Lambert",     season: 8,  placement: "Runner-up", ticketmasterKeyword: "Adam Lambert",     attractionId: "K8vZ917GpdV"},
  { id: "chris-daughtry",   name: "Chris Daughtry",   season: 5,  placement: "Top 4",     ticketmasterKeyword: "Daughtry",         attractionId: "K8vZ917GZFf"},
  { id: "katharine-mcphee", name: "Katharine McPhee", season: 5,  placement: "Runner-up", ticketmasterKeyword: "Katharine McPhee", attractionId: "K8vZ917fHif"},
  { id: "david-archuleta",  name: "David Archuleta",  season: 7,  placement: "Runner-up", ticketmasterKeyword: "David Archuleta",  attractionId: "K8vZ917GGhf"},
  { id: "haley-reinhart",   name: "Haley Reinhart",   season: 10, placement: "Top 3",     ticketmasterKeyword: "Haley Reinhart",   attractionId: "K8vZ9172L50"},
  { id: "jessica-sanchez",  name: "Jessica Sanchez",  season: 11, placement: "Runner-up", ticketmasterKeyword: "Jessica Sanchez",  attractionId: "K8vZ9178leV"},
  { id: "gabby-barrett",    name: "Gabby Barrett",    season: 16, placement: "Top 5",     ticketmasterKeyword: "Gabby Barrett",    attractionId: "K8vZ9179997"},
  { id: "laci-kaye-booth",  name: "Laci Kaye Booth",  season: 16, placement: "Top 5",     ticketmasterKeyword: "Laci Kaye Booth",  attractionId: "K8vZ917Q5EV"},
];