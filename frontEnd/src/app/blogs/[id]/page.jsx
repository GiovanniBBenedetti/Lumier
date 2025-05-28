import { redirect } from "next/navigation";

export default async function DetalhesBlog({ params }) {
    const { id } = await params;
    const response = await fetch(`http://localhost:3200/blog/${id}`);

    if (!response.ok) {
        redirect("/not-found.jsx");
    }

    const data = await response.json();


    
  
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



  {/* 
          {audios[blog.id] ? (
            <audio controls src={audios[blog.id]} />
          ) : (
            <p>Gerando áudio...</p>
          )} */}
    return (
        <div className="container">
                    <h1>{data.titulo}</h1>
            <div className="container-imagem">

                <img className="" src={`http://localhost:3200${data.imagem1}`}/>
            </div>
            <div className="descricao">
                <p>{data.conteudo}</p>
            </div>

            <div className="comentarios">
                <h1>Comentarios do nossos alunos</h1>
                <input type="text" />
            </div>
        </div>
    );
}