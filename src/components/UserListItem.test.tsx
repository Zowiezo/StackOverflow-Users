import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

export interface UserListItemProps {
  user: {
    profile_image: string;
    display_name: string;
    reputation: number;
    isFollowing: boolean;
    isBlocked: boolean;
  };
  onFollow: () => void;
  onUnfollow: () => void;
  onBlock: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  onFollow,
  onUnfollow,
  onBlock,
}) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div>
      <div>{user.display_name}</div>
      <div>Reputation: {user.reputation}</div>

      <button onClick={handleExpand}>Expand</button>
      {isExpanded && (
        <div>
          {user.isFollowing ? (
            <button onClick={onUnfollow}>Unfollow</button>
          ) : (
            <button onClick={onFollow}>Follow</button>
          )}
        </div>
      )}

      <button onClick={onBlock}>Block</button>
    </div>
  );
};

export default UserListItem;

describe('UserListItem', () => {
  const user = {
    profile_image: 'image.jpg',
    display_name: 'User1',
    reputation: 100,
    isFollowing: true,
    isBlocked: false,
  };

  const mockProps: UserListItemProps = {
    user: user,
    onFollow: jest.fn(),
    onUnfollow: jest.fn(),
    onBlock: jest.fn(),
  };

  it('renders user details', () => {
    render(<UserListItem {...mockProps} />);
    expect(screen.getByText(user.display_name)).toBeInTheDocument();
    expect(screen.getByText(`Reputation: ${user.reputation}`)).toBeInTheDocument();
  });

  it('toggles expandable state', () => {
    render(<UserListItem {...mockProps} />);
    fireEvent.click(screen.getByText('Expand'));
    expect(screen.queryByText('Follow')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Expand'));
    expect(screen.queryByText('Follow')).not.toBeInTheDocument();
  });

  it('handles follow and unfollow', () => {
    render(<UserListItem {...mockProps} />);
    fireEvent.click(screen.getByText('Unfollow'));
    expect(mockProps.onUnfollow).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Follow'));
    expect(mockProps.onFollow).toHaveBeenCalledTimes(1);
  });

  it('handles block', () => {
    render(<UserListItem {...mockProps} />);
    fireEvent.click(screen.getByText('Block'));
    expect(mockProps.onBlock).toHaveBeenCalledTimes(1);
  });
});
