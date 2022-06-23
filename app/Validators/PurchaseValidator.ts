import { schema, rules } from '@ioc:Adonis/Core/Validator'
import GenericValidator from '../Generic/GenericValidator'

export default class PurchaseValidator extends GenericValidator {
  public create() {
    let createdSchema = schema.create({
      user_id: schema.number([rules.exists({ table: 'users', column: 'id' })]),
      purchase: schema.array().members(
        schema.object([rules.minLength(1)]).members({
          product_id: schema.number([rules.exists({ table: 'products', column: 'id' })]),
          amount: schema.number([rules.minLength(0)]),
        })
      ),
    })

    return createdSchema
  }

  public updateById() {
    let createdSchema = schema.create({
      id: schema.number([rules.exists({ table: 'purchases', column: 'id' })]),
      product_id: schema.number.optional([rules.exists({ table: 'products', column: 'id' })]),
      amount: schema.number.optional([rules.minLength(0)]),
    })

    return createdSchema
  }

  public findById() {
    let createdSchema = schema.create({
      id: schema.number([rules.exists({ table: 'purchases', column: 'id' })]),
    })

    return createdSchema
  }
  public getPaginate() {
    let createdSchema = schema.create({
      page: schema.number.optional(),
      limit: schema.number.optional([
        rules.requiredIfExists('page'),
        rules.range(1, Number.MAX_SAFE_INTEGER),
      ]),
      filter: schema.string.optional(),
    })

    return createdSchema
  }
}
