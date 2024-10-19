import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';

    mockedAxios.get.mockResolvedValue({ data: {} });
    jest.spyOn(axios, 'create').mockReturnValue(mockedAxios);

    await throttledGetDataFromApi('/posts');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: baseUrl,
    });
  });

  test('should perform request to correct provided url', async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });
    jest.spyOn(axios, 'create').mockReturnValue(mockedAxios);

    const relativePath = '/posts';

    await throttledGetDataFromApi(relativePath);

    expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockData = { id: 1, title: 'Test Post' };

    mockedAxios.get.mockResolvedValue({ data: mockData });
    jest.spyOn(axios, 'create').mockReturnValue(mockedAxios);

    const relativePath = '/posts/1';

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockData);
  });
});
