import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GenericController from 'App/Generic/GenericController'
import Product from 'App/Models/Product'
import Purchase from 'App/Models/Purchase'
import User from 'App/Models/User'
import ValidatePurchase from 'App/Services/ValidatePurchase'
import PurchaseValidator from 'App/Validators/PurchaseValidator'

export default class PurchasesController extends GenericController<
  PurchaseValidator,
  typeof Purchase
> {
  constructor() {
    super(new PurchaseValidator('purchases'), Purchase, 'id')
  }

  public async create({ request, response }: HttpContextContract) {
    const { ...data } = await request.validate({
      schema: this.validator.create(),
    })
    try {
      const user = await User.findOrFail(data.user_id)
      await ValidatePurchase.handle(user, data.purchases)
      const process = data.purchases.map(async (purchase) => {
        let product = await Product.findOrFail(purchase.product_id)
        product.amount = product.amount - purchase.amount
        product.save()
        const sale = await Purchase.create({
          user_id: user.id,
          product_id: purchase.product_id,
          amount: purchase.amount,
          total: purchase.amount * product.price,
        })
        return sale
      })

      const purchases = await Promise.all(process)
      response.ok(purchases)
    } catch (error) {
      throw error
    }
  }
}
