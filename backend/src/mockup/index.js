import CountryRepository from '../repositories/country.js'
import CustomerRepository from '../repositories/customer.js'
import ProductRepository from '../repositories/product.js'
import UserRepository from '../repositories/user.js'

import countries from './countries.js'
import customers from './customers.js'
import users from './users.js'
import products from './products.js'
import vendors from './vendors.js'

const initProducts = async () => {
  try {
    console.log(`Init products`)

    let entries = await ProductRepository.find({})
    if (entries.items.length) {
      console.log(`=> products already exist`)
      return
    }

    for (let i = 0, leng = products.length; i < leng; i++) {
      await ProductRepository.create({ ...products[i] })
        .then((res) => console.log(`| create products [${i + 1}/${leng}] successful`))
        .catch((err) =>
          console.log(`| create products [${i + 1}/${leng}] failed with error: ${err.message}`),
        )
    }
  } catch (error) {
    console.log('initProducts error :>> ', error)
  }
}

const initCountries = async () => {
  try {
    console.log(`Init countries`)

    let entries = await CountryRepository.find({})
    if (entries.items.length) {
      console.log(`=> countries already exist`)
      return
    }

    for (let i = 0, leng = countries.length; i < leng; i++) {
      await CountryRepository.create(countries[i])
        .then((res) => console.log(`| create countries [${i + 1}/${leng}] successful`))
        .catch((err) =>
          console.log(`| create countries [${i + 1}/${leng}] failed with error: ${err.message}`),
        )
    }
  } catch (error) {
    console.log('initCountries error :>> ', error)
  }
}

const initCustomers = async () => {
  try {
    console.log(`Init customers`)

    let entries = await CustomerRepository.find({})
    if (entries.items.length) {
      console.log(`=> countries already exist`)
      return
    }

    let countriesRes = await CountryRepository.find({ limit: 100 })

    for (let i = 0, leng = customers.length; i < leng; i++) {
      let countryId = countriesRes.items[Math.floor(Math.random() * countriesRes.items.length)].id

      await CustomerRepository.create({ ...customers[i], countryId })
        .then((res) => console.log(`| create customers [${i + 1}/${leng}] successful`))
        .catch((err) =>
          console.log(`| create customers [${i + 1}/${leng}] failed with error: ${err.message}`),
        )
    }
  } catch (error) {
    console.log('initCustomers error :>> ', error)
  }
}

const initUsers = async () => {
  try {
    console.log(`Init users`)

    let entries = await UserRepository.find({})
    if (entries.items.length) {
      console.log(`=> users already exist`)
      return
    }

    let countriesRes = await CountryRepository.find({ limit: 100 })

    for (let i = 0, leng = users.length; i < leng; i++) {
      let countryId = countriesRes.items[Math.floor(Math.random() * countriesRes.items.length)].id

      await UserRepository.create({ ...users[i], countryId })
        .then((res) => console.log(`| create users [${i + 1}/${leng}] successful`))
        .catch((err) =>
          console.log(`| create users [${i + 1}/${leng}] failed with error: ${err.message}`),
        )
    }
  } catch (error) {
    console.log('initUsers error :>> ', error)
  }
}

const init = async () => {
  await initCountries()
  await initCustomers()
  await initUsers()
  await initProducts()
}

init()
