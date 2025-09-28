// src/pages/ContactPage.jsx
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import ShopList from "../components/ShopList";
import LoadingScreen from "../components/LoadingScreen";

export default function ContactPage({ setPage }) {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [homeCity, setHomeCity] = useState(
    () => localStorage.getItem("selectedCity") || ""
  );

  // ✅ Load shop data
  useEffect(() => {
    fetch("/shops.json")
      .then((res) => res.json())
      .then((data) => {
        setShops(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading shops:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Sync with ProfileDrawer (city selector)
  useEffect(() => {
    const handleCityChange = () => {
      setHomeCity(localStorage.getItem("selectedCity") || "");
    };
    window.addEventListener("city-changed", handleCityChange);
    return () => window.removeEventListener("city-changed", handleCityChange);
  }, []);

  if (loading) return <LoadingScreen />;

  // ✅ Filter shops by selected city
  const filteredShops = homeCity
    ? shops.filter(
        (shop) => shop.city?.toLowerCase() === homeCity.toLowerCase()
      )
    : shops;

  return (
    <div className="flex flex-col h-full">
      {/* 🔵 Local header */}
      <div className="bg-gradient-to-b from-blue-500 to-blue-400 text-white pt-[env(safe-area-inset-top)] shadow-md">
        <div className="flex items-center gap-3 px-4 h-14">
          <button
            onClick={() => setPage("home")}
            className="p-2 rounded-full hover:bg-white/20 transition"
          >
            <ArrowLeft size={22} className="text-white" />
          </button>
          <h1 className="text-lg font-semibold">Contacts</h1>
        </div>

        {/* Carousel under header */}
        <div className="px-4 py-3">
          <div className="w-full h-28 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 
                          flex items-center justify-center text-white font-semibold shadow">
            Carousel Area
          </div>
        </div>
      </div>

      {/* 📒 White floating container (search + list only) */}
      <div
        className="flex-1 relative -mt-4
                   bg-white dark:bg-black
                   rounded-t-3xl shadow-lg
                   z-10 overflow-hidden"
      >
        {filteredShops.length > 0 ? (
          <ShopList shops={filteredShops} />
        ) : (
          <p className="p-4 text-center text-gray-500 dark:text-gray-400">
            No contacts found for {homeCity || "all cities"}.
          </p>
        )}
      </div>
    </div>
  );
}
