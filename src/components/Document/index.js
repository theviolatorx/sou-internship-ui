import React, { Component } from 'react';
import { pdfjs } from 'react-pdf';
import { Document as Pdf, Page } from 'react-pdf';
import PropTypes from 'prop-types';

import {
  Image,
  Card,
  HeaderCard,
  Name,
  Icons,
  Icon,
  ContentCard,
  FooterCard,
  FileName,
  Wrap
} from './styles';
import PdfIcon from '../../assets/imgs/pdf.svg';
import ImageIcon from '../../assets/imgs/imagem.svg';
import OpenIcon from '../../assets/imgs/abrir.svg';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class Document extends Component {
  renderImage = file => <Image src={file.preview} alt={file.name} />;

  renderPdf = file => (
    <Pdf rotate={270} file={file.preview}>
      <Page width={250} pageNumber={1} />
    </Pdf>
  );

  render() {
    const { file, name } = this.props;
    return (
      <Card>
        <HeaderCard>
          <Name>{name}</Name>
          <Icons>
            <a href={file.preview} target="_blank">
              <Icon icon={OpenIcon} action={true} />
            </a>
          </Icons>
        </HeaderCard>
        <ContentCard>
          {file.type === 'application/pdf'
            ? this.renderPdf(file)
            : this.renderImage(file)}
        </ContentCard>
        <FooterCard>
          <Icon icon={file.type === 'application/pdf' ? PdfIcon : ImageIcon} />
          <Wrap>
            <FileName>{file.name}</FileName>
          </Wrap>
        </FooterCard>
      </Card>
    );
  }
}

Document.propTypes = {
  file: PropTypes.shape().isRequired
};

export default Document;
