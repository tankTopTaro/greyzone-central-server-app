import Image from '../models/image.js';

const imagesController = {
    getPlayerImage: (req, res) => {
        const { player_id } = req.params;
        
        const image = Image.getImage(player_id)
    
        res.sendFile(image, (err) => {
            if(err) {
                res.status(404).json({ error: "Image not found" });
            }
        });
    },

    getPlayerImageFromDB: async (req, res) => {
        try {
            const image = await Image.getImageFromDB(req.params.player_id);
    
            if (!image) return res.status(404).json({ error: "Player Image not found" });
    
            res.json(image)
        } catch (error) {
            res.status(500).json({ error: "Database error "});
        }
    }
}

export default imagesController;