import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress, AppBar, Toolbar, Grid, Paper, Button, Link, Divider } from '@mui/material';
import MapComponent from './components/MapComponent';
import StatisticsComponent from './components/StatisticsComponent';
import NewsComponent from './components/NewsComponent';
import FactoryIcon from '@mui/icons-material/Factory';
import BarChartIcon from '@mui/icons-material/BarChart';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ObservatorioPage = () => {
    const [empresas, setEmpresas] = useState([]);
    const [estadisticas, setEstadisticas] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [empresasRes, estadisticasRes] = await Promise.all([
                    axios.get('http://localhost:3002/api/observatorio/empresas'),
                    axios.get('http://localhost:3002/api/observatorio/estadisticas')
                ]);
                setEmpresas(empresasRes.data);
                setEstadisticas(estadisticasRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Navbar */}
            <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ height: 80 }}>
                        <Box component="img" src="/logo_catamarca.png" alt="Gobierno de Catamarca" sx={{ height: 50, mr: 3 }} />
                        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="overline" sx={{ lineHeight: 1, color: 'text.secondary', fontWeight: 600, letterSpacing: 1 }}>
                                GOBIERNO DE CATAMARCA
                            </Typography>
                            <Typography variant="h6" component="div" sx={{ color: 'primary.dark', fontWeight: 700, letterSpacing: '-0.3px', lineHeight: 1.2 }}>
                                OBSERVATORIO INDUSTRIAL
                            </Typography>
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                            <Button color="inherit" href="#inicio" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}>Inicio</Button>
                            <Button color="inherit" href="#estadisticas" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}>Indicadores</Button>
                            <Button color="inherit" href="#mapa" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}>Mapa</Button>
                            <Button color="inherit" href="#novedades" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}>Novedades</Button>
                            <Button variant="outlined" color="primary" href="http://localhost:3000" target="_blank" sx={{ ml: 2, borderWidth: 2, '&:hover': { borderWidth: 2 } }}>Acceso Empresas</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Hero Section - Official Blue */}
            <Box id="inicio" sx={{
                background: 'linear-gradient(135deg, #071D49 0%, #3A5DAE 100%)', // Official Blues
                color: 'white',
                py: 10,
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Abstract Geometric Overlay */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60%',
                    height: '100%',
                    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.05) 0%, transparent 60%)',
                    zIndex: 0
                }} />

                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Typography variant="overline" sx={{ letterSpacing: '3px', opacity: 0.8, mb: 1, display: 'block', fontWeight: 500 }}>
                        MINISTERIO DE INDUSTRIA, COMERCIO Y EMPLEO
                    </Typography>
                    <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 3, letterSpacing: '-1px' }}>
                        Parque Industrial El Pantanillo
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 5, opacity: 0.9, fontWeight: 300, maxWidth: '800px', mx: 'auto', lineHeight: 1.5 }}>
                        Impulsando el desarrollo productivo de Catamarca con información transparente y actualizada.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="contained" color="secondary" size="large" href="#mapa" sx={{ px: 4, py: 1.5, color: 'primary.dark' }}>
                            Explorar Mapa
                        </Button>
                        <Button variant="outlined" color="inherit" size="large" href="#estadisticas" sx={{ px: 4, py: 1.5, borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                            Ver Datos
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: -6, mb: 8, position: 'relative', zIndex: 2 }}>
                {/* Stats Overview */}
                <Grid container spacing={4} id="estadisticas">
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <FactoryIcon color="primary" sx={{ fontSize: 48, mx: 'auto', mb: 2, opacity: 0.8 }} />
                            <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>{empresas.length}</Typography>
                            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>Empresas Radicadas</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h3" color="secondary" sx={{ fontWeight: 700 }}>
                                    {empresas.reduce((acc, curr) => acc + (curr.dotacion_total || 0), 0)}
                                </Typography>
                            </Box>
                            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>Puestos de Trabajo Directos</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                                    {empresas.filter(e => e.exporta).length}
                                </Typography>
                            </Box>
                            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>Empresas Exportadoras</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Statistics Section */}
                <Box sx={{ mt: 10, mb: 8 }}>
                    <Box display="flex" alignItems="center" mb={4}>
                        <BarChartIcon color="primary" sx={{ mr: 2, fontSize: 32 }} />
                        <Typography variant="h4" component="h2">Indicadores Clave</Typography>
                    </Box>
                    <StatisticsComponent estadisticas={estadisticas} />
                </Box>

                {/* Map Section */}
                <Box id="mapa" sx={{ mb: 10 }}>
                    <Box display="flex" alignItems="center" mb={4}>
                        <LocationOnIcon color="primary" sx={{ mr: 2, fontSize: 32 }} />
                        <Typography variant="h4" component="h2">Mapa Interactivo</Typography>
                    </Box>
                    <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                        <MapComponent empresas={empresas} />
                    </Paper>
                </Box>

                {/* News Section */}
                <Box id="novedades" sx={{ mb: 8 }}>
                    <Box display="flex" alignItems="center" mb={4}>
                        <NewspaperIcon color="primary" sx={{ mr: 2, fontSize: 32 }} />
                        <Typography variant="h4" component="h2">Novedades y Proyectos</Typography>
                    </Box>
                    <NewsComponent />
                </Box>
            </Container>

            {/* Footer */}
            <Box sx={{ bgcolor: '#1a1a1a', color: 'white', py: 8, mt: 'auto' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Box component="img" src="/logo_catamarca.png" alt="Gobierno de Catamarca" sx={{ height: 40, mr: 2, filter: 'brightness(0) invert(1)' }} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    OBSERVATORIO
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'grey.400', mb: 2 }}>
                                Una iniciativa del Ministerio de Industria, Comercio y Empleo para promover la transparencia y el desarrollo industrial.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Enlaces Rápidos</Typography>
                            <Link href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>Portal de Gobierno</Link>
                            <Link href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>Ministerio de Industria</Link>
                            <Link href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>Parque Industrial</Link>
                            <Link href="http://localhost:3000" color="inherit" display="block" sx={{ textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>Acceso Administrativo</Link>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Contacto</Typography>
                            <Box display="flex" alignItems="center" mb={1}>
                                <LocationOnIcon sx={{ mr: 1, color: 'secondary.main', fontSize: 20 }} />
                                <Typography variant="body2" color="grey.400">Av. Presidente Castillo 450, Catamarca</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <PhoneIcon sx={{ mr: 1, color: 'secondary.main', fontSize: 20 }} />
                                <Typography variant="body2" color="grey.400">+54 383 443-7890</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <EmailIcon sx={{ mr: 1, color: 'secondary.main', fontSize: 20 }} />
                                <Typography variant="body2" color="grey.400">industria@catamarca.gob.ar</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
                    <Typography variant="body2" align="center" sx={{ color: 'grey.600' }}>
                        © 2024 Gobierno de la Provincia de Catamarca. Todos los derechos reservados.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default ObservatorioPage;
