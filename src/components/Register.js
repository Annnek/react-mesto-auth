import AuthForm from "./AuthForm";

function Register(props) {
  return (
    <AuthForm
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
      isSubmitting={props.isSubmitting}
    />
  );
}

export default Register;
