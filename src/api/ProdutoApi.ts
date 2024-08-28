import { ProdutoModel } from "../model/ProdutoModel";

async function salvar(produtoModel: ProdutoModel): Promise<ProdutoModel> {
    return await fetch(`http://localhost:8080/api/produto`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(produtoModel),
    })
        .then((response) => response.json());
}

async function listar(): Promise<ProdutoModel[]> {
    return await fetch(`http://localhost:8080/api/produto`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.json());
}

async function buscarPorId(id: string): Promise<ProdutoModel> {
    return await fetch(`http://localhost:8080/api/produto/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.json());
}

async function excluir(id: number | null): Promise<ProdutoModel> {
    return await fetch(`http://localhost:8080/api/produto/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.json());
}

const produtoApi = {
    salvar,
    listar,
    buscarPorId,
    excluir
};

export default produtoApi;