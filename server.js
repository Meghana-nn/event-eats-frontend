require('dotenv').config()
const express = require('express')
const {checkSchema} = require('express-validator')
const multer=require('multer')

const cors = require('cors')
const app = express()
const port = process.env.PORT || 3099



const usersCtrl = require('./app/controllers/users-controllers');
const catererCtrl = require('./app/controllers/caterer-controller')
const menuCtrl=require('./app/controllers/menuItem-controllers')
const enquiryCltr=require('./app/controllers/enquiry-controllers')
const eventsCtrl=require('./app/controllers/events-controllers')
const menuCartCtrl=require('./app/controllers/menuCart-controllers')

const {userRegisterSchema, userLoginSchema} = require('./app/validations/user-validation')
const catererValidationSchema = require('./app/validations/caterer-validation')
const { authenticateUser, authorizeUser } = require('./app/middlewares/auth')
const  enquiryValidationSchema=require('./app/validations/enquiry-validation')
const menuCartValidation=require('./app/validations/menuCart-validation')


const configureDB = require('./config/db')
configureDB()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './images');
    },
    filename: function (req, file, cb) {
     return  cb(null, Date.now() + '-' + file.originalname);
    }
  })
  const upload = multer({storage});


app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))




//user
app.post('/api/users/register',checkSchema(userRegisterSchema), usersCtrl.register)
app.post('/api/users/login', checkSchema(userLoginSchema), usersCtrl.login)
app.get('/api/users/account', authenticateUser, usersCtrl.account)
app.get('/api/users', usersCtrl.list)


//Caterer
app.post('/api/caterers', authenticateUser, authorizeUser(['caterer']), checkSchema(catererValidationSchema), catererCtrl.createCatererService)
app.put('/api/caterers/verify/:id', authenticateUser, authorizeUser(['admin']), checkSchema(catererValidationSchema), catererCtrl.verify)
app.get('/api/caterers', checkSchema(catererValidationSchema), catererCtrl.catererItems)
app.put('/api/caterers/:id', checkSchema(catererValidationSchema), catererCtrl.updateCaterer)
app.delete('/api/caterers/:id', checkSchema(catererValidationSchema), catererCtrl.deleteCaterer)

//menuItem
app.post('/api/menuItem/upload', authenticateUser, authorizeUser(['caterer']), upload.single('itemImage'),menuCtrl.create)
app.post('/api/menuItem/upload',upload.array('itemImage',4), menuCtrl.create)


//enquiry
app.post('/api/customers/enquiry',checkSchema(enquiryValidationSchema),enquiryCltr.create)
app.put('/api/customers/enquiry/:id',checkSchema(enquiryValidationSchema),enquiryCltr.update)
app.get('/api/customers/enquiry',checkSchema(enquiryValidationSchema),enquiryCltr.list)
app.delete('/api/customers/enquiry/:id',checkSchema(enquiryValidationSchema),enquiryCltr.delete)

//response
app.put('/api/customers/enquiry/:id',checkSchema(enquiryValidationSchema),enquiryCltr.response)


//event
app.post('/api/events/:catererId', authenticateUser, authorizeUser(['customer']), eventsCtrl.create)

 //menu cart item
app.post('/api/carts',checkSchema(menuCartValidation),menuCartCtrl.create)
app.put('/api/carts',checkSchema(menuCartValidation),menuCartCtrl.update)
app.delete('/api/carts',checkSchema(menuCartValidation),menuCartCtrl.remove)



app.listen(port, () => {
    console.log('server running on port', port)
})
