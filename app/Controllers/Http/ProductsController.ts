import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GenericController from 'App/Generic/GenericController'
import Product from 'App/Models/Product'
import ProductValidator from 'App/Validators/ProductValidator'

export default class ProductController extends GenericController<ProductValidator, typeof Product> {
  constructor() {
    super(new ProductValidator('products'), Product, 'name')
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

  public async readAll({ request, response }: HttpContextContract) {
    const { active, page, limit, filter } = await request.validate({
      schema: this.validator.getPaginate(),
    })

    const model = this.model.query().orderBy(this.mainColumn, 'asc')

    if (active) {
      model.where('active', active)
    }

    if (filter) model.where(this.mainColumn, 'ilike', `%${filter}%`)

    page ? response.ok(await model.paginate(page, limit)) : response.ok(await model)
  }
}
