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
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';

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
    const theme = useTheme();

    const rubroData = {
        labels: estadisticas.empresasPorRubro ? estadisticas.empresasPorRubro.map(e => e.rubro) : [],
        datasets: [
            {
                label: 'Empresas por Rubro',
                data: estadisticas.empresasPorRubro ? estadisticas.empresasPorRubro.map(e => e.count) : [],
                backgroundColor: theme.palette.primary.main,
                borderRadius: 4,
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
                    theme.palette.secondary.main, // Gold for exporters
                    '#e0e0e0', // Grey for non-exporters
                ],
                borderWidth: 0,
            },
        ],
    };

    const optionsBar = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    drawBorder: false,
                }
            },
            x: {
                grid: {
                    display: false,
                }
            }
        },
    };

    const optionsPie = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={0} sx={{ p: 4, height: '100%', border: '1px solid #e0e0e0', borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>Distribución por Rubro Industrial</Typography>
                        <Box height={300}>
                            <Bar data={rubroData} options={optionsBar} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={0} sx={{ p: 4, height: '100%', border: '1px solid #e0e0e0', borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>Perfil Exportador</Typography>
                        <Box height={300} display="flex" justifyContent="center">
                            <Pie data={exportaData} options={optionsPie} />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StatisticsComponent;
