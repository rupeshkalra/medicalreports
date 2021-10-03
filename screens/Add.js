import React, {useState, useRef} from 'react';

import {
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {
  List,
  ListItem,
  Left,
  Button,
  Body,
  Right,
  Form,
  Item,
  Input,
  CheckBox,
  Title,
  H1,
  Subtitle,
  Fab,
  Icon,
  Container,
  H3,
  Spinner,
} from 'native-base';

import shortid from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNCamera} from 'react-native-camera';
import {alignSelf} from 'styled-system';

const Add = ({navigation}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [medname, setMedname] = useState('');
  const [medtime, setMedtime] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [image, setImage] = useState(null);
  const [cameraclicked, setCameraclicked] = useState(false);
  const [modalclicked, setModalclicked] = useState(false);

  const takePicture = async camera => {
    try {
      const options = {quality: 0.9, base64: false};
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
      setCameraclicked(false);
    } catch (error) {
      console.warn(error);
    }
  };

  const deleteMedicine = async id => {
    const newList = await medicines.filter(list => list.id !== id);
    setMedicines(newList);
  };

  const addMedicineToList = async () => {
    if(!medname||!medtime){
      alert("Please complete the fields!");
    }
    else{

    setMedicines(prevMeds => [
      ...prevMeds,
      {
        id: shortid.generate(),
        medname: medname,
        medtime: medtime,
      },
    ]);

    setModalclicked(false);
    setMedname('');
    setMedtime('');
  }
  };

  const addToList = async () => {
    try {
      if (!name) {
        return alert('Please add Name field!');
      }
      if (!image) {
        return alert('Please add Image!');
      }
      if(!medicines){
        return alert('Please add medicines and timmings!');
      }
      const d=new Date();
      
      var min=d.getMinutes();
      if(d.getMinutes().toString().length==1){
        min="0"+d.getMinutes();
      }
      
      const date="Last updated -  "+d.getHours()+":"+min+"  |  "+d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
      const reporttoAdd = {
        id: shortid.generate(),
        name: name,
        date: date,
        description: description,
        image:image,
        medicines: medicines,
      };
      
      const storedValue = await AsyncStorage.getItem('@reports_list');
      const prevList = await JSON.parse(storedValue);

      if (!prevList) {
        const newList = [reporttoAdd];
        await AsyncStorage.setItem('@reports_list', JSON.stringify(newList));
      } else {
        prevList.push(reporttoAdd);
        await AsyncStorage.setItem('@reports_list', JSON.stringify(prevList));
      }
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  const getCamera = () => {
    setCameraclicked(true);
  };

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
      {cameraclicked == true ? (
        <Container>
          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'permission to use audio',
              message: 'We need your permission to use your audio',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }}>
            {({camera, status}) => {
              if (status !== 'READY') return <Text>hi</Text>;
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={styles.capture}
                    onPress={() => takePicture(camera)}>
                    <Text style={{fontWeight:'bold',color:'white'}}>Take Picture</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </RNCamera>
        </Container>
      ) : (
        <>
          <H1 style={styles.heading}>Add new Report</H1>
          <Form>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="Enter Clinic/Doctor name"
                style={styles.inpt}
                value={name}
                onChangeText={text => setName(text)}
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="Enter Details ( If Any )"
                style={styles.inpt}
                value={description}
                onChangeText={text => setDescription(text)}
              />
            </Item>
            <Image
              style={styles.clicked}
              source={{uri: image, width: 140, height: 190}}
            />
            <Button rounded block style={styles.formItem} onPress={getCamera}>
              <Text style={{color: '#eee'}}>Add Photo</Text>
            </Button>
            {medicines.length == 0 ? (
              <Text style={styles.medheading}>
                Add medicine timmings below :
              </Text>
            ) : (
              <Text style={styles.medheading}>Medicines & Timmings :</Text>
            )}
            {medicines.map(med => (
              <ListItem key={med.id} style={styles.listItem} noBorder>
                <Body>
                  <Title style={styles.medName}>{med.medname}</Title>
                  <Text note style={styles.medTime}>
                    {med.medtime}{' '}
                  </Text>
                </Body>
                <Right>
                  <Button
                    style={styles.actionButton}
                    danger
                    onPress={() => {
                      deleteMedicine(med.id);
                    }}>
                    <Icon name="trash" active />
                  </Button>
                  {/* <Button style={styles.actionButton} onPress={()=>{
                      navigation.navigate('Edit')
                    }}>
                      <Icon active name="edit" type="Feather"/>
                    </Button> */}
                </Right>
              </ListItem>
            ))}
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={modalclicked}
              onRequestClose={() => {
                console.log('Modal has been closed.');
              }}>
              <View style={styles.modal}>
                <H3
                  style={{
                    alignSelf: 'center',
                    marginTop: 40,
                    marginBottom: 50,
                    fontWeight: 'bold',
                  }}>
                  Enter medicine name & timmings :
                </H3>

                <Item rounded style={styles.modalItem}>
                  <Input
                    placeholder="Enter Medicine Name"
                    value={medname}
                    onChangeText={text => setMedname(text)}
                  />
                </Item>
                <Item rounded style={styles.modalItem}>
                  <Input
                    placeholder="Enter Timmings"
                    value={medtime}
                    onChangeText={text => setMedtime(text)}
                  />
                </Item>
                <View style={{flexDirection: 'row', marginTop: 40}}>
                  <Button
                    style={styles.modalbtn}
                    onPress={() => setModalclicked(false)}>
                    <Text style={{marginLeft: 12, color: 'white'}}>Cancel</Text>
                  </Button>
                  <Button
                    style={styles.modalbtn}
                    onPress={() => addMedicineToList()}>
                    <Text style={{marginLeft: 12, color: 'white'}}>Submit</Text>
                  </Button>
                </View>
              </View>
            </Modal>

            <Button
              rounded
              block
              style={styles.formItem}
              onPress={() => setModalclicked(true)}>
              <Text style={{color: '#eee'}}>Add Medicine & Timmings</Text>
            </Button>

            <Button rounded block style={{marginBottom: 20}} onPress={()=>{addToList()}}>
              <Text style={{color: '#eee'}}>Save Report</Text>
            </Button>
          </Form>
        </>
      )}
    </ScrollView>
  );
};
export default Add;

const styles = StyleSheet.create({
  medheading: {
    marginLeft: 10,
    marginBottom: 10,
  },
  medTime: {
    color: 'grey',
    textAlign: 'justify',
    marginLeft: 20,
  },
  medName: {
    color: 'black',
    textAlign: 'justify',
    marginLeft: 20,
  },
  actionButton: {
    marginRight: 4,
  },
  listItem: {
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: '#D3D3D3',
  },
  modalbtn: {
    marginLeft: 52,
    width: 80,
    borderRadius: 10,
    color: 'white',
  },
  modal: {
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white',
    height: 450,
    borderRadius: 10,
    marginTop: 200,
    marginLeft: 30,
    marginRight: 30,
  },
  RNcontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  modalItem: {
    alignSelf: 'center',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  clicked: {
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius:15
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  formItem: {
    marginBottom: 10,
  },
  inpt: {
    color: 'black',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 32,
  },
  capture: {
    flex: 0,
    borderColor:'black',
    borderWidth:2,
    backgroundColor: '#515bc9',
    borderRadius:20,
    padding: 15,
    alignSelf: 'center',
    marginTop:600
  },
});
