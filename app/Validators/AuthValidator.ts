import { schema } from '@ioc:Adonis/Core/Validator'

export default class AuthValidator {
  constructor() {}

  public login() {
    let createdSchema = schema.create({
      uid: schema.string({ trim: true }),
      password: schema.string({ trim: true }),
    })

    return createdSchema
  }
}
