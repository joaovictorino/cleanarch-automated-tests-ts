export interface Repositorio<T, I>{
    buscar(campo: I): T | undefined;
    adicionar(entidade: T): void;
}