# Basic Testing with Node.js and Jest

This repository contains unit tests for a Node.js project, focusing on different testing techniques and tools such as Jest. The purpose of the assignment is to demonstrate proficiency in writing tests for various scenarios like simple unit tests, table-driven tests, error handling, class testing, partial mocking, Node.js API mocking, and more.

## Project Overview

The goal of this assignment is to write comprehensive unit tests for code provided in the repository using **Jest**. This includes testing functions, handling errors, mocking APIs, and creating snapshot tests.

The project is divided into several sections, each focusing on a different testing strategy:
- Simple Tests
- Table-Driven Tests
- Error Handling & Asynchronous Functions
- Testing Classes
- Partial Mocking
- Mocking Node.js API
- Mocking Library API
- Snapshot Testing

## Prerequisites

To run and test the code, ensure you have the following installed on your machine:
- **Node.js v20.x.x LTS** or higher
- **npm** (comes with Node.js)

## Installation

Follow these steps to set up the project locally:

1. **Fork** this repository:  
   Go to https://github.com/marciatmerritt/NODEJS2024Q3-basic-testing.git and click on "Fork" to create a personal copy.

2. **Clone** your forked repository:  
   Replace `<your_github_username>` with your actual GitHub username.
   ```bash
   git clone https://github.com/<your_github_username>/basic-testing.git
   ```

3. **Navigate to the project directory**:
   ```bash
   cd basic-testing
   ```

4. **Install dependencies**:
   Use the following command to install all required npm packages:
   ```bash
   npm install
   ```

## Running the Tests

This project includes a number of test scripts to verify the code. The tests are written using the **Jest** testing framework.

You can run the tests by using the following npm commands:

### Run Unit Tests
```bash
npm run test
```

### Run Unit Tests with Verbose Logging
```bash
npm run test:verbose
```

After running the tests, you will see the number of passing, failing, and skipped tests in the terminal.

## Testing Sections

## Simple Tests

In this section, we write basic unit tests for the `simpleCalculator` function. Unit testing involves verifying that individual units of code (like functions or classes) work as expected. Tests are written in `src/01-simple-tests/index.test.ts`.

### What is Unit Testing?

Unit testing is a software testing method where individual pieces of code, such as functions or methods, are tested in isolation from the rest of the application. It helps ensure that each function performs as expected under various input conditions.

### Example of a Unit Test in Jest

```typescript
test('adds 5 + 3 to equal 8', () => {
  expect(simpleCalculator(5, 3, '+')).toBe(8);
});
```

This test checks if adding 5 and 3 using the `simpleCalculator` function returns the expected value, 8.

