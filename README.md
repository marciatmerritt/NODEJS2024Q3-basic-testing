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

[![Node JS][Node.JS Badge]][NodeJS-url]
[![NPM][npm]][NPM-url]
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
[![jest tested][jest tested]][Jest-url]

- **Node.js v20.x.x LTS** or higher

The project uses **Jest** as the testing framework. Refer to the [Jest documentation](https://jestjs.io/docs/getting-started) for more information on how to use Jest.

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

After running the tests, you will see the number of passing, failing, and skipped tests in the terminal. All tests should complete execution within **30 seconds**.

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

## Partial Mocking

In this exercise, you're aiming to mock some functions (mockOne, mockTwo, mockThree) from the ./index module, but leave others (unmockedFunction) unchanged so they behave as usual. Tests are written in `src/05-partial-mocking/index.test.ts`.

### What is Partial Mocking?

Partial mocking is the practice of mocking only certain methods in a module or class while leaving others intact. This approach allows you to isolate specific functions for testing without affecting the functionality of unrelated parts of the module. It is especially useful when you want to mock only a subset of behaviors while retaining the original implementation for the rest.

## Example Setup

Below is an example of how to perform partial mocking in Jest using `jest.spyOn` to selectively mock methods in a module:

```typescript
jest.spyOn(myModule, 'functionToMock').mockImplementation(() => 'mocked result');
```

### Test Setup

We use `beforeEach` and `afterEach` to manage console logging during tests to ensure that console logs are suppressed during the test and restored after each test is completed. For example:

```typescript
beforeEach(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
});
```
```typescript
afterEach(() => {
  consoleSpy.mockRestore();
});
```

### Key Jest Functions
- **`jest.mock(moduleName, factory)`**: Replaces the entire module with a mock implementation. However, we can combine it with `jest.requireActual` to only mock certain functions, leaving others intact.
- **`jest.spyOn(object, methodName)`**: Creates a mock for a specific method on an object or module. This is helpful for partial mocking.
- **`mockImplementation(fn)`**: Defines a custom implementation for a mocked function.

## Learn More

- [Jest - Mock Functions](https://jestjs.io/docs/mock-function-api)
- [How to Use Partial Mocks in Jest](https://javascript.plainenglish.io/using-jests-partial-mock-features-bc0b2f1b6a2e)

---

## Mocking Node.js API

In this section, we test code that interacts with Node.js APIs like `fs`, `setTimeout`, or `setInterval`. By mocking these APIs, we can avoid real file system changes or relying on real-time behavior during tests. Additionally, we mock the `fs` module's `readFile` function using Jest. This helps us test file-reading logic without relying on the actual filesystem. The tests are written in `src/06-mocking-node-api/index.test.ts`.

### What is Node.js API Mocking?

**Node.js API Mocking** is a testing technique used to simulate the behavior of native Node.js APIs such as file system operations (`fs`), timers (`setTimeout`, `setInterval`), HTTP modules (`http`, `https`), and more. The goal of mocking these APIs is to avoid real interactions with external dependencies or hardware (like file systems or network calls) during tests, allowing you to isolate and test the behavior of your code in a controlled environment.

By mocking the Node.js APIs, you can:
- **Prevent unintended side effects**: Avoid modifying files or interacting with actual external resources during testing.
- **Speed up tests**: Eliminate real delays from timers or I/O operations, making the tests faster and more predictable.
- **Simulate different conditions**: Control the output of APIs, including error scenarios, without depending on the real environment.

### Key Benefits of Node.js API Mocking:
- **Control over behavior**: You can simulate successful or failed API interactions without depending on the actual system.
- **Efficiency**: You can reduce test run time by eliminating real I/O or network interactions.
- **Test reliability**: Tests won't fail because of external factors like unavailable files or network errors.

### Example of Mocking Node.js `fs` API

Below is a sample test for mocking the `fs` module in a Node.js project:

```typescript
import { readFile } from 'fs/promises';
import { processFile } from './fileProcessor';  // Example function that processes file content

jest.mock('fs/promises');

describe('processFile', () => {
  const fileContent = 'Mock file content';

  beforeEach(() => {
    // Mock the resolved value of readFile
    (readFile as jest.Mock).mockResolvedValue(fileContent);
  });

  test('should process file content correctly', async () => {
    const result = await processFile('test-file.txt');
    expect(result).toBe('Processed: Mock file content');
  });

  afterEach(() => {
    jest.clearAllMocks();  // Clear mocks after each test
  });
});
```

### Explanation:
- **`jest.mock('fs/promises')`**: Mocks the `fs/promises` module so the real file system is not accessed.
- **`(readFile as jest.Mock).mockResolvedValue(fileContent)`**: Ensures that whenever `readFile` is called during the test, it resolves with the mocked file content (`fileContent`).
- **`jest.clearAllMocks()`**: Resets the mocked functions after each test, ensuring that the tests are independent.

### Key Jest Functions for Mocking:
- **`jest.mock(moduleName)`**: Automatically mocks all exports of a module.
- **`mockResolvedValue(value)`**: Mocks a function to return a resolved promise with the given value.
- **`jest.clearAllMocks()`**: Clears all mock calls and implementations.

### Learn More:
- [Jest - Mocking Node.js APIs](https://jestjs.io/docs/manual-mocks)
- [Node.js fs module](https://nodejs.org/api/fs.html)
- [Mocking Node.js APIs](https://www.digitalocean.com/community/tutorials/js-mock-node-api)

---

## Mocking Library API

In this section, we test code that interacts with third-party libraries like `axios` or `lodash`. By mocking these libraries, we ensure that our code behaves correctly without needing to make actual HTTP requests or relying on external functionality. Tests are written in `src/07-mocking-lib-api/index.test.ts`.

### What is Library API Mocking?

**Mocking Library API** refers to the practice of simulating or "mocking" the behavior of external libraries, services, or APIs in your tests. This allows developers to write tests that do not depend on external resources like databases, web services, or third-party APIs. Instead of calling real endpoints or libraries, the tests use mock versions that simulate the behavior of those external dependencies.

### Key Concepts of Mocking Library API:

1. **Simulating External Dependencies**: 
   - When an application interacts with third-party libraries or APIs, those dependencies can affect the outcome of a test. Mocking allows you to simulate how those external systems respond without actually interacting with them.
   
2. **Controlled Test Environment**:
   - By mocking libraries or APIs, you ensure that your tests run in a controlled environment. You avoid issues like fluctuating network speed, API downtime, rate limits, or inconsistent data, which could make tests unreliable.

3. **Isolation of Code**:
   - Mocking helps isolate the functionality of the code you are testing. The focus is on testing the logic and flow of your application without relying on real responses from external systems.

4. **Simulating Responses**:
   - You can specify what data the mocked API or library returns, whether it's a successful response (e.g., HTTP 200) or an error (e.g., HTTP 404). This allows you to test different scenarios and edge cases.

5. **Efficiency**:
   - Real API calls can be slow or costly. By mocking, you speed up your tests because no actual network requests are made. This helps in running the tests frequently during development or continuous integration.

### Key Elements of the Mocking Library API Section

1. **Axios Mocking**:
   - **`jest.mock('axios')`** is used to mock the entire Axios library, ensuring that all Axios calls are intercepted and simulated by the mocked version.
   - **`mockedAxios.get.mockResolvedValue`** is used to simulate the response returned from an API call without making an actual request.

2. **Testing Axios instance creation**:
   - The test checks whether the Axios instance is created with the correct base URL, which is crucial when dealing with services that require custom configurations.
   - **`jest.spyOn(axios, 'create')`** is used to spy on the `axios.create` method, allowing the test to verify that it's called with the correct configuration.

3. **Verifying API request URLs**:
   - The test checks that the correct relative path (e.g., `/posts`) is used in the Axios `get` request.
   - This ensures that the function interacts with the API as expected, even though the actual request is mocked.

4. **Validating the response data**:
   - The test confirms that the function returns the data from the mocked Axios response.
   - **`mockResolvedValue({ data: mockData })`** simulates a successful response from the API with `mockData`, allowing the test to verify that the returned data matches the mock.

### Mocking Library API: Detailed Breakdown of Tests

#### Test 1: Creating an Axios Instance
This test ensures that the function correctly creates an Axios instance with a provided base URL.

```typescript
test('should create instance with provided base url', async () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  
  // Simulate resolved response
  mockedAxios.get.mockResolvedValue({ data: {} });
  
  // Spy on axios.create
  jest.spyOn(axios, 'create').mockReturnValue(mockedAxios);
  
  // Execute the function
  await throttledGetDataFromApi('/posts');
  
  // Assert that axios.create was called with the correct base URL
  expect(axios.create).toHaveBeenCalledWith({ baseURL: baseUrl });
});
```

#### Test 2: Performing API Requests with Correct URL
This test ensures that the function makes a request to the correct relative path when calling the API.

```typescript
test('should perform request to correct provided url', async () => {
  const relativePath = '/posts';
  
  // Simulate resolved response
  mockedAxios.get.mockResolvedValue({ data: {} });
  
  // Spy on axios.create
  jest.spyOn(axios, 'create').mockReturnValue(mockedAxios);
  
  // Execute the function
  await throttledGetDataFromApi(relativePath);
  
  // Assert that axios.get was called with the correct URL
  expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
});
```

#### Test 3: Returning Response Data
This test validates that the function returns the correct response data from the mocked API request.

```typescript
test('should return response data', async () => {
  const mockData = { id: 1, title: 'Test Post' };
  
  // Simulate resolved response with mock data
  mockedAxios.get.mockResolvedValue({ data: mockData });
  
  // Spy on axios.create
  jest.spyOn(axios, 'create').mockReturnValue(mockedAxios);
  
  const relativePath = '/posts/1';
  
  // Execute the function
  const result = await throttledGetDataFromApi(relativePath);
  
  // Assert that the returned data matches the mock data
  expect(result).toEqual(mockData);
});
```

### Mocking Explanation
In each test, the Axios request is mocked to simulate different responses:
- **Mocking resolved responses** ensures the function behaves as if a real API call has succeeded and returned the expected data.
- **`jest.spyOn` and `mockResolvedValue`** are used to track how Axios methods are called and simulate the data they return, allowing tests to focus purely on function logic without external dependencies.

### Why Mocking Library API is Important
- **Deterministic tests**: Mocking ensures that your tests are not affected by network issues, rate limits, or changes to the external APIs.
- **Performance**: Mocking eliminates the need to wait for real network requests to complete, making tests faster and more efficient.
- **Isolated testing**: You can focus on testing the logic within your application without worrying about how the external service behaves.

### Learn More:
- [Mocking Modules in Jest](https://jestjs.io/docs/mock-functions#mocking-modules)
- [Mocking axios in Jest tests with Typescript](https://www.csrhymes.com/2022/03/09/mocking-axios-with-jest-and-typescript.html)

--- 
   
## Snapshot Testing

In this section, we use Jest's snapshot testing to ensure the consistency of output over time. Tests are written in `src/08-snapshot-testing/index.test.ts`.

### What is Snapshot Testing?

Snapshot testing is a very useful tool to ensure that your code (whether UI components or other functions) remains consistent over time.

Snapshot tests capture the output of a function or component at a given point in time. The output is stored in a "snapshot file" and compared to future test runs. If the output changes unexpectedly, the test will fail. This can be useful for ensuring that refactoring, bug fixes, or other changes don't unintentionally alter the output.

For example, you can use snapshot testing to verify that a function generating a linked list returns the expected structure each time it is called with the same inputs.

### Snapshot Testing Example with Jest

In this example, we'll show how to use Jest's snapshot testing with a function that generates a linked list from an array of values.

#### Step-by-Step Guide:

1. **Function to Test:**

   The `generateLinkedList` function takes an array of elements and returns a linked list. For instance, given `[1, 2, 3]`, it generates the following structure:

   ```javascript
   {
     value: 1,
     next: {
       value: 2,
       next: {
         value: 3,
         next: null
       }
     }
   }
   ```

2. **Writing the Snapshot Test:**

   Here's how you can use Jest's `toMatchSnapshot()` to ensure that the generated linked list remains consistent across multiple test runs.

   ```typescript
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
         }
       };
       expect(result).toStrictEqual(expected);  // Strict comparison for the first test
     });

     // Check match by comparison with snapshot
     test('should generate linked list from values 2', () => {
       const result = generateLinkedList([1, 2, 3]);
       expect(result).toMatchSnapshot();  // Snapshot comparison for the second test
     });
   });
   ```

3. **Running the Tests:**

   To run the tests and generate snapshots, run the following command:

   ```bash
   jest
   ```

   This will create a snapshot file in the `__snapshots__` directory next to the test file. For the linked list example, Jest will create a snapshot that looks like this:

   ```js
   // Jest Snapshot v1, https://goo.gl/fbAQLP
   exports[`should generate linked list from values 2`] = {
     "value": 1,
     "next": {
       "value": 2,
       "next": {
         "value": 3,
         "next": null
       }
     }
   };
   ```

4. **Updating Snapshots:**

   If you intentionally change the linked list structure and want to update the snapshot, run:

   ```bash
   jest --updateSnapshot
   ```

   Jest will update the stored snapshots with the new structure.

### Benefits of Snapshot Testing

- **Catch unintended changes:** Snapshot tests help catch unintended changes in the output of a function or component.
- **Easy to set up:** With Jest, snapshot testing is simple and requires minimal setup.
- **Human-readable output:** The output of the snapshot is often easy to read and understand, even for complex data structures.


### Learn More:
- [Jest - Snapshot Testing](https://jestjs.io/docs/snapshot-testing)
- [React Snapshot Testing](https://reactjs.org/docs/test-renderer.html#snapshot-testing)

---

## Authors

Marcia Merritt 

[![LinkedIn][Linkedin]][linkedin-url]

## Version History

* 0.1
    * Initial Release 18/10/2024

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<!--Markdown Links and Images -->
[Node.js Badge]: https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat
[Node JS]:https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/download
[tested with jest]: https://img.shields.io/badge/tested_with-jest-99424f.svg?logo=jest
[jest-url]:(https://github.com/jestjs/jest)
[jest tested]: https://img.shields.io/badge/Jest-tested-eee.svg?logo=jest&labelColor=99424f
[jest]:https://jestjs.io/img/jest-badge.svg
[NPM]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com/