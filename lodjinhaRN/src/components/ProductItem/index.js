import React from 'react';
import { withNavigation } from 'react-navigation';
import { ImageLoader } from 'react-native-image-fallback';
import { View, Text, TouchableOpacity } from 'react-native';

import { formatNumber } from '../../helper';
import Styles from './styles';

const ProductItem = ({ item, navigation: { navigate } }) => {
  return (
    <TouchableOpacity style={Styles.productItemContainer} onPress={() => navigate('Product', { product: item })}>
      <ImageLoader 
        style={Styles.productItemImage} 
        fallback={[require('../../assets/images/not_found.png')]} 
        source={item.urlImagem} />
      <View style={Styles.productItemInfos}>
        <Text style={Styles.productItemTitle}>{item.nome}</Text>
        <View style={Styles.productItemPrice}>
          <Text style={Styles.productItemOldPrice}>De: {formatNumber(item.precoDe)}</Text>
          <Text style={Styles.productItemCurrentPrice}>Por {formatNumber(item.precoPor)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default withNavigation(ProductItem);
