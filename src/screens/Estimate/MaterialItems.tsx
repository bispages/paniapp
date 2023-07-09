import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Colors from '../../assets/colors';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGetMaterialsQuery } from '../../store/slices/IdentityApiSlice';
import { selectMaterials } from '../../store/selectors/apiSelectors';
import { useSelector } from 'react-redux';

// import {colors} from '../../assets/colors';

const arr = [
  {
    id: 1,
    title: 'Ball valve',
    img: require('../../assets/img/productz.png'),
  },
  {
    id: 2,
    title: 'Coupler',
    img: require('../../assets/img/productz.png'),
  },
  {
    id: 3,
    title: 'Elbow',
    img: require('../../assets/img/productz.png'),
  },
  {
    id: 4,
    title: 'End cap',
    img: require('../../assets/img/productz.png'),
  },
  {
    id: 5,
    title: 'Reducer',
    img: require('../../assets/img/productz.png'),
  },
  {
    id: 6,
    title: 'Union',
    img: require('../../assets/img/productz.png'),
  },
  {
    id: 7,
    title: 'Elbow 90',
    img: require('../../assets/img/productz.png'),
  },
  {
    id: 8,
    title: 'elbow Holder',
    img: require('../../assets/img/productz.png'),
  },
  {
    id: 9,
    title: 'Equal tee',
    img: require('../../assets/img/productz.png'),
  },
  {
    id: 10,
    title: 'Flange Adapter',
    img: require('../../assets/img/productz.png'),
  },
  {
    id: 11,
    title: 'End cap2',
    img: require('../../assets/img/productz.png'),
  },
  {
    id: 12,
    title: 'Elbow 2',
    img: require('../../assets/img/productz.png'),
  },
];

// const countitem = [
//   {
  
//     count: 0,
//     initialCount: 0,
//   },

// ];

const MaterialItems = ({
  route: {
    params: { type },
  },
}) => {
  const [visible, setVisible] = useState(false);
  const [num, setNum] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [matType, setMatType] = useState();
  const [matItemName, setMatItemName] = useState();
  const [data, setData] = useState();
  const [manual, setManual] = useState([]);
  const [countitem12, setCountitem12] = useState([]);
  const [countitem, setCountitem] = useState([]);
  const [load, setLoad] = useState(true);
  const [size, setSize] = useState([]);
  const [click, setClick] = useState({ id: 0, count: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  console.log('MATERIAL TYPES', type);

  const materials = useSelector(selectMaterials);

  console.log('MATERIALS', materials.data.PVC);

  const { data: matItems } = useGetMaterialsQuery();

  console.log(matItems, 'matItems123456');

  const matypes = Object.values(materials.data);

  console.log(matypes, 'matypes12');

  // const matypesvalue = Object.values(materials.data);
  // console.log(matypesvalue,"matypes1288888");

  console.log('jjjj');

  
  
  
console.log("123456000II",countitem)

  const listItem = () => {
    // materials?.map((iiitem) => {
    //   console.log("jjjjttt656",iiitem)
    // })
  };

  const popup = () => {
    setNum(true);
    setTimeout(function () {
      setNum(false);
    }, 100);
  };
  
  const handleProductCount = (id: number, payload: string) => {
    
    // setCountitem(arr1);
    console.log("99999935$%",countitem);
    const item = countitem?.find(item => item.id === id);
    if (item) {
      if (payload === 'inc') {
        item.count += 1;
        item.initialCount += 1;
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
        {console.log("YYYY",item.count)}
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

  // let adding = (index, value) => {

  //   let product_array;
  //   product_array = [...countitem];
  //   product_array[index][value] = parseInt(product_array[index]?.count) + 1;
  //   product_array[index][value] = `${product_array[index]?.count}`;
  //   setProductDetails(product_array);
  // }

  // let decending = (index, value) => {

  //     let product_array;
  //     product_array = [...countitem];
  //     if(product_array[index]?.count > 0){
  //     product_array[index][value] = parseInt(product_array[index]?.count) - 1;
  //     product_array[index][value] = `${product_array[index]?.count}`;
  //     setProductDetails(product_array);
  //     }
  //   }
//   useEffect(() => {
//     materials.data[type]?.map((item, i) => {
// console.log('################',item.sizes)
// const arr1 = item.sizes?.map(items  => ({
//   ...items,
//   count: 0,
//   initialCount: 0
  
// }))
// setCountitem( arr1 );

//     }

    
        
//     )

//   }, [])

//   {console.log('%%%%%%%&',countitem)}

  const newlygetarr = (items : string) => {
    // useEffect(() => {
    const arr1 = items?.map(item  => ({
      ...item,
      count: 0,
      initialCount: 0
      
    }));
    setCountitem( arr1 );
    console.log('WWWWW123333',arr1)
    
  // }, []);
  };
  {console.log('WWWWW123333yyy',countitem)}

  useEffect(() => {
    listItem();
    
  }, []);

  // const [data, setData] = useState(arr1);
  // console.log(data,"TTTT")

  const renderItems = ({item, index}) => 
     (
      <View style={styles.itemcontentbar} key={index}>
                    {console.log('iuevfguyuyv gvg')}
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
                        <Text style={styles.Count}>{ item?.count }</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.btnselector}
                        onPress={() => [handleProductCount(item.id, 'inc'), popup()]}>
                        <Text style={styles.icontxt}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
    );

  return (
    <View style={styles.container}>
     {console.log("sizesizesizesizesize23",size)}
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
            {console.log("WWWWWWW",size)}
            <View style={styles.contentdivtap}></View>
            <View style={styles.contentbar}>
              <Text style={styles.producttxt}>
                {type} - {matItemName}
              </Text>
            </View>
           
              <FlatList
              showsVerticalScrollIndicator={false}
              data={countitem}
              renderItem={renderItems}
              keyExtractor={(item, index) => index.toString()}
              
              />
         
            <View style={styles.productback}>
              <TouchableOpacity style={styles.donebar} onPress={() => navigation.navigate('MaterialTypes')}>
             
                <Image source={require('../../assets/img/Group112.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.donebar}
                onPress={() => {
                  setVisible(false), (click.count = 0);
                  countitem?.map((item, i) => (item.initialCount = 0));
                  setLoad(!load);
                }}>
                <Text style={styles.donetxt}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        ''
      )}
      {/* <View style={styles.headcontainer}>
        <Image style={styles.back} source={require('../../assets/img/backarrow.png')} />
        <Text style={styles.head}>Material Items</Text>
      </View> */}
      <ScrollView style={styles.cardcontainer}>
        <View style={styles.cardboxcontainer}>
          {materials.data[type]?.map((item, i) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => [
                  newlygetarr(item?.sizes),
                  setVisible(!visible),
                  setMatType(item?.materialType),
                  setMatItemName(item?.name),
                  setSize(item?.sizes)
                ]}
                key={i}>
                  {console.log("ARRAY1222",item)}
                <Image style={styles.productimg} source={{ uri: item?.image }} />
                <Text style={styles.txt}>{item?.name}</Text>
              </TouchableOpacity>
            );
          })}

          {/* {matItems?.map((item, i) => {
            return (
              <TouchableOpacity style={styles.card} 
              onPress={() => [setVisible(!visible),setMatType(item?.materialType),setMatItemName(item?.materialName)]} key={i}>
              <Image style={styles.productimg} source={item?.image} />
              <Text style={styles.txt}>{item?.materialName}</Text>  
              </TouchableOpacity>
            );
          })}  */}
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
