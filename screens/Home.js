import React, {useState, useEffect} from 'react';
import {StyleSheet,View, ScrollView} from 'react-native';
import {
  Text,
  List,
  ListItem,
  Left,
  Button,
  Body,
  Right,
  CheckBox,
  Title,
  H1,
  Subtitle,
  Fab,
  Icon,
  Container,
  Spinner,
} from 'native-base';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const focused = useIsFocused();

  const getList = async () => {
    setLoading(true);
    const storedValue = await AsyncStorage.getItem('@reports_list');
    if (!storedValue) {
      setReports([]);
    }
    else{
    const list = JSON.parse(storedValue);
    setReports(list);
    } 
    setLoading(false);
  };

  const deleteReport = async id => {
    const newList = await reports.filter(list => list.id !== id);
    await AsyncStorage.setItem('@reports_list', JSON.stringify(newList));

    setReports(newList);
  };

  useEffect(() => {
    getList();
  }, [focused]);

  if (loading) {
    return (
      <Container style={styles.container}>
        <Spinner color="#00b7c2" />
      </Container>
    );
  }

  return (
    <ScrollView  style={{flex: 1}} contentContainerStyle={styles.container}>
      {reports.length == 0 ? (
        <View style={styles.container}>
          <H1 style={styles.heading}>No Reports !</H1>
        </View>
      ) : (
        <>
          <List style={{marginTop: 20,marginBottom:70}}>
            {reports.map(report => (
              <View key={report.id}>
                <Text style={{color: 'white', marginLeft: 10,fontSize:12}}>{report.date}</Text>
                <ListItem onPress={()=>{navigation.navigate('Report',{report})}} style={styles.listItem} noBorder>
                  <Body>
                    <Title style={styles.Name}>{report.name}</Title>
                    <Text style={{marginLeft: 20}} note>
                      {report.description}
                    </Text> 
                  </Body>
                  <Right>
                    <Button
                      style={styles.actionButton}
                      danger
                      onPress={() => {
                        deleteReport(report.id);
                      }}>
                      <Icon name="trash" active />
                    </Button>
                    <Button
                      style={styles.actionButton}
                      onPress={() => {
                        navigation.navigate('Edit', {report});
                      }}>
                      <Icon active name="edit" type="Feather" />
                    </Button>
                  </Right>
                </ListItem>
              </View>
            ))}
          </List>
        </>
      )}

      <Fab
        style={{backgroundColor: '#5067FF'}}
        position="bottomRight"
        onPress={() => {
          navigation.navigate('Add');
        }}>
        <Icon name="add" />
      </Fab>
    </ScrollView>
  );
};
export default Home;

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flexGrow:1
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 4,
  },
  Name: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'justify',
    marginLeft: 20,
    fontSize: 25,
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
  },
});
