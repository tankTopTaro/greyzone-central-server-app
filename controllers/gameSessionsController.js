import GameSession from '../models/gameSession.js';

const gameSessionsController = {
    uploadGameSessions: async (req, res) => {
        try {
            const gameSessionId = await GameSession.upload(req.body);
    
            res.json({ message: "Game session uploaded!", id: gameSessionId});
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    }
};

export default gameSessionsController;