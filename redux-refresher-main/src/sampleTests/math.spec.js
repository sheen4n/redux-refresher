import { isEven } from './math';
describe('isEven', () => {
  it('should return true if given even number', () => {
    expect(result).toEqual(true);
    const result = isEven(2);
  });

  it('should return false if given odd number', () => {
    const result = isEven(25);
    expect(result).toEqual(false);
  });
});
