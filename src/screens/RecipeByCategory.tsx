import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {APP_ID, APP_KEY} from '../Keys';
import {useNavigation, useRoute} from '@react-navigation/native';

const RecipeByCategory = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    searchRecipe();
  }, []);
  const searchRecipe = () => {
    console.log(search);
    setIsLoading(true); // Start loader
    setRecipes([]); // Clear recipes while searching
    var myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://newsapi.org/v2/everything?sources=bbc-news%2Cabc-news%2Cal-jazeera-english&page=1&apiKey=${APP_KEY}&q=${route.params.data}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.articles);
        setRecipes(result.articles);
      })
      .catch(error => console.log('error', error))
      .finally(() => {
        setIsLoading(false); // Hide loader
      });
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
 {/* Loader */}
 {isLoading ? (
        <ActivityIndicator size="large" color="#05B681" style={styles.loader} />
      ) : (
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
      />  )}
    </View>
    
  );
};

export default RecipeByCategory;
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
