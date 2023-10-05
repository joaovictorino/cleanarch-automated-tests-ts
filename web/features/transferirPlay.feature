# language: pt
Funcionalidade: Transferir valores entre contas
    Validar a transferência de valores entre contas

    Cenário: Transferir valores com sucesso entre duas contas
        Dada conta web "<origem>" com saldo <saldoOrigem> e a conta web "<destino>" com saldo <saldoDestino>
        Quando a conta web "<origem>" transferir <valor> para a conta web "<destino>"
        Então o saldo da conta web "<origem>" deve ser <resultadoOrigem> e a conta web "<destino>" <resultadoDestino>

    Exemplos:
        | origem    | destino   | valor   | saldoOrigem | saldoDestino | resultadoOrigem | resultadoDestino |
        | 111111    | 333333    | 5000.00 | 10000.00    | 5000.00      | 5000.00         | 10000.00         |
        | 666666    | 999999    | 500.00  | 700.00      | 200.00       | 200.00          | 700.00           |