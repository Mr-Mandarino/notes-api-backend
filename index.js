// con COMMON JS ↓

// const http = require('http') 

//  con EMASCRIPTS modules ↓

// import http from 'http' 

// con Express ↓

// const { response } = require('express')
const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
// nos habilita cualquier origen
app.use(express.json())
// modulo de express para trabajar con datos tipo json
app.use(logger) 
  



let notes = [
  {
  id: 1,
  content: 'HTML is easy',
  date: '2019-05-30T17:30:31.098Z',
  important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  },
]
//-------------levantar servidor con http.createServer

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'aplication/json' })
//   response.end(JSON.stringify(notes))
// })
//-------------------APP
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log({id})
  const note = notes.find(note => note.id === id)
  if(note){
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log({id})
  const note = notes.filter(note => note.id != id)
  if(note){
    res.json(note)
  } else {
    res.status(204).end()
  }
})

app.post('/api/notes',(req, res)  => {
  const note = req.body
  if(!note || !note.content){
    return res.status(400).json({
        error:'note.content is missing'
      })
  }

  // generando ids ↓
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  // creando el obj note
  const newNote = {
    id: maxId + 1,
    content: note.content,
    importat: typeof  note.important != 'undefined' ? note.important : false,
    date: new Date().toISOString()

  }
  notes = [...notes, newNote]
  // actualizando el array con la nueva nota
res.status(201).json(newNote)
})

app.use((req, res)=>{
res.status(404).json({
  error: 'not found'
})
})

// con node ↓

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

// con Express ↓ es asincróno por eso hay una latencia y el console.lo va dentro de una func

const PORT = 3001
app.listen(PORT,() =>{
console.log(`Server running on port ${PORT}`)
})