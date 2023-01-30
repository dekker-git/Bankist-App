'use strict';

/////////////////////////////////////////////////
// BANKIST APP
/////////////////////////////////////////////////

// Data
const account1 = {
  owner: 'Danny Dekker',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-05-27T17:01:17.194Z',
    '2023-07-11T23:36:17.929Z',
    '2023-07-12T10:51:36.790Z',
  ],
  currency: 'CAD',
  locale: 'en-US', 
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-05-27T17:01:17.194Z',
    '2023-07-11T23:36:17.929Z',
    '2023-07-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-05-27T17:01:17.194Z',
    '2023-07-11T23:36:17.929Z',
    '2023-07-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Element Selectors.
/////////////////////
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
////////////////////////////////////////////////

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
const displayMovements = function(acc,  sort=false) {

containerMovements.innerHTML= '';

//sorting the transaction history
const movs = sort ? acc.movements.slice().sort((a,b) => a - b) : acc.movements;


  movs.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = ` 
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

  containerMovements.insertAdjacentHTML('afterbegin',html);
  })
};

//FUNCTION FOR PRINTING THE TOTAL BALANCE AFTER ACCOUNTING FOR ALL THE DEPOSITS AND WITHDRAWALS.
const calcDisplayBalance = function(movements){
  const balance = movements.reduce((acc,mov)=> acc + mov,0);
  currentAccount.balance = Number(balance);
  labelBalance.textContent = `${balance}€`;

};

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
  .map(deposit => deposit*(currentAccount.interestRate/100))
  .filter((int, i, array) => {
    return int >= 1;})
  .reduce((acc,interest)=>acc+=interest,0)
  //added .toFixed() to ensure not too many decimals are showing
  labelSumInterest.textContent = `${interest.toFixed(2)}€`
};


//hitting enter on form elements in html triggers a click event.
//-----EVENT HANDLERS (for logging in)-------
let currentAccount;

btnLogin.addEventListener('click',function(event){
  //prevents form from submitting
  event.preventDefault();
  console.log('Login');

currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

console.log(currentAccount);

//optional chaining.. current pin will only be read if the account exists --> currentAccount?.pin
if(currentAccount?.pin === Number(inputLoginPin.value)){

  // display UI and welcome message
  //---welcome message with only first name---
  labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
  
  //---showing the UI [changing opacity on .app]
  containerApp.style.opacity = 1;

  //clear the input fields and taking them out of focus.
  inputLoginUsername.value = inputLoginPin.value = ''
  inputLoginPin.blur();


  ///-------------updating UI------------------
      // display movements.
  displayMovements(acc);
  
    // display balance.
  calcDisplayBalance(currentAccount.movements);
  
    //display summary.
  calcDisplaySummary(currentAccount.movements)
  //------------UI updated----------------
}});

////-----transfering money from one account to another-----///

btnTransfer.addEventListener('click', function(e){
  e.preventDefault(); //stops page reload.

  //pulling amount value from input field.
  const amount = Number(inputTransferAmount.value);

  //pulling user to send money to from input field
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  //
  console.log(amount,receiverAcc);

  // setting conditions for money transfers. must have enough money to send, and the amount to send must be positive.
  //recipient username cannot match your own username.
  //recipient must exist.
  //-------------------------------------
  //clearing input fields with blur.
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();


  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username){
    console.log('transfer valid')

    //add to each users movement array
    //for sender, add the negative amount
    //for receiver, add the positive amount.
    currentAccount.movements.push(amount * -1);
    receiverAcc.movements.push(amount);

     ///-----updating UI again------
      // display movements.
    displayUI();
    //////
  } else {
    console.log('transfer invalid');
    alert('Please enter a valid username and amount!')
  }
});

//UI Updating Function
const  displayUI = ()=> {
  displayMovements(acc.movements);
  // display balance.
  calcDisplayBalance(currentAccount.movements);
  //display summary.
  calcDisplaySummary(currentAccount.movements)};

////----------request a loan ----------------////
///conditions: bank will only give loan if there's been a deposit worth 10% of the loan amount.

btnLoan.addEventListener('click',function(e){
  e.preventDefault(); //prevent page reload on form entry
  const loanAmount = Number(inputLoanAmount.value);

  if (loanAmount > 0 && currentAccount.movements.some(mov => mov >= (loanAmount*0.10))) {
    console.log('we qualify');
    currentAccount.movements.push(loanAmount);
    ///-----updating UI again------
      // display movements.
      displayMovements(acc.movements);
      // display balance.
      calcDisplayBalance(currentAccount.movements);
      //display summary.
      calcDisplaySummary(currentAccount.movements);
      //////
  } else {
    alert('You do not meet the requirements for this loan.')
  }
  inputLoanAmount.value = '';
})



/////----------close account feature-----------/////
btnClose.addEventListener('click',function(e) {
  e.preventDefault(); //prevent page reload on form entry

  //if username inputted matches the current user's username
  //and the pin matches the current user's pin
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === (currentAccount.pin)){

    //searching for the index of the username trying to be deleted. looks for the first element in the array that matches the condition.
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    //now we splice to remove the account at the found index.
    accounts.splice(index, 1);

    //now the user should be logged out if the account deletion was successful.
    containerApp.style.opacity = 0;
  }
  else {
    alert('Incorrect username or pin!')
  }
  console.log(accounts);
})

//------- sorting button eventhandler-------
let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});


//Implementing current date
const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
 //0-based for months
const year = now.getFullYear();
const hour = now.getHours();
const minutes = now.getMinutes();
labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;
// we want month/day/year

console.log(now);
