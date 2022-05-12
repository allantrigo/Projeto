import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Env from '@ioc:Adonis/Core/Env'
import GenericValidator from '../Generic/GenericValidator'

export default class UserValidator extends GenericValidator {
  public create() {
    let createdSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.maxLength(parseInt(Env.get('VARCHAR_MAX_LENGTH'))),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      admin: schema.boolean(),
      password: schema.string({ trim: true }, [
        rules.maxLength(parseInt(Env.get('VARCHAR_MAX_LENGTH'))),
      ]),
    })

    return createdSchema
  }

  public updateById() {
    let createdSchema = schema.create({
      id: schema.number([rules.exists({ table: 'users', column: 'id' })]),
      name: schema.string.optional({ trim: true }, [
        rules.maxLength(parseInt(Env.get('VARCHAR_MAX_LENGTH'))),
      ]),
      email: schema.string.optional({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      admin: schema.boolean.optional(),
      password: schema.string.optional({ trim: true }, [
        rules.maxLength(parseInt(Env.get('VARCHAR_MAX_LENGTH'))),
      ]),
    })

    return createdSchema
  }

  public findById() {
    let createdSchema = schema.create({
      id: schema.number([rules.exists({ table: 'users', column: 'id' })]),
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
