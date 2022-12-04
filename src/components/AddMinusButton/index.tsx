import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

import styles from './AddMinusButton.style';

const AddMinusButton = (props: any) => {
  const { colors } = useTheme();
  const [count, setCount] = useState(0);
  const [viewnum, setViewnum] = useState(1);
  const [decnum, setDecnum] = useState();

  const onAdd = () => {
    const countVal = count + 1;
    setCount(countVal);
    props.updateCount({ count: countVal });
    // viewnum+=1
    setViewnum(viewnum + 1)
    props.setNumb(viewnum);
  };
  const onMinus = () => {
    if (count > 0) {
      const countVal = count - 1;
      setCount(countVal);
      props.updateCount({ count: countVal });
      // setDecnum(viewnum);
      setViewnum(viewnum - 1)
    props.setNumb(viewnum);
    }
  };

  useEffect(() => {
    setCount(props?.count ? props?.count : 0);
  }, []);

  return (
    <View style={props.style}>
      <View style={styles.buttons}>
        <IconButton
          icon="minus"
          color={colors.primary}
          size={30}
          rippleColor={colors.accent}
          onPress={onMinus}
        />
      </View>
      <View style={[styles.countText, { backgroundColor: "#E1E1E1" }]}>
        <Text style={styles.text} theme={{ colors: { text: colors.text } }}>
          {count}
        </Text>
      </View>
      <View style={styles.buttons}>
        <IconButton
          icon="plus"
          color={colors.primary}
          size={30}
          rippleColor={colors.accent}
          onPress={onAdd}
        />
      </View>
    </View>
  );
};

export default AddMinusButton;
