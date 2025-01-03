import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MEAL_FILTERS} from '../Data';
import {APP_ID, APP_KEY} from '../Keys';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
// import { ScrollView } from 'react-native-gesture-handler';


const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);
const Home = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getTrendyRecipes();
  }, []);

  const getTrendyRecipes = async () => {
    var myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
  
    try {
      // Use `await` to wait for the fetch to complete
      const response = await fetch(
        `https://newsapi.org/v2/everything?sources=bbc-news%2Cabc-news%2Cal-jazeera-english&page=1&apiKey=${APP_KEY}`,
        requestOptions
      );
      
      // Wait for the response to be converted into JSON
      const result = await response.json();
      
      console.log(result.articles);
      setRecipes(result.articles);
    } catch (error) {
      // Catch and handle any errors
      console.log('error', error);
    }
  };
  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>

      <StatusBar barStyle={'light-content'} />
      <View style={styles.topView}>
        <Animatable.Image
          animation={'slideInUp'}
          source={require('../images/cooking.jpg')}
          style={styles.banner}
        />
        <View style={styles.tranparentView}>
          <Animatable.Text animation={'slideInUp'} style={styles.logo}>
            RecipePro
          </Animatable.Text>
          <AnimatedBtn
            animation={'slideInUp'}
            activeOpacity={0.8}
            style={styles.searchBox}
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Image
              source={require('../images/search.png')}
              style={styles.search}
            />
            <Text style={styles.placeholder}>Please search here.....</Text>
          </AnimatedBtn>
          <Animatable.Text animation={'slideInUp'} style={styles.note}>
            Search 1000+ recipes easily with one click
          </Animatable.Text>
        </View>
      </View>
      <Animatable.Text animation={'slideInUp'} style={styles.heading}>
        Categories
      </Animatable.Text>
      <View>
        <FlatList
          horizontal
          nestedScrollEnabled={false}
          data={MEAL_FILTERS}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <AnimatedBtn
                onPress={() => {
                  navigation.navigate('RecipeByCategory', {
                    data: item.title,
                  });
                }}
                animation={'slideInUp'}
                activeOpacity={0.8}
                style={styles.categoryItem}>
                <View style={styles.card}>
                  <Image source={item.icon} style={styles.categoryIcon} />
                </View>
                <Text style={styles.category}>{item.title}</Text>
              </AnimatedBtn>
            );
          }}
        />
      </View>
      <Animatable.Text animation={'slideInUp'} style={styles.heading}>
        Trendy Reciepes
      </Animatable.Text>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginTop: 10}}
          horizontal
          nestedScrollEnabled={false}
          data={recipes}
          renderItem={({item, index}) => {
            return (
              <AnimatedBtn
                animation={'slideInUp'}
                style={styles.recipeItem}
                onPress={() => {
                  navigation.navigate('Details', {
                    data: item,
                  });
                }}>
                <Image
                  source={{uri: item.urlToImage}}
                  style={styles.recipeImage}
                />
                <View style={[styles.tranparentView, {borderRadius: 15}]}>
                  <Text style={styles.recipeLabel}>{item.author}</Text>
                </View>
              </AnimatedBtn>
            );
          }}
        />
      </View>
     
      {/* <View>
        <FlatList
          horizontal
          data={MEAL_FILTERS}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          renderItem={({item, index}) => {
            return (
              <AnimatedBtn
                onPress={() => {
                  navigation.navigate('RecipeByCategory', {
                    data: item.title,
                  });
                }}
                animation={'slideInUp'}
                activeOpacity={0.8}
                style={styles.categoryItem}>
                <View style={styles.card}>
                  <Image source={item.icon} style={styles.categoryIcon} />
                </View>
                <Text style={styles.category}>{item.title}</Text>
              </AnimatedBtn>
            );
          }}
        />
      </View> */}
      </View>
    </ScrollView>
          </View>

  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    width: '100%',
    height: '40%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  tranparentView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    width: '90%',
    height: 60,

    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 50,
  },
  search: {
    width: 30,
    height: 30,
  },
  placeholder: {
    marginLeft: 15,
    fontSize: 16,
    color: '#9e9e9e',
  },
  logo: {
    fontSize: 40,
    color: 'white',
    fontWeight: '600',
    position: 'absolute',
    top: 60,
    left: 20,
  },
  note: {
    fontSize: 18,
    color: 'white',
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
    color:'#000'
  },

  categoryItem: {
    width: 120,
    height: 120,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    height: '70%',
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 6,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    tintColor: '#05B681',
  },
  category: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 10,
    color:'#000'

  },
  recipeItem: {
    width: 180,
    height: 220,
    marginLeft: 20,
    borderRadius: 15,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  recipeLabel: {
    color: 'white',
    fontSize: 18,
    width: '90%',
    fontWeight: '600',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor:'#fff'
  },
});
