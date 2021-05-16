'use strict'

const Property = use('App/Models/Property')


/**
 * Resourceful controller for interacting with properties
 */
class PropertyController {

  async index ({request}) {
    const { latitude, longitude } = request.all()

    const properties = Property.query()
      .with('images')
      .nearBy(latitude, longitude, 10)
      .fetch()

    return properties
  }


  async store ({auth, request }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude',
      'price'
    ])

    const property = await Property.create({ ...data, user_id: id })

    return property
  }


  async show ({ params}) {
    const property = await Property.findOrFail(params.id)
    //load faz o carregamento de um relacionamento do model para retornar tambem as imagens
    await property.load('images')

    return property
  }


  async update ({ params, request, response }) {
    const property = await Property.findOrFail(params.id)

    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude',
      'price'
    ])
    //verifica o que foi alterado e atualiza
    property.merge(data)

    await property.save()

    return property
    }


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
