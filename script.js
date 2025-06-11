
// Expense Tracker JavaScript

// Array to hold expense objects
let expenses = [];

// Select DOM elements
const expenseForm = document.getElementById('expense-form');
const expensesList = document.getElementById('expenses-list');
const totalAmountEl = document.getElementById('total-amount');

/**
 * Render the list of expenses dynamically
 */
function renderExpenses() {
  // Clear existing list
  expensesList.innerHTML = '';

  // If no expenses, show message
  if (expenses.length === 0) {
    expensesList.innerHTML = '<p>No expenses added yet.</p>';
    updateTotal();
    return;
  }

  // Create expense cards for each expense
  expenses.forEach((expense, index) => {
    const card = document.createElement('div');
    card.classList.add('expense-card');

    card.innerHTML = `
      <div class="expense-details">
        <div class="expense-title">${expense.title}</div>
        <div class="expense-date">${expense.date}</div>
      </div>
      <div class="expense-amount">$${parseFloat(expense.amount).toFixed(2)}</div>
      <button class="delete-btn" title="Delete expense" data-index="${index}">&times;</button>
    `;

    expensesList.appendChild(card);
  });

  updateTotal();
}

/**
 * Calculate and update the total expense amount
 */
function updateTotal() {
  const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  totalAmountEl.textContent = total.toFixed(2);
}

/**
 * Handle form submission to add a new expense
 * @param {Event} e 
 */
function handleAddExpense(e) {
  e.preventDefault();

  // Get values from form inputs
  const title = expenseForm.title.value.trim();
  const amount = expenseForm.amount.value;
  const date = expenseForm.date.value;

  // Basic validation
  if (!title || !amount || !date) {
    alert('Please fill all fields correctly.');
    return;
  }

  if (parseFloat(amount) <= 0) {
    alert('Amount should be greater than zero.');
    return;
  }

  // Create expense object and add to array
  expenses.push({ title, amount, date });

  // Reset form
  expenseForm.reset();

  // Render updated list
  renderExpenses();
}

/**
 * Handle deleting an expense when delete button is clicked
 * @param {Event} e 
 */
function handleDeleteExpense(e) {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.getAttribute('data-index');
    expenses.splice(index, 1);
    renderExpenses();
  }
}

// Event listeners
expenseForm.addEventListener('submit', handleAddExpense);
expensesList.addEventListener('click', handleDeleteExpense);

// Initial render
renderExpenses();
