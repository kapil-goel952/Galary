
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [index, setIndex] = useState(1);
  const [quantity, setQuantity] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=${quantity}`
      );

      setData(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [index, quantity]);

  function goToPage(page) {
    setIndex(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">

        <div className="mx-auto flex min-h-[80px] max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Logo */}
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Image<span className="text-amber-400">Gallery</span>
            </h1>

            <p className="text-xs text-slate-400">
              Discover beautiful random images
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">

            {/* Search UI */}
            <div className="hidden items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 md:flex">
              <span className="mr-2 text-slate-400">⌕</span>

              <input
                type="text"
                placeholder="Search images..."
                className="w-44 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>

            {/* Quantity */}
            <select
              value={quantity}
              onChange={(e) => {
                setQuantity(parseInt(e.target.value));
                setIndex(1);
              }}
              className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white outline-none transition hover:bg-white/10"
            >
              <option value="10" className="bg-slate-900">
                10 images
              </option>

              <option value="20" className="bg-slate-900">
                20 images
              </option>

              <option value="50" className="bg-slate-900">
                50 images
              </option>

              <option value="100" className="bg-slate-900">
                100 images
              </option>
            </select>
          </div>
        </div>
      </header>


      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-7xl px-5 py-8">

        {/* Page information */}
        <div className="mb-7 flex items-end justify-between">

          <div>
            <p className="mb-1 text-sm font-medium text-amber-400">
              EXPLORE
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Image Collection
            </h2>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400">
            Page <span className="font-bold text-white">{index}</span>
          </div>

        </div>


        {/* ================= GALLERY ================= */}
        {loading ? (

          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">

              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-amber-400"></div>

              <p className="text-sm text-slate-400">
                Loading images...
              </p>

            </div>
          </div>

        ) : data.length > 0 ? (

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {data.map((elem) => (

              <div
                key={elem.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
              >

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">

                  <img
                    src={elem.download_url}
                    alt={`Photo by ${elem.author}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"></div>

                </div>


                {/* Card Content */}
                <div className="flex items-center justify-between p-4">

                  <div className="min-w-0">

                    <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">
                      Photographer
                    </p>

                    <h3 className="truncate text-base font-bold text-white">
                      {elem.author}
                    </h3>

                  </div>

                  <span className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-400 transition group-hover:bg-amber-400 group-hover:text-black">
                    ↗
                  </span>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* Empty state */
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-3xl">
              🖼️
            </div>

            <h2 className="text-xl font-bold">
              No images available
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try loading another page.
            </p>

          </div>

        )}


        {/* ================= PAGINATION ================= */}
        <div className="mt-10 flex items-center justify-center gap-4">

          <button
            disabled={index === 1}
            onClick={() => goToPage(index - 1)}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Previous
          </button>


          <div className="flex h-11 min-w-11 items-center justify-center rounded-xl bg-amber-400 px-4 font-black text-black shadow-lg shadow-amber-400/10">
            {index}
          </div>


          <button
            onClick={() => goToPage(index + 1)}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold transition hover:border-amber-400/30 hover:bg-white/10"
          >
            Next →
          </button>

        </div>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="mt-10 border-t border-white/10 py-7 text-center">

        <p className="text-sm text-slate-500">
          Built with{" "}
          <span className="font-semibold text-white">
            React
          </span>{" "}
          &{" "}
          <span className="font-semibold text-white">
            Picsum
          </span>
        </p>

      </footer>

    </div>
  );
}

export default App;
