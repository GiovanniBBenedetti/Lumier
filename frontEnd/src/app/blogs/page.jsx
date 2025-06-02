'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import './blogs.css'


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
      <div className="container blogs">
        {blogs.map((blog) => (
          <div className="" key={blog.id}>
            <Link href={`blogs/${blog.id}`}>
              <h1>{blog.titulo}</h1>
              <p>
                {new Date(blog.data_publicacao).toLocaleString("pt-BR")}
              </p>

            </Link>
          </div>
        ))}
      </div>
    </>
  );
}





