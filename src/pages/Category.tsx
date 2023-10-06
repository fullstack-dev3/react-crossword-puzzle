import React from 'react';
import NavBar from '../components/NavBar';
import images from '../helpers/images';

const titles = [
  'School',
  'Fruits',
  'Body Parts (Girl)',
  'Body Parts (Boy)',
  'Beach Objects',
  'Autumn',
  'Jobs #1',
  'Vegetables',
  'Farm Animals #1',
  'Farm Animals #2',
  'Transport',
  'Winter Clothes',
  'Matching Sports',
  'Africa Animals',
  'Asian Animals',
  'Australian Animals',
  'Nuts',
  'Jobs #2',
  'Sports',
  'Colors',
  'Arctic Animals',
  'Desert Animals',
  'Shapes',
  'Jobs #3',
  'Transporation',
  'Forest Animals',
  'Sea Animals',
  'Winter Sports',
  'Halloween',
  'Birds',
  'Pirates',
  'North America Animals',
  'South America Animals',
  'Planets'
];

const names = [
  images.cross01, images.cross02, images.cross03,
  images.cross04, images.cross05, images.cross06,
  images.cross07, images.cross08, images.cross09,
  images.cross10, images.cross11, images.cross12,
  images.cross13, images.cross14, images.cross15,
  images.cross16, images.cross17, images.cross18,
  images.cross19, images.cross20, images.cross21,
  images.cross22, images.cross23, images.cross24,
  images.cross25, images.cross26, images.cross27,
  images.cross28, images.cross29, images.cross30,
  images.cross31, images.cross32, images.cross33,
  images.cross34,
];

const Category = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div className="game-panel">
        {titles.map((item, index) =>
          <div key={index} className="element">
            <h5 className="title">
              Crossword {index + 1} - {item}
            </h5>
            <img
              src={names[index]}
              width="350"
              height="277"
              alt=""
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Category;