'use client'
import {AmortizationCalculatorPage} from "@/app/pages/amortizationCalculator.page";
import {createTheme, ThemeProvider} from "@mui/material";

// basic color theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#ff0000',
        },
        secondary: {
            main: '#666',
        },
    },
});
export default function Home() {
  return (
      <ThemeProvider theme={theme}>
          <main>
              <AmortizationCalculatorPage/>
          </main>
      </ThemeProvider>

  )
}
