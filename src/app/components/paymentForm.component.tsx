'use client'
import PaymentTableComponent from "@/app/components/paymentTable.component";
import React, {useState} from "react";
import {AmortisationParams, Payment} from "@/app/models/model";
import {
    Button,
    Card,
    CardContent,
    Grid,
    InputAdornment,
    TextField
} from "@mui/material";
import CurrencyDisplayComponent from "@/app/components/common/currencyDisplay.component";
import {
    calculateAnnualPayment,
    calculateNumberOfPayments,
} from "@/app/utilitys/amortization.math";

export function PaymentFormComponent() {

    let amortisationParams: AmortisationParams = {
        loanAmount: 100000,
        nominalInterestRate: 2.0,
        initialRepaymentPercentage: 5,
        loanTermInYears: 10
    }

    // useState to keep track of the data:

    // showResult show/hide the table
    const [showResult, setShowResult]= useState(false);

    // monthlyPayment calculated with the given initial repayment percentage
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    // remainingLoan at the end of the interest rate lock-in period
    const [remainingLoan, setRemainingLoan] = useState(0);

    // paymentList with details for each year
    const [paymentList, setPaymentList] = useState<Payment[]>([]);


    const [formData , setFormData] = useState({
        loanAmount: amortisationParams.loanAmount,
        nominalInterestRate: amortisationParams.nominalInterestRate,
        initialRepaymentPercentage: amortisationParams.initialRepaymentPercentage,
        loanTermInYears: amortisationParams.loanTermInYears
    })

    const calculate = () => {
        // button click ->
        // calculate the payment & show the table
        updateList(formData);
        setShowResult(true);
    };

    const reCalcList = (event: { target: any;}) => {
        // update onBlur
        updateList(formData);
    }

    const handleInputChange = (event: { target: any; }) => {
        // onChange only update the formData
        const { target } = event;
        const { name, value } = target;
        setFormData({
            ...formData, // Keep existing form data
            [name]: value // Update form data for the input field that changed
        });
    }

    const updateList = (formData: AmortisationParams) => {
        // temporary list for table-data
        let amortizationSchedule: Payment[] = [];

        let annualPayment = calculateAnnualPayment(formData);

        const numberOfPayments = calculateNumberOfPayments(formData.loanAmount, annualPayment, formData.nominalInterestRate);

        setMonthlyPayment(annualPayment/12);
        setRemainingLoan( 0 );

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

            if (year === formData.loanTermInYears) {
                // the user wants to know the loan at the end of the interest rate lock-in period:
                setRemainingLoan( remainingBalance );
            }

            annualPayment = yRepayment + yInterest;

            // last iteration:
            if ( year === numberOfPayments){
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
            amortizationSchedule.push(newPayment);
        }
        setPaymentList(amortizationSchedule);
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                        <CardContent sx={{margin: 2}}>
                            <h2>Tilgungsrechner</h2>
                            <form>
                                { /* todo: these textFields a redundant, a common generic-component should do the job */}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    defaultValue={amortisationParams.loanAmount}
                                    InputProps={{
                                        endAdornment: (<InputAdornment position="end">Euro</InputAdornment>)
                                    }}
                                    onChange={handleInputChange}
                                    onBlur={reCalcList}
                                    aria-describedby="loan amount in euro"
                                    name="loanAmount"
                                    id="standard-basic"
                                    label="Wert"
                                    variant="outlined" />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    defaultValue={amortisationParams.nominalInterestRate}
                                    InputProps={{
                                        endAdornment: (<InputAdornment position="end">%</InputAdornment>)
                                    }}
                                    onChange={handleInputChange}
                                    onBlur={reCalcList}
                                    aria-describedby="interest rate"
                                    name="nominalInterestRate"
                                    id="standard-basic"
                                    label="Sollzinssatz"
                                    variant="outlined" />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    defaultValue={amortisationParams.initialRepaymentPercentage}
                                    InputProps={{
                                        endAdornment: (<InputAdornment position="end">%</InputAdornment>)
                                    }}
                                    onChange={handleInputChange}
                                    onBlur={reCalcList}
                                    aria-describedby="initial repayment percentage"
                                    name="initialRepaymentPercentage"
                                    id="standard-basic"
                                    label="Anfängliche Tilgung"
                                    variant="outlined" />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    defaultValue={amortisationParams.loanTermInYears}
                                    InputProps={{
                                        endAdornment: (<InputAdornment position="end">Jahre</InputAdornment>)
                                    }}
                                    onChange={handleInputChange}
                                    onBlur={reCalcList}
                                    aria-describedby="loan term in years"
                                    name="loanTermInYears"
                                    id="standard-basic"
                                    label="Zinsbindung"
                                    variant="outlined" />
                            </form>
                            <Button
                                onClick={() => calculate()}
                                variant="contained" size="large"
                                aria-describedby="start calculation"
                            >Berechnen</Button>
                            {showResult &&
                                <span>
                                    <h4>Monatliche Rate: <CurrencyDisplayComponent amount={monthlyPayment}/></h4>
                                    <h4>Restschuld nach Zinsbindung: <CurrencyDisplayComponent amount={remainingLoan}/></h4>
                                </span>
                            }
                        </CardContent>
                    </Card>
                </Grid>
                { showResult && (
                <Grid item xs={12} md={8}>
                    <Card variant="outlined">
                        <CardContent sx={{margin: {
                            /* MUI responsive layout can be further tweaked like this: */
                                sm: 0,
                                md: 2
                            }
                        }} >
                            <PaymentTableComponent payments={ paymentList }  />
                        </CardContent>
                    </Card>
                </Grid>
                )}
            </Grid>
        </div>
    )
}