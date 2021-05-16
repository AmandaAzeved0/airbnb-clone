'use strict'

const Database = use('Database')
const Model = use('Model')

class Property extends Model {

    /** https://legacy.adonisjs.com/docs/4.1/lucid#_query_scopes */   
    static scopeNearBy (query, latitude, longitude, distance) {

        //A fórmula de haversine calcula distâncias entre dois pontos de uma esfera a partir de suas latitudes e longitudes
        const haversine = `(6371 * acos(cos(radians(${latitude}))
            * cos(radians(latitude))
            * cos(radians(longitude)
            - radians(${longitude}))
            + sin(radians(${latitude}))
            * sin(radians(latitude))))`

        return query
            .select('*', Database.raw(`${haversine} as distance`))
            .whereRaw(`${haversine} < ${distance}`)
      }

    user () {
        return this.belongsTo('App/Models/User')
      }
    
      images () {
        return this.hasMany('App/Models/Image')
      }
}

module.exports = Property
