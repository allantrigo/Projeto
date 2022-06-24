import Product from 'App/Models/Product'
import User from 'App/Models/User'

export default abstract class ValidatePurchase {
  public static async handle(user: User, purchases: { product_id: number; amount: number }[]) {
    let total = 0
    let failed = false
    let failedProduct: Product | undefined
    await Promise.all(
      purchases.map(async (purchase) => {
        const product = await Product.findOrFail(purchase.product_id)
        if (product.amount < purchase.amount) {
          failed = true
          failedProduct = product
        }
        total = total + product.price * purchase.amount
      })
    )

    if (failed && failedProduct) {
      throw new Error('Invalid Product Amount ' + failedProduct.name)
    }

    if (user.balance < total) throw new Error('User balance is insufficient.')
  }
}
