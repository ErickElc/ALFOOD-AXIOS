import { Button, TextField, Typography, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";


function FormularioPratos(){
    const [nomePrato, setNomePrato] = useState('');
    const [descricaoPrato, setDescricaoPrato] = useState('');
    
    const [tag, setTag] = useState('');
    const [tagsPrato, setTagsPrato] = useState<ITag[]>([]);
    
    const [restaurante, setRestaurante] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    
    const [imagemPrato, setImagemPrato] = useState<File | null>(null);
    
    const parametros = useParams();

    function selecionarArquivo(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.files?.length){
            setImagemPrato(e.target.files[0])
        }
        else{
            setImagemPrato(null)
        }
    }

    useEffect(()=>{
        if(parametros.id){
            http.get<IPrato>(`/pratos/${parametros.id}/`)
            .then(res => {
                setNomePrato(res.data.nome)
                setDescricaoPrato(res.data.descricao)
            })
        } 
    },[parametros])
    useEffect(()=>{
        http.get<{tags: ITag[]}>('tags/') 
        .then(res =>{
            setTagsPrato(res.data.tags);
        })
        http.get<IRestaurante[]>('restaurantes/')
        .then(res => setRestaurantes(res.data))
    },[])
    const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log('Enviando dados para api!!');
    
        const formData = new FormData();
    
        formData.append('nome', nomePrato)
        formData.append('descricao', descricaoPrato)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante)
        if(imagemPrato){
            formData.append('imagem', imagemPrato)
        }
        http.request({
            url:'pratos/',
            method: 'POST',
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        .then(res => {
            alert('Prato Cadastrado com sucesso!');
            setDescricaoPrato('');
            setNomePrato('');
    
        })
        .catch(err => alert(`Erro no cadastro: ${err}`))
    }
    return(
        <>
            
            <Box>
                <Container maxWidth="lg" sx={{mt: 1}}>
                    <Box sx={{display: 'flex', flexDirection:"column", alignItems:"center", flexGrow: 1}}>
                        <Typography component="h1" variant="h6">Formulário de pratos</Typography>
                        <Box component="form" action="" sx={{width: "100%"}} onSubmit={aoSubmeterForm}>
                            <TextField 
                                id="standard-basic" 
                                value={nomePrato} 
                                onChange={e => setNomePrato(e.target.value)
                                }
                                label="Nome do Prato" 
                                variant="standard" 
                                fullWidth
                                required
                                margin="dense"
                            />
                            <TextField 
                                id="standard-basic" 
                                value={descricaoPrato} 
                                onChange={e => setDescricaoPrato(e.target.value)}
                                label="Descrição do Prato" 
                                variant="standard" 
                                fullWidth
                                required
                                margin="dense"
                            />
                            <FormControl margin="dense" fullWidth>
                                <InputLabel id='select-tag'>Tag</InputLabel>
                                <Select labelId="select-tag" value={tag} onChange={e => setTag(e.target.value)}>
                                    {tagsPrato.map(tag => 
                                        <MenuItem value={tag.value} key={tag.id}>
                                            {tag.value}
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl margin="dense" fullWidth>
                                <InputLabel id='select-restaurante'>Restaurante</InputLabel>
                                <Select labelId="select-restaurante" value={restaurante} onChange={e => setRestaurante(e.target.value)}>
                                    {restaurantes.map(rest => 
                                        <MenuItem value={rest.id} key={rest.id}>
                                            {rest.nome}
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <input type='file' onChange={selecionarArquivo}/>
                            <Button sx={{marginTop: 1}}type="submit" variant="outlined" fullWidth>Salvar</Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}
  
export default FormularioPratos;