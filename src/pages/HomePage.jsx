import PageWrapper from "../components/PageWrapper";

export default function HomePage() {
  return (
    <PageWrapper>
      {/* Hero / Banner */}
      <div className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden shadow-lg 
                      bg-background-light dark:bg-customDark-700">
        <img
          src="https://placehold.co/800x400/3B82F6/FFFFFF?text=New+Arrivals"
          alt="New Arrivals"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Shortcuts */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button className="flex flex-col items-center justify-center gap-3 
                           bg-white dark:bg-customDark-800 
                           border border-separator-light dark:border-separator-dark 
                           rounded-2xl p-4 shadow hover:shadow-lg 
                           hover:scale-[1.02] transition-all">
          <div className="w-14 h-14 rounded-full flex items-center justify-center 
                          bg-primary/10 text-primary dark:bg-accent-dark/20 dark:text-accent">
            <i className="fa-solid fa-store text-2xl"></i>
          </div>
          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
            Spareparts Shops
          </span>
        </button>

        <button className="flex flex-col items-center justify-center gap-3 
                           bg-white dark:bg-customDark-800 
                           border border-separator-light dark:border-separator-dark 
                           rounded-2xl p-4 shadow hover:shadow-lg 
                           hover:scale-[1.02] transition-all">
          <div className="w-14 h-14 rounded-full flex items-center justify-center 
                          bg-primary/10 text-primary dark:bg-accent-dark/20 dark:text-accent">
            <i className="fa-solid fa-graduation-cap text-2xl"></i>
          </div>
          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
            Training Centers
          </span>
        </button>
      </div>
    </PageWrapper>
  );
}
