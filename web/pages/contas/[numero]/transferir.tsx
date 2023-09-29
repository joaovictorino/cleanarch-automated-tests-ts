import React, { FormEvent, useState } from "react"
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ContaTransferir() {
  const [formState, setFormState] = useState({ origem: "", destino: "", valor: 0 })
  const router = useRouter();
  const { numero } = router.query;
  const { data, error } = useSWR(numero ? `/api/contas/${numero}` : null, fetcher);

  if (error) return <div>Falha ao carregar</div>
  if (!data) return <div>Carregando ...</div>

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    formState.origem = data.numero;
    fetch("/api/contas/transferir", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    })
    .then((res) => {
        if(res.ok)
            return res.json();
        else
            return undefined;
    })
    .then((data) => {
        if(data) {
            alert(`Recibo ${data.recibo}`)
            router.push("/contas")
        }
    });
  }

  return (
    <>
      <header>
        <h1>Transferir</h1>
      </header>
      <form onSubmit={handleSubmit}>
      <div className="card">
        <p><strong>De:</strong> {data.numero}</p>
        <div>
            <strong>Para:</strong>
            <input
                type="text"
                id="destino"
                maxLength={6}
                value={formState.destino}
                onChange={e => setFormState({ ...formState, destino: e.target.value })}
            />
        </div>
        <div>
            <strong>Valor (R$):</strong>
            <input
                type="text"
                id="valor"
                maxLength={6}
                value={formState.valor.toFixed(2)}
                onChange={e => setFormState({ ...formState, valor: Number(e.target.value) })}
            />
        </div>
      </div>
      <footer>
        <button type="submit" className="primary-btn">Salvar</button>
        <a href="/contas" className="secondary-btn">Retornar</a>
      </footer>
      </form>
    </>
  )
}
