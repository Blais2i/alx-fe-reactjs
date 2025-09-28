import axios from 'axios';
import { fetchUserData } from './githubService';

jest.mock('axios');

test('fetchUserData calls GitHub API with correct username', async () => {
  const mockData = { login: 'octocat' };
  axios.get.mockResolvedValue({ data: mockData });

  const result = await fetchUserData('octocat');
  expect(result).toEqual(mockData);
  expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/octocat');
});
