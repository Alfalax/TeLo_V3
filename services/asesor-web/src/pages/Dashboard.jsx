import { useState, useEffect } from 'react'
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Chip
} from '@mui/material'
import {
  Assignment,
  LocalOffer,
  People,
  TrendingUp
} from '@mui/icons-material'

function Dashboard() {
  const [stats, setStats] = useState({
    solicitudesPendientes: 0,
    ofertasActivas: 0,
    clientesActivos: 0,
    ventasDelMes: 0
  })

  useEffect(() => {
    // Simular carga de datos
    setStats({
      solicitudesPendientes: 12,
      ofertasActivas: 8,
      clientesActivos: 45,
      ventasDelMes: 23
    })
  }, [])

  const StatCard = ({ title, value, icon, color }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <Box sx={{ color }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Solicitudes Pendientes"
            value={stats.solicitudesPendientes}
            icon={<Assignment fontSize="large" />}
            color="primary.main"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Ofertas Activas"
            value={stats.ofertasActivas}
            icon={<LocalOffer fontSize="large" />}
            color="secondary.main"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Clientes Activos"
            value={stats.clientesActivos}
            icon={<People fontSize="large" />}
            color="success.main"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Ventas del Mes"
            value={stats.ventasDelMes}
            icon={<TrendingUp fontSize="large" />}
            color="warning.main"
          />
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Actividad Reciente
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Nueva solicitud de repuesto - Cliente Juan Pérez</Typography>
                <Chip label="Hace 5 min" size="small" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Oferta aceptada - Filtro de aceite Toyota</Typography>
                <Chip label="Hace 1 hora" size="small" color="success" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Nuevo cliente registrado - María García</Typography>
                <Chip label="Hace 2 horas" size="small" color="primary" />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard