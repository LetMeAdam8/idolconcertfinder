// src/app/merch/page.tsx

interface Product {
  name: string;
  description: string;
  affiliateUrl: string;
  category: string;
}

const PRODUCTS: Product[] = [
  // ── Artist Merchandise ───────────────────────────────────────────────────
  {
    name: "Carrie Underwood Official Merchandise",
    description: "Browse official Carrie Underwood shirts, hoodies, and accessories.",
    affiliateUrl: "https://www.amazon.com/s?k=carrie+underwood+merchandise&tag=idolconcertfi-20",
    category: "Artist Merch",
  },
  {
    name: "Kelly Clarkson Official Merchandise",
    description: "Shop Kelly Clarkson apparel and fan items.",
    affiliateUrl: "https://www.amazon.com/s?k=kelly+clarkson+merchandise&tag=idolconcertfi-20",
    category: "Artist Merch",
  },
  {
    name: "Benson Boone Merchandise",
    description: "Find Benson Boone shirts, posters, and fan gear.",
    affiliateUrl: "https://www.amazon.com/s?k=benson+boone+merchandise&tag=idolconcertfi-20",
    category: "Artist Merch",
  },

  // ── Vinyl and Music ──────────────────────────────────────────────────────
  {
    name: "Carrie Underwood Vinyl Records",
    description: "Own Carrie Underwood's greatest albums on vinyl.",
    affiliateUrl: "https://www.amazon.com/s?k=carrie+underwood+vinyl&tag=idolconcertfi-20",
    category: "Vinyl and Music",
  },
  {
    name: "Kelly Clarkson Vinyl Records",
    description: "Kelly Clarkson's discography on vinyl including Breakaway and Meaning of Life.",
    affiliateUrl: "https://www.amazon.com/s?k=kelly+clarkson+vinyl&tag=idolconcertfi-20",
    category: "Vinyl and Music",
  },
  {
    name: "American Idol Greatest Hits",
    description: "Compilation albums featuring your favorite Idol alumni.",
    affiliateUrl: "https://www.amazon.com/s?k=american+idol+albums&tag=idolconcertfi-20",
    category: "Vinyl and Music",
  },

  // ── Concert Accessories ──────────────────────────────────────────────────
  {
    name: "High Fidelity Concert Earplugs",
    description: "Protect your hearing without losing sound quality. A must-have for any live show.",
    affiliateUrl: "https://www.amazon.com/s?k=high+fidelity+concert+earplugs&tag=idolconcertfi-20",
    category: "Concert Accessories",
  },
  {
    name: "Portable Phone Charger",
    description: "Never run out of battery during a show. Slim and lightweight for easy carrying.",
    affiliateUrl: "https://www.amazon.com/s?k=portable+phone+charger+concert&tag=idolconcertfi-20",
    category: "Concert Accessories",
  },
  {
    name: "Concert Belt Bag",
    description: "Hands-free carrying for your essentials. Most venues allow these when larger bags are not permitted.",
    affiliateUrl: "https://www.amazon.com/s?k=belt+bag+fanny+pack+concert&tag=idolconcertfi-20",
    category: "Concert Accessories",
  },
  {
    name: "Stadium Blanket",
    description: "Perfect for outdoor amphitheater shows on cool evenings.",
    affiliateUrl: "https://www.amazon.com/s?k=stadium+blanket+outdoor+concert&tag=idolconcertfi-20",
    category: "Concert Accessories",
  },
  {
    name: "Compact Concert Binoculars",
    description: "See every detail from the back of the venue. Lightweight and easy to carry.",
    affiliateUrl: "https://www.amazon.com/s?k=compact+binoculars+concerts&tag=idolconcertfi-20",
    category: "Concert Accessories",
  },
  {
    name: "Reusable Water Bottle",
    description: "Most venues now allow sealed reusable bottles. Stay hydrated and save money on drinks.",
    affiliateUrl: "https://www.amazon.com/s?k=reusable+water+bottle+concerts&tag=idolconcertfi-20",
    category: "Concert Accessories",
  },
];

// Get unique categories in the order they first appear
const CATEGORIES = PRODUCTS.reduce((acc: string[], p) => {
  if (!acc.includes(p.category)) acc.push(p.category);
  return acc;
}, []);

export default function MerchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-500 text-white rounded-xl p-2">
              <span className="text-lg">🎤</span>
            </div>
            <div>
              <a href="/" className="font-extrabold text-gray-900 text-xl leading-tight tracking-tight hover:text-red-500 transition-colors">
                Idol Concert Finder
              </a>
              <p className="text-xs text-gray-400">Fan Shop</p>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors">Find Concerts</a>
            <a href="/about" className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors">About</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Page title */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Fan Shop</h1>
          <p className="text-gray-500">
            Gear up for the show. Everything you need before, during, and after the concert.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            As an Amazon Associate, we earn from qualifying purchases. This helps keep Idol Concert Finder free.
          </p>
        </div>

        {/* Products grouped by category */}
{CATEGORIES.map((category) => (
  <div key={category} className="mb-12">
    <h2 className="text-xl font-bold text-gray-800 mb-5 pb-2 border-b border-gray-200">
      {category}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {PRODUCTS.filter((p) => p.category === category).map((product) => (
        <a
          key={product.name}
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all p-5 flex flex-col gap-3 group"
        >
          <h3 className="font-bold text-gray-900 group-hover:text-red-500 transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 flex-1">{product.description}</p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-red-500">
            Shop on Amazon
            <span className="text-xs">↗</span>
          </span>
        </a>
      ))}
    </div>
  </div>
))}
      </main>
    </div>
  );
}