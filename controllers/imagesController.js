const path = require('path');

exports.getPlayerImage = (req, res) => {
    const { player_id } = req.params;
    const imagePath = path.join(__dirname, "../uploads/players", `${player_id}.jpg`);

    res.sendFile(imagePath, (err) => {
        if(err) {
            res.status(404).json({ error: "Image not found" });
        }
    });
};