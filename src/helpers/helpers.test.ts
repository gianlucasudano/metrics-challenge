import { secondToHumanReadable } from './helpers';

describe('secondToHumanReadable', () => {
  it('returns a valif object with hours, minutes and seconds', () => {
    expect(secondToHumanReadable(17500)).toStrictEqual({
      hours: '04',
      minutes: '51',
      seconds: '40',
    });
  });
});
