const mongoose = require("mongoose");
const router = express.Router();
const Calendar = require('../Models/calendar.model');

// GET all calendar events
router.get('/', async (req, res) => {
    try {
        const calendar = await Calendar.find();
        res.json(calendar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a specific calendar event
router.get('/:id', getCalendar, (req, res) => {
    res.json(res.calendar);
});

// CREATE a new calendar event
router.post('/', async (req, res) => {
    const calendar = new Calendar({
        date: req.body.date,
        event: req.body.event,
        description: req.body.description,
    });

    try {
        const newCalendar = await calendar.save();
        res.status(201).json(newCalendar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE a calendar event
router.patch('/:id', getCalendar, async (req, res) => {
    if (req.body.date != null) {
        res.calendar.date = req.body.date;
    }
    if (req.body.event != null) {
        res.calendar.event = req.body.event;
    }
    if (req.body.description != null) {
        res.calendar.description = req.body.description;
    }

    try {
        const updatedCalendar = await res.calendar.save();
        res.json(updatedCalendar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a calendar event
router.delete('/:id', getCalendar, async (req, res) => {
    try {
        await res.calendar.remove();
        res.json({ message: 'Deleted calendar event' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware function for gettig calendar event object by ID
async function getCalendar(req, res, next) {
    try {
        calendar = await Calendar.findById(req.params.id);
        if (calendar == null) {
            return res.status(404).json({ message: 'Cant find calendar event' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.calendar = calendar;
    next();
}