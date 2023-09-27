export interface Repositorio<T, I>{
    buscar(campo: I): Promise<T | undefined>;
    adicionar(entidade: T): void;
}