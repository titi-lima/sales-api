import request from 'supertest';
import { shouldAuthorizePayment } from '../../src/shared/utils/shouldAuthorizePayment';
import { createAndAuthenticateUser } from '../shared/utils/createAndAuthenticateUser';
import app from '../../src/app';

import { connection } from '../shared/config/database.config';
import { MOCK_PRODUCT } from '../shared/constants/product';

// Mock shouldAuthorizePayment globally
jest.mock('../../src/shared/utils/shouldAuthorizePayment', () => ({
  shouldAuthorizePayment: jest.fn(),
}));

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

  it('should change order status to received successfully', async () => {
    (shouldAuthorizePayment as jest.Mock).mockReturnValueOnce(true);

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

    const orderResponse = await request(app)
      .patch(`/orders/${response.body.data.id}`)
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        status: 'RECEIVED',
      });

    expect(orderResponse.status).toBe(200);
    expect(orderResponse.body).toHaveProperty(
      'message',
      'Order updated successfully.',
    );
    expect(orderResponse.body).toHaveProperty('data');
  });

  it('should fail to change order status when payment fails', async () => {
    // Mock shouldAuthorizePayment to return false (unsuccessful transaction)
    (shouldAuthorizePayment as jest.Mock).mockReturnValueOnce(false);

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

    // Attempting to change order status without authorized payment
    const orderResponse = await request(app)
      .patch(`/orders/${response.body.data.id}`)
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        status: 'RECEIVED',
      });

    expect(orderResponse.status).toBe(400);
    expect(orderResponse.body).toHaveProperty('message', 'Payment failed.');

    const cart = await request(app)
      .get(`/carts`)
      .set('Authorization', `Bearer ${user.accessToken}`);

    expect(cart.status).toBe(200);
    expect(cart.body).toHaveProperty('message', 'Cart found.');
  });

  it('should find all orders', async () => {
    (shouldAuthorizePayment as jest.Mock)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);

    const [products, user] = await Promise.all([
      getProducts(),
      createAndAuthenticateUser(),
    ]);
    const cartsResponse = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        productId: products[0].id,
        quantity: 1,
      });
    expect(cartsResponse.status).toBe(201);
    const ordersResponse = await request(app)
      .patch(`/orders/${cartsResponse.body.data.id}`)
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        status: 'RECEIVED',
      });
    expect(ordersResponse.status).toBe(200);
    const anotherCartsResponse = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        productId: products[1].id,
        quantity: 1,
      });
    expect(anotherCartsResponse.status).toBe(201);
    const anotherOrdersResponse = await request(app)
      .patch(`/orders/${anotherCartsResponse.body.data.id}`)
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        status: 'RECEIVED',
      });
    expect(anotherOrdersResponse.status).toBe(200);
    const getOrdersResponse = await request(app)
      .get('/orders')
      .set('Authorization', `Bearer ${user.accessToken}`);
    expect(getOrdersResponse.status).toBe(200);
    expect(getOrdersResponse.body).toHaveProperty('message', 'Orders found.');
    expect(getOrdersResponse.body).toHaveProperty('data');
    expect(getOrdersResponse.body.data.length).toBe(2);
  });
  it('should delete an order', async () => {
    (shouldAuthorizePayment as jest.Mock)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);

    const [products, user] = await Promise.all([
      getProducts(),
      createAndAuthenticateUser(),
    ]);
    const cartsResponse = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        productId: products[0].id,
        quantity: 1,
      });
    expect(cartsResponse.status).toBe(201);
    const ordersResponse = await request(app)
      .patch(`/orders/${cartsResponse.body.data.id}`)
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        status: 'RECEIVED',
      });
    expect(ordersResponse.status).toBe(200);
    const deleteOrderResponse = await request(app)
      .delete(`/orders/${ordersResponse.body.data.id}`)
      .set('Authorization', `Bearer ${user.accessToken}`);
    expect(deleteOrderResponse.status).toBe(200);
    expect(deleteOrderResponse.body).toHaveProperty(
      'message',
      'Order deleted successfully.',
    );
  });
});
