import {fileURLToPath} from 'url'
import {dirname} from 'path'
import bcrypt from "bcrypt"

//Hash Password usamos fc sincrona
export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//Comparar pass hasheado para ver que sea correcto
export const comparePassword = (user, password) => bcrypt.compareSync(password, user.password)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export default __dirname
