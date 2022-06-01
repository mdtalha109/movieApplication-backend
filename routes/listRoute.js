import express from 'express'
import { AddMovieToList, createList, deleteList, getListPrivate, getListPublic, moviesInList } from '../controller/listController.js'
import protect from '../middleware/authMiddleware.js'



const router = express.Router()

router.post('/createList',protect, createList)  // routes for creating new list
router.post('/deletelist', protect,deleteList)   // routes for deleting new list
router.post('/addmovietolist', protect, AddMovieToList)  // routes for adding movie to list
router.post('/getmoviebylist', protect, moviesInList)   // routes for getting movies item in list
router.get('/getlist/private',protect, getListPrivate)  // routes for getting list of loggedIn user
router.get('/getlist/public',protect, getListPublic)    // routes for getting all list





export default router