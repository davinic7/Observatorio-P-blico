const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const observatorioRoutes = require('./routes/observatorioRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger setup (placeholder for now)
const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Observatorio Público API',
        version: '1.0.0',
        description: 'API for the Catamarca Industrial Park Public Observatory',
    },
    paths: {},
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/observatorio', observatorioRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
