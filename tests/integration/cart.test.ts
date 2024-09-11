import request from 'supertest';
import { createAndAuthenticateUser } from '../shared/utils/createAndAuthenticateUser';
import app from '../../src/app';

import { connection } from '../shared/config/database.config';
import { MOCK_PRODUCT } from '../shared/constants/product';

// you need to be running the back-end for this test to work
// because it tests the database (run "docker-compose up")

const getProducts = async () => {
  const db = connection.get();
  const products = await db.product.findMany();
  return products;
};

describe('Cart', () => {
  beforeAll(async () => {
    connection.create();
  });

  beforeEach(async () => {
    await connection.clear();
    const db = connection.get();
    await db.product.createMany({
      data: MOCK_PRODUCT,
    });
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('should create a cart', async () => {
    const [products, user] = await Promise.all([
      getProducts(),
      createAndAuthenticateUser(),
    ]);
    const response = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        productId: products[0].id,
        quantity: 1,
      });
    expect(response.status).toBe(201);
  });

  it('should update a cart', async () => {
    const [products, user] = await Promise.all([
      getProducts(),
      createAndAuthenticateUser(),
    ]);
    const response = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        productId: products[0].id,
        quantity: 1,
      });
    expect(response.status).toBe(201);
    const response2 = await request(app)
      .patch(`/carts/${response.body.data.orderProducts[0].id}`)
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        quantity: 2,
      });
    expect(response2.status).toBe(200);
    expect(response2.body).toHaveProperty('message', 'Cart updated.');
    expect(response2.body).toHaveProperty('data');
  });

  it('should delete from a cart', async () => {
    const [products, user] = await Promise.all([
      getProducts(),
      createAndAuthenticateUser(),
    ]);
    const response = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        productId: products[0].id,
        quantity: 1,
      });
    expect(response.status).toBe(201);
    const response2 = await request(app)
      .delete(`/carts/${response.body.data.orderProducts[0].id}`)
      .set('Authorization', `Bearer ${user.accessToken}`);
    expect(response2.status).toBe(200);
    expect(response2.body).toHaveProperty(
      'message',
      'Product removed from cart.',
    );
  });

  it('should find a cart', async () => {
    const [products, user] = await Promise.all([
      getProducts(),
      createAndAuthenticateUser(),
    ]);
    const response = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        productId: products[0].id,
        quantity: 1,
      });
    expect(response.status).toBe(201);
    const response2 = await request(app)
      .get(`/carts`)
      .set('Authorization', `Bearer ${user.accessToken}`);
    expect(response2.status).toBe(200);
    expect(response2.body).toHaveProperty('message', 'Cart found.');
    expect(response2.body).toHaveProperty('data');
  });

  it('should not add a non-existing product to a cart', async () => {
    const user = await createAndAuthenticateUser();
    const response = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        productId: '1234567890',
        quantity: 1,
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Product not found.');
  });

  it('should not remove a non-existing product from a cart', async () => {
    const user = await createAndAuthenticateUser();
    const response = await request(app)
      .delete('/carts/1234567890')
      .set('Authorization', `Bearer ${user.accessToken}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      'message',
      'Product not found in order.',
    );
  });

  it('should not update a non-existing product in a cart', async () => {
    const user = await createAndAuthenticateUser();
    const response = await request(app)
      .patch('/carts/1234567890')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        quantity: 1,
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      'message',
      'Product not found in order.',
    );
  });
});
