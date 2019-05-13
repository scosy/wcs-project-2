import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Article.css';
import { Card } from 'semantic-ui-react';
import ArticleModal from './ArticleModal.jsx';

const Article = ({ data }) => {
  // Declaration State key "isModalOpen"
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // CSS Style
  let articleStyle = {
    cardMain: {
      overflow: 'hidden',
      width: '100%',
      height: '260px',
      marginBottom: 0,
    },
    cardContent: {
      padding: '0px',
      wordWrap: 'break-word',
      textAlign: 'center',
    },
    thumbnail: {
      display: 'flex',
      margin: 'auto',
      border: '1px solid black',
      // width: '100%',
      maxHeight: '150px',
      objectFit: 'cover',
    },
  };

  let content;

  if (typeof data.postType === 'undefined' || data.postType === 'self') {
    if (data.text === '') {
      content = data.title;
    } else {
      content = data.text;
    }
  }
  if (data.postType === 'image') {
    content = <img src={data.thumbnail} alt="" style={articleStyle.thumbnail} />;
  }
  if (data.postType === 'link') {
    content = (
      <div>
        <img src={data.thumbnail} alt="" style={articleStyle.thumbnail} />
        <p>{data.postUrl}</p>
      </div>
    );
  }
  if (data.postType === 'rich:video') {
    content = <img src={data.thumbnail} alt="" style={articleStyle.thumbnail} />;
  }
  if (data.postType === 'hosted:video') {
    content = data.postUrl;
  }

  // Card title definition
  const MAX_TITLE_LENGTH = 40;
  let cardTitle = data.title.substring(0, MAX_TITLE_LENGTH);
  if (data.title.length > MAX_TITLE_LENGTH) {
    cardTitle += '...';
  }

  return (
    <div>
      <Card onClick={handleCardClick} style={articleStyle.cardMain}>
        <Card.Content style={articleStyle.cardContent}>
          <Card.Header className="cardHeader">
            <div className="title">{cardTitle}</div>
            <div className="date">{data.creationDate}</div>
          </Card.Header>
          <Card.Description className="cardContent">{content}</Card.Description>
        </Card.Content>
      </Card>
      <ArticleModal isModalOpen={isModalOpen} handleModalClose={handleModalClose} data={data} content={content} />
    </div>
  );
};

Article.propTypes = {
  data: PropTypes.shape({
    postType: PropTypes.string,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    postUrl: PropTypes.string,
    creationDate: PropTypes.string.isRequired,
  }),
};

export default Article;
