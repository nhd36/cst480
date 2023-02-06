import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';

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
}

const NavBar = ({ setRender }: NavBarProps) => {

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
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "15%",

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
                        </Box>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default NavBar;