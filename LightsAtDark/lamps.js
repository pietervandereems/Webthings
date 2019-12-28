const lampsOn = (now = new Date()) => (dark = false) => {

  const now730 = new Date(now).setHours(7, 30);
  const now2300 = new Date(now).setHours(23, 0);
  const timestamp = now.getTime();

  if (dark) {

    if (timestamp < now2300 && timestamp > now730) {
      return true;
    }

  }

  return false;
};

module.exports = lampsOn;
