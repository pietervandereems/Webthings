const { Thing, Property, SingleThing, Value, WebThingServer } = require('webthing');
const { isDark } = require('../Utils/sun');
const lampsOn = require('./lamps');

const indicator = new Thing('urn:dev:ops:indicator:dark',
  'Indicator Dark',
  ['BinarySensor', 'BooleanProperty'],
  'A Darkness indicator with a time limit');

const dark = new Value(lampsOn()(isDark()));

indicator.addProperty(
  new Property(
    indicator,
    true,
    dark,
    {
      '@type': 'BooleanProperty',
      description: 'Whether to turn on lamps to scare away the darkness',
      readOnly: true,
      title: 'True/False',
      type: 'boolean'
    })
);

const checkTime = setInterval(() => {
  const turnLampsOn = lampsOn();
  if (turnLampsOn !== dark.get()) {
    console.log('lampsOn changed to', turnLampsOn);
    dark.set(turnLampsOn);
  }
});

const server = new WebThingServer(new SingleThing(indicator), 8888);

process.on('SIGINT', () => {
  server.stop()
    .then(() => {
      clearInterval(checkTime);
      // eslint-disable-next-line no-process-exit
      process.exit();
    })
    .catch(err => {
      throw new Error('Stopping server error', err);
    });
});

server.start().catch(console.error);

