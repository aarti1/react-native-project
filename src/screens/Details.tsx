import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  Button
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

const Details = () => {
  const route = useRoute();
  const [selectedTab, setSelectedTab] = useState(0);
  const navigation = useNavigation();

    const handlePress = async () => {
      // Check if the URL is supported (valid)
      const supported = await Linking.canOpenURL(route.params.data.url);
  
      // if (supported) {
        // Open the URL in the web browser
        await Linking.openURL(route.params.data.url);
      // } else {
      //   console.log(`Don't know how to open this URL: ${route.params.data.url}`);
      // }
    };
  

  return (
    <View style={styles.container}>
      <Animatable.Image
        source={{uri: route.params.data.urlToImage}}
        style={styles.banner}
        animation={'slideInUp'}
      />
      <AnimatedBtn
        style={styles.backBtn}
        animation={'slideInUp'}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={require('../images/back.png')} style={styles.backIcon} />
      </AnimatedBtn>
      <Animatable.Text animation={'slideInUp'} style={styles.title}>{route.params.data.author}</Animatable.Text>
      <Animatable.Text animation={'slideInUp'} style={styles.source}>
        {'added by ' + route.params.data.source.name}
      </Animatable.Text>
      <Animatable.Text animation={'slideInUp'} style={styles.calories}>
        {'Title: '}
        <Text style={{color: 'orange'}}>
          {route.params.data.title}
        </Text>
      </Animatable.Text>

      <Animatable.Text animation={'slideInUp'} style={styles.title}>Click below to visit the fetched URL:</Animatable.Text>
      {route.params.data.url ? (
        <AnimatedBtn /*animation={'slideInUp'} */  style={styles.btn} onPress={handlePress} >
          <Text style={styles.btnText}>Open URL</Text> 
        </AnimatedBtn>
        
      ) : (
        <Animatable.Text>No URL found</Animatable.Text>
      )}
      
      <Animatable.Text animation={'slideInUp'} style={styles.calories}>
        {'published At: '}
        <Text style={{color: 'black'}}>
          {route.params.data.publishedAt}
        </Text>
      </Animatable.Text>
    {/*  <Animatable.Text animation={'slideInUp'} style={styles.calories}>
        {'Meal Type : '}
        <Text style={{color: 'green'}}>
          {route.params.data[0]}
        </Text>
      </Animatable.Text>
       <View>
        <FlatList
          data={[
            'Health',
            'Cautions',
            'Ingredients',
            'Diet',
            'Meal Type',
            'Cuisines',
            'Dish Type',
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginTop: 20}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.typeItem,
                  {
                    borderWidth: selectedTab == index ? 0 : 0.5,
                    marginLeft: index == 0 ? 25 : 10,
                    borderColor: '#9e9e9e',
                    backgroundColor: selectedTab == index ? '#05B681' : 'white',
                  },
                ]}
                onPress={() => {
                  setSelectedTab(index);
                }}>
                <Text style={{color: selectedTab == index ? 'white' : 'black'}}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View> */}
      {/* <FlatList
        data={
          selectedTab == 0
            ? route.params.data.recipe.healthLabels
            : selectedTab == 1
            ? route.params.data.recipe.cautions
            : selectedTab == 2
            ? route.params.data.recipe.ingredientLines
            : selectedTab == 3
            ? route.params.data.recipe.dietLabels
            : setSelectedTab == 4
            ? route.params.data.recipe.mealType
            : selectedTab == 5
            ? route.params.data.recipe.cuisneType
            : route.params.data.recipe.dishType
        }
        renderItem={({item, index}) => {
          return (
            <Animatable.View animation={'slideInUp'} style={styles.lables}>
              <Text>{item}</Text>
            </Animatable.View>
          );
        }}
      /> */}
    </View>
  );
};

export default Details;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  backBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
    top: 60,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    color:'black'

  },
  source: {
    marginLeft: 25,
    marginTop: 10,
    color:'black'
  },

  typeItem: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    borderRadius: 8,
  },
  lables: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    borderWidth: 0.5,
    justifyContent: 'center',
    marginTop: 10,
    borderColor: '#9e9e9e',
    paddingLeft: 10,
  },
  calories: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    marginTop: 20,
    marginLeft: 25,
  },
  btn: {
    width: '40%',
    height: 50,
    backgroundColor: '#05B681',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    color: 'white',
  fontStyle:'normal',
  fontWeight:'bold'
  }
});
