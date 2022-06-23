import { DateTime } from 'luxon'
import { column, BaseModel, computed, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Purchase extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public product_id: number

  @column()
  public amount: number

  @computed()
  public get total() {
    return this.amount * this.product.price
  }

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Product, {
    foreignKey: 'unity_id',
  })
  public product: HasOne<typeof Product>
}
