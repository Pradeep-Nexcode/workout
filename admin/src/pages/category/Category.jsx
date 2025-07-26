import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextInput from '../../components/inputs/TextInput';
import TextAreaInput from '../../components/inputs/TextAreaInput';
import MultipleImageInput from './../../components/inputs/MultipleImageInput';
import ShadowCard from '../../components/common/ShadowCard';
import MinHeader from './../../components/common/MinHeader';
import BtnOutline from '../../components/buttons/BtnOutline';
import Btn from '../../components/buttons/Btn';
import { createCategory, fetchCategoryById, updateCategory } from '../../services/category/CategoryAction';
import { clearCategoryError } from '../../services/category/CategorySlice';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  images: Yup.array().optional(),
  slug: Yup.string().required('Slug is required'),
});

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);

  const { loading, category } = useSelector((state) => state.category);

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchCategoryById(id));
    }
    // clear form data if create mode
    
 
    console.log(category, 'category');

    return () => {
      dispatch(clearCategoryError());
    };
  }, [dispatch, id, isEditMode]);

  // Correct dynamic initial values
  const initialValues = {
    name: category?.name || '',
    description: category?.description || '',
    images: category?.images || [],
    slug: category?.slug || '',
  };

 const handleSubmit = async (values) => {
  try {
    const slug = values.slug || values.name.toLowerCase().replace(/\s+/g, '-');

    const images = values.images.map((image) => {
      if (typeof image === 'string') {
        return {
          url: image,
          altText: 'Category Banner',
          file: null,
        };
      } else if (image?.url && typeof image.url === 'string') {
        return {
          url: image.url,
          altText: image.altText || 'Category Banner',
          file: null,
        };
      } else {
        return {
          url: '',
          altText: 'Category Banner',
          file: image,
        };
      }
    });

    const input = {
      name: values.name,
      description: values.description,
      slug,
      isActive: true,
      images,
    };

    if (isEditMode) {
      await dispatch(updateCategory({ id, updatedData: input }));
    } else {
      await dispatch(createCategory(input));
    }

    navigate('/categories');
  } catch (err) {
    console.error('Error saving category:', err);
  }
};



  return (
    <div>
      <MinHeader title={isEditMode ? 'Edit Category' : 'Create Category'} />
      <ShadowCard className="m-3">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form className="p-4 space-y-6">
              <TextInput
                title="Category Name"
                label="Category Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter category name"
                error={touched.name && errors.name}
              />

              <TextAreaInput
                title="Description"
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Enter category description"
                rows={4}
                error={touched.description && errors.description}
              />

              <MultipleImageInput
                title="Category Images"
                name="images"
                value={values.images}
                onChange={(files) => setFieldValue('images', files)}
                error={touched.images && errors.images}
              />

              <TextInput
                title="Category Slug"
                label="Slug"
                name="slug"
                value={values.slug}
                onChange={handleChange}
                placeholder="Enter category slug"
                error={touched.slug && errors.slug}
              />

              <div className="flex justify-end space-x-4">
                <BtnOutline type="button" onClick={() => navigate('/categories')}>
                  Cancel
                </BtnOutline>

                <Btn type="submit" disabled={loading}>
                  {isEditMode ? 'Update' : 'Create'}
                </Btn>
              </div>
            </Form>
          )}
        </Formik>
      </ShadowCard>
    </div>
  );
};

export default Category;


