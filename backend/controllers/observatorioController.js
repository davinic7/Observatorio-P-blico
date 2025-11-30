const pool = require('../db');

const getEmpresas = async (req, res) => {
    try {
        const query = `
      SELECT 
        e.id, 
        e.razon_social, 
        e.cuit, 
        e.rubro_sector, 
        e.dotacion_personal, 
        e.exporta, 
        e.importa,
        ST_AsGeoJSON(e.ubicacion_geografica)::json as ubicacion
      FROM empresas e
    `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getEstadisticas = async (req, res) => {
    try {
        // Example statistics queries
        const rubroQuery = 'SELECT rubro_sector, COUNT(*) as count FROM empresas GROUP BY rubro_sector';
        const exportaQuery = 'SELECT exporta, COUNT(*) as count FROM empresas GROUP BY exporta';

        const [rubroResult, exportaResult] = await Promise.all([
            pool.query(rubroQuery),
            pool.query(exportaQuery)
        ]);

        res.json({
            empresasPorRubro: rubroResult.rows,
            exportadoras: exportaResult.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getNoticias = async (req, res) => {
    try {
        const query = 'SELECT * FROM noticias_proyectos WHERE validado = true ORDER BY fecha_publicacion DESC LIMIT 5';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getEmpresas,
    getEstadisticas,
    getNoticias
};
