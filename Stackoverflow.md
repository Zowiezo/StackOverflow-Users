# UserList Component

The UserList component is a React functional component that displays a list of StackOverflow users. It fetches the users' data from the Stack Exchange API and renders each user as a UserListItem component.

**Props**

The UserList component does not accept any props.

**State**

The UserList component maintains the following state variables:

- users: An array of User objects representing the fetched users' data.
- isLoading: A boolean value indicating whether the data is being fetched (true) or has finished loading (false).
- error: A string value representing any error that occurred during the data fetching process. It is null if no error occurred.

**useEffect Hook**

The useEffect hook is used to fetch the users' data from the Stack Exchange API. It runs only once when the component is mounted, thanks to the empty dependency array passed as the second argument.

Inside the useEffect hook, an async function fetchUsers is defined to make the API request using Axios. Upon successful response, the fetched users' data is stored in the users state variable. If an error occurs during the API request, the error message is stored in the error state variable. Finally, the isLoading state variable is set to false to indicate the end of data fetching.

**Event Handlers**

The component defines three event handlers:

- handleFollow: Updates the users state by marking a user as followed.
- handleUnfollow: Updates the users state by marking a user as unfollowed.
- handleBlock: Updates the users state by marking a user as blocked.
These event handlers are passed as props to the UserListItem component and are called when the corresponding buttons are clicked.

**Render Logic**

The render logic of the UserList component handles three scenarios:

- Loading: If isLoading is true, a loading spinner is displayed in the center of the screen.
- Error: If error has a value, an error message is displayed in red text.
- Data Loaded: If neither isLoading nor error is true, the list of users is rendered using the SimpleGrid component from Chakra UI. Each user is displayed as a UserListItem component with follow, unfollow, and block buttons.


# UserListItem Component

The UserListItem component is a reusable component that displays information about a single user in a card-like format.

**Props**

The UserListItem component accepts the following props:

- user (required): A User object representing the user's data to be displayed.
- onFollow (required): A function to be called when the follow button is clicked. It takes a string parameter representing the user's display name.
- onUnfollow (required): A function to be called when the unfollow button is clicked. It takes a string parameter representing the user's display name.
- onBlock (required): A function to be called when the block button is clicked. It takes a string parameter representing the user's display name.

**Render Logic**

The UserListItem component displays the user's profile image, display name, and reputation. The provided children content, if any, is rendered below the user information.
The component renders a card-like box with a shadow effect and a width of 60px. The follow, unfollow, and block buttons are centered using the Flex and Center components from Chakra UI.

## Tests
The following tests were conducted to ensure the functionality and visual requirements of the User List component are met:

1. Test for fetching users
   Description: This test verifies that the component successfully fetches users from the Stack Exchange API and populates the user list.
   Procedure:
   Render the User List component.
   Wait for the API request to complete.
   Check if the user list is populated with the fetched users.
   - Expected Result: The user list should contain the fetched users from the API.

2. Test for following a user
   Description: This test checks if the follow functionality works correctly when following a user.
   Procedure:
   Render the User List component.
   Find a user in the list who is not currently followed.
   Click the "Follow" button for that user.
   Check if the user's "isFollowing" property is set to true.
   - Expected Result: The user's "isFollowing" property should be set to true, indicating that the user is now being followed.

3. Test for unfollowing a user
   Description: This test ensures that unfollowing a user works as expected.
   Procedure:
   Render the User List component.
   Find a user in the list who is currently followed.
   Click the "Unfollow" button for that user.
   Check if the user's "isFollowing" property is set to false.
   - Expected Result: The user's "isFollowing" property should be set to false, indicating that the user is no longer being followed.

4. Test for blocking a user
   Description: This test verifies the functionality of blocking a user.
   Procedure:
   Render the User List component.
   Find a user in the list who is not currently blocked.
   Click the "Block" button for that user.
   Check if the user's "isBlocked" property is set to true.
   - Expected Result: The user's "isBlocked" property should be set to true, indicating that the user is now blocked.


5. Test for UI styling
   Description: This test checks the visual styling of the User List component.
   Procedure:
   Render the User List component.
   Inspect the component's layout, colours, and typography.
   - Expected Result: The User List component should have the following visual characteristics:
     -  Heading: Bold and in sentence case, centered.
     -  Background colour: Light grey.
     -  Space between the heading and the user cards.
     -  User cards: Width of 60px, centered buttons, shadow box effect.
     -  Followed users: Indicator in the main part of the list item, green card.
     -  Blocked users: Disabled greyed-out list item, non-interactable.

To test the test codes using Yarn, you can follow these steps:

- To run the tests, execute the following command:

    ### `yarn test`

This command will execute the test runner and run all the test files in your project. It will display the test results in the console, indicating whether each test passed or failed.


# Time Estimations

The time spent on this challenge as rough estimations:
- Review: 15 mins
- Design: 30 mins
- Implementation: 2 hours
- Testing: 1 hour
- Documentation: 1 hour