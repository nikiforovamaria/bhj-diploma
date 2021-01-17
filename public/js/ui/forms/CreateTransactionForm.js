/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list({}, (err, response) => {
      if (err === null && response.success) {
        const accounts = this.element.querySelector('.accounts-select');
        accounts.innerHTML = '';
        response.data.forEach(item => {
          accounts.insertAdjacentHTML('beforeEnd',`<option value="${item.id}">${item.name}</option>`);
        });
      } else {
        console.log(err);
      }
    });

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options, (err, response) => {
      if (err === null && response.success) {
        if (App.getModal('newExpense')) {
          App.getModal('newExpense').close();
        } else {
          App.getModal('newIncome').close();
        }
        App.update();
      } else {
        console.log(err);
      }
    });
  }
}
