import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AlertPage from "../utils/AlertPage";
import { ProdutoModel } from "../model/ProdutoModel";
import produtoApi from "../api/ProdutoApi";

const ListaProdutoPage: React.FC<{}> = ({}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [produtos, setProdutos] = useState<ProdutoModel[]>([]);

    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showMessage, setShowMessage] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        produtoApi.listar().then(result => {
            setProdutos(result);
            setIsLoading(false);
        }, error => {
            console.log(error);
            setIsLoading(false);
            setMessage('Não foi possível carregar a lista de produtos.');
            setVariant('danger');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        });
    }, []);

    const carregarProduto = (id: number | null) => {
        console.log(id);
        navigate(`/produto/${id}`);
    }

    const excluirProduto = (id: number | null) => {
        produtoApi.excluir(id).then(() => {
            setProdutos(produtos.filter(produto => produto.id !== id));
            setMessage('Produto excluído com sucesso.');
            setVariant('success');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }).catch(error => {
            console.log(error);
            setMessage('Não foi possível excluir o produto.');
            setVariant('danger');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        });
    }

    return (
      <>
        <h2>Lista de Produtos</h2>
        {isLoading ? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            null
        )}

        <AlertPage message={message} variant={variant} show={showMessage}></AlertPage>

        <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th></th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {produtos.map((produto, key) => {
                    return (
                        <>
                            <tr key={key}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.descricao}</td>
                                <td>R$ {produto.preco.toFixed(2)}</td>
                                <td><Button variant="secondary" onClick={() => {
                                    carregarProduto(produto.id);
                                }}>Carregar</Button>{' '}</td>
                                <td><Button variant="danger" onClick={() => {
                                    excluirProduto(produto.id);
                                }}>Excluir</Button>{' '}</td>
                            </tr>
                        </>
                    )
                })}
            </tbody>
        </Table>
      </>
    );
};

export default ListaProdutoPage;