/* @flow */

// React
import React, {Component} from 'react';

// React Native
//import {Text, View, ListView, ActivityIndicator} from 'react-native';

// Styles
import {DefinitionListStyles, DefinitionDisplayStyles} from '../styles/Styles';

// Components
import DefinitionDisplay from './DefinitionDisplay';

export default class DefinitionList extends Component {
  constructor(props : Object) {
    super(props);
    /*
    (this : any).definitionData = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    */
  }
/*
  listView = (row1, row2) =>{
    row1 !== row2;
    const items = definitions.map((data) =>
      <DefinitionDisplay
        engDefinition={data.eng_definition} frDefinition={data.fr_definition} currentLanguage={currentLanguage}
        toggleModal={toggleModal}/>
    );};
    */

  render() {
    const {definitions, currentLanguage, fetchingDefinitions, searchResults, toggleModal} = this.props;

    const searchResultMessage = () => {
      if (currentLanguage === 'en')
        return (definitions.length + ' Results');
      return (definitions.length + ' Résultat')
    };

    if (definitions.length > 0 && !fetchingDefinitions) {
      if (searchResults) {
        return (
          <DefinitionListStyles variant = {{ definitionListContainer: true }}>
            <p style={{
                alignSelf: 'center',
                marginBottom: 5
              }}>{searchResultMessage()}</p>
            {definitions.map((data) =>
              <DefinitionDisplay
                engDefinition={data.eng_definition} frDefinition={data.fr_definition} currentLanguage={currentLanguage}
                toggleModal={toggleModal}/>)}
            {/*
            <ListView dataSource={this.definitionData.cloneWithRows(definitions)}renderRow={(data) =>
                <DefinitionDisplay
                  engDefinition={data.eng_definition} frDefinition={data.fr_definition} currentLanguage={currentLanguage} toggleModal={toggleModal}/>}/>
            */}
          </DefinitionListStyles>
        );
      } else {
        return (
          <DefinitionListStyles variant = {{ definitionListContainer: true }}>
            {definitions.map((data) =>
              <DefinitionDisplay
                engDefinition={data.eng_definition} frDefinition={data.fr_definition} currentLanguage={currentLanguage}
                toggleModal={toggleModal}/>)
            }

          </DefinitionListStyles>
        );
      }
    } else if (definitions.hasOwnProperty('error') && !fetchingDefinitions) {
      return (
        <DefinitionListStyles variant = {{ definitionListContainer: true }}>
          <DefinitionDisplayStyles variant = {{ errorMessage: true }}>
            {definitions.message}
          </DefinitionDisplayStyles>
        </DefinitionListStyles>
      );
    } else {
      return (
        <DefinitionListStyles variant = {{ definitionListContainer: true }}>
          <button animating={true} style={{
              top: 100
            }} size="large" color='#4286f4'/>
        </DefinitionListStyles>
      );
    }
  }
}
