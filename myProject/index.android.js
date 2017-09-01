/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  ListView,
  Text,
  TouchableOpacity,
  RefreshControl,  
  View
} from 'react-native';


var REQUEST_URL = 'https://api.themoviedb.org/3/search/movie?api_key=17edb8a3c806c52f5ade063e4299368b&language=en-US&page=1&include_adult=false&query="back"';  

export default class myProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      //refreshing: false, 
    };
  }

  fetchData(){
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          loaded: true,
          waiting: true, 
        });
      }).done();
  }

  /*_onRefresh() {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }*/ 

  componentDidMount(){
    this.fetchData();
  }

  renderMovie(movie){
    return (
      <View style={styles.container}>
        <Image source={{uri: "https://image.tmdb.org/t/p/w342"+movie.poster_path}} style={styles.thumbnail} />
        <View style={styles.rightContainer}> 
          <Text style={styles.title}>
            {movie.title} ({movie.release_date})
          </Text>
          <Text style={styles.year}> 
            {movie.overview.slice(0, 120)}... 
          </Text>
          <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>READ MORE</Text>
          </View>
        </TouchableOpacity> 
        </View>
      </View> 
    );
  }

  renderLoadingView(){
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text> 
      </View>
      );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource = {this.state.dataSource}
        renderRow = {this.renderMovie}
        style = {styles.listView}
        /*refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }*/ 
       />
      );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10, 
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2, 
    marginLeft: 8,
    marginRight: 8,
    marginTop: 10,
    paddingBottom: 30,  
  },
  rightContainer: {
    flex: 1,
    padding: 10,
  },
  year: {
    textAlign: 'left', 
  },
  title: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold', 
    marginBottom: 5,
  },
  thumbnail: {
    width: 106,
    height: 162,
  },
  listView: {
    paddingTop: 20,
    paddingBottom: 30, 
    backgroundColor: '#F5FCFF',
  },
  button: {
    paddingTop: 20,
  },
  buttonText: {
    color: '#ff4500',  
  },
});

AppRegistry.registerComponent('myProject', () => myProject);
