import React, { useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image , FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImageContext } from './ImageContext';
import { initDatabase, insertMenuItems, fetchMenuItems, fetchMenuItemsByCategory  } from './database';
import CategoryList from './CategoryList';


export default function HomeScreen() {

  
const [selectedCategories, setSelectedCategories] = useState([]);
const [data, setData] = useState([]);

useEffect(() => {
  const filterData = async () => {
    try {
      const filteredData = await fetchMenuItemsByCategory(selectedCategories);
      setData(filteredData);
    } catch (error) {
      console.error('Filtering error:', error);
    }
  };

  filterData();
}, [selectedCategories]);




const toggleCategory = (category) => {
  setSelectedCategories((prev) =>
    prev.includes(category)
      ? prev.filter((item) => item !== category)
      : [...prev, category]
  );
};



// useEffect(() => {
//   fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
//     .then((response) => response.json())
//     .then((data) => {
//       setData(data.menu); // Access the "menu" array directly
//     });
// }, []);
  useEffect(() => {
    const loadData = async () => {
      try {
        await initDatabase();
        const localData = await fetchMenuItems();
        if (localData.length === 0) {
          // Fetch from server if DB is empty
          const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
          const json = await response.json();
          await insertMenuItems(json.menu);
          setData(json.menu);
        } else {
          setData(localData);
        }
      } catch (error) {
        console.error('Database error:', error);
      }
    };

    loadData();
  }, []);

  const navigation = useNavigation();
  const { image, firstName, lastName } = useContext(ImageContext);

  const initials = `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`.toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Centered Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Avatar / Initials on top-right */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.avatarContainer}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.initials}>{initials}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {/* ...rest of your screen */}
      <View style={styles.contain}>
        <Text style={styles.Title}>Little Lemon</Text>
        <Text style={styles.Subtitle}>Chicago</Text>
        <View style={styles.footer}>
        <Text style={styles.Text}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
         <Image
            source={require('../assets/Heroimage.png')}
           style={styles.profileImage}
          />
          </View>
      </View>
      <Text style={styles.TitleText}>ORDER FOR DELIVERY!</Text>
      <View style={{ paddingVertical: 10, paddingHorizontal: 0 }}>
  <CategoryList
    selectedCategories={selectedCategories}
    onToggleCategory={toggleCategory}
  />
</View>
<FlatList
  data={data}
  renderItem={({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemprice}>${item.price}</Text>
      </View>
      <Image
        source={{
          uri: item.image.startsWith('https')
            ? item.image
            : `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
        }}
        style={styles.itemImage}
      />
    </View>
  )}
  keyExtractor={(item, index) => item.name + index}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff'
  },
  contain: {
    height: 250,
   
    position: 'relative',
    backgroundColor: '#495E57',
    paddingHorizontal: 0,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    height: 40,
  },
  avatarContainer: {
    position: 'absolute',
    right: 16,
    top: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
    Title: {
    fontSize: 40,
    padding: 5,
    color: '#F4CE14',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  Subtitle: {
    fontSize: 24,
    padding: 5,
    color: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
  },
   Text: {
    fontSize: 15,
    padding: 5,
    color: '#fff',
    textAlign: 'left',
    width:250,
  },
  TitleText: {
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'left',
    
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'right',
    
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
});

