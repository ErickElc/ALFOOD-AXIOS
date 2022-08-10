import { Button, TextField, Typography, Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";


function FormularioRestaurantes(){
    const parametros = useParams();
    useEffect(()=>{
        if(parametros.id){
            http.get<IRestaurante>(`/restaurantes/${parametros.id}/`)
            .then(res => setNomeRestaurante(res.data.nome))
        } 
    },[parametros])
    const [nomeRestaurante, setNomeRestaurante] = useState('');
    
    const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log('Enviando dados para api!!');
        if(parametros.id){
            http.put(`/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            }).then(()=>{
                alert("Restaurante Atualizado com sucesso!")
            })
        }
        else{
            http.post('/restaurantes/',{
                nome: nomeRestaurante
            })
            .then(()=>{
                alert("Restaurante cadastrado com sucesso!")
            })
        }
        setNomeRestaurante('');
    }
    return(
        <>
            
            <Box>
                <Container maxWidth="lg" sx={{mt: 1}}>
                    <Box sx={{display: 'flex', flexDirection:"column", alignItems:"center", flexGrow: 1}}>
                        <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                        <Box component="form" action="" sx={{width: "100%"}} onSubmit={aoSubmeterForm}>
                            <TextField 
                                id="standard-basic" 
                                value={nomeRestaurante} 
                                onChange={e => setNomeRestaurante(e.target.value)}
                                label="Nome do Restaurante" 
                                variant="standard" 
                                fullWidth
                                required
                            />
                            <Button sx={{marginTop: 1}}type="submit" variant="outlined" fullWidth>Salvar</Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}


export default FormularioRestaurantes;