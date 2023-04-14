import React from "react";

function Login(props) {
  return (
    <>
      <section className="auth">
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__form-input"
            placeholder="Email"
            name="email"
            type="email"
            required
            value={email || ""}
            onChange={handleEmailChange}
          ></input>
          <input
            className="auth__form-input"
            placeholder="Пароль"
            name="password"
            type="password"
            required
            value={password || ""}
            onChange={handlePasswordChange}
          ></input>

          <button className="auth__form-submit-btn" type="submit">
            Войти
          </button>
        </form>
      </section>
    </>
  );
}
