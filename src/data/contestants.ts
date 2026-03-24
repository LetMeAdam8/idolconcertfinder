// src/data/contestants.ts

export interface Contestant {
  id: string;
  name: string;
  season: number;
  placement: string; // e.g. "Winner", "Runner-up", "Top 10"
  ticketmasterKeyword: string; // The name to search in Ticketmaster
}

export const CONTESTANTS: Contestant[] = [
  { id: "kelly-clarkson",    name: "Kelly Clarkson",    season: 1,  placement: "Winner",     ticketmasterKeyword: "Kelly Clarkson" },
  { id: "ruben-studdard",    name: "Ruben Studdard",    season: 2,  placement: "Winner",     ticketmasterKeyword: "Ruben Studdard" },
  { id: "fantasia",          name: "Fantasia Barrino",  season: 3,  placement: "Winner",     ticketmasterKeyword: "Fantasia" },
  { id: "carrie-underwood",  name: "Carrie Underwood",  season: 4,  placement: "Winner",     ticketmasterKeyword: "Carrie Underwood" },
  { id: "taylor-hicks",      name: "Taylor Hicks",      season: 5,  placement: "Winner",     ticketmasterKeyword: "Taylor Hicks" },
  { id: "jordin-sparks",     name: "Jordin Sparks",     season: 6,  placement: "Winner",     ticketmasterKeyword: "Jordin Sparks" },
  { id: "david-cook",        name: "David Cook",        season: 7,  placement: "Winner",     ticketmasterKeyword: "David Cook" },
  { id: "kris-allen",        name: "Kris Allen",        season: 8,  placement: "Winner",     ticketmasterKeyword: "Kris Allen" },
  { id: "lee-dewyze",        name: "Lee DeWyze",        season: 9,  placement: "Winner",     ticketmasterKeyword: "Lee DeWyze" },
  { id: "scotty-mccreery",   name: "Scotty McCreery",   season: 10, placement: "Winner",     ticketmasterKeyword: "Scotty McCreery" },
  { id: "phillip-phillips",  name: "Phillip Phillips",  season: 11, placement: "Winner",     ticketmasterKeyword: "Phillip Phillips" },
  { id: "candice-glover",    name: "Candice Glover",    season: 12, placement: "Winner",     ticketmasterKeyword: "Candice Glover" },
  { id: "caleb-johnson",     name: "Caleb Johnson",     season: 13, placement: "Winner",     ticketmasterKeyword: "Caleb Johnson" },
  { id: "nick-fradiani",     name: "Nick Fradiani",     season: 14, placement: "Winner",     ticketmasterKeyword: "Nick Fradiani" },
  { id: "trent-harmon",      name: "Trent Harmon",      season: 15, placement: "Winner",     ticketmasterKeyword: "Trent Harmon" },
  { id: "maddie-poppe",      name: "Maddie Poppe",      season: 16, placement: "Winner",     ticketmasterKeyword: "Maddie Poppe" },
  { id: "laine-hardy",       name: "Laine Hardy",       season: 17, placement: "Winner",     ticketmasterKeyword: "Laine Hardy" },
  { id: "just-sam",          name: "Just Sam",          season: 18, placement: "Winner",     ticketmasterKeyword: "Just Sam" },
  { id: "chayce-beckham",    name: "Chayce Beckham",    season: 19, placement: "Winner",     ticketmasterKeyword: "Chayce Beckham" },
  { id: "noah-thompson",     name: "Noah Thompson",     season: 20, placement: "Winner",     ticketmasterKeyword: "Noah Thompson" },
  { id: "iam-tongi",         name: "Iam Tongi",         season: 21, placement: "Winner",     ticketmasterKeyword: "Iam Tongi" },
  { id: "clay-aiken",        name: "Clay Aiken",        season: 2,  placement: "Runner-up",  ticketmasterKeyword: "Clay Aiken" },
  { id: "jennifer-hudson",   name: "Jennifer Hudson",   season: 3,  placement: "Top 10",     ticketmasterKeyword: "Jennifer Hudson" },
  { id: "adam-lambert",      name: "Adam Lambert",      season: 8,  placement: "Runner-up",  ticketmasterKeyword: "Adam Lambert" },
  { id: "chris-daughtry",    name: "Chris Daughtry",    season: 5,  placement: "Top 4",      ticketmasterKeyword: "Daughtry" },
  { id: "katharine-mcphee",  name: "Katharine McPhee",  season: 5,  placement: "Runner-up",  ticketmasterKeyword: "Katharine McPhee" },
  { id: "david-archuleta",   name: "David Archuleta",   season: 7,  placement: "Runner-up",  ticketmasterKeyword: "David Archuleta" },
  { id: "haley-reinhart",    name: "Haley Reinhart",    season: 10, placement: "Top 3",      ticketmasterKeyword: "Haley Reinhart" },
  { id: "jessica-sanchez",   name: "Jessica Sanchez",   season: 11, placement: "Runner-up",  ticketmasterKeyword: "Jessica Sanchez" },
  { id: "gabby-barrett",     name: "Gabby Barrett",     season: 16, placement: "Top 5",      ticketmasterKeyword: "Gabby Barrett" },
  { id: "laci-kaye-booth",   name: "Laci Kaye Booth",   season: 17, placement: "Top 5",      ticketmasterKeyword: "Laci Kaye Booth" },
];