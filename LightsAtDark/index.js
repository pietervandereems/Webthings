const { Thing, Property, SingleThing, Value, WebThingServer } = require('webthing');
const { isDark } = require('../Utils/sun');
const lampsOn = require('./lamps');

const indicator = new Thing('urn:dev:ops:indicator:dark',
  'Chase away the darkness',
  ['BinarySensor'],
  'A Darkness indicator with a time limit');

const dark = new Value(lampsOn()(isDark()));

indicator.addProperty(
  new Property(
    indicator,
    true,
    dark,
    {
      '@type': 'BooleanProperty',
      title: 'On',
      type: 'boolean',
      readOnly: true,
      description: 'Whether the lamps should be turned on to chase away the darkness'
    }
    )
);

const checkTime = setInterval(() => {
  const turnLampsOn = lampsOn()(isDark());
  if (turnLampsOn !== dark.get()) {
    dark.set(turnLampsOn);
  }
}, 60000);

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

