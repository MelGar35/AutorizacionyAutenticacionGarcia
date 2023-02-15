import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import session from "express-session"
import {userModel} from "./models/users.models.js"
import viewsRoutes from "./routes/views.routes.js"
import sessionRoutes from "./routes/session.routes.js"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import MongoStore from "connect-mongo"
import path from "path"
import passport from "passport"
import initializePassport from "./config/passport.config.js"

const app = express()

//Server Config
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use( 
    session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://Meli:Melisa537@noeserver.c5gx1p7.mongodb.net/Login?retryWrites=true&w=majority",
        mongoOptions:{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        },
        ttl:60,
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
})
)


mongoose.set("strictQuery", false)
mongoose.connect("mongodb+srv://Meli:Melisa537@noeserver.c5gx1p7.mongodb.net/Login?retryWrites=true&w=majority")
.then(()=> console.log("Connected to Mongo Atlas"))

//Passport Config
initializePassport()
app.use(passport.initialize()) //inicializa passport
app.use(passport.session()) //maneja sesiones de passport

//Handlebars Config
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main'
  }))
  app.set('view engine', 'hbs');
  app.set('views', `${__dirname}/views`);

//Rutas  
  app.use("/", viewsRoutes);
  app.use("/session", sessionRoutes);
  app.use(express.static(path.join(__dirname, '/public')));
  
  app.listen(3000, () => console.log("Server running on port 3000"))
  
