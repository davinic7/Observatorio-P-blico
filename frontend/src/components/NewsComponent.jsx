import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Box, Chip, Skeleton, Button, CardActions } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const NewsComponent = () => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/observatorio/noticias');
                setNoticias(response.data);
            } catch (error) {
                console.error("Error fetching news", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNoticias();
    }, []);

    if (loading) {
        return (
            <Grid container spacing={3}>
                {[1, 2, 3].map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item}>
                        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 1 }} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="60%" />
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (noticias.length === 0) {
        return (
            <Box textAlign="center" py={4}>
                <Typography variant="body1" color="text.secondary">No hay noticias recientes para mostrar.</Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={4}>
            {noticias.map((noticia) => (
                <Grid item xs={12} sm={6} md={4} key={noticia.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, overflow: 'hidden' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={noticia.imagen_url ? `http://localhost:3001/uploads/${noticia.imagen_url.split('/').pop()}` : `https://source.unsplash.com/random/800x600/?industry,factory&sig=${noticia.id}`}
                            alt="Imagen de noticia"
                            sx={{ filter: 'brightness(0.95)' }}
                        />
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Chip
                                    label="Novedad"
                                    size="small"
                                    color="secondary"
                                    sx={{ mr: 1, fontWeight: 600, fontSize: '0.7rem' }}
                                />
                                <Box display="flex" alignItems="center" color="text.secondary">
                                    <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                        {new Date(noticia.fecha).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 1.5 }}>
                                {noticia.titulo}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                {noticia.descripcion.substring(0, 120)}...
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ p: 3, pt: 0 }}>
                            <Button size="small" color="primary" endIcon={<ArrowForwardIcon />} sx={{ fontWeight: 600 }}>
                                Leer más
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default NewsComponent;
