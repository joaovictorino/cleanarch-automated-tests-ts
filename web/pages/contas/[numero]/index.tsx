import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ContaDetalhar() {
  const router = useRouter();
  const { numero } = router.query;
  const { data, error } = useSWR(numero ? `/api/contas/${numero}` : null, fetcher);

  if (error) return <div>Falha ao carregar</div>
  if (!data) return <div>Carregando ...</div>

  return (
    <>
      <header>
        <h1>Conta</h1>
      </header>
      <div className="card">
        <p><strong>Número:</strong> {data.numero}</p><p><strong>Saldo:</strong>R$ {data.saldo.toFixed(2)}</p>
      </div>
      <footer>
        <a href="/contas" className="secondary-btn">Retornar</a>
      </footer>
    </>
  )
}
