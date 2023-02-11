import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

const TaxCalculator = () => {
  const [income, setIncome] = useState(0);
  const [tax, setTax] = useState(0);
  const [regime, setRegime] = useState('old');
  const oldRegimeTaxSlabs = [
    {label: '0-2.5L', max: 250000, prev: 0, prevTax: 0, rate: 0},
    {label: '2.5L-5L', max: 500000, prev: 250000, prevTax: 0, rate: 0.05},
    {label: '5L-10L', max: 1000000, prev: 500000, prevTax: 12500, rate: 0.2},
    {label: '>10L', max: Infinity, prev: 1000000, prevTax: 112500, rate: 0.3},
  ];
  const newRegimeTaxSlabs = [
    {label: '0-3L', max: 300000, prev: 0, prevTax: 0, rate: 0},
    {label: '3L-6L', max: 600000, prev: 300000, prevTax: 0, rate: 0.05},
    {label: '6L-9L', max: 900000, prev: 600000, prevTax: 15000, rate: 0.1},
    {label: '9L-12L', max: 1200000, prev: 900000, prevTax: 45000, rate: 0.15},
    {label: '12L-15L', max: 1500000, prev: 1200000, prevTax: 90000, rate: 0.2},
    {label: '>15L', max: Infinity, prev: 1500000, prevTax: 150000, rate: 0.3},
  ];

  const standardDeduction = 50000;
  // if(tax<= 12500) tax 0
  // if(tax<= 12500) tax 0

  const calculateTax = () => {
    let taxAmount = 0;
    let taxSlabs = oldRegimeTaxSlabs;
    if (regime === 'new') {
      taxSlabs = newRegimeTaxSlabs;
    }
    for (const slab of taxSlabs) {
      if (income <= slab.max) {
        // console.log(income - slab.prev);
        taxAmount = (income - slab.prev) * slab.rate + slab.prevTax;
        if (regime === 'old' && taxAmount <= 12500) {
          taxAmount = 0;
        }
        if (regime === 'new' && taxAmount <= 25000) {
          taxAmount = 0;
        }
        break;
      }
    }
    setTax(taxAmount);
  };

  return (
    <View
      style={{
        padding: 24,
        flex: 1,
        backgroundColor: '#FEFBF5',
      }}>
      <Text
        style={{
          color: '#F99416',
          marginTop: 30,
          fontSize: 36,
          textAlign: 'center',
        }}>
        Net Income:
      </Text>

      <TextInput
        keyboardType="numeric"
        placeholder="Enter your income here"
        // textAlign="center"
        onChangeText={text => setIncome(Number(text))}
        // value={income.toString()}
        style={{
          borderWidth: 1,
          padding: 8,
          marginVertical: 8,
          borderColor: '#F99416',
          color: '#F99416',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 8,
          marginBottom: 50,
        }}>
        <Button
          title="Old Regime"
          onPress={() => setRegime('old')}
          color={regime === 'old' ? '#F99416' : 'gray'}
        />
        <Button
          title="New Regime"
          onPress={() => setRegime('new')}
          color={regime === 'new' ? '#F99416' : 'gray'}
        />
      </View>
      <Button title="Calculate Tax" onPress={calculateTax} color="#F99416" />
      <Text
        style={{
          color: '#F99416',
          fontSize: 18,
          marginTop: 36,
          marginBottom: 6,
          textAlign: 'center',
        }}>
        Tax Amount:
      </Text>
      <Text style={{color: '#F99416', fontSize: 36, textAlign: 'center'}}>
        {tax}
      </Text>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>May your income rise everyday!</Text>
        <Text style={styles.footerText1}>App by Atmanirbhar❤️</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    //backgroundColor: '#',
    padding: 12,
    alignItems: 'center',
    position: 'absolute',
    bottom: 6,
    left: 0,
    right: 0,
  },
  footerText: {
    color: '#F99416',
    fontSize: 18,
  },
  footerText1: {
    color: '#F99416',
    fontSize: 12,
    color: 'grey',
  },
});

export default TaxCalculator;
