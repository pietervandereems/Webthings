/* eslint-disable require-await */
import { describe } from 'riteway';
import lampsOn from '../lamps';

describe('lampsOn at Dark', async assert => {
  const dark = true;

  assert({
    given: '2020-01-01 06:31 +0100',
    should: 'return false',
    actual: lampsOn(new Date('2020-01-01T06:31+0100'))(dark),
    expected: false
  });

  assert({
    given: '2020-01-01 07:31 +0100',
    should: 'return true',
    actual: lampsOn(new Date('2020-01-01T07:31+0100'))(dark),
    expected: true
  });

  assert({
    given: '2020-01-01 23:00 +0100',
    should: 'return false',
    actual: lampsOn(new Date('2020-01-01T23:00+0100'))(dark),
    expected: false
  });

  assert({
    given: '2020-01-01 22:00 +0100',
    should: 'return true',
    actual: lampsOn(new Date('2020-01-01T22:00+0100'))(dark),
    expected: true
  });
});

describe('lampsOn when Light', async assert => {
  const dark = false;

  assert({
    given: '2020-01-01 07:31 +0100',
    should: 'return false',
    actual: lampsOn(new Date('2020-01-01T07:31+0100'))(dark),
    expected: false
  });

  assert({
    given: '2020-01-01 22:00 +0100',
    should: 'return false',
    actual: lampsOn(new Date('2020-01-01T22:00+0100'))(dark),
    expected: false
  });
});
