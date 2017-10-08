import ReactDom from 'react-dom';
import React from 'react';
import { shallow } from 'enzyme';
import DataButton from './DataButton';

describe('Data Button', ()=>{
  it('should render the data node on the button', () => {
    const renderedComponent = shallow(
      <DataButton dataName="Online Enrollment"/>
    );

    console.log(renderedComponent.debug());
    console.log(renderedComponent.find('button').text());

    expect(renderedComponent.find('button').text).toEqual('Online Enrollment')
  });
});
