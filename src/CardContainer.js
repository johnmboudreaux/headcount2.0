import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

const CardContainer = (props) => {
  let array = props.formattedData.kinderData;

  return (
    <div>
      {array.map((singleData)=>{
        return (
          <Card location={singleData.location}
            dataNode={singleData.data}
          />
        );
      })}
    </div>
  );
};

CardContainer.propTypes = {
  formattedData: PropTypes.objectOf(PropTypes.array)
};

export default CardContainer;