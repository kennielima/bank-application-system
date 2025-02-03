const request = require('supertest');
import { describe, expect, it, test } from 'vitest';
import logger from '../../utils/logger';
const server = require('../../server');
require('../../middlewares/verifyUser');
require('dotenv').config();

describe('User Signup', () => {
    beforeAll(async () => {
        try {
            await db.sequelize.authenticate()
            logger.info('Database connected')
        } catch (error) {
            logger.error('Unable to connect:', error)
        }
    })

    it('should create a new user', async () => {
        const response = await request(server)
            .post('/auth/signup')
             .send({
                FirstName: "test",
                LastName: "test",
                Email: "kennylima@gmail.com",
                PhoneNumber: "07038222850",
                Password: "Once4ev@",
                DateOfBirth: "2024-11-12",
            })
        expect(response.status).toBe(201);
        expect(response.body.responseObject.status).toBe(true)
    })
})

describe('User Login', () => {
    it('should send login OTP to user&quot;s Email', async () => {
        const response = await request(server)
            .post('/auth/login')
             .send({
                Email: "kennylima970@gmail.com",
                Password: "Once4ev@",
            })
        expect(response.status).toBe(201);
        expect(response.body.responseObject.status).toBe(true)
    })

    it('should verify OTP to enable login', async () => {
        const response = await request(server)
            .post('/auth/verify-login')
            .send({
                Email: "kennylima970@gmail.com",
                OTP: "5607",
            })
        expect(response.status).toBe(200);
        expect(response.body.responseObject.status).toBe(true)
    })
})

describe('Forgot Password', () => {
    it('should send forgot password OTP to user&quot;s Email', async () => {
        const response = await request(server)
            .post('/auth/forgot-password')
             .send({
                Email: "kennylima970@gmail.com",
            })
        expect(response.status).toBe(201);
        expect(response.body.responseObject.status).toBe(true)
    })
})

describe('Reset Password', () => {
    it('should verify OTP to enable password reset', async () => {
        const response = await request(server)
            .post('/auth/verify-otp')
            .send({
                Email: "kennylima970@gmail.com",
                OTP: "8510",
            })
        expect(response.status).toBe(200);
        expect(response.body.responseObject.status).toBe(true)
    })

    it('should enable user to reset password',
        async () => {
            const response = await request(server)
                .post('/auth/reset-password')
                .send({
                    Email: "kennylima970@gmail.com",
                    OTP: "8510",
                    newPassword: "Once4ev@",
                })
            expect(response.status).toBe(201);
            expect(response.body.responseObject.status).toBe(true)
        })
})

// TODO: Refreshtoken, block/unblockuser, logout, middlewares