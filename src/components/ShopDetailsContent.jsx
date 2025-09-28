// src/components/ShopDetailsContent.jsx
import { motion } from "framer-motion";
import { MapPin, Phone, Facebook, MessageCircle, Map as MapIcon, X } from "lucide-react";

export default function ShopDetailsContent({ shop, onClose }) {
  if (!shop) return null;

  const safeName = shop.name || "No Name";
  const imageUrl =
    shop.logo && shop.logo.startsWith("/images/")
      ? shop.logo
      : `https://placehold.co/120x120?text=${safeName.charAt(0)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full px-6 py-6 flex flex-col gap-6"
    >
      {/* Header with logo + name + optional close */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 shrink-0 shadow-md">
            <img
              src={imageUrl}
              alt={safeName}
              className="h-20 w-20 rounded-full object-cover border-4 border-white dark:border-gray-900"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">{safeName}</h2>
            {shop.category && (
              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-teal-900/30 text-blue-600 dark:text-teal-300 font-medium self-start">
                {shop.category}
              </span>
            )}
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
      </div>

      {/* Address */}
      {shop.address && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <MapPin className="h-5 w-5 text-blue-500 dark:text-teal-400 shrink-0 mt-1" />
          <span className="text-sm leading-relaxed">{shop.address}</span>
        </div>
      )}

      {/* Phones */}
      {shop.phones?.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {shop.phones.map((phone, idx) => (
            <motion.a
              key={idx}
              href={`tel:${phone.number}`}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 p-4 rounded-xl border shadow-sm 
                         hover:bg-blue-50 dark:hover:bg-teal-900/20 transition text-sm font-medium 
                         bg-white dark:bg-gray-900"
            >
              <Phone className="h-4 w-4 text-blue-500 dark:text-teal-400" />
              {phone.number}
            </motion.a>
          ))}
        </div>
      )}

      {/* Socials */}
      {(shop.socials?.facebook || shop.socials?.viber || shop.socials?.googleMap) && (
        <div className="flex gap-4 justify-start sm:justify-center">
          {shop.socials?.facebook && (
            <SocialButton
              href={shop.socials.facebook}
              icon={Facebook}
              color="bg-[#1877F2]"
              label="Facebook"
            />
          )}
          {shop.socials?.viber && (
            <SocialButton
              href={shop.socials.viber}
              icon={MessageCircle}
              color="bg-[#7360F2]"
              label="Viber"
            />
          )}
          {shop.socials?.googleMap && (
            <SocialButton
              href={shop.socials.googleMap}
              icon={MapIcon}
              color="bg-[#34A853]"
              label="Google Maps"
            />
          )}
        </div>
      )}
    </motion.div>
  );
}

// 🔹 Reusable Social Button
function SocialButton({ href, icon: Icon, color, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center p-4 rounded-full text-white shadow-md hover:shadow-lg transition ${color}`}
    >
      <Icon className="h-5 w-5" />
    </motion.a>
  );
}
