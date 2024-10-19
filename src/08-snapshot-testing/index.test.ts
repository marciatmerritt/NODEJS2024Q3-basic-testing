import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList([1]);
    const expected = {
      value: 1,
      next: {
        value: null,
        next: null,
      },
    };
    expect(result).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList([1, 2, 3]);
    expect(result).toMatchSnapshot();
  });
});
