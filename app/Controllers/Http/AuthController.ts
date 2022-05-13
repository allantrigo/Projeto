import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AuthValidator from 'App/Validators/AuthValidator'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const { uid, password } = await request.validate({ schema: await new AuthValidator().login() })

    const token = await auth.use('api').attempt(uid, password)

    const user = await User.query().where('id', auth.user?.id || 0)

    return { user, ...token.toJSON() }
  }
}
