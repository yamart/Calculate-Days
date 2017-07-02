# Calculate-Days

Just a function to calculate the number of days between two dates

## Usage

All you need to do is download or clone this repository, install npm 

```Javascript
git clone https://github.com/yamart/calculate-days.git
cd calculate-days
npm install
```

To try this function, you can use the provided GUI, or:
```Javascript
cd src/calculate
node calculate.try.js
```

The data is being retrieved from a file called `data.csv`, you can edit the file to see different results, you can add mutiple lines to the data file, each with a different calculation, like:

```Javascript
01 01 1900, 01 01 2010
03 05 2009, 15 04 2009
```

To run some tests, you can use Jasmine

```Javascript
npm install -D jasmine
npm install -g jasmine
jasmine init
jasmine calculate.spec.js
```

## Options

- `input`: **Required** You need to provide two days in this format: `DD MM YYYY, DD MM YYYY`
- `includeEndDate`: **Required** Set to `true` to include the end date in the calculation, otherwise set it to `false`