import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

/***************************/
/******** VARIABLES ********/
/***************************/


//const KINGFISHER_GREEN = '#0BA900'
const KINGFISHER_GREEN = "#48B040"

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
const DARK_GREY = '#303030'

/****************************/
/********** STYLES **********/
/****************************/
export const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: PAGE_BG,
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
    flex: 0,
    minHeight: Dimensions.get('window').height - 90, // 90 is the height of the title
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 20,
  },

  scroller: {
    minHeight: Dimensions.get('window').height - 90, // 90 is the height of the title
    flex: 1,
    //maxHeight: Dimensions.get('window').height - 90, // 90 is the height of the title
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

  delete: {
    backgroundColor: KINGFISHER_RED
  },

  verticallyStackedButton: {
    marginBottom: 20,
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

  siteAddCont: {
    flexDirection: "row",
  },

  siteAddLabel: {
    color: TEXT_GREY,
    textAlign: "center",
    fontSize: 18,
  },

  siteAddField: {
    flex: 4,
  },

  siteAddButton: {
    flex: 0,
    backgroundColor: KINGFISHER_GREEN,
    borderRadius: 5,
    width: 40,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    padding: 5,
  },

  site: {
    backgroundColor: "#FFF000"
  },

  siteButton: {
    backgroundColor: PAGE_BG,
    padding: 5,
    marginBottom: 5,
    borderRadius: 3,
  },

  siteButtonText: {
    fontSize: 18,
    color: TEXT_GREY,
  },

  siteHomeButtonCont: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    paddingTop: 30,
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
    color: DARK_GREY,
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

  treeEntry: {
    backgroundColor: KINGFISHER_GREEN,
    marginTop: 7,
    borderRadius: 4,
    padding: 3,
  },

  treeName: {
    padding: 3,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dropdownArrow: {
    width: 30,
    height: 30,
  },

  treeDropdown: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: FILLED_FIELD,
  }

});
