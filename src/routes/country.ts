import { Router } from 'express'
import countryController from '../controllers/country'

const countryRouter = Router()

countryRouter.get("/", countryController.getCountries)
countryRouter.get("/:id", countryController.getCountry)
countryRouter.post("/", countryController.createCountry)
countryRouter.put("/:id", countryController.updateCountry)
countryRouter.delete("/:id", countryController.deleteCountry)

export default countryRouter