import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button} from "@mui/material";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";




function AdminRestaurantes(){
    
    const [restaurantes,  setRestaurantes] = useState<IRestaurante[]>([]);
    useEffect(()=>{
        http.get('/restaurantes/')
        .then(res => setRestaurantes(res.data))
    }, [])
    function ExcluirRestaurantes(AhSerExcluido: IRestaurante){
        http.delete(`/restaurantes/${AhSerExcluido.id}/`)
        .then(()=>{
            const listaRestaurantes = restaurantes.filter(rest => rest.id !== AhSerExcluido.id);
            setRestaurantes([...listaRestaurantes])
        })
    }
    return(
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map( resta =>
                        <TableRow key={resta.id}>
                            <TableCell>
                                {resta.nome}
                            </TableCell>
                            <TableCell>
                                [<Link to={`/admin/restaurantes/${resta.id}`}>Editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={ () => {ExcluirRestaurantes(resta) }}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow> 
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminRestaurantes