import Player from "../models/player.js";

const playersController = {
    getPlayer: async (req, res) => {
        try {
            const player = await Player.getById(req.params.player_id);
            
            if (!player) return res.status(404).json({ error: "Player not found" });
    
            res.json(player)
        } catch (error) {
            res.status(500).json({ error: "Database error "});
        }
    },
    
    searchPlayers: async (req, res) => {
        try {
            const players = await Player.search(req.query);
    
            if (players.length === 0) return res.status(404).json({ error: "Search Player not found" });
    
            res.json(players);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    createPlayer: async (req, res) => {
        try {
            const playerId = await Player.create(req.body);
    
            res.json({ message: "Player created!", id: playerId });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    }
}

export default playersController;
