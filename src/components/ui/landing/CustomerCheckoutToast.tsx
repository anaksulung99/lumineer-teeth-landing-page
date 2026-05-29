"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const buyers = [
  "Nadia P.",
  "Rizky A.",
  "Sinta R.",
  "Maya L.",
  "Dewi K.",
  "Ayu F.",
  "Intan S.",
  "Putri N.",
  "Fajar H.",
  "Dian M.",
];

const cities = [
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Medan",
  "Yogyakarta",
  "Semarang",
  "Bekasi",
  "Tangerang",
  "Makassar",
  "Denpasar",
  "Palembang",
  "Malang",
];

const checkoutTimes = [
  "Baru saja checkout",
  "Checkout 1 menit lalu",
  "Checkout 3 menit lalu",
  "Checkout 5 menit lalu",
  "Checkout 8 menit lalu",
  "Checkout 12 menit lalu",
];

const avatarColors = [
  "bg-cyan-600",
  "bg-emerald-600",
  "bg-rose-600",
  "bg-violet-600",
  "bg-amber-600",
  "bg-sky-600",
  "bg-teal-600",
  "bg-fuchsia-600",
];

type CheckoutNotification = {
  name: string;
  city: string;
  time: string;
  rating: string;
  avatarColor: string;
};

function pickRandom(items: string[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function makeNotification(): CheckoutNotification {
  return {
    name: pickRandom(buyers),
    city: pickRandom(cities),
    time: pickRandom(checkoutTimes),
    rating: (4.7 + Math.random() * 0.3).toFixed(1),
    avatarColor: pickRandom(avatarColors),
  };
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .replace(".", "")
    .slice(0, 2)
    .toUpperCase();
}

export function CustomerCheckoutToast() {
  const [notification, setNotification] = useState<CheckoutNotification | null>(
    null,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;

    const showNextNotification = () => {
      setVisible(false);

      hideTimer = setTimeout(() => {
        setNotification(makeNotification());
        setVisible(true);
      }, 450);
    };

    const initialTimer = setTimeout(showNextNotification, 1400);
    const interval = setInterval(showNextNotification, 8200);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);

  if (!notification) return null;

  return (
    <div
      className={`fixed right-4 top-4 z-50 w-[calc(100vw-2rem)] max-w-90 transition-all duration-500 sm:right-5 sm:top-5 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
      }`}
      aria-live="polite"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-2xl shadow-slate-900/15 backdrop-blur">
        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-black text-white ${notification.avatarColor}`}
        >
          {getInitials(notification.name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-sm font-black text-slate-950">
              {notification.name}
            </p>

            <div className="flex shrink-0 items-center gap-1 text-xs font-bold text-amber-500">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              <span>{notification.rating}</span>
            </div>
          </div>

          <p className="mt-0.5 truncate text-xs font-semibold text-slate-500">
            {notification.time} dari {notification.city}
          </p>
        </div>
      </div>
    </div>
  );
}
