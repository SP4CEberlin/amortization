import React from 'react';
import {Payment} from "@/app/models/model";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

interface PaymentTableProps {
    payments: Payment[];

}

const PaymentTableComponent: React.FC<PaymentTableProps> = ({ payments }) => {

    return (
        <div>
            <h2>Tilgungsplan</h2>

            <TableContainer
                component={Paper}>
                <Table sx={{ minWidth: 300 }} size="small" aria-label="Tilgungsplan">
                    <TableHead>
                        <TableRow>
                            <TableCell>Jahr</TableCell>
                            <TableCell align="right">Zahlung</TableCell>
                            <TableCell align="right">Zinsanteil</TableCell>
                            <TableCell align="right">Tilgungsanteil</TableCell>
                            <TableCell align="right">Restschuld</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.map((row) => (
                            <TableRow
                                key={row.year}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.year}
                                </TableCell>
                                <TableCell align="right">{row.payment.toFixed(2)}</TableCell>
                                <TableCell align="right">{row.interestPortion.toFixed(2)}</TableCell>
                                <TableCell align="right">{row.principalPortion.toFixed(2)}</TableCell>
                                <TableCell align="right">{row.remainingBalance.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PaymentTableComponent;