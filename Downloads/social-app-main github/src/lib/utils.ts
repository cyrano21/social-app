import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}

// Utilisation de TypeScript pour le typage du paramètre
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (!dateString) {
    return "Date inconnue";
  }
  if (diffInSeconds < 60) {
    return "il y a moins d'une minute";
  } else if (diffInSeconds < 3600) {
    // Moins d'une heure
    const minutes = Math.floor(diffInSeconds / 60);
    return `il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else if (diffInSeconds < 86400) {
    // Moins d'un jour
    const hours = Math.floor(diffInSeconds / 3600);
    return `il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  } else {
    // Jours
    const days = Math.floor(diffInSeconds / 86400);
    return `il y a ${days} jour${days > 1 ? "s" : ""}`;
  }
};

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList?.includes(userId);
};
