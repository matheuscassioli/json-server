import "./App.css"
import { useEffect, useState, useRef } from "react"
import ReactLoading from 'react-loading';
import { captureList, handleAlert } from "../helper/helperFunctions";
import { PiSmileySadThin } from "react-icons/pi";
import { GrFormClose } from "react-icons/gr";
import RodapeList from "./components/RodapeList/RodapeList";
import Form from "./components/Form/Form";

function App() {
  const apiUrl = "https://json-server-matheus.s3.sa-east-1.amazonaws.com/database.json"
  const [data, setData] = useState('')
  const [item, setItem] = useState('')
  const [valor, setValor] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadingUpper, setLoadingUpper] = useState(false)
  const refList = useRef(null)
  const regexNumbers = /[0-9]/;

  useEffect(() => {
    requestItensAPI()
  }, [])

  const requestItensAPI = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Erro ao carregar os dados da API');
      }
      const jsonData = await response.json();
      setData(jsonData)

      setTimeout(() => {
        setLoading(false)
      }, 1500)

    } catch (error) {
      alert('Erro ao carregar os dados da API:', error);
    }
  };

  const sendItem = async e => {
    e.preventDefault(e)
    setLoadingUpper(true)
    captureList(e, true)

    let obj = {
      item,
      valor
    }

    if (data.some(existingItem => existingItem.item === item)) {
      setLoadingUpper(false)
      handleAlert('Este item já está na lista.');
      captureList(e, false)
      return;
    }

    if (!item || !valor || regexNumbers.test(item)) {
      setLoadingUpper(false)
      handleAlert('Não podemos incluir itens com campos vazios ou contendo números.')
      captureList(e, false)
      return;
    }

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })

    let newObj = await res.json()

    setData((previousState) => [...previousState, newObj])
    setTimeout(() => {
      setValor('')
      setItem('')
      document.querySelector('#item-input').focus();
      setLoadingUpper(false)
      captureList(e, false)
      refList.current.scrollTop = refList.current.scrollHeight
    }, 1000)
  }

  const removeItem = async (e, id) => {
    e.preventDefault(e)
    const res = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    let newObj = await res.json()

    let newArray = []
    Object.keys(data).map(item => {
      if (data[item].id != newObj.id) {
        newArray.push(data[item])
      }
    })
    setData(newArray)
  }

  return (
    < div className='box-content' >

      <Form className="box-content__form" loading={(loading || loadingUpper)} item={item} valor={valor} sendItem={sendItem} setItem={setItem} setValor={setValor} />

      <hr className="box-content__line" />

      <h2 className="box-content__title">Lista mercado mensal</h2>

      <ul className="box-content__list" ref={refList}>

        {(loading || loadingUpper) && <ReactLoading type={"spin"} color={"#fff"} className="box-content__loading" height={45} width={45} />}

        {!loading && data.length > 0 && Object.keys(data).map(item =>
          <li className="box-content__list-item" key={data[item].id}>
            <span className="bold">Item:</span> {data[item].item} - <span className="bold"> Valor:</span> {data[item].valor}
            <button className="box-content__list-button" onClick={(e) => removeItem(e, data[item].id)}><GrFormClose size={18} /></button>
          </li>
        )}

        {!loading && data.length == 0 && <div className="box-content__void-list">Não há itens <PiSmileySadThin size={24} /></div>}
      </ul>

      <RodapeList data={data} className="box-content__list-rodape" />
    </div>
  )
}

export default App
