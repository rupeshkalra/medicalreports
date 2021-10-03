import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, ScrollView, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  Container,
  Spinner,
} from 'native-base';

const Report = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [image, setImage] = useState(null);
  const [modalclicked, setModalclicked] = useState(false);

  useEffect(() => {
    const {report} = route.params;
    const {name, image, description, medicines} = report;

    setName(name);
    setDescription(description);
    setImage(image);
    setMedicines(medicines);
  }, []);

  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{name}</Text>
      <Text style={styles.desc}>
        {description == '' ? (
          <Text>----------- no description -----------</Text>
        ) : (
          description
        )}
      </Text>
      <View style={{position: 'relative'}}>
        <Image
          style={styles.clicked}
          source={{uri: image, width: 140, height: 190}}
        />
        <Icon
          style={styles.icon}
          onPress={() => setModalclicked(true)}
          size={22}
          name="arrows"
          active
        />
      </View>

      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalclicked}
        >
        <View style={styles.modal}>
          <Image
            style={styles.openimg}
            source={{uri: image, width: 360, height: 696}}
          />
          <Icon
            style={styles.iconclose}
            onPress={() => setModalclicked(false)}
            size={32}
            name="arrow-left"
            active
          />
        </View>
      </Modal>

      <View style={{marginBottom: 15}}>
        {medicines.map(med => (
          <ListItem key={med.id} style={styles.listItem} noBorder>
            <Body>
              <Title style={styles.medName}>{med.medname}</Title>
              <Text note style={styles.medTime}>
                {med.medtime}{' '}
              </Text>
            </Body>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
};

export default Report;

const styles = StyleSheet.create({
  iconclose: {
    color: 'grey',
    position: 'absolute',
    top: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    left: 5,
    width: 30,
  },
  openimg: {
    borderRadius: 8,
  },
  modal: {
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white',
    height: 700,
    borderRadius: 10,
    marginTop: 70,
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    position: 'absolute',
    marginTop:160,
    backgroundColor: 'white',
    borderRadius: 13,
    left: 235,
    color: 'grey',
  },
  clicked: {
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 15,
  },
  actionButton: {
    marginRight: 4,
  },
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
  heading: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
    fontSize: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  desc: {
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },

  listItem: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: '#D3D3D3',
  },
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
});
