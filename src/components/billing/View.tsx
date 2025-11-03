import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';

import { PaperText as Text } from '@components/commonui/ScaledText';
import { styles } from '../style';

const VIPScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={mStyle.container}>
      <Image
        style={mStyle.azusaMock}
        source={{
          uri: 'https://img.nga.178.com/attachments/mon_202202/01/-zue37Q2p-6rfwK2dT1kShs-b4.jpg',
        }}
      />
      <Text style={styles.centerText}>{t('Billing.thankU')}</Text>
      <Text style={styles.centerText}>{t('Billing.godBlessU')}</Text>
      <Text style={styles.centerText}>{t('Billing.urVeryVeryGorgeous')}</Text>
    </View>
  );
};

export default () => {
  return <VIPScreen />;
};

const mStyle = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, paddingTop: 10 },
  text: {
    fontSize: 20,
  },
  azusaMock: {
    width: '100%',
    height: '30%',
    alignSelf: 'center',
  },
});
