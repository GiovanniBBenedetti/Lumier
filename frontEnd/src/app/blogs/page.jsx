'use client'
import { useState, useEffect } from "react";
import Link from "next/link";



export default function Home() {
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3200/blog")
      .then((response) => response.json())
      .then(async (information) => {
        setBlogs(information);


      });
  }, []);



  return (
    <>
      {blogs.map((blog) => (
        <div className="noticia" key={blog.id}>
          <Link href={`blogs/${blog.id}`}>
            <h1>{blog.titulo}</h1>
            <p>{blog.data_publicacao}</p>
          </Link>
        </div>
      ))}
    </>
  );
}



return (
  <>

  </>
);

