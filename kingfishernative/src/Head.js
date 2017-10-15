import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { Header, Left, Right, Title, Button, Icon, Body } from 'native-base';
import { styles } from "./Styles"

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