import timeUtil from './time';

const oneSecond = 1000;
const oneMinute = oneSecond * 60;
// const oneHour = oneMinute * 60;

describe('timeUtil.millisecondsToTime', () => {
  describe('00 seconds', () => {
    it('displays 00:00', () => {
      expect(timeUtil.millisecondsToTime(0)).toEqual('00:00');
    });
  });

  describe('01 seconds', () => {
    it('displays 00:01', () => {
      expect(timeUtil.millisecondsToTime(oneSecond)).toEqual('00:01');
    });
  });

  describe('30 seconds', () => {
    it('displays 00:30', () => {
      expect(timeUtil.millisecondsToTime(oneSecond * 30)).toEqual('00:30');
    });
  });

  describe('59 seconds', () => {
    it('displays 00:59', () => {
      expect(timeUtil.millisecondsToTime(oneSecond * 59)).toEqual('00:59');
    });
  });

  describe('1 minute', () => {
    it('displays 01:00', () => {
      expect(timeUtil.millisecondsToTime(oneMinute)).toEqual('01:00');
    });
  });

  describe('1 minute 1 second', () => {
    it('displays 01:01', () => {
      expect(timeUtil.millisecondsToTime(oneMinute + oneSecond)).toEqual('01:01');
    });
  });

  describe('2 minute 30 seconds', () => {
    it('displays 02:30', () => {
      expect(timeUtil.millisecondsToTime(2 * oneMinute + 30 * oneSecond)).toEqual('02:30');
    });
  });

  describe('10 minutes 30 seconds', () => {
    it('displays 10:30', () => {
      expect(timeUtil.millisecondsToTime(10 * oneMinute + 30 * oneSecond)).toEqual('10:30');
    });
  });
});
