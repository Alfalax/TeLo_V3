import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box
} from '@mui/material'
import { AccountCircle, Dashboard, Assignment, LocalOffer, People } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigation = (path) => {
    navigate(path)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TeLo V3 - Asesor
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            startIcon={<Dashboard />}
            onClick={() => handleNavigation('/')}
          >
            Dashboard
          </Button>
          <Button 
            color="inherit" 
            startIcon={<Assignment />}
            onClick={() => handleNavigation('/solicitudes')}
          >
            Solicitudes
          </Button>
          <Button 
            color="inherit" 
            startIcon={<LocalOffer />}
            onClick={() => handleNavigation('/ofertas')}
          >
            Ofertas
          </Button>
          <Button 
            color="inherit" 
            startIcon={<People />}
            onClick={() => handleNavigation('/clientes')}
          >
            Clientes
          </Button>
        </Box>

        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
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
          <MenuItem onClick={() => { handleClose(); handleNavigation('/perfil'); }}>Perfil</MenuItem>
          <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar