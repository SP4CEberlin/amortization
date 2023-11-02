// Math functions for amortisation
import {AmortisationParams, Payment} from "@/app/models/model";

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

export function calculatePaymentList(formData: AmortisationParams){
    // return the list of years with amortizationSchedule and remaining loan
    let amortizationSchedule: Payment[] = [];

    let annualPayment = calculateAnnualPayment(formData);
    const numberOfPayments = calculateNumberOfPayments(formData.loanAmount, annualPayment, formData.nominalInterestRate);

    let remainingBalance = formData.loanAmount;
    for (let year = 1; year <= numberOfPayments; year++) {

        let yInterest = 0;
        let yRepayment = 0;

        for (let month = 1; month <= 12; month++) {
            const intrestPart = remainingBalance * (formData.nominalInterestRate / 100) / 12;
            const repaymentPart = annualPayment/12 - intrestPart;
            yInterest += intrestPart;
            yRepayment += repaymentPart;
            remainingBalance -= repaymentPart;
        }

        annualPayment = yRepayment + yInterest;

        // last iteration:
        if ( remainingBalance < 0 ){
            // the remainingBalance is the annualPayment for the last year.
            annualPayment += remainingBalance;
            remainingBalance = 0;
        }

        const newPayment = {
            year: year,
            payment: annualPayment,
            interestPortion: yInterest,
            principalPortion: yRepayment,
            remainingBalance: remainingBalance
        }

        if (annualPayment > 0){
            amortizationSchedule.push(newPayment);
        }

    }
    return amortizationSchedule

}