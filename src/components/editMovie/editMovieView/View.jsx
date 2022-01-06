import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PT from 'prop-types';
import cnBind from 'classnames/bind';

import { useNavigate } from 'react-router-dom';
import useMoviesProcessor from '../../utils/hooks/useMoviesProcessor';
import styles from '../EditMovie.module.scss';

const cx = cnBind.bind(styles);

const View = ({ movie, textContent }) => {
  const navigate = useNavigate();

  const { onSubmitEditMovieForm } = useMoviesProcessor();

  const formik = useFormik({
    initialValues: {
      name: '',
      thumbnail: '',
      directorName: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'at least 2 characters!')
        .max(50, 'maximum 50 characters')
        .required('This is a required field!'),
      thumbnail: Yup.string()
        .matches(/^(http|https)[\W\w]+(.jpg|.png|.jpeg)$/g, 'enter the correct link to the picture'),
      directorName: Yup.string()
        .min(2, 'at least 2 characters!')
        .max(50, 'maximum 50 characters'),
      description: Yup.string()
        .min(10, 'at least 10 characters!')
        .max(1000, 'maximum 1000 characters'),

    }),
    onSubmit: (values) => {
      const changedFields = {};
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          changedFields[key] = value;
        }
      });
      onSubmitEditMovieForm(movie, changedFields);
      navigate('/');
    },
  });

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const createInputClasses = (tagName, inputName) => cx({
    [tagName]: true,
    error: !!(formik.errors[inputName] && formik.touched[inputName]),
  });

  return (
    <form className={styles.form} action="url" onSubmit={formik.handleSubmit}>
      <input
        value={formik.values.name}
        type="text"
        placeholder={textContent[0]}
        required
        name="name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={createInputClasses('input', 'name')}
      />
      {formik.errors.name && formik.touched.name ? <div>{formik.errors.name}</div> : null}

      <input
        value={formik.values.thumbnail}
        type="text"
        placeholder={textContent[1]}
        name="thumbnail"
        autoComplete="off"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={createInputClasses('input', 'thumbnail')}
      />
      {formik.errors.thumbnail && formik.touched.thumbnail
        ? <div>{formik.errors.thumbnail}</div> : null}

      <input
        value={formik.values.directorName}
        type="text"
        placeholder={textContent[2]}
        name="directorName"
        autoComplete="off"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={createInputClasses('input', 'directorName')}
      />
      {formik.errors.directorName && formik.touched.directorName
        ? <div>{formik.errors.directorName}</div> : null}

      <div className="form__textarea-wrepper">
        <p>{textContent[3]}</p>
        <textarea
          value={formik.values.description}
          name="description"
          id="txt"
          cols="43"
          rows="10"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={createInputClasses('textarea', 'description')}
        />
        {formik.errors.description && formik.touched.description
          ? <div>{formik.errors.description}</div> : null}

      </div>
      <div className={styles.form__button_wrapper}>
        <button
          type="submit"
          className="button button__main"
        >
          <div className="inner">{textContent[4]}</div>
        </button>

        <button
          type="button"
          className="button button__secondary"
          onClick={handleBackClick}
        >
          <div className="inner">{textContent[5]}</div>
        </button>
      </div>
    </form>

  );
};

View.propTypes = {
  movie: PT.shape({
    id: PT.oneOfType([
      PT.string,
      PT.number,
    ]),
    name: PT.string,
    actors: PT.arrayOf(PT.shape({
      id: PT.number,
      name: PT.string,
    })),
    directorName: PT.string,
    rating: PT.number,
    likes: PT.number,
    thumbnail: PT.string,
    description: PT.string,
  }),
  textContent: PT.arrayOf(PT.string).isRequired,
};

View.defaultProps = {
  movie: {
    id: null,
    name: '',
    description: '',
    thumbnail: '',
    directorName: '',
    likes: 0,
    rating: 0,
    actors: [],
  },
};

export default View;
