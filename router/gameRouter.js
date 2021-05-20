const express =  require("express")
const router = express.Router()
const uuidv4 = require ("uuid").v4

let games = [
    {
    id: "adowb1b3bb",
    game: "League of Legends",
    description: "League of Legends is a team-based game with over 140 champions to make epic plays with."
    },
    {
    id: "kd7b9ks2nda",
    game: "PlayerUnknown's Battlegrounds",
    description: "PLAYERUNKNOWN'S BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback."
    }
]

router.get('/get-all-games', function (req, res){
    res.json({
        payload:games
    })
})

router.get('/get-game-by-id/:id', function(req, res){
    let index = games.map(item=>item.id).indexOf(req.params.id)
    if(index === -1){
        res.status(404).json({message:"The game with the id doesn't exist, please check id"})
    } else{
        res.json({payload:games[index]})
    }
})

router.post('/create-new-game', function(req, res){
    let found = false;
    if(req.body.game === ""|| req.body.description === ""){
        res.status(404).json({message:"Cannot leave text area blank"})
    } else{
        // let found = games.map(item => item.game).indexOf(req.body.game)
        games.forEach(item =>{
            if(item.game === req.body.game){
                found=true
            }
        })
        if(found){
            res.status(404).json({message:"Game already exists"})
        } else {
            let newGame = { "id": uuidv4(), "game":req.body.game, "description":req.body.description}
            games.push(newGame)
            res.json({payload:games})
        }
    }
})

router.put('/update-game/:id', function(req, res){
    let foundID = games.findIndex((item)=>item.id === req.params.id)
    if(foundID === -1){
        res.status(404).json({message:"Game not found, cannot update"})
    } else{
        if(req.body.game === "" || req.body.description === ""){
            res.status(404).json({message:"cannot leave blank area"})
        } else{
            let exists = false
            games.forEach(item=>{
                if (item.game === req.body.game){
                    exists = true
                }
            })
            if(exists){
                res.status(404).json({message:"Game already exists, cannot update"})
            } else{
                const {game, description} = req.body
                games[foundID].game = game
                games[foundID].description = description
                res.json(games)
            }
        }
    }
})


router.delete('/delete-game/:id', function(req, res){
    let found = games.map(item=>item.id === req.params.id)
    if(found===-1){
        res.json({message:"Game not found, cannot delete"})
    } else{
        games.splice(found,1)
        res.json(games)
    }
})
module.exports = router