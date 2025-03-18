import FacilitySession from '../models/facilitySession.js';

const facilitySessionController = {
    createFacilitySession: async (req, res) => {
        try {
            const facilitySessionId = await FacilitySession.create(req.body)
    
            res.json({ message: "Facility session created!", id: facilitySessionId });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    },

    updateFacilitySession: async (req, res) => {
        try {
            const facilitySessionId = await FacilitySession.update(req.body)
    
            res.json({ message: "Facility session created!", id: facilitySessionId });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    }
};

export default facilitySessionController