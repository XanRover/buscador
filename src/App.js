import { FaSearch } from "react-icons/fa";
import "./components/style.css";
import { useState } from "react";
import api from "./components/api";

function App() {
  const [input, setInput] = useState("");
  const [dados, setDados] = useState({});
  const [deleteData, setDeleteData] = useState({});

  async function heandleSearch() {
    try {
      const response = await api.get(`${input}/json`);
      setDados(response.data);
      console.log(response.data);
      setInput("");
    } catch {
      alert("Digite um cep valido");
      setInput("");
      setDados("");
    }
  }

  async function Delete() {
    try {
      setInput("");
      setDados(""); 
    } catch {}
  }

  return (
    <div className="containerAbba">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerbusc">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={heandleSearch}>
          <FaSearch size={25} color="#fff" />
        </button>
      </div>
      {Object.keys(dados).length > 0 && (
        <>
          <main>
            <h2>Cep: {dados.cep}</h2>
            <span>Rua: {dados.logradouro}</span>
            <span>Complemento: {dados.complemento}</span>
            <span>Bairro: {dados.bairro}</span>
            <span>
              Cidade/UF: {dados.localidade}/{dados.uf}
            </span>
          </main>
          <div className="delete">
            <button onClick={Delete}>Excluir</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
