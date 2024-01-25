import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const isHttps = (url: string) => {
  const httpOrHttpsRegex = /^https?:\/\//;
  return httpOrHttpsRegex.test(url);
};

export const validateUrl = (url: string) => {
  const urlRegex = isHttps(url)
    ? /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
    : /^(http?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(url);
};
