import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
  import { useMemo } from 'react';

import ShadowCard from '../../components/common/ShadowCard';
import MinHeader from '../../components/common/MinHeader';
import BtnOutline from '../../components/buttons/BtnOutline';
import Btn from '../../components/buttons/Btn';

import { fetchCategories } from '../../services/category/CategoryAction';
import { createExercise, fetchExerciseById, updateExercise } from '../../services/exercise/exerciseAction';
import { clearExerciseError } from '../../services/exercise/exerciseSlice';
import TextInput from '../../components/inputs/TextInput';
import TextAreaInput from '../../components/inputs/TextAreaInput';
import SelectInput from './../../components/inputs/SelectInput';
import ImageInput from '../../components/inputs/ImageInput';
import MultipleImageInput from '../../components/inputs/MultipleImageInput';

// Validation schema without images validation
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  slug: Yup.string().required('Slug is required'),
  category: Yup.string().required('Category is required'),
  type: Yup.string().required('Exercise type is required'),
  primaryMuscles: Yup.array().of(Yup.string()).min(1, 'Add at least one muscle'),
  equipment: Yup.array().of(Yup.string()).min(1, 'Add at least one equipment'),
  instructions: Yup.array().of(Yup.string()).min(1, 'Add at least one instruction'),
  difficulty: Yup.string().required('Difficulty is required'),
  videoUrl: Yup.string().url().nullable(),
  // Removed image and images validation
});

const Exercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);

  const { exercise } = useSelector((state) => state.exercise);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
    if (isEditMode) {
      dispatch(fetchExerciseById(id));
      console.log(exercise, "exercise");
    }

    return () => dispatch(clearExerciseError());
  }, [id]);

  // Simplified initial values

  const initialValues = useMemo(() => {
    if (!isEditMode) {
      return {
        name: '',
        slug: '',
        category: '',
        type: '',
        primaryMuscles: [''],
        equipment: [''],
        instructions: [''],
        difficulty: '',
        videoUrl: '',
        isFeatured: false,
        isActive: true,
        image: null,
        images: [],
      };
    }

    return {
      name: exercise?.name || '',
      slug: exercise?.slug || '',
      category: exercise?.category?._id || '',
      type: exercise?.type || '',
      primaryMuscles: exercise?.primaryMuscles || [''],
      equipment: exercise?.equipment || [''],
      instructions: exercise?.instructions || [''],
      difficulty: exercise?.difficulty || '',
      videoUrl: exercise?.videoUrl || '',
      isFeatured: exercise?.isFeatured || false,
      isActive: exercise?.isActive !== false,
      image: exercise?.image || null,
      images: exercise?.images || [],
    };
  }, [isEditMode, exercise]);


  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const handleSubmit = async (values) => {
    const slug = values.slug || values.name.toLowerCase().replace(/\s+/g, '-');

    // Handle single image
    let imageInput = null;
    if (values.image) {
      if (values.image.file instanceof File) {
        // 👈 Only include file if it's an actual File object
        imageInput = {
          file: values.image.file,
          altText: values.image.altText || '',
        };
      } else if (values.image.url) {
        imageInput = {
          url: values.image.url,
          altText: values.image.altText || '',
        };
      }
    }


    // Handle multiple images - simplified
    const imagesInput = (values.images || []).map((img) => {
      if (img.file instanceof File) {
        return {
          file: img.file,
          altText: img.altText || '',
        };
      } else if (img.url) {
        return {
          url: img.url,
          altText: img.altText || '',
        };
      }
      return null;
    }).filter(Boolean);


    const input = {
      name: values.name,
      slug,
      category: values.category,
      type: values.type,
      primaryMuscles: values.primaryMuscles.filter(muscle => muscle.trim() !== ''),
      equipment: values.equipment.filter(equip => equip.trim() !== ''),
      instructions: values.instructions.filter(inst => inst.trim() !== ''),
      difficulty: values.difficulty,
      videoUrl: values.videoUrl || '',
      isFeatured: values.isFeatured,
      isActive: values.isActive,
      image: imageInput,
      images: imagesInput.length > 0 ? imagesInput : undefined,
    };

    try {
      if (isEditMode) {
        await dispatch(updateExercise({ id, input }));
      } else {
        await dispatch(createExercise(input));
      }
      navigate('/exercises');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <MinHeader title={isEditMode ? 'Edit Exercise' : 'Create Exercise'} />

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form className="p-2 space-y-6">
            <div className='flex justify-between items-start gap-2'>

              <ShadowCard className="m-3 w-8/12 p-4 space-y-6">
                <TextInput
                  title="Exercise Name"
                  label="Exercise Name"
                  name="name"
                  placeholder="Enter exercise name"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && errors.name}
                />

                <FieldArray
                  name="primaryMuscles"
                  render={() => (
                    <TextAreaInput
                      title="Primary Muscles"
                      label="Primary Muscles"
                      placeholder="Enter muscles separated by commas (e.g., chest, triceps, shoulders)"
                      value={values.primaryMuscles.join(', ')}
                      onChange={(e) => setFieldValue('primaryMuscles', e.target.value.split(',').map((v) => v.trim()))}
                      error={touched.primaryMuscles && errors.primaryMuscles}
                    />
                  )}
                />

                <FieldArray
                  name="equipment"
                  render={() => (
                    <TextAreaInput
                      title="Equipment"
                      label="Equipment"
                      placeholder="Enter equipment separated by commas (e.g., dumbbells, barbell, bench)"
                      value={values.equipment.join(', ')}
                      onChange={(e) => setFieldValue('equipment', e.target.value.split(',').map((v) => v.trim()))}
                      error={touched.equipment && errors.equipment}
                    />
                  )}
                />

                <FieldArray
                  name="instructions"
                  render={() => (
                    <TextAreaInput
                      title="Instructions"
                      label="Instructions"
                      placeholder="Enter each instruction on a new line"
                      value={values.instructions.join('\n')}
                      onChange={(e) => setFieldValue('instructions', e.target.value.split('\n').map((v) => v.trim()))}
                      error={touched.instructions && errors.instructions}
                      rows={6}
                    />
                  )}
                />

                <ImageInput
                  name="image"
                  title="Main Exercise Image"
                  value={values.image}
                  onChange={(val) => setFieldValue("image", val)}
                  maxSize={1024 * 1024 * 3} // 2MB limit
                />

                <MultipleImageInput
                  name="images"
                  title="Additional Images (Gallery)"
                  value={values.images}
                  onChange={(val) => setFieldValue("images", val)}
                  maxImages={5}
                  maxSize={1024 * 1024 * 3} // 2MB per image
                />

                <div className="flex justify-end space-x-4 pt-4">
                  <BtnOutline type="button" onClick={() => navigate('/exercises')}>
                    Cancel
                  </BtnOutline>
                  <Btn type="submit">
                    {isEditMode ? 'Update Exercise' : 'Create Exercise'}
                  </Btn>
                </div>
              </ShadowCard>

              <ShadowCard className="m-3 w-4/12 p-4 space-y-6">
                <TextInput
                  title="Slug"
                  label="Slug"
                  name="slug"
                  placeholder="Enter exercise slug (auto-generated if empty)"
                  value={values.slug}
                  onChange={handleChange}
                  error={touched.slug && errors.slug}
                />

                <SelectInput
                  title="Category"
                  label="Category"
                  name="category"
                  options={categoryOptions}
                  value={values.category}
                  onChange={(val) => setFieldValue('category', val)}
                  error={touched.category && errors.category}
                />

                <SelectInput
                  title="Exercise Type"
                  label="Exercise Type"
                  name="type"
                  options={[
                    { label: 'Compound', value: 'Compound' },
                    { label: 'Isolation', value: 'Isolation' },
                    { label: 'Bodyweight', value: 'Bodyweight' },
                  ]}
                  value={values.type}
                  onChange={(val) => setFieldValue('type', val)}
                  error={touched.type && errors.type}
                />

                <SelectInput
                  title="Difficulty Level"
                  label="Difficulty Level"
                  name="difficulty"
                  options={[
                    { label: 'Beginner', value: 'Beginner' },
                    { label: 'Intermediate', value: 'Intermediate' },
                    { label: 'Advanced', value: 'Advanced' },
                  ]}
                  value={values.difficulty}
                  onChange={(val) => setFieldValue('difficulty', val)}
                  error={touched.difficulty && errors.difficulty}
                />

                <TextInput
                  title="Video URL"
                  label="Video URL (Optional)"
                  name="videoUrl"
                  placeholder="https://youtube.com/watch?v=..."
                  value={values.videoUrl}
                  onChange={handleChange}
                  error={touched.videoUrl && errors.videoUrl}
                />

                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={values.isFeatured}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Exercise</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={values.isActive}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
                  </label>
                </div>
              </ShadowCard>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Exercise;