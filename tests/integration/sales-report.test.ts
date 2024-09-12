import request from 'supertest';
import { createAndAuthenticateUser } from '../shared/utils/createAndAuthenticateUser';
import { createAndAuthenticateAdmin } from '../shared/utils/createAndAuthenticateAdmin';
import app from '../../src/app';

import { connection } from '../shared/config/database.config';

// you need to be running the back-end for this test to work
// because it tests the database (run "docker-compose up")
jest.mock('../../src/infra/external/s3/index.ts', () => ({
  FileService: jest.fn().mockImplementation(() => ({
    uploadFile: jest.fn().mockResolvedValue('sales-report.csv'),
    getFile: jest.fn().mockResolvedValue('https://sales-report.csv'),
    deleteFile: jest.fn().mockResolvedValue(undefined),
  })),
}));

describe('Sales Report', () => {
  beforeAll(async () => {
    connection.create();
  });

  beforeEach(async () => connection.clear());

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('should create a sales report', async () => {
    const admin = await createAndAuthenticateAdmin();

    const response = await request(app)
      .post('/sales-reports')
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .send({
        beginDate: '2024-09-06',
        endDate: '2024-09-13',
      });
    expect(response.status).toBe(201);
  });

  it('should update a sales report', async () => {
    const admin = await createAndAuthenticateAdmin();
    const salesReport = await request(app)
      .post('/sales-reports')
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .send({
        beginDate: '2024-09-06',
        endDate: '2024-09-13',
      });
    const fieldsToUpdate = {
      beginDate: '2023-02-01',
      endDate: '2023-02-28',
    };
    const response = await request(app)
      .patch(`/sales-reports/${salesReport.body.data.id}`)
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .send(fieldsToUpdate);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Sales report updated successfully.',
    );
    expect(response.body).toHaveProperty('data');
  });

  it('should delete a sales report', async () => {
    const admin = await createAndAuthenticateAdmin();
    const salesReport = await request(app)
      .post('/sales-reports')
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .send({
        beginDate: '2024-09-06',
        endDate: '2024-09-13',
      });
    const response = await request(app)
      .delete(`/sales-reports/${salesReport.body.data.id}`)
      .set('Authorization', `Bearer ${admin.accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Sales report deleted successfully.',
    );
  });

  it('should not be able to create a sales report without admin', async () => {
    const user = await createAndAuthenticateUser();
    const response = await request(app)
      .post('/sales-reports')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        beginDate: '2024-09-06',
        endDate: '2024-09-13',
      });
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Forbidden.');
  });

  it('should get a sales report', async () => {
    const admin = await createAndAuthenticateAdmin();
    const salesReport = await request(app)
      .post('/sales-reports')
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .send({
        beginDate: '2024-09-06',
        endDate: '2024-09-13',
      });
    const response = await request(app)
      .get(`/sales-reports/${salesReport.body.data.id}`)
      .set('Authorization', `Bearer ${admin.accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Sales report found.');
    expect(response.body).toHaveProperty('data');
  });
});
