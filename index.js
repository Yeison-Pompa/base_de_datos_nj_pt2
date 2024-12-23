const express = require("express");
const cors = require("cors");
const { agregarPosts, obtenerPosts, modificarPosts, eliminarPosts } = require("./consultas.js");

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3000, console.log("¡Servidor encendido!"));

// metodo get

app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
    
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
 
});


// metodo post

app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion, likes } = req.body;
    await agregarPosts(titulo, img, descripcion, likes);
    res.send("Posts generado correctamente");
    
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
 
});


//metodo put 

app.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo } = req.body;
    await modificarPosts(id);
    res.status(200).send("Posts modificado con éxito");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});


// metodo delete 

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarPosts(id);
    res.send("Cliente eliminado con éxito");
    
  } catch ({ code, message }) {
    res.status(code).send(message);
  }

});
