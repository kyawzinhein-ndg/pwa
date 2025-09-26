import { useEffect, useState } from "react";
import ShopList from "../components/ShopList";
import LoadingScreen from "../components/LoadingScreen";

export default function ContactPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [homeCity, setHomeCity] = useState(
    () => localStorage.getItem("homeCity") || ""
  );

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

  // ✅ Watch localStorage changes (sync between MenuPage & ContactPage)
  useEffect(() => {
    const handleStorageChange = () => {
      setHomeCity(localStorage.getItem("homeCity") || "");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (loading) return <LoadingScreen />;

  // ✅ Filter shops by homeCity (if selected)
  const filteredShops = homeCity
    ? shops.filter((shop) => shop.city?.toLowerCase() === homeCity.toLowerCase())
    : shops;

  if (filteredShops.length === 0) {
    return (
      <p className="p-4 text-center text-gray-500 dark:text-gray-400">
        No contacts found for {homeCity || "all cities"}.
      </p>
    );
  }

  return <ShopList shops={filteredShops} />;
}
