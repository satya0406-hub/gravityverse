import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | number | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && envUrl.trim() !== "") {
    let url = envUrl.trim();
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    if (url.endsWith('/api')) {
      url = url.slice(0, -4);
    }
    return url;
  }
  
  // If running on GitHub Pages (either production URL or general user/org github.io),
  // automatically point to the Render backend URL.
  if (
    window.location.hostname.includes('github.io') || 
    window.location.hostname.includes('satya0406-hub')
  ) {
    return 'https://gravityverse-backend.onrender.com';
  }
  
  // Local/Preview fallback: Use current origin with base URL prefix so Express API is reachable
  const baseUrl = import.meta.env.BASE_URL || '';
  let url = window.location.origin;
  if (baseUrl && baseUrl !== '/') {
    url = `${url}${baseUrl}`;
  }
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  return url;
}
