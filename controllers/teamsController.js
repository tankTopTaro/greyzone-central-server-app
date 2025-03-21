import Team from '../models/team.js';

const teamsController = {
    getTeam: async (req, res) => {
        try {
            const team = await Team.getById(req.params.team_id);
    
            if (!team) return res.status(404).json({ error: "Team not found" });
    
            res.json(team);
        } catch (error) {
            res.status(500).json({ error: "Database error" });
        }
    },
    
    createTeam: async (req, res) => {
        try {
            const team = await Team.create(req.body);
    
            res.json({ message: "Team created!", team: team });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    }
};

export default teamsController
