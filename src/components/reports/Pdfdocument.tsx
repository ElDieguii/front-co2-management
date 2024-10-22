import { Document, Page, StyleSheet, Image } from '@react-pdf/renderer';
import { FC } from 'react';

type Props = {
  image: any;
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  image: {
    width: '100%',
  },
});

const PdfDocument: FC<Props> = ({ image }) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Image style={styles.image} src={image}></Image>
      </Page>
    </Document>
  );
};

export default PdfDocument;
