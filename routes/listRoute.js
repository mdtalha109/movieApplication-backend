import express from 'express'
import { AddMovieToList, createList, deleteList, getList, moviesInList } from '../controller/listController.js'
import protect from '../middleware/authMiddleware.js'



const router = express.Router()

router.post('/createList',protect, createList)
router.post('/deletelist', protect,deleteList)
router.post('/addmovietolist', protect, AddMovieToList)
router.post('/getmoviebylist', protect, moviesInList)

router.get('/getlist',protect, getList)




export default router