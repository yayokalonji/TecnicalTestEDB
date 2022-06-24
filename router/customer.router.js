const router = require('express').Router()
const { getCustomers, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customer.controller')

router.get('/customers', getCustomers)
router.post('/customers', createCustomer)
router.patch('/customers/:customerID', updateCustomer)
router.delete('/customers/:customerID', deleteCustomer)

module.exports = router
