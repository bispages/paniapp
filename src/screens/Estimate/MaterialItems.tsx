import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Colors from '../../assets/colors';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { selectMaterials } from '../../store/selectors/apiSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialSizesType } from 'types';
import { selectEstimateState } from '../../store/slices/EstimateStateSlice';
import { addEstimate } from '../../store/slices/EstimateStateSlice';
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
  const [manual, setManual] = useState();
  const [countitem12, setCountitem12] = useState([]);
  const [countitem, setCountitem] = useState([]);
  const [load, setLoad] = useState(true);
  const [size, setSize] = useState<MaterialSizesType[]>([]);
  const [sized, setSized] = useState([]);
  const [click, setClick] = useState({ id: 0, counts: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const [overchange, setOverchange] = useState([])
  // const [sizedlist, setSizedlist] = useState([...size]);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const matt = useSelector(selectEstimateState);
  const materials = useSelector(selectMaterials);
  const matypes = materials?.data ? Object.keys(materials.data) : [];
  // const materialinfo = materials?.data[type];
  const materialinfo = matt.estimateItems?.data[type];

  
  const dispatch = useDispatch();

  console.log(materials,"MATERIALSSS");
  console.log(materialinfo[1].size,"00materialinfo")
  console.log(matypes, 'matypes12');
  console.log('SIZE',size);
  const [allmet, setAllmet] = useState([...materialinfo]);
  console.log(allmet,"allmet")
  const popup = () => {
    setNum(true);
    setTimeout(function () {
      setNum(false);
    }, 100);
  };

  
const handleProductCount = (id: string, index: number, payload: string) => {

  // setCountitem(arr1);
  // const sizedlist = [...size];
  // console.log('99999935$%', sizedlist);

  let item = size?.find(item => item.id === id);
    console.log("ITEM",item)
  if (item) {
    if (payload === 'inc') {
      console.log("POSTIVE")
      const updatedSize = size.map(item =>
        item.id === id ? { ...item, count: item.count + 1, initialCount: item.initialCount + 1} : item );
        setSize(updatedSize);

        const upSize = sized.map(item =>
          item.id === id ? { ...item, count: item.count + 1} : item );
          setSized(upSize);

          const updatedItems = [...allmet];
        updatedItems[manual] = {
          ...updatedItems[manual],
          sizes: upSize,
        };
        const updtedown = {
          ...materials,
          data: {
            ...materials.data,
            [type] : updatedItems
            
          }
        }
        console.log('vvvupdtedown88',updtedown)
        setOverchange(updtedown);
        console.log("updatedItemsupdatedItems23", updatedItems);
        setAllmet(updatedItems);
        console.log(type,"type YYYYY")
     

      if (click.id === id) {
        click.counts += 1;
      } else {
        if (item.initialCount > 0) {
          click.counts = item.initialCount + 1;
          console.log("gggg000")
        } else {
          click.counts = 1;
        }
      }
      click.id = id;
      setLoad(!load);
      {
        console.log('YYYY', item.count);
      }
    } else {
      const updatedSize = size.map(item =>
        item.id === id ? { ...item, count: item.count - 1, initialCount: item.initialCount - 1} : item );
        setSize(updatedSize);

        const upSize = sized.map(item =>
          item.id === id ? { ...item, count: item.count - 1} : item );
          setSized(upSize);

          const updatedItems = [...allmet];
        updatedItems[manual] = {
          ...updatedItems[manual],
          sizes: upSize,
        };
        const updtedown = {
          ...materials,
          data: {
            ...materials.data,
            [type] : updatedItems
            
          }
        }
        console.log('vvvupdtedown88',updtedown)
        setOverchange(updtedown);
        console.log("updatedItemsupdatedItems23", updatedItems);
        setAllmet(updatedItems);
        console.log(type,"type YYYYY")

      if (item.count > 0) {
        console.log("RRRTTTwTTTTTTTTTTTTTTTTTTTTTTTTTTT")
        
        if (click.id === id) {
          click.counts -= 1;
          console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW")
        } else {
          if (item.initialCount > 0) {
            click.counts = item.initialCount - 1;
            console.log("ggggGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGppp")
          } else {
            click.counts = -1;
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
        {
          item?.count === 0 ?
          <TouchableOpacity style={styles.btnselector} >
          <Text style={styles.icontxt}>—</Text>
        </TouchableOpacity>
          :
          <TouchableOpacity style={styles.btnselector} onPress={() => [handleProductCount(item.id, index, 'dec'), popup()]}>
          <Text style={styles.icontxt}>—</Text>
        </TouchableOpacity>
        }
        
        <View style={styles.number}>
          <Text style={styles.Count}>{item?.count}</Text>
        </View>
        <TouchableOpacity style={styles.btnselector} onPress={() => [handleProductCount(item.id, index, 'inc'), popup()]}>
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
              <Text style={styles.countnum}>{click.counts}</Text>
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
            {/* <ScrollView>
              {size.map((item, id) => {
                return (
                  <View style={styles.itemcontentbar} key={id}>
                    <View style={styles.typecontentbar}>
                      <Text style={styles.amountline}>
                        {item?.unit}
                        <Text style={styles.inches}> inch</Text>
                      </Text>
                    </View>
                    <View style={styles.rowset}>
                      <TouchableOpacity
                        style={styles.btnselector}
                        onPress={() => [handleProductCount(item.id, 'dec'), popup()]}>
                        <Text style={styles.icontxt}>—</Text>
                      </TouchableOpacity>
                      <View style={styles.number}>
                        <Text style={styles.Count}>{item?.count}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.btnselector}
                        onPress={() => [handleProductCount(item.id, 'inc'), popup()]}>
                        <Text style={styles.icontxt}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView> */}
            <View style={styles.productback}>
              <TouchableOpacity style={styles.donebar} onPress={() => 
                {navigation.navigate('MaterialTypes');
                dispatch(addEstimate(overchange));}}>
                <Image source={require('../../assets/img/Group112.png')} />
              </TouchableOpacity>
              {console.log(overchange,"***updtedown***")}
              <TouchableOpacity
                style={styles.donebar}
                onPress={() => {
                  setVisible(false),
                 (click.counts = 0);
                 setLoad(!load);
                 dispatch(addEstimate(overchange));
                }}> 
                  {/* size?.map(item => (item.initialCount = 0));
                  setLoad(!load);
                 }}>  */}
                <Text style={styles.donetxt}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}

      <ScrollView style={styles.cardcontainer}>
        <View style={styles.cardboxcontainer}>
        
          {
            allmet?.map((item, itemIndex) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => [
                    setVisible(!visible),
                    setMatType(item?.type),
                    setMatItemName(item?.name),
                    setSize(item?.sizes),
                    setManual(itemIndex),
                    setSized(item?.sizes)
                    

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















