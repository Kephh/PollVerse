const pollRouter = require('express').Router();
const Poll = require('../models/Poll');

const hasEmptyOption = (options) => {
    const trimmedOptions = options.filter((op) => op.trim().length === 0);
    if(trimmedOptions.length === 0)
        return false;
    return true;
};

const hasDuplicateOptions = (options) => {
    const normalizedOptions = options.map((op) => op.trim().toLowerCase());
    if(new Set(normalizedOptions).size === normalizedOptions.length)
        return false;
    return true;
}

pollRouter.put('/create', async(req, res) => {
    try {
        const {question, option1, option2, option3, option4} = req.body;
        let options = [option1, option2, option3, option4].filter(op => typeof op === 'string');
        if (
            question === undefined ||
            question.trim().length === 0 ||
            options.length !== 4 ||
            hasEmptyOption(options) ||
            hasDuplicateOptions(options)
        ) {
            return res.status(400).json({error: "Invalid inputs!"});
        }
        let newPoll = await Poll.findOne();
        if(newPoll){
            newPoll.question = question;
            newPoll.option1 = options[0];
            newPoll.option2 = options[1];
            newPoll.option3 = options[2];
            newPoll.option4 = options[3];
        }else{
            newPoll = new Poll(req.body);
        }
        await newPoll.save();
        res.status(201).json({message: "Created successfully!"});
    } catch (err) {
        res.status(400).json(err);
    }
});

pollRouter.get('/fetch', async(req, res) => {
    try {
        const poll = await Poll.findOne();
        if(poll)
            return res.status(200).json(poll);
        res.status(400).json({error: "Create poll"});
    } catch (err) {
        res.status(400).json(err);
    }
});

pollRouter.patch('/updateVotes', async(req, res) => {
    try {
        let {selectedOption} = req.body;
        selectedOption = selectedOption.trim().toLowerCase();
        let poll = await Poll.findOne();
        if(selectedOption === poll.option1){
            poll.option1Votes += 1;
        }
        else if(selectedOption === poll.option2){
            poll.option2Votes += 1;
        }
        else if(selectedOption === poll.option3){
            poll.option3Votes += 1;
        }
        else{
            poll.option4Votes += 1;
        }
        poll.option1Percentage = 100 * parseFloat(poll.option1Votes/(poll.option1Votes+poll.option2Votes+poll.option3Votes+poll.option4Votes));
        poll.option2Percentage = 100 * parseFloat(poll.option2Votes/(poll.option1Votes+poll.option2Votes+poll.option3Votes+poll.option4Votes));
        poll.option3Percentage = 100 * parseFloat(poll.option3Votes/(poll.option1Votes+poll.option2Votes+poll.option3Votes+poll.option4Votes));
        poll.option4Percentage = 100 * parseFloat(poll.option4Votes/(poll.option1Votes+poll.option2Votes+poll.option3Votes+poll.option4Votes));
        await poll.save();
        res.status(200).json({message: "Updated", poll});
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = pollRouter;