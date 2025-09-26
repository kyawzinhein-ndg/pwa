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
      className="p-6 space-y-6"
    >
      {/* Header: Logo left, Name right */}
      <div className="flex items-center gap-4">
        <div className="p-1 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#2DD4BF] shrink-0">
          <img
            src={imageUrl}
            alt={safeName}
            className="h-20 w-20 rounded-full object-cover border-4 border-white dark:border-gray-900"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{safeName}</h2>
          {shop.category && (
            <span className="mt-1 text-xs px-3 py-1 self-start rounded-full bg-[#3B82F6]/10 dark:bg-[#2DD4BF]/10 text-[#3B82F6] dark:text-[#2DD4BF]">
              {shop.category}
            </span>
          )}
        </div>
      </div>

      {/* Address */}
      {shop.address && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm">
          <MapPin className="h-5 w-5 text-[#3B82F6] dark:text-[#2DD4BF] shrink-0 mt-1" />
          <span className="text-sm">{shop.address}</span>
        </div>
      )}

      {/* Phones (responsive width) */}
      {shop.phones?.length > 0 && (
        <div
          className={`grid gap-3 ${
            shop.phones.length === 2 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {shop.phones.map((phone, idx) => (
            <motion.a
              key={idx}
              href={`tel:${phone.number}`}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 p-3 rounded-xl border shadow-sm 
                         hover:bg-[#3B82F6]/5 dark:hover:bg-[#2DD4BF]/5 
                         transition text-sm font-medium w-full"
            >
              <Phone className="h-4 w-4 text-[#3B82F6] dark:text-[#2DD4BF]" />
              {phone.number}
            </motion.a>
          ))}
        </div>
      )}

      {/* Socials */}
      <div className="flex gap-5 justify-center">
        {shop.socials?.facebook && (
          <motion.a
            href={shop.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-full bg-[#3B82F6] text-white shadow-md"
          >
            <Facebook className="h-5 w-5" />
          </motion.a>
        )}
        {shop.socials?.viber && (
          <motion.a
            href={shop.socials.viber}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-full bg-purple-500 text-white shadow-md"
          >
            <MessageCircle className="h-5 w-5" />
          </motion.a>
        )}
        {shop.socials?.googleMap && (
          <motion.a
            href={shop.socials.googleMap}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-full bg-green-500 text-white shadow-md"
          >
            <MapIcon className="h-5 w-5" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
