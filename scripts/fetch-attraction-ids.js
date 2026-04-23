// scripts/fetch-attraction-ids.js
// Run: node scripts/fetch-attraction-ids.js
// Then paste results into contestants.ts

const API_KEY = "YOUR_TICKETMASTER_KEY_HERE";

// Only contestants with empty attractionId — existing IDs are already confirmed
const artists = [
  { id: "justin-guarini",      keyword: "Justin Guarini" },
  { id: "diana-degarmo",       keyword: "Diana DeGarmo" },
  { id: "bo-bice",             keyword: "Bo Bice" },
  { id: "kellie-pickler",      keyword: "Kellie Pickler" },
  { id: "blake-lewis",         keyword: "Blake Lewis" },
  { id: "melinda-doolittle",   keyword: "Melinda Doolittle" },
  { id: "lakisha-jones",       keyword: "LaKisha Jones" },
  { id: "brooke-white",        keyword: "Brooke White" },
  { id: "carly-smithson",      keyword: "Carly Smithson" },
  { id: "jason-castro",        keyword: "Jason Castro" },
  { id: "allison-iraheta",     keyword: "Allison Iraheta" },
  { id: "danny-gokey",         keyword: "Danny Gokey" },
  { id: "matt-giraud",         keyword: "Matt Giraud" },
  { id: "crystal-bowersox",    keyword: "Crystal Bowersox" },
  { id: "casey-james",         keyword: "Casey James" },
  { id: "siobhan-magnus",      keyword: "Siobhan Magnus" },
  { id: "lauren-alaina",       keyword: "Lauren Alaina" },
  { id: "james-durbin",        keyword: "James Durbin" },
  { id: "casey-abrams",        keyword: "Casey Abrams" },
  { id: "joshua-ledet",        keyword: "Joshua Ledet" },
  { id: "hollie-cavanagh",     keyword: "Hollie Cavanagh" },
  { id: "colton-dixon",        keyword: "Colton Dixon" },
  { id: "skylar-laine",        keyword: "Skylar Laine" },
  { id: "candice-glover",      keyword: "Candice Glover" },
  { id: "kree-harrison",       keyword: "Kree Harrison" },
  { id: "angie-miller",        keyword: "Angie Miller" },
  { id: "amber-holcomb",       keyword: "Amber Holcomb" },
  { id: "lazaro-arbos",        keyword: "Lazaro Arbos" },
  { id: "jena-irene",          keyword: "Jena Irene" },
  { id: "alex-preston",        keyword: "Alex Preston" },
  { id: "sam-woolf",           keyword: "Sam Woolf" },
  { id: "clark-beckham",       keyword: "Clark Beckham" },
  { id: "rayvon-owen",         keyword: "Rayvon Owen" },
  { id: "jax",                 keyword: "Jax" },
  { id: "quentin-alexander",   keyword: "Quentin Alexander" },
  { id: "laporsha-renae",      keyword: "La'Porsha Renae" },
  { id: "dalton-rapattoni",    keyword: "Dalton Rapattoni" },
  { id: "tristan-mcintosh",    keyword: "Tristan McIntosh" },
  { id: "caleb-hutchinson",    keyword: "Caleb Lee Hutchinson" },
  { id: "cade-foehner",        keyword: "Cade Foehner" },
  { id: "michael-j-woodard",   keyword: "Michael J. Woodard" },
  { id: "alejandro-aranda",    keyword: "Alejandro Aranda" },
  { id: "madison-vandenburg",  keyword: "Madison VanDenburg" },
  { id: "wade-cota",           keyword: "Wade Cota" },
  { id: "just-sam",            keyword: "Just Sam" },
  { id: "arthur-gunn",         keyword: "Arthur Gunn" },
  { id: "francisco-martin",    keyword: "Francisco Martin" },
  { id: "dillon-james",        keyword: "Dillon James" },
  { id: "jonny-west",          keyword: "Jonny West" },
  { id: "grace-kinstler",      keyword: "Grace Kinstler" },
  { id: "casey-bishop",        keyword: "Casey Bishop" },
  { id: "benson-boone",        keyword: "Benson Boone" },
  { id: "huntergirl",          keyword: "HunterGirl" },
  { id: "leah-marlene",        keyword: "Leah Marlene" },
  { id: "fritz-hager",         keyword: "Fritz Hager" },
  { id: "nicolina",            keyword: "Nicolina" },
  { id: "megan-danielle",      keyword: "Megan Danielle" },
  { id: "colin-stough",        keyword: "Colin Stough" },
  { id: "zachariah-smith",     keyword: "Zachariah Smith" },
  { id: "abi-carter",          keyword: "Abi Carter" },
  { id: "will-moseley",        keyword: "Will Moseley" },
  { id: "jack-blocker",        keyword: "Jack Blocker" },
  { id: "triston-harper",      keyword: "Triston Harper" },
  { id: "julia-gagnon",        keyword: "Julia Gagnon" },
  { id: "jamal-roberts",       keyword: "Jamal Roberts" },
];

async function fetchId(keyword) {
  const url = `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${API_KEY}&keyword=${encodeURIComponent(keyword)}&classificationName=music&size=3`;
  const res = await fetch(url);
  const data = await res.json();
  const attractions = data._embedded?.attractions || [];

  if (attractions.length === 0) {
    return { tmId: "NOT_FOUND", tmName: "NOT_FOUND", alternatives: [] };
  }

  return {
    tmId: attractions[0].id,
    tmName: attractions[0].name,
    // Show up to 2 alternatives so you can spot if the top result is wrong
    alternatives: attractions.slice(1).map((a) => `${a.name} (${a.id})`),
  };
}

(async () => {
  console.log("Fetching Ticketmaster attraction IDs...\n");
  console.log("─".repeat(70));

  let foundCount = 0;
  let notFoundCount = 0;
  let verifyCount = 0;

  for (const artist of artists) {
    const result = await fetchId(artist.keyword);

    if (result.tmId === "NOT_FOUND") {
      notFoundCount++;
      console.log(`[ NOT FOUND ] ${artist.keyword}`);
      console.log(`  → Leave attractionId: "" for { id: "${artist.id}" }\n`);
    } else {
      const nameMatch =
        result.tmName.toLowerCase() === artist.keyword.toLowerCase();

      if (nameMatch) {
        foundCount++;
        console.log(`[ OK ] ${artist.keyword}`);
        console.log(`  → attractionId: "${result.tmId}"  (matched: "${result.tmName}")`);
      } else {
        verifyCount++;
        console.log(`[ VERIFY ] ${artist.keyword}`);
        console.log(`  → attractionId: "${result.tmId}"  (TM returned: "${result.tmName}")`);
        if (result.alternatives.length > 0) {
          console.log(`  → Alternatives: ${result.alternatives.join(" | ")}`);
        }
        console.log(`  → Check ticketmaster.com to confirm this is the right person`);
      }
      console.log();
    }

    // 300ms pause between requests to stay within rate limits
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log("─".repeat(70));
  console.log(`\nDone. ${foundCount} matched, ${verifyCount} need verification, ${notFoundCount} not found.`);
  console.log("\nFor any [ VERIFY ] results, visit ticketmaster.com and search");
  console.log("the artist name to confirm the ID before pasting into contestants.ts.");
})();