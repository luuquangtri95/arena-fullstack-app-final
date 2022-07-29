import express from 'express'
import Controller from '../controllers/vendor.js'

const router = express.Router()

router.get('/', Controller.find)
router.get('/:id', Controller.findById)
router.post('/', Controller.create)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)

export default router
