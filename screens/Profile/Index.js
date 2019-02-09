import React from 'react';
import { View, Text, Image  } from 'react-native';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'

import { List, ListItem } from 'native-base';
import styles from './style';
import Green from '../../assets/green.png';
export default class Profile extends React.Component {
    state = {
        name:'',
        url:'',
        powerstats:{}
    };

    static navigationOptions = {
        title : "Profile"
    }
    componentDidMount(){
        const id = this.props.navigation.getParam('id');
        fetch(`https://www.superheroapi.com/api.php/10216378608089852/${id}`)
        .then( (res)=>res.json() )
        .then( (data) => {
            return this.setState({name:data.name, url:data.image.url, powerstats:data.powerstats});
        } );
    }
    
    renderImage(){
        if(this.state.url){
            return(<Image 
                source={{uri: this.state.url}}
                style={{width: 300, height: 300,justifyContent: 'center',
                alignItems: 'center',}}
            />)
        }
    }

    renderName(){
        if(this.state.name){
            return( <Text>{this.state.name}</Text>)
        }
    }

    renderPowerStats(){
        if(this.state.powerstats){
            powerNames = Object.keys(this.state.powerstats)
            powerValues = Object.values(this.state.powerstats)
            return( 
                <List>
                    <ListItem>
                        <Text>{powerNames[0]}</Text>
                        <View 
                            style={{ width: Number(powerValues[0]),
                                height: 20,
                                backgroundColor: 'red'}}
                        />
                    </ListItem>
                    <ListItem>
                        <Text>{powerNames[1]}</Text>
                        <View 
                            style={{ width: Number(powerValues[1]),
                                height: 20,
                                backgroundColor: 'red'}}
                        />
                    </ListItem>
                    <ListItem>
                        <Text>{powerNames[2]}</Text>
                        <View 
                            style={{ width: Number(powerValues[2]),
                                height: 20,
                                backgroundColor: 'red'}}
                        />
                    </ListItem>
                    <ListItem>
                        <Text>{powerNames[3]}</Text>
                        <View 
                            style={{ width: Number(powerValues[3]),
                                height: 20,
                                backgroundColor: 'red'}}
                        />
                    </ListItem>
                    <ListItem>
                        <Text>{powerNames[4]}</Text>
                        <View 
                            style={{ width: Number(powerValues[4]),
                                height: 20,
                                backgroundColor: 'red'}}
                        />
                    </ListItem>
                    <ListItem>
                        <Text>{powerNames[5]}</Text>
                        <View 
                            style={{ width: Number(powerValues[5]),
                                height: 20,
                                backgroundColor: 'red'}}
                        />
                    </ListItem>
                </List>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderName()}
                {this.renderImage()}
                {this.renderPowerStats()}
            </View>
        );
    }
}

/*
import React from 'react';
import { View, Text, Image } from 'react-natimport { ListItem } from 'native-base';
ive';
import { List, ListItem } from 'native-base';


export default class Profile extends React.Component {
    state = {
        name:'',
        url:'',
        powerstats:{}
    };

    static navigationOptions = {
        title : "Profile"
    }
    componentDidMount(){
        const id = this.props.navigation.getParam('id');
        fetch(`https://www.superheroapi.com/api.php/10216378608089852/${id}`)
        .then( (res)=>res.json() )
        .then( (data) => {
            return this.setState({name:data.name, url:data.image.url, powerstats:data.powerstats});
        } );
    }
    
    renderImage(){
        if(this.state.url){
            return(<Image 
                source={{uri: this.state.url}}
                style={{width: 300, height: 300,justifyContent: 'center',
                alignItems: 'center',}}
            />)
        }
    }

    renderName(){
        if(this.state.name){
            return( <Text>{this.state.name}</Text>)
        }
    }

    

    render() {
        return (
            <View>
                {this.renderName()}
                {this.renderImage()}
                {this.renderPowerStats()}
            </View>
        );
    }
}*/