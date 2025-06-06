'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import './blogs.css';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3200/blog")
      .then((response) => response.json())
      .then((information) => {
        setBlogs(information);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={blog.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <Link href={`blogs/${blog.id}`} className="text-decoration-none text-dark">
                  <h5 className="card-title">{blog.titulo}</h5>
                  <p className="card-text text-muted">
                    Publicado em:{" "}
                    {new Date(blog.data_publicacao).toLocaleString("pt-BR")}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
