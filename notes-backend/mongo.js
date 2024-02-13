const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as a argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://stone:${password}@cluster0.opxsuzi.mongodb.net/?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = mongoose.model('Note', noteSchema)


Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})