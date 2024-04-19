import { Router } from 'express'
import CountryController from './country.controller'

const CountryRouter = Router()

CountryRouter.get("/country/", CountryController.getCountries)
CountryRouter.get("/country/:id", CountryController.getCountry)
CountryRouter.post("/country", CountryController.createCountry)
CountryRouter.put("/country/:id", CountryController.updateCountry)
CountryRouter.delete("/country/:id", CountryController.deleteCountry)

export default CountryRouter
