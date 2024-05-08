import "./Form.css"
import React from 'react'
import ReactLoading from 'react-loading';

const Form = ({ sendItem, setItem, setValor, className, item, valor, loading }) => {

    const clearInputs = e => {
        e.preventDefault(e)
        setItem('')
        setValor('')
    }

    return (
        <form onSubmit={sendItem} className={className}>
            <h2>Adicionar item</h2>

            <label>
                Item:
                <input type="text" id="item-input" value={item} onChange={(e) => setItem(e.target.value)} />
            </label>

            <label>
                Valor:
                <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
            </label>

            <div className='box-form__buttons'>
                <button className='box-form__button' disabled={loading}>{loading ? <ReactLoading type={"spin"} color={"#fff"} height={12} width={12} /> : "Enviar item"}</button>
                <button className='box-form__button-clear' disabled={loading} onClick={(e) => clearInputs(e)}>Limpar</button>
            </div>
        </form>
    )
}

export default Form