### Learn More:
- [Jest - Getting Started with Unit Testing](https://jestjs.io/docs/getting-started)
- [What is Unit Testing?](https://martinfowler.com/bliki/UnitTest.html) - By Martin Fowler

---

## Table Tests

In this section we rewrite the tests using **table-driven tests** to rewrite the tests for the `simpleCalculator` function. Table-driven testing organizes multiple test cases into a "table" or array of test data, allowing you to loop over the inputs and expected outputs instead of writing separate test cases for each. This helps in avoiding repetitive code and makes it easier to maintain and extend test cases. Tests are written in `src/02-table-tests/index.test.ts`.

### What is Table-Driven Testing?

Table-driven testing allows you to test multiple scenarios in a more organized and efficient way. Instead of writing separate test cases for each input/output pair, you define a "table" of test cases (usually an array of objects in code) and loop over them to execute the same logic.

### Example of Table-Driven Test with Jest

Here’s a simple example of a table-driven test in Jest:

```typescript
describe('simpleCalculator', () => {
  const testCases = [
    { a: 5, b: 3, action: '+', expected: 8 },
    { a: 5, b: 3, action: '-', expected: 2 },
    { a: 5, b: 3, action: '*', expected: 15 },
    { a: 9, b: 3, action: '/', expected: 3 },
    { a: 2, b: 3, action: '^', expected: 8 },
    { a: 5, b: 3, action: 'invalid', expected: null },
  ];

  test.each(testCases)('$a $action $b should return $expected', ({ a, b, action, expected }) => {
    const result = simpleCalculator(a, b, action);
    expect(result).toBe(expected);
  });
});
```

In this example, `test.each` allows us to iterate over the `testCases` array, running the same test logic for each case.

### How to Learn More

For more information on table-driven testing in Jest, you can refer to the following resources:
- [Jest - Test Each](https://jestjs.io/docs/api#testeachtablename-fn-timeout): Official documentation for `test.each` in Jest.
- [Table-Driven Tests in JavaScript](https://dmitripavlutin.com/table-driven-tests-javascript/): A blog post explaining the concept of table-driven testing in JavaScript.

---



## Error Handling & Async

In this section, we write tests for functions that handle errors and asynchronous operations. These tests verify that the functions correctly handle exceptions and resolve or reject as expected. Tests are written in `src/03-error-handling-async/index.test.ts`.

### What is Error Handling & Asynchronous Testing?

Error handling tests ensure that the code properly throws or rejects errors under exceptional conditions. Asynchronous testing verifies that functions using promises, `async`/`await`, or callback patterns work correctly, ensuring that they resolve or reject as expected.

### Real Test Cases:

1. **`resolveValue` Function:**
   This test ensures that the `resolveValue` function returns the provided value after resolving a promise.

   ```typescript
   describe('resolveValue', () => {
     test('should resolve provided value', async () => {
       const value = 'test';
       const resolvedValue = await resolveValue(value);
       expect(resolvedValue).toBe(value);
     });
   });
   ```

   - **Explanation:** The test calls `resolveValue` with the string `'test'`, and it expects the resolved value to be the same as the input.

2. **`throwError` Function:**
   These tests verify that the `throwError` function throws the appropriate error based on the input provided (or the default message if no input is provided).

   ```typescript
   describe('throwError', () => {
     test('should throw error with provided message', () => {
       expect(() => throwError('Custom message')).toThrow('Custom message');
     });

     test('should throw error with default message if message is not provided', () => {
       expect(() => throwError()).toThrow('Oops!');
     });
   });
   ```

   - **Explanation:**  
     - The first test checks that when a custom message (`'Custom message'`) is passed, `throwError` throws an error with that message.
     - The second test checks that if no message is provided, `throwError` throws an error with the default message `'Oops!'`.

3. **`throwCustomError` Function:**
   This test verifies that the `throwCustomError` function throws a custom error of the type `MyAwesomeError` with a specific message.

   ```typescript
   describe('throwCustomError', () => {
     test('should throw custom error', () => {
       expect(() => throwCustomError()).toThrowError(MyAwesomeError);
       expect(() => throwCustomError()).toThrowError(
         'This is my awesome custom error!',
       );
     });
   });
   ```

   - **Explanation:**  
     - The test first checks that `throwCustomError` throws an error of type `MyAwesomeError`.
     - Then it verifies that the error message is `'This is my awesome custom error!'`.

4. **`rejectCustomError` Function:**
   This test ensures that the `rejectCustomError` function rejects the custom error `MyAwesomeError` with the correct message.

   ```typescript
   describe('rejectCustomError', () => {
     test('should reject custom error', async () => {
       expect.assertions(2);
       try {
         await rejectCustomError();
       } catch (error) {
         expect(error).toBeInstanceOf(MyAwesomeError);
         const myError = error as MyAwesomeError;
         expect(myError.message).toBe('This is my awesome custom error!');
       }
     });
   });
   ```

   - **Explanation:**  
     - This test uses `expect.assertions(2)` to ensure that both assertions inside the `catch` block are executed.
     - It checks that the rejected error is an instance of `MyAwesomeError` and that the error message is `'This is my awesome custom error!'`.

### Learn More:
- [Jest - Testing Asynchronous Code](https://jestjs.io/docs/asynchronous)
- [Error Handling in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)

---

4. **Class Testing**:  
   Test a class representing a bank account, which handles various operations, some of which are asynchronous and might throw errors.

   

## Testing Classes

In this section, we test a class representing a bank account, which handles various operations, some of which are asynchronous and might throw errors. Tests are written in `src/04-test-class/index.test.ts`.

### What is Class Testing?

Class testing ensures that the methods in a class work together as expected. In object-oriented programming, testing classes means testing individual methods as well as their interactions with each other.

### Example in Jest:

```typescript
test('should create a new bank account with initial balance', () => {
  const account = new BankAccount(100);
  expect(account.getBalance()).toBe(100);
});
```

### Learn More:
- [Jest - Testing Classes](https://jestjs.io/docs/es6-class-mocks)
- [Unit Testing for Classes](https://www.toptal.com/nodejs/node-js-unit-testing-tutorial)

---
5. **Partial Mocking**:  
   Utilize Jest to partially mock modules.

   Tests are written in `src/05-partial-mocking/index.test.ts`.

6. **Mocking Node.js API**:  
   Test the proper usage of the Node.js API by mocking common functions like `fs`, `setTimeout`, and `setInterval` to avoid interacting with the actual file system or relying on real-time delays.

   Tests are written in `src/06-mocking-node-api/index.test.ts`.

7. **Mocking Library API**:  
   Test the functionality of a function that utilizes a third-party library, e.g., `axios` or `lodash`.

   Tests are written in `src/07-mocking-lib-api/index.test.ts`.

8. **Snapshot Testing**:  
   Use Jest's snapshot testing to ensure the consistency of output over time.

   Tests are written in `src/08-snapshot-testing/index.test.ts`.



## Notes

- Ensure that your tests complete execution within **30 seconds**.
- The project uses **Jest** as the testing framework. Refer to the [Jest documentation](https://jestjs.io/docs/getting-started) for more information on how to use Jest.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
