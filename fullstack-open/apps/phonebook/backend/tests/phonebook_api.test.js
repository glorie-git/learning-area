const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)

test('phonebook is returned as json', async () => {
  await api
    .get('/api/phonebook')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are ten contacts', async () => {
  const response = await api.get('/api/phonebook')

  assert.strictEqual(response.body.length, 10)
})

test('the contact note is John Cena', async () => {
  const response = await api.get('/api/phonebook')

  const contents = response.body.map(e => e.content)
  console.log(response.body.map(e => e.content))
  // assert(contents.includes('HTML is easy'))
  assert.strictEqual(contents.includes('John Cena'), true)
})

after(async () => {
  await mongoose.connection.close()
})