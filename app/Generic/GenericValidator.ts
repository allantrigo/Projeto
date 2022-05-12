/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { rules } from '@adonisjs/validator/build/src/Rules'
import { schema } from '@adonisjs/validator/build/src/Schema'

export default abstract class GenericValidator {
  constructor(protected readonly tableName: string, protected readonly mainColumn: string = 'id') {}

  abstract create(): any

  abstract updateById(): any

  public findById() {
    let createdSchema = schema.create({
      id: schema.number([rules.exists({ table: this.tableName, column: this.mainColumn })]),
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
