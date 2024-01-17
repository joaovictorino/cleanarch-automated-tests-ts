export interface Repositorio<I, T>{
    buscar(campo: I): Promise<T | undefined>;
    adicionar(entidade: T): void;
}