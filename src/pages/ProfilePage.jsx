import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, X, Home, BookOpen, Users, LogIn, LogOut } from "lucide-react";

export default function ProfileDrawer() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); // replace with real auth state later

  return (
    <>
      {/* Trigger button (Profile icon) */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <User size={22} />
      </button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer Content */}
            <motion.div
              className="fixed top-0 right-0 w-72 h-full bg-white dark:bg-gray-900 
                         shadow-lg z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 h-14 border-b dark:border-gray-700">
                <h2 className="font-bold text-lg">Menu</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* User Info */}
              <div className="flex flex-col items-center gap-2 py-6 border-b dark:border-gray-700">
                <img
                  src={
                    user?.photoURL ||
                    "https://placehold.co/100x100/E5E7EB/9CA3AF?text=User"
                  }
                  alt="User"
                  className="w-20 h-20 rounded-full border-4 shadow"
                />
                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                  {user ? user.displayName : "Welcome!"}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {user ? user.email : "Sign in to get started."}
                </p>
              </div>

              {/* Menu Links */}
              <nav className="flex-1 px-4 py-3 space-y-2">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Home size={18} />
                  Home
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Users size={18} />
                  Contacts
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <BookOpen size={18} />
                  Education
                </button>
              </nav>

              {/* Footer (Sign in / out) */}
              <div className="px-4 py-3 border-t dark:border-gray-700">
                {user ? (
                  <button
                    onClick={() => setUser(null)} // replace with real logout
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setUser({
                        displayName: "John Doe",
                        email: "john@example.com",
                        photoURL:
                          "https://placehold.co/100x100/60A5FA/FFFFFF?text=JD",
                      })
                    } // replace with real Google Sign-In
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <LogIn size={18} /> Sign In with Google
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
