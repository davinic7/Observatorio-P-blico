import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress, AppBar, Toolbar } from '@mui/material';
import MapComponent from './components/MapComponent';
import StatisticsComponent from './components/StatisticsComponent';

const ObservatorioPage = () => {
    const [empresas, setEmpresas] = useState([]);
    const [estadisticas, setEstadisticas] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [empresasRes, estadisticasRes] = await Promise.all([
                    axios.get('http://localhost:3000/api/observatorio/empresas'),
                    axios.get('http://localhost:3000/api/observatorio/estadisticas')
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

    if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Observatorio Industrial de Catamarca
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box mb={4}>
                    <Typography variant="h4" gutterBottom>Mapa de Empresas</Typography>
                    <MapComponent empresas={empresas} />
                </Box>
                <Box>
                    <Typography variant="h4" gutterBottom>Indicadores Clave</Typography>
                    <StatisticsComponent estadisticas={estadisticas} />
                </Box>
            </Container>
        </Box>
    );
};

export default ObservatorioPage;
