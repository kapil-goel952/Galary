
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
      );

      setImages(data);
    } catch (error) {
      console.log("Failed to load images:", error);
      setImages([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, [page, limit]);

  const changePage = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Image<span className="text-amber-400">Gallery</span>
            </h1>

            <p className="text-sm text-slate-400">
              Discover beautiful random images
            </p>
          </div>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
          >
            <option value={10}>10 images</option>
            <option value={20}>20 images</option>
            <option value={50}>50 images</option>
            <option value={100}>100 images</option>
          </select>

        </div>
      </header>


      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-5 py-8">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-400">
              EXPLORE
            </p>

            <h2 className="text-3xl font-bold">
              Image Collection
            </h2>
          </div>

          <span className="rounded-full bg-white/5 px-4 py-2 text-sm">
            Page {page}
          </span>
        </div>


        {/* Loading */}
        {loading && (
          <div className="flex min-h-[50vh] flex-col items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-amber-400" />

            <p className="mt-4 text-sm text-slate-400">
              Loading images...
            </p>
          </div>
        )}


        {/* Images */}
        {!loading && images.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {images.map((image) => (
              <div
                key={image.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:bg-white/10"
              >

                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.download_url}
                    alt={`Photo by ${image.author}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between p-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase text-slate-500">
                      Photographer
                    </p>

                    <h3 className="truncate font-bold">
                      {image.author}
                    </h3>
                  </div>

                  <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 group-hover:bg-amber-400 group-hover:text-black">
                    ↗
                  </span>
                </div>

              </div>
            ))}

          </div>
        )}


        {/* Empty State */}
        {!loading && images.length === 0 && (
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">

            <div className="mb-4 text-5xl">
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


        {/* Pagination */}
        <div className="mt-10 flex justify-center gap-4">

          <button
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-bold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Previous
          </button>

          <div className="flex h-11 min-w-11 items-center justify-center rounded-xl bg-amber-400 px-4 font-bold text-black">
            {page}
          </div>

          <button
            onClick={() => changePage(page + 1)}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-bold transition hover:bg-white/10"
          >
            Next →
          </button>

        </div>

      </main>


      {/* Footer */}
      <footer className="border-t border-white/10 py-7 text-center">
        <p className="text-sm text-slate-500">
          Built with{" "}
          <span className="font-semibold text-white">React</span>
          {" "}and{" "}
          <span className="font-semibold text-white">Picsum</span>
        </p>
      </footer>

    </div>
  );
}

export default App;
