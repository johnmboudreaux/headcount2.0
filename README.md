# HeadCount 2.0

![headcount](https://user-images.githubusercontent.com/20631355/31922678-a37826a2-b833-11e7-995b-3fe37355877f.gif)


HeadCount 2.0 was a project designed to challenge my skills at manipulating data and creating small, reusable React components.  


This application was built using the `create-react-app` boilerplate. This boilerplate provides a lot of build in content and dependencies for free. Take a few minutes to read through [the documentation](https://github.com/facebookincubator/create-react-app), and remember to refer back to these docs if you run into unexpected issues.  

## Contributors

Nick Teets

John Michael Boudreaux


## Project Goals

* Separate application logic into small, testable functions.
* Create modular, reusable React components.
* Use propTypes to validate props passed to each component.
* Write meaningful, comprehensive unit and integration tests.

## Project Requirements

This project is broken out into multiple iterations. You are expected to complete all required iterations for a passing score, additional extensions are provided to push your comfort level.  

### Data Access Layer

#### Iteration 0 - Initial Data
  Create a constructor/class that takes in data and formats it appropriately. Tests have been written to help guide you in this process. You should pass each iterations' relative tests before moving forward. For `Iteration 0`, tests can be found in `test/unit/iteration-0.test.js`.  

**Things to keep in mind:**  
* Treat the data coming in as if it is from a third party. The existing tests are written in a particular format - you are encouraged to continue the camelCase pattern that is provided within the tests, although you can also choose to write your code differently as long as you stay consistent within your app.

* How you choose to manipulate the data will determine how you can interact with it as the app expands. Use JavaScript to it's advantage and spend time thinking about what types of operations you will need to call on the data provided.

**Notes on the District Repository**  
As an example, take a minute to look at the `kindergartners_in_full_day_program.js` data file.  

The `DistrictRepository` helper class you create will be responsible for holding data pertaining to each educational district. Off the bat, it should contain a `.data` method that returns the information pertaining to to that file:  

Example:  

```javascript
  const district = new DistrictRepository(data);
  district.data // =>s an object or an array depending on how you want to sort your data that pulls in the information from this given file.
```
#### Iteration 1 - Finding Data
Here we will solve the problem of finding singular or multiple data points.  

You will be working on passing the tests in `iteration-1-part1.js` and `iteration-1-part2.js`.

Besides pulling in a particular file, the `DistrictRepository` should also be responsible for parsing data based on search criteria. It should offer the following methods:

* `.findByName()` - returns either `undefined` or `{}` having done a *case insensitive* search

* `.findAllMatching()` - returns an empty array `[]`, or an array of objects `[Object, Object]`, also *case insensitive*.

Example:  

```javascript
import kindergartnerData from '../../data/kindergartners_in_full_day_program.js';

const district = new DistrictRepository(kindergartnerData);

district.findByName('ACADEMY 20').data;
// => { "2004": 0.302, "2005": 0.267, "2006": 0.354, "2007": 0.392, "2008": 0.385, "2009":  0.39, "2010": 0.436, "2011": 0.489, "2012": 0.479, "2013": 0.488, "2014": 0.49 };
```

## Visual layer

**Overview:**
The visual layer will be a single page application using React. Each component should be thoroughly tested with defined `PropTypes` validating what props are being passed in.

#### Iteration 2 - Displaying Data

Now that you have manipulated the data, it's time to build out the front end to display that information. Each component should be thoroughly tested before moving on. This will be a lot easier to do if you break things out into small, modular components.  

As you look into each district, the data points should meet the following criteria:  

* All data should be rounded to the nearest hundredth (ie: .001).
* All data should have a *visual indication* of if the data is above or below `0.5`. The provided comp below uses red and green colors to indicate the difference as an example, but you should tap into your front-end-developer design skills and come up with a better way to indicate those values.   

![Iteration 2 Comp Screen Shot](http://i.imgur.com/GzhO2EO.png)  

CSS **is** graded on this project. Choose something other than red and green.  

### Iteration 3 - Search  

Users should be able to search for a particular district title.  

The search should be *case insensitive* and should fire on each key press.  
*Hint:* Use your helper `DistrictRepository` class!  

### Iteration 4 - Comparative Data Analysis  

Now that we can average and search for individual districts, we should be able to compare two districts to each other. For iteration 4, create a new method on DistrictRepository called `compareDistrictAverages`. This will take in two arguments and return an answer rounded to the nearest hundredth. There are existing tests to help you with this step.  

Example:  

```javascript
  district.compareDistrictAverages('ACADEMY 20', 'Colorado');
  // => { "ACADEMY 20": 0.407, "COLORADO": 0.53, "compared": 0.768};
```

### Iteration 5 - Displaying Compared Data

Now that we can compare data between two districts in code, we need to display that to our users. This iteration should meet the following criteria:  

1. Users should be able to click on an individual district.
2. Once clicked, there should be a visual indication in the UI that the district has been clicked.
3. If clicked a second time, the district should revert back to its previous state. *Hint:* Use CSS classes to help toggle between the UI changes.  
4. Once a district is selected, it must be displayed at the top of the page. It should also remain in the collection of districts displayed in the main body of the app.  

Example:  

![](http://i.imgur.com/pqP1E3N.png)  

5. Once two districts have been clicked, there should be a comparative analysis between the two.  

Example:  

![](http://i.imgur.com/KpSdTaW.png)  

**A maximum of two districts should be able to be selected.**  

### Extensions Reached

#### More Data Files  
* Right now we are only loading the `kindergartners_in_full_day_program.js` file. Create a header with buttons that dynamically load each of the different files provided in this repo.  
* The UI should change to reflect the data provided by the file selected.  

#### Individual District Data Analysis
* When a district is selected it should display the average of its data anywhere it is displayed.  

## Specification Adherence

- 4 - The application completes all 5 iterations above and implements one or more of the extensions.
- 3 - The application completes all 5 iterations.
- 2 - The application is in a usable state, but is missing 1 of the features outlined in the specification above.
- 1 - The application is missing multiple features essential to having a complete application.


