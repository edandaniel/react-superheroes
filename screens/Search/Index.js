import React from 'react';
//React Native
import { StyleSheet, Text, View, TextInput } from 'react-native';
//Native Base
import { List, ListItem, Thumbnail, Right, Left, Icon, Body, Button } from 'native-base';

//estilo
import styles from './style';
import LogoTitle from '../../components/LogoTitle/Index'
//components/LogoTitle'

export default class Search extends React.Component {
    state = {
        list: [],
        error: false
    };

    static navigationOptions = {
      headerTitle: <LogoTitle/>
    }

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
    }

    search(value) {
        if (value.length > 3) {
            this.setState({ list: [], error: false });

            fetch(`https://www.superheroapi.com/api.php/10216378608089852/search/${value}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        return this.setState({ list: [], error: true });
                    }
                    const results = data.results;
                    return this.setState({ list: results, error: false });
                });
        }
    }

    renderError() {
        if (this.state.error) {
            return (<Text>Ops!</Text>);
        }
        return null;
    }

    renderList() {
        if (this.state.list.length === 0) {
            return null;
        }

        return (<List>
            {
                this.state.list.map((item) => (
                    <ListItem key={`item-${item.id}`}>
                        <Left>
                            <Thumbnail
                                square
                                small
                                source={{ uri: item.image.url }}
                            />
                        </Left>
                        <Body>
                            <Text>{item.id}</Text>
                            <Text>{item.name}</Text>
                        </Body>
                        <Right style={{ paddingLeft: 10 }}>
                            <Button
                                transparent
                                dark
                                onPress={
                                    () => this.props.navigation.push('Profile', {
                                        id: item.id,
                                        name: item.name
                                    })
                                }
                            >
                                <Icon name="arrow-forward" />
                            </Button>
                        </Right>
                    </ListItem>
                ))
            }
        </List>)
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={this.search}
                />

                {this.renderList()}
                {this.renderError()}

            </View>
        );
    }
}
