## About: 
This is a ReactJS/NextJS project, using MUI.


## Getting Started
Install the packages:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Structure:
- Pages 
- - AmortizationCalculatorPage - the main app
- Components
- - PaymentFormComponent -input form
- - PaymentTableComponent - table display
- - Common (components)
- - - currencyDisplay - number with 2 digits and suffix
- - - formInput (todo) - generic input element
- Services (for later use)
- 

resources:
- https://www.bankazubi.de/wissenspool/artikel.php?katid=44&opid=1&artikelid=297
- https://www.smart-rechner.de/kredit/glossar/tilgungsplan.php

todo:
- translation / localisation: i18n
- create components for common elements i.e. text / number input
- add atomic-design patterns for scss
- install cypress for testing