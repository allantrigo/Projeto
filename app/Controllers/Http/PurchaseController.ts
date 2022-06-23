import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GenericController from 'App/Generic/GenericController'
import Purchase from 'App/Models/Purchase'
import PurchaseValidator from 'App/Validators/PurchaseValidator'

export default class PurchaseController extends GenericController<
  PurchaseValidator,
  typeof Purchase
> {
  constructor() {
    super(new PurchaseValidator('products'), Purchase, 'name')
  }

  public async create({ request, response }: HttpContextContract) {
    const { user_id: person, ...data } = await request.validate({
      schema: this.validator.create(),
    })

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
