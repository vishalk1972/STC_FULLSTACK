import React, { useRef, useState , useEffect } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from '@react-pdf/renderer';
import { Button } from 'antd'; // Consider using Tailwind components
import { saveAs } from 'file-saver';
import PDFObject from 'pdfobject';
const PdfPreview = ({ file }) => {
    const [previewMode, setPreviewMode] = useState('renderer');
    const [pdfObject, setPdfObject] = useState(null);
    const containerRef = useRef();
  
    useEffect(() => {
      if (file && previewMode === 'renderer') {
        (async () => {
          const blobUrl = await file.text();
          const pdfBytes = await fetch(blobUrl).then((res) => res.arrayBuffer());
          const doc = await PDFObject.embed(pdfBytes, containerRef.current);
          setPdfObject(doc);
        })();
      }
    }, [file, previewMode]);
  
    const handleDownload = () => {
      saveAs(file, file.name);
    };
  
    const togglePreviewMode = () => {
      setPreviewMode((prevMode) => (prevMode === 'renderer' ? 'object' : 'renderer'));
    };
  
    if (!file) {
      return null; // Handle cases where no file is available
    }
  
    return (
      <div className="flex items-center justify-center">
        {previewMode === 'renderer' ? (
          <Document>
            <Page style={styles.page}>
              {pdfObject ? (
                <View ref={containerRef} style={styles.pdfObject}>
                  {pdfObject}
                </View>
              ) : (
                <Text>Loading PDF...</Text>
              )}
            </Page>
          </Document>
        ) : (
          <PDFObject
            url={URL.createObjectURL(file)}
            ref={containerRef}
            width="100%"
            height="400px"
          />
        )}
        <Button type="link" onClick={handleDownload}>
          Download
        </Button>
        <Button type="link" onClick={togglePreviewMode}>
          Toggle Preview Mode
        </Button>
      </div>
    );
  };
  
  export default PdfPreview;
  
  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    pdfObject: {
      width: '100%',
      height: 400,
    },
  });
  