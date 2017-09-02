import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

/***************************/
/******** VARIABLES ********/
/***************************/


//const KINGFISHER_GREEN = '#0BA900'
const KINGFISHER_GREEN = "#48B040"

const ERROR_COLOR = "#ff2222";

const KINGFISHER_RED = '#DD4649';
const FILLED_FIELD = '#96DD90';
const ACTIVE_FIELD = '#E5E0E5';
const UNFILLED_FIELD = '#898689';

const PAGE_BG = "#252B38";
const TITLE_BG = "#48b040";

const BUTTON_BG = KINGFISHER_GREEN;
const BUTTON_TEXT = '#e6e6e6';
const TEXT_GREY = '#c4c4c4';
const MIDDLE_GREY = '#6d6d6d';

/****************************/
/********** STYLES **********/
/****************************/
export const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: PAGE_BG,
  },

  error: {
    backgroundColor: ERROR_COLOR,
  },

  h2: {
    color: TEXT_GREY,
    textAlign: "center",
  },

  pageHeadTitle: {
    fontSize: 30,
    color: TEXT_GREY,
    paddingBottom: 20,
    textAlign: "center",
  },

  pageHeadDesc: {
    fontSize: 16,
    color: TEXT_GREY,
    paddingBottom: 20,
    textAlign: "center",
  },

  pageCont: {
    flex: 1,
    minHeight: Dimensions.get('window').height,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 20,
  },

  scroller: {
    minHeight: Dimensions.get('window').height - 90, // 90 is the height of the title
  },

  centerItemsCont: {
    alignItems: "center"
  },

  centeredText: {
    textAlign: "center",
  },

  button: {
    backgroundColor: BUTTON_BG,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 2,
  },

  buttonText: {
    color: BUTTON_TEXT,
    fontWeight: "bold",
    fontSize: 20,
  },

  horizontalFlexCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  thirds: {
    width: "30%",
  },

  field: {
    //flexDirection: "row",
    //flexWrap: "wrap",
  },

  fieldLabel: {
    color: TEXT_GREY,
    textAlign: "center",
  },

  fieldInputCont: {
    marginTop: 5,
    marginBottom: 10,
  },

  fieldInput: {
    backgroundColor: UNFILLED_FIELD,
    textAlign: "center",
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#333333"
  },

  title: {
    flex: 0,
    backgroundColor: TITLE_BG,
    paddingBottom: 10,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row"
  },

  titleLeft: {
    width: 70,
  },

  titleCenter: {
    flexGrow: 1,
    justifyContent: "center",
  },

  titleRight: {
    width: 70,
  },

  titleLogo: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
  },

  titleBack: {
    width: 50,
    height: 50,
    marginRight: 30,
  },

  titleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: PAGE_BG
  },

  /***** INDEX *****/

  index: {
    paddingTop: 70,
  },

  govtLogo: {
    width: 170,
    height: 210,
  },

  indexH1: {
    fontSize: 30,
    color: TEXT_GREY,
    paddingTop: 20,
  },

  indexH2: {
    fontSize: 16,
    color: TEXT_GREY,
    paddingTop: 6,
    paddingBottom: 70,
  },

  /***** SITE HOME *****/

  siteHome: {
    alignItems: "center",
  },

  siteHomeButtonCont: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    paddingTop: 30,
  },

  siteHomeButton: {
    marginBottom: 20,
  },

  /***** SITE TREES *****/

  siteTrees: {
  },

  keepOnBottom: {
    position: "absolute",
    bottom: 0,
    left: 20, // Padding size of pageCont
  },

  siteTreesItem: {
    minWidth: "70%",
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderColor: TEXT_GREY,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  siteTreeText: {
    color: TEXT_GREY,
    fontSize: 20,
  },

  siteTreeOption: {
    flexDirection: "row",
    minWidth: "30%",
    justifyContent: "space-around",
  },

  siteTreeIcon: {
    width: 30,
    height: 30,
  },

});