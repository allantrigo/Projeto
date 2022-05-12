import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { LucidModel } from '@ioc:Adonis/Lucid/Model'
import GenericValidator from '@pd-solucoes/generic-validator-adonisjs5'

export default abstract class GenericController<V extends GenericValidator, M extends LucidModel> {
  constructor(
    public readonly validator: V,
    public readonly model: M,
    protected readonly mainColumn: string
  ) {}

  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate({ schema: this.validator.create() })
    const model = await this.model.create(data)
    return response.created(model)
  }

  public async updateById({ request, response }: HttpContextContract) {
    const { id, ...data } = await request.validate({ schema: this.validator.updateById() })

    const model = await this.model.findOrFail(id)

    model.merge(data)

    await model.save()
    response.ok(model)
  }

  public async readById({ request, response }: HttpContextContract) {
    const { id } = await request.validate({ schema: this.validator.findById() })
    const model = await this.model.findOrFail(id)

    return response.ok(model)
  }

  public async readAll({ request, response }: HttpContextContract) {
    const { page, limit, filter } = await request.validate({
      schema: this.validator.getPaginate(),
    })

    const model = this.model.query().orderBy(this.mainColumn, 'asc')

    if (filter) model.where(this.mainColumn, 'ilike', `%${filter}%`)

    page ? response.ok(await model.paginate(page, limit)) : response.ok(await model)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = await request.validate({ schema: this.validator.findById() })

    const model = await this.model.findOrFail(id)
    await model.delete()
    response.ok(model)
  }
}
