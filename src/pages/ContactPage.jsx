// src/pages/ContactPage.jsx
import { useEffect, useState } from "react";
import ShopList from "../components/ShopList";
import LoadingScreen from "../components/LoadingScreen";

export default function ContactPage() {
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

  // ✅ Show loading spinner while fetching
  if (loading) return <LoadingScreen />;

  // ✅ Filter shops by selected city
  const filteredShops = homeCity
    ? shops.filter(
        (shop) => shop.city?.toLowerCase() === homeCity.toLowerCase()
      )
    : shops;

  // ✅ Handle no results
  if (filteredShops.length === 0) {
    return (
      <p className="p-4 text-center text-gray-500 dark:text-gray-400">
        No contacts found for {homeCity || "all cities"}.
      </p>
    );
  }

  // ✅ Pass filtered list into ShopList
  return <ShopList shops={filteredShops} />;
}
