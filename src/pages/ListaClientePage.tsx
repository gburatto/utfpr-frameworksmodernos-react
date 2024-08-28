import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import clienteApi from "../api/ClienteApi";
import { ClienteModel } from "../model/ClienteModel";
import { useNavigate } from "react-router-dom";
import AlertPage from "../utils/AlertPage";

const ListaClientePage: React.FC<{}> = ({}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [clientes, setClientes] = useState<ClienteModel[]>([]);

    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [showMessage, setShowMessage] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        clienteApi.listar().then(result => {
            setClientes(result);
            setIsLoading(false);
        }, error => {
            console.log(error);
            setIsLoading(false);
            setMessage('Não foi possível carregar a lista de clientes.');
            setVariant('danger');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        });
    }, []);

    const carregarCliente = (id: number | null) => {
        console.log(id);
        navigate(`/cliente/${id}`);
    }

    const excluirCliente = (id: number | null) => {
        clienteApi.excluir(id).then(() => {
            setClientes(clientes.filter(cliente => cliente.id !== id));
            setMessage('Cliente excluído com sucesso.');
            setVariant('success');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }).catch(error => {
            console.log(error);
            setMessage('Não foi possível excluir o cliente.');
            setVariant('danger');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        });
    }

    return (
      <>
        <h2>Lista de Clientes</h2>
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
                <th>E-mail</th>
                <th>Hobbies</th>
                <th></th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {clientes.map((cliente, key) => {
                    return (
                        <>
                            <tr key={key}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.hobbies}</td>
                                <td><Button variant="secondary" onClick={() => {
                                    carregarCliente(cliente.id);
                                }}>Carregar</Button>{' '}</td>
                                <td><Button variant="danger" onClick={() => {
                                    excluirCliente(cliente.id);
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

export default ListaClientePage;