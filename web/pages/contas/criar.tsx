import React, { FormEvent, useState } from "react"
import { useRouter } from "next/router";

export default function ContaCriar() {
  const [formState, setFormState] = useState({ numero: "",saldo: 0, })
  const router = useRouter();

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("/api/contas", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    })
    .then((res) => {
      if (res.ok) {
        alert("Conta criada!")
        router.push("/contas")
      }
    });
  }

  return (
    <>
      <header>
        <h1>Cadastrar Conta</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numero">Número:</label>
          <input
            type="text"
            id="numero"
            maxLength={6}
            value={formState.numero}
            onChange={e => setFormState({ ...formState, numero: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="saldo">Saldo (R$):</label>
          <input
            type="text"
            id="saldo"
            value={formState.saldo.toFixed(2)}
            onChange={e => setFormState({ ...formState, saldo: Number(e.target.value) })}
          />
        </div>
        <footer>
          <button type="submit" className="primary-btn">Salvar</button>
          <a href="/contas" className="secondary-btn">Retornar</a>
        </footer>
      </form>
    </>
  )
}
