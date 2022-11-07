import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { Model } from 'sequelize'
import sinon from 'sinon'
import { app } from '../app'
import User from '../database/models/user'

chai.use(chaiHttp)

// caso de uso: login de usuario
// requerido: email, password
// retorne token || string

describe('POST /login', () => {
  beforeEach(() => sinon.restore());
  describe('If "Email" is an empty field', () => {
    it('should return 400 status', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: 'any_password' })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    })
  })

  describe('If "Password" is an empty field', () => {
    it('should return 400 status', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'any_email@mail.com' })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    })
  })

  describe('if the email provided isnt found in the database', () => {
    before(() => sinon.stub(Model, 'findOne').resolves(null))
    it('should return 401 status', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'any_email@mail.com', password: 'secret_admin' })
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
    })
  })

  describe('if the email is found but the password is wrong', () => {
    const user = { id: 1, username: 'any_user', email: 'email@mail.com', password: '123456' }
    before(() => sinon.stub(Model, 'findOne').resolves(user as User))
    // before(() => sinon.stub(AuthService.prototype, 'checkPassword').returns(false))
    it('should return 401 status', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'any_password' })
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
    })
  })

  describe('If email and password are correct', () => {
    const user = { id: 1, role: 'admin', username: 'admin', email: 'admin@admin.com', password: 'secret_admin' }
    before(() => sinon.stub(Model, 'findOne').resolves(user as User))
    // before(() => sinon.stub(AuthService.prototype, 'checkPassword' as keyof AuthService).returns(true))

    it('should return 200 status', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: "admin@admin.com", password: "secret_admin" })
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.have.key('token')
      expect(httpResponse.body.token).to.be.a('string')
    })
  })
})
