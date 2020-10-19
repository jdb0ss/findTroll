var express = require('express');
var mysql = require('../mysql');
var router = express.Router();
const request = require("request-promise");

const RIOT_API_KEY = 'RGAPI-c5c7eaa5-0cd3-401d-a9e0-8f3b564d4a9a'
const riotUrl = 'https://kr.api.riotgames.com'

module.exports = router;
 
router.get('/matches',async (req,res) =>{
    var gameId = req.query.gameId;
    try{
        var select = "SELECT matches FROM `match` WHERE gameId = ?";
        var result = await mysql.do(select,[gameId]);
        
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(result[0].matches);
    }catch(e){
        return res.status(400).json({message: '잠시 후 다시 시도해주세요.'});
    }
})

router.get('/riotMatches',async (req,res) =>{
    var gameId = req.query.gameId;
    try{
        const url = `${riotUrl}/lol/match/v4/matches/${gameId}?api_key=${RIOT_API_KEY}`
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Allow-Origin", "*");
        const result = await request(url);
        return res.json(result);
        
    }catch(e){
        return res.status(400).json({message: '잠시 후 다시 시도해주세요.'});
    }
})


router.get('/matches/teams',async (req,res) =>{
    var gameId = req.query.gameId;
    try{
        var select = "SELECT JSON_EXTRACT(matches,'$.teams') as teams FROM `match` WHERE gameId = ?";
        var result = await mysql.do(select,[gameId]);
        
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(result[0].teams);
    }catch(e){
        return res.status(400).json({message: '잠시 후 다시 시도해주세요.'});
    }
})

router.get('/matches/participantIdentities',async (req,res) =>{
    var gameId = req.query.gameId;
    try{
        var select = "SELECT JSON_EXTRACT(matches,'$.participantIdentities') as" +
            " participantIdentities FROM `match` WHERE gameId = ?";
        var result = await mysql.do(select,[gameId]);
        
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(result[0].participantIdentities);
    }catch(e){
        return res.status(400).json({message: '잠시 후 다시 시도해주세요.'});
    }
})

router.get('/matches/participants',async (req,res) =>{
    var gameId = req.query.gameId;
    try{
        var select = "SELECT JSON_EXTRACT(matches,'$.participants') as" +
            " participants FROM `match` WHERE gameId = ?";
        var result = await mysql.do(select,[gameId]);
        
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(result[0].participants);
    }catch(e){
        return res.status(400).json({message: '잠시 후 다시 시도해주세요.'});
    }
})

router.get('/timelines',async (req,res) =>{
    var gameId = req.query.gameId;
    try{
        var select = "SELECT timelines FROM `match` WHERE gameId = ?"
        var result = await mysql.do(select,[gameId]);
        
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(result[0].timelines);
    }catch(e){
        return res.status(400).json({message: '잠시 후 다시 시도해주세요.'});
    }
})

router.get('/timelines/frames/participantFrames',async (req,res) =>{
    var gameId = req.query.gameId;
    try{
        var select = "SELECT JSON_EXTRACT(timelines,'$.frames[*].participantFrames') as" +
            " participantFrames FROM `match` WHERE gameId = ?"
        var result = await mysql.do(select,[gameId]);
        
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(result[0].participantFrames);
    }catch(e){
        return res.status(400).json({message: '잠시 후 다시 시도해주세요.'});
    }
})

router.get('/timelines/frames/events',async (req,res) =>{
    var gameId = req.query.gameId;
    try{
        var select = "SELECT JSON_EXTRACT(timelines,'$.frames[*].events') as" +
        " events FROM `match` WHERE gameId = ?"
        var result = await mysql.do(select,[gameId]);
        
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.json(result[0].events);
    }catch(e){
        return res.status(400).json({message: '잠시 후 다시 시도해주세요.'});
    }
})