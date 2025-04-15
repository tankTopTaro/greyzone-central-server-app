import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

import Player from './models/player.js'
import Team from './models/team.js'
import Image from './models/image.js'
import FacilitySession from './models/facilitySession.js'
import GameSession from './models/gameSession.js'

function startServer() {
   const app = express()
   const port = process.env.PORT || 3000

   app.use(cors())
   app.use(bodyParser.json())

   app.get('/api/players/search', async (req, res) => {
      try {
            const players = await Player.search(req.query);

            if (players.length === 0) return res.status(404).json({ error: "Search Player not found" });

            res.json(players);
      } catch (error) {
            res.status(400).json({ message: error.message });
      }
   })
   app.get('/api/players/:player_id', async (req, res) => {
      try {
            const player = await Player.getById(req.params.player_id);
            
            if (!player) return res.status(404).json({ error: "Player not found" });

            res.json(player)
      } catch (error) {
            res.status(500).json({ error: "Database error "});
      }
   })
   app.post('/api/players', async (req, res) => {
      try {
            const playerId = await Player.create(req.body);

            res.json({ message: "Player created!", id: playerId });
      } catch (error) {
            res.status(500).json({ error: "Server error" });
      }
   })

   app.get('/api/teams/:team_id', async (req, res) => {
      try {
            const team = await Team.getById(req.params.team_id);

            if (!team) return res.status(404).json({ error: "Team not found" });

            res.json(team);
      } catch (error) {
            res.status(500).json({ error: "Database error" });
      }
   })
   app.post('/api/teams', async (req, res) => {
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
   })

   app.get('/api/images/players/:player_id.jpg', (req, res) => {
      const { player_id } = req.params;
      
      const image = Image.getImage(player_id)

      res.sendFile(image, (err) => {
            if(err) {
               res.status(404).json({ error: "Image not found" });
            }
      });
   })

   app.post('/api/facility-session/create', async (req, res) => {
      try {
            const facilitySessionId = await FacilitySession.create(req.body)

            res.json({ message: "Facility session created!", id: facilitySessionId });
      } catch (error) {
            res.status(500).json({ error: "Server error" });
      }
   })
   app.post('/api/facility-session/update', async (req, res) => {
      try {
            const facilitySessionId = await FacilitySession.update(req.body)

            res.json({ message: "Facility session created!", id: facilitySessionId });
      } catch (error) {
            res.status(500).json({ error: "Server error" });
      }
   })

   app.post('/api/game-sessions', async (req, res) => {
      try {
            const gameSessionId = await GameSession.upload(req.body);

            res.json({ message: "Game session uploaded!", id: gameSessionId});
      } catch (error) {
            res.status(500).json({ error: "Server error" });
      }
   })

   app.get('/api/health', (req, res) => { res.json({status: 'ok'}) })

   app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
   })
}

startServer()
