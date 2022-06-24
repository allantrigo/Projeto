import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const validUser = {
  name: 'validUSER',
  email: 'validUser@email.com',
  password: 'test123',
  password_confirmation: 'test123',
  admin: false,
}

test.group('CRUD USERS', (group) => {
  let validToken = ''

  group.before(async () => {
    const auth = {
      uid: 'admin@email.com',
      password: 'admin',
    }
    const { body } = await supertest(BASE_URL).post('/auth/login').send(auth).expect(200)
    const { token } = body
    validToken = token
  })

  test('Should create a user and returns 201', async (assert) => {
    const { body: user } = await supertest(BASE_URL)
      .post('/users/create')
      .set('Authorization', `bearer ${validToken}`)
      .send(validUser)
      .expect(201)
    const userCreated = await User.find(user.id)

    assert.isDefined(userCreated)
  })

  test('Should read a user and returns 200', async (assert) => {
    const userRead = await User.findByOrFail('name', validUser.name)
    const { body: user } = await supertest(BASE_URL)
      .get(`/users/read?id=${userRead.id}`)
      .set('Authorization', 'bearer ' + validToken)
      .expect(200)

    assert.equal(user.id, userRead.id)
    assert.equal(user.email, userRead.email)
  })

  test('Should not read a user because the id does not exist and returns 422', async (assert) => {
    const { body: response } = await supertest(BASE_URL)
      .get(`/users/read?id=${77777}`)
      .set('Authorization', 'bearer ' + validToken)
      .expect(422)
    const msgError = {
      rule: 'exists',
      field: 'id',
      message: 'exists validation failure',
    }

    assert.deepEqual(response.errors[0], msgError)
  })

  test('Should return a list of all users and returns 200', async (assert) => {
    const { body: response } = await supertest(BASE_URL)
      .get('/users/readAll')
      .set('Authorization', 'bearer ' + validToken)
      .expect(200)

    const users = await User.all()

    assert.equal(response.length, users.length)
  })

  test('Should delete a user and returns 200', async (assert) => {
    const userToDelete = await User.findByOrFail('email', validUser.email)
    const { body: userDeleted } = await supertest(BASE_URL)
      .delete('/users/delete')
      .set('Authorization', 'bearer ' + validToken)
      .send({ id: userToDelete.id })
      .expect(200)

    assert.deepEqual(userDeleted, userToDelete.toJSON())
  })
})
