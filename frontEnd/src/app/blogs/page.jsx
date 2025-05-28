'use client'
import { useState, useEffect } from "react";

const SPEECH_KEY = '2YI3tOnlgZnbjsOWHlJz6KToPzpU5Q9ZXxNe1rZjr8gjGg340Y5IJQQJ99BEACYeBjFXJ3w3AAAYACOGAfxi';
const SPEECH_REGION = 'eastus';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [audios, setAudios] = useState({});

  useEffect(() => {
    fetch("http://localhost:3200/blog")
      .then((response) => response.json())
      .then(async (information) => {
        setBlogs(information);


        // const novosAudios = {};
        // for (const blog of information) {
        //   try {
        //     const url = await textoParaAudio(blog.conteudo);
        //     novosAudios[blog.id] = url;
        //   } catch (error) {
        //     console.error("Erro ao gerar áudio:", error.message);
        //   }
        // }
        // setAudios(novosAudios);
      });
  }, []);

  // async function textoParaAudio(texto) {
  //   const url = `https://${SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;

  //   const data = `
  //     <speak version='1.0' xml:lang='pt-BR'>
  //       <voice xml:lang='pt-BR' name='pt-BR-FranciscaNeural'>
  //         ${texto}
  //       </voice>
  //     </speak>
  //   `;

  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Ocp-Apim-Subscription-Key': SPEECH_KEY,
  //       'Content-Type': 'application/ssml+xml',
  //       'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3'
  //     },
  //     body: data
  //   });



  //   const blob = await response.blob();
  //   return URL.createObjectURL(blob);
  // }

  return (
    <>
      {blogs.map((blog) => (
        <div className="noticia" key={blog.id}>
          <h1>{blog.titulo}</h1>
          <p>{blog.conteudo}</p>
{/* 
          {audios[blog.id] ? (
            <audio controls src={audios[blog.id]} />
          ) : (
            <p>Gerando áudio...</p>
          )} */}
        </div>
      ))}
    </>
  );
}
