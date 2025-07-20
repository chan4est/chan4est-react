export default function getGmtOffset(timeZone) {
    const date = new Date();
    const tzDate = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      timeZoneName: 'longOffset',
    }).formatToParts(date);
  
    const offsetPart = tzDate.find(p => p.type === 'timeZoneName')?.value;
    return offsetPart
  }