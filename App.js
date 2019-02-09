import React from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { Button, List, ListItem } from 'native-base';

export default class App extends React.Component {
  state = {
    error:false,
    list:[],
    imageUrl:''
  };
  

  constructor(props){
    super(props);
    this.search = this.search.bind(this);
  }

  search(value){
    console.log(`value:${value}`);
    if(value.length > 3){
      this.setState({list:[]});
      fetch(`https://www.superheroapi.com/api.php/10216447089241794/search/${value}`)
        .then((response) => response.json())
        .then((data)=>{
          if(data.error){
           return this.setState({list:[], error:true, imageUrl:''});
          }
          return this.setState({list:data.results, imageUrl:data.results[0].image.url, error:false});
        })
        .catch((error)=>{console.log(error)});
    }
  }

  renderError(){
    if(this.state.error){
      return(<Text>Deu ruim!</Text>)
    }
  }

  renderImage(){
    console.log(this.state.imageUrl);
    if(this.state.imageUrl)
      return(<Image 
        source={{uri: this.state.imageUrl}}
        style={{width: 200, height: 200}}
      ></Image>)
    else
      return(<Image source=''></Image>)
  }

  renderList(){
    if(this.state.list.length === 0){
      return null;
    }
    return(<List>{
      this.state.list.map((item) => (
        <ListItem key={`item-${item.id}`}>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
        </ListItem>
    ))
    }</List>)
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderImage()}
        <Text>Welcome to the App!</Text>
        <TextInput
          style={{height:40, width:200, borderColor:'gray', borderWidth: 1}}
          onChangeText={this.search}>
        </TextInput>
        {this.renderList()}
        {this.renderError()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
