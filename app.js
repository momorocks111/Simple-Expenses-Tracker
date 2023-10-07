const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");

let expenses = [];

function addExpense(event) {
  event.preventDefault();

  const expenseName = document.getElementById("expense-name").value;
  const expenseAmount = parseFloat(
    document.getElementById("expense-amount").value
  );
  const expenseDate = document.getElementById("expense-date").value;

  const expense = {
    id: Date.now(),
    name: expenseName,
    amount: expenseAmount,
    date: expenseDate,
  };

  expenses.push(expense);

  updateExpenses();
  updateTotal();
  expenseForm.reset();
}

function removeExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);

  updateExpenses();
  updateTotal();
}

function updateExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((expense) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.date}</td>
            <td><button class="delete-btn" onclick="removeExpense(${
              expense.id
            })">Delete</button></td>
        `;

    expenseList.appendChild(row);
  });
}

function updateTotal() {
  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
}

expenseForm.addEventListener("submit", addExpense);
