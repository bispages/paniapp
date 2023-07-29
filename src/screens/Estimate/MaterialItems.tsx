import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Colors from '../../assets/colors';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { selectMaterials } from '../../store/selectors/apiSelectors';
import { useSelector } from 'react-redux';
import { MaterialSizesType } from 'types';

const MaterialItems = ({
  route: {
    params: { type },
  },
}: {
  route: {
    params: { type: string };
  };
}) => {
  const [visible, setVisible] = useState(false);
  const [num, setNum] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [matType, setMatType] = useState('');
  const [matItemName, setMatItemName] = useState('');
  const [data, setData] = useState();
  const [manual, setManual] = useState([]);
  const [countitem12, setCountitem12] = useState([]);
  const [countitem, setCountitem] = useState([]);
  const [load, setLoad] = useState(true);
  const [size, setSize] = useState<MaterialSizesType[]>([]);
  const [click, setClick] = useState({ id: 0, count: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const materials = useSelector(selectMaterials);
  const matypes = materials?.data ? Object.keys(materials.data) : [];

  console.log(matypes, 'matypes12');

  const popup = () => {
    setNum(true);
    setTimeout(function () {
      setNum(false);
    }, 100);
  };

  const handleProductCount = (id: string, payload: string) => {
    // setCountitem(arr1);
    console.log('99999935$%', size);
    let item = size?.find(item => item.id === id);

    if (item) {
      if (payload === 'inc') {
        item.count = item.count ? item.count + 1 : 0;
        item.initialCount = item.initialCount ? item.initialCount + 1 : 0;

        if (click.id === id) {
          click.count += 1;
        } else {
          if (item.initialCount > 0) {
            click.count = item.initialCount;
          } else {
            click.count = 1;
          }
        }
        click.id = id;
        setLoad(!load);
        {
          console.log('YYYY', item.count);
        }
      } else {
        if (item.count > 0) {
          item.count--;
          item.initialCount--;
          if (click.id === id) {
            click.count -= 1;
          } else {
            if (item.initialCount > 0) {
              click.count = item.initialCount;
            } else {
              click.count = -1;
            }
          }
          click.id = id;
          setLoad(!load);
        } else {
          console.log('Something went wrong');
        }
      }
    }

    console.log('%%', data);
  };

  const renderItems = ({ item, index }: { item: MaterialSizesType; index: number }) => (
    <View style={styles.itemcontentbar} key={index}>
      <View style={styles.typecontentbar}>
        <Text style={styles.amountline}>
          {item?.unit}
          <Text style={styles.inches}> inch</Text>
        </Text>
      </View>
      <View style={styles.rowset}>
        <TouchableOpacity style={styles.btnselector} onPress={() => [handleProductCount(item.id, 'dec'), popup()]}>
          <Text style={styles.icontxt}>—</Text>
        </TouchableOpacity>
        <View style={styles.number}>
          <Text style={styles.Count}>{item?.count}</Text>
        </View>
        <TouchableOpacity style={styles.btnselector} onPress={() => [handleProductCount(item.id, 'inc'), popup()]}>
          <Text style={styles.icontxt}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {visible === true ? (
        <View style={styles.modalcontainer}>
          {num === true ? (
            <View style={styles.countbar}>
              <Text style={styles.countnum}>{click.count}</Text>
            </View>
          ) : (
            ''
          )}
          <View style={styles.contentdiv}>
            <View style={styles.contentdivtap}></View>
            <View style={styles.contentbar}>
              <Text style={styles.producttxt}>
                {type} - {matItemName}
              </Text>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={size}
              renderItem={renderItems}
              keyExtractor={item => item.id}
            />
            <View style={styles.productback}>
              <TouchableOpacity style={styles.donebar} onPress={() => navigation.navigate('MaterialTypes')}>
                <Image source={require('../../assets/img/Group112.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.donebar}
                onPress={() => {
                  setVisible(false), (click.count = 0);
                  size?.map(item => (item.initialCount = 0));
                  setLoad(!load);
                }}>
                <Text style={styles.donetxt}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}

      <ScrollView style={styles.cardcontainer}>
        <View style={styles.cardboxcontainer}>
          {materials.data &&
            materials.data[type]?.map((item, i) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => [
                    setVisible(!visible),
                    setMatType(item?.type),
                    setMatItemName(item?.name),
                    setSize(item?.sizes),
                  ]}
                  key={item.name}>
                  <Image style={styles.productimg} source={{ uri: item?.image }} />
                  <Text style={styles.txt}>{item?.name}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
      <View></View>
    </View>
  );
};
export default MaterialItems;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  itemcontentbar: {
    width: '97%',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  rowset: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor:'green'
  },
  countbar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  below: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  donebar: {
    backgroundColor: '#6B7887',
    width: 130,
    height: 55,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donetxt: {
    fontSize: 22,
    fontWeight: '500',
    color: '#ffffff',
  },
  contentdiv: {
    left: 0,
    right: 0,
    bottom: 0,
    // flex:0.9,
    height: '83%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  number: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  headcontainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(216, 214, 214, 0.8)',
  },
  back: {
    width: 40,
    height: 40,
    marginHorizontal: 30,
    marginVertical: 8,
  },
  head: {
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 20,
    color: '#515253',
  },
  cardcontainer: {
    marginVertical: 10,
    display: 'flex',
    // flexDirection:'row',
    // flexWrap:'wrap',
    width: '100%',
    borderTopWidth: 2,
    borderTopColor: 'rgba(216, 214, 214, 0.8)',
  },
  card: {
    width: 110,
    height: 110,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    display: 'flex',
    flexDirection: 'column',
  },
  txt: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    color: '#323232',
    textAlign: 'center',
  },
  productimg: {
    width: 66,
    height: 67,
  },
  cardboxcontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  modalcontainer: {
    display: 'flex',
    backgroundColor: Colors.modalback,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'flex-end',
  },
  contentdivtap: {
    width: 100,
    height: 13,
    borderRadius: 10,
    backgroundColor: '#767676',
    marginVertical: 20,
  },
  contentbar: {
    borderBottomWidth: 2,
    width: '100%',
    borderBottomColor: '#D8D6D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  producttxt: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 20,
    color: '#474747',
    marginBottom: 15,
    marginTop: 5,
  },
  btnselector: {
    width: 60,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.btncolor,
    borderRadius: 4,
  },
  icontxt: {
    fontSize: 35,
    fontWeight: '600',
    color: Colors.white,
  },
  Count: {
    fontSize: 20,
    fontWeight: '600',
    color: '#5A5959',
    lineHeight: 20,
  },
  amountline: {
    fontSize: 20,
    fontWeight: '500',
    color: '#5A5959',
    lineHeight: 20,
  },
  inches: {
    fontSize: 18,
    fontWeight: '300',
    color: '#5A5959',
    lineHeight: 20,
    marginHorizontal: 10,
  },
  typecontentbar: {
    width: '43%',
    // backgroundColor:"red"
  },
  productback: {
    width: '100%',
    height: 70,
    backgroundColor: 'rgba(234, 234, 234,0.3)',
    borderTopWidth: 2,
    borderTopColor: '#D8D6D6',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  countnum: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#AAAAAA',
  },
});
