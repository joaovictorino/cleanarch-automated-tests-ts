# language: pt
Funcionalidade: Transferir valores entre contas
    Validar a transferência de valores entre contas

    Cenário: Transferir valores com sucesso entre duas contas
        Dada conta "<origem>" com saldo <saldoOrigem> e a conta "<destino>" com saldo <saldoDestino>
        Quando a conta "<origem>" transferir <valor> para a conta "<destino>"
        Então o saldo da conta "<origem>" deve ser <resultadoOrigem> e a conta "<destino>" <resultadoDestino>

    Exemplos:
        | origem    | destino   | valor   | saldoOrigem | saldoDestino  | resultadoOrigem | resultadoDestino |
        | 987654    | 321654    | 1000.00 | 2000.00     | 100.00        | 1000.00         | 1100.00          |
        | 222222    | 555555    | 2500.00 | 20000.00    | 0.00          | 17500.00        | 2500.00          |