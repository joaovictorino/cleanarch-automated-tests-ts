
  import React, { FormEvent, useState } from "react"
  import prisma from '../../../prisma/prisma';
  import { useRouter } from "next/router";

  export default function ContaEdit({conta}) {
    const [formState, setFormState] = useState(conta);
    const router = useRouter();

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      fetch(`/api/contas/${conta.id}`, {
        method: "PUT",
        body: JSON.stringify(formState)
      })
      .then((res) => {
        if (res.ok) {
          alert("Conta updated!");
          router.push(`/contas/${conta.id}`)
        }
      });
    }

    return (
      <>
        <header>
          <h1>Edit Conta</h1>
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
            <button type="submit" className="primary-btn">Update</button>
            <a href="/contas" className="secondary-btn">Return to contas list</a>
          </footer>
        </form>
      </>
    )
  }

  export async function getServerSideProps({ params }) {
    const conta = await prisma.conta.findUnique({
      where: { numero: params.id }
    });
    return { props: { conta } }
  }
  