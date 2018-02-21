var Channel = require('../models/Channel.js')
var express = require('express')
var auth = require('./auth.js')
var router = express.Router()

var channels = []
// const Channel = (id) => {
//     const channel = channels.find(channel => channel.id === id)
//     if(!channel) {
//         throw new Error(`no channel`)
//     }
//     return channel
// }

router.get('/', async (req, res) => {
    try {
        var channels = await Channel.find({}, '-__v') // remove unwanted props
        res.send(channels)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.get('/:id', async (req, res) => {
    try {
        var channel = await Channel.findById({
            _id: req.params.id
        }, '-__v') // remove unwanted props
        res.send(channel)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.post('/', (req, res) => {
    var postData = req.body

    var channel = new Channel(postData)

    channel.save((err, results) => {
        if (err) {
            console.error('saving channel error')
            return res.status(500).send({
                message: 'saving channel error'
            })
        } else {
            res.status(200).send({
                result: true,
                id: results._id
            })
        }
    })
})

router.put('/:id', (req, res) => {
    let id = req.params.id
    var updateData = req.body

    Channel.findByIdAndUpdate(id, updateData, (err, result) => {
        if (err) return res.send(500, {
            error: err
        })
        res.send(result)
    })
})

router.delete('/:id', auth.checkAuthenticated, async (req, res) => {
    try {
        let id = req.params.id
        var channel = await Channel.findByIdAndRemove(id)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
})

// router.post('/create/:channelId/:name/:participants', ({
//     params: {
//         channelId,
//         name,
//         participants
//     }
// }, res) => {
//     const channel = {
//         id: channelId,
//         name,
//         participants: JSON.parse(participants),
//         messages:[]
//     };
//     channels.push(channel);
//     res.status(300).json(channel);
// })

router.post('/user/activeChannel/:userId/:channelId', ({
    params: {
        userId,
        channelId
    }
}, res) => {
    var user = User.findById(userId)
    user.activeChannel = channelId
    res.status(200).send(true)
})

var channel = {
    router
}

module.exports = channel