const { Pool } = require("pg");
const pool = new Pool({
 host: "localhost",
 user: "postgres",
 password: "Vanadi123",
 database: "likeme",
 allowExitOnIdle: true,
});
 

// metodo post

const agregarPosts = async (titulo, img, descripcion, likes ) => {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    const result = await pool.query(consulta, values);
    console.log("Post agregado");
   };

/* agregarPosts(); */


// metodo get 

const obtenerPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");
    console.log(rows);
    return rows;
   };
 /*   obtenerPosts(); */

// metodo put 


const modificarPosts = async (id) => {
    const consulta = "UPDATE posts SET like= like +1 WHERE id = $1";
    const values = [id];
    const result = await pool.query(consulta, values);
    const { rowCount } = await pool.query(consulta, values);
    if (rowCount === 0) {
      throw { code: 404, message: "No se consiguió ningún posts con este id" };
    }
  };



  // metodo delete


  const eliminarPosts = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    const result = await pool.query(consulta, values);
   };


   module.exports = {agregarPosts, obtenerPosts, modificarPosts, eliminarPosts}
