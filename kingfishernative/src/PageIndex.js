import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Link } from 'react-router-native'
import { styles } from "./Styles"
import { fbi } from "./Global"
import Field from "./Field"
import SpecialButton from "./SpecialButton"
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';


/*
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen. 
 * 
 * This page is the landing page.
 */
export default class PageIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    }
  }

  componentWillMount() {
    if (fbi.auth().authenticated) {
      this.props.history.push("/sites");
    }
  }

  validate = () => {
    fbi.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
    .then((user) => {
      console.log('User successfully logged in', user)
      this.props.history.push("/sites");
    })
    .catch((err) => {
      console.error('User signin error', err);
    });
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={[styles.pageCont, styles.index]}>
          <View style={styles.centerItemsCont}>
            <Image style={styles.govtLogo} source={require("./img/qld_govt_logo.png")} />
          </View>
          <Text style={[styles.centeredText, styles.indexH1]}>
            Kingfisher
          </Text>
          <Text style={[styles.centeredText, styles.indexH2]}>
            Mangrove Monitoring App for the Queensland Herbarium
          </Text>
          <Field label="Username"
            onChangeText={text => this.setState({username: text})}
            autoCapitalize="none"
            value={this.state.username}
          />
          <Field label="Password"
            onChangeText={text => this.setState({password: text})}
            autoCapitalize="none"
            secureTextEntry={true}
            value={this.state.password}
          />
          <SpecialButton 
            onClick={this.validate}
            buttonText="Login"
          />
        </Content>
      </Container>
    )
  }
}
