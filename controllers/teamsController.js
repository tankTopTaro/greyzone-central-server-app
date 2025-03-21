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
            const teamCreated = await Team.create(req.body);
    
            if (teamCreated) {
               res.json({ message: "Team created successfully!" });
            } else {
               res.status(400).json({ message: "Team already exists!" }); // If team already exists
            }
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    }
};

export default teamsController
