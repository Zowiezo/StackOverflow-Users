import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Box, Spinner, SimpleGrid, Heading, Center } from '@chakra-ui/react';
import UserListItem from './UserListItem';

interface User {
  profile_image: string;
  display_name: string;
  reputation: number;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow'
        );
        setUsers(response.data.items);
      } catch (error: any) {
        setError(`Error fetching users: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = (displayName: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.display_name === displayName ? { ...user, isFollowing: true } : user
      )
    );
  };

  const handleUnfollow = (displayName: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.display_name === displayName ? { ...user, isFollowing: false } : user
      )
    );
  };

  const handleBlock = (displayName: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.display_name === displayName ? { ...user, isBlocked: true } : user
      )
    );
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box color="red" textAlign="center" marginTop="4">
        {error}
      </Box>
    );
  }

  return (
    <Box textAlign="center">
      <Center>
        <Heading as="h1" fontWeight="bold" fontSize="3xl" marginBottom="4" paddingTop="4">
          StackOverflow Users
        </Heading>
      </Center>
      <Box rounded="lg">
        <SimpleGrid columns={{ md: 2 }} gap={4}>
          {users.map((user) => (
            <Box key={user.display_name} width="100%">
              <UserListItem
                user={user}
                onFollow={handleFollow}
                onUnfollow={handleUnfollow}
                onBlock={handleBlock}
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default UserList;
