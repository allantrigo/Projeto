import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, BaseModel, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Purchase from './Purchase'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public admin: boolean

  @column()
  public balance: number

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Purchase, {
    foreignKey: 'purchase_id',
  })
  public purchases: HasMany<typeof Purchase>
}
