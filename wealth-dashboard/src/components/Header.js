import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1A2B4D',
  boxShadow: 'none',
  position: 'static'
}));

const Logo = styled('img')({
  width: 50,
  marginRight: 2
});

const Header = () => {
  return (
    <StyledAppBar>
      <Toolbar>
        <Box display="flex" alignItems="center" width="100%">
          <Logo src="/logo.png" alt="Wealth Dashboard Logo" />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Wealth Management Dashboard
          </Typography>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
