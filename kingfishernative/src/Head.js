import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { Header, Left, Right, Title, Button, Icon, Body } from 'native-base';
import { styles } from "./Styles"

// The ever-present header/navbar that appears on the top of each page.
// Has an arrow to go back, and a centered section of text.
export default class Head extends React.Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={this.props.goBack}>
            <Icon name='arrow-back' style={styles.titleBack} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.titleText}>{this.props.titleInfo}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}