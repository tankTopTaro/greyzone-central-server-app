import cors from 'cors'
import express from 'express'
import multer from 'multer'
import bodyParser from 'body-parser'

import Player from './models/player.js'
import Team from './models/team.js'
import Image from './models/image.js'
import FacilitySession from './models/facilitySession.js'
import GameSession from './models/gameSession.js'

const upload = multer({dest: 'tmp_uploads/'})

function startServer() {
   const app = express()
   const port = process.env.PORT || 3000

   app.use(cors())
   app.use(bodyParser.json())

   app.get('/api/players/search', async (req, res) => {
      try {
            const players = await Player.search(req.query);

            if (players.length === 0) return res.status(404).json({ message: "Search Player not found" });

            res.json(players);
      } catch (error) {
            res.status(400).json({ message: error.message, error: error });
      }
   })
   app.get('/api/players/:player_id', async (req, res) => {
      try {
            const player = await Player.getById(req.params.player_id);
            
            if (!player) return res.status(404).json({ message: "Player not found" });

            res.json(player)
      } catch (error) {
            res.status(500).json({ message: "Database error", error: error});
      }
   })
   app.post('/api/players', upload.single('avatar'), async (req, res) => {
      try {
            const playerData = req.body
            const avatar = req.file
            const playerId = await Player.create(playerData, avatar);

            res.json({ message: "Player created!", id: playerId });
      } catch (error) {
            res.status(500).json({ message: "Server error", error: error });
      }
   })

   app.get('/api/teams/:team_id', async (req, res) => {
      try {
            const team = await Team.getById(req.params.team_id);

            if (!team) return res.status(404).json({ message: "Team not found" });

            res.json(team);
      } catch (error) {
            res.status(500).json({ message: "Database error", error: error });
      }
   })
   app.post('/api/teams', async (req, res) => {
      try {
            const results = await Team.create(req.body);

            if (results.created) {
               res.json({ message: "Team created successfully!" });
            } else {
               res.status(400).json({ message: "Team already exists!" }); // If team already exists
            }
      } catch (error) {
            res.status(500).json({ message: "Server error", error: error });
      }
   })

   app.get('/api/images/players/:player_id.jpg', (req, res) => {
      const { player_id } = req.params;
      
      const image = Image.getImage(player_id)

      res.sendFile(image, (err) => {
            if(err) {
               res.status(404).json({ message: "Image not found" });
            }
      });
   })

   app.post('/api/facility-session/create', async (req, res) => {
      try {
            const facilitySessionId = await FacilitySession.create(req.body)

            res.json({ message: "Facility session created!", id: facilitySessionId });
      } catch (error) {
            res.status(500).json({ message: "Server error", error: error });
      }
   })
   app.post('/api/facility-session/update', async (req, res) => {
      try {
            const facilitySessionId = await FacilitySession.update(req.body)

            res.json({ message: "Facility session created!", id: facilitySessionId });
      } catch (error) {
            res.status(500).json({ message: "Server error", error: error });
      }
   })

   app.post('/api/game-sessions', async (req, res) => {
      try {
            const gameSessionId = await GameSession.upload(req.body);

            res.json({ message: "Game session uploaded!", id: gameSessionId});
      } catch (error) {
            res.status(500).json({ message: "Server error", error: error });
      }
   })

   app.get('/api/latest-player-id/:facility_id', async (req, res) => {
      try {
            const facilityId = req.params.facility_id

            const latestPlayer = await Player.getLatestId(facilityId)
            
            res.json({ player: latestPlayer })
      } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve latest player ID.', error: error})
      }
   })

   app.get('/api/latest-game-session-id/:facility_id', async (req, res) => {
      try {
            const facilityId = req.params.facility_id

            const latestGameSession = await GameSession.getLatestId(facilityId)

            res.json({ gameSession: latestGameSession })
      } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve latest game_session ID.', error: error})
      }
   })

   app.get('/api/health', (req, res) => { res.json({status: 'ok'}) })

   app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
   })
}

startServer()
