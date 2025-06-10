'use client';

import { useEffect, useState } from 'react';
import Loading from '@/components/loader/loader';

export default function Usuario() {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');




        const buscarUsuario = async () => {
            try {
                const resposta = await fetch('http://localhost:3200/usuario', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!resposta.ok) {
                    throw new Error('Erro ao buscar dados do usuário');
                }

                const dados = await resposta.json();
                setUsuario(dados);
                console.log(resposta)

            } catch (err) {
                setErro(err.message);
            } finally {
                setCarregando(false);
            }
        };

        buscarUsuario();
    }, []);

    if (carregando) {
        return <Loading></Loading>
    }

    if (erro) {
        return <div className="container mt-5 text-danger">Erro: {erro}</div>;
    }

    return (
        <>   <div className="container mt-5">
            <h2>Informações do Usuário</h2>
            <div className="card p-4 shadow-sm mt-3" style={{ maxWidth: '500px' }}>
                {usuario.fotoPerfil && (
                    <img
                        src={usuario.fotoPerfil}
                        alt="Foto de perfil"
                        className="img-fluid rounded-circle mb-3"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                )}
                <h4>Nome: {usuario.nome}</h4>
                <p>Email: {usuario.email}</p>
                <p>Tipo: {usuario.tipo}</p>
            </div>
        </div></>
    );
}
