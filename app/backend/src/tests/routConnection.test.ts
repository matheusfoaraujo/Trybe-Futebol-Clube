import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../app'

chai.use(chaiHttp)

describe('Route test', () => {
  describe('If the request is successful', () => {
    it('should return na 200 status', async () => {
      const httpResponse = await chai.request(app).get('/')
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal({ ok: true })
    })
  })
})
