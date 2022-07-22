import express from 'express'
import Controller from './../controllers/product.js'
import Validator from './../validator/product.js'

const router = express.Router()

router.get('/count', Controller.count)
router.get('/', Controller.find)
router.get('/:id', Controller.findById)
router.delete('/:id', Controller.delete)
router.post('/', Validator.create, Controller.create)
router.put('/:id', Controller.update)

export default router
