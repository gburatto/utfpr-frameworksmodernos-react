import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import produtoApi from "../api/ProdutoApi";
import { InputGroup } from "react-bootstrap";
import AlertPage from "../utils/AlertPage";
import { Params, useParams } from "react-router-dom";

const ProdutoPage: React.FC<{}> = ({}) => {
    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState(0);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(true);

    const { idProduto } = useParams<Params>();

    if (idProduto !== undefined) {
      produtoApi.buscarPorId(idProduto).then(produto => {
          setId(id);
          setNome(produto.nome);
          setDescricao(produto.descricao);
          setPreco(produto.preco);
      });
  }

    const salvarProduto = () => {
        console.log('Clicou na função salvar');

        let produtoModel = {
            id: id,
            nome: nome,
            descricao: descricao,
            preco: preco
        }

        setIsLoading(true);
        produtoApi.salvar(produtoModel).then(retorno => {
            console.log(retorno);
            setMessage('Cadastro realizado com sucesso.');
            setVariant('success');
            setIsLoading(false);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }, error => {
            console.log(error);
            setMessage('Não foi possível realizar o cadastro.');
            setVariant('danger');
            setIsLoading(false);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        });
    }

    return (
      <>
        <h2>Cadastro de Produtos</h2>

        <AlertPage message={message} variant={variant} show={showMessage}></AlertPage>

        <Form>
          <Form.Group className="mb-3" controlId="produtoPage.nome">
            <Form.Label>Nome:</Form.Label>
            <Form.Control value={nome} onChange={(e) => setNome(e.target.value)} type="text" placeholder="Digite o nome do produto" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="produtoPage.descricao">
            <Form.Label>Descrição:</Form.Label>
            <Form.Control value={descricao} onChange={(e) => setDescricao(e.target.value)} type="email" placeholder="Digite a descrição do produto" />
          </Form.Group>
          <Form.Label>Preço:</Form.Label>
          <Form.Group controlId="produtoPage.preco">
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
                <Form.Control  value={preco} onChange={(e) => setPreco(parseFloat(e.target.value))} type="number" min="0" step="0.01"/>
            </InputGroup>
          </Form.Group>
          <Button variant="primary" disabled={isLoading} onClick={salvarProduto}>Salvar</Button>{' '}

          {isLoading ? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            null
          )}
        </Form>
      </>
    );
};

export default ProdutoPage;