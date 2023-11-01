
export interface Payment {
    // Payment item for Amortization Schedule:
    year: number
    payment: number
    interestPortion: number
    principalPortion: number
    remainingBalance: number
}

export interface AmortisationParams {
    // Amortisation form parameters
    loanAmount: number
    nominalInterestRate: number;
    initialRepaymentPercentage: number;
    loanTermInYears: number;
}