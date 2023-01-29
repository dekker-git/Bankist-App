'use strict';

/////////////////////////////////////////////////
// BANKIST APP
/////////////////////////////////////////////////

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

///CREATING THE USERNAMES FOR EACH INDIVIDUAL USER.
const createUsernames = function (accs) {
  accs.forEach(function(acc) {
     acc.username = acc.owner
     .toLowerCase()
     .split(' ')
     .map(name => name[0])
     .join('');
  })
};
createUsernames(accounts);
console.log(accounts);

////FUNCTION FOR DISPLAYING THE MOVEMENTS (DEPOSITS/WITHDRAWALS) IN THE BANKIST APP INTERFACE... displayMovements()
const displayMovements = function(movements) {

containerMovements.innerHTML= '';

  movements.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = ` 
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

  containerMovements.insertAdjacentHTML('afterbegin',html);
  })
};
displayMovements(account1.movements);

//FUNCTION FOR PRINTING THE TOTAL BALANCE AFTER ACCOUNTING FOR ALL THE DEPOSITS AND WITHDRAWALS.
const calcDisplayBalance = function(movements){
  const balance = movements.reduce((acc,mov)=> acc + mov,0);

  labelBalance.textContent = `${balance}€`;
};
calcDisplayBalance(account1.movements);

//FUNCION FOR SHOWING THE TOTAL DEPOSITS,WITHDRAWALS AND INTEREST.. 'DisplaySummary'
//summing all deposits
const calcDisplaySummary = function(movements) {
  const incomes = movements
  .filter(mov => mov > 0)
  .reduce((acc,mov) => acc+mov,0);
  labelSumIn.textContent = `${incomes}€`;

  //summing all withdrawals
  const withdrawals = movements
  .filter(mov => mov < 0)
  .reduce((acc,mov)=>acc+mov,0);
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`

  //calculating interest at 1.2%
  //interest only applies on deposits > 1 euro
  const interest = movements
  .filter(mov => mov > 0)
  .map(deposit => deposit*0.012)
  .filter((int, i, array) => {
    return int >= 1;})
  .reduce((acc,interest)=>acc+=interest,0)
  labelSumInterest.textContent = `${interest}€`
};
calcDisplaySummary(account1.movements)


//hitting enter on form elements in html triggers a click event.
//-----EVENT HANDLERS (for logging in)-------
let currentAccount;

btnLogin.addEventListener('click',function(event){
  //prevents form from submitting
  event.preventDefault();
  console.log('Login');

currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

console.log(currentAccount);

//optional chaining.. current pin will only be read if the account exists.

if(currentAccount?.pin === Number(inputLoginPin.value)){

  // display UI and welcome message
  //---welcome message with only first name---
  labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
  
  //---showing the UI [changing opacity on .app]
  containerApp.style.opacity = 1;

  // display movements.
  

  // display balance.

  //display summary.
}
})

