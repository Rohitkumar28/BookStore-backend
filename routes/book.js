const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

router.post('/add',  async (req,res) => {
    try {
        const {name, author, image} = req.body;
        const newbook = new Book({
            name ,
            author,
            image,
        })
        await newbook.save()
        return res.json({added: true})
    } catch (error) {
        return res.json({message: "Error in adding book"});
    }
})

router.get('/books',async (req,res) => {
    try {
        const books = await Book.find()
        return res.json(books)
    } catch (error) {
        return res.json(error)
    }
})

router.get('/book/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById({_id: id})
        return res.json(book)
    } catch (error) {
        return res.json(error)
    }
})

router.put('/book/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndUpdate({_id: id},req.body)
        return res.json({updated: true, book})
    } catch (error) {
        return res.json(error)
    }
})

router.delete('/book/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete({_id: id},req.body)
        return res.json({deleted: true, book})
    } catch (error) {
        return res.json(error)
    }
})

module.exports = router;

