/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
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
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('transaction__remove')) {
        let id = e.target.dataset.id;
        this.removeTransaction(id);
      }
    });
    
    const account = this.element.querySelector('.remove-account');
    account.addEventListener('click', (e) => {
        e.preventDefault();
        this.removeAccount();
      });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      if (confirm('Вы действительно хотите удалить счёт?')) {
        let id = this.lastOptions.account_id;
        Account.remove(id, {}, (err, response) => {
          if (err === null && response.success) {
            this.clear();
            App.update();
          } else {
            console.log(err);
          }
        });
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove(id, {}, (err, response) => {
        if (err === null && response.success) {
          App.update();
        } else {
          console.log(err);
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (options) {
      this.lastOptions = options;
      Account.get(options.account_id, options, (err, response) => {
        if (err === null && response.success) {
          this.renderTitle(response.data.name);
        } else {
          console.log(err);
        }
      });
      Transaction.list(options, (err, response) => {
        if (err === null && response.success) {
          this.renderTransactions(response.data);
        } else {
          console.log(err);
        }
      });
    }
    
  }
  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    document.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    const d = new Date(date);
    let year = d.getFullYear();
    const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let month = monthNames[d.getMonth()];
    let day = d.getDate();
    let hour = d.getHours();
    if (hour < 10) {
      hour = '0' + hour;
    }
    let minute = d.getMinutes();
    if (minute < 10) {
      minute = '0' + minute;
    }
    let time = `${day} ${month} ${year} г. в ${hour}:${minute}`;
    return time;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    const date = this.formatDate(item.date);
    let html = `<div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <div class="transaction__date">${date}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">${item.sum}<span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
      </div>
    </div>`
    return html;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    const content = document.querySelector('.content');
    content.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
      content.innerHTML += this.getTransactionHTML(data[i]);
    }
  }
}
