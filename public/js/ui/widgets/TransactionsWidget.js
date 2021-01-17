/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    if (!this.element) {
      throw new Error('Передан пустой элемент');
    } else {
      this.registerEvents();
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const income = document.querySelector('.create-income-button');
    income.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('newIncome').open();
    });
    const expense = document.querySelector('.create-expense-button');
    expense.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('newExpense').open();
    });
  }
}
