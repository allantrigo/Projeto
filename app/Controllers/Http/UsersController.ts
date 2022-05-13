import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GenericController from 'App/Generic/GenericController'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController extends GenericController<UserValidator, typeof User> {
  constructor() {
    super(new UserValidator('users'), User, 'email')
  }

  public async updateById({ request, response }: HttpContextContract) {
    const { id, ...data } = await request.validate({ schema: this.validator.updateById() })

    try {
      const model = await this.model.findOrFail(id)

      model.merge(data)

      await model.save()
      response.ok(model)
    } catch (error) {
      throw error
    }
  }
}
