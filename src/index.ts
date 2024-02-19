// importar express
import express from 'express'
import con from './utils/db'
import mongoose from 'mongoose'
import jwt, { Jwt, decode } from 'jsonwebtoken'
import cors from 'cors'
import dotenv from 'dotenv'
import mainRouter from './routes'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

// crear aplicacion de express
let app = express()

// anadir funcionalidad a express
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:4200'
}))

// anadir routers externos
app.use("/api", mainRouter)





app.post("/api/login", (req: express.Request, res: express.Response) => {
    let { username, password } = req.body


})

app.get("/api/users", (req: express.Request, res: express.Response) => {
    let token = req.body.token

    if(token) {
        try {
            jwt.verify(token, process.env.TOKEN_SECRET ?? "")

            con.query(`select * from sec_users`, (err, result) => {
                if(err) throw err

                return res.send({
                    status: "success",
                    users: result
                })
            })
        } catch (e) {
            return res.send({
                status: "failed",
                message: "No estas autenticado para hacer esta peticion"
            })
        }

    } else {
        return res.send({
            status: "failed",
            message: "No se ha encontrado el token de autenticacion"
        })
    }

})

app.post("/api/validate", (req: express.Request, res: express.Response) => {
    let token = req.body.token

    if(token) {
        try {
            let result = jwt.verify(token, process.env.TOKEN_SECRET ?? "")

            return res.send({
                status: "success",
                message: "The token is valid",
                data: result
            })

        } catch (e) {
            return res.status(401).send({
                status: "failed",
                message: "No estas autenticado para hacer esta peticion"
            })
        }

    } else {
        return res.status(401).send({
            status: "failed",
            message: "No se ha encontrado el token de autenticacion"
        })
    }

})

app.post("/api/refresh_token", (req: express.Request, res: express.Response) => {
    let token = req.body.token as string
    let refresh_token = req.body.refresh_token as string

    let decoded_token = jwt.decode(token, {
        complete: true
    }) as any
    let decoded_refresh_token = jwt.decode(refresh_token, {
        complete: true
    }) as any

    console.log('tokendecode: ', decoded_token)
    console.log('refreshtokendecode: ', decoded_refresh_token)

    if(decoded_token?.payload.hash === decoded_refresh_token?.payload.hash) {
        let token = jwt.sign({
            id_user: decoded_token.payload.id_user,
            email: decoded_token.payload.email,
            login: decoded_token.payload.login,
            hash: process.env.TOKEN_SECRET
        }, process.env.TOKEN_SECRET ?? "", {
            expiresIn: '15s'
        })

        let refresh_token = jwt.sign({
            id_user: decoded_token.payload.id_user,
            type: 'refresh',
            hash: process.env.TOKEN_SECRET
        }, process.env.TOKEN_SECRET ?? "", {
            expiresIn: '7d'
        })

        return res.send({
            status: 'success',
            token: token,
            refresh_token: refresh_token
        })
    } else {
        return res.send({
            status: 'failed',
            message: 'The refresh token is invalid'
        })
    }

})

mongoose
    .connect("mongodb+srv://admin:admin@cluster0.d0zjd.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Mongo DB Connected")
        app.listen(4040, () => {
            console.log("Api corriendo en: http://localhost:4040")
        })
    })
    .catch((e) => {
        console.log("Error: ", e)
    })