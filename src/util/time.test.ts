import timeUtil from './time';

const oneSecond = 1000;
const oneMinute = oneSecond * 60;
// const oneHour = oneMinute * 60;

describe('timeUtil.millisecondsToTime', () => {
  describe('0 seconds', () => {
    it('returns 00:00', () => expect(timeUtil.millisecondsToTime(0)).toEqual('00:00'));
  });

  describe('01 seconds', () => {
    it('returns 00:01', () => expect(timeUtil.millisecondsToTime(oneSecond)).toEqual('00:01'));
  });

  describe('30 seconds', () => {
    it('returns 00:30', () => expect(timeUtil.millisecondsToTime(oneSecond * 30)).toEqual('00:30'));
  });

  describe('59 seconds', () => {
    it('returns 00:59', () => expect(timeUtil.millisecondsToTime(oneSecond * 59)).toEqual('00:59'));
  });

  describe('1 minute', () => {
    it('returns 01:00', () => expect(timeUtil.millisecondsToTime(oneMinute)).toEqual('01:00'));
  });

  describe('1 minute 1 second', () => {
    it('returns 01:01', () => expect(timeUtil.millisecondsToTime(oneMinute + oneSecond)).toEqual('01:01'));
  });

  describe('2 minute 30 seconds', () => {
    it('returns 02:30', () => expect(timeUtil.millisecondsToTime(2 * oneMinute + 30 * oneSecond)).toEqual('02:30'));
  });

  describe('10 minutes 30 seconds', () => {
    it('returns 10:30', () => expect(timeUtil.millisecondsToTime(10 * oneMinute + 30 * oneSecond)).toEqual('10:30'));
  });
});

describe('timeUtil.timeToMilliseconds', () => {
  describe('00:00', () => {
    it('returns 0', () => expect(timeUtil.timeToMilliseconds('00:00')).toEqual(0));
  });

  describe('00:01', () => {
    it('returns 1000', () => expect(timeUtil.timeToMilliseconds('00:01')).toEqual(1000));
  });

  describe('01:01', () => {
    it('returns 61000', () => expect(timeUtil.timeToMilliseconds('01:01')).toEqual(61000));
  });

  describe('partial value', () => {
    it('returns 0', () => expect(timeUtil.timeToMilliseconds('10:')).toEqual(0));
  });

  describe('dud value', () => {
    it('returns 0', () => expect(timeUtil.timeToMilliseconds('erf')).toEqual(0));
  });
});
