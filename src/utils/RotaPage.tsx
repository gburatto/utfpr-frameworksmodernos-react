import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientePage from "../pages/ClientePage";
import ListaClientePage from "../pages/ListaClientePage";
import ProdutoPage from "../pages/ProdutoPage";
import ListaProdutoPage from "../pages/ListaProdutoPage";

const RotaPage: React.FC<{}> = ({}) => {

    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/cliente" element={<ClientePage />} />
            <Route path="/cliente/:idCliente" element={<ClientePage />} />
            <Route path="/lista-cliente" element={<ListaClientePage />} />
            <Route path="/produto" element={<ProdutoPage />} />
            <Route path="/produto/:idProduto" element={<ProdutoPage />} />
            <Route path="/lista-produto" element={<ListaProdutoPage />} />
          </Routes>
        </BrowserRouter>
      </>
    );
};

export default RotaPage;