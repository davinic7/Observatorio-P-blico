import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Box, Grid, Paper, Typography } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const StatisticsComponent = ({ estadisticas }) => {
    const rubroData = {
        labels: estadisticas.empresasPorRubro ? estadisticas.empresasPorRubro.map(e => e.rubro_sector) : [],
        datasets: [
            {
                label: 'Empresas por Rubro',
                data: estadisticas.empresasPorRubro ? estadisticas.empresasPorRubro.map(e => e.count) : [],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const exportaData = {
        labels: ['Exportadoras', 'No Exportadoras'],
        datasets: [
            {
                data: estadisticas.exportadoras ? [
                    estadisticas.exportadoras.find(e => e.exporta)?.count || 0,
                    estadisticas.exportadoras.find(e => !e.exporta)?.count || 0
                ] : [],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6">Distribución por Rubro</Typography>
                        <Bar data={rubroData} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6">Perfil Exportador</Typography>
                        <Pie data={exportaData} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StatisticsComponent;
