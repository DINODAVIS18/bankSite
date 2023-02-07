import { Injectable, Type } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser = ''
  currentAcno:any

  constructor() { }

  userDetails: any = {
    1000: { acno: 1000, username: "Anu", password: "abc123", balance: 0, transaction: [] },
    1001: { acno: 1001, username: "Amal", password: "abc123", balance: 0, transaction: [] },
    1003: { acno: 1003, username: "Arun", password: "abc123", balance: 0, transaction: [] },
    1004: { acno: 1004, username: "Akil", password: "abc123", balance: 0, transaction: [] },
  }

  register(uname: any, acno: any, psw: any) {
    if (acno in this.userDetails) {
      return false
    }
    else {
      this.userDetails[acno] = { acno, username: uname, password: psw, balance: 0 }
      return true

    }
  }

  login(acno: any, psw: any) {
    var userDetails = this.userDetails

    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {
        this.currentUser = userDetails[acno]["username"]

        this.currentAcno=acno
        
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  deposit(acno: any, password: any, amount: any) {
    var userDetails = this.userDetails
    // convert string amount to  number
    var amnt = parseInt(amount)

    if (acno in userDetails) {
      if (password == userDetails[acno]["password"]) {
        //update balance
        userDetails[acno]["balance"] += amnt

        //transaction data store
        userDetails[acno]["transaction"].push({Type:"Credit",amount:amnt})

        //return current balance
        return userDetails[acno]["balance"]

      }
      else {
        return false
      }
    }
    else {
      return false
    }

  }

  withdraw(acno: any, password: any, amount: any) {
    let userDetails = this.userDetails
    // convert string amount to  number
    var amnt = parseInt(amount)

    if (acno in userDetails) {
      if (password == userDetails[acno]["password"]) {
        if (amnt < userDetails[acno]["balance"]) {
          //update balance
          userDetails[acno]["balance"] -= amnt

          userDetails[acno]["transaction"].push({Type:"Debit",amount:amnt})

          //return current balance
          return userDetails[acno]["balance"]
        }
        else {
          alert('insufficient balance')
          return false
        }
      }
      else {
        alert('incurrect password')
        return false
      }
    }
    else {
      alert('incurrect acnum')
      return false
    }

  }

  getTransaction(acno:any){
    return this.userDetails[acno]["transaction"]

  }
}
