/* eslint-disable require-await */
import { describe } from 'riteway';
import lampsOn from '../lamps';

describe('lampsOn at Dark', async assert => {
  const dark = true;

  assert({
    given: '06:31',
    should: 'return false',
    actual: lampsOn(new Date('2020-01-01T06:31'))(dark),
    expected: false
  });

  assert({
    given: '07:31',
    should: 'return true',
    actual: lampsOn(new Date('2020-01-01T07:31'))(dark),
    expected: true
  });

  assert({
    given: '23:00',
    should: 'return false',
    actual: lampsOn(new Date('2020-01-01T23:00'))(dark),
    expected: false
  });

  assert({
    given: '22:00',
    should: 'return true',
    actual: lampsOn(new Date('2020-01-01T22:00'))(dark),
    expected: true
  });
});

describe('lampsOn at Light', async assert => {
  const dark = false;

  assert({
    given: '07:31',
    should: 'return false',
    actual: lampsOn(new Date('2020-01-01T07:31'))(dark),
    expected: false
  });

  assert({
    given: '22:00',
    should: 'return false',
    actual: lampsOn(new Date('2020-01-01T22:00'))(dark),
    expected: false
  });
});
