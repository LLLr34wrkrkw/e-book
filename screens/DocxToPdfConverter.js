import { FileSystem } from 'expo-file-system';
import * as Print from 'expo-print';

export const convertToPdf = async (docxUri) => {
  try {
    // Convert DOCX to PDF using Print module
    const pdfUri = await Print.printToFileAsync({ uri: docxUri });
    return pdfUri.uri;
  } catch (error) {
    console.error(error);
    return null;
  }
};


