/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    if (User.register(options)) {
      App.setState( 'user-logged' );
      App.getModal('register').close().unregisterEvents();
    }
  }
}
