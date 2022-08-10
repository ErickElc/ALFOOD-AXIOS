import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button} from "@mui/material";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
function AdminPratos(){
    
    const [pratos,  setPratos] = useState<IPrato[]>([]);
    useEffect(()=>{
        http.get('/pratos/')
        .then(res => setPratos(res.data))
    }, [])
    function ExcluirPratos(AhSerExcluido: IPrato){
        http.delete(`/pratos/${AhSerExcluido.id}/`)
        .then(()=>{
            const listaPratos = pratos.filter(prato => prato.id !== AhSerExcluido.id);
            setPratos([...listaPratos])
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
                            Descrição
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Restaurante
                        </TableCell>
                        <TableCell>
                            Imagem
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
                    {pratos.map( prato =>
                        <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                {prato.descricao}
                            </TableCell>
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                {prato.restaurante}
                            </TableCell>
                            <TableCell>
                                [<a href={prato.imagem} target='blank'rel="noreferrer">Ver imgaem</a>]
                            </TableCell>
                            <TableCell>
                                [<Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={ () => {ExcluirPratos(prato) }}>
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

export default AdminPratos;