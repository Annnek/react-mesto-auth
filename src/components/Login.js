import React, { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setpassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" name="login" onSubmit={handleSubmit}>
        <input
          onChange={handleEmailChange}
          className="auth__form-input"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email || ""}
          autoComplete="off"></input>
        <input
          onChange={handlePasswordChange}
          className="auth__form-input"
          name="password"
          type="password"
          placeholder="Пароль"
          required
          value={password || ""}
          autoComplete="off"></input>

        <button className="auth__form-submit-btn" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
