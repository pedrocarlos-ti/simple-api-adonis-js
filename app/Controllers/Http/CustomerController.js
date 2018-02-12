'use strict'
const Customer = use('App/Models/Customer')

class CustomerController {
  async index({ response }) {
    const customers = await Customer.all()

    response.status(200).json({
      message: 'Here are your customers.',
      data: customers
    })
  }

  async store({ request, response }) {
    const { name, description } = request.post()

    // save and get instance back
    const customer = await Customer.create({ name, description })

    response.status(201).json({
      message: 'Successfully created a new customer.',
      data: customer
    })
  }

  async show({ request, response }) {
    response.status(200).json({
      message: 'Here is your customer.',
      data: request.post().customer
    })
  }

  async update({ request, response }) {
    const { name, description, customer } = request.post()

    customer.name = name
    customer.description = description

    await customer.save()

    response.status(200).json({
      message: 'Successfully updated this customer.',
      data: customer
    })
  }

  async delete({ request, response, params: { id } }) {
    const customer = request.post().customer

    await customer.delete()

    response.status(200).json({
      message: 'Successfully deleted this customer.',
      id
    })
  }
}

module.exports = CustomerController
