import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(email, password) {
    props.onRegister(email, password);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" name="register" onSubmit={handleSubmit}>
        <input
          className="auth__form-input"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email || ""}
          onChange={handleEmailChange}
          autoComplete="off"></input>
        <input
          className="auth__form-input"
          name="password"
          type="password"
          placeholder="Пароль"
          required
          value={password || ""}
          onChange={handlePasswordChange}
          autoComplete="off"></input>

        <button
          className="auth__form-submit-btn auth__form-submit-btn_size"
          type="submit">
          Зарегистрироваться
        </button>
        <div className="auth__signup">
          <p className="auth__signup_text">Уже зарегистрированы?</p>
          <Link to="sign-in" className="auth__signup_link">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
