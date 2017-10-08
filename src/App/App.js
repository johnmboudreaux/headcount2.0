import React, {Component} from 'react';
import Helper from '../index/helper';
import CardContainer from '../CardContainer/CardContainer';
import CompareContainer from '../CompareContainer/CompareContainer';
import DataButton from '../DataButton/DataButton';
import kinderData from '../../data/kindergartners_in_full_day_program';
import hsGradRatesData from '../../data/high_school_graduation_rates';
import thirdGradeTestData from '../../data/3rd_grade_tests';
import eighthGradeTestData from '../../data/8th_grade_test_scores';
import medianIncomeData from '../../data/median_household_income';
import onlineEnrollmentData from '../../data/online_pupil_enrollment';
import pupilEnrollmentData from '../../data/pupil_enrollment';
import remediationData from '../../data/remediation_in_higher_education';
import povertyData from '../../data/school_aged_children_in_poverty';
import specEdData from '../../data/special_education';
import titleIData from '../../data/title_i_students';

class App extends Component {

  constructor() {
    super();

    this.helper = new Helper(kinderData);
    this.kinderData =  this.helper.kinderData;
    // this.kinderdata is just our data variable, kinder data on 13 is our data source
    this.state = {
      school: null,
      years: [],
      inputValue: "",
      numberOfSelected: 0,
      schoolsSelected: [],
      possibleMatches: [],
      dataSet: (new Helper(kinderData)).kinderData,
      dataArray: [
        {name: "HS Graduation Rates", districtData: hsGradRatesData},
        {name: "Kindergartens in Full Day Program", districtData: kinderData},
        {name: "Grade 3 Test Data", districtData: thirdGradeTestData},
        {name: "Grade 8 Test Data", districtData: eighthGradeTestData},
        {name: "Median Household Income", districtData: medianIncomeData},
        {name: "Online Enrollment", districtData: onlineEnrollmentData},
        {name: "Pupil Enrollment", districtData: pupilEnrollmentData},
        {name: "Remediation in Higher Education", districtData: remediationData},
        {name: "School Aged Children in Poverty", districtData: povertyData},
        {name: "Special Education Data", districtData: specEdData},
        {name: "Title I Students", districtData: titleIData}
      ]
    };

    this.onFindClick = this.onFindClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCompareClick = this.handleCompareClick.bind(this);
    this.comparedCardAverages = this.comparedCardAverages.bind(this);
    this.changeDataSet = this.changeDataSet.bind(this);
  }

  onFindClick(event) {
    let school = this.helper.findByName(this.state.inputValue);

    if (typeof school === 'object') {
      let years = [];

      for (let year in school.data) {
        if (typeof year === 'string') {
          years.push(school.data[year]);
        }
      }
      this.setState({ school: school, years: years });
    }
  }

  onChange(event) {
    let val = event.target.value;
    this.setState({
      inputValue: val,
      possibleMatches: val ? this.helper.findAllMatches(val) : []
    });

  }

  // schoolsSelected is not in the array yet!

  handleClick(location){

    //this code is breaking our shit/stuff

    // const locationFound = this.state.schoolsSelected.find((location) => {
    //   return location;
    // });
    const numSelected = this.state.numberOfSelected;
    let schoolIndex = this.state.schoolsSelected.indexOf(location);

    if (numSelected < 2 && schoolIndex === -1){
      this.setState({
        numberOfSelected: numSelected + 1,
        schoolsSelected: this.state.schoolsSelected.concat(location)
      });

    } else if (schoolIndex !== -1) {
      this.setState({
        schoolsSelected: this.state.schoolsSelected.filter((school) => {
          return school !== location;
        }),
        numberOfSelected: numSelected - 1
      });
    }
  }

  handleCompareClick(location) {
    let removeSchool = this.state.schoolsSelected.filter((school) => {
      return location !== school;
    });
    this.setState({
      numberOfSelected: this.state.numberOfSelected - 1,
      schoolsSelected: removeSchool
    });
  }

  selectedCards(schools) {
    return schools.map((school) => {
      return this.helper.findByName(school);
    });
  }

  cardAverages(schoolName) {
    this.helper.findAverage(schoolName, true);
  }

  // this.helper.findAvereage
  // this.helper.compareDistrictAverages
  // schools is array of two objects w school data

  comparedCardAverages(schools) {

    const array = schools.map((school)=>{
      return school.location;
    });

    if (array.length === 2) {
      return this.helper.compareDistrictAverages(array[0], array[1]);
    }

    // this.helper.compareDistrictAverages(array[0], array[1])

  }

  changeDataSet(dataSet) {
    this.setState(
      {
        dataSet: (new Helper(dataSet)).kinderData
      }
    );
  }

  render() {
    return (
      <div className="app-render">
        <div className="data-button-container">
          {this.state.dataArray.map((element, index)=>{
            return (
              <DataButton
                changeDataSet={this.changeDataSet}
                dataSet={element.districtData}
                dataName={element.name}
                key={index}
              />
            );
          })}
        </div>
        <input
          className="search-input"
          placeholder="Search for School Here"
          type="text"
          value={ this.state.inputValue }
          onChange={this.onChange}
        />
        <ul className="search-list">
          {this.state.possibleMatches.map((location, index, event) => {
            return (
              <li
                href="location"
                className="list-items"
                key={index}
              >
                <button
                  onClick={() => {
                    this.handleClick(location.location);
                  }}
                >{location.location}
                </button>

              </li>
            );
          })}
        </ul>
        <h1>{this.state.school
          ? this.state.school.location
          : ""}
        </h1>
        {this.state.years.map((year, index) => {
          return (
            <h2 key={ index }>{ year }</h2>
          );
        })}
        <CompareContainer
          // handleClick={this.handleClick}

          selectedCards={this.selectedCards.bind(this)}
          schoolsSelected={this.state.schoolsSelected}
          compareData={this.comparedCardAverages}
          handleCompareClick={this.handleCompareClick}
        />
        <CardContainer
          schoolsSelected={this.state.schoolsSelected}
          kinderData={this.state.dataSet}
          handleClick={this.handleClick}
          numberOfSelected={this.state.numberOfSelected}
          // cardAverages={this.cardAverages}
        />
      </div>

    );
  }
}

export default App;