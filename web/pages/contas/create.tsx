
  import React, { FormEvent, useState } from "react"
  import { useRouter } from "next/router";

  export default function ContaCreate() {
    const [formState, setFormState] = useState({ numero: "",saldo: "", })
    const router = useRouter();

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      fetch("/api/contas", {
        method: "POST",
        body: JSON.stringify(formState)
      })
      .then((res) => {
        if (res.ok) {
          alert("Conta created!")
          router.push("/contas")
        }
      });
    }

    return (
      <>
        <header>
          <h1>Create Conta</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div>
        <label htmlFor="numero">Numero:</label>
        <input
          type="text"
          id="numero"
          value={formState.numero}
          onChange={e => setFormState({ ...formState, numero: e.target.value })}
        />
      </div><div>
        <label htmlFor="saldo">Saldo:</label>
        <input
          type="text"
          id="saldo"
          value={formState.saldo}
          onChange={e => setFormState({ ...formState, saldo: e.target.value })}
        />
      </div>
          <footer>
            <button type="submit" className="primary-btn">Create</button>
            <a href="/contas" className="secondary-btn">Return to contas list</a>
          </footer>
        </form>
      </>
    )
  }
  