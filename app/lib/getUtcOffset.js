export default function getUtcOffset(timeZone) {
  const now = new Date();

  // Format the same moment in the target timezone
  const tz = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).formatToParts(now);

  const tzHour = parseInt(tz.find(p => p.type === "hour").value);
  const tzMin = parseInt(tz.find(p => p.type === "minute").value);

  // UTC time
  const utcHour = now.getUTCHours();
  const utcMin = now.getUTCMinutes();

  // Convert both to total minutes
  const tzTotal = tzHour * 60 + tzMin;
  const utcTotal = utcHour * 60 + utcMin;

  // Difference between the two
  let diff = tzTotal - utcTotal;

  // Normalize to [-720, +720]
  if (diff > 720) diff -= 1440;
  if (diff < -720) diff += 1440;

  const sign = diff >= 0 ? "+" : "-";
  const abs = Math.abs(diff);
  const hours = String(Math.floor(abs / 60)).padStart(2, "0");
  const mins = String(abs % 60).padStart(2, "0");

  return `UTC ${sign}${hours}:${mins}`;
}
