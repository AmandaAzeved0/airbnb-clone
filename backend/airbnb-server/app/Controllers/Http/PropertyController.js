'use strict'

const Property = use('App/Models/Property')


/**
 * Resourceful controller for interacting with properties
 */
class PropertyController {

  async index () {
    const properties = Property.all()

    return properties
  }


  /**
   * Create/save a new property.
   * POST properties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }


  async show ({ params}) {
    const property = await Property.findOrFail(params.id)
    //load faz o carregamento de um relacionamento do model para retornar tambem as imagens
    await property.load('images')

    return property
  }


  /**
   * Update property details.
   * PUT or PATCH properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a property with id.
   * DELETE properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    const property = await Property.findOrFail(params.id)

    //faz uma verificação se o dono do imóvel é o mesmo usuário tentando fazer a requisição
    if (property.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }
  
    await property.delete()
  }
}

module.exports = PropertyController
