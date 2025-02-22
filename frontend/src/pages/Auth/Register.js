import "./Auth.css";

// Components
import { Link } from "react-router-dom";

// Hooks
import { useState } from "react";

/**
 * Componente Register
 * 
 * Este componente é responsável pela renderização do formulário de cadastro. Ele coleta as informações do usuário, como nome, e-mail, senha e confirmação de senha, 
 * e envia os dados para o backend ou para o estado do formulário. Este formulário pode ser usado para registrar novos usuários no sistema.
 * 
 * @component
 * 
 * @returns {JSX.Element} O componente de formulário de registro.
 * 
 * @example
 * // Exemplo básico de uso do componente Register
 * <Register />
 * 
 * @prop {Function} onRegister - Função callback que será chamada quando o formulário for enviado com sucesso. 
 * Geralmente usada para enviar os dados para o backend ou manipular o estado do componente pai.
 * 
 * @prop {string} [errorMessage] - Mensagem de erro que será exibida no formulário caso haja falha ao registrar o usuário, 
 * como um erro de validação ou erro de rede.
 * 
 * @state {string} name - Armazena o nome inserido pelo usuário no campo de texto.
 * @state {string} email - Armazena o e-mail inserido pelo usuário no campo de e-mail.
 * @state {string} password - Armazena a senha inserida pelo usuário no campo de senha.
 * @state {string} confirmPassword - Armazena a senha de confirmação inserida pelo usuário.
 */
const Register = () => {
  // States para armazenar os valores dos campos de entrada
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  // Mensagem de erro, caso haja

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validação simples para garantir que as senhas correspondem
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem!");
      return;
    }

    const user = {
      name,
      email,
      password
    }

    console.log(user);
    

    // Limpar mensagem de erro se a validação for bem-sucedida
    setErrorMessage("");
  };

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome" 
          value={name || ""}
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Confirme a senha" 
          value={confirmPassword || ""}
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        
        {/* Exibição de mensagem de erro, se houver */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <input type="submit" value="Cadastrar" />
      </form>
      <p>Já tem conta? <Link to="/login">Clique aqui.</Link></p>
    </div>
  );
};

export default Register;
