// scripts/fetch-attraction-ids.js
const artists = [
  { id: "ruben-studdard",   keyword: "Ruben Studdard" },
  { id: "fantasia",         keyword: "Fantasia Barrino" },
  { id: "carrie-underwood", keyword: "Carrie Underwood" },
  { id: "taylor-hicks",     keyword: "Taylor Hicks" },
  { id: "jordin-sparks",    keyword: "Jordin Sparks" },
  { id: "david-cook",       keyword: "David Cook" },
  { id: "kris-allen",       keyword: "Kris Allen" },
  { id: "lee-dewyze",       keyword: "Lee DeWyze" },
  { id: "scotty-mccreery",  keyword: "Scotty McCreery" },
  { id: "candice-glover",   keyword: "Candice Glover" },
  { id: "caleb-johnson",    keyword: "Caleb Johnson" },
  { id: "nick-fradiani",    keyword: "Nick Fradiani" },
  { id: "trent-harmon",     keyword: "Trent Harmon" },
  { id: "maddie-poppe",     keyword: "Maddie Poppe" },
  { id: "laine-hardy",      keyword: "Laine Hardy" },
  { id: "just-sam",         keyword: "Just Sam" },
  { id: "chayce-beckham",   keyword: "Chayce Beckham" },
  { id: "noah-thompson",    keyword: "Noah Thompson" },
  { id: "iam-tongi",        keyword: "Iam Tongi" },
  { id: "clay-aiken",       keyword: "Clay Aiken" },
  { id: "jennifer-hudson",  keyword: "Jennifer Hudson" },
  { id: "adam-lambert",     keyword: "Adam Lambert" },
  { id: "chris-daughtry",   keyword: "Daughtry" },
  { id: "katharine-mcphee", keyword: "Katharine McPhee" },
  { id: "david-archuleta",  keyword: "David Archuleta" },
  { id: "haley-reinhart",   keyword: "Haley Reinhart" },
  { id: "jessica-sanchez",  keyword: "Jessica Sanchez" },
  { id: "gabby-barrett",    keyword: "Gabby Barrett" },
  { id: "laci-kaye-booth",  keyword: "Laci Kaye Booth" },
];

const API_KEY = "YOUR_TICKETMASTER_KEY_HERE";

async function fetchId(keyword) {
  const url = `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${API_KEY}&keyword=${encodeURIComponent(keyword)}&classificationName=music&size=1`;
  const res = await fetch(url);
  const data = await res.json();
  const a = data._embedded?.attractions?.[0];
  return {
    tmId: a?.id ?? "NOT_FOUND",
    tmName: a?.name ?? "NOT_FOUND",
  };
}

(async () => {
  console.log("Paste these attractionId values into contestants.ts:\n");
  for (const artist of artists) {
    const result = await fetchId(artist.keyword);
    const id = result.tmId === "NOT_FOUND" ? "" : result.tmId;
    const warning = result.tmId === "NOT_FOUND"
      ? "  ← NOT FOUND, leave empty"
      : result.tmName.toLowerCase() !== artist.keyword.toLowerCase()
      ? `  ← VERIFY: TM returned "${result.tmName}"`
      : "";
    console.log(`  { id: "${artist.id}", attractionId: "${id}" },${warning}`);
    await new Promise((r) => setTimeout(r, 300));
  }
  console.log("\nDone.");
})();