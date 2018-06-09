const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use( bodyParser.json() )
app.use(cors())


let animals = [
    {
      name: 'Armadillo',
      id: '1',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Nine-banded_Armadillo.jpg/1200px-Nine-banded_Armadillo.jpg',
      description: ''
    },
    {
      name: 'Tiger',
      id: '2',
      imageUrl: 'http://kids.sandiegozoo.org/sites/default/files/2017-06/animal-hero-tiger_0.jpg',
      description: ''
    }
  ]
  let id = ''

//ENDPOINTS

app.get('/api/animals', (req, res) => {
    res.send(animals)
})

app.post('/api/animals', (req, res) => {
    let newAnimal = {
        id: id,
        name: req.body.name,
        imageUrl: req.body.imageUrl
    }
    animals.push( newAnimal )
    id++
    res.send( animals )
})

app.put('/api/animals/:id/', (req, res) => {
    console.log('req.body: ', req.body)
    for(var i=0; i<animals.length; i++) {
       if(animals[i].id === req.params.id) {
           animals[i].description = req.body.description
       } 
    }
    res.send( animals )
})

app.delete('/api/animals/:id', (req, res) => {
    for(var i=0; i<animals.length; i++) {
        if(animals[i].id === req.params.id) {
            index = i
        }
    }
    animals.splice(index, 1)
    res.send( animals )
})

  const port = 4000
  app.listen( port, () => { console.log(`listening on port ${port}`)})
