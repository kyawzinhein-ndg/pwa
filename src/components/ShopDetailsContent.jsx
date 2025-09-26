import { motion } from "framer-motion";
import { MapPin, Phone, Facebook, MessageCircle, Map as MapIcon } from "lucide-react";

export default function ShopDetailsContent({ shop }) {
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
      className="p-4"
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <img
          src={imageUrl}
          alt={safeName}
          className="h-20 w-20 rounded-full object-cover border"
        />
        <h2 className="mt-2 text-lg font-semibold">{safeName}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
          {shop.category}
        </p>
      </div>

      {/* Address */}
      {shop.address && (
        <div className="flex items-start gap-2 text-sm mt-4">
          <MapPin className="h-5 w-5 text-gray-500 shrink-0" />
          <span>{shop.address}</span>
        </div>
      )}

      {/* Phones */}
      {shop.phones?.length > 0 && (
        <div className="mt-4 space-y-2">
          {shop.phones.map((phone, idx) => (
            <a
              key={idx}
              href={`tel:${phone.number}`}
              aria-label={`Call ${phone.number}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Phone className="h-4 w-4" />
              {phone.number}
            </a>
          ))}
        </div>
      )}

      {/* Socials */}
      <div className="flex gap-3 mt-6 justify-center">
        {shop.socials?.facebook && (
          <a
            href={shop.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-3 rounded-full border hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
          >
            <Facebook className="h-5 w-5 text-blue-600" />
          </a>
        )}
        {shop.socials?.viber && (
          <a
            href={shop.socials.viber}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Viber"
            className="p-3 rounded-full border hover:bg-purple-50 dark:hover:bg-purple-900/20 transition"
          >
            <MessageCircle className="h-5 w-5 text-purple-600" />
          </a>
        )}
        {shop.socials?.googleMap && (
          <a
            href={shop.socials.googleMap}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Maps"
            className="p-3 rounded-full border hover:bg-green-50 dark:hover:bg-green-900/20 transition"
          >
            <MapIcon className="h-5 w-5 text-green-600" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
