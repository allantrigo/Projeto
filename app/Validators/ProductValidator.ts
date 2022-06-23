import { schema, rules } from '@ioc:Adonis/Core/Validator'
import GenericValidator from '../Generic/GenericValidator'

export default class ProductValidator extends GenericValidator {
  public create() {
    let createdSchema = schema.create({
      name: schema.string({ trim: true }, [rules.unique({ table: 'products', column: 'name' })]),
      description: schema.string.optional({ trim: true }),
      amount: schema.number(),
      price: schema.number(),
    })

    return createdSchema
  }

  public updateById() {
    let createdSchema = schema.create({
      id: schema.number([rules.exists({ table: 'products', column: 'id' })]),
      name: schema.string.optional({ trim: true }),
      description: schema.string.optional({ trim: true }),
      amount: schema.number.optional(),
      price: schema.number.optional(),
      active: schema.boolean.optional(),
    })

    return createdSchema
  }

  public findById() {
    let createdSchema = schema.create({
      id: schema.number([rules.exists({ table: 'products', column: 'id' })]),
    })

    return createdSchema
  }

  public getPaginate() {
    let createdSchema = schema.create({
      active: schema.boolean.optional(),
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
