const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');

const add = async (req, res) => {
    try {
        const result = new MeetingHistory(req.body);
        await result.save();
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to create meeting:', err);
        res.status(400).json({ error: 'Failed to create meeting', err });
    }
};

const index = async (req, res) => {
    try {
        const query = req.query;
        query.deleted = false;

        const result = await MeetingHistory.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'User',
                    localField: 'createBy',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $lookup: {
                    from: 'User',
                    localField: 'attendes',
                    foreignField: '_id',
                    as: 'attendesData'
                }
            },
            { $unwind: { path: '$users', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$attendesData', preserveNullAndEmptyArrays: true } },
            {
                $addFields: {
                    createdByName: { $concat: ['$users.firstName', ' ', '$users.lastName'] },
                    attendesName: { $concat: ['$attendesData.firstName', ' ', '$attendesData.lastName'] }
                }
            },
            {
                $project: {
                    users: 0,
                    attendesData: 0
                }
            }
        ]);

        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to fetch meetings:', err);
        res.status(400).json({ error: 'Failed to fetch meetings', err });
    }
};

const view = async (req, res) => {
    try {
        const result = await MeetingHistory.findOne({ _id: req.params.id });
        if (!result) return res.status(404).json({ message: 'No data found.' });

        const response = await MeetingHistory.aggregate([
            { $match: { _id: result._id } },
            {
                $lookup: {
                    from: 'User',
                    localField: 'createBy',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $lookup: {
                    from: 'User',
                    localField: 'attendes',
                    foreignField: '_id',
                    as: 'attendesData'
                }
            },
            { $unwind: { path: '$users', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$attendesData', preserveNullAndEmptyArrays: true } },
            {
                $addFields: {
                    createdByName: { $concat: ['$users.firstName', ' ', '$users.lastName'] },
                    attendesName: { $concat: ['$attendesData.firstName', ' ', '$attendesData.lastName'] }
                }
            },
            {
                $project: {
                    users: 0,
                    attendesData: 0
                }
            }
        ]);

        res.status(200).json(response[0]);
    } catch (err) {
        console.error('Failed to fetch meeting details:', err);
        res.status(400).json({ error: 'Failed to fetch meeting details', err });
    }
};

const deleteData = async (req, res) => {
    try {
        const result = await MeetingHistory.findByIdAndUpdate(req.params.id, { deleted: true });
        res.status(200).json({ message: 'Meeting deleted successfully', result });
    } catch (err) {
        console.error('Failed to delete meeting:', err);
        res.status(400).json({ error: 'Failed to delete meeting', err });
    }
};

const deleteMany = async (req, res) => {
    try {
        const result = await MeetingHistory.updateMany({ _id: { $in: req.body } }, { $set: { deleted: true } });
        res.status(200).json({ message: 'Meetings deleted successfully', result });
    } catch (err) {
        console.error('Failed to delete meetings:', err);
        res.status(400).json({ error: 'Failed to delete meetings', err });
    }
};

module.exports = { add, index, view, deleteData, deleteMany }