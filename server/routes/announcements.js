import express from 'express';
import mongoose from 'mongoose';
import Announcement from '../models/announcement.js';

const router = express.Router();

// Handle both real MongoDB and mock data
const getAnnouncements = async (req, res) => {
  try {
    if (req.app.locals.useMockData) {
      return res.status(200).json(req.app.locals.mockAnnouncements);
    }
    
    const announcements = await Announcement.find().sort({ date: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (req.app.locals.useMockData) {
      const announcement = req.app.locals.mockAnnouncements.find(a => a._id === id);
      if (!announcement) {
        return res.status(404).json({ message: 'Announcement not found' });
      }
      return res.status(200).json(announcement);
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAnnouncement = async (req, res) => {
  try {
    const { title, content, author, date } = req.body;
    
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Title, content, and author are required' });
    }
    
    if (req.app.locals.useMockData) {
      const newAnnouncement = {
        _id: (req.app.locals.mockAnnouncements.length + 1).toString(),
        title,
        content,
        author,
        date: date || new Date().toISOString(),
      };
      
      req.app.locals.mockAnnouncements.push(newAnnouncement);
      return res.status(201).json(newAnnouncement);
    }
    
    const newAnnouncement = new Announcement({
      title,
      content,
      author,
      date: date || new Date(),
    });
    
    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, date } = req.body;
    
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Title, content, and author are required' });
    }
    
    if (req.app.locals.useMockData) {
      const index = req.app.locals.mockAnnouncements.findIndex(a => a._id === id);
      if (index === -1) {
        return res.status(404).json({ message: 'Announcement not found' });
      }
      
      const updatedAnnouncement = {
        ...req.app.locals.mockAnnouncements[index],
        title,
        content,
        author,
        date: date || req.app.locals.mockAnnouncements[index].date,
      };
      
      req.app.locals.mockAnnouncements[index] = updatedAnnouncement;
      return res.status(200).json(updatedAnnouncement);
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      { title, content, author, date: date || new Date() },
      { new: true }
    );
    
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (req.app.locals.useMockData) {
      const index = req.app.locals.mockAnnouncements.findIndex(a => a._id === id);
      if (index === -1) {
        return res.status(404).json({ message: 'Announcement not found' });
      }
      
      req.app.locals.mockAnnouncements.splice(index, 1);
      return res.status(200).json({ message: 'Announcement deleted successfully' });
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
    if (!deletedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Routes
router.get('/', getAnnouncements);
router.get('/:id', getAnnouncement);
router.post('/', createAnnouncement);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);

export default router;