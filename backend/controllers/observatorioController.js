const pool = require('../db');

const getEmpresas = async (req, res) => {
    try {
        const query = `
      SELECT 
        e.id, 
        e.razon_social, 
        e.cuit, 
        e.rubro, 
        e.dotacion_total, 
        e.exporta, 
        e.importa,
        json_build_object('coordinates', json_build_array(e.longitud, e.latitud)) as ubicacion
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
        const rubroQuery = 'SELECT rubro, COUNT(*) as count FROM empresas GROUP BY rubro';
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
        const query = "SELECT * FROM noticias_proyectos WHERE estado = 'validado' ORDER BY fecha DESC LIMIT 5";
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
