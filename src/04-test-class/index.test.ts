import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  let account: BankAccount;
  const account2 = new BankAccount(200);

  beforeEach(() => {
    account = getBankAccount(250);
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(250);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      account.withdraw(300);
    } catch (error) {
      expect.assertions(2);
      expect(error).toBeInstanceOf(InsufficientFundsError);
      const myError = error as InsufficientFundsError;
      expect(myError.message).toBe(
        `Insufficient funds: cannot withdraw more than ${account.getBalance()}`,
      );
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      account.transfer(300, account2);
    } catch (error) {
      expect.assertions(2);
      expect(error).toBeInstanceOf(InsufficientFundsError);
      const myError = error as InsufficientFundsError;
      expect(myError.message).toBe(
        `Insufficient funds: cannot withdraw more than ${account.getBalance()}`,
      );
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      account.transfer(200, account);
    } catch (error) {
      expect.assertions(2);
      expect(error).toBeInstanceOf(TransferFailedError);
      const myError = error as TransferFailedError;
      expect(myError.message).toBe('Transfer failed');
    }
  });

  test('should deposit money', () => {
    account.deposit(50);
    expect(account.getBalance()).toBe(300);
  });

  test('should withdraw money', () => {
    account.withdraw(50);
    expect(account.getBalance()).toBe(200);
  });

  test('should transfer money', () => {
    account.transfer(200, account2);
    expect(account.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(400);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);
    const balance = await account.fetchBalance();
    expect(balance).toBe(50);
    expect(account.getBalance()).toBe(250);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    try {
      await account.synchronizeBalance();
    } catch (error) {
      expect.assertions(2);
      expect(error).toBeInstanceOf(SynchronizationFailedError);
      const myError = error as SynchronizationFailedError;
      expect(myError.message).toBe('Synchronization failed');
    }
  });
});
