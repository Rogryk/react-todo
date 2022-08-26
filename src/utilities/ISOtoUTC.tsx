export const ISOtoUTC = (iso: Date) => {
  const moment = require("moment");
  const isoString = iso.toISOString;
  return moment(isoString).format();
};
