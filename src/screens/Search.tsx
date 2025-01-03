import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {APP_KEY} from '../Keys';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
const Search = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  // const [selectedDish, setSelectedDish] = useState('');
  // const [selectedCusines, setSelectedCusines] = useState('');
  // const [selectedHealth, setSelectedHealth] = useState('');
  // const [selectedDiet, setSelectedDiet] = useState('');

  const searchRecipe = () => {
    console.log(search);
    var myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    let 
      url = `https://newsapi.org/v2/everything?sources=bbc-news%2Cabc-news%2Cal-jazeera-english&page=1&apiKey=${APP_KEY}&q=${search}`;
  

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.articles);
        setRecipes(result.articles);
      })
      .catch(error => console.log('error', error));
  };
  return (
    <View style={styles.conatainer}>
      <StatusBar barStyle={'dark-content'} />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={require('../images/back.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.searchBox}>
        <Image
          source={require('../images/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          placeholder="search here...."
        />
        {search != '' && (
          <TouchableOpacity
            onPress={() => {
              setSearch('');
              setRecipes([]);
            }}>
            <Image
              source={require('../images/close.png')}
              style={styles.close}
            />
          </TouchableOpacity>
        )}
      </View>
      {search != '' && (
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            setRecipes([]);
            searchRecipe();
          }}>
          <Text style={styles.searchTitle}>Search</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={recipes}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.recipeItem}
              onPress={() => {
                navigation.navigate('Details', {data: item});
              }}>
              <Image
                source={{uri: item.urlToImage}}
                style={styles.itemImage}
              />
              <View>
                <Text style={styles.title}>
                  {item.description > 40
                    ? item.description.substring(0, 40) + '...'
                    : item.description}
                </Text>
                <Text style={styles.source}>{item.source.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {recipes && recipes.length > 0 ? (
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => {
            setShowModal(true);
          }}>
          <Image
            source={require('../images/filter.png')}
            style={styles.close}
          />
        </TouchableOpacity>
      ) : null}
      <Modal
        onBackdropPress={() => {
          setShowModal(false);
        }}
        onBackButtonPress={() => {
          setShowModal(false);
        }}
        isVisible={showModal}
        backdropColor="rgba(0,0,0,.5)"
        style={{margin: 0}}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}>
              <Image
                source={require('../images/close.png')}
                style={styles.close}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.heading}>Dish Type</Text>
         
          <TouchableOpacity
            style={styles.submitFilter}
            onPress={() => {
              setShowModal(false);
              searchRecipe();
            }}>
            <Text style={styles.btnText}>{'Apply Filters'}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
  },
  backBtn: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 60,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  searchBox: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 8,
    borderColor: '#9e9e9e',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  input: {
    width: '80%',
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  close: {
    width: 20,
    height: 20,
  },
  searchBtn: {
    width: '40%',
    height: 50,
    backgroundColor: '#05B681',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchTitle: {
    fontSize: 16,
    color: 'white',
  },
  recipeItem: {
    width: '90%',
    height: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 90,
    height: 90,
    marginLeft: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    width: '60%',
    fontWeight: '500',
    marginLeft: 10,
  },
  source: {
    fontSize: 16,
    width: '60%',
    fontWeight: '500',
    marginLeft: 10,
    marginTop: 10,
    color: 'green',
  },
  filterBtn: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 5,
    position: 'absolute',
    bottom: 50,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    paddingBottom: 50,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    height: 60,
  },
  modalTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 20,
    marginTop: 20,
  },
  filterItem: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    borderWidth: 0.6,
  },
  submitFilter: {
    width: '90%',
    height: 50,
    backgroundColor: '#05B681',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
