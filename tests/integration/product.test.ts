import request from 'supertest';
import { createAndAuthenticateUser } from '../shared/utils/createAndAuthenticateUser';
import app from '../../src/app';

import { connection } from '../shared/config/database.config';
import { createAndAuthenticateAdmin } from '../shared/utils/createAndAuthenticateAdmin';
import { MOCK_PRODUCT } from '../shared/constants/product';
import { ICreateProductDTO } from '../../src/DTOs/product/create';

// you need to be running the back-end for this test to work
// because it tests the database (run "docker-compose up")

describe('Product', () => {
  beforeAll(async () => {
    connection.create();
  });

  beforeEach(async () => connection.clear());

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('should create a product', async () => {
    const admin = await createAndAuthenticateAdmin();

    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .send(MOCK_PRODUCT[0]);
    expect(response.status).toBe(201);
  });

  it('should update a product', async () => {
    const admin = await createAndAuthenticateAdmin();
    const otherProduct = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .send(MOCK_PRODUCT[0]);
    const fieldsToUpdate: Partial<ICreateProductDTO> = {
      name: 'Libertadores Trophy',
      description: 'Libertadores Trophy',
    };
    const response = await request(app)
      .patch(`/products/${otherProduct.body.data.id}`)
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .send(fieldsToUpdate);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Product updated successfully.',
    );
    expect(response.body).toHaveProperty('data');
  });

  it('should delete a product', async () => {
    const admin = await createAndAuthenticateAdmin();
    const otherProduct = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .send(MOCK_PRODUCT[0]);
    const response = await request(app)
      .delete(`/products/${otherProduct.body.data.id}`)
      .set('Authorization', `Bearer ${admin.accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Product deleted successfully.',
    );
  });

  it('should not be able to create a product without admin', async () => {
    const user = await createAndAuthenticateUser();
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send(MOCK_PRODUCT[0]);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Forbidden.');
  });

  it('should not be able to update a product without admin', async () => {
    const admin = await createAndAuthenticateAdmin();
    const user = await createAndAuthenticateUser();
    const product = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .send(MOCK_PRODUCT[0]);
    const fieldsToUpdate: Partial<ICreateProductDTO> = {
      name: 'Libertadores Trophy',
      description: 'Libertadores Trophy',
    };
    const response = await request(app)
      .patch(`/products/${product.body.data.id}`)
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send(fieldsToUpdate);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Forbidden.');
  });

  it('should not be able to delete a product without admin', async () => {
    const admin = await createAndAuthenticateAdmin();
    const user = await createAndAuthenticateUser();
    const product = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .send(MOCK_PRODUCT[0]);
    const response = await request(app)
      .delete(`/products/${product.body.data.id}`)
      .set('Authorization', `Bearer ${user.accessToken}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Forbidden.');
  });

  it('should find all products', async () => {
    const admin = await createAndAuthenticateAdmin();
    await Promise.all(
      MOCK_PRODUCT.map((product) =>
        request(app)
          .post('/products')
          .set('Authorization', `Bearer ${admin.accessToken}`)
          .send(product),
      ),
    );
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Products found.');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.length).toBe(MOCK_PRODUCT.length);
  });

  it('should find a product by id', async () => {
    const admin = await createAndAuthenticateAdmin();
    const otherProduct = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .send(MOCK_PRODUCT[0]);
    const response = await request(app).get(
      `/products/${otherProduct.body.data.id}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Product found.');
    expect(response.body).toHaveProperty('data');
  });

  it('should not find a product by non-existing id', async () => {
    const response = await request(app).get(`/products/1234567890`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Product not found.');
  });

  it('should be able to filter products by name', async () => {
    const admin = await createAndAuthenticateAdmin();
    await Promise.all(
      MOCK_PRODUCT.map((product) =>
        request(app)
          .post('/products')
          .set('Authorization', `Bearer ${admin.accessToken}`)
          .send(product),
      ),
    );
    const response = await request(app)
      .get('/products')
      .query({ name: MOCK_PRODUCT[0].name });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Products found.');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.length).toBe(1);
  });

  it('should be able to order products by price (desc)', async () => {
    const admin = await createAndAuthenticateAdmin();
    await Promise.all(
      MOCK_PRODUCT.map((product) =>
        request(app)
          .post('/products')
          .set('Authorization', `Bearer ${admin.accessToken}`)
          .send(product),
      ),
    );
    const responseDesc = await request(app)
      .get('/products')
      .query({ priceOrderBy: 'desc' });
    expect(responseDesc.status).toBe(200);
    expect(responseDesc.body).toHaveProperty('message', 'Products found.');
    expect(responseDesc.body).toHaveProperty('data');
    expect(responseDesc.body.data.length).toBe(MOCK_PRODUCT.length);
    expect(Number(responseDesc.body.data[1].price)).toBeLessThan(
      Number(responseDesc.body.data[0].price),
    );
  });
  it('should be able to order products by price (asc)', async () => {
    const admin = await createAndAuthenticateAdmin();
    await Promise.all(
      MOCK_PRODUCT.map((product) =>
        request(app)
          .post('/products')
          .set('Authorization', `Bearer ${admin.accessToken}`)
          .send(product),
      ),
    );
    const responseAsc = await request(app)
      .get('/products')
      .query({ priceOrderBy: 'asc' });
    expect(responseAsc.status).toBe(200);
    expect(responseAsc.body).toHaveProperty('message', 'Products found.');
    expect(responseAsc.body).toHaveProperty('data');
    expect(responseAsc.body.data.length).toBe(MOCK_PRODUCT.length);
    expect(Number(responseAsc.body.data[1].price)).toBeGreaterThan(
      Number(responseAsc.body.data[0].price),
    );
  });

  it('should be able to filter products by available', async () => {
    const admin = await createAndAuthenticateAdmin();
    await Promise.all(
      MOCK_PRODUCT.map((product) =>
        request(app)
          .post('/products')
          .set('Authorization', `Bearer ${admin.accessToken}`)
          .send(product),
      ),
    );
    const responseAvailable = await request(app)
      .get('/products')
      .query({ available: true });
    expect(responseAvailable.status).toBe(200);
    expect(responseAvailable.body).toHaveProperty('message', 'Products found.');
    expect(responseAvailable.body).toHaveProperty('data');
    expect(responseAvailable.body.data.length).toBe(
      MOCK_PRODUCT.reduce((acc, v) => (v.quantity > 0 ? acc + 1 : acc), 0),
    );
  });
});
