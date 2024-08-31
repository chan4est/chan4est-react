export const cloudflareURL = "https://imagedelivery.net/crS49sPQag93IjYdYatJlA";
export const r_300 = "300x300";
export const r_620 = "620x620";
export const r_720 = "720x720";
export const r_1500 = "1500x1500";
export const r_3000 = "3000x3000";

export function imgURL(hash, size) {
  return `${cloudflareURL}/${hash}/${size}`;
}
