import React from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
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

  // If the user is already logged in from a previous session, redirect to the sites page.
  componentWillMount() {
    if (fbi.auth().authenticated) {
      this.props.history.push("/sites");
    }
  }

  // Check if the username and password were valid.
  validate = () => {
    // Check if empty first, otherwise firebase will cause an error on android.
    if (this.state.username == "" || this.state.password == "") {
      Alert.alert(
        "Username or password was incorrect. Ensure you are connected to the internet and try again."
      )
      return;
    }
    fbi.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
    .then((user) => {
      this.props.history.push("/sites");
    })
    .catch((err) => {
      Alert.alert(
        "Username or password was incorrect. Ensure you are connected to the internet and try again."
      )
    });
  }

  // Renders a simple landing page with a logo and login fields.
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
          <Field label="Username" accessibilityLabel={ 'login' }
            onChangeText={text => this.setState({username: text})}
            autoCapitalize="none"
            value={this.state.username}
          />
          <Field label="Password" accessibilityLabel={ 'password' }
            onChangeText={text => this.setState({password: text})}
            autoCapitalize="none"
            secureTextEntry={true}
            value={this.state.password}
          />
          <SpecialButton
            accessibilityLabel={ 'login button' }
            onClick={this.validate}
            buttonText="Login"
          />
        </Content>
      </Container>
    )
  }
}
