import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {a: 14, b: 2, action: Action.Add};
    const result = simpleCalculator(input);
    expect(result).toBe(16);
  });

  test('should subtract two numbers', () => {
    const input = {a: 14, b: 2, action: Action.Subtract};
    const result = simpleCalculator(input);
    expect(result).toBe(12);
  });

  test('should multiply two numbers', () => {
    const input = {a: 14, b: 2, action: Action.Multiply};
    const result = simpleCalculator(input);
    expect(result).toBe(28);
  });

  test('should divide two numbers', () => {
    const input = {a: 14, b: 2, action: Action.Divide};
    const result = simpleCalculator(input);
    expect(result).toBe(7);
  });

  test('should exponentiate two numbers', () => {
    const input = {a: 14, b: 2, action: Action.Exponentiate};
    const result = simpleCalculator(input);
    expect(result).toBe(196);
  });

  test('should return null for invalid action', () => {
    const input = {a: 14, b: 2, action: 'InvalidAction'};
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = {a: 'A', b: 2, action: Action.Add};
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });
});
