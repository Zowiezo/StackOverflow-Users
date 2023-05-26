import React from 'react';
import { render, screen } from '@testing-library/react';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import UserList from './UserList';

jest.mock('axios');

describe('UserList', () => {
  const mockedUsers = [
    {
      profile_image: 'image1.jpg',
      display_name: 'User1',
      reputation: 100,
    },
    {
      profile_image: 'image2.jpg',
      display_name: 'User2',
      reputation: 200,
    },
  ];

  // beforeEach(() => {
  //   const response: AxiosResponse<any> = {
  //     data: { items: mockedUsers },
  //     status: 200,
  //     statusText: 'OK',
  //     headers: {},
  //     config: {},
  //   };
  //   (axios.get as jest.MockedFunction<
  //     (
  //       url: string,
  //       config?: AxiosRequestConfig | undefined
  //     ) => Promise<AxiosResponse<any>>
  //   >).mockResolvedValue(response);
  // });

  it('renders loading state', () => {
    render(<UserList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    (axios.get as jest.MockedFunction<
      (
        url: string,
        config?: AxiosRequestConfig | undefined
      ) => Promise<AxiosResponse<any>>
    >).mockRejectedValueOnce(new Error('Failed to fetch users'));
    render(<UserList />);
    const errorElement = await screen.findByText('Error: Failed to fetch users');
    expect(errorElement).toBeInTheDocument();
  });

  it('renders user list', async () => {
    render(<UserList />);
    const userList = await screen.findByRole('list');
    expect(userList).toBeInTheDocument();
    expect(userList.children.length).toBe(mockedUsers.length);
  });
});
