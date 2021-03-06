import React, { Component, Fragment } from 'react';
import Swiper from 'react-native-swiper';
import { ImageLoader } from 'react-native-image-fallback';

import { 
  View, 
  FlatList, 
  Text, 
  Image,
  ScrollView, 
  StatusBar,
  Linking,
  TouchableOpacity
} from 'react-native';

import { getBanners, getBestSells, getCategories } from './api';

import ProductItem from '../../components/ProductItem';
import Header from './components/Header';

import { Styles } from './styles';

export default class Home extends Component {

  static navigationOptions = Header

  state = {
    categories: [],
    bestSells: [],
    banners: []
  }

  async componentDidMount() {
      const bestSells = await getBestSells();
      const categories = await getCategories();
      const banners = await getBanners();

      this.setState(
        {
          categories: categories.data,
          bestSells: bestSells.data,
          banners: banners.data
        }
      )
  }

  _keyExtractor = (item, index) => String(item.id);

  handleClick = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={Styles.categoryItemContainer} 
      onPress={() => this.props.navigation.navigate('Category', { category: item })}>
      <ImageLoader 
        style={Styles.categoryItemImage} 
        fallback={[require('../../assets/images/not_found.png')]} 
        source={item.urlImagem} />
      <Text style={Styles.categoryItemDescription}>{item.descricao}</Text>
    </TouchableOpacity>
  )

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
          <ScrollView style={Styles.container}>
              <Swiper style={Styles.bannerContainer}>
                {
                  this.state.banners.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => this.handleClick(item.linkUrl)}>
                      <Image 
                        style={Styles.slideImage} 
                        resizeMode="cover"
                        source={{ uri: item.urlImagem }} />
                    </TouchableOpacity>
                  ))
                }
              </Swiper>
              <View style={Styles.categoriesContainer}>
                <View style={Styles.titleContainer}>
                  <Text style={Styles.title}>Categorias</Text>
                </View>
                <FlatList
                  data={this.state.categories}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.renderCategoryItem} />
              </View>
              <View style={Styles.bestSellersContainer}>
                <View style={Styles.titleContainer}>
                  <Text style={Styles.title}>Mais vendidos</Text>
                </View>
                {this.state.bestSells.map((item) => <ProductItem key={item.id} item={item} />)}
              </View>
          </ScrollView>
      </Fragment>
    );
  }
}
