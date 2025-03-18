import Download from "../models/download.js";

const downloadController = {
    downloadDB: async (req, res) => {
        try {
            const facility_id = parseInt(req.params.facility_id, 10);
            const data = await Download(facility_id);
            res.json(data);
        } catch (error) {
            console.error('Database fetch error:', error);
            res.status(500).json({ error: 'Database fetch failed', details: error.message });
        }
    }
}

export default downloadController;