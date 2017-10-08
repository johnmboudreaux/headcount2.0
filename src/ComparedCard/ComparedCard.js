import React from 'react';
// import Card from './Card';
import PropTypes from 'prop-types';

const ComparedCard = ({ compareData, schoolsSelected, selectedCards }) => {

  return (
    <div className="compared-cards">
      {
        compareData(selectedCards(schoolsSelected)) &&
        compareData(selectedCards(schoolsSelected)).compared
      }
    </div>
  );
};

ComparedCard.propTypes = {
  selectedCards: PropTypes.func,
  compareData: PropTypes.func,
  schoolsSelected: PropTypes.array,
  numberOfSelected: PropTypes.number
};

export default ComparedCard;