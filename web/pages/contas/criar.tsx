import React, { FormEvent, useState } from "react"
import { useRouter } from "next/router";

export default function ContaCriar() {
  const [formState, setFormState] = useState({ numero: "",saldo: 0, })
  const router = useRouter();

  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch("/api/contas", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    });

    if (response.ok) {
      alert("Conta criada!");
      router.push("/contas");
    } else {
      const data = await response.json();
      alert(data.mensagem);
    }
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
