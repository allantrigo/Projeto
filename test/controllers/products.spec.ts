import Product from 'App/Models/Product'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const validProduct = {
  name: 'validProduct',
  description: 'valid product',
  amount: 99,
  price: 100,
}

test.group('CRUD PRODUCTS', (group) => {
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

  test('Should create a product and returns 201', async (assert) => {
    const { body: product } = await supertest(BASE_URL)
      .post('/products/create')
      .set('Authorization', `bearer ${validToken}`)
      .send(validProduct)
      .expect(201)
    const productCreated = await Product.find(product.id)

    assert.isDefined(productCreated)
  })

  test('Should read a product and returns 200', async (assert) => {
    const productRead = await Product.findByOrFail('name', validProduct.name)
    const { body: product } = await supertest(BASE_URL)
      .get(`/products/read?id=${productRead.id}`)
      .set('Authorization', 'bearer ' + validToken)
      .expect(200)

    assert.equal(product.id, productRead.id)
    assert.equal(product.name, productRead.name)
  })

  test('Should return a list of all products and returns 200', async (assert) => {
    const { body: response } = await supertest(BASE_URL)
      .get('/products/readAll')
      .set('Authorization', 'bearer ' + validToken)
      .expect(200)

    const products = await Product.all()

    assert.equal(response.length, products.length)
  })

  test('Should delete a product and returns 200', async (assert) => {
    const productToDelete = await Product.findByOrFail('name', validProduct.name)
    const { body: productDeleted } = await supertest(BASE_URL)
      .delete('/products/delete')
      .set('Authorization', 'bearer ' + validToken)
      .send({ id: productToDelete.id })
      .expect(200)

    assert.deepEqual(productDeleted, productToDelete.toJSON())
  })
})
