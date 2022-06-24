const Customer = require('../model/customer')

const STATE = ['NUEVO', 'NO INTERESADO', 'NUMERO EQUIVOCADO', 'INFORMACION EQUIVOCADA', 'ALTO POTENCIAL', 'BAJO POTENCIAL']

function validations (req, res) {
  if (!req.body.name) {
    return res.status(400).json({ messageError: 'Name is required' })
  }
  if (!req.body.lastName) {
    return res.status(400).json({ messageError: 'Last Name is required' })
  }
  if (!req.body.telephoneNumber) {
    return res.status(400).json({ messageError: 'Telephone Number is required' })
  }
  if (!req.body.email) {
    return res.status(400).json({ messageError: 'Email is required' })
  }
  if (!req.body.age) {
    return res.status(400).json({ messageError: 'Age is required' })
  }
  if (!req.body.state) {
    return res.status(400).json({ messageError: 'State is required' })
  }
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email)) {
    return res.status(400).json({ messageError: 'Email is invalid' })
  }
  if (!STATE.includes(req.body.state.toUpperCase())) {
    return res.status(400).json({ messageError: 'State is invalid' })
  }
}

const getCustomers = (req, res) => {
  Customer.find((err, customer) => {
    if (err) {
      return res.send(err)
    }
    return res.json(customer)
  })
}

const createCustomer = (req, res) => {
  if (validations(req, res)) {
    return
  }
  const customer = new Customer({
    name: req.body.name,
    lastName: req.body.lastName,
    telephoneNumber: req.body.telephoneNumber,
    email: req.body.email,
    age: req.body.age,
    state: req.body.state
  })
  customer.save((err, customer) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json(customer)
  })
}

const updateCustomer = (req, res) => {
  if (validations(req, res)) {
    return
  }
  Customer.findOneAndUpdate({ _id: req.params.customerID },
    {
      $set: {
        name: req.body.name,
        lastName: req.body.lastName,
        telephoneNumber: req.body.telephoneNumber,
        email: req.body.email,
        age: req.body.age,
        state: req.body.state
      }
    },
    { new: true },
    (err, customer) => {
      if (err) {
        res.send(err)
      } else res.json(customer)
    }
  )
}

const deleteCustomer = (req, res) => {
  Customer.deleteOne({ _id: req.params.customerID })
    .then(() => res.json({ message: 'Customer deleted' }))
    .catch((err) => res.send(err))
}

module.exports = { getCustomers, createCustomer, updateCustomer, deleteCustomer }
