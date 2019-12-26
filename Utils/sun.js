// Adapted (read "Copied") from https://github.com/Triggertrap/sun-js
// From https://github.com/ascorbic

const getDayOfYear = (now = new Date()) => {
  const oneJan = new Date(now.getFullYear(), 0, 1);

  return Math.ceil((now - oneJan) / 86400000);
};

const mod = (top, lower) => {
  let result = top % lower;
  if (result < 0) {
    result += lower;
  }

  return result;
};

const sinDeg = deg => Math.sin(deg * 2.0 * Math.PI / 360.0);
const cosDeg = deg => Math.cos(deg * 2.0 * Math.PI / 360.0);
const tanDeg = deg => Math.tan(deg * 2.0 * Math.PI / 360.0);
const asinDeg = deg => Math.asin(deg) * 360.0 / (2 * Math.PI);
const acosDeg = deg => Math.acos(deg) * 360.0 / (2 * Math.PI);

const sunriseSunset = ({ now = new Date(), latitude = 52.266075, longitude = 6.155217, sunrise = true, zenith = 90.8333 } = {}) => {
  console.log({ now });
  const degreesPerHour = 360 / 24;
  const hoursFromMeridian = longitude / degreesPerHour;
  const approxTimeOfEventInDays = getDayOfYear(now) + ((sunrise ? 6 : 18 - hoursFromMeridian) / 24);
  const sunMeanAnomaly = (0.9856 * approxTimeOfEventInDays) - 3.289;
  const sunTrueLongitude = mod(
    sunMeanAnomaly + (1.916 * sinDeg(sunMeanAnomaly)) + (0.020 * sinDeg(2 * sunMeanAnomaly)) + 282.634,
    360
  );
  const ascension = 0.91764 * tanDeg(sunTrueLongitude);
  const lQuadrant = Math.floor(sunTrueLongitude / 90) * 90;

  const aRightAscension = mod(360 / (2 * Math.PI) * Math.atan(ascension), 360);
  const raQuadrant = Math.floor(aRightAscension / 90) * 90;
  const rightAscension = (mod(360 / (2 * Math.PI) * Math.atan(ascension), 360) + (lQuadrant - raQuadrant)) / degreesPerHour;

  const sinDec = 0.39782 * sinDeg(sunTrueLongitude);
  const cosDec = cosDeg(asinDeg(sinDec));

  const cosLocalHourAngle = ((cosDeg(zenith)) - (sinDec * (sinDeg(latitude)))) / (cosDec * (cosDeg(latitude)));
  const acosDegLocalHourAngle = acosDeg(cosLocalHourAngle);
  const localHourAngle = sunrise ?
    360 - acosDegLocalHourAngle :
    acosDegLocalHourAngle;
  const localHour = localHourAngle / degreesPerHour;
  const localMeanTime = localHour + rightAscension - (0.06571 * approxTimeOfEventInDays) - 6.622;

  const time = mod(localMeanTime - hoursFromMeridian, 24);
  console.log(time);

  return new Date(new Date(now).setUTCHours(0, 0, 0, 0) + (time * 60 * 60 * 1000));
};

const sunrise = ({ now = new Date(), latitude = 52.266075, longitude = 6.155217, zenith = 90.8333 } = {}) => sunriseSunset({
  latitude,
  longitude,
  now,
  sunrise: true,
  zenith
});

const sunset = ({ now = new Date(), latitude = 52.266075, longitude = 6.155217, zenith = 90.8333 } = {}) => sunriseSunset({
  latitude,
  longitude,
  now,
  sunrise: false,
  zenith
});

const isDark = () => new Date() > sunset();

module.exports = {
  isDark,
  sunrise,
  sunset
};
