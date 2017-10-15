import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { Header, Left, Right, Title, Button, Icon, Body } from 'native-base';
import { styles } from "./Styles"

export default class Head extends React.Component {
  render() {
    return (
      /*
      <View style={styles.title}>
        <View style={styles.titleLeft}>
          <TouchableHighlight onPress={this.props.goBack}>
            <Image
              style={styles.titleBack}
              source={require("./img/icon_back.png")} 
            />
          </TouchableHighlight>
        </View>
        <View style={styles.titleCenter}>
          <Text style={styles.titleText}>{this.props.titleInfo}</Text>
        </View>
        <View style={styles.titleRight}>
          <TouchableHighlight onPress={this.props.goBack}>
            <Image
              style={styles.titleBack}
              source={require("./img/icon_home.png")} 
            />
          </TouchableHighlight>
        </View>
      </View>
      */
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