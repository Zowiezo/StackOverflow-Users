import React from 'react';
import {
  Box,
  Text,
  Image,
  Button,
  useColorModeValue,
  BoxProps,
  useStyleConfig,
} from '@chakra-ui/react';

interface User {
  profile_image: string;
  display_name: string;
  reputation: number;
  isFollowing?: boolean;
  isBlocked?: boolean;
}

interface UserListItemProps extends BoxProps {
  user: User;
  onFollow: (displayName: string) => void;
  onUnfollow: (displayName: string) => void;
  onBlock: (displayName: string) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  onFollow,
  onUnfollow,
  onBlock,
  ...rest
}) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const indicatorColor = useColorModeValue('green.500', 'green.200');
  const cardStyles = useStyleConfig('Card');

  const handleCardClick = () => {
    if (!user.isBlocked) {
      console.log(`Clicked on ${user.display_name}`);
    }
  };

  return (
    <Box
      as="div"
      sx={cardStyles}
      bg={user.isFollowing ? 'green.50' : cardBg}
      boxShadow="md"
      rounded="md"
      p={4}
      onClick={handleCardClick}
      opacity={user.isBlocked ? 0.5 : 1}
      cursor={user.isBlocked ? 'not-allowed' : 'pointer'}
      {...rest}
    >
      {user.isFollowing && (
        <Box
          bg={indicatorColor}
          borderRadius="full"
          w="6px"
          h="6px"
          position="absolute"
          top="4px"
          right="4px"
        />
      )}
      <Box display="flex" alignItems="center" justifyContent="center" marginBottom={4}>
        <Image src={user.profile_image} alt={user.display_name} borderRadius="full" boxSize="80px" />
      </Box>
      <Text textAlign="center" fontWeight="bold" fontSize="lg" mb={2}>
        {user.display_name}
      </Text>
      {!user.isBlocked && (
        <>
          <Text fontWeight="bold" textTransform="uppercase" fontSize="xs" mb={2}>
            Reputation: {user.reputation}
          </Text>
          <Box display="flex" alignItems="center">
            <Button
              colorScheme={user.isFollowing ? 'green' : 'gray'}
              size="sm"
              mr={2}
              onClick={() => (user.isFollowing ? onUnfollow(user.display_name) : onFollow(user.display_name))}
            >
              {user.isFollowing ? 'Following' : 'Follow'}
            </Button>
            <Button colorScheme="red" size="sm" onClick={() => onBlock(user.display_name)}>
              Block
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserListItem;
