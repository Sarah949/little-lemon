import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const categories = [
  'starters',
  'mains',
  'Desserts',
  'Drinks',
  'Vegan',
  'Specials',
  'Salads',
  'Soups',
  'Grill',
];

const CategoryList = ({ selectedCategories, onToggleCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <TouchableOpacity
              key={category}
              onPress={() => onToggleCategory(category)}
              style={[
                styles.categoryItem,
                isSelected && styles.selectedCategoryItem,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
      marginVertical: 10,
      paddingHorizontal: 10,
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#EDEFEE',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategoryItem: {
    backgroundColor: '#495E57', // Example: Little Lemon's green tone
  },
  categoryText: {
    color: '#495E57',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default CategoryList;
