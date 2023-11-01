
// Math functions for amortisation
import {AmortisationParams} from "@/app/models/model";

export function calculateNumberOfPayments(loanAmount: number, annualPayment: number, annualInterestRate: number): number {
    // returns number of payments until loan is zero
    const interestRate = annualInterestRate / 100;
    const x = Math.log(annualPayment / (annualPayment - interestRate * loanAmount));
    const y = Math.log(1 + interestRate);
    const numberOfPayments = x / y;
    return Math.ceil(numberOfPayments); // round up to next full payment
}

export function calculateAnnualPayment(aParam: AmortisationParams): number {
    // returns annualPayment
    const intrestRatePart = aParam.loanAmount * (aParam.nominalInterestRate / 100);
    const repaymentPart = aParam.loanAmount * (aParam.initialRepaymentPercentage / 100);
    return (intrestRatePart + repaymentPart);
}

// this function can be used to get the remaining loan, without using a loop for calculation
export function calculateRemainingBalance(loanAmount: number, annualInterestRate: number, year: number): number {
    const interestRate = annualInterestRate / 100;
    // return remainingBalance
    return loanAmount * Math.pow(1 + interestRate, year) - (loanAmount * (1 - Math.pow(1 + interestRate, -year)));
}
