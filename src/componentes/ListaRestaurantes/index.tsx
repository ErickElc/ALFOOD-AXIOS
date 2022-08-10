import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';
import axios from 'axios';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  
  const [proximaPagina, setProximaPagina] = useState('');
  useEffect(()=>{
      axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(
        res => { 
          setRestaurantes(res.data.results);
          setProximaPagina(res.data.next);
        }
      )
      .catch(err => {
        console.log(err)
      })
  },[])

  function verMais(){
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
    .then(
      res => { 
        setRestaurantes([...restaurantes, ...res.data.results]);
        setProximaPagina(res.data.next);
      }
    )
    .catch(err => {
      console.log(err)
    })
    
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <div>
      {restaurantes?.map(item  =>
        <Restaurante restaurante={item} key={item.id} />
      )}
    </div>
    {proximaPagina && <button onClick={verMais}>
      Ver mais
    </button>}
  </section>)
}

export default ListaRestaurantes;