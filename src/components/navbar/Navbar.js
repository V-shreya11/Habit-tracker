import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { useFirebase } from 'features/firebase';

const Navbar = () => {
  const history = useHistory();

  const { user, auth } = useFirebase();

  const handleLogoutClick = async () => {
    try {
      await auth.signOut();

      console.log('Successfully logged out!');
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box flexGrow={1}>
          {user && <Typography variant="h6">Hello, {user.email}</Typography>}

          {!user && (
            <Button component={Link} to="/" color="inherit">
              Habit Tracker
            </Button>
          )}
        </Box>

        {!user && (
          <ButtonGroup variant="outlined" color="inherit">
            <Button component={Link} to="/signin">
              Login
            </Button>

            <Button component={Link} to="/signup">
              Sign up
            </Button>
          </ButtonGroup>
        )}

        {user && (
          <>
            <Button component={Link} to="/dashboard/add-habit" color="inherit" replace>
              Create habit
            </Button>

            <Button component={Link} to="/dashboard/habits" color="inherit">
              All habits
            </Button>

            <Button color="inherit" onClick={handleLogoutClick}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
