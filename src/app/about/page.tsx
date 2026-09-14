// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        About Idol Concert Finder
      </h1>

      <div className="prose prose-gray space-y-5 text-gray-700 leading-relaxed">
        <p>
          Idol Concert Finder is a free tool built for fans of American Idol.
          We track upcoming live concerts from over 80 former American Idol
          contestants spanning all 24 seasons — from Season 1 winner Kelly
          Clarkson to Season 24 winner Hannah Harper.
        </p>

        <p>
          Search by your city, state, or zip code to find shows happening near
          you. Set a radius — 25, 50, 100, or 200 miles — and we'll show you
          every Idol alumni concert within that distance, sorted by date. You
          can also filter by a specific artist to see all of their upcoming
          tour dates at once.
        </p>

        <p>
          Every search includes an interactive map showing exactly where each
          concert is taking place. Click any pin to see venue details and a
          direct link to purchase tickets through Ticketmaster.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
          Who We Track
        </h2>
        <p>
          We cover all American Idol winners, runners-up, and notable finalists
          who went on to have active music careers — including household names
          like Carrie Underwood, Kelly Clarkson, and Benson Boone, as well as
          fan favorites from every season of the show.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
          How It Works
        </h2>
        <p>
          Concert data is pulled in real time from the Ticketmaster Discovery
          API using each artist's verified attraction ID, ensuring accurate
          results. Location search uses Google's Geocoding API to convert your
          city or zip code into coordinates, and distance filtering is
          calculated using precise geographic math — so the radius you choose
          is exact.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">
          Is It Free?
        </h2>
        <p>
          Yes, completely free. We do not sell tickets — we link directly to
          Ticketmaster where you can purchase tickets at face value. We are not
          affiliated with American Idol, ABC, or Ticketmaster.
        </p>
      </div>
    </div>
  );
}