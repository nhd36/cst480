import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Dispatch, SetStateAction, useState, MouseEvent } from 'react';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Cookies from 'js-cookie';

const pages = [
    {
        name: "Books",
        url: "books"
    },
    {
        name: 'Authors',
        url: "authors"
    }
];

type NavBarProps = {
    setRender: Dispatch<SetStateAction<String>>
    username: String | null
}

const NavBar = ({ setRender, username }: NavBarProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
    const handleMenu = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logOutButton = () => {
        setAnchorEl(null);
      Cookies.remove("authToken");
      setRender("authentication");
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            width: "100%",
                            padding: "0px 20px 0px 20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Books|Authors
                        </Typography>
                        {username !== null && (
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "25%",

                            }}
                            >
                                {pages.map((page, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            sx={{
                                                color: "white",
                                                display: "block"
                                            }}
                                            onClick={() => { setRender(page.url) }}
                                        >
                                            {page.name}
                                        </Button>
                                    )
                                })}
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={handleMenu}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem>Hello {username}</MenuItem>
                                    <MenuItem onClick={logOutButton}>Log Out</MenuItem>
                                </Menu>
                            </Box>
                            ) 
                        }
                    </Box>

                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default NavBar;