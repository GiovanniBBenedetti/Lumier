'use client'
import { useState, useEffect } from "react";



export default function Home() {
  const [blogs, setBlogs] = useState([]);

  
  
  useEffect(() =>{
    fetch("http://localhost:3200/blog")
    .then((response) => response.json())
    .then((information) => {
      setBlogs(information);
    });
    
  }, [])


  

  

  return (
   <>




    {blogs.map((blog) => (

      <div className="noticia" key={blog.id}>
      <h1>{blog.titulo}</h1>
      <p>{blog.conteudo}</p>

      </div>
   
      

    ))}
   </>
  );
}



