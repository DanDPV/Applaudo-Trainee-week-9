/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint no-shadow: 0 */
/* eslint no-unused-vars: 0 */
import React from 'react';
import 'pages/comics/ListComicsPage/ListComicsPage.scss';

const ListComicsPage = () => {
  enum QuerysParams {
    Page = 'page',
    Format = 'format',
    Title = 'title',
  }

  return (
    <div className="comic-main-content mb-5">
      <div className="comic-page-title-div">
        <h1>Comics</h1>
      </div>
    </div>
  );
};

export default ListComicsPage;
